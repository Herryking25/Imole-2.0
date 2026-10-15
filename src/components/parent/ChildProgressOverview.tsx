import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Award,
  Sparkles,
  TrendingUp,
  RefreshCw,
  Plus,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { useParent } from '../../hooks/useParent';
import { CertificateService } from '../../services/certificateService';
import { LinkChildModal } from './LinkChildModal';

export const ChildProgressOverview: React.FC = () => {
  const navigate = useNavigate();
  const { profile, progress: localProgress, streak: localStreak } = useApp();
  const { currentUserEntry } = useLeaderboard();
  const {
    children,
    selectedChild,
    progressData,
    certificates,
    isLoadingProgress,
    refreshProgress,
  } = useParent();

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  // Derive child details from backend progressData or selectedChild, fallback to local app profile
  const childName =
    progressData?.child?.name ||
    selectedChild?.name ||
    profile?.name ||
    profile?.firstName ||
    'Chidi';

  const childAge =
    progressData?.child?.age ||
    selectedChild?.age ||
    profile?.age ||
    10;

  const anonymousUsername =
    progressData?.child?.anonymousUsername ||
    selectedChild?.anonymousUsername ||
    profile?.anonymousNickname ||
    'SwiftLeopard482';

  const currentStreak =
    progressData?.streak?.current !== undefined
      ? progressData.streak.current
      : localStreak.currentStreak > 0
      ? localStreak.currentStreak
      : 14;

  const bestStreak =
    progressData?.streak?.best !== undefined
      ? progressData.streak.best
      : localStreak.bestStreak || 14;

  const earnedCertsCount =
    progressData?.certificatesEarned !== undefined
      ? progressData.certificatesEarned
      : certificates.length > 0
      ? certificates.length
      : CertificateService.getAllCertificates().filter((c) => !c.isLocked).length;

  // Calculate completed count from backend skills or fallback
  const backendSkillsCompleted = progressData?.skills?.reduce(
    (acc, curr) => acc + (curr.challengesCompleted || 0),
    0
  );

  const completedCount =
    backendSkillsCompleted !== undefined && backendSkillsCompleted > 0
      ? backendSkillsCompleted
      : localProgress.totalCompleted > 0
      ? localProgress.totalCompleted
      : 12;

  const totalPoints = progressData?.skills?.reduce(
    (acc, curr) => acc + (curr.score || 0),
    0
  );

  const avgScore =
    completedCount > 0
      ? ((totalPoints || 48) / completedCount / 2).toFixed(1)
      : '4.8';

  const rank = currentUserEntry?.rank || 8;

  // Map backend skills if available, otherwise fallback to local curriculum
  const skillIconMap: Record<string, string> = {
    mental_math: '🧠',
    'mental-math-logic': '🧠',
    persuasive_speaking: '🎤',
    'persuasive-speaking': '🎤',
    financial_literacy: '💰',
    'financial-literacy': '💰',
    creative_problem_solving: '💡',
    'creative-problem-solving': '💡',
    emotional_intelligence: '❤️',
    'emotional-intelligence': '❤️',
  };

  const skillColorMap: Record<string, string> = {
    mental_math: 'bg-[#a73605]',
    'mental-math-logic': 'bg-[#a73605]',
    persuasive_speaking: 'bg-[#eab308]',
    'persuasive-speaking': 'bg-[#eab308]',
    financial_literacy: 'bg-[#16a34a]',
    'financial-literacy': 'bg-[#16a34a]',
    creative_problem_solving: 'bg-[#0284c7]',
    'creative-problem-solving': 'bg-[#0284c7]',
    emotional_intelligence: 'bg-[#9333ea]',
    'emotional-intelligence': 'bg-[#9333ea]',
  };

  const skills =
    progressData?.skills && progressData.skills.length > 0
      ? progressData.skills.map((item) => {
          const slug = item.skill?.slug || 'mental_math';
          const maxTarget = 20; // 20 challenges to reach 100%
          const pct = Math.min(100, Math.round(((item.challengesCompleted || 1) / maxTarget) * 100));
          return {
            id: slug,
            name: item.skill?.name || 'Skill',
            percentage: pct,
            barColor: skillColorMap[slug] || 'bg-[#a73605]',
            level: `Level ${Math.max(1, Math.ceil(pct / 25))} Explorer`,
            icon: skillIconMap[slug] || '🧠',
            score: item.score,
            completed: item.challengesCompleted,
          };
        })
      : [
          {
            id: 'mental-math-logic',
            name: 'Mental Math & Logic',
            percentage: localProgress.skills['mental-math-logic']?.challengesCompleted
              ? Math.min(100, localProgress.skills['mental-math-logic'].challengesCompleted * 25)
              : 75,
            barColor: 'bg-[#a73605]',
            level: 'Level 4 Explorer',
            icon: '🧠',
            score: 150,
            completed: 6,
          },
          {
            id: 'persuasive-speaking',
            name: 'Persuasive Speaking',
            percentage: localProgress.skills['persuasive-speaking']?.challengesCompleted
              ? Math.min(100, localProgress.skills['persuasive-speaking'].challengesCompleted * 25)
              : 60,
            barColor: 'bg-[#eab308]',
            level: 'Level 3 Orator',
            icon: '🎤',
            score: 120,
            completed: 4,
          },
          {
            id: 'financial-literacy',
            name: 'Financial Literacy',
            percentage: localProgress.skills['financial-literacy']?.challengesCompleted
              ? Math.min(100, localProgress.skills['financial-literacy'].challengesCompleted * 25)
              : 80,
            barColor: 'bg-[#16a34a]',
            level: 'Level 4 Budgeter',
            icon: '💰',
            score: 180,
            completed: 5,
          },
          {
            id: 'creative-problem-solving',
            name: 'Creative Problem Solving',
            percentage: localProgress.skills['creative-problem-solving']?.challengesCompleted
              ? Math.min(100, localProgress.skills['creative-problem-solving'].challengesCompleted * 25)
              : 65,
            barColor: 'bg-[#0284c7]',
            level: 'Level 3 Innovator',
            icon: '💡',
            score: 90,
            completed: 3,
          },
          {
            id: 'emotional-intelligence',
            name: 'Emotional Intelligence',
            percentage: localProgress.skills['emotional-intelligence']?.challengesCompleted
              ? Math.min(100, localProgress.skills['emotional-intelligence'].challengesCompleted * 25)
              : 50,
            barColor: 'bg-[#9333ea]',
            level: 'Level 2 Diplomat',
            icon: '❤️',
            score: 70,
            completed: 2,
          },
        ];

  // Activities data
  const activities = [
    {
      id: '1',
      title: 'Completed "Daily Market Budgeting"',
      skill: 'Financial Literacy',
      time: 'Today, 2:30 PM',
      score: '+150 Pts',
    },
    {
      id: '2',
      title: 'Earned "Mental Math Master" Certificate',
      skill: 'Mental Math',
      time: 'Yesterday, 4:15 PM',
      score: '📜 Unlocked',
    },
    {
      id: '3',
      title: 'Conquered "Persuasive Storytelling" Quest',
      skill: 'Speaking',
      time: '2 days ago',
      score: '+120 Pts',
    },
    {
      id: '4',
      title: `Maintained ${currentStreak}-Day Continuous Streak`,
      skill: 'Discipline Milestone',
      time: '3 days ago',
      score: '🔥 Milestone',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 select-none font-sans pb-12">
      {/* ── Top Bar with Navigation, Refresh & Link Child ── */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <button
          onClick={() => navigate('/child/dashboard')}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#a73605] hover:text-[#8e2e04] active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back to Child App</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refreshProgress()}
            disabled={isLoadingProgress}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-2xs cursor-pointer"
            title="Refresh progress data from server"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#a73605] ${
                isLoadingProgress ? 'animate-spin' : ''
              }`}
            />
            <span>{isLoadingProgress ? 'Syncing...' : 'Sync Data'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsLinkModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff7ed] border border-[#fed7aa] text-[#a73605] text-xs font-bold hover:bg-[#ffedd5] active:scale-95 transition-all shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Link Child</span>
          </button>
        </div>
      </div>

      {/* ── Link Child Banner if No Children Linked Yet ── */}
      {children.length === 0 && (
        <div className="w-full bg-gradient-to-r from-[#fff7ed] via-[#ffedd5] to-[#fde6d8] rounded-3xl p-6 border-2 border-[#fed7aa] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left animate-in fade-in duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#a73605] text-white flex items-center justify-center shadow-sm shrink-0">
              <KeyRound className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Link Your Child&apos;s Device
              </h2>
              <p className="text-xs text-slate-600 max-w-md mt-0.5 font-medium leading-relaxed">
                Connect in seconds using the 6-character code from your child&apos;s IMOLE Settings to see their live daily challenges, streaks, and certificates.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLinkModalOpen(true)}
            className="py-3 px-6 rounded-2xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#a73605]/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <KeyRound className="w-4 h-4" />
            <span>Enter Link Code</span>
          </button>
        </div>
      )}

      {/* ── Child Hero Profile Banner ── */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-[#f3e7dc] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left: Avatar & Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5">
          <div className="relative">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-[#fed7aa] to-[#fde68a] border-3 border-[#fbd9c4] flex items-center justify-center text-3xl sm:text-4xl shadow-xs">
              🧒
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 text-amber-950 rounded-full flex items-center justify-center text-xs font-black shadow-xs border-2 border-white">
              ⭐
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span>👨‍👩‍👧</span>
              <span>{childName}&apos;s Progress</span>
            </h1>

            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Age {childAge} • @{anonymousUsername} • Active Everyday Learner
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fef08a] border border-[#fde047] text-amber-950 text-xs font-black shadow-2xs">
                <span>🔥</span>
                <span>{currentStreak} Day Streak! (Best: {bestStreak})</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-emerald-800 text-xs font-black shadow-2xs">
                <span>🏆</span>
                <span>{earnedCertsCount} Certificates Earned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons on Desktop */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => navigate('/parent/skills')}
            className="py-2.5 px-4 rounded-2xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#a73605]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>📊</span>
            <span>Skill Breakdown</span>
          </button>

          <button
            onClick={() => navigate('/parent/share')}
            className="py-2.5 px-4 rounded-2xl bg-[#fef5ee] hover:bg-[#fae8db] border border-[#fed7aa] active:scale-98 text-[#a73605] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>🎴</span>
            <span>Share Progress Card</span>
          </button>

          <button
            onClick={() => navigate('/parent/certificates')}
            className="py-2.5 px-4 rounded-2xl bg-[#fef5d9] hover:bg-[#fdebc0] border border-[#fed7aa] active:scale-98 text-[#9a6208] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>📜</span>
            <span>Certificates ({earnedCertsCount})</span>
          </button>
        </div>
      </div>

      {/* ── 4 Stats Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 w-full">
        {/* Completed */}
        <div className="bg-white rounded-3xl p-5 border border-[#f3e7dc] shadow-[0_2px_14px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:border-[#e8ba9b] transition-all">
          <span className="text-3xl mb-1.5 filter drop-shadow-2xs">📚</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {completedCount}
          </span>
          <span className="text-xs font-semibold text-slate-500 mt-0.5">
            Quests Completed
          </span>
        </div>

        {/* Avg Score */}
        <div className="bg-white rounded-3xl p-5 border border-[#f3e7dc] shadow-[0_2px_14px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:border-[#e8ba9b] transition-all">
          <span className="text-3xl mb-1.5 filter drop-shadow-2xs">⭐</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {avgScore}
          </span>
          <span className="text-xs font-semibold text-slate-500 mt-0.5">
            Avg Score (out of 5)
          </span>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-3xl p-5 border border-[#f3e7dc] shadow-[0_2px_14px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:border-[#e8ba9b] transition-all">
          <span className="text-3xl mb-1.5 filter drop-shadow-2xs">🔥</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {currentStreak}
          </span>
          <span className="text-xs font-semibold text-slate-500 mt-0.5">
            Days Active Streak
          </span>
        </div>

        {/* Class Rank */}
        <div className="bg-white rounded-3xl p-5 border border-[#f3e7dc] shadow-[0_2px_14px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:border-[#e8ba9b] transition-all">
          <span className="text-3xl mb-1.5 filter drop-shadow-2xs">🏆</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            #{rank}
          </span>
          <span className="text-xs font-semibold text-slate-500 mt-0.5">
            Leaderboard Rank
          </span>
        </div>
      </div>

      {/* ── 2-Column Desktop Grid: Skill Breakdown & Recent Activity ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Skill Breakdown Card */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-[#f3e7dc] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col gap-5 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Skill Mastery Breakdown
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time metrics from child challenges and quizzes.
              </p>
            </div>
            <button
              onClick={() => navigate('/parent/skills')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#fef5ee] border border-[#fed7aa] text-xs font-bold text-[#a73605] hover:bg-[#fdebc0] transition-colors cursor-pointer"
            >
              <span>View All</span>
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                onClick={() => navigate(`/parent/skills/${skill.id}`)}
                className="flex flex-col gap-1.5 p-2.5 -mx-2 rounded-2xl hover:bg-[#faf4ee] transition-all cursor-pointer group"
                title={`Click to view ${skill.name} breakdown`}
              >
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 group-hover:text-[#a73605] transition-colors">
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
                      {skill.level} ({skill.completed} quests)
                    </span>
                    <span className="font-extrabold text-slate-900">{skill.percentage}%</span>
                    <span className="text-xs text-[#a73605] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      →
                    </span>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="w-full h-2.5 bg-[#f3eae2] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${skill.barColor}`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-[#f3e7dc] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col gap-5 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Recent Activity & Milestones
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest challenges completed and credentials earned.
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>

          <div className="flex flex-col gap-3.5 divide-y divide-slate-100">
            {activities.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 pt-3.5 first:pt-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-4 h-4 stroke-3" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                      {item.time} • <span className="text-[#a73605] font-semibold">{item.skill}</span>
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Prominent CTAs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full pt-2">
        <button
          onClick={() => navigate('/parent/skills')}
          className="w-full py-4 px-5 rounded-2xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#a73605]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span className="text-lg">📊</span>
          <span>View Detailed Breakdown</span>
        </button>

        <button
          onClick={() => navigate('/parent/share')}
          className="w-full py-4 px-5 rounded-2xl bg-[#fef5ee] hover:bg-[#fae8db] border border-[#fed7aa] active:scale-[0.99] text-[#a73605] font-extrabold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span className="text-lg">🎴</span>
          <span>Share Progress Card</span>
        </button>

        <button
          onClick={() => navigate('/parent/certificates')}
          className="w-full py-4 px-5 rounded-2xl bg-[#fbbf24] hover:bg-[#f59e0b] active:scale-[0.99] text-slate-900 font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Award className="w-4 h-4 text-slate-900" />
          <span>Certificates ({earnedCertsCount})</span>
        </button>
      </div>

      {/* Link Child Modal */}
      <LinkChildModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
      />
    </div>
  );
};

export default ChildProgressOverview;
