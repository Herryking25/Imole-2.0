import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, User, ShieldCheck, Mail, Phone, Calendar, Clock } from 'lucide-react';

export const AdminParentProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'activity' | 'challenges' | 'children'>('info');

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Side: Avatar + Details */}
        <div className="flex items-center gap-5">
          {/* Avatar with Silhouette */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F6DDD2] border-2 border-white shadow-xs flex items-center justify-center shrink-0 overflow-hidden relative">
            <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Silhouette of Sarah */}
              <circle cx="40" cy="30" r="16" fill="#8E4624" />
              {/* Hair / bun */}
              <circle cx="40" cy="20" r="14" fill="#3D1D0F" />
              <ellipse cx="40" cy="28" rx="17" ry="12" fill="#3D1D0F" />
              {/* Body */}
              <path d="M16 75 C16 52, 28 45, 40 45 C52 45, 64 52, 64 75 Z" fill="#8E4624" />
              <path d="M22 80 C22 58, 30 52, 40 52 C50 52, 58 58, 58 80 Z" fill="#A8572E" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Sarah Johnson
              </h2>
              <span className="px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-bold">
                Premium
              </span>
            </div>

            <div className="mt-2 text-xs text-slate-500 font-medium space-y-1">
              <p>
                Parent ID: <span className="font-semibold text-slate-700">PRT-00123</span>
              </p>
              <p>
                Email: <span className="font-semibold text-slate-700">sarah@domain.com</span> • Phone: <span className="font-semibold text-slate-700">+234 567 8901</span>
              </p>
              <p>
                Registered: <span className="font-semibold text-slate-700">12 Jan 2025</span> • Last Login: <span className="font-semibold text-slate-700">2 hours ago</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Subscription Details */}
        <div className="w-full sm:w-auto bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 min-w-[260px] shadow-2xs">
          <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3">
            SUBSCRIPTION DETAILS
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Plan:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] font-bold text-[11px]">
                Premium
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] font-bold text-[11px]">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
              <span className="text-slate-500">Renewal Date:</span>
              <span className="font-bold text-slate-800">12 Jan 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="border-b border-slate-200 flex items-center gap-8 px-2">
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
            activeTab === 'info'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Parent Information</span>
          {activeTab === 'info' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
            activeTab === 'activity'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Activity</span>
          {activeTab === 'activity' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('challenges')}
          className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
            activeTab === 'challenges'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Challenges</span>
          {activeTab === 'challenges' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('children')}
          className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
            activeTab === 'children'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Linked Child(ren)</span>
          {activeTab === 'children' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'info' ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Left: Parent Information Table (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Name</span>
                <span className="font-bold text-slate-900">Sarah Johnson</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Parent ID</span>
                <span className="font-bold text-slate-800">PRT-00123</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Email</span>
                <span className="font-bold text-slate-800">sarah@domain.com</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Phone</span>
                <span className="font-bold text-slate-800">+234 567 8901</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Registration Date</span>
                <span className="font-bold text-slate-800">12 Jan 2025</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Subscription Type</span>
                <span className="px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] font-bold text-xs">
                  Premium
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Subscription Status</span>
                <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] font-bold text-xs">
                  Active
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Last Login</span>
                <span className="font-bold text-slate-800">2 hours ago</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Account Status</span>
                <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] font-bold text-xs">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Right: Linked Children Card (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Linked Children (2)</h3>
              <Link to="/admin/children/CHD-00123" className="text-xs font-bold text-[#9E3508] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {/* Child 1: Emma Johnson */}
              <Link
                to="/admin/children/CHD-00123"
                className="p-4 rounded-2xl bg-[#F9FAFB] hover:bg-[#F3ECE4]/40 border border-slate-100 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                      <circle cx="20" cy="15" r="8" fill="#C2410C" />
                      <path d="M8 36 C8 24, 14 22, 20 22 C26 22, 32 24, 32 36 Z" fill="#EA580C" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm group-hover:text-[#9E3508] transition-colors">
                      <span>Emma Johnson</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#9E3508]" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      CHD-00123 • Age 8 • Progress: <span className="font-bold text-slate-600">78%</span>
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full border border-emerald-300 text-emerald-700 text-[11px] font-bold bg-emerald-50">
                  Active
                </span>
              </Link>

              {/* Child 2: Liam Johnson */}
              <Link
                to="/admin/children/CHD-00124"
                className="p-4 rounded-2xl bg-[#F9FAFB] hover:bg-[#F3ECE4]/40 border border-slate-100 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                      <circle cx="20" cy="15" r="8" fill="#1D4ED8" />
                      <path d="M8 36 C8 24, 14 22, 20 22 C26 22, 32 24, 32 36 Z" fill="#2563EB" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm group-hover:text-[#9E3508] transition-colors">
                      <span>Liam Johnson</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#9E3508]" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      CHD-00124 • Age 6 • Progress: <span className="font-bold text-slate-600">56%</span>
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full border border-emerald-300 text-emerald-700 text-[11px] font-bold bg-emerald-50">
                  Active
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : activeTab === 'activity' ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">Parent Activity Log</h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">Logged into Parent Dashboard</span>
                <p className="text-slate-400">Authenticated via PIN from Lagos, Nigeria</p>
              </div>
              <span className="text-slate-400">2 hours ago</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">Approved Emma&apos;s Challenge Submission</span>
                <p className="text-slate-400">Oral presentation challenge verified</p>
              </div>
              <span className="text-slate-400">Yesterday</span>
            </div>
          </div>
        </div>
      ) : activeTab === 'challenges' ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">Assigned Challenges</h3>
          <p className="text-xs text-slate-500">
            Overview of weekly missions assigned to children under Sarah Johnson.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">All Linked Children</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/admin/children/CHD-00123"
              className="p-5 rounded-2xl border border-slate-200 hover:border-[#9E3508] transition-all bg-[#FDFBF7]"
            >
              <h4 className="font-bold text-slate-900">Emma Johnson (Age 8)</h4>
              <p className="text-xs text-slate-500 mt-1">Level 2 Leader • 1,250 points</p>
            </Link>
            <Link
              to="/admin/children/CHD-00124"
              className="p-5 rounded-2xl border border-slate-200 hover:border-[#9E3508] transition-all bg-[#FDFBF7]"
            >
              <h4 className="font-bold text-slate-900">Liam Johnson (Age 6)</h4>
              <p className="text-xs text-slate-500 mt-1">Level 1 Explorer • 750 points</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
