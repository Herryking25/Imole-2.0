import type { SkillId } from './skills';

export interface PlatformMetrics {
  registeredChildren: number;
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  completionRate: number; // percentage
  averageStreak: number;
  totalSubmissions: number;
  skillDistribution: Record<SkillId, number>;
  weeklyRetentionRate: number;
}

export interface UserReportRow {
  childId: string;
  anonymousNickname: string;
  age: number;
  language: string;
  streak: number;
  totalPoints: number;
  challengesCompleted: number;
  joinedDate: string;
  lastActiveDate: string;
}

export interface ChallengeReportRow {
  challengeId: string;
  title: string;
  skillId: string;
  difficulty: string;
  totalAttempts: number;
  completionCount: number;
  passRatePercentage: number;
}

