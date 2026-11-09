import { createContext } from 'react';
import type {
  BackendParentUser,
  LinkedChild,
  ParentLoginPayload,
  ParentLoginResponse,
  ParentRegisterPayload,
  ParentRegisterResponse,
  LinkChildResponse,
  GetChildProgressResponse,
  ShareCardData,
  BackendCertificateItem,
  ChallengeHistoryItem,
} from '../types/parentApi';

export interface ParentContextType {
  parent: BackendParentUser | null;
  isAuthenticated: boolean;
  children: LinkedChild[];
  selectedChild: LinkedChild | null;
  selectedChildId: string | null;
  setSelectedChildId: (childId: string) => void;
  progressData: GetChildProgressResponse | null;
  shareCardData: ShareCardData | null;
  certificates: BackendCertificateItem[];
  challengeHistory: ChallengeHistoryItem[];
  isLoadingChildren: boolean;
  isLoadingProgress: boolean;
  isLoadingShareCard: boolean;
  isLoadingCertificates: boolean;
  isLoadingChallengeHistory: boolean;
  login: (payload: ParentLoginPayload) => Promise<ParentLoginResponse>;
  register: (payload: ParentRegisterPayload) => Promise<ParentRegisterResponse>;
  logout: () => void;
  linkChild: (linkCode: string) => Promise<LinkChildResponse>;
  refreshChildren: () => Promise<void>;
  refreshProgress: (childId?: string) => Promise<void>;
  refreshShareCard: (childId?: string) => Promise<void>;
  refreshCertificates: (childId?: string) => Promise<void>;
  refreshChallengeHistory: (childId?: string) => Promise<void>;
}

export const ParentContext = createContext<ParentContextType | undefined>(undefined);
