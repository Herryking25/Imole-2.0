import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { useApp } from '../../hooks/useApp';

export const ProgressDashboardPage: React.FC = () => {
  const { totalPoints, totalCompleted } = useProgress();
  const { streak } = useApp();

  // Metrics values (with mockup defaults if profile is fresh)
  const displayCompleted = totalCompleted > 0 ? totalCompleted : 22;
  const displayStreak = streak.currentStreak > 0 ? streak.currentStreak : 9;
  const displayPoints = totalPoints > 0 ? totalPoints.toLocaleString() : '1,162';
  const displayAvgScore = '72%';

  // Skills breakdown
  const skillsBreakdown = [
    {
      name: 'Maths',
      percentage: 80,
      barColor: 'bg-[#f59e0b]',
    },
    {
      name: 'Speaking',
      percentage: 20,
      barColor: 'bg-[#ea580c]',
    },
    {
      name: 'Finance',
      percentage: 20,
      barColor: 'bg-[#ea580c]',
    },
    {
      name: 'Creativity',
      percentage: 20,
      barColor: 'bg-[#0d9488]',
    },
    {
      name: 'Emotional IQ',
      percentage: 20,
      barColor: 'bg-[#0d9488]',
    },
  ];

  // Weekly activity columns (Monday to Sunday)
  const weeklyDays = [
    { day: 'M', height: '30%', isPeak: false },
    { day: 'T', height: '55%', isPeak: false },
    { day: 'W', height: '75%', isPeak: false },
    { day: 'T', height: '45%', isPeak: false },
    { day: 'F', height: '90%', isPeak: true },
    { day: 'S', height: '8%', isPeak: false },
    { day: 'S', height: '8%', isPeak: false },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#faf8f5]/50 md:bg-white flex flex-col py-4 px-4 sm:px-8 pb-28 sm:pb-8 animate-in fade-in duration-300">
      <div className="max-w-xl w-full mx-auto flex flex-col gap-4 text-left">

        {/* ── Header ── */}
        <div className="pt-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Progress
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
            See all your progress percentages
          </p>
        </div>

        {/* ── Top 4 Metric Cards (2x2 Grid) ── */}
        <div className="grid grid-cols-2 gap-3.5 w-full mt-1">
          {/* Card 1: Challenges done */}
          <div className="bg-[#fef9c3]/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-3xl font-black text-slate-900 leading-tight">
              {displayCompleted}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1">
              Challenges done
            </span>
          </div>

          {/* Card 2: Streak */}
          <div className="bg-[#fef9c3]/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-3xl font-black text-[#dc2626] leading-tight">
              {displayStreak}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1">
              Streak
            </span>
          </div>

          {/* Card 3: Total points */}
          <div className="bg-[#fef9c3]/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {displayPoints}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1">
              Total points
            </span>
          </div>

          {/* Card 4: Avg score */}
          <div className="bg-[#fef9c3]/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-3xl font-black text-[#16a34a] leading-tight">
              {displayAvgScore}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1">
              Avg score
            </span>
          </div>
        </div>

        {/* ── SKILLS BREAKDOWN ── */}
        <div className="mt-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            SKILLS BREAKDOWN
          </h2>

          <div className="flex flex-col gap-3.5">
            {skillsBreakdown.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-slate-800 w-24 sm:w-28 shrink-0">
                  {skill.name}
                </span>

                {/* Horizontal Progress Bar */}
                <div className="flex-1 h-2 bg-slate-200/80 rounded-full overflow-hidden mx-3">
                  <div
                    className={`h-full ${skill.barColor} rounded-full transition-all duration-700`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 w-10 text-right shrink-0">
                  {skill.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Weekly Activity Card ── */}
        <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 sm:p-6 mt-3 flex flex-col gap-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Weekly Activity
          </h2>

          {/* Weekly Bar Chart */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3 items-end pt-2 pb-1">
            {weeklyDays.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Vertical Capsule Track */}
                <div className="w-full max-w-[38px] h-36 sm:h-40 bg-slate-100/70 rounded-full flex flex-col justify-end p-0.5 overflow-hidden">
                  <div
                    className={`w-full rounded-full transition-all duration-700 ${
                      item.isPeak
                        ? 'bg-gradient-to-t from-[#ea580c] to-[#f97316] shadow-md shadow-orange-500/25'
                        : 'bg-slate-200/90'
                    }`}
                    style={{ height: item.height }}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={`text-xs font-bold ${
                    item.isPeak ? 'text-[#ea580c] font-black' : 'text-slate-400'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          {/* Weekly Study Hours Box */}
          <div className="w-full bg-slate-50/90 border border-slate-100 rounded-2xl p-3 text-center text-xs sm:text-sm text-slate-600">
            You spent <strong className="font-extrabold text-slate-900">4.5 hours</strong> learning this week.
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProgressDashboardPage;
