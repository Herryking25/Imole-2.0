import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Award, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { CertificateService } from '../../services/certificateService';

export const ChildProgressOverview: React.FC = () => {
  const navigate = useNavigate();
  const { profile, progress, streak } = useApp();
  const { currentUserEntry } = useLeaderboard();

  const childName = profile?.name || profile?.firstName || 'Chidi';
  const childAge = profile?.age || 10;
  const currentStreak = streak.currentStreak > 0 ? streak.currentStreak : 14;
  const completedCount = progress.totalCompleted > 0 ? progress.totalCompleted : 12;
  const avgScore =
    progress.totalCompleted > 0
      ? (progress.totalPoints / progress.totalCompleted / 10).toFixed(1)
      : '4.8';
  const rank = currentUserEntry?.rank || 8;

  // Certificates count
  const allCerts = CertificateService.getAllCertificates();
  const earnedCertsCount = allCerts.filter((c) => !c.isLocked).length;

  // Skills data matching IMOLE curriculum
  const skills = [
    {
      id: 'mental-math-logic',
      name: 'Mental Math & Logic',
      percentage: progress.skills['mental-math-logic']?.challengesCompleted ? Math.min(100, progress.skills['mental-math-logic'].challengesCompleted * 25) : 75,
      barColor: 'bg-[#a73605]',
      level: 'Level 4 Explorer',
      icon: '🧠',
    },
    {
      id: 'persuasive-speaking',
      name: 'Persuasive Speaking',
      percentage: progress.skills['persuasive-speaking']?.challengesCompleted ? Math.min(100, progress.skills['persuasive-speaking'].challengesCompleted * 25) : 60,
      barColor: 'bg-[#eab308]',
      level: 'Level 3 Orator',
      icon: '🎤',
    },
    {
      id: 'financial-literacy',
      name: 'Financial Literacy',
      percentage: progress.skills['financial-literacy']?.challengesCompleted ? Math.min(100, progress.skills['financial-literacy'].challengesCompleted * 25) : 80,
      barColor: 'bg-[#16a34a]',
      level: 'Level 4 Budgeter',
      icon: '💰',
    },
    {
      id: 'creative-problem-solving',
      name: 'Creative Problem Solving',
      percentage: progress.skills['creative-problem-solving']?.challengesCompleted ? Math.min(100, progress.skills['creative-problem-solving'].challengesCompleted * 25) : 65,
      barColor: 'bg-[#0284c7]',
      level: 'Level 3 Innovator',
      icon: '💡',
    },
    {
      id: 'emotional-intelligence',
      name: 'Emotional Intelligence',
      percentage: progress.skills['emotional-intelligence']?.challengesCompleted ? Math.min(100, progress.skills['emotional-intelligence'].challengesCompleted * 25) : 50,
      barColor: 'bg-[#9333ea]',
      level: 'Level 2 Diplomat',
      icon: '❤️',
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
      title: 'Maintained 14-Day Continuous Streak',
      skill: 'Discipline Milestone',
      time: '3 days ago',
      score: '🔥 Milestone',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 select-none font-sans pb-12">
      
      {/* ── Top Bar with Navigation & Title ── */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <button
          onClick={() => navigate('/child/dashboard')}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#a73605] hover:text-[#8e2e04] active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back to Child App</span>
        </button>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef5ee] border border-[#fbd9c4] text-[#a73605] text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Parent Supervision Portal</span>
        </div>
      </div>

      {/* ── Child Hero Profile Banner (Responsive Desktop Header) ── */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-[#f3e7dc] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left: Avatar & Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=240&auto=format&fit=crop&q=80"
              alt={childName}
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover border-3 border-[#fbd9c4] shadow-xs"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
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
              Age {childAge} • Level 4 Explorer • Active Everyday Learner
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fef08a] border border-[#fde047] text-amber-950 text-xs font-black shadow-2xs">
                <span>🔥</span>
                <span>{currentStreak} Day Streak!</span>
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

      {/* ── 4 Stats Cards (4-column grid on desktop, 2x2 on mobile) ── */}
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
        {/* ── Skill Breakdown Card ── */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-[#f3e7dc] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col gap-5 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Skill Mastery Breakdown
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any skill to inspect child responses &amp; learning tips.
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
                      {skill.level}
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

        {/* ── Recent Activity & Milestones Card ── */}
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

    </div>
  );
};

export default ChildProgressOverview;
