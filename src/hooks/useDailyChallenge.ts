import { useState, useEffect, useCallback } from 'react';
import { ChallengeService } from '../services/challengeService';
import { SubmissionService } from '../services/submissionService';
import { useApp } from './useApp';
import type { Challenge } from '../types/challenge';
import type { SubmissionFeedback } from '../types/submission';
import { getTimeUntilMidnight } from '../utils/dateUtils';

export function useDailyChallenge() {
  const { isDailyCompleted, refreshState } = useApp();
  const [challenge, setChallenge] = useState<Challenge>(() => ChallengeService.getDailyChallenge());
  const [swapsRemaining, setSwapsRemaining] = useState<number>(() => {
    const cached = ChallengeService.getCachedTodayAssignment();
    return typeof cached?.swapsRemaining === 'number' ? cached.swapsRemaining : 2;
  });
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<SubmissionFeedback | null>(null);

  // Fetch or refresh today's challenge from backend
  const loadTodayChallenge = useCallback(async () => {
    setIsLoading(true);
    try {
      const assignment = await ChallengeService.fetchTodayChallenge();
      setChallenge(assignment.challenge);
      setSwapsRemaining(assignment.swapsRemaining);
    } catch (err) {
      console.warn('[useDailyChallenge] Error loading today challenge:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodayChallenge();
  }, [loadTodayChallenge]);

  // Midnight countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const swap = useCallback(async (): Promise<boolean> => {
    if (swapsRemaining <= 0 || isDailyCompleted) return false;
    setIsSwapping(true);
    try {
      const result = await ChallengeService.swapTodayChallenge();
      if (result) {
        setChallenge(result.challenge);
        setSwapsRemaining(result.swapsRemaining);
        refreshState();
        return true;
      }
      return false;
    } catch (err) {
      console.error('[useDailyChallenge] Swap error:', err);
      return false;
    } finally {
      setIsSwapping(false);
    }
  }, [swapsRemaining, isDailyCompleted, refreshState]);

  const submit = useCallback(
    async (response: string, selectedOptionId?: string): Promise<SubmissionFeedback> => {
      setIsSubmitting(true);
      try {
        const feedback = await SubmissionService.submitResponse(challenge, response, selectedOptionId);
        setLastFeedback(feedback);
        refreshState();
        return feedback;
      } finally {
        setIsSubmitting(false);
      }
    },
    [challenge, refreshState]
  );

  return {
    challenge,
    isCompleted: isDailyCompleted,
    swapsRemaining,
    countdown,
    isLoading,
    isSubmitting,
    isSwapping,
    lastFeedback,
    swap,
    submit,
    reload: loadTodayChallenge,
  };
}
