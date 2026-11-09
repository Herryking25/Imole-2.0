import React, { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Search,
  ChevronDown,
  Award,
  Lock,
  ArrowRight,
  FileText,
  LogIn,
  Users,
  Shield,
  Smartphone,
  Laptop,
  Download,
  AlertCircle,
  ExternalLink,
  Receipt,
  Flag,
  Trophy,
  X,
} from 'lucide-react';
import { PremiumUpgradeModal } from '../../components/admin/PremiumUpgradeModal';

type Tab = 'info' | 'activity' | 'challenges';
type PlanType = 'Freemium' | 'Premium';

export const AdminParentProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { parentId } = useParams<{ parentId: string }>();
  const [searchParams] = useSearchParams();

  // Determine initial plan:
  // PRT-00124 defaults to Freemium; PRT-00123 defaults to Premium
  const initialPlan: PlanType = (() => {
    const urlPlan = searchParams.get('plan')?.toLowerCase();
    if (urlPlan === 'freemium') return 'Freemium';
    if (urlPlan === 'premium') return 'Premium';
    if (parentId === 'PRT-00124' || parentId === 'PRT-00126') return 'Freemium';
    if (parentId === 'PRT-00123') return 'Premium';
    // Default to Freemium to immediately surface the newly uploaded design
    return 'Freemium';
  })();

  const [activePlan, setActivePlan] = useState<PlanType>(initialPlan);
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Filters for Activity tab
  const [activitySearch, setActivitySearch] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('All Events');
  const [dateRangeFilter, setDateRangeFilter] = useState('Last 30 Days');

  // Filters for Challenges tab
  const [challengeSearch, setChallengeSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('All Skills');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedChildFocus, setSelectedChildFocus] = useState('Liam Smith (Grade 1 - Basic)');

  // Challenge modal viewer
  const [activeChallengeModal, setActiveChallengeModal] = useState<{
    title: string;
    scoreText: string;
    description: string;
  } | null>(null);

  const [certificateNotice, setCertificateNotice] = useState<string | null>(null);

  const isFreemium = activePlan === 'Freemium';

  // Parent profile attributes based on plan
  const parentName = isFreemium ? 'James Smith' : 'Sarah Johnson';
  const displayParentId = isFreemium ? (parentId || 'PRT-00124') : (parentId || 'PRT-00123');
  const parentEmail = isFreemium ? 'jamessmith@domain.com' : 'sarah@domain.com';

  const handleDownloadCertificate = (certName: string) => {
    setCertificateNotice(`Downloaded ${certName} certificate PDF.`);
    setTimeout(() => setCertificateNotice(null), 3000);
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans select-none pb-16">
      {/* Top Header / Breadcrumb & Profile Type Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="flex items-center gap-1.5 hover:text-[#B83806] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Back to Parents</span>
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-slate-800 font-bold">Parent Profile</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium">({activePlan})</span>
        </div>

        {/* Profile Switcher: Toggle between Freemium and Premium parent designs */}
        <div className="inline-flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActivePlan('Freemium')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isFreemium
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Freemium Parent</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlan('Premium')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              !isFreemium
                ? 'bg-gradient-to-r from-[#9E3508] to-[#C2410C] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${!isFreemium ? 'fill-white text-white' : 'text-slate-400'}`} />
            <span>Premium Parent</span>
          </button>
        </div>
      </div>

      {/* Parent Header Card */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar with Silhouette */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#FCE7DC] border-2 border-white shadow-xs flex items-center justify-center shrink-0 overflow-hidden relative">
            <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="30" r="15" fill="#8E4624" />
              <path d="M18 74 C18 52, 28 46, 40 46 C52 46, 62 52, 62 74 Z" fill="#8E4624" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {parentName}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isFreemium
                  ? 'bg-[#F3E8FF] text-[#7E22CE] border border-purple-200'
                  : 'bg-[#FEF3C7] text-[#B45309] border border-amber-200'
              }`}>
                {activePlan}
              </span>
            </div>

            <div className="mt-2 text-xs text-slate-500 font-medium space-y-1">
              <p>
                Parent ID: <span className="font-semibold text-slate-700">{displayParentId}</span>
              </p>
              <p>
                Email: <span className="font-semibold text-slate-700">{parentEmail}</span>
              </p>
              <p>
                Registered: <span className="font-semibold text-slate-700">12 Jan 2025</span> • Last Login: <span className="font-semibold text-slate-700">2 hours ago</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Subscription Details Card */}
        <div className="w-full sm:w-auto bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 min-w-[240px] shadow-2xs">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2.5">
            SUBSCRIPTION DETAILS
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Plan:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                isFreemium
                  ? 'bg-[#F3E8FF] text-[#7E22CE]'
                  : 'bg-[#EDE9FE] text-[#7C3AED]'
              }`}>
                {activePlan}
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
      <div className="border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold text-slate-500">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`pb-3.5 transition-colors cursor-pointer ${
              activeTab === 'info'
                ? 'text-[#B83806] border-b-2 border-[#B83806]'
                : 'hover:text-slate-800'
            }`}
          >
            Parent Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`pb-3.5 transition-colors cursor-pointer ${
              activeTab === 'activity'
                ? 'text-[#B83806] border-b-2 border-[#B83806]'
                : 'hover:text-slate-800'
            }`}
          >
            Activity
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('challenges')}
            className={`pb-3.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'challenges'
                ? 'text-[#B83806] border-b-2 border-[#B83806]'
                : 'hover:text-slate-800'
            }`}
          >
            <span>Challenges</span>
            <span className="px-1.5 py-0.2 rounded-full bg-orange-100 text-[#B83806] text-[10px]">
              {isFreemium ? '4' : '12'}
            </span>
          </button>
        </div>

        {/* Tab-contextual selector */}
        {activeTab === 'challenges' ? (
          <div className="flex items-center gap-2 pb-2 sm:pb-3.5 text-xs">
            <span className="text-slate-500 font-medium">Showing Focus for:</span>
            <div className="relative">
              <select
                value={selectedChildFocus}
                onChange={(e) => setSelectedChildFocus(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-bold text-slate-800 outline-none cursor-pointer shadow-2xs"
              >
                <option value="Liam Smith (Grade 1 - Basic)">Liam Smith (Grade 1 - Basic)</option>
                <option value="Maya Smith (Locked Sibling)">Maya Smith (Locked Sibling)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        ) : (
          <span className="text-slate-400 font-medium text-xs hidden sm:block pb-3.5">
            Linked Child(ren)
          </span>
        )}
      </div>

      {/* ── TAB 1: PARENT INFORMATION (Image 1) ── */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Left Table (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs">
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Name:</span>
                <span className="font-bold text-slate-900">{parentName}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Parent ID:</span>
                <span className="font-semibold text-slate-800">{displayParentId}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Email:</span>
                <span className="font-semibold text-slate-800">{parentEmail}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Registration Date:</span>
                <span className="font-semibold text-slate-800">12 Jan 2025</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Subscription Type:</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                  isFreemium
                    ? 'bg-[#F3E8FF] text-[#7E22CE]'
                    : 'bg-[#EDE9FE] text-[#7C3AED]'
                }`}>
                  {activePlan}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Subscription Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                  Active
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Last Login:</span>
                <span className="font-semibold text-slate-800">2 hours ago</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Account Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Right: Linked Children Card (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">
                Linked Children ({isFreemium ? '1' : '2'})
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFEEDD] text-[#C2410C] text-[11px] font-bold">
                {isFreemium ? '1 of 1 Children Linked' : '2 of 2 Children Linked'}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-5">
              {isFreemium
                ? 'Freemium plan allows only 1 child.'
                : 'Premium plan allows up to 4 children with family sharing.'}
            </p>

            <div className="space-y-3">
              {/* Linked Child: Liam Johnson / Liam Smith */}
              <Link
                to="/admin/children/CHD-00124"
                className="p-4 rounded-2xl bg-[#F9FAFB] hover:bg-orange-50/40 border border-slate-200/80 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DBEAFE] text-blue-600 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm group-hover:text-[#B83806] transition-colors">
                      <span>{isFreemium ? 'Liam Johnson' : 'Emma Johnson'}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#B83806]" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      CHD-00124 • Age 6 • Progress: <span className="font-bold text-slate-700">56%</span>
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-emerald-700 text-[11px] font-bold bg-emerald-50 border border-emerald-200">
                  Active
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ACTIVITY (Image 2) ── */}
      {activeTab === 'activity' && (
        <div className="flex flex-col gap-6">
          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Card 1: TOTAL PARENT LOGINS */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  TOTAL PARENT LOGINS
                </span>
                <LogIn className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">48</span>
                <span className="text-xs text-slate-500 font-medium">sessions</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">📈 Avg. 3.2 sessions/week</p>
            </div>

            {/* Card 2: PLAN STATUS */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  PLAN STATUS
                </span>
                <Shield className="w-3.5 h-3.5 text-teal-600 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">Active</span>
                <span className="px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold">
                  {activePlan}
                </span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Annual Plan Verified</p>
            </div>

            {/* Card 3: INVOICES PAID */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  INVOICES PAID
                </span>
                <Receipt className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">2</span>
                <span className="text-xs text-slate-500 font-medium">invoices</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Latest ref: #INV-88412</p>
            </div>

            {/* Card 4: CHILDREN MANAGED */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  CHILDREN MANAGED
                </span>
                <Users className="w-3.5 h-3.5 text-[#EA580C] stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">1</span>
                <span className="text-xs text-slate-500 font-medium">of 1 slots used</span>
              </div>
              <p className="text-[11px] text-amber-700 font-bold mt-1">⚠️ 0 available slot left</p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={activitySearch}
                onChange={(e) => setActivitySearch(e.target.value)}
                placeholder="Search parent activity..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806] font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select
                  value={eventTypeFilter}
                  onChange={(e) => setEventTypeFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="All Events">Event Type: All Events</option>
                  <option value="Upsell / Browsing">Upsell / Browsing</option>
                  <option value="Plan Limit">Plan Limit</option>
                  <option value="Downloads">Downloads</option>
                  <option value="Communication">Communication</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={dateRangeFilter}
                  onChange={(e) => setDateRangeFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Last 30 Days">Date Range: Last 30 Days</option>
                  <option value="Last 7 Days">Date Range: Last 7 Days</option>
                  <option value="Last 90 Days">Date Range: Last 90 Days</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button
                type="button"
                onClick={() => handleDownloadCertificate('Activity_Log')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Log</span>
              </button>
            </div>
          </div>

          {/* Two Columns Layout: Activity Log (Left) & Insights/Device (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Column (2 Cols): Activity Log */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Activity Log
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  Showing 5 events recorded
                </span>
              </div>

              <div className="space-y-6">
                {/* Section 1: TODAY */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                    TODAY
                  </span>
                  <div className="p-4 rounded-2xl bg-[#FFFBF8] border border-orange-100/80 flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            Pricing &amp; Upgrade Page Viewed
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#B45309] text-[10px] font-bold">
                            Upsell / Browsing
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">11:20 AM</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Parent browsed Premium Tier features and child focus area comparisons. Stayed on page for 2m 44s.
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium mt-2 flex items-center gap-1.5">
                        <Laptop className="w-3.5 h-3.5" />
                        <span>Chrome 124 (Desktop) • Target: /plans/family-premium</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: YESTERDAY */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                    YESTERDAY
                  </span>
                  <div className="p-4 rounded-2xl bg-[#FFF9F9] border border-rose-100 flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            Attempted Premium Feature Access
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold">
                            Plan Limit Reached
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">03:40 PM</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Tried to set custom Life-Skill Focus Area for Liam Smith. Modal banner served: Upgrade to unlock Multi-Skill Customization.
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-[10px] font-bold">
                        <span className="text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-md">
                          ERR_TIER_PAYWALL
                        </span>
                        <span className="text-slate-400 font-medium">Prompt ID: #MOD-7721</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: 12 MAY 2025 */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                    12 MAY 2025
                  </span>
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            Downloaded Standard Milestone Summary
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold">
                            Downloads
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">09:15 AM</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Downloaded free basic quarterly summary PDF for Liam Smith (Standard format with community benchmark watermark).
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#B83806] cursor-pointer">
                        <FileText className="w-3.5 h-3.5 text-[#B83806]" />
                        <span>Liam_Smith_Q1_Standard_Summary.pdf (1.2 MB)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: 24 APR 2025 */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                    24 APR 2025
                  </span>
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            Direct Admin Communication
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold">
                            Communication
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">02:10 PM</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Parent requested information regarding family discount for enrolling a second child (sibling Maya Smith, age 4).
                      </p>
                      <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-800 font-medium">
                        <span className="font-bold">Assigned:</span> Moderator (Rachel C.) •{' '}
                        <span className="font-bold text-emerald-900">Resolution:</span> Sibling Voucher #SIB-15 Sent
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: 10 JAN 2025 */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                    10 JAN 2025
                  </span>
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            Freemium Account Registration
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold">
                            Account / Onboarding
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">10:00 AM</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Created account and enrolled Liam Smith under standard free plan via referral link.
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium mt-1">
                        Ref Source: Organic Web Campaign #SPRING25
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Activity Insights & Device */}
            <div className="space-y-6">
              {/* Activity Insights Heatmap Card */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Activity Insights
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400">LAST 4 WEEKS</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Weekly login intensity &amp; validation interactions.
                </p>

                {/* Heatmap Grid */}
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-slate-400">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>

                  {/* 4 Rows */}
                  {[
                    ['#FFF0EB', '#FFE2D7', '#EA580C', '#FFF0EB', '#FFE2D7', '#FFF0EB', '#FFF0EB'],
                    ['#FFE2D7', '#FFF0EB', '#FFE2D7', '#EA580C', '#FFF0EB', '#FFE2D7', '#FFF0EB'],
                    ['#FFF0EB', '#FFE2D7', '#FFF0EB', '#FFF0EB', '#FFE2D7', '#FFF0EB', '#FFE2D7'],
                    ['#C2410C', '#EA580C', '#FFE2D7', '#FFF0EB', '#FFE2D7', '#FFF0EB', '#FFF0EB'],
                  ].map((row, rIdx) => (
                    <div key={rIdx} className="grid grid-cols-7 gap-1.5">
                      {row.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          style={{ backgroundColor: color }}
                          className="h-6 rounded-md transition-transform hover:scale-110 cursor-pointer"
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-3 mt-2 border-t border-slate-100">
                  <span>Less active</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#FFF0EB]" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#FFE2D7]" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#EA580C]" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#C2410C]" />
                  </div>
                  <span>Highly active</span>
                </div>
              </div>

              {/* Device & Security Card */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Device &amp; Security
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                    🛡️ Standard Auth
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-slate-500 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Samsung Galaxy S23</h5>
                      <p className="text-[11px] text-slate-400">Android 14 • Primary Mobile</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-slate-500 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Chrome Desktop</h5>
                      <p className="text-[11px] text-slate-400">Windows 11 • Web</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: CHALLENGES (Image 3) ── */}
      {activeTab === 'challenges' && (
        <div className="flex flex-col gap-6">
          {/* 4 Top KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Card 1: TOTAL CHALLENGES ACCESSIBLE */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  TOTAL CHALLENGES ACCESSIBLE
                </span>
                <Flag className="w-3.5 h-3.5 text-amber-600 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">4</span>
                <span className="text-xs text-slate-500 font-medium">Accessible</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">4 of 24 Unlocked • Free Tier Quota</p>
            </div>

            {/* Card 2: KIDS COMPLETION RATE */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  KIDS COMPLETION RATE
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">50.0%</span>
                <span className="text-xs font-bold text-emerald-600">2 of 4 completed</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>

            {/* Card 3: PARENT FOCUS BOOST */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  PARENT FOCUS BOOST
                </span>
                <Lock className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">Locked</span>
                <span className="text-xs text-slate-500 font-medium">(0 Active)</span>
              </div>
              <p className="text-[11px] text-amber-700 font-bold mt-1">✨ Requires Premium plan (1.5x boost)</p>
            </div>

            {/* Card 4: TOTAL XP EARNED */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  TOTAL XP EARNED
                </span>
                <Trophy className="w-3.5 h-3.5 text-amber-500 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">380 XP</span>
                <span className="text-xs text-slate-500 font-medium">Standard Rate</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Liam: 380 XP • Multipliers locked</p>
            </div>
          </div>

          {/* Freemium Tier Notice Banner */}
          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#C2410C] shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Freemium Tier: 2 of 4 monthly free challenges completed.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsUpgradeModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#7C2D12] hover:bg-[#63240E] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
            >
              <span>Upgrade Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Certificate Download Feedback */}
          {certificateNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center justify-between animate-in fade-in">
              <span>{certificateNotice}</span>
              <button type="button" onClick={() => setCertificateNotice(null)} className="cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={challengeSearch}
                onChange={(e) => setChallengeSearch(e.target.value)}
                placeholder="Search challenges by title, skill..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806] font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="All Skills">Life Skill: All Skills</option>
                  <option value="Confidence">Confidence</option>
                  <option value="Problem Solving">Problem Solving</option>
                  <option value="Financial Literacy">Financial Literacy</option>
                  <option value="Communication">Communication</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="All Statuses">Status: All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Not Started">Not Started</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button
                type="button"
                onClick={() => handleDownloadCertificate('Challenges_Report')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Log</span>
              </button>
            </div>
          </div>

          {/* Two-Column Grid: Challenges List (Left) & Curriculum/Child Progress (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Cols: Challenges List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Challenge 1: Public Speaking at Dinner Table */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-bold text-slate-900">
                          Public Speaking at Dinner Table
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#C2410C] text-[10px] font-bold">
                          Confidence
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">Age 6–10</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Child: <span className="font-semibold text-slate-600">Liam Smith</span> • Completed: 12 May 2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETED
                    </span>
                    <span className="text-[11px] font-black text-[#EA580C]">+120 XP</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="font-semibold text-emerald-700">⭐ Score: 4.5 / 5.0 (High Confidence)</span>
                    <span className="text-amber-500">★★★★☆</span>
                  </div>

                  <div className="flex items-center gap-3 font-bold text-xs">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveChallengeModal({
                          title: 'Public Speaking at Dinner Table',
                          scoreText: 'Score: 4.5 / 5.0 (High Confidence)',
                          description:
                            'Liam successfully delivered his 1-minute talk before family dinner without stage fright. Spoke clearly with polite posture.',
                        })
                      }
                      className="text-[#B83806] hover:underline cursor-pointer"
                    >
                      View Challenge Summary
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadCertificate('Liam_Smith_Public_Speaking')}
                      className="text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Download Certificate</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Challenge 2: Kitchen Science Problem Solver */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-bold text-slate-900">
                          Kitchen Science Problem Solver
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
                          Problem Solving
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">Age 5–8</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Child: <span className="font-semibold text-slate-600">Liam Smith</span> • Completed: 28 Apr 2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETED
                    </span>
                    <span className="text-[11px] font-black text-[#EA580C]">+90 XP</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-slate-600 font-medium">
                    ✓ Mastery Score: 92% • Activity time logged: 35 mins
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveChallengeModal({
                        title: 'Kitchen Science Problem Solver',
                        scoreText: 'Mastery Score: 92%',
                        description:
                          'Liam hypothesized vinegar and baking soda reactions. Documented step-by-step changes with parent verification.',
                      })
                    }
                    className="font-bold text-[#B83806] hover:underline cursor-pointer self-start sm:self-auto"
                  >
                    View Challenge Summary
                  </button>
                </div>
              </div>

              {/* Challenge 3: Budget Boss Starter Pocket Money */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Receipt className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-bold text-slate-900">
                          Budget Boss Starter Pocket Money
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold">
                          Financial Literacy
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">Age 6–8</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Child: <span className="font-semibold text-slate-600">Liam Smith</span> • Last Activity: 2 days ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                      • IN PROGRESS
                    </span>
                    <span className="text-[11px] font-black text-slate-700">+100 XP (Std Rate)</span>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                    <span>Step 2 of 4: Coin Sorting &amp; Value Match</span>
                    <span className="text-slate-800 font-bold">50% Completed</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>

              {/* Challenge 4: Story Weavers Daily Share */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-bold text-slate-900">
                          Story Weavers Daily Share
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                          Communication
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">Age 6–8</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Child: <span className="font-semibold text-slate-600">Liam Smith</span> • Available to start
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      • NOT STARTED
                    </span>
                    <span className="text-[11px] font-black text-slate-600">+80 XP</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">1 free slot remaining this month.</span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveChallengeModal({
                        title: 'Story Weavers Daily Share Briefing',
                        scoreText: 'Status: Ready to Launch',
                        description:
                          'Have Liam retell his favorite 3-minute book chapter at dinner or to a friend. Practice eye contact and voice modulation.',
                      })
                    }
                    className="font-bold text-[#B83806] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Start Challenge Briefing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Locked Card 5: Conflict Resolution & Leadership Quests */}
              <div className="bg-[#FFF8F6] rounded-3xl border border-orange-200/90 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 max-w-xl">
                  <div className="w-10 h-10 rounded-2xl bg-[#EA580C] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Lock className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        Conflict Resolution &amp; Leadership Quests
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFE4D6] text-[#C2410C] text-[10px] font-black uppercase">
                        Premium Curriculum
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">Age 7–11</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unlock 20+ additional advanced challenges, emotional intelligence roleplays, and 1.5x parent focus multipliers for Liam.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#7C2D12] hover:bg-[#63240E] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                >
                  <span>Unlock with Premium</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Pagination footer */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-medium">
                <span>Showing 1 to 4 of 4 challenges</span>
                <div className="flex items-center gap-1">
                  <button type="button" className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    &lt;
                  </button>
                  <button type="button" className="w-7 h-7 rounded-lg bg-[#B83806] text-white font-bold cursor-pointer">
                    1
                  </button>
                  <button type="button" className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (1 Col): Curriculum Progress & Linked Children */}
            <div className="space-y-6">
              {/* Card 1: Curriculum & Skill Progress */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Curriculum &amp; Skill Progress
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                    FREE QUOTA
                  </span>
                </div>

                {/* Locked Parent Focus Banner */}
                <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-orange-100 mb-5 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">
                      PARENT FOCUS BOOST: LOCKED
                    </h5>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Upgrade to select 2 priority focus areas and grant 1.5x XP multipliers to Liam.
                    </p>
                  </div>
                </div>

                {/* Skill List with Progress */}
                <div className="space-y-4 text-xs">
                  {/* Confidence */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Confidence</span>
                      </span>
                      <span className="font-bold text-emerald-600">100% (1/1 Done)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* Problem Solving */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>Problem Solving</span>
                      </span>
                      <span className="font-bold text-teal-600">100% (1/1 Done)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* Financial Literacy */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Financial Literacy</span>
                      </span>
                      <span className="font-bold text-amber-700">50% (In Progress)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>

                  {/* Communication */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        <span>Communication</span>
                      </span>
                      <span className="font-bold text-slate-400">0% (Available)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Child Progress & XP */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Child Progress &amp; XP
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400">1 of 2 Tracked</span>
                </div>

                <div className="space-y-4">
                  {/* Child 1: Liam Smith (Active) */}
                  <div className="p-4 rounded-2xl bg-[#FFFBF8] border border-orange-100/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          LS
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900">Liam Smith</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                              Active
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400">Level 1 • Curious Explorer</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-black text-slate-900">380 XP</p>
                        <p className="text-[10px] text-slate-400">2 of 4 (50%)</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-orange-100/50 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">Grade 1 • Age 7</span>
                      <Link
                        to="/admin/children/CHD-00124"
                        className="font-bold text-[#B83806] hover:underline flex items-center gap-0.5"
                      >
                        <span>View Liam&apos;s Progress</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Child 2: Maya Smith (Locked Sibling) */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                          MS
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-600">Maya Smith</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-800 text-[9px] font-bold flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" />
                              <span>Locked</span>
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400">Age 4 — Unlinked</p>
                        </div>
                      </div>

                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-slate-200/60">
                      Freemium accounts support 1 child only. Upgrade to Family Premium to track both children.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Summary Modal */}
      {activeChallengeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 p-6 sm:p-7 shadow-2xl relative text-left">
            <button
              type="button"
              onClick={() => setActiveChallengeModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>

            <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#C2410C] font-bold text-[10px] border border-orange-200">
              Verified Challenge Summary
            </span>

            <h3 className="text-base font-black text-slate-900 tracking-tight mt-2">
              {activeChallengeModal.title}
            </h3>
            <p className="text-xs text-emerald-700 font-bold mt-1">
              {activeChallengeModal.scoreText}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 my-4 text-xs text-slate-700 leading-relaxed font-medium">
              {activeChallengeModal.description}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium">Child: Liam Smith</span>
              <button
                type="button"
                onClick={() => setActiveChallengeModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Upgrade Modal */}
      <PremiumUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        childName="Liam Smith"
      />
    </div>
  );
};

export default AdminParentProfilePage;
