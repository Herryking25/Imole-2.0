import { StorageService, StorageKeys } from './storageService';
import { ChildApiClient } from './api/childApiClient';
import type { ChildProfile, ProfileSetupPayload } from '../types/profile';
import { generateAnonymousNickname } from '../utils/avatarUtils';
import { getTodayDateString } from '../utils/dateUtils';

export class ProfileService {
  static getProfile(): ChildProfile | null {
    return StorageService.get<ChildProfile | null>(StorageKeys.PROFILE, null);
  }

  static isOnboarded(): boolean {
    const profile = this.getProfile();
    return Boolean(profile && profile.name && profile.age >= 6 && profile.age <= 17);
  }

  static async createProfile(payload: ProfileSetupPayload): Promise<ChildProfile> {
    const today = getTodayDateString();
    const cleanName = payload.name.trim();
    const ageNum = Number(payload.age);

    let remoteChildId = `child_${Date.now()}`;
    let anonymousUsername = payload.username?.trim() || generateAnonymousNickname();

    try {
      const res = await ChildApiClient.createProfile({
        name: cleanName,
        age: ageNum,
        preferredLanguage: payload.preferredLanguage,
      });

      if (res.success && res.token) {
        remoteChildId = res.childId || remoteChildId;
        anonymousUsername = res.anonymousUsername || anonymousUsername;
      }
    } catch (err) {
      console.warn('[ProfileService] Backend onboarding failed, falling back to local profile:', err);
    }

    const newProfile: ChildProfile = {
      id: remoteChildId,
      name: cleanName,
      firstName: payload.firstName?.trim() || cleanName.split(' ')[0],
      lastName: payload.lastName?.trim() || cleanName.split(' ').slice(1).join(' '),
      username: anonymousUsername,
      age: ageNum,
      ageGroup: payload.ageGroup,
      preferredLanguage: payload.preferredLanguage,
      avatarId: payload.avatarId || 'avatar-eagle',
      anonymousNickname: anonymousUsername,
      createdAt: today,
      lastActiveDate: today,
    };

    StorageService.set(StorageKeys.PROFILE, newProfile);
    StorageService.set(StorageKeys.LANGUAGE, payload.preferredLanguage);
    return newProfile;
  }

  static async fetchRemoteProfile(): Promise<ChildProfile | null> {
    if (!ChildApiClient.hasToken()) {
      return this.getProfile();
    }

    try {
      const res = await ChildApiClient.getProfile();
      if (res.success && res.child) {
        const current = this.getProfile();
        const updated: ChildProfile = {
          ...(current || {
            id: res.child._id,
            firstName: res.child.name.split(' ')[0],
            lastName: res.child.name.split(' ').slice(1).join(' '),
            username: res.child.anonymousUsername,
            avatarId: 'avatar-eagle',
            createdAt: res.child.createdAt || getTodayDateString(),
          }),
          id: res.child._id,
          name: res.child.name,
          age: res.child.age,
          preferredLanguage: res.child.preferredLanguage,
          anonymousNickname: res.child.anonymousUsername,
          lastActiveDate: getTodayDateString(),
        };

        StorageService.set(StorageKeys.PROFILE, updated);
        StorageService.set(StorageKeys.LANGUAGE, updated.preferredLanguage);
        return updated;
      }
    } catch (err) {
      console.warn('[ProfileService] Failed to sync remote profile:', err);
    }

    return this.getProfile();
  }

  static async updateProfile(partial: Partial<ChildProfile>): Promise<ChildProfile | null> {
    const current = this.getProfile();
    if (!current) return null;

    if (partial.name || partial.preferredLanguage) {
      try {
        await ChildApiClient.updateProfile({
          name: partial.name,
          preferredLanguage: partial.preferredLanguage,
        });
      } catch (err) {
        console.warn('[ProfileService] Remote profile update failed:', err);
      }
    }

    const updated: ChildProfile = {
      ...current,
      ...partial,
      lastActiveDate: getTodayDateString(),
    };

    StorageService.set(StorageKeys.PROFILE, updated);
    if (partial.preferredLanguage) {
      StorageService.set(StorageKeys.LANGUAGE, partial.preferredLanguage);
    }
    return updated;
  }

  static async generateLinkCode(): Promise<{ linkCode: string; expiresInSeconds: number }> {
    try {
      const res = await ChildApiClient.createLinkCode();
      if (res.success && res.linkCode) {
        return {
          linkCode: res.linkCode,
          expiresInSeconds: res.expiresInSeconds || 600,
        };
      }
    } catch (err) {
      console.warn('[ProfileService] Remote link code failed, generating fallback code:', err);
    }

    // Fallback 6-char alphanumeric code (e.g., 7K3F9Q)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return { linkCode: code, expiresInSeconds: 600 };
  }

  static resetProfile(): void {
    ChildApiClient.clearToken();
    StorageService.remove(StorageKeys.PROFILE);
  }
}
