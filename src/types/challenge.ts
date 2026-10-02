import type { SkillId } from './skills';
import type { SupportedLanguage } from './i18n';

export type DifficultyLevel = 'primary' | 'jss' | 'sss';
export type ChallengeType = 'mcq' | 'text';

export type LocalizedString = Record<SupportedLanguage, string>;

export interface QuestionOption {
  id: string;
  text: LocalizedString;
  isCorrect: boolean;
  explanation?: LocalizedString;
}

export interface Challenge {
  id: string;
  dayNumber: number;
  skillId: SkillId;
  difficulty: DifficultyLevel;
  type: ChallengeType;
  title: LocalizedString;
  scenario: LocalizedString;
  question: LocalizedString;
  options?: QuestionOption[];
  sampleAnswer?: LocalizedString;
  educationalTip: LocalizedString;
  encouragement: LocalizedString;
  points: number;
}

