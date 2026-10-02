export interface AvatarOption {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'avatar-eagle', name: 'Eagle (Àwòdì)', emoji: '🦅', color: '#3b82f6' },
  { id: 'avatar-lion', name: 'Lion (Kìnìún)', emoji: '🦁', color: '#f59e0b' },
  { id: 'avatar-cheetah', name: 'Cheetah (Ẹkùn)', emoji: '🐆', color: '#eab308' },
  { id: 'avatar-tortoise', name: 'Tortoise (Ìjàpá)', emoji: '🐢', color: '#10b981' },
  { id: 'avatar-star', name: 'Star (Ìràwọ̀)', emoji: '⭐', color: '#8b5cf6' },
  { id: 'avatar-sun', name: 'Sun (Òòrùn)', emoji: '☀️', color: '#f97316' },
  { id: 'avatar-palm', name: 'Palm (Ọ̀pẹ)', emoji: '🌴', color: '#14b8a6' },
  { id: 'avatar-crown', name: 'Crown (Adé)', emoji: '👑', color: '#ec4899' },
];

const ANONYMOUS_ADJECTIVES = [
  'Clever', 'Brave', 'Sharp', 'Swift', 'Wise', 'Bright', 'Calm', 'Mighty', 'Radiant', 'Kind',
];

const ANONYMOUS_NOUNS = [
  'Eagle', 'Falcon', 'Cheetah', 'Lion', 'Tortoise', 'Antelope', 'Sun', 'Star', 'River', 'Warrior',
];

export function generateAnonymousNickname(): string {
  const adj = ANONYMOUS_ADJECTIVES[Math.floor(Math.random() * ANONYMOUS_ADJECTIVES.length)];
  const noun = ANONYMOUS_NOUNS[Math.floor(Math.random() * ANONYMOUS_NOUNS.length)];
  const num = Math.floor(10 + Math.random() * 90);
  return `${adj} ${noun} ${num}`;
}

export function getAvatarEmoji(avatarId: string): string {
  const found = AVATAR_OPTIONS.find((a) => a.id === avatarId);
  return found ? found.emoji : '🌟';
}

