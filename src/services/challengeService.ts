import { CURATED_CHALLENGES } from '../data/challenges';
import { StorageService, StorageKeys } from './storageService';
import type { Challenge, DifficultyLevel } from '../types/challenge';
import type { SkillId } from '../types/skills';
import { getDayOfYear, getTodayDateString } from '../utils/dateUtils';
import type { ChallengeSubmission } from '../types/submission';

export class ChallengeService {
  static getAllChallenges(): Challenge[] {
    const custom = StorageService.get<Challenge[]>(StorageKeys.CUSTOM_CHALLENGES, []);
    return [...CURATED_CHALLENGES, ...custom];
  }

  static getChallengeById(id: string): Challenge | undefined {
    return this.getAllChallenges().find((c) => c.id === id);
  }

  static getDailyChallenge(): Challenge {
    const all = this.getAllChallenges();
    if (!all.length) {
      return CURATED_CHALLENGES[0];
    }
    // Rotate deterministically by day of the year so all kids across Nigeria get the same daily challenge
    const dayOfYear = getDayOfYear();
    const index = Math.abs(dayOfYear - 1) % all.length;
    return all[index];
  }

  static isDailyChallengeCompletedToday(): boolean {
    const today = getTodayDateString();
    const daily = this.getDailyChallenge();
    const submissions = StorageService.get<ChallengeSubmission[]>(StorageKeys.SUBMISSIONS, []);
    return submissions.some((s) => s.challengeId === daily.id && s.date === today);
  }

  static saveCustomChallenge(challenge: Challenge): Challenge {
    const custom = StorageService.get<Challenge[]>(StorageKeys.CUSTOM_CHALLENGES, []);
    const existingIndex = custom.findIndex((c) => c.id === challenge.id);

    let updated: Challenge[];
    if (existingIndex >= 0) {
      updated = [...custom];
      updated[existingIndex] = challenge;
    } else {
      updated = [challenge, ...custom];
    }

    StorageService.set(StorageKeys.CUSTOM_CHALLENGES, updated);
    return challenge;
  }

  static filterChallenges(options?: {
    skillId?: SkillId | 'all';
    difficulty?: DifficultyLevel | 'all';
    searchQuery?: string;
  }): Challenge[] {
    let list = this.getAllChallenges();

    if (options?.skillId && options.skillId !== 'all') {
      list = list.filter((c) => c.skillId === options.skillId);
    }
    if (options?.difficulty && options.difficulty !== 'all') {
      list = list.filter((c) => c.difficulty === options.difficulty);
    }
    if (options?.searchQuery?.trim()) {
      const q = options.searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.en.toLowerCase().includes(q) ||
          c.title.yo.toLowerCase().includes(q) ||
          c.title.pcm.toLowerCase().includes(q) ||
          c.scenario.en.toLowerCase().includes(q)
      );
    }

    return list;
  }
}

