import type { SupportedLanguage } from './i18n';

export interface ParentRegisterPayload {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface ParentLoginPayload {
  email?: string;
  phone?: string;
  password: string;
}

export interface BackendParentUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface ParentRegisterResponse {
  success: boolean;
  parent?: BackendParentUser;
  token?: string;
  message?: string;
}

export interface ParentLoginResponse {
  success: boolean;
  parent?: BackendParentUser;
  token?: string;
  message?: string;
}

export interface LinkedChild {
  _id: string;
  name: string;
  anonymousUsername: string;
  age: number;
}

export interface LinkChildPayload {
  linkCode: string;
}

export interface LinkChildResponse {
  success: boolean;
  child?: LinkedChild;
  message?: string;
}

export interface GetParentChildrenResponse {
  success: boolean;
  children?: LinkedChild[];
  message?: string;
}

export interface ChildProgressSkillItem {
  skill: {
    _id: string;
    slug: string;
    name: string;
  };
  score: number;
  challengesCompleted: number;
}

export interface BackendChildDetail {
  _id: string;
  name: string;
  age: number;
  preferredLanguage?: SupportedLanguage | string;
  anonymousUsername: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChildProgressStreak {
  current: number;
  best: number;
}

export interface GetChildProgressResponse {
  success: boolean;
  child?: BackendChildDetail;
  streak?: ChildProgressStreak;
  skills?: ChildProgressSkillItem[];
  certificatesEarned?: number;
  message?: string;
}

export interface ShareCardData {
  name: string;
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  totalPoints: number;
  topSkill: string;
  certificatesEarned: number;
  generatedAt: string;
}

export interface GetChildShareCardResponse {
  success: boolean;
  card?: ShareCardData;
  message?: string;
}

export interface BackendCertificateItem {
  _id: string;
  childId: string;
  skillId: {
    _id: string;
    slug: string;
    name: string;
  };
  title: string;
  issuedAt: string;
  fileUrl?: string;
}

export interface GetChildCertificatesResponse {
  success: boolean;
  certificates?: BackendCertificateItem[];
  message?: string;
}
