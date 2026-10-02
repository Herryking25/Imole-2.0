import React from 'react';
import { useApp } from '../../hooks/useApp';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { getAvatarEmoji } from '../../utils/avatarUtils';

interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  streak?: number;
  initials?: string;
  avatarId?: string;
  avatarBg?: string;
  avatarTextColor?: string;
  isCurrentUser?: boolean;
}

export const LeaderboardPage: React.FC = () => {
  const { profile, streak, progress } = useApp();
  const { currentUserEntry } = useLeaderboard();

  const userRank = currentUserEntry?.rank ?? 8;
  const userStreak = streak.currentStreak > 0 ? streak.currentStreak : 7;
  const userPoints = progress.totalPoints > 0 ? progress.totalPoints : 32;

  // Top 3 Podium
  const topThree = [
    {
      rank: 2,
      name: 'SmartOne',
      points: 120,
      avatarEmoji: '👦🏻',
      podiumBg: 'bg-[#e2e8f0]/80',
      borderColor: 'border-slate-200/80',
      podiumHeight: 'h-32',
      badgeBg: 'bg-white text-slate-700',
    },
    {
      rank: 1,
      name: 'Champ',
      points: 150,
      avatarEmoji: '👦🏾',
      podiumBg: 'bg-[#fef9c3]',
      borderColor: 'border-amber-200/80',
      podiumHeight: 'h-40',
      badgeBg: 'bg-white text-amber-900',
      hasCrown: true,
    },
    {
      rank: 3,
      name: 'BrightKid',
      points: 100,
      avatarEmoji: '👧🏽',
      podiumBg: 'bg-[#fee2e2]/70',
      borderColor: 'border-rose-200/80',
      podiumHeight: 'h-28',
      badgeBg: 'bg-white text-rose-800',
    },
  ];

  // Ranks 4 to 10 list
  const listUsers: LeaderboardUser[] = [
    {
      rank: 4,
      name: 'FastLearner',
      points: 90,
      initials: 'FL',
      avatarBg: 'bg-slate-100',
      avatarTextColor: 'text-slate-600',
    },
    {
      rank: 5,
      name: 'StarReader',
      points: 85,
      initials: 'SR',
      avatarBg: 'bg-amber-100',
      avatarTextColor: 'text-amber-800',
    },
    {
      rank: 6,
      name: 'MathWhiz',
      points: 78,
      initials: 'MW',
      avatarBg: 'bg-rose-100',
      avatarTextColor: 'text-rose-800',
    },
    {
      rank: 7,
      name: 'SciHero',
      points: 65,
      initials: 'SH',
      avatarBg: 'bg-red-100',
      avatarTextColor: 'text-red-800',
    },
    {
      rank: 8,
      name: 'You',
      points: userPoints,
      streak: userStreak,
      isCurrentUser: true,
    },
    {
      rank: 9,
      name: 'CoolCat',
      points: 28,
      initials: 'CC',
      avatarBg: 'bg-orange-100',
      avatarTextColor: 'text-orange-800',
    },
    {
      rank: 10,
      name: 'Explorer',
      points: 25,
      initials: 'EX',
      avatarBg: 'bg-stone-100',
      avatarTextColor: 'text-stone-800',
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#faf8f5]/50 md:bg-white flex flex-col py-4 px-4 sm:px-8 pb-28 sm:pb-8 animate-in fade-in duration-300">
      <div className="max-w-md w-full mx-auto flex flex-col items-center text-center gap-4">

        {/* ── Heading ── */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-2xl filter drop-shadow-xs">🏆</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Leaderboard
          </h1>
        </div>

        {/* ── Status Pill ── */}
        <div className="inline-flex items-center justify-center bg-[#a73605] text-white text-xs sm:text-sm font-bold px-6 py-2 rounded-full shadow-sm">
          You&apos;re #{userRank}! Keep going!
        </div>

        {/* ── Top 3 Podium ── */}
        <div className="grid grid-cols-3 gap-2.5 w-full items-end pt-8 pb-2 px-1">
          {/* Rank 2 (Left) */}
          <div className="flex flex-col items-center relative">
            <div className="relative -mb-3 z-10">
              <div className="w-13 h-13 rounded-full bg-sky-100 border-2 border-white shadow-sm flex items-center justify-center text-2xl">
                {topThree[0].avatarEmoji}
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-xs text-[11px] font-black text-slate-700 flex items-center justify-center border border-slate-200">
                2
              </span>
            </div>
            <div
              className={`w-full ${topThree[0].podiumHeight} ${topThree[0].podiumBg} border ${topThree[0].borderColor} rounded-2xl flex flex-col items-center justify-end pb-3.5 pt-6 shadow-xs`}
            >
              <p className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[80px]">
                {topThree[0].name}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {topThree[0].points} pt
              </p>
            </div>
          </div>

          {/* Rank 1 (Center) */}
          <div className="flex flex-col items-center relative -mt-4">
            <div className="relative -mb-3 z-10">
              <span className="absolute -top-4 right-0 text-lg animate-bounce">👑</span>
              <div className="w-15 h-15 rounded-full bg-amber-100 border-2 border-white shadow-md flex items-center justify-center text-3xl">
                {topThree[1].avatarEmoji}
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-xs text-xs font-black text-amber-900 flex items-center justify-center border border-amber-300">
                1
              </span>
            </div>
            <div
              className={`w-full ${topThree[1].podiumHeight} ${topThree[1].podiumBg} border ${topThree[1].borderColor} rounded-2xl flex flex-col items-center justify-end pb-4 pt-8 shadow-xs`}
            >
              <p className="text-sm font-extrabold text-slate-900 truncate max-w-[90px]">
                {topThree[1].name}
              </p>
              <p className="text-xs font-bold text-[#8a2908] mt-0.5">
                {topThree[1].points} pt
              </p>
            </div>
          </div>

          {/* Rank 3 (Right) */}
          <div className="flex flex-col items-center relative">
            <div className="relative -mb-3 z-10">
              <div className="w-13 h-13 rounded-full bg-rose-100 border-2 border-white shadow-sm flex items-center justify-center text-2xl">
                {topThree[2].avatarEmoji}
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-xs text-[11px] font-black text-rose-800 flex items-center justify-center border border-rose-200">
                3
              </span>
            </div>
            <div
              className={`w-full ${topThree[2].podiumHeight} ${topThree[2].podiumBg} border ${topThree[2].borderColor} rounded-2xl flex flex-col items-center justify-end pb-3 pt-5 shadow-xs`}
            >
              <p className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[80px]">
                {topThree[2].name}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {topThree[2].points} pt
              </p>
            </div>
          </div>
        </div>

        {/* ── Ranks 4 to 10 Container ── */}
        <div className="w-full bg-white rounded-3xl border border-rose-100/60 shadow-xs p-3 sm:p-4 flex flex-col gap-2 text-left">
          {listUsers.map((item) => {
            if (item.isCurrentUser) {
              return (
                <div
                  key={item.rank}
                  className="w-full bg-[#a73605] text-white rounded-2xl p-3 px-4 flex items-center justify-between shadow-md select-none transition-transform active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white/80 w-4 text-center">
                      {item.rank}
                    </span>
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white/20 flex items-center justify-center text-xl shrink-0 shadow-xs">
                      {profile?.avatarId ? getAvatarEmoji(profile.avatarId) : '👧🏾'}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-white leading-tight">
                        You
                      </p>
                      <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold text-white mt-0.5">
                        <span>🔥</span>
                        <span>{item.streak || userStreak} day streak!</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-white">
                      {item.points} pt
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.rank}
                className="w-full flex items-center justify-between p-2 px-2.5 rounded-xl hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400 w-4 text-center">
                    {item.rank}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full ${item.avatarBg} ${item.avatarTextColor} flex items-center justify-center text-xs font-black shrink-0`}
                  >
                    {item.initials}
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    {item.name}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500">
                    {item.points} pt
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default LeaderboardPage;
