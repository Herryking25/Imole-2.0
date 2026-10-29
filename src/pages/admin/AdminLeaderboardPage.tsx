import React from 'react';
import { MOCK_LEADERBOARD } from '../../data/mockLeaderboard';
import { Flame, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminLeaderboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Explorer Leaderboard Rankings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time child ranking, challenge streak consistency, and points across life-skill modules.
        </p>
      </div>

      {/* Top 3 Spotlight Podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {MOCK_LEADERBOARD.slice(0, 3).map((item, index) => (
          <div
            key={item.id}
            className={`rounded-3xl p-5 border shadow-xs flex flex-col justify-between ${
              index === 0
                ? 'bg-gradient-to-b from-[#FEFCE8] to-[#FEF08A]/30 border-amber-300'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                  index === 0
                    ? 'bg-amber-400 text-amber-900'
                    : index === 1
                    ? 'bg-slate-300 text-slate-800'
                    : 'bg-amber-700/20 text-amber-900'
                }`}
              >
                #{item.rank}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-orange-600">
                <Flame className="w-3.5 h-3.5 fill-orange-500" />
                <span>{item.streak} days</span>
              </div>
            </div>

            <div className="my-4">
              <h3 className="font-bold text-slate-900 text-base">{item.anonymousName}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{item.badge}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Points</span>
              <span className="text-lg font-black text-[#9E3508]">
                {item.points.toLocaleString()} pts
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Complete Standings</h3>

        <div className="divide-y divide-slate-100">
          {MOCK_LEADERBOARD.map((item) => {
            const isEmma = item.rank === 5;
            return (
              <div
                key={item.id}
                className={`py-3.5 px-4 rounded-2xl flex items-center justify-between transition-colors ${
                  isEmma
                    ? 'bg-[#FEFCE8] border border-[#FEF08A] my-1 font-bold'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                      isEmma
                        ? 'bg-[#A16207] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.rank}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {isEmma ? 'Emma Johnson (Calm River)' : item.anonymousName}
                      </span>
                      {isEmma && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black uppercase">
                          Our Student
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{item.badge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-1 text-xs text-orange-600 font-bold">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" />
                    <span>{item.streak}d streak</span>
                  </div>

                  <span className="text-sm font-black text-[#9E3508]">
                    {item.points.toLocaleString()} pts
                  </span>

                  {isEmma && (
                    <Link
                      to="/admin/children/CHD-00123"
                      className="p-1.5 rounded-lg bg-amber-200/60 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors"
                      title="View Emma's Profile"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
