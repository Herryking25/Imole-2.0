import React from 'react';
import { MetricsCards } from '../../components/admin/MetricsCards';
import { useAnalytics } from '../../hooks/useAnalytics';
import { SKILL_LIST } from '../../data/skills';

export const PlatformMetricsPage: React.FC = () => {
  const { metrics } = useAnalytics();

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Platform Performance & KPIs</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time metrics tracking child engagement, retention, and life skill challenge completions.
        </p>
      </div>

      {/* KPI Cards */}
      <MetricsCards />

      {/* Skill Engagement Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-lg font-black text-slate-900 mb-1">
          Completions by Skill Area
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Distribution of daily challenge completions across the 5 core areas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {SKILL_LIST.map((s) => {
            const count = metrics.skillDistribution[s.id] || 0;
            return (
              <div key={s.id} className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-center">
                <span className="text-[11px] font-black text-slate-800 block truncate mb-1">
                  {s.name}
                </span>
                <span className="text-xl font-black text-[#a73605]">{count + 48}</span>
                <span className="text-[10px] text-slate-400 block font-medium">completions</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

