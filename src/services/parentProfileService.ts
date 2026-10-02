import { StorageService, StorageKeys } from './storageService';
import type { ParentProfile, ParentProfileSetupPayload } from '../types/profile';
import { getTodayDateString } from '../utils/dateUtils';

export class ParentProfileService {
  static getProfile(): ParentProfile | null {
    return StorageService.get<ParentProfile | null>(StorageKeys.PARENT_PROFILE, null);
  }

  static isProfileComplete(): boolean {
    const profile = this.getProfile();
    return Boolean(profile && profile.parentName && profile.preferredLanguage);
  }

  static saveProfile(payload: ParentProfileSetupPayload): ParentProfile {
    const today = getTodayDateString();
    const existing = this.getProfile();

    const updatedProfile: ParentProfile = {
      id: existing?.id || `parent_${Date.now()}`,
      parentName: payload.parentName.trim(),
      relationship: payload.relationship || 'Guardian',
      preferredLanguage: payload.preferredLanguage,
      childName: (payload.childName || existing?.childName || 'Your Child').trim(),
      childAge: payload.childAge || existing?.childAge,
      email: payload.email?.trim(),
      password: payload.password || existing?.password,
      pin: payload.pin || existing?.pin,
      isEmailVerified: payload.isEmailVerified ?? existing?.isEmailVerified ?? false,
      phone: payload.phone?.trim(),
      receiveUpdates: payload.receiveUpdates ?? true,
      createdAt: existing?.createdAt || today,
      lastActiveDate: today,
    };

    StorageService.set(StorageKeys.PARENT_PROFILE, updatedProfile);
    StorageService.set(StorageKeys.LANGUAGE, payload.preferredLanguage);
    return updatedProfile;
  }

  static setPin(pin: string): ParentProfile | null {
    const current = this.getProfile();
    if (!current) return null;

    const updated: ParentProfile = {
      ...current,
      pin: pin.trim(),
      lastActiveDate: getTodayDateString(),
    };

    StorageService.set(StorageKeys.PARENT_PROFILE, updated);
    this.unlockSession();
    return updated;
  }

  static verifyPin(enteredPin: string): boolean {
    const profile = this.getProfile();
    if (!profile || !profile.pin) return true; // If no PIN set, allow access
    return profile.pin === enteredPin.trim();
  }

  static hasPin(): boolean {
    const profile = this.getProfile();
    return Boolean(profile && profile.pin && profile.pin.length === 4);
  }

  static setEmailVerified(verified: boolean = true): ParentProfile | null {
    const current = this.getProfile();
    if (!current) return null;

    const updated: ParentProfile = {
      ...current,
      isEmailVerified: verified,
      lastActiveDate: getTodayDateString(),
    };

    StorageService.set(StorageKeys.PARENT_PROFILE, updated);
    return updated;
  }

  static isSessionUnlocked(): boolean {
    return sessionStorage.getItem('imole_parent_unlocked') === 'true';
  }

  static unlockSession(): void {
    sessionStorage.setItem('imole_parent_unlocked', 'true');
  }

  static lockSession(): void {
    sessionStorage.removeItem('imole_parent_unlocked');
  }

  static updateLanguage(language: ParentProfile['preferredLanguage']): ParentProfile | null {
    const current = this.getProfile();
    if (!current) return null;

    const updated: ParentProfile = {
      ...current,
      preferredLanguage: language,
      lastActiveDate: getTodayDateString(),
    };

    StorageService.set(StorageKeys.PARENT_PROFILE, updated);
    StorageService.set(StorageKeys.LANGUAGE, language);
    return updated;
  }

  static resetProfile(): void {
    StorageService.remove(StorageKeys.PARENT_PROFILE);
    this.lockSession();
  }
}

