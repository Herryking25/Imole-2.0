import { SubmissionService } from './submissionService';
import { StreakService } from './streakService';
import { ChallengeService } from './challengeService';
import { ChildApiClient } from './api/childApiClient';
import type { SkillId } from '../types/skills';
import type { OverallProgress, SkillProgress, DailyHistoryItem } from '../types/progress';

export class ProgressService {
  private static mapSlugToSkillId(slug: string): SkillId {
    const normalized = slug.replace(/_/g, '-');
    if (normalized === 'mental-math') return 'mental-math-logic';
    const valid: SkillId[] = [
      'mental-math-logic',
      'persuasive-speaking',
      'financial-literacy',
      'creative-problem-solving',
      'emotional-intelligence',
    ];
    if (valid.includes(normalized as SkillId)) {
      return normalized as SkillId;
    }
    return 'creative-problem-solving';
  }

  static getOverallProgress(): OverallProgress {
    const submissions = SubmissionService.getSubmissions();
    const streak = StreakService.getStreakData();
    const allChallenges = ChallengeService.getAllChallenges();

    const skillMap: Record<SkillId, SkillProgress> = {
      'mental-math-logic': {
        skillId: 'mental-math-logic',
        points: 0,
        challengesCompleted: 0,
        masteryLevel: 1,
      },
      'persuasive-speaking': {
        skillId: 'persuasive-speaking',
        points: 0,
        challengesCompleted: 0,
        masteryLevel: 1,
      },
      'financial-literacy': {
        skillId: 'financial-literacy',
        points: 0,
        challengesCompleted: 0,
        masteryLevel: 1,
      },
      'creative-problem-solving': {
        skillId: 'creative-problem-solving',
        points: 0,
        challengesCompleted: 0,
        masteryLevel: 1,
      },
      'emotional-intelligence': {
        skillId: 'emotional-intelligence',
        points: 0,
        challengesCompleted: 0,
        masteryLevel: 1,
      },
    };

    let totalPoints = 0;

    submissions.forEach((sub) => {
      totalPoints += sub.score;
      if (skillMap[sub.skillId]) {
        skillMap[sub.skillId].points += sub.score;
        skillMap[sub.skillId].challengesCompleted += 1;
        skillMap[sub.skillId].masteryLevel = Math.min(
          5,
          1 + Math.floor(skillMap[sub.skillId].points / 150)
        );
      }
    });

    const history: DailyHistoryItem[] = submissions.map((sub) => {
      const challenge = allChallenges.find((c) => c.id === sub.challengeId);
      return {
        id: sub.id,
        date: sub.date,
        challengeId: sub.challengeId,
        skillId: sub.skillId,
        challengeTitle: challenge ? challenge.title.en : 'Life Skill Challenge',
        score: sub.score,
        completedAt: sub.timestamp,
      };
    });

    return {
      totalPoints,
      totalCompleted: submissions.length,
      streak,
      skills: skillMap,
      history,
    };
  }

  static async fetchRemoteProgress(): Promise<OverallProgress> {
    const local = this.getOverallProgress();

    if (!ChildApiClient.hasToken()) {
      return local;
    }

    try {
      const res = await ChildApiClient.getProgress();
      if (res.success) {
        const skillMap = { ...local.skills };

        if (Array.isArray(res.skills) && res.skills.length > 0) {
          res.skills.forEach((s) => {
            const mappedId = this.mapSlugToSkillId(s.skill.slug);
            if (skillMap[mappedId]) {
              skillMap[mappedId].points = Math.max(skillMap[mappedId].points, s.score);
              skillMap[mappedId].challengesCompleted = Math.max(
                skillMap[mappedId].challengesCompleted,
                s.challengesCompleted
              );
              skillMap[mappedId].masteryLevel = Math.min(
                5,
                1 + Math.floor(skillMap[mappedId].points / 150)
              );
            }
          });
        }

        return {
          ...local,
          totalPoints: Math.max(local.totalPoints, res.totalPoints ?? 0),
          totalCompleted: Math.max(local.totalCompleted, res.totalCompleted ?? 0),
          skills: skillMap,
        };
      }
    } catch (err) {
      console.warn('[ProgressService] Failed to sync remote progress:', err);
    }

    return local;
  }
}
