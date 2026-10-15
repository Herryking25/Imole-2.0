import { StorageService, StorageKeys } from './storageService';
import { ChildApiClient } from './api/childApiClient';
import type { ChallengeSubmission, SubmissionFeedback } from '../types/submission';
import type { Challenge } from '../types/challenge';
import type { SupportedLanguage } from '../types/i18n';
import { ProfileService } from './profileService';
import { StreakService } from './streakService';
import type { TodayAssignmentState } from './challengeService';
import { getTodayDateString } from '../utils/dateUtils';

export class SubmissionService {
  static getSubmissions(): ChallengeSubmission[] {
    return StorageService.get<ChallengeSubmission[]>(StorageKeys.SUBMISSIONS, []);
  }

  static getSubmissionsByChild(childId: string): ChallengeSubmission[] {
    return this.getSubmissions().filter((s) => s.childId === childId);
  }

  static async submitResponse(
    challenge: Challenge,
    response: string,
    selectedOptionId?: string,
    timeSpentSeconds: number = 30
  ): Promise<SubmissionFeedback> {
    const profile = ProfileService.getProfile();
    const childId = profile ? profile.id : 'guest';
    const lang: SupportedLanguage = profile ? profile.preferredLanguage : 'en';
    const today = getTodayDateString();

    // 1. Try remote submission if authenticated
    if (ChildApiClient.hasToken()) {
      try {
        const payload = {
          selectedOption: selectedOptionId || undefined,
          responseText: response || undefined,
        };

        const res = await ChildApiClient.submitTodayChallenge(payload);

        if (res.success && res.submission) {
          // Lock today's assignment in cache
          const cachedAssignment = StorageService.get<TodayAssignmentState | null>(
            StorageKeys.TODAY_ASSIGNMENT,
            null
          );
          if (cachedAssignment) {
            StorageService.set(StorageKeys.TODAY_ASSIGNMENT, {
              ...cachedAssignment,
              locked: true,
              completedAt: res.submission.submittedAt || new Date().toISOString(),
            });
          }

          // Update streak cache with remote streak
          if (res.streak) {
            StreakService.updateFromRemote({
              currentStreak: res.streak.currentStreak,
              bestStreak: res.streak.bestStreak,
              lastCompletedDate: today,
            });
          }

          // Record submission locally
          const remoteSubmission: ChallengeSubmission = {
            id: res.submission._id,
            challengeId: challenge.id,
            childId,
            date: today,
            skillId: challenge.skillId,
            response,
            selectedOptionId,
            isCorrect: Boolean(res.isCorrect ?? true),
            score: res.pointsEarned ?? 10,
            timestamp: res.submission.submittedAt || new Date().toISOString(),
            timeSpentSeconds,
          };

          const existing = this.getSubmissions();
          StorageService.set(StorageKeys.SUBMISSIONS, [remoteSubmission, ...existing]);

          const currentStreak = res.streak?.currentStreak ?? 1;
          const bestStreak = res.streak?.bestStreak ?? 1;

          return {
            encouragement:
              res.feedback?.encouragement ||
              challenge.encouragement[lang] ||
              challenge.encouragement.en,
            educationalTip:
              res.feedback?.educationalTip ||
              challenge.educationalTip[lang] ||
              challenge.educationalTip.en,
            skillSpecificFeedback:
              res.feedback?.skillFeedback ||
              'Great job practicing this essential life skill!',
            pointsEarned: res.pointsEarned ?? 10,
            newStreak: currentStreak,
            bestStreak: bestStreak,
            isStreakMilestone: [3, 7, 14, 21, 30].includes(currentStreak),
          };
        }
      } catch (err) {
        console.warn('[SubmissionService] Remote challenge submission failed, falling back locally:', err);
      }
    }

    // 2. Fallback local submission calculation
    let isCorrect = true;
    let score = challenge.points;

    if (challenge.type === 'mcq' && selectedOptionId && challenge.options) {
      const option = challenge.options.find((o) => o.id === selectedOptionId);
      if (option) {
        isCorrect = option.isCorrect;
        score = isCorrect ? challenge.points : Math.round(challenge.points * 0.4);
      }
    } else {
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

    // Update streak locally
    const streakResult = StreakService.recordCompletion();

    // Lock today's assignment locally
    const cachedAssignment = StorageService.get<TodayAssignmentState | null>(
      StorageKeys.TODAY_ASSIGNMENT,
      null
    );
    if (cachedAssignment) {
      StorageService.set(StorageKeys.TODAY_ASSIGNMENT, {
        ...cachedAssignment,
        locked: true,
        completedAt: new Date().toISOString(),
      });
    }

    return {
      encouragement: challenge.encouragement[lang] || challenge.encouragement.en,
      educationalTip: challenge.educationalTip[lang] || challenge.educationalTip.en,
      skillSpecificFeedback: isCorrect
        ? 'Outstanding understanding demonstrated for this life skill.'
        : 'Good effort! Review the educational tip to strengthen this skill.',
      pointsEarned: score,
      newStreak: streakResult.currentStreak,
      bestStreak: streakResult.bestStreak,
      isStreakMilestone: [3, 7, 14, 21, 30].includes(streakResult.currentStreak),
    };
  }
}
