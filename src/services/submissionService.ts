import { StorageService, StorageKeys } from './storageService';
import type { ChallengeSubmission, SubmissionFeedback } from '../types/submission';
import type { Challenge } from '../types/challenge';
import type { SupportedLanguage } from '../types/i18n';
import { ProfileService } from './profileService';
import { StreakService } from './streakService';
import { getTodayDateString } from '../utils/dateUtils';

export class SubmissionService {
  static getSubmissions(): ChallengeSubmission[] {
    return StorageService.get<ChallengeSubmission[]>(StorageKeys.SUBMISSIONS, []);
  }

  static getSubmissionsByChild(childId: string): ChallengeSubmission[] {
    return this.getSubmissions().filter((s) => s.childId === childId);
  }

  static submitResponse(
    challenge: Challenge,
    response: string,
    selectedOptionId?: string,
    timeSpentSeconds: number = 30
  ): SubmissionFeedback {
    const profile = ProfileService.getProfile();
    const childId = profile ? profile.id : 'guest';
    const lang: SupportedLanguage = profile ? profile.preferredLanguage : 'en';
    const today = getTodayDateString();

    let isCorrect = true;
    let score = challenge.points;

    if (challenge.type === 'mcq' && selectedOptionId && challenge.options) {
      const option = challenge.options.find((o) => o.id === selectedOptionId);
      if (option) {
        isCorrect = option.isCorrect;
        score = isCorrect ? challenge.points : Math.round(challenge.points * 0.4);
      }
    } else {
      // Text response: awarded full points for completing thoughtful answer
      isCorrect = response.trim().length > 10;
      score = isCorrect ? challenge.points : Math.round(challenge.points * 0.5);
    }

    const newSubmission: ChallengeSubmission = {
      id: `sub_${Date.now()}`,
      challengeId: challenge.id,
      childId,
      date: today,
      skillId: challenge.skillId,
      response,
      selectedOptionId,
      isCorrect,
      score,
      timestamp: new Date().toISOString(),
      timeSpentSeconds,
    };

    const existing = this.getSubmissions();
    StorageService.set(StorageKeys.SUBMISSIONS, [newSubmission, ...existing]);

    // Update streak
    const streakResult = StreakService.recordCompletion();

    // Check streak milestone (3, 7, 14, 30 days)
    const isStreakMilestone = [3, 7, 14, 21, 30].includes(streakResult.currentStreak);

    return {
      encouragement: challenge.encouragement[lang] || challenge.encouragement.en,
      educationalTip: challenge.educationalTip[lang] || challenge.educationalTip.en,
      skillSpecificFeedback: isCorrect
        ? 'Outstanding understanding demonstrated for this life skill.'
        : 'Good effort! Review the educational tip to strengthen this skill.',
      pointsEarned: score,
      newStreak: streakResult.currentStreak,
      bestStreak: streakResult.bestStreak,
      isStreakMilestone,
    };
  }
}

