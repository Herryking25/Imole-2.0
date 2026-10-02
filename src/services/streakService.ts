import { StorageService, StorageKeys } from './storageService';
import type { StreakData } from '../types/progress';
import { getTodayDateString, getYesterdayDateString } from '../utils/dateUtils';

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  bestStreak: 0,
  lastCompletedDate: null,
  streakHistory: [],
};

export class StreakService {
  static getStreakData(): StreakData {
    const data = StorageService.get<StreakData>(StorageKeys.STREAK, DEFAULT_STREAK);
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    // If last completed date was before yesterday and not today, current streak has lapsed
    if (data.lastCompletedDate && data.lastCompletedDate !== today && data.lastCompletedDate !== yesterday) {
      return {
        ...data,
        currentStreak: 0,
      };
    }

    return data;
  }

  static recordCompletion(): StreakData {
    const current = this.getStreakData();
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    if (current.lastCompletedDate === today) {
      // Already recorded today
      return current;
    }

    let newCurrentStreak = 1;
    if (current.lastCompletedDate === yesterday) {
      newCurrentStreak = current.currentStreak + 1;
    }

    const newBestStreak = Math.max(current.bestStreak, newCurrentStreak);
    const updatedHistory = current.streakHistory.includes(today)
      ? current.streakHistory
      : [...current.streakHistory, today];

    const updated: StreakData = {
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      lastCompletedDate: today,
      streakHistory: updatedHistory,
    };

    StorageService.set(StorageKeys.STREAK, updated);
    return updated;
  }
}

