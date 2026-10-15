import { useState, useEffect, useCallback } from 'react';
import { LeaderboardService } from '../services/leaderboardService';
import type { LeaderboardEntry } from '../types/leaderboard';
import { useApp } from './useApp';

export function useLeaderboard(initialPeriod: 'weekly' | 'all_time' = 'weekly') {
  const { progress } = useApp();
  const [period, setPeriod] = useState<'weekly' | 'all_time'>(initialPeriod);
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() =>
    LeaderboardService.getLeaderboard(progress)
  );
  const [currentUserEntry, setCurrentUserEntry] = useState<LeaderboardEntry | undefined>(() =>
    entries.find((e) => e.isCurrentUser)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRemoteLeaderboard = useCallback(async (p: 'weekly' | 'all_time') => {
    setIsLoading(true);
    try {
      const res = await LeaderboardService.fetchLeaderboard(p, progress);
      setEntries(res.entries);
      if (res.currentUser) {
        setCurrentUserEntry(res.currentUser);
      } else {
        setCurrentUserEntry(res.entries.find((e) => e.isCurrentUser));
      }
    } catch (err) {
      console.warn('[useLeaderboard] Error fetching remote leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  }, [progress]);

  useEffect(() => {
    fetchRemoteLeaderboard(period);
  }, [period, fetchRemoteLeaderboard]);

  return {
    entries,
    currentUserEntry,
    period,
    setPeriod,
    isLoading,
    refetch: () => fetchRemoteLeaderboard(period),
  };
}
