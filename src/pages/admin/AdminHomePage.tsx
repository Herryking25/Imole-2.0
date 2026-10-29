import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { PremiumUpgradeModal } from '../../components/admin/PremiumUpgradeModal';

export const AdminHomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<'all' | 'premium' | 'freemium'>('all');
  const [modalChild, setModalChild] = useState<string | null>(null);

  const parentsList = [
    {
      id: 'PRT-00123',
      name: 'Sarah Johnson',
      email: 'sarah@domain.com',
      phone: '+234 567 8901',
      plan: 'Premium',
      children: [
        { id: 'CHD-00123', name: 'Emma Johnson', age: 8, progress: 78, plan: 'Premium' },
        { id: 'CHD-00124', name: 'Liam Johnson', age: 6, progress: 56, plan: 'Freemium' },
      ],
      registered: '12 Jan 2025',
      status: 'Active',
    },
    {
      id: 'PRT-00124',
      name: 'Adekunle Adeleke',
      email: 'adekunle@domain.com',
      phone: '+234 802 3344',
      plan: 'Freemium',
      children: [
        { id: 'CHD-00125', name: 'Tayo Adeleke', age: 7, progress: 62, plan: 'Freemium' },
      ],
      registered: '15 Jan 2025',
      status: 'Active',
    },
    {
      id: 'PRT-00125',
      name: 'Chioma Okonkwo',
      email: 'chioma@domain.com',
      phone: '+234 803 7788',
      plan: 'Premium',
      children: [
        { id: 'CHD-00126', name: 'Chinedu Okonkwo', age: 9, progress: 85, plan: 'Premium' },
      ],
      registered: '18 Jan 2025',
      status: 'Active',
    },
  ];

  const filteredParents = parentsList.filter((parent) => {
    const matchesSearch =
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.children.some((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPlan =
      filterPlan === 'all' || parent.plan.toLowerCase() === filterPlan;

    return matchesSearch && matchesPlan;
  });

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Top Welcome & KPI Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Admin Management Console
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time directory for parent accounts, child progress monitoring, and premium plan oversight.
            </p>
          </div>

          {/* Quick Design Previews Pill Group */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs self-start">
            <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wider">
              Quick Views:
            </span>
            <Link
              to="/admin/parents/PRT-00123"
              className="px-3 py-1.5 rounded-xl bg-[#FAF6F0] text-[#9E3508] font-bold text-xs hover:bg-[#F3ECE4] transition-colors"
            >
              Sarah (Parent)
            </Link>
            <Link
              to="/admin/children/CHD-00123"
              className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 font-bold text-xs hover:bg-amber-100 transition-colors"
            >
              Emma (Child)
            </Link>
            <Link
              to="/admin/children/CHD-00124"
              className="px-3 py-1.5 rounded-xl bg-orange-50 text-orange-800 font-bold text-xs hover:bg-orange-100 transition-colors"
            >
              Liam (Freemium)
            </Link>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Total Enrolled Children
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">128</span>
              <span className="text-xs font-semibold text-emerald-600">+12%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Active learners across Nigeria</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Registered Parents
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">84</span>
              <span className="text-xs font-semibold text-emerald-600">+8%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Verified phone & email profiles</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Premium Subscriptions
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#9E3508]">64%</span>
              <span className="text-xs font-semibold text-emerald-600">High</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">54 active premium families</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Avg. Challenge Completion
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">76%</span>
              <span className="text-xs font-semibold text-emerald-600">+5%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Consistent 5-skill growth</span>
          </div>
        </div>
      </div>

      {/* Directory Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Parent &amp; Child Directory</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any profile to view full admin diagnostics, activity records, and plan management.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search parent or child..."
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E3508] w-48 sm:w-64"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilterPlan('all')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterPlan === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterPlan('premium')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterPlan === 'premium' ? 'bg-white text-[#7C3AED] shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Premium
              </button>
              <button
                onClick={() => setFilterPlan('freemium')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterPlan === 'freemium' ? 'bg-white text-[#C2410C] shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Freemium
              </button>
            </div>
          </div>
        </div>

        {/* Directory Cards List */}
        <div className="divide-y divide-slate-100">
          {filteredParents.map((parent) => (
            <div key={parent.id} className="py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Parent Info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F6DDD2] flex items-center justify-center shrink-0 text-[#8E4624] font-bold text-base shadow-2xs">
                  {parent.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2.5">
                    <Link
                      to={`/admin/parents/${parent.id}`}
                      className="text-base font-bold text-slate-900 hover:text-[#9E3508] transition-colors"
                    >
                      {parent.name}
                    </Link>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        parent.plan === 'Premium'
                          ? 'bg-[#EDE9FE] text-[#7C3AED]'
                          : 'bg-[#FFEDD5] text-[#C2410C]'
                      }`}
                    >
                      {parent.plan}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ID: {parent.id} • {parent.email} • {parent.phone}
                  </p>
                </div>
              </div>

              {/* Linked Children Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-medium mr-1">Children:</span>
                {parent.children.map((child) => (
                  <Link
                    key={child.id}
                    to={`/admin/children/${child.id}`}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all group ${
                      child.plan === 'Premium'
                        ? 'bg-amber-50/60 border-amber-200 text-amber-900 hover:bg-amber-100'
                        : 'bg-orange-50/60 border-orange-200 text-orange-900 hover:bg-orange-100'
                    }`}
                  >
                    <span>{child.name} ({child.age}y)</span>
                    <span className="text-[10px] font-bold opacity-75">
                      {child.progress}%
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3">
                <Link
                  to={`/admin/parents/${parent.id}`}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Upgrade Modal Component */}
      {modalChild && (
        <PremiumUpgradeModal
          isOpen={!!modalChild}
          onClose={() => setModalChild(null)}
          childName={modalChild}
        />
      )}
    </div>
  );
};
