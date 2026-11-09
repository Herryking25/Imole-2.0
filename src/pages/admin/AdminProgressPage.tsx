import React, { useState } from 'react';
import {
  Users,
  Flag,
  CheckCircle2,
  BarChart2,
  Search,
  ChevronDown,
  RotateCcw,
  Target,
  Lightbulb,
} from 'lucide-react';

interface ChallengeRow {
  id: string;
  name: string;
  subtitle: string;
  skill: string;
  skillBg: string;
  skillText: string;
  started: number;
  completed: number;
  successRate: string;
  successTrend: 'up' | 'neutral';
  status: 'ACTIVE' | 'INACTIVE';
  icon: string;
}

const CHALLENGES_DATA: ChallengeRow[] = [
  {
    id: 'ch-1',
    name: 'Public Speaking at Dinner Table',
    subtitle: 'Ages 6-10 • Routine Practice',
    skill: 'Confidence',
    skillBg: 'bg-transparent',
    skillText: 'text-slate-700',
    started: 1580,
    completed: 1495,
    successRate: '94.6%',
    successTrend: 'up',
    status: 'ACTIVE',
    icon: '🗣️',
  },
  {
    id: 'ch-2',
    name: 'Budget Boss Weekly Allowance',
    subtitle: 'Ages 8-12 • Interactive Simulation',
    skill: 'Financial Literacy',
    skillBg: 'bg-[#FEF3C7]/80',
    skillText: 'text-[#B45309]',
    started: 1240,
    completed: 890,
    successRate: '71.7%',
    successTrend: 'neutral',
    status: 'ACTIVE',
    icon: '💰',
  },
  {
    id: 'ch-3',
    name: 'Story Weavers Team Tale',
    subtitle: 'Ages 5-9 • Group Collaborative',
    skill: 'Creativity & Teamwork',
    skillBg: 'bg-transparent',
    skillText: 'text-slate-700',
    started: 1120,
    completed: 1032,
    successRate: '92.1%',
    successTrend: 'up',
    status: 'ACTIVE',
    icon: '👥',
  },
  {
    id: 'ch-4',
    name: 'Kitchen Science Problem',
    subtitle: 'Ages 7-11 • Hands-on Activity',
    skill: 'Problem Solving',
    skillBg: 'bg-transparent',
    skillText: 'text-slate-700',
    started: 980,
    completed: 840,
    successRate: '85.7%',
    successTrend: 'up',
    status: 'ACTIVE',
    icon: '🧪',
  },
  {
    id: 'ch-5',
    name: 'Conflict Resolution Roleplay',
    subtitle: 'Ages 9-13 • Family Scenario',
    skill: 'Emotional Intelligence',
    skillBg: 'bg-transparent',
    skillText: 'text-slate-700',
    started: 810,
    completed: 640,
    successRate: '79.0%',
    successTrend: 'up',
    status: 'ACTIVE',
    icon: '😊',
  },
];

export const AdminProgressPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All Life Skills');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [page, setPage] = useState(1);

  const filteredChallenges = CHALLENGES_DATA.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'All Life Skills' || row.skill === selectedSkill;
    const matchesStatus = selectedStatus === 'All Statuses' || row.status === selectedStatus;
    return matchesSearch && matchesSkill && matchesStatus;
  });

  const handleReset = () => {
    setSearchTerm('');
    setSelectedSkill('All Life Skills');
    setSelectedStatus('All Statuses');
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans select-none pb-16">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
          ANALYTICS &amp; ENGAGEMENT
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          See how children are progressing across life skills and challenges.
        </p>
      </div>

      {/* Top 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CHILDREN PARTICIPATING */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              CHILDREN PARTICIPATING IN CHALLENGES
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">980</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold text-emerald-700 bg-emerald-50">
              ↗ 12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-2">vs. previous 30 days period</p>
        </div>

        {/* Card 2: TOTAL CHALLENGES STARTED */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              TOTAL CHALLENGES STARTED
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
              <Flag className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">2,340</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold text-emerald-700 bg-emerald-50">
              ↗ 16%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-2">78 new challenge enrollments daily</p>
        </div>

        {/* Card 3: TOTAL CHALLENGES COMPLETED */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              TOTAL CHALLENGES COMPLETED
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">1,080</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold text-emerald-700 bg-emerald-50">
              ↗ 12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-2">Verified by parents &amp; mentors</p>
        </div>

        {/* Card 4: AVERAGE COMPLETION RATE */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              AVERAGE CHALLENGE COMPLETION RATE
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
              <BarChart2 className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">81%</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold text-emerald-700 bg-emerald-50">
              ↗ 12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-2">Completed ÷ Started × 100</p>
        </div>
      </div>

      {/* Middle Row: Most Active Life Skills (Left) & Parent Focus Skills (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Card: Most Active Life Skills */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-5">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Most Active Life Skills
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Performance tracking across current active cohort
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold shrink-0">
                6 core Skills
              </span>
            </div>

            {/* Skills List */}
            <div className="space-y-3.5">
              {/* Communication */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="font-bold text-slate-800">Communication</span>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold">
                    Strong
                  </span>
                  <span className="font-black text-slate-900 w-10 text-right">85%</span>
                </div>
              </div>

              {/* Problem Solving */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="font-bold text-slate-800">Problem Solving</span>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[11px] font-bold">
                    Good
                  </span>
                  <span className="font-black text-slate-900 w-10 text-right">78%</span>
                </div>
              </div>

              {/* Confidence */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="font-bold text-slate-800">Confidence</span>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[11px] font-bold">
                    Good
                  </span>
                  <span className="font-black text-slate-900 w-10 text-right">72%</span>
                </div>
              </div>

              {/* Teamwork */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="font-bold text-slate-800">Teamwork</span>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold">
                    Developing
                  </span>
                  <span className="font-black text-slate-900 w-10 text-right">65%</span>
                </div>
              </div>

              {/* Leadership */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="font-bold text-slate-800">Leadership</span>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-[11px] font-bold">
                    Needs Practice
                  </span>
                  <span className="font-black text-slate-900 w-10 text-right">48%</span>
                </div>
              </div>

              {/* Financial Literacy */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="font-bold text-slate-800">Financial Literacy</span>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-[11px] font-bold">
                    Needs Practice
                  </span>
                  <span className="font-black text-slate-900 w-10 text-right">42%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
            <span>Skill scores calibrated using developmental milestones</span>
          </div>
        </div>

        {/* Right Card: Parent Focus Skills */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Parent Focus Skills
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Skills parents choose most often for extra focus
                </p>
              </div>
              <Target className="w-4.5 h-4.5 text-slate-400 stroke-[1.8]" />
            </div>

            {/* Donut and Breakdown Row */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-4">
              {/* Donut Circle */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {/* Background Circle */}
                  <circle cx="60" cy="60" r="46" fill="transparent" stroke="#FFF0EB" strokeWidth="16" />
                  {/* Foreground Donut Segments */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="transparent"
                    stroke="#B83806"
                    strokeWidth="16"
                    strokeDasharray="289"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="transparent"
                    stroke="#EA580C"
                    strokeWidth="16"
                    strokeDasharray="289"
                    strokeDashoffset="180"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-slate-900 leading-tight">100%</span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">PRIORITY</span>
                </div>
              </div>

              {/* Percentage breakdown */}
              <div className="space-y-3 text-xs w-full sm:w-48">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Financial Literacy</span>
                  <span className="font-black text-slate-900">34%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Problem Solving</span>
                  <span className="font-black text-slate-900">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Confidence</span>
                  <span className="font-black text-slate-900">22%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Leadership</span>
                  <span className="font-black text-slate-900">16%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Callout */}
          <div className="pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600 leading-relaxed font-medium">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              Parents with <strong>PREMIUM</strong> accounts can choose priority focus areas to boost recommended challenges.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Card: Challenge Performance */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Challenge Performance
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Track engagement, completions, and effectiveness per challenge curriculum
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Showing 5 of 24 challenges</span>
          </div>
        </div>

        {/* Toolbar Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by challenge name or skill..."
              className="w-full pl-10 pr-4 py-2 bg-[#FFFDF5] border border-amber-200/60 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806] font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer"
              >
                <option value="All Life Skills">All Life Skills</option>
                <option value="Confidence">Confidence</option>
                <option value="Financial Literacy">Financial Literacy</option>
                <option value="Creativity & Teamwork">Creativity &amp; Teamwork</option>
                <option value="Problem Solving">Problem Solving</option>
                <option value="Emotional Intelligence">Emotional Intelligence</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-4">CHALLENGE NAME</th>
                <th className="pb-3 px-4">LIFE SKILL</th>
                <th className="pb-3 px-4 text-right">STARTED</th>
                <th className="pb-3 px-4 text-right">COMPLETED</th>
                <th className="pb-3 px-4 text-right">SUCCESS RATE</th>
                <th className="pb-3 pl-4 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChallenges.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-50/70 text-slate-700 flex items-center justify-center shrink-0 text-base">
                        {row.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {row.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {row.subtitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.skillBg} ${row.skillText}`}>
                      {row.skill}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-slate-700">
                    {row.started.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-slate-700">
                    {row.completed.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right font-bold whitespace-nowrap">
                    <span className={row.successTrend === 'up' ? 'text-emerald-600' : 'text-slate-600'}>
                      {row.successRate} {row.successTrend === 'up' ? '↗' : '→'}
                    </span>
                  </td>
                  <td className="py-4 pl-4 text-center whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-black text-[10px] tracking-wide border border-emerald-200">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-5 mt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <span>Showing 1 to 5 of 24 results</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, page - 1))}
              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              &lt;
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-[#B83806] text-white font-bold cursor-pointer"
            >
              1
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              2
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProgressPage;

