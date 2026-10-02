import { useApp } from './useApp';

export function useStreak() {
  const { streak } = useApp();
  return {
    currentStreak: streak.currentStreak,
    bestStreak: streak.bestStreak,
    lastCompletedDate: streak.lastCompletedDate,
    history: streak.streakHistory,
  };
}

