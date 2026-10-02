import React from 'react';
import { Users, Flame, CheckCircle, TrendingUp, BarChart, Award } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';

export const MetricsCards: React.FC = () => {
  const { metrics } = useAnalytics();

  const cards = [
    {
      label: 'Registered Children',
      value: metrics.registeredChildren,
      sub: '+12% this week',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-200/80',
    },
    {
      label: 'Daily Active Users (DAU)',
      value: metrics.dailyActiveUsers,
      sub: `${metrics.monthlyActiveUsers} MAU`,
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200/80',
    },
    {
      label: 'Challenge Completion Rate',
      value: `${metrics.completionRate}%`,
      sub: 'Strong engagement',
      icon: <CheckCircle className="w-5 h-5 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-200/80',
    },
    {
      label: 'Average Learning Streak',
      value: `${metrics.averageStreak} Days`,
      sub: 'High retention',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200/80',
    },
    {
      label: 'Total Submissions',
      value: metrics.totalSubmissions,
      sub: 'Browser & local storage',
      icon: <BarChart className="w-5 h-5 text-[#a73605]" />,
      bg: 'bg-[#fff1ea] border-[#f7cbb2]/80',
    },
    {
      label: 'Weekly Retention Rate',
      value: `${metrics.weeklyRetentionRate}%`,
      sub: 'Demo Day target: >60%',
      icon: <Award className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50 border-rose-200/80',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
      {cards.map((c, i) => (
        <div key={i} className={`p-5 rounded-3xl border ${c.bg} bg-white shadow-xs`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{c.label}</span>
            <div className="p-2 rounded-xl bg-white shadow-xs">{c.icon}</div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{c.value}</div>
          <span className="text-xs font-medium text-slate-500">{c.sub}</span>
        </div>
      ))}
    </div>
  );
};

