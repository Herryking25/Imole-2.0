import type { SupportedLanguage } from './i18n';

export type AgeGroup = '6 - 9' | '10 - 13' | '14 - 17';

export interface ChildProfile {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  age: number;
  ageGroup?: AgeGroup;
  preferredLanguage: SupportedLanguage;
  avatarId: string;
  anonymousNickname: string;
  createdAt: string;
  lastActiveDate: string;
}

export interface ProfileSetupPayload {
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  age: number;
  ageGroup?: AgeGroup;
  preferredLanguage: SupportedLanguage;
  avatarId?: string;
}

export type ParentRole = 'Mother' | 'Father' | 'Guardian' | 'Mentor' | 'Other';

export interface ParentProfile {
  id: string;
  parentName: string;
  relationship?: ParentRole;
  preferredLanguage: SupportedLanguage;
  childName?: string;
  childAge?: number;
  email?: string;
  password?: string;
  pin?: string;
  isEmailVerified?: boolean;
  phone?: string;
  receiveUpdates?: boolean;
  createdAt: string;
  lastActiveDate: string;
}

export interface ParentProfileSetupPayload {
  parentName: string;
  relationship?: ParentRole;
  preferredLanguage: SupportedLanguage;
  childName?: string;
  childAge?: number;
  email?: string;
  password?: string;
  pin?: string;
  isEmailVerified?: boolean;
  phone?: string;
  receiveUpdates?: boolean;
}


