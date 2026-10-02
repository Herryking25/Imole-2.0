import { useState, useEffect, useCallback } from 'react';
import { ChallengeService } from '../services/challengeService';
import { SubmissionService } from '../services/submissionService';
import { useApp } from './useApp';
import type { Challenge } from '../types/challenge';
import type { SubmissionFeedback } from '../types/submission';
import { getTimeUntilMidnight } from '../utils/dateUtils';

export function useDailyChallenge() {
  const { isDailyCompleted, refreshState } = useApp();
  const [challenge] = useState<Challenge>(() => ChallengeService.getDailyChallenge());
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<SubmissionFeedback | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const submit = useCallback(
    async (response: string, selectedOptionId?: string): Promise<SubmissionFeedback> => {
      setIsSubmitting(true);
      try {
        const feedback = SubmissionService.submitResponse(challenge, response, selectedOptionId);
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
    countdown,
    isSubmitting,
    lastFeedback,
    submit,
  };
}

