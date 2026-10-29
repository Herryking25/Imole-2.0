import React, { useState } from 'react';
import {
  Star,
  Zap,
  ArrowRight,
  CheckCircle2,
  Play,
  BookOpen,
  User,
  Clock,
  Lock,
} from 'lucide-react';
import { PremiumUpgradeModal } from '../../components/admin/PremiumUpgradeModal';

export const AdminChildFreemiumPage: React.FC = () => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Top Banner: Freemium Upgrade Invitation */}
      <div className="bg-gradient-to-r from-[#FFF1E6] via-[#FFEADB] to-[#FFE3D0] rounded-3xl p-6 sm:p-8 border border-[#FED7AA] shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        {/* Banner Left Info */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFEDD5]/80 text-[#C2410C] text-[11px] font-black uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-[#C2410C]" />
            <span>PREMIUM PLAN AVAILABLE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Track your child&apos;s journey with clarity
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            You&apos;re on the <span className="font-bold text-slate-800">Freemium</span> plan. Get basic insights and unlock detailed life-skills analysis, personalized AI recommendations, and rich reports with Premium.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-5">
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#9E3508] hover:bg-[#852C06] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Upgrade to Premium</span>
            </button>

            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="text-xs sm:text-sm font-bold text-[#9E3508] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Compare Plan Features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Banner Right Floating Card: Basic Mode */}
        <div className="w-full sm:w-auto bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-orange-100 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#EA580C] text-white font-black flex items-center justify-center text-base shadow-xs shrink-0">
            LJ
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black text-[#EA580C] uppercase tracking-wider mb-0.5">
              <Zap className="w-3 h-3 fill-[#EA580C]" />
              <span>BASIC MODE</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Liam Johnson</h3>
            <p className="text-xs text-slate-400 font-medium">Age: 6 • Level 1 Explorer</p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Basic Child Information */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Basic Child Information</h3>
                <p className="text-xs text-slate-400 mt-0.5">General registration details for this profile</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Active Profile
              </span>
            </div>

            {/* 4 Info Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 block mb-1">Child ID</span>
                <span className="text-sm font-bold text-slate-800">CHD-00124</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 block mb-1">Full Name</span>
                <span className="text-sm font-bold text-slate-800">Liam Johnson</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 block mb-1">Plan</span>
                <span className="text-sm font-bold text-[#C2410C]">Freemium</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 block mb-1">Registered On</span>
                <span className="text-sm font-bold text-slate-800">10 Jan 2025</span>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Activity */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
              <span className="text-xs text-slate-400">Showing last 3 logs</span>
            </div>
            <p className="text-xs text-slate-400 mb-5">Basic milestones and actions recorded recently</p>

            <div className="space-y-3">
              {/* Activity Item 1 */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Completed a challenge</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Empathy & Listening Fundamentals Module</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium shrink-0">2 hours ago</span>
              </div>

              {/* Activity Item 2 */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center shrink-0">
                    <Play className="w-4 h-4 fill-[#EA580C]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Started a new activity</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Daily Reflection: Teamwork Basics</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium shrink-0">5 hours ago</span>
              </div>

              {/* Activity Item 3 */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Viewed a life skill card</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Financial Literacy: Saving & Spending</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium shrink-0">1 day ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 col wide) */}
        <div className="space-y-6">
          {/* Card: QUICK VIEW */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
              QUICK VIEW
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Child Age</span>
                </div>
                <span className="text-xs font-bold text-slate-900">6 years</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Last Active</span>
                </div>
                <span className="text-xs font-bold text-slate-900">1 day ago</span>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
                  <span>Overall Progress</span>
                  <span className="font-black text-[#9E3508]">56%</span>
                </div>
                {/* Terracotta progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#9E3508] rounded-full" style={{ width: '56%' }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-snug">
                  Calculated from completed introductory milestones.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Limited Access (Dashed orange border) */}
          <div className="bg-[#FFFBF5] rounded-3xl border-2 border-dashed border-[#FED7AA] p-6 shadow-xs text-left">
            <div className="flex items-center gap-2 text-[#9E3508] font-black text-sm mb-2">
              <div className="w-6 h-6 rounded-lg bg-[#FFEDD5] text-[#9E3508] flex items-center justify-center">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-slate-900 font-bold text-sm">Limited Access</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Upgrade to Premium to unlock deeper learning metrics for Liam:
            </p>

            <div className="space-y-2 mb-5">
              <div className="px-3.5 py-2.5 rounded-xl bg-white border border-orange-100/80 flex items-center gap-2.5 text-xs text-slate-700 font-medium shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Detailed progress tracking</span>
              </div>

              <div className="px-3.5 py-2.5 rounded-xl bg-white border border-orange-100/80 flex items-center gap-2.5 text-xs text-slate-700 font-medium shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Life-skill insights</span>
              </div>

              <div className="px-3.5 py-2.5 rounded-xl bg-white border border-orange-100/80 flex items-center gap-2.5 text-xs text-slate-700 font-medium shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Personalised recommendations</span>
              </div>
            </div>

            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-[#9E3508] hover:bg-[#852C06] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Premium Upgrade Modal */}
      <PremiumUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        childName="Liam"
        onUpgrade={() => {
          alert('Liam Johnson upgraded to Premium successfully!');
        }}
      />
    </div>
  );
};
