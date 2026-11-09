import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  Flame,
  CheckCircle2,
  Percent,
  Zap,
  ShieldCheck,
  Search,
  Download,
  ChevronDown,
} from 'lucide-react';

type AdminTab = 'children' | 'parents';

interface ChildRecord {
  id: string;
  name: string;
  parent: string;
  plan: 'Premium' | 'Freemium';
  regDate: string;
  lastActive: string;
  started: number;
  completed: number;
  progress: number;
  status: 'Active' | 'Inactive';
}

interface ParentRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'Premium' | 'Freemium';
  linkedChild: string;
  childId: string;
  regDate: string;
  lastLogin: string;
  status: 'Active' | 'Inactive';
}

const MOCK_CHILDREN: ChildRecord[] = [
  { id: 'CHD-00123', name: 'Emma Johnson', parent: 'Sarah Johnson', plan: 'Premium', regDate: '12 Jan 2025', lastActive: '2 hours ago', started: 12, completed: 10, progress: 78, status: 'Active' },
  { id: 'CHD-00124', name: 'Liam Smith', parent: 'James Smith', plan: 'Freemium', regDate: '10 Jan 2025', lastActive: '5 hours ago', started: 8, completed: 5, progress: 56, status: 'Active' },
  { id: 'CHD-00125', name: 'Ava Brown', parent: 'Lisa Brown', plan: 'Premium', regDate: '08 Jan 2025', lastActive: '1 day ago', started: 15, completed: 12, progress: 90, status: 'Active' },
  { id: 'CHD-00126', name: 'Noah Davis', parent: 'Michael Davis', plan: 'Freemium', regDate: '05 Jan 2025', lastActive: '2 days ago', started: 6, completed: 3, progress: 42, status: 'Inactive' },
  { id: 'CHD-00127', name: 'Sophia Wilson', parent: 'Emily Wilson', plan: 'Premium', regDate: '03 Jan 2025', lastActive: '3 hours ago', started: 10, completed: 8, progress: 73, status: 'Active' },
];

const MOCK_PARENTS: ParentRecord[] = [
  { id: 'PRT-00123', name: 'Sarah Johnson', email: 'sarah@...', phone: '+234...', plan: 'Premium', linkedChild: 'Emma', childId: 'CHD-00123', regDate: '12 Jan 2025', lastLogin: '2h ago', status: 'Active' },
  { id: 'PRT-00124', name: 'James Smith', email: 'james@...', phone: '+234...', plan: 'Freemium', linkedChild: 'Liam', childId: 'CHD-00124', regDate: '10 Jan 2025', lastLogin: '5h ago', status: 'Active' },
  { id: 'PRT-00125', name: 'Lisa Brown', email: 'lisa@...', phone: '+234...', plan: 'Premium', linkedChild: 'Ava', childId: 'CHD-00125', regDate: '08 Jan 2025', lastLogin: '1d ago', status: 'Active' },
  { id: 'PRT-00126', name: 'Michael Davis', email: 'michael@...', phone: '+234...', plan: 'Freemium', linkedChild: 'Noah', childId: 'CHD-00126', regDate: '05 Jan 2025', lastLogin: '2d ago', status: 'Inactive' },
  { id: 'PRT-00127', name: 'Emily Wilson', email: 'emily@...', phone: '+234...', plan: 'Premium', linkedChild: 'Sophia', childId: 'CHD-00127', regDate: '03 Jan 2025', lastLogin: '3h ago', status: 'Active' },
];

export const AdminHomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('children');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [page, setPage] = useState(1);

  // Filter Children
  const filteredChildren = MOCK_CHILDREN.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.parent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesPlan = planFilter === 'All' || c.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Filter Parents
  const filteredParents = MOCK_PARENTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.linkedChild.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesPlan = planFilter === 'All' || p.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleExport = () => {
    alert(`Exporting ${activeTab} data as CSV...`);
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans select-none pb-12">
      {/* Top Header Row with Title & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {activeTab === 'children' ? 'Home - Children' : 'Home - Parents'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {activeTab === 'children'
              ? 'Overview of registered child accounts and learning metrics.'
              : 'Overview of registered parent accounts and engagement metrics.'}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => { setActiveTab('children'); setSearchTerm(''); }}
            className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'children'
                ? 'bg-[#B83806] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Children
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('parents'); setSearchTerm(''); }}
            className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'parents'
                ? 'bg-[#B83806] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Parents
          </button>
        </div>
      </div>

      {/* ── KPI METRICS CARDS ── */}
      {activeTab === 'children' ? (
        <div className="flex flex-col gap-4">
          {/* Row 1: 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Registered Children */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Total Registered Children</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">1,250</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 12% <span className="text-slate-400 font-normal">vs. last 30 days</span></p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Users className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* Active Children */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Active Children</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">980</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 8% <span className="text-slate-400 font-normal">vs. last 30 days</span></p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <UserCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* New Children */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">New Children</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">45</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 15% <span className="text-slate-400 font-normal">vs. last 30 days</span></p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-fuchsia-50 flex items-center justify-center text-fuchsia-600 shrink-0">
                <UserPlus className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* Daily Active Children */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Daily Active Children</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">620</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 10% <span className="text-slate-400 font-normal">vs. last 30 days</span></p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                <TrendingUp className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>
          </div>

          {/* Row 2: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Challenges Started */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Challenges Started</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">2,340</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 16% <span className="text-slate-400 font-normal">vs. last 30 days</span></p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <Flame className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* Challenges Completed */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Challenges Completed</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">1,890</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 18% <span className="text-slate-400 font-normal">vs. last 30 days</span></p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                <CheckCircle2 className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* Challenge Completion Rate */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Challenge Completion Rate</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">81%</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 6% <span className="text-slate-400 font-normal">vs. last 30 days</span></p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                <Percent className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PARENTS KPI CARDS */
        <div className="flex flex-col gap-4">
          {/* Row 1: 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Registered */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Total Registered</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">850</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 12%</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Users className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* Active Parents */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Active Parents</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">720</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 8%</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <UserCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* Freemium Parents */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Freemium Parents</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">480</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 10%</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <Zap className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* Premium Parents */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Premium Parents</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">240</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 15%</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>
          </div>

          {/* Row 2: 2 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* New Parents */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">New Parents</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">60</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 20%</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 shrink-0">
                <UserPlus className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            {/* Freemium -> Premium Upgrades */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Freemium → Premium Upgrades</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">35</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">↑ 18%</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                <TrendingUp className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TABLE CARD ── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6">
        {/* Table Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            {/* Search input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  activeTab === 'children'
                    ? 'Search by child name, ID or parent...'
                    : 'Search by parent name, ID, child name, child ID or email...'
                }
                className="w-full pl-10 pr-4 py-2 bg-[#FFFBF8] border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806] focus:ring-2 focus:ring-[#B83806]/10 transition-all font-medium"
              />
            </div>

            {/* Dropdown Filters (Children view) */}
            {activeTab === 'children' && (
              <>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer hover:bg-slate-50"
                  >
                    <option value="All">Status: All</option>
                    <option value="Active">Status: Active</option>
                    <option value="Inactive">Status: Inactive</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer hover:bg-slate-50"
                  >
                    <option value="All">Plan: All</option>
                    <option value="Premium">Plan: Premium</option>
                    <option value="Freemium">Plan: Freemium</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <button type="button" className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                    <span>Registration Date</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                <div className="relative">
                  <button type="button" className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                    <span>Challenge: All</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#9E3508] hover:bg-[#852C06] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs self-start lg:self-auto shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>

        {/* ── TABLE DATA ── */}
        <div className="overflow-x-auto -mx-6 px-6">
          {activeTab === 'children' ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-2">CHILD ID</th>
                  <th className="py-3 px-2">CHILD NAME</th>
                  <th className="py-3 px-2">PARENT/GUARDIAN</th>
                  <th className="py-3 px-2">PARENT PLAN</th>
                  <th className="py-3 px-2">REGISTRATION DATE</th>
                  <th className="py-3 px-2">LAST ACTIVE</th>
                  <th className="py-3 px-2 text-center">CHALLENGES STARTED</th>
                  <th className="py-3 px-2 text-center">CHALLENGES COMPLETED</th>
                  <th className="py-3 px-2">PROGRESS</th>
                  <th className="py-3 px-2 text-center">STATUS</th>
                  <th className="py-3 px-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredChildren.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-2 font-medium text-slate-500">{row.id}</td>
                    <td className="py-4 px-2 font-bold text-slate-900">{row.name}</td>
                    <td className="py-4 px-2 text-slate-600 font-medium">{row.parent}</td>
                    <td className="py-4 px-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        row.plan === 'Premium'
                          ? 'bg-amber-100/70 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {row.plan}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-slate-500">{row.regDate}</td>
                    <td className="py-4 px-2 text-slate-500">{row.lastActive}</td>
                    <td className="py-4 px-2 text-center font-bold text-slate-700">{row.started}</td>
                    <td className="py-4 px-2 text-center font-bold text-slate-700">{row.completed}</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#B83806] rounded-full" style={{ width: `${row.progress}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{row.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Link
                        to={`/admin/children/${row.id}`}
                        className="text-xs font-bold text-[#B83806] hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-2">PARENT ID</th>
                  <th className="py-3 px-2">PARENT NAME</th>
                  <th className="py-3 px-2">EMAIL</th>
                  <th className="py-3 px-2">PHONE</th>
                  <th className="py-3 px-2">PLAN</th>
                  <th className="py-3 px-2">LINKED CHILD</th>
                  <th className="py-3 px-2">CHILD ID</th>
                  <th className="py-3 px-2">REGISTRATION DATE</th>
                  <th className="py-3 px-2">LAST LOGIN</th>
                  <th className="py-3 px-2 text-center">STATUS</th>
                  <th className="py-3 px-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredParents.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-2 font-medium text-slate-500">{row.id}</td>
                    <td className="py-4 px-2 font-bold text-slate-900">{row.name}</td>
                    <td className="py-4 px-2 text-slate-600">{row.email}</td>
                    <td className="py-4 px-2 text-slate-600">{row.phone}</td>
                    <td className="py-4 px-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        row.plan === 'Premium'
                          ? 'bg-amber-100/70 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {row.plan}
                      </span>
                    </td>
                    <td className="py-4 px-2 font-medium text-slate-800">{row.linkedChild}</td>
                    <td className="py-4 px-2 text-slate-500">{row.childId}</td>
                    <td className="py-4 px-2 text-slate-500">{row.regDate}</td>
                    <td className="py-4 px-2 text-slate-500">{row.lastLogin}</td>
                    <td className="py-4 px-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Link
                        to={`/admin/parents/${row.id}`}
                        className="text-xs font-bold text-[#B83806] hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── PAGINATION FOOTER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-slate-100 mt-2 text-xs">
          <p className="text-slate-500 font-medium">
            Showing 1 to {activeTab === 'children' ? filteredChildren.length : filteredParents.length} of{' '}
            {activeTab === 'children' ? '1,250' : '850'} {activeTab}
          </p>

          <div className="flex items-center gap-1 self-end sm:self-auto">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Previous
            </button>
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  page === num
                    ? 'bg-[#B83806] text-white shadow-xs'
                    : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
