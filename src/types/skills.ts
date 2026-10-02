export type SkillId =
  | 'mental-math-logic'
  | 'persuasive-speaking'
  | 'financial-literacy'
  | 'creative-problem-solving'
  | 'emotional-intelligence';

export interface SkillMeta {
  id: SkillId;
  name: string;
  yorubaName: string;
  pidginName: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  icon: string;
}

