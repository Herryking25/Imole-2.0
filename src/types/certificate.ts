import type { SkillId } from './skills';

export interface Certificate {
  id: string;
  childName: string;
  skillId?: SkillId;
  title: string;
  description: string;
  issueDate: string;
  completedDateFormatted?: string;
  badgeIcon: string;
  iconType?: 'math' | 'finance' | 'speaking' | 'problem-solving' | 'eq' | 'general';
  issuer: string;
  isLocked: boolean;
  lockRequirement?: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'skill' | 'milestone';
  unlocked: boolean;
  unlockedDate?: string;
  requiredCount: number;
  currentCount: number;
}

