import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, UserCircle } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { ChallengeService } from '../../services/challengeService';
import { SKILLS_DATA } from '../../data/skills';
import { useLanguage } from '../../hooks/useLanguage';

// ──────────────────────────────────────────────
// Streak Progress Track
// ──────────────────────────────────────────────
const STREAK_MILESTONES = [1, 2, 3, 4, 5, 6, 7];

const StreakTrack: React.FC<{ current: number }> = ({ current }) => (
  <div className="relative flex items-center justify-between w-full mt-4 px-0.5 select-none">
    {STREAK_MILESTONES.map((day, idx) => {
      const filled = current >= day;
      const isLast = idx === STREAK_MILESTONES.length - 1;
      const nextFilled = current > day;

      return (
        <React.Fragment key={day}>
          <div
            className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-black transition-all ${filled
              ? 'bg-[#8a2908] text-white border border-[#6b1e04] shadow-xs'
              : 'bg-amber-100/70 text-amber-900/40 border border-amber-200/50'
              }`}
          >
            {day}
          </div>

          {!isLast && (
            <div
              className={`flex-1 h-[3px] mx-1 rounded-full transition-all ${nextFilled ? 'bg-[#8a2908]' : 'bg-amber-200/60'
                }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ──────────────────────────────────────────────
// Skill label badge
// ──────────────────────────────────────────────
const SkillBadge: React.FC<{ skillId: string }> = ({ skillId }) => {
  const skill = SKILLS_DATA[skillId as keyof typeof SKILLS_DATA];

  const skillEmojiMap: Record<string, string> = {
    'mental-math-logic': '🧠',
    'financial-literacy': '💰',
    'persuasive-speaking': '🎤',
    'creative-problem-solving': '💡',
    'emotional-intelligence': '❤️',
  };

  const labelMap: Record<string, string> = {
    'mental-math-logic': 'Mental Math',
    'financial-literacy': 'Financial Literacy',
    'persuasive-speaking': 'Persuasive Speaking',
    'creative-problem-solving': 'Problem Solving',
    'emotional-intelligence': 'Emotional Intelligence',
  };

  const emoji = skillEmojiMap[skillId] || '🧠';
  const label = labelMap[skillId] || skill?.name || 'Mental Math';

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fef2f2] text-[#991b1b] border border-[#fecdd3]">
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  );
};

// ──────────────────────────────────────────────
// Main Dashboard
// ──────────────────────────────────────────────
export const HomeDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, streak, progress, isDailyCompleted } = useApp();
  const { currentUserEntry } = useLeaderboard();
  const { language } = useLanguage();

  const challenge = ChallengeService.getDailyChallenge();
  const allChallenges = ChallengeService.getAllChallenges();

  const displayName =
    profile?.firstName || profile?.username || profile?.name || 'Ekundayo';

  const challengeTitle = challenge.title[language] ?? challenge.title.en;
  const challengeScenario =
    challenge.scenario[language] ?? challenge.scenario.en;

  // Average score: totalPoints / totalCompleted or default 4.2
  const avgScore =
    progress.totalCompleted > 0
      ? (progress.totalPoints / progress.totalCompleted / 10).toFixed(1)
      : '4.2';

  const userRank = currentUserEntry?.rank ?? 8;
  const completedCount = progress.totalCompleted > 0 ? progress.totalCompleted : 12;

  return (
    <div className="flex-1 min-h-screen bg-[#faf8f5]/50 md:bg-white flex flex-col py-5 px-4 sm:px-8 pb-28 sm:pb-8 animate-in fade-in duration-300">
      <div className="max-w-xl w-full mx-auto flex flex-col gap-4">

        {/* ── Hey, Name Header ── */}
        <div className="flex items-center justify-between pt-1">
          <Link
            to="/child/settings"
            className="flex items-center gap-2.5 group"
            title="Settings & Profile"
          >
            <UserCircle className="w-8 h-8 text-slate-400 stroke-[1.5] group-hover:text-[#a73605] transition-colors" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hey, <span className="text-[#a73605]">{displayName}</span>
            </h1>
          </Link>
        </div>

        {/* ── Current Streak Card ── */}
        <div
          className="relative w-full rounded-3xl overflow-hidden p-5 shadow-xs select-none"
          style={{
            background: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 45%, #f59e0b 100%)',
          }}
        >
          {/* Subtle background glow circle */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/20 blur-sm pointer-events-none" />

          {/* Flame circular badge */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#fef3c7]/70 backdrop-blur-xs border border-amber-200/50 flex items-center justify-center text-lg shadow-xs">
            🔥
          </div>

          <div className="relative z-10 flex flex-col">
            <span className="text-xs font-bold text-amber-950/70 uppercase tracking-wide">
              Current Streak
            </span>

            <div className="flex items-baseline mt-1">
              <span className="text-4xl font-black text-[#682006] leading-none">
                {streak.currentStreak || 5}
              </span>
              <span className="text-xl font-bold text-[#682006] ml-2">
                days
              </span>
            </div>

            <p className="text-sm font-semibold text-amber-950/85 mt-2 flex items-center gap-1">
              Keep going! You&apos;re on fire. <span>🔥</span>
            </p>

            {/* Streak Milestones */}
            <StreakTrack current={streak.currentStreak || 5} />
          </div>
        </div>

        {/* ── Today's Challenge Preview Card ── */}
        <div className="w-full bg-white border border-slate-100/90 rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          {/* Skill badge + Duration */}
          <div className="flex items-center gap-2 mb-3">
            <SkillBadge skillId={challenge.skillId} />
            <span className="text-xs font-semibold text-slate-400 ml-1">
              5 mins
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2">
            {challengeTitle}
          </h2>

          {/* Scenario snippet */}
          <p className="text-sm font-medium text-slate-600 leading-relaxed mb-5">
            {challengeScenario}
          </p>

          {/* Start Challenge CTA Button */}
          <button
            onClick={() => navigate('/child/challenge')}
            className={`w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${isDailyCompleted
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default'
              : 'bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.98] text-white shadow-lg shadow-[#a73605]/20'
              }`}
          >
            {isDailyCompleted ? (
              <span>Challenge Completed Today ✅</span>
            ) : (
              <>
                <span>Start Challenge</span>
                <span className="text-base font-bold">→</span>
              </>
            )}
          </button>
        </div>

        {/* ── Stats Grid: Rank · Completed · Avg Score ── */}
        <div className="grid grid-cols-2 gap-3.5 w-full">
          {/* Rank Card */}
          <div className="bg-white border border-slate-100/90 rounded-3xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center min-h-[140px]">
            <span className="text-3xl mb-1 filter drop-shadow-xs">🏆</span>
            <span className="text-xs font-semibold text-slate-500">Rank</span>
            <span className="text-2xl font-black text-slate-900 mt-0.5">
              #{typeof userRank === 'number' ? userRank : '8'}
            </span>
          </div>

          {/* Right Column: Completed & Avg Score */}
          <div className="flex flex-col gap-3 justify-between">
            {/* Completed */}
            <div className="bg-white border border-slate-100/90 rounded-2xl p-3.5 px-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#fde8e8] flex items-center justify-center text-xl shrink-0">
                📚
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-500">Completed</p>
                <p className="text-lg font-black text-slate-900 leading-tight">
                  {completedCount}
                </p>
              </div>
            </div>

            {/* Avg Score */}
            <div className="bg-white border border-slate-100/90 rounded-2xl p-3.5 px-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center text-xl shrink-0">
                ⭐
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-500">Avg Score</p>
                <p className="text-lg font-black text-slate-900 leading-tight">
                  {avgScore}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── All Challenges Card ── */}
        <button
          onClick={() => navigate('/child/challenge')}
          className="w-full bg-white border border-slate-100/90 rounded-2xl p-4 px-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between hover:bg-slate-50/80 active:scale-[0.99] transition-all cursor-pointer text-left"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500">All Challenges</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">
              {allChallenges.length || 45}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>

      </div>
    </div>
  );
};

export default HomeDashboardPage;
