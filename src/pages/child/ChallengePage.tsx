import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChallengeResponseForm } from '../../components/child/ChallengeResponseForm';
import { useDailyChallenge } from '../../hooks/useDailyChallenge';
import { ChallengeService } from '../../services/challengeService';
import type { SubmissionFeedback } from '../../types/submission';

/**
 * Full-screen challenge player page — /child/challenge/play/:challengeId
 *
 * Resolves the challenge in this priority order:
 *   1. Today's backend assignment (from useDailyChallenge hook)
 *   2. Cached today assignment from storage
 *   3. Any curated/local challenge matching the id
 *
 * On submit → stores feedback in sessionStorage → navigates to result page.
 */
export const ChallengePage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { challenge: dailyChallenge, submit, isSubmitting, reload } = useDailyChallenge();

  // Resolve which challenge object to display
  const challenge = (() => {
    // If the daily challenge from the hook matches the route param, use it (real backend data)
    if (dailyChallenge && challengeId && dailyChallenge.id === challengeId) {
      return dailyChallenge;
    }
    // Try the local cache / curated list as fallback
    const fromService = challengeId ? ChallengeService.getChallengeById(challengeId) : undefined;
    return fromService ?? dailyChallenge;
  })();

  // If this is a today-challenge route, ensure we have fresh data
  useEffect(() => {
    if (!dailyChallenge || (challengeId && dailyChallenge.id !== challengeId)) {
      reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId]);

  const handleSubmit = useCallback(
    async (response: string, selectedOptionId?: string) => {
      const feedback: SubmissionFeedback = await submit(response, selectedOptionId);

      // Persist feedback so result page can read it
      const key = `imole_feedback_${challenge.id}`;
      try {
        sessionStorage.setItem(key, JSON.stringify(feedback));
      } catch {
        /* storage unavailable — result page will use defaults */
      }

      navigate(`/child/challenge/result/${challenge.id}`, { replace: true });
    },
    [challenge.id, submit, navigate]
  );

  const handleSkip = () => {
    navigate('/child/challenge');
  };

  return (
    <ChallengeResponseForm
      challenge={challenge}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onSkip={handleSkip}
      challengeIndex={0}
      totalChallenges={30}
    />
  );
};

export default ChallengePage;
