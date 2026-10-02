import type { SkillId } from './skills';

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  childId: string;
  date: string; // YYYY-MM-DD
  skillId: SkillId;
  response: string;
  selectedOptionId?: string;
  isCorrect: boolean;
  score: number;
  timestamp: string;
  timeSpentSeconds?: number;
}

export interface SubmissionFeedback {
  encouragement: string;
  educationalTip: string;
  skillSpecificFeedback: string;
  pointsEarned: number;
  newStreak: number;
  bestStreak: number;
  isStreakMilestone: boolean;
}

