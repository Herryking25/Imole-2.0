import React from 'react';
import { useApp } from '../../hooks/useApp';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { getAvatarEmoji } from '../../utils/avatarUtils';

export const LeaderboardPage: React.FC = () => {
  const { profile, streak, progress } = useApp();
  const { entries, currentUserEntry, period, setPeriod, isLoading } = useLeaderboard();

  const userRank = currentUserEntry?.rank ?? 1;
  const userStreak = currentUserEntry?.streak ?? (streak.currentStreak > 0 ? streak.currentStreak : 1);
  const userPoints = currentUserEntry?.points ?? (progress.totalPoints > 0 ? progress.totalPoints : 0);

  // Top 3 from entries (fallback gracefully if fewer than 3)
  const top1 = entries[0] || {
    rank: 1,
    anonymousName: 'Champ',
    points: 150,
    streak: 5,
    avatarId: 'avatar-eagle',
  };
  const top2 = entries[1] || {
    rank: 2,
    anonymousName: 'SmartOne',
    points: 120,
    streak: 4,
    avatarId: 'avatar-lion',
  };
  const top3 = entries[2] || {
    rank: 3,
    anonymousName: 'BrightKid',
    points: 100,
    streak: 3,
    avatarId: 'avatar-cheetah',
  };

  // Remaining entries (ranks 4+)
  const restEntries = entries.slice(3);

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

        {/* ── Period Switcher (Weekly vs All Time) ── */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200/60 shadow-2xs">
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              period === 'weekly'
                ? 'bg-white text-[#a73605] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod('all_time')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              period === 'all_time'
                ? 'bg-white text-[#a73605] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Time
          </button>
        </div>

        {/* ── Status Pill ── */}
        <div className="inline-flex items-center justify-center bg-[#a73605] text-white text-xs sm:text-sm font-bold px-6 py-2 rounded-full shadow-sm">
          {isLoading ? (
            <span>Updating champion ranks... 🌟</span>
          ) : (
            <span>You&apos;re #{userRank}! Keep shining! 🔥</span>
          )}
        </div>

        {/* ── Top 3 Podium ── */}
        <div className="grid grid-cols-3 gap-2.5 w-full items-end pt-8 pb-2 px-1">
          {/* Rank 2 (Left) */}
          <div className="flex flex-col items-center relative">
            <div className="relative -mb-3 z-10">
              <div className="w-13 h-13 rounded-full bg-sky-100 border-2 border-white shadow-sm flex items-center justify-center text-2xl">
                {top2.avatarId ? getAvatarEmoji(top2.avatarId) : '👦🏻'}
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-xs text-[11px] font-black text-slate-700 flex items-center justify-center border border-slate-200">
                2
              </span>
            </div>
            <div className="w-full h-32 bg-[#e2e8f0]/80 border border-slate-200/80 rounded-2xl flex flex-col items-center justify-end pb-3.5 pt-6 shadow-xs">
              <p className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[80px]">
                {top2.anonymousName.replace(' (You)', '')}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {top2.points} pt
              </p>
            </div>
          </div>

          {/* Rank 1 (Center) */}
          <div className="flex flex-col items-center relative">
            <div className="absolute -top-7.5 z-20 text-2xl filter drop-shadow-xs animate-bounce">
              👑
            </div>
            <div className="relative -mb-3 z-10">
              <div className="w-15 h-15 rounded-full bg-amber-200 border-2 border-white shadow-md flex items-center justify-center text-3xl">
                {top1.avatarId ? getAvatarEmoji(top1.avatarId) : '👦🏾'}
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-xs text-[11px] font-black text-amber-900 flex items-center justify-center border border-amber-300">
                1
              </span>
            </div>
            <div className="w-full h-40 bg-[#fef9c3] border border-amber-200/80 rounded-2xl flex flex-col items-center justify-end pb-4 pt-8 shadow-xs">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[85px]">
                {top1.anonymousName.replace(' (You)', '')}
              </p>
              <p className="text-xs font-bold text-amber-800 mt-0.5">
                {top1.points} pt
              </p>
            </div>
          </div>

          {/* Rank 3 (Right) */}
          <div className="flex flex-col items-center relative">
            <div className="relative -mb-3 z-10">
              <div className="w-13 h-13 rounded-full bg-rose-100 border-2 border-white shadow-sm flex items-center justify-center text-2xl">
                {top3.avatarId ? getAvatarEmoji(top3.avatarId) : '👧🏽'}
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-xs text-[11px] font-black text-rose-800 flex items-center justify-center border border-rose-200">
                3
              </span>
            </div>
            <div className="w-full h-28 bg-[#fee2e2]/70 border border-rose-200/80 rounded-2xl flex flex-col items-center justify-end pb-3 pt-5 shadow-xs">
              <p className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[80px]">
                {top3.anonymousName.replace(' (You)', '')}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {top3.points} pt
              </p>
            </div>
          </div>
        </div>

        {/* ── Ranks 4+ Container ── */}
        <div className="w-full bg-white rounded-3xl border border-rose-100/60 shadow-xs p-3 sm:p-4 flex flex-col gap-2 text-left">
          {restEntries.map((item) => {
            if (item.isCurrentUser) {
              return (
                <div
                  key={`${item.rank}-${item.anonymousName}`}
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

                  <span className="text-sm font-black text-white">
                    {item.points || userPoints} pt
                  </span>
                </div>
              );
            }

            return (
              <div
                key={`${item.rank}-${item.anonymousName}`}
                className="w-full bg-slate-50/80 hover:bg-slate-100/80 rounded-2xl p-3 px-4 flex items-center justify-between transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-4 text-center">
                    {item.rank}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0">
                    {item.avatarId ? getAvatarEmoji(item.avatarId) : '⭐'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">
                      {item.anonymousName}
                    </p>
                    {item.streak > 0 && (
                      <span className="text-[10px] font-semibold text-slate-400">
                        🔥 {item.streak} day streak
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-500">
                  {item.points} pt
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default LeaderboardPage;
