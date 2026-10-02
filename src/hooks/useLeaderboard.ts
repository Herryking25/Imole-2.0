import { useMemo } from 'react';
import { LeaderboardService } from '../services/leaderboardService';
import type { LeaderboardEntry } from '../types/leaderboard';
import { useApp } from './useApp';

export function useLeaderboard() {
  const { progress } = useApp();
  const entries = useMemo<LeaderboardEntry[]>(
    () => LeaderboardService.getLeaderboard(progress),
    [progress]
  );

  return {
    entries,
    currentUserEntry: entries.find((e) => e.isCurrentUser),
  };
}

