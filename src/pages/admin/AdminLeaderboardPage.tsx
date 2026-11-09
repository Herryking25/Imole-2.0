import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Search,
  ChevronDown,
  Info,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  childName: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  age: number;
  childId: string;
  parentName: string;
  parentId: string;
  plan: 'Freemium' | 'Premium';
  points: number;
  tasksCompleted: number;
  dominantSkill: string;
  skillBg: string;
  skillText: string;
  skillDot: string;
  progress: number;
  status: 'Active' | 'Inactive';
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    childName: 'Noah Wilson',
    initials: 'NW',
    avatarBg: 'bg-[#5B2E15]',
    avatarText: 'text-[#FEF3C7]',
    age: 9,
    childId: 'CHD-00089',
    parentName: 'Michael Davis',
    parentId: 'PRT-00121',
    plan: 'Freemium',
    points: 2450,
    tasksCompleted: 18,
    dominantSkill: 'Financial Literacy',
    skillBg: 'bg-[#FEF3C7]/70',
    skillText: 'text-[#92400E]',
    skillDot: 'bg-[#D97706]',
    progress: 92,
    status: 'Active',
  },
  {
    rank: 2,
    childName: 'Emma Johnson',
    initials: 'EJ',
    avatarBg: 'bg-[#FCE7F3]',
    avatarText: 'text-[#9D174D]',
    age: 8,
    childId: 'CHD-00123',
    parentName: 'Sarah Johnson',
    parentId: 'PRT-00122',
    plan: 'Premium',
    points: 2320,
    tasksCompleted: 16,
    dominantSkill: 'Confidence',
    skillBg: 'bg-[#FEF3C7]/60',
    skillText: 'text-[#92400E]',
    skillDot: 'bg-[#F59E0B]',
    progress: 86,
    status: 'Active',
  },
  {
    rank: 3,
    childName: 'Liam Smith',
    initials: 'LS',
    avatarBg: 'bg-[#FFEDD5]',
    avatarText: 'text-[#C2410C]',
    age: 7,
    childId: 'CHD-00124',
    parentName: 'James Smith',
    parentId: 'PRT-00123',
    plan: 'Freemium',
    points: 2180,
    tasksCompleted: 15,
    dominantSkill: 'Problem Solving',
    skillBg: 'bg-[#EFF6FF]',
    skillText: 'text-[#1E40AF]',
    skillDot: 'bg-[#3B82F6]',
    progress: 78,
    status: 'Active',
  },
  {
    rank: 4,
    childName: 'Ava Brown',
    initials: 'AB',
    avatarBg: 'bg-[#EDE9FE]',
    avatarText: 'text-[#6D28D9]',
    age: 10,
    childId: 'CHD-00125',
    parentName: 'Lisa Brown',
    parentId: 'PRT-00124',
    plan: 'Premium',
    points: 1980,
    tasksCompleted: 14,
    dominantSkill: 'Communication',
    skillBg: 'bg-[#FAF5FF]',
    skillText: 'text-[#7E22CE]',
    skillDot: 'bg-[#A855F7]',
    progress: 74,
    status: 'Active',
  },
  {
    rank: 5,
    childName: 'Sophia Davis',
    initials: 'SD',
    avatarBg: 'bg-[#E0E7FF]',
    avatarText: 'text-[#3730A3]',
    age: 11,
    childId: 'CHD-00126',
    parentName: 'Emily Wilson',
    parentId: 'PRT-00125',
    plan: 'Premium',
    points: 1760,
    tasksCompleted: 12,
    dominantSkill: 'Leadership',
    skillBg: 'bg-[#EEF2FF]',
    skillText: 'text-[#4338CA]',
    skillDot: 'bg-[#6366F1]',
    progress: 65,
    status: 'Active',
  },
  {
    rank: 6,
    childName: 'Zainab Danjuma',
    initials: 'ZD',
    avatarBg: 'bg-[#FEE2E2]',
    avatarText: 'text-[#B91C1C]',
    age: 9,
    childId: 'CHD-00127',
    parentName: 'Amina Danjuma',
    parentId: 'PRT-00126',
    plan: 'Freemium',
    points: 1690,
    tasksCompleted: 11,
    dominantSkill: 'Creative Arts',
    skillBg: 'bg-[#FFF1F2]',
    skillText: 'text-[#BE123C]',
    skillDot: 'bg-[#F43F5E]',
    progress: 62,
    status: 'Active',
  },
  {
    rank: 7,
    childName: 'David Alabi',
    initials: 'DA',
    avatarBg: 'bg-[#D1FAE5]',
    avatarText: 'text-[#065F46]',
    age: 12,
    childId: 'CHD-00128',
    parentName: 'Kayode Alabi',
    parentId: 'PRT-00127',
    plan: 'Premium',
    points: 1540,
    tasksCompleted: 10,
    dominantSkill: 'Civic Duty',
    skillBg: 'bg-[#ECFDF5]',
    skillText: 'text-[#047857]',
    skillDot: 'bg-[#10B981]',
    progress: 58,
    status: 'Active',
  },
  {
    rank: 8,
    childName: 'Fatima Bello',
    initials: 'FB',
    avatarBg: 'bg-[#CCFBF1]',
    avatarText: 'text-[#115E59]',
    age: 8,
    childId: 'CHD-00129',
    parentName: 'Halima Bello',
    parentId: 'PRT-00128',
    plan: 'Freemium',
    points: 1480,
    tasksCompleted: 9,
    dominantSkill: 'Health & Hygiene',
    skillBg: 'bg-[#F0FDFA]',
    skillText: 'text-[#0F766E]',
    skillDot: 'bg-[#14B8A6]',
    progress: 54,
    status: 'Active',
  },
];

export const AdminLeaderboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState('Weekly');
  const [planFilter, setPlanFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [ageFilter, setAgeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = LEADERBOARD_DATA.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.childName.toLowerCase().includes(q);
      const matchId = item.childId.toLowerCase().includes(q);
      const matchParent = item.parentName.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchParent) return false;
    }
    if (planFilter !== 'All' && item.plan !== planFilter) return false;
    if (skillFilter !== 'All' && item.dominantSkill !== skillFilter) return false;
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 text-left max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
          Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
          Admin monitoring view for child challenge performance, points, and completion
        </p>
      </div>

      {/* Weekly Honor Roll Podium */}
      <div className="bg-white rounded-2xl border border-[#EDE8E1] p-5 sm:p-7 shadow-xs">
        {/* Podium Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#F3EFEA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                Weekly Honor Roll Podium
              </h2>
              <p className="text-xs text-[#6B7280]">
                Top three highest scoring children across verified developmental milestones
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
            <span>Cycle #42 • Ending Sunday 23:59 GMT</span>
          </div>
        </div>

        {/* 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 items-end">
          {/* Rank #2 - Emma Johnson (Silver - Left) */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 relative shadow-xs flex flex-col justify-between transition-transform hover:-translate-y-0.5">
            {/* Top Rank Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#94A3B8] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
              #2
            </div>

            <div className="flex flex-col items-center text-center pt-2">
              <div className="w-14 h-14 rounded-full bg-[#FCE7F3] text-[#9D174D] font-extrabold text-lg flex items-center justify-center mb-2.5">
                EJ
              </div>
              <Link
                to="/admin/children/CHD-00123"
                className="font-bold text-base text-[#111827] hover:text-[#C2410C] transition-colors"
              >
                Emma Johnson
              </Link>
              <p className="text-xs text-[#6B7280] mt-0.5">Age 8 • CHD-00123</p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FEF3C7]/70 text-[#92400E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                <span>Confidence</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F3EFEA] space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Total Points:</span>
                <span className="font-bold text-[#111827]">2,320 XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Challenges:</span>
                <span className="font-semibold text-[#111827]">16 completed</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-1">
                  <span>Progress</span>
                  <span className="font-bold text-[#C2410C]">86%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F3EFEA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C2410C] rounded-full transition-all"
                    style={{ width: '86%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rank #1 - Noah Wilson (Gold - Center, Elevated) */}
          <div className="bg-[#FFFDF7] rounded-2xl border-2 border-[#FCD34D] p-5.5 relative shadow-md flex flex-col justify-between md:-translate-y-2 transition-transform hover:-translate-y-3">
            {/* Gold Rank Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F59E0B] text-white font-extrabold text-xs flex items-center justify-center shadow-md ring-4 ring-[#FEF3C7]">
              #1
            </div>

            <div className="flex flex-col items-center text-center pt-2">
              <div className="w-16 h-16 rounded-full bg-[#5B2E15] text-[#FEF3C7] font-extrabold text-xl flex items-center justify-center mb-2.5 shadow-xs">
                NW
              </div>
              <div className="flex items-center justify-center gap-1">
                <Link
                  to="/admin/children/CHD-00089"
                  className="font-extrabold text-lg text-[#111827] hover:text-[#C2410C] transition-colors"
                >
                  Noah Wilson
                </Link>
                <CheckCircle2 className="w-4 h-4 text-[#10B981] fill-[#D1FAE5]" />
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">Age 9 • CHD-00089</p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
                <span>Financial Literacy</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#FCD34D]/50 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Total Points:</span>
                <span className="text-base font-extrabold text-[#111827]">2,450 XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Challenges Mastered:</span>
                <span className="font-semibold text-[#111827]">18 completed</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-1">
                  <span>Progress</span>
                  <span className="font-bold text-[#C2410C]">92%</span>
                </div>
                <div className="w-full h-2 bg-[#F3EFEA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] rounded-full transition-all"
                    style={{ width: '92%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rank #3 - Liam Smith (Bronze - Right) */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 relative shadow-xs flex flex-col justify-between transition-transform hover:-translate-y-0.5">
            {/* Top Bronze Rank Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FED7AA] text-[#9A3412] font-extrabold text-xs flex items-center justify-center shadow-xs">
              #3
            </div>

            <div className="flex flex-col items-center text-center pt-2">
              <div className="w-14 h-14 rounded-full bg-[#FFEDD5] text-[#C2410C] font-extrabold text-lg flex items-center justify-center mb-2.5">
                LS
              </div>
              <Link
                to="/admin/children/CHD-00124"
                className="font-bold text-base text-[#111827] hover:text-[#C2410C] transition-colors"
              >
                Liam Smith
              </Link>
              <p className="text-xs text-[#6B7280] mt-0.5">Age 7 • CHD-00124</p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#1E40AF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                <span>Problem Solving</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F3EFEA] space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Total Points:</span>
                <span className="font-bold text-[#111827]">2,180 XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Challenges:</span>
                <span className="font-semibold text-[#111827]">15 completed</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-1">
                  <span>Progress</span>
                  <span className="font-bold text-[#C2410C]">78%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F3EFEA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C2410C] rounded-full transition-all"
                    style={{ width: '78%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by child name, ID, or parent name..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] transition-all"
          />
        </div>

        {/* Filter Dropdown Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {/* Period */}
          <div className="relative">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2 text-xs font-medium text-[#374151] pr-8 focus:outline-none focus:border-[#C2410C] cursor-pointer"
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="All Time">All Time</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Plan */}
          <div className="relative">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2 text-xs font-medium text-[#374151] pr-8 focus:outline-none focus:border-[#C2410C] cursor-pointer"
            >
              <option value="All">All Plans</option>
              <option value="Premium">Premium</option>
              <option value="Freemium">Freemium</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Life Skill */}
          <div className="relative">
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2 text-xs font-medium text-[#374151] pr-8 focus:outline-none focus:border-[#C2410C] cursor-pointer"
            >
              <option value="All">All Life Skills</option>
              <option value="Financial Literacy">Financial Literacy</option>
              <option value="Confidence">Confidence</option>
              <option value="Problem Solving">Problem Solving</option>
              <option value="Communication">Communication</option>
              <option value="Leadership">Leadership</option>
              <option value="Creative Arts">Creative Arts</option>
              <option value="Civic Duty">Civic Duty</option>
              <option value="Health & Hygiene">Health & Hygiene</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2 text-xs font-medium text-[#374151] pr-8 focus:outline-none focus:border-[#C2410C] cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="All">All Statuses</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Age */}
          <div className="relative col-span-2 sm:col-span-1">
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2 text-xs font-medium text-[#374151] pr-8 focus:outline-none focus:border-[#C2410C] cursor-pointer"
            >
              <option value="All">All Ages</option>
              <option value="6-8">Ages 6–8</option>
              <option value="9-12">Ages 9–12</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Standings Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F3EFEA] text-[10px] font-bold text-[#6B7280] tracking-wider uppercase bg-[#FAFAF9]">
                <th className="py-3.5 px-4 text-center">RANK</th>
                <th className="py-3.5 px-4">CHILD PROFILE</th>
                <th className="py-3.5 px-4">CHILD ID</th>
                <th className="py-3.5 px-4">PARENT / GUARDIAN</th>
                <th className="py-3.5 px-4 text-center">PLAN</th>
                <th className="py-3.5 px-4 text-right">POINTS / XP</th>
                <th className="py-3.5 px-4">TASKS</th>
                <th className="py-3.5 px-4">DOMINANT SKILL</th>
                <th className="py-3.5 px-4">PROGRESS</th>
                <th className="py-3.5 px-4 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EFEA] text-xs">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-[#9CA3AF] text-xs">
                    No learners match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  return (
                    <tr
                      key={item.childId}
                      className="hover:bg-[#FAF8F5]/80 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {item.rank === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FEF3C7] text-[#D97706] font-extrabold text-xs">
                            #1
                          </span>
                        ) : item.rank === 2 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F1F5F9] text-[#64748B] font-extrabold text-xs">
                            #2
                          </span>
                        ) : item.rank === 3 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFEDD5] text-[#C2410C] font-extrabold text-xs">
                            #3
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-[#6B7280]">
                            #{item.rank}
                          </span>
                        )}
                      </td>

                      {/* Child Profile */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Link
                          to={`/admin/children/${item.childId}`}
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className={`w-8 h-8 rounded-full ${item.avatarBg} ${item.avatarText} font-bold text-xs flex items-center justify-center shrink-0`}
                          >
                            {item.initials}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#111827] group-hover:text-[#C2410C] transition-colors">
                              {item.childName}
                            </div>
                            <div className="text-[11px] text-[#9CA3AF]">
                              Age {item.age}
                            </div>
                          </div>
                        </Link>
                      </td>

                      {/* Child ID */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono text-[11px] text-[#6B7280]">
                          {item.childId}
                        </span>
                      </td>

                      {/* Parent / Guardian */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Link
                          to={`/admin/parents/${item.parentId}`}
                          className="text-xs font-medium text-[#374151] hover:text-[#C2410C] transition-colors"
                        >
                          {item.parentName}
                        </Link>
                      </td>

                      {/* Plan */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {item.plan === 'Premium' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#B45309]">
                            Premium
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F3E8FF] text-[#7E22CE]">
                            Freemium
                          </span>
                        )}
                      </td>

                      {/* Points / XP */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <span className="font-extrabold text-xs text-[#111827]">
                          {item.points.toLocaleString()}
                        </span>
                      </td>

                      {/* Tasks */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#6B7280]">
                        <span className="font-medium text-xs text-[#111827]">
                          {item.tasksCompleted}
                        </span>{' '}
                        completed
                      </td>

                      {/* Dominant Skill */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${item.skillBg} ${item.skillText}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.skillDot}`} />
                          {item.dominantSkill}
                        </span>
                      </td>

                      {/* Progress */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-20 h-1.5 bg-[#F3EFEA] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#C2410C] rounded-full"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-[#6B7280]">
                            {item.progress}%
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          Active
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 sm:p-5 border-t border-[#F3EFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAFAF9]">
          <div>
            <p className="text-xs text-[#6B7280] font-medium">
              Showing 1–{filteredData.length} of 1,250 registered learners
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF] mt-0.5">
              <Info className="w-3.5 h-3.5 shrink-0 text-[#9CA3AF]" />
              <span>
                Tie-breaking rule: Earliest completion timestamp takes precedence over point ties. All scores backed by verified parent submissions.
              </span>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1 self-center sm:self-auto">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 text-xs text-[#6B7280] hover:text-[#111827] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 rounded-md"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === page
                    ? 'bg-[#B83806] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#F3EFEA] hover:text-[#111827]'
                }`}
              >
                {page}
              </button>
            ))}

            <span className="px-1 text-xs text-[#9CA3AF]">...</span>

            <button
              onClick={() => setCurrentPage(42)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                currentPage === 42
                  ? 'bg-[#B83806] text-white shadow-xs'
                  : 'text-[#6B7280] hover:bg-[#F3EFEA] hover:text-[#111827]'
              }`}
            >
              42
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(42, p + 1))}
              disabled={currentPage === 42}
              className="px-2.5 py-1 text-xs text-[#6B7280] hover:text-[#111827] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 rounded-md"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaderboardPage;
