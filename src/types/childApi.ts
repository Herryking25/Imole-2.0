import type { SupportedLanguage } from './i18n';

export interface CreateChildPayload {
  name: string;
  age: number;
  preferredLanguage: SupportedLanguage;
}

export interface CreateChildResponse {
  success: boolean;
  childId: string;
  anonymousUsername: string;
  token: string;
  message?: string;
}

export interface BackendChild {
  _id: string;
  name: string;
  age: number;
  preferredLanguage: SupportedLanguage;
  anonymousUsername: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface GetChildProfileResponse {
  success: boolean;
  child: BackendChild;
  message?: string;
}

export interface UpdateChildPayload {
  name?: string;
  preferredLanguage?: SupportedLanguage;
}

export interface BackendChallenge {
  id: string;
  skillId: string;
  type: 'text' | 'multiple_choice';
  difficulty: string;
  language: string;
  prompt: string;
  options: string[];
}

export interface GetTodayChallengeResponse {
  success: boolean;
  assignmentId: string;
  locked: boolean;
  swapsRemaining?: number;
  completedAt: string | null;
  challenge: BackendChallenge;
  message?: string;
}

export interface SubmitChallengePayload {
  selectedOption?: string;
  responseText?: string;
}

export interface BackendSubmission {
  _id: string;
  dailyAssignmentId: string;
  childId: string;
  responseText?: string;
  selectedOption?: string;
  isCorrect: boolean | null;
  submittedAt: string;
}

export interface BackendStreak {
  _id?: string;
  childId?: string;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
}

export interface BackendFeedback {
  encouragement?: string;
  educationalTip?: string;
  skillFeedback?: string;
}

export interface SubmitChallengeResponse {
  success: boolean;
  submission: BackendSubmission;
  isCorrect: boolean | null;
  pointsEarned: number;
  correctAnswer: string | null;
  streak: BackendStreak;
  feedback?: BackendFeedback;
  message?: string;
}

export interface GetStreakResponse {
  success: boolean;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  message?: string;
}

export interface BackendSkillSummary {
  skill: {
    _id: string;
    slug: string;
    name: string;
  };
  score: number;
  challengesCompleted: number;
}

export interface BackendRecentSubmission {
  submittedAt: string;
  isCorrect: boolean | null;
}

export interface GetProgressResponse {
  success: boolean;
  totalCompleted: number;
  totalPoints: number;
  skills: BackendSkillSummary[];
  recentSubmissions: BackendRecentSubmission[];
  message?: string;
}

export interface LinkCodeResponse {
  success: boolean;
  linkCode: string;
  expiresInSeconds: number;
  message?: string;
}

export interface LeaderboardRankItem {
  rank: number;
  anonymousUsername: string;
  points: number;
  currentStreak: number;
}

export interface GetLeaderboardResponse {
  success: boolean;
  period: 'weekly' | 'all_time';
  top: LeaderboardRankItem[];
  me?: LeaderboardRankItem;
  message?: string;
}
