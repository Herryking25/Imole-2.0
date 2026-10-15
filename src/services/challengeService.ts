import { CURATED_CHALLENGES } from '../data/challenges';
import { StorageService, StorageKeys } from './storageService';
import { ChildApiClient } from './api/childApiClient';
import type { Challenge, DifficultyLevel, QuestionOption } from '../types/challenge';
import type { BackendChallenge } from '../types/childApi';
import type { SkillId } from '../types/skills';
import { getDayOfYear, getTodayDateString } from '../utils/dateUtils';
import type { ChallengeSubmission } from '../types/submission';

export interface TodayAssignmentState {
  assignmentId: string;
  locked: boolean;
  swapsRemaining: number;
  completedAt: string | null;
  challenge: Challenge;
  rawBackendChallenge?: BackendChallenge;
  date: string;
}

export class ChallengeService {
  static mapBackendChallenge(bc: BackendChallenge): Challenge {
    const isMcq = bc.type === 'multiple_choice' && Array.isArray(bc.options) && bc.options.length > 0;

    const promptLower = (bc.prompt || '').toLowerCase();
    let skillId: SkillId = 'creative-problem-solving';
    if (
      promptLower.includes('naira') ||
      promptLower.includes('money') ||
      promptLower.includes('buy') ||
      promptLower.includes('save') ||
      promptLower.includes('budget') ||
      promptLower.includes('cost')
    ) {
      skillId = 'financial-literacy';
    } else if (
      promptLower.includes('math') ||
      promptLower.includes('number') ||
      promptLower.includes('multiply') ||
      promptLower.includes('add') ||
      promptLower.includes('change') ||
      promptLower.includes('calculate')
    ) {
      skillId = 'mental-math-logic';
    } else if (
      promptLower.includes('speak') ||
      promptLower.includes('convince') ||
      promptLower.includes('debate') ||
      promptLower.includes('present') ||
      promptLower.includes('argue')
    ) {
      skillId = 'persuasive-speaking';
    } else if (
      promptLower.includes('feel') ||
      promptLower.includes('friend') ||
      promptLower.includes('angry') ||
      promptLower.includes('sorry') ||
      promptLower.includes('tease')
    ) {
      skillId = 'emotional-intelligence';
    }

    const options: QuestionOption[] | undefined = isMcq
      ? bc.options.map((optStr, idx) => ({
          id: optStr,
          text: { en: optStr, pcm: optStr, yo: optStr },
          isCorrect: idx === 0,
        }))
      : undefined;

    return {
      id: bc.id,
      dayNumber: 1,
      skillId,
      difficulty: bc.difficulty === 'hard' ? 'sss' : bc.difficulty === 'medium' ? 'jss' : 'primary',
      type: isMcq ? 'mcq' : 'text',
      title: {
        en: bc.prompt.slice(0, 48) + (bc.prompt.length > 48 ? '...' : ''),
        pcm: bc.prompt.slice(0, 48) + (bc.prompt.length > 48 ? '...' : ''),
        yo: bc.prompt.slice(0, 48) + (bc.prompt.length > 48 ? '...' : ''),
      },
      scenario: {
        en: bc.prompt,
        pcm: bc.prompt,
        yo: bc.prompt,
      },
      question: {
        en: bc.prompt,
        pcm: bc.prompt,
        yo: bc.prompt,
      },
      options,
      educationalTip: {
        en: 'Consistent daily problem-solving builds lifelong confidence and sharp thinking.',
        pcm: 'As you dey practice everyday, your brain go dey sharp well well.',
        yo: 'Ise sise lojoojumo lo n mu ogbon ati oye po si.',
      },
      encouragement: {
        en: 'Fantastic job completing today’s challenge!',
        pcm: 'You do well as you finish today challenge!',
        yo: 'Ise takuntakun lo se!',
      },
      points: 10,
    };
  }

  static getCachedTodayAssignment(): TodayAssignmentState | null {
    const cached = StorageService.get<TodayAssignmentState | null>(
      StorageKeys.TODAY_ASSIGNMENT,
      null
    );
    const today = getTodayDateString();
    if (cached && cached.date === today) {
      return cached;
    }
    return null;
  }

  static async fetchTodayChallenge(): Promise<TodayAssignmentState> {
    const today = getTodayDateString();
    const cached = this.getCachedTodayAssignment();

    if (ChildApiClient.hasToken()) {
      try {
        const res = await ChildApiClient.getTodayChallenge();
        if (res.success && res.challenge) {
          const mappedChallenge = this.mapBackendChallenge(res.challenge);
          const state: TodayAssignmentState = {
            assignmentId: res.assignmentId,
            locked: Boolean(res.locked || res.completedAt),
            swapsRemaining: typeof res.swapsRemaining === 'number' ? res.swapsRemaining : 2,
            completedAt: res.completedAt || null,
            challenge: mappedChallenge,
            rawBackendChallenge: res.challenge,
            date: today,
          };
          StorageService.set(StorageKeys.TODAY_ASSIGNMENT, state);
          return state;
        }
      } catch (err) {
        console.warn('[ChallengeService] Failed to fetch remote today challenge:', err);
      }
    }

    if (cached) {
      return cached;
    }

    // Offline / fallback challenge
    const fallbackChallenge = this.getRotatingDailyChallenge();
    const fallbackState: TodayAssignmentState = {
      assignmentId: `local_assign_${Date.now()}`,
      locked: this.isLocalSubmissionCompletedToday(),
      swapsRemaining: 2,
      completedAt: null,
      challenge: fallbackChallenge,
      date: today,
    };
    StorageService.set(StorageKeys.TODAY_ASSIGNMENT, fallbackState);
    return fallbackState;
  }

  static async swapTodayChallenge(): Promise<TodayAssignmentState | null> {
    if (!ChildApiClient.hasToken()) {
      return null;
    }

    try {
      const res = await ChildApiClient.swapTodayChallenge();
      if (res.success && res.challenge) {
        const today = getTodayDateString();
        const mappedChallenge = this.mapBackendChallenge(res.challenge);
        const state: TodayAssignmentState = {
          assignmentId: res.assignmentId,
          locked: Boolean(res.locked || res.completedAt),
          swapsRemaining: typeof res.swapsRemaining === 'number' ? res.swapsRemaining : 1,
          completedAt: res.completedAt || null,
          challenge: mappedChallenge,
          rawBackendChallenge: res.challenge,
          date: today,
        };
        StorageService.set(StorageKeys.TODAY_ASSIGNMENT, state);
        return state;
      }
    } catch (err) {
      console.error('[ChallengeService] Failed to swap challenge:', err);
    }
    return null;
  }

  static getRotatingDailyChallenge(): Challenge {
    const all = this.getAllChallenges();
    if (!all.length) return CURATED_CHALLENGES[0];
    const dayOfYear = getDayOfYear();
    const index = Math.abs(dayOfYear - 1) % all.length;
    return all[index];
  }

  static getDailyChallenge(): Challenge {
    const cached = this.getCachedTodayAssignment();
    if (cached) {
      return cached.challenge;
    }
    return this.getRotatingDailyChallenge();
  }

  static isLocalSubmissionCompletedToday(): boolean {
    const today = getTodayDateString();
    const submissions = StorageService.get<ChallengeSubmission[]>(StorageKeys.SUBMISSIONS, []);
    return submissions.some((s) => s.date === today);
  }

  static isDailyChallengeCompletedToday(): boolean {
    const cached = this.getCachedTodayAssignment();
    if (cached && (cached.locked || cached.completedAt)) {
      return true;
    }
    return this.isLocalSubmissionCompletedToday();
  }

  static getAllChallenges(): Challenge[] {
    const custom = StorageService.get<Challenge[]>(StorageKeys.CUSTOM_CHALLENGES, []);
    return [...CURATED_CHALLENGES, ...custom];
  }

  static getChallengeById(id: string): Challenge | undefined {
    const cached = this.getCachedTodayAssignment();
    if (cached && cached.challenge.id === id) {
      return cached.challenge;
    }
    return this.getAllChallenges().find((c) => c.id === id);
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
