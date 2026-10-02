import type { SkillId, SkillMeta } from '../types/skills';

export const SKILLS_DATA: Record<SkillId, SkillMeta> = {
  'mental-math-logic': {
    id: 'mental-math-logic',
    name: 'Mental Math & Logic',
    yorubaName: 'Ìṣirò Orí & Ọgbọ́n Ìrònú',
    pidginName: 'Sharp Brain & Quick Math',
    description: 'Solve real-world number puzzles, market math, and logical riddles quickly without paper.',
    color: '#2563eb', // blue
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    accentColor: '#1d4ed8',
    icon: 'Calculator',
  },
  'persuasive-speaking': {
    id: 'persuasive-speaking',
    name: 'Persuasive Speaking',
    yorubaName: 'Ọ̀rọ̀ Sísọ Pẹ̀lú Ọgbọ́n',
    pidginName: 'Sweet Talk & Bold Pitch',
    description: 'Express yourself with clarity, convince listeners politely, and build stage confidence.',
    color: '#7c3aed', // purple
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    accentColor: '#6d28d9',
    icon: 'Mic',
  },
  'financial-literacy': {
    id: 'financial-literacy',
    name: 'Financial Literacy',
    yorubaName: 'Ọgbọ́n Ìṣúná Owó',
    pidginName: 'Money Sense & Savings',
    description: 'Understand budgeting, wise spending, savings, profit, and financial independence.',
    color: '#059669', // emerald
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    accentColor: '#047857',
    icon: 'Wallet',
  },
  'creative-problem-solving': {
    id: 'creative-problem-solving',
    name: 'Creative Problem-Solving',
    yorubaName: 'Ọgbọ́n Àtinúdá Lóju Ìpèníjà',
    pidginName: 'Hustle Smart & Fix Wahala',
    description: 'Find clever, inventive solutions to daily obstacles using whatever tools you have.',
    color: '#ea580c', // orange
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
    accentColor: '#c2410c',
    icon: 'Lightbulb',
  },
  'emotional-intelligence': {
    id: 'emotional-intelligence',
    name: 'Emotional Intelligence',
    yorubaName: 'Ìmọ̀ Ẹ̀mí & Ìwà Ọmọlúwàbí',
    pidginName: 'Cool Temper & Empathy',
    description: 'Understand emotions, navigate conflicts peacefully, practice empathy, and be a good friend.',
    color: '#db2777', // pink
    bgColor: '#fdf2f8',
    borderColor: '#fbcfe8',
    accentColor: '#be185d',
    icon: 'HeartHandshake',
  },
};

export const SKILL_LIST: SkillMeta[] = Object.values(SKILLS_DATA);

