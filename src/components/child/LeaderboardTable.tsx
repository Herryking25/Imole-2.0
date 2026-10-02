import React from 'react';
import { Trophy, Flame, Star, Shield } from 'lucide-react';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { useLanguage } from '../../hooks/useLanguage';
import { getAvatarEmoji } from '../../utils/avatarUtils';

export const LeaderboardTable: React.FC = () => {
  const { entries } = useLeaderboard();
  const { t } = useLanguage();

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center text-xs shadow-xs">
          🥇
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-800 font-black flex items-center justify-center text-xs shadow-xs">
          🥈
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-7 h-7 rounded-full bg-amber-700 text-amber-100 font-black flex items-center justify-center text-xs shadow-xs">
          🥉
        </div>
      );
    }
    return (
      <span className="w-7 text-center text-xs font-black text-slate-500">
        #{rank}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm text-left">
      <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-50/50 via-teal-50/30 to-white flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>{t.leaderboard.title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 max-w-sm">
            {t.leaderboard.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 shadow-xs">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Child Safe</span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center justify-between p-4 transition-colors ${
              entry.isCurrentUser
                ? 'bg-emerald-50/90 border-l-4 border-emerald-500 font-bold'
                : 'hover:bg-slate-50/60'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {getRankBadge(entry.rank)}

              <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0 border border-slate-200/70">
                {getAvatarEmoji(entry.avatarId)}
              </div>

              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
                    {entry.anonymousName}
                  </span>
                  {entry.isCurrentUser && (
                    <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {t.leaderboard.youBadge}
                    </span>
                  )}
                </div>
                {entry.badge && (
                  <span className="text-[11px] text-slate-500 font-medium truncate block">
                    {entry.badge}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 pl-2">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>{entry.streak}d</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-black text-emerald-800 w-16 justify-end">
                <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-600" />
                <span>{entry.points}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
