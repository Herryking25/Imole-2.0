/**
 * SkillsService — fetches the 5 skills from the backend and caches them
 * in localStorage so they're available offline.
 *
 * API: GET /skills → { success, skills: [{ _id, slug, name }] }
 */
import { ChildApiClient } from './api/childApiClient';
import type { BackendSkill } from '../types/childApi';
import type { SkillId } from '../types/skills';

const SKILLS_CACHE_KEY = 'imole_v1_skills_cache';
const SKILLS_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 h

interface SkillsCache {
  fetchedAt: number;
  skills: BackendSkill[];
}

/** Maps backend slug → internal SkillId used throughout the app */
export function slugToSkillId(slug: string): SkillId {
  const map: Record<string, SkillId> = {
    mental_math: 'mental-math-logic',
    'mental-math': 'mental-math-logic',
    persuasive_speaking: 'persuasive-speaking',
    'persuasive-speaking': 'persuasive-speaking',
    financial_literacy: 'financial-literacy',
    'financial-literacy': 'financial-literacy',
    creative_problem_solving: 'creative-problem-solving',
    'creative-problem-solving': 'creative-problem-solving',
    emotional_intelligence: 'emotional-intelligence',
    'emotional-intelligence': 'emotional-intelligence',
  };
  return map[slug] ?? 'creative-problem-solving';
}

export class SkillsService {
  /** Return cached skills if still fresh, otherwise fetch from API */
  static async getSkills(): Promise<BackendSkill[]> {
    const cached = this.getCached();
    if (cached) return cached;
    return this.fetchAndCache();
  }

  /** Force a fresh fetch from the backend */
  static async fetchAndCache(): Promise<BackendSkill[]> {
    try {
      const res = await ChildApiClient.getSkills();
      if (res.success && Array.isArray(res.skills) && res.skills.length > 0) {
        const cache: SkillsCache = { fetchedAt: Date.now(), skills: res.skills };
        try {
          localStorage.setItem(SKILLS_CACHE_KEY, JSON.stringify(cache));
        } catch {
          /* storage full — continue without caching */
        }
        return res.skills;
      }
    } catch (err) {
      console.warn('[SkillsService] Failed to fetch skills from backend:', err);
    }
    return this.getCached() ?? this.getDefaultSkills();
  }

  /** Look up a single skill by backend ObjectId (uses local cache first) */
  static async getSkillById(id: string): Promise<BackendSkill | null> {
    const cached = this.getCached();
    if (cached) {
      const found = cached.find((s) => s._id === id);
      if (found) return found;
    }
    try {
      const res = await ChildApiClient.getSkillById(id);
      if (res.success && res.skill) return res.skill;
    } catch {
      /* fall through */
    }
    return null;
  }

  /** Resolve a backend skillId (ObjectId) to a friendly display name */
  static async resolveSkillName(skillId: string): Promise<string> {
    const skill = await this.getSkillById(skillId);
    return skill?.name ?? 'Life Skill';
  }

  // ── Private helpers ──────────────────────────────────────────────────

  private static getCached(): BackendSkill[] | null {
    try {
      const raw = localStorage.getItem(SKILLS_CACHE_KEY);
      if (!raw) return null;
      const cache = JSON.parse(raw) as SkillsCache;
      if (Date.now() - cache.fetchedAt > SKILLS_CACHE_TTL_MS) return null;
      return cache.skills;
    } catch {
      return null;
    }
  }

  private static getDefaultSkills(): BackendSkill[] {
    return [
      { _id: 'mental_math', slug: 'mental_math', name: 'Mental Math' },
      { _id: 'persuasive_speaking', slug: 'persuasive_speaking', name: 'Persuasive Speaking' },
      { _id: 'financial_literacy', slug: 'financial_literacy', name: 'Financial Literacy' },
      { _id: 'creative_problem_solving', slug: 'creative_problem_solving', name: 'Creative Problem-Solving' },
      { _id: 'emotional_intelligence', slug: 'emotional_intelligence', name: 'Emotional Intelligence' },
    ];
  }
}