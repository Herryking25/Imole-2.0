import { SubmissionService } from './submissionService';
import { StreakService } from './streakService';
import { ChallengeService } from './challengeService';
import type { SkillId } from '../types/skills';
import type { OverallProgress, SkillProgress, DailyHistoryItem } from '../types/progress';

export class ProgressService {
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
        // Every 150 points increases mastery level
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
}

