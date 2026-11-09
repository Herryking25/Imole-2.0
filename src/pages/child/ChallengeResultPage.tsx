import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Share2, ArrowRight, Home } from 'lucide-react';
import { ChallengeService } from '../../services/challengeService';
import { useDailyChallenge } from '../../hooks/useDailyChallenge';
import { useApp } from '../../hooks/useApp';
import { useLanguage } from '../../hooks/useLanguage';
import type { SubmissionFeedback } from '../../types/submission';

/** Icons for "What you learned" items */
const LEARNING_ICONS = ['🧮', '🧩', '💡', '📚', '❤️', '💬', '🎯', '🌟'];

/**
 * Result page — /child/challenge/result/:challengeId
 *
 * Reads feedback from sessionStorage (written by ChallengePage on submit).
 * Falls back gracefully when feedback is null (e.g. text challenges where
 * isCorrect === null from the API).
 */
export const ChallengeResultPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { profile } = useApp();
  const { challenge: dailyChallenge } = useDailyChallenge();

  const confettiFired = useRef(false);
  const [confettiPieces, setConfettiPieces] = useState<number[]>([]);

  // ── Retrieve feedback from sessionStorage ──────────────────────────────
  const feedback: SubmissionFeedback | null = (() => {
    try {
      const raw = sessionStorage.getItem(`imole_feedback_${challengeId}`);
      return raw ? (JSON.parse(raw) as SubmissionFeedback) : null;
    } catch {
      return null;
    }
  })();

  // ── Resolve challenge object ───────────────────────────────────────────
  // Priority: today's backend challenge → cache/curated fallback
  const challenge = (() => {
    if (dailyChallenge && challengeId && dailyChallenge.id === challengeId) {
      return dailyChallenge;
    }
    const fromService = challengeId
      ? ChallengeService.getChallengeById(challengeId)
      : undefined;
    return fromService ?? dailyChallenge;
  })();

  const firstName = profile?.name?.split(' ')[0] ?? 'Champion';

  const tip =
    feedback?.educationalTip ??
    challenge.educationalTip[language] ??
    challenge.educationalTip.en;

  const encouragement =
    feedback?.encouragement ??
    challenge.encouragement[language] ??
    challenge.encouragement.en;

  const pointsEarned = feedback?.pointsEarned ?? 8;
  // Normalise to /10 display
  const scoreOutOf10 = Math.min(
    10,
    Math.max(0, Math.round((pointsEarned / (challenge.points || 10)) * 10))
  );

  // ── Learning outcomes ─────────────────────────────────────────────────
  const learningOutcomes: string[] = (() => {
    const c = challenge as unknown as { learningOutcomes?: string[] };
    if (c.learningOutcomes && c.learningOutcomes.length > 0) return c.learningOutcomes;
    // Derive two lines from skillFeedback or encouragement
    const source = feedback?.skillSpecificFeedback || encouragement;
    const half = Math.ceil(source.length / 2);
    const breakAt = source.indexOf(' ', half);
    if (breakAt === -1) return [source];
    return [source.slice(0, breakAt).trim(), source.slice(breakAt).trim()];
  })();

  // ── CSS confetti burst ────────────────────────────────────────────────
  useEffect(() => {
    if (confettiFired.current) return;
    if (!feedback || feedback.pointsEarned < 5) return;
    confettiFired.current = true;
    setConfettiPieces(Array.from({ length: 24 }, (_, i) => i));
    const timer = setTimeout(() => setConfettiPieces([]), 2200);
    return () => clearTimeout(timer);
  }, [feedback]);

  // ── Next challenge — go back to the challenges list ───────────────────
  const handleNextChallenge = () => {
    navigate('/child/challenge');
  };

  const handleShare = async () => {
    const title = challenge.title[language] || challenge.title.en;
    const text = `I just scored ${scoreOutOf10}/10 on an IMOLE challenge! 🌟\n"${title}"\nBe the Light Among Your Peers!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My IMOLE Progress', text });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Progress copied to clipboard!');
      } catch {
        /* clipboard blocked */
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col items-center px-5 pt-10 pb-10 relative overflow-hidden">

      {/* CSS confetti burst — no package needed */}
      {confettiPieces.map((i) => {
        const colors = ['#B83806', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#3B82F6'];
        const color = colors[i % colors.length];
        const left = `${5 + (i * 3.8) % 90}%`;
        const delay = `${(i * 0.07).toFixed(2)}s`;
        const size = i % 3 === 0 ? 10 : i % 3 === 1 ? 7 : 5;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '30%',
              left,
              width: size,
              height: size,
              borderRadius: i % 2 === 0 ? '50%' : '2px',
              background: color,
              animation: `confettiFall 2s ease-out ${delay} forwards`,
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Keyframes injected once */}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);        opacity: 1; }
          100% { transform: translateY(-220px) rotate(540deg); opacity: 0; }
        }
      `}</style>

      <div className="w-full max-w-sm flex flex-col items-center gap-6">

        {/* ── Green check circle ── */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-11 h-11 text-green-500 fill-green-500 stroke-white" />
        </div>

        {/* ── Heading ── */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#1F1612] mb-1">
            Great Job {firstName}!
          </h1>
          <p className="text-sm text-[#6B5E57] leading-relaxed">
            {encouragement || "You're doing amazing! Keep up the bright energy."}
          </p>
        </div>

        {/* ── Score card ── */}
        <div className="w-full bg-white rounded-3xl border border-[#F0E6E0] shadow-sm py-5 px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xl">⭐</span>
            <span className="text-3xl font-black text-[#B83806]">
              {scoreOutOf10}/10
            </span>
          </div>
          <p className="text-xs font-semibold text-[#9E9189] uppercase tracking-wide">
            Total Score
          </p>
        </div>

        {/* ── Quick Tip — yellow card ── */}
        <div className="w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-3xl px-5 py-4">
          <div className="flex items-start gap-2 mb-1.5">
            <span className="text-base mt-0.5">💡</span>
            <p className="text-xs font-black text-[#92400E] uppercase tracking-wide">
              Quick Tip
            </p>
          </div>
          <p className="text-sm text-[#78350F] leading-relaxed pl-6">
            {tip}
          </p>
        </div>

        {/* ── What you learned ── */}
        <div className="w-full bg-white rounded-3xl border border-[#F0E6E0] shadow-sm px-5 py-4">
          <h3 className="text-base font-black text-[#1F1612] mb-3">
            What you learned
          </h3>
          <div className="flex flex-col gap-2.5">
            {learningOutcomes.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF1ED] border border-[#FECDB4] flex items-center justify-center flex-shrink-0 text-sm">
                  {LEARNING_ICONS[i % LEARNING_ICONS.length]}
                </div>
                <p className="text-sm font-medium text-[#1F1612] leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Next Challenge button ── */}
        <button
          onClick={handleNextChallenge}
          className="w-full flex items-center justify-center gap-2 py-4 bg-[#B83806] text-white rounded-full font-bold text-base shadow-md active:scale-95 transition-transform"
        >
          Next Challenge
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* ── Back to Home button ── */}
        <button
          onClick={() => navigate('/child/dashboard')}
          className="w-full flex items-center justify-center gap-2 py-4 bg-[#F0E6E0] text-[#6B5E57] rounded-full font-semibold text-base active:scale-95 transition-transform"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        {/* ── Share Progress link ── */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#B83806] hover:opacity-80 transition-opacity"
        >
          <Share2 className="w-4 h-4" />
          Share Progress
        </button>

      </div>
    </div>
  );
};

export default ChallengeResultPage;
