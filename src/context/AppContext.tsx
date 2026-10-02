import React, { useState, useCallback } from 'react';
import type { ChildProfile } from '../types/profile';
import type { OverallProgress, StreakData } from '../types/progress';
import { ProfileService } from '../services/profileService';
import { ProgressService } from '../services/progressService';
import { StreakService } from '../services/streakService';
import { ChallengeService } from '../services/challengeService';
import { AppContext } from './AppContextObject';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ChildProfile | null>(() => ProfileService.getProfile());
  const [progress, setProgress] = useState<OverallProgress>(() => ProgressService.getOverallProgress());
  const [streak, setStreak] = useState<StreakData>(() => StreakService.getStreakData());
  const [isDailyCompleted, setIsDailyCompleted] = useState<boolean>(() =>
    ChallengeService.isDailyChallengeCompletedToday()
  );

  const refreshState = useCallback(() => {
    setProfile(ProfileService.getProfile());
    setProgress(ProgressService.getOverallProgress());
    setStreak(StreakService.getStreakData());
    setIsDailyCompleted(ChallengeService.isDailyChallengeCompletedToday());
  }, []);

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
        refreshState,
        resetChildProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

