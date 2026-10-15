import { StorageService, StorageKeys } from './storageService';
import { ChildApiClient } from './api/childApiClient';
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

    // If last completed date was before yesterday and not today, streak has lapsed locally
    if (data.lastCompletedDate && data.lastCompletedDate !== today && data.lastCompletedDate !== yesterday) {
      return {
        ...data,
        currentStreak: 0,
      };
    }

    return data;
  }

  static async fetchRemoteStreak(): Promise<StreakData> {
    if (!ChildApiClient.hasToken()) {
      return this.getStreakData();
    }

    try {
      const res = await ChildApiClient.getStreak();
      if (res.success) {
        return this.updateFromRemote({
          currentStreak: res.currentStreak,
          bestStreak: res.bestStreak,
          lastCompletedDate: res.lastActiveDate,
        });
      }
    } catch (err) {
      console.warn('[StreakService] Failed to sync remote streak:', err);
    }

    return this.getStreakData();
  }

  static updateFromRemote(partial: {
    currentStreak: number;
    bestStreak: number;
    lastCompletedDate: string | null;
  }): StreakData {
    const current = this.getStreakData();
    const today = getTodayDateString();

    const updatedHistory =
      partial.lastCompletedDate && !current.streakHistory.includes(today)
        ? [...current.streakHistory, today]
        : current.streakHistory;

    const updated: StreakData = {
      ...current,
      currentStreak: partial.currentStreak,
      bestStreak: Math.max(current.bestStreak, partial.bestStreak),
      lastCompletedDate: partial.lastCompletedDate ? today : current.lastCompletedDate,
      streakHistory: updatedHistory,
    };

    StorageService.set(StorageKeys.STREAK, updated);
    return updated;
  }

  static recordCompletion(): StreakData {
    const current = this.getStreakData();
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    if (current.lastCompletedDate === today) {
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
