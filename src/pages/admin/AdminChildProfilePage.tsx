import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Clock,
  FileText,
  Star,
} from 'lucide-react';

export const AdminChildProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'challenges' | 'skills' | 'leaderboard'>('overview');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

  const skillsData = [
    { name: 'Communication', percent: 80, color: '#2563EB' },
    { name: 'Confidence', percent: 70, color: '#0284C7' },
    { name: 'Leadership', percent: 45, color: '#EA580C' },
    { name: 'Problem Solving', percent: 75, color: '#7C3AED' },
    { name: 'Financial Literacy', percent: 50, color: '#0D9488' },
  ];

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Side: Avatar + Details */}
        <div className="flex items-center gap-5">
          {/* Avatar with Child Silhouette */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FEF3C7] border-2 border-white shadow-xs flex items-center justify-center shrink-0 overflow-hidden relative">
            <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Silhouette of Emma */}
              <circle cx="40" cy="30" r="14" fill="#334155" />
              {/* Body */}
              <path d="M20 74 C20 54, 28 48, 40 48 C52 48, 60 54, 60 74 Z" fill="#334155" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Emma Johnson
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Active
              </span>
            </div>

            <div className="mt-2 text-xs text-slate-500 font-medium space-y-1">
              <p>
                Child ID: <span className="font-semibold text-slate-700">CHD-00123</span> • Age: <span className="font-semibold text-slate-700">8 years</span>
              </p>
              <p>
                Parent/Guardian: <Link to="/admin/parents/PRT-00123" className="font-semibold text-slate-800 hover:text-[#9E3508] underline decoration-slate-300">Sarah Johnson</Link>
              </p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span>Parent Plan:</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-[11px]">
                  <Star className="w-3 h-3 fill-[#B45309]" />
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Actions Card */}
        <div className="w-full sm:w-auto bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 min-w-[220px] shadow-2xs">
          <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2.5">
            QUICK ACTIONS
          </h4>

          <div className="space-y-2">
            <button
              onClick={() => setMessageOpen(true)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Message Parent</span>
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>View Activity Log</span>
            </button>

            <button
              onClick={() => {
                setReportGenerated(true);
                setTimeout(() => setReportGenerated(false), 3000);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>{reportGenerated ? 'Report Ready!' : 'Generate Report'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="border-b border-slate-200 flex items-center gap-8 px-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Overview</span>
          {activeTab === 'overview' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer ${
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
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer ${
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
          onClick={() => setActiveTab('skills')}
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer ${
            activeTab === 'skills'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Life Skills</span>
          {activeTab === 'skills' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Leaderboard</span>
          {activeTab === 'leaderboard' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>
      </div>

      {/* Main 3-Column Content Layout (Overview Tab) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Column 1: Basic Information */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-4">
                <h3 className="text-sm font-bold text-slate-900">Basic Information</h3>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Child Name</span>
                  <span className="font-bold text-slate-900">Emma Johnson</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Child ID</span>
                  <span className="font-bold text-slate-800">CHD-00123</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Age</span>
                  <span className="font-bold text-slate-800">8 years</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Parent/Guardian</span>
                  <span className="font-bold text-slate-800">Sarah Johnson</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Parent Plan</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-[11px]">
                    Premium
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Registration Date</span>
                  <span className="font-bold text-slate-800">12 Jan 2025</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Last Active</span>
                  <span className="font-bold text-slate-800">2 hours ago</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Account Status</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] font-bold text-[11px]">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Activity Summary (2x3 Grid) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4">Activity Summary</h3>

              <div className="grid grid-cols-2 gap-3">
                {/* 1. Logins */}
                <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 flex flex-col">
                  <span className="text-[11px] font-medium text-slate-400 mb-1">Logins</span>
                  <span className="text-2xl font-black text-slate-900">18</span>
                </div>

                {/* 2. Activities Completed */}
                <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 flex flex-col">
                  <span className="text-[11px] font-medium text-slate-400 mb-1">Activities Completed</span>
                  <span className="text-2xl font-black text-slate-900">24</span>
                </div>

                {/* 3. Challenges Started */}
                <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 flex flex-col">
                  <span className="text-[11px] font-medium text-slate-400 mb-1">Challenges Started</span>
                  <span className="text-2xl font-black text-slate-900">10</span>
                </div>

                {/* 4. Challenges Completed */}
                <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 flex flex-col">
                  <span className="text-[11px] font-medium text-slate-400 mb-1">Challenges Completed</span>
                  <span className="text-2xl font-black text-slate-900">8</span>
                </div>

                {/* 5. Points Earned */}
                <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 flex flex-col">
                  <span className="text-[11px] font-medium text-slate-400 mb-1">Points Earned</span>
                  <span className="text-2xl font-black text-slate-900">1,250</span>
                </div>

                {/* 6. Current Leaderboard Position (Highlighted Golden Card) */}
                <div className="p-4 rounded-2xl bg-[#FEFCE8] border border-[#FEF08A] flex flex-col justify-between">
                  <span className="text-[11px] font-bold text-[#854D0E] mb-1">Current Leaderboard Position</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black text-[#A16207]">5th</span>
                    <span className="text-sm">🔔</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Life Skill Progress */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-5">Life Skill Progress</h3>

              <div className="space-y-4">
                {skillsData.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-700">{skill.name}</span>
                      <span className="text-slate-900 font-bold">{skill.percent}%</span>
                    </div>
                    {/* Progress track & bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.percent}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Activity */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Detailed Child Logs</h3>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-800">Oral Presentation Challenge Finished</p>
              <p className="text-slate-400">Communication & Confidence module</p>
            </div>
            <span className="text-slate-400">2 hours ago</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-800">Piggy Bank Savings Goal Created</p>
              <p className="text-slate-400">Financial Literacy module</p>
            </div>
            <span className="text-slate-400">Yesterday</span>
          </div>
        </div>
      )}

      {/* Tab: Challenges */}
      {activeTab === 'challenges' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Emma&apos;s Challenge Library</h3>
          <p className="text-xs text-slate-500 mb-4">8 completed of 10 enrolled challenges.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs">
              <span className="font-bold text-emerald-800 block">Speaking with Clarity</span>
              <span className="text-emerald-600">Completed with 5-star parent rating</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs">
              <span className="font-bold text-amber-800 block">Budgeting Pocket Money</span>
              <span className="text-amber-600">In Progress (Step 2 of 3)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Life Skills */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Competency Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {skillsData.map((s) => (
              <div key={s.name} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-800 block">{s.name}</span>
                <span className="text-xl font-black mt-1 block" style={{ color: s.color }}>
                  {s.percent}%
                </span>
                <span className="text-[10px] text-slate-400">Mastery level: Advanced</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Leaderboard Standing</h3>
          <p className="text-xs text-slate-500 mb-4">
            Emma is currently ranked <strong>5th</strong> among all active platform explorers with <strong>1,250 points</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            Next Milestone: 1,300 points unlocks the &ldquo;Master of 5 Skills&rdquo; badge.
          </div>
        </div>
      )}

      {/* Simulated Message Parent Modal */}
      {messageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-100">
            <h4 className="text-base font-bold text-slate-900 mb-1">Message Sarah Johnson</h4>
            <p className="text-xs text-slate-500 mb-4">
              Send an admin message or notification regarding Emma&apos;s learning progress.
            </p>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9E3508]"
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => setMessageOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Message dispatched to parent successfully!');
                  setMessageOpen(false);
                  setMessageText('');
                }}
                className="px-4 py-2 rounded-xl bg-[#9E3508] text-white text-xs font-bold hover:bg-[#852C06]"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
