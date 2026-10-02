import { StorageService, StorageKeys } from './storageService';
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

  static createProfile(payload: ProfileSetupPayload): ChildProfile {
    const today = getTodayDateString();
    const newProfile: ChildProfile = {
      id: `child_${Date.now()}`,
      name: payload.name.trim(),
      firstName: payload.firstName?.trim(),
      lastName: payload.lastName?.trim(),
      username: payload.username?.trim(),
      age: Number(payload.age),
      ageGroup: payload.ageGroup,
      preferredLanguage: payload.preferredLanguage,
      avatarId: payload.avatarId || 'avatar-eagle',
      anonymousNickname: payload.username?.trim() || generateAnonymousNickname(),
      createdAt: today,
      lastActiveDate: today,
    };

    StorageService.set(StorageKeys.PROFILE, newProfile);
    StorageService.set(StorageKeys.LANGUAGE, payload.preferredLanguage);
    return newProfile;
  }

  static updateProfile(partial: Partial<ChildProfile>): ChildProfile | null {
    const current = this.getProfile();
    if (!current) return null;
    const updated: ChildProfile = {
      ...current,
      ...partial,
      lastActiveDate: getTodayDateString(),
    };
    StorageService.set(StorageKeys.PROFILE, updated);
    return updated;
  }

  static resetProfile(): void {
    StorageService.remove(StorageKeys.PROFILE);
  }
}
