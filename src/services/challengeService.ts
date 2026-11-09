import { CURATED_CHALLENGES } from '../data/challenges';
import { StorageService, StorageKeys } from './storageService';
import { ChildApiClient } from './api/childApiClient';
import type { Challenge, DifficultyLevel, QuestionOption } from '../types/challenge';
import type { BackendChallenge } from '../types/childApi';
import type { SkillId } from '../types/skills';
import { getDayOfYear, getTodayDateString } from '../utils/dateUtils';
import type { ChallengeSubmission } from '../types/submission';

/**
 * Resolve a backend skillId (MongoDB ObjectId) to an internal SkillId.
 * Uses the skills cache written by SkillsService. Falls back to
 * 'creative-problem-solving' so the keyword fallback in mapBackendChallenge
 * can still refine it.
 */
function resolveSkillId(backendSkillId: string): SkillId {
  try {
    const raw = localStorage.getItem('imole_v1_skills_cache');
    if (raw) {
      const cache = JSON.parse(raw) as {
        skills: Array<{ _id: string; slug: string }>;
      };
      const found = cache.skills.find(
        (s) => s._id === backendSkillId || s.slug === backendSkillId
      );
      if (found) {
        const slugMap: Record<string, SkillId> = {
          mental_math: 'mental-math-logic',
          persuasive_speaking: 'persuasive-speaking',
          financial_literacy: 'financial-literacy',
          creative_problem_solving: 'creative-problem-solving',
          emotional_intelligence: 'emotional-intelligence',
        };
        return slugMap[found.slug] ?? 'creative-problem-solving';
      }
    }
  } catch {
    /* ignore storage errors */
  }
  return 'creative-problem-solving';
}

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
    const isMcq =
      bc.type === 'multiple_choice' &&
      Array.isArray(bc.options) &&
      bc.options.length > 0;

    // Resolve skillId: skills cache first, then keyword heuristic
    let skillId: SkillId = resolveSkillId(bc.skillId);

    if (skillId === 'creative-problem-solving') {
      const p = (bc.prompt || '').toLowerCase();
      if (p.includes('naira') || p.includes('money') || p.includes('buy') ||
          p.includes('save') || p.includes('budget') || p.includes('cost')) {
        skillId = 'financial-literacy';
      } else if (p.includes('math') || p.includes('number') || p.includes('multiply') ||
                 p.includes('add') || p.includes('change') || p.includes('calculate')) {
        skillId = 'mental-math-logic';
      } else if (p.includes('speak') || p.includes('convince') || p.includes('debate') ||
                 p.includes('present') || p.includes('argue')) {
        skillId = 'persuasive-speaking';
      } else if (p.includes('feel') || p.includes('friend') || p.includes('angry') ||
                 p.includes('sorry') || p.includes('tease')) {
        skillId = 'emotional-intelligence';
      }
    }

    const options: QuestionOption[] | undefined = isMcq
      ? bc.options.map((optStr) => ({
          id: optStr,
          text: { en: optStr, pcm: optStr, yo: optStr },
          isCorrect: false, // grading is done server-side
        }))
      : undefined;

    const shortTitle =
      bc.prompt.slice(0, 60) + (bc.prompt.length > 60 ? '\u2026' : '');

    return {
      id: bc.id,
      dayNumber: 1,
      skillId,
      difficulty:
        bc.difficulty === 'hard' ? 'sss' :
        bc.difficulty === 'medium' ? 'jss' : 'primary',
      type: isMcq ? 'mcq' : 'text',
      title: { en: shortTitle, pcm: shortTitle, yo: shortTitle },
      scenario: { en: bc.prompt, pcm: bc.prompt, yo: bc.prompt },
      question: { en: bc.prompt, pcm: bc.prompt, yo: bc.prompt },
      options,
      educationalTip: {
        en: "Consistent daily practice builds lifelong confidence and sharp thinking.",
        pcm: 'As you dey practice everyday, your brain go dey sharp well well.',
        yo: 'Ise sise lojoojumo lo n mu ogbon ati oye po si.',
      },
      encouragement: {
        en: "Fantastic job completing today's challenge!",
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
            swapsRemaining:
              typeof res.swapsRemaining === 'number' ? res.swapsRemaining : 2,
            completedAt: res.completedAt || null,
            challenge: mappedChallenge,
            rawBackendChallenge: res.challenge,
            date: today,
          };
          StorageService.set(StorageKeys.TODAY_ASSIGNMENT, state);
          return state;
        }
      } catch (err) {
        console.warn(
          '[ChallengeService] Failed to fetch remote today challenge:',
          err
        );
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
          swapsRemaining:
            typeof res.swapsRemaining === 'number' ? res.swapsRemaining : 1,
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
    const submissions = StorageService.get<ChallengeSubmission[]>(
      StorageKeys.SUBMISSIONS,
      []
    );
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
    const custom = StorageService.get<Challenge[]>(
      StorageKeys.CUSTOM_CHALLENGES,
      []
    );
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
    const custom = StorageService.get<Challenge[]>(
      StorageKeys.CUSTOM_CHALLENGES,
      []
    );
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
