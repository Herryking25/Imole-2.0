import type { SkillId } from './skills';

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastCompletedDate: string | null;
  streakHistory: string[];
}

export interface SkillProgress {
  skillId: SkillId;
  points: number;
  challengesCompleted: number;
  masteryLevel: number;
}

export interface DailyHistoryItem {
  id: string;
  date: string;
  challengeId: string;
  skillId: SkillId;
  challengeTitle: string;
  score: number;
  completedAt: string;
}

export interface OverallProgress {
  totalPoints: number;
  totalCompleted: number;
  streak: StreakData;
  skills: Record<SkillId, SkillProgress>;
  history: DailyHistoryItem[];
}

