import { createContext } from 'react';
import type { ChildProfile } from '../types/profile';
import type { OverallProgress, StreakData } from '../types/progress';

export interface AppContextType {
  profile: ChildProfile | null;
  isOnboarded: boolean;
  progress: OverallProgress;
  streak: StreakData;
  isDailyCompleted: boolean;
  refreshState: () => void;
  resetChildProfile: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

