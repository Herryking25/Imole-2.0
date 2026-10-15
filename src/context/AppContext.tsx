import React, { useState, useEffect, useCallback } from 'react';
import type { ChildProfile } from '../types/profile';
import type { OverallProgress, StreakData } from '../types/progress';
import { ProfileService } from '../services/profileService';
import { ProgressService } from '../services/progressService';
import { StreakService } from '../services/streakService';
import { ChallengeService } from '../services/challengeService';
import { ChildApiClient } from '../services/api/childApiClient';
import { AppContext } from './AppContextObject';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ChildProfile | null>(() => ProfileService.getProfile());
  const [progress, setProgress] = useState<OverallProgress>(() => ProgressService.getOverallProgress());
  const [streak, setStreak] = useState<StreakData>(() => StreakService.getStreakData());
  const [isDailyCompleted, setIsDailyCompleted] = useState<boolean>(() =>
    ChallengeService.isDailyChallengeCompletedToday()
  );
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const refreshState = useCallback(() => {
    setProfile(ProfileService.getProfile());
    setProgress(ProgressService.getOverallProgress());
    setStreak(StreakService.getStreakData());
    setIsDailyCompleted(ChallengeService.isDailyChallengeCompletedToday());
  }, []);

  const syncWithBackend = useCallback(async () => {
    if (!ChildApiClient.hasToken()) {
      refreshState();
      return;
    }

    setIsSyncing(true);
    try {
      const [remoteProfile, remoteStreak, remoteProgress, todayAssignment] = await Promise.allSettled([
        ProfileService.fetchRemoteProfile(),
        StreakService.fetchRemoteStreak(),
        ProgressService.fetchRemoteProgress(),
        ChallengeService.fetchTodayChallenge(),
      ]);

      if (remoteProfile.status === 'fulfilled' && remoteProfile.value) {
        setProfile(remoteProfile.value);
      }
      if (remoteStreak.status === 'fulfilled' && remoteStreak.value) {
        setStreak(remoteStreak.value);
      }
      if (remoteProgress.status === 'fulfilled' && remoteProgress.value) {
        setProgress(remoteProgress.value);
      }
      if (todayAssignment.status === 'fulfilled') {
        setIsDailyCompleted(ChallengeService.isDailyChallengeCompletedToday());
      }
    } catch (err) {
      console.warn('[AppContext] Error during background backend sync:', err);
    } finally {
      setIsSyncing(false);
      refreshState();
    }
  }, [refreshState]);

  // Initial sync on mount
  useEffect(() => {
    syncWithBackend();
  }, [syncWithBackend]);

  const resetChildProfile = useCallback(() => {
    ProfileService.resetProfile();
    refreshState();
  }, [refreshState]);

  const isOnboarded = Boolean(profile && profile.name);

  return (
    <AppContext.Provider
      value={{
        profile,
        isOnboarded,
        progress,
        streak,
        isDailyCompleted,
        isSyncing,
        refreshState,
        syncWithBackend,
        resetChildProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
