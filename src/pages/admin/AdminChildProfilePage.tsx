import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Clock,
  Search,
  ChevronDown,
  Award,
  Zap,
  Flame,
  ArrowRight,
  FileText,
  LogIn,
  BookOpen,
  Target,
  Sparkles,
  Rocket,
  X,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Send,
} from 'lucide-react';

type Tab = 'overview' | 'activity' | 'challenges' | 'skills';
type PlanType = 'Freemium' | 'Premium';

interface AssessmentQuestion {
  questionNumber: number;
  title: string;
  answerText: string;
  correctAnswerHighlight?: string;
  points: number;
}

interface AssessmentDetailData {
  id: string;
  skillName: string;
  badgeType: string;
  overallScore: number;
  completedDate: string;
  completedBy: string;
  supervisor: string;
  totalQuestions: number;
  timeSpent: string;
  status: string;
  retakeEligibility: string;
  latestCountText: string;
  questions: AssessmentQuestion[];
  parentNote: string;
}

const ASSESSMENTS: Record<string, AssessmentDetailData> = {
  'problem-solving': {
    id: 'problem-solving',
    skillName: 'Problem Solving',
    badgeType: 'Baseline',
    overallScore: 85,
    completedDate: '14 Jan 2027',
    completedBy: 'Liam Johnson',
    supervisor: 'Supervised by Sarah Johnson (Parent)',
    totalQuestions: 20,
    timeSpent: '18 mins',
    status: 'Evaluated & Recorded',
    retakeEligibility: 'In 30 days (13 Feb 2027)',
    latestCountText: 'Latest 3 of 20',
    questions: [
      {
        questionNumber: 1,
        title: 'Budgeting Allowance Simulation',
        answerText: 'Answer: Saved 50%, Spent 50% (Correct)',
        correctAnswerHighlight: 'Saved 50%, Spent 50%',
        points: 15,
      },
      {
        questionNumber: 2,
        title: 'Domestic Grocery Categorization',
        answerText: 'Answer: Sorted produce vs dairy with zero error',
        correctAnswerHighlight: 'Sorted produce vs dairy',
        points: 20,
      },
      {
        questionNumber: 3,
        title: 'Deductive Logic Puzzle',
        answerText: 'Answer: Identified root cause pattern',
        correctAnswerHighlight: 'Root cause pattern',
        points: 15,
      },
    ],
    parentNote:
      '"Showed tremendous analytical patience. Categorized grocery and budget items methodically."',
  },
  'financial-literacy': {
    id: 'financial-literacy',
    skillName: 'Financial Literacy',
    badgeType: 'Baseline',
    overallScore: 80,
    completedDate: '12 Jan 2027',
    completedBy: 'Liam Johnson',
    supervisor: 'Supervised by Sarah Johnson (Parent)',
    totalQuestions: 20,
    timeSpent: '22 mins',
    status: 'Evaluated & Recorded',
    retakeEligibility: 'In 28 days (11 Feb 2027)',
    latestCountText: 'Latest 3 of 20',
    questions: [
      {
        questionNumber: 1,
        title: 'Weekly Expense Categorization',
        answerText: 'Answer: Categorized needs vs wants with 90% accuracy',
        correctAnswerHighlight: 'Categorized needs vs wants (90%)',
        points: 20,
      },
      {
        questionNumber: 2,
        title: 'Piggy Bank Savings Goal',
        answerText: 'Answer: Allocated 20% toward long-term goals',
        correctAnswerHighlight: 'Allocated 20% savings',
        points: 15,
      },
      {
        questionNumber: 3,
        title: 'Store Discount Evaluation',
        answerText: 'Answer: Identified true bargain value correctly',
        correctAnswerHighlight: 'True bargain value',
        points: 15,
      },
    ],
    parentNote:
      '"Understood the concept of trade-offs quickly. Very excited about setting savings milestones."',
  },
  'confidence-expression': {
    id: 'confidence-expression',
    skillName: 'Confidence & Expression',
    badgeType: 'Baseline',
    overallScore: 72,
    completedDate: '08 Jan 2027',
    completedBy: 'Liam Johnson',
    supervisor: 'Supervised by Sarah Johnson (Parent)',
    totalQuestions: 15,
    timeSpent: '15 mins',
    status: 'Evaluated & Recorded',
    retakeEligibility: 'In 24 days (07 Feb 2027)',
    latestCountText: 'Latest 3 of 15',
    questions: [
      {
        questionNumber: 1,
        title: 'Family Story Presentation',
        answerText: 'Answer: Spoke clearly for 2 minutes without hesitation',
        correctAnswerHighlight: 'Spoke clearly (2 mins)',
        points: 15,
      },
      {
        questionNumber: 2,
        title: 'Active Listening Prompt',
        answerText: 'Answer: Paraphrased parent story accurately',
        correctAnswerHighlight: 'Accurate paraphrase',
        points: 15,
      },
      {
        questionNumber: 3,
        title: 'Disagreeing Respectfully',
        answerText: 'Answer: Articulated counterpoint with constructive tone',
        correctAnswerHighlight: 'Constructive tone',
        points: 15,
      },
    ],
    parentNote:
      '"Good clarity and body language, getting more comfortable speaking in front of peers."',
  },
  'creativity-teamwork': {
    id: 'creativity-teamwork',
    skillName: 'Creativity & Teamwork',
    badgeType: 'Baseline',
    overallScore: 65,
    completedDate: '05 Jan 2027',
    completedBy: 'Liam Johnson',
    supervisor: 'Supervised by Sarah Johnson (Parent)',
    totalQuestions: 15,
    timeSpent: '25 mins',
    status: 'Evaluated & Recorded',
    retakeEligibility: 'In 21 days (04 Feb 2027)',
    latestCountText: 'Latest 3 of 15',
    questions: [
      {
        questionNumber: 1,
        title: 'Group Story Building',
        answerText: 'Answer: Added creative twists while respecting peer storylines',
        points: 15,
      },
      {
        questionNumber: 2,
        title: 'Collaborative Block Castle',
        answerText: 'Answer: Shared role distribution fairly with partner',
        points: 10,
      },
      {
        questionNumber: 3,
        title: 'Conflict Mediation in Play',
        answerText: 'Answer: Suggested fair turn-taking',
        points: 15,
      },
    ],
    parentNote:
      '"Enjoys creative ideation. Can improve on listening when other kids propose alternative ideas."',
  },
  'leadership-decision': {
    id: 'leadership-decision',
    skillName: 'Leadership & Decision Making',
    badgeType: 'Baseline',
    overallScore: 60,
    completedDate: '02 Jan 2027',
    completedBy: 'Liam Johnson',
    supervisor: 'Supervised by Sarah Johnson (Parent)',
    totalQuestions: 15,
    timeSpent: '20 mins',
    status: 'Evaluated & Recorded',
    retakeEligibility: 'In 18 days (01 Feb 2027)',
    latestCountText: 'Latest 3 of 15',
    questions: [
      {
        questionNumber: 1,
        title: 'Priority Ordering Simulation',
        answerText: 'Answer: Prioritized homework before screen time',
        points: 15,
      },
      {
        questionNumber: 2,
        title: 'Group Role Allocation',
        answerText: 'Answer: Assigned tasks according to peer strengths',
        points: 10,
      },
      {
        questionNumber: 3,
        title: 'Ethical Dilemma Resolution',
        answerText: 'Answer: Chose honest admission of error',
        points: 15,
      },
    ],
    parentNote:
      '"Demonstrated growing responsibility. A good area for continuous encouragement."',
  },
};

export interface AdminChildProfilePageProps {
  defaultPlan?: PlanType;
}

export const AdminChildProfilePage: React.FC<AdminChildProfilePageProps> = ({ defaultPlan }) => {
  const navigate = useNavigate();
  const { childId } = useParams<{ childId: string }>();
  const [searchParams] = useSearchParams();

  // Determine initial plan:
  // 1. Explicit prop if provided
  // 2. Query param ?plan=freemium or ?plan=premium
  // 3. Child ID convention: CHD-00124 / CHD-00126 are Freemium; others default to Premium (or Freemium if matched)
  const initialPlan: PlanType = (() => {
    if (defaultPlan) return defaultPlan;
    const urlPlan = searchParams.get('plan')?.toLowerCase();
    if (urlPlan === 'freemium') return 'Freemium';
    if (urlPlan === 'premium') return 'Premium';
    if (childId === 'CHD-00124' || childId === 'CHD-00126') return 'Freemium';
    if (childId === 'CHD-00123') return 'Premium';
    // Default to Freemium to showcase the newly uploaded Freemium designs
    return 'Freemium';
  })();

  const [activePlan, setActivePlan] = useState<PlanType>(initialPlan);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Filter state
  const [activitySearch, setActivitySearch] = useState('');
  const [challengeSearch, setChallengeSearch] = useState('');
  const [challengeSkillFilter, setChallengeSkillFilter] = useState('All');
  const [challengeStatusFilter, setChallengeStatusFilter] = useState('All');
  const [activityTypeFilter, setActivityTypeFilter] = useState('All');
  const [showActivityTypeMenu, setShowActivityTypeMenu] = useState(false);
  const [activityRangeFilter, setActivityRangeFilter] = useState('Last 30 Days');
  const [showActivityRangeMenu, setShowActivityRangeMenu] = useState(false);

  // Life Skills assessment selection
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  const [isCompetencyDropdownOpen, setIsCompetencyDropdownOpen] = useState(false);

  // Premium Quick Actions State
  const [isMessageParentOpen, setIsMessageParentOpen] = useState(false);
  const [parentMessage, setParentMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  // Modal inspection preview
  const [activeModal, setActiveModal] = useState<{
    title: string;
    type: 'submission' | 'ledger' | 'reflection';
    challengeName: string;
    date: string;
    xp: string;
    details: string;
  } | null>(null);

  useEffect(() => {
    if (defaultPlan) {
      setActivePlan(defaultPlan);
    }
  }, [defaultPlan]);

  // Derived profile details based on active plan
  const isFreemium = activePlan === 'Freemium';
  const childDisplayName = isFreemium ? 'Liam Johnson' : 'Emma Johnson';
  const displayChildId = isFreemium ? (childId || 'CHD-00124') : (childId || 'CHD-00123');
  const parentName = 'Sarah Johnson';

  const handleGenerateReport = () => {
    setReportGenerating(true);
    setTimeout(() => {
      setReportGenerating(false);
      setReportReady(true);
      setTimeout(() => setReportReady(false), 3000);
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setParentMessage('');
      setIsMessageParentOpen(false);
    }, 1500);
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
            <span>Back to Children</span>
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-slate-800 font-bold">Child Profile</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium">({activePlan})</span>
        </div>

        {/* Profile Switcher: Toggle between Freemium and Premium designs */}
        <div className="inline-flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setActivePlan('Freemium');
              setSelectedAssessmentId(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isFreemium
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFreemium ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>Freemium Profile</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePlan('Premium');
              setSelectedAssessmentId(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              !isFreemium
                ? 'bg-gradient-to-r from-[#9E3508] to-[#C2410C] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${!isFreemium ? 'fill-white text-white' : 'text-slate-400'}`} />
            <span>Premium Profile</span>
          </button>
        </div>
      </div>

      {/* Child Header Card */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar circle */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#FEF3C7] border-2 border-white shadow-xs flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 80 80"
              className="w-11 h-11 text-slate-700 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="28" r="13" />
              <path d="M22 72 C22 52, 29 46, 40 46 C51 46, 58 52, 58 72 Z" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {childDisplayName}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Active
              </span>
            </div>

            <div className="mt-2 text-xs text-slate-500 font-medium space-y-1">
              <p>
                Child ID: <span className="font-bold text-slate-700">{displayChildId}</span> • Age: <span className="font-bold text-slate-700">8 years</span>
              </p>
              <p>
                Parent/Guardian: <Link to="/admin/parents/PRT-00123" className="font-bold text-slate-800 hover:text-[#B83806] underline decoration-slate-300">{parentName}</Link>
              </p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span>Parent Plan:</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7]/70 text-[#B45309] font-bold text-[11px] border border-amber-200 shadow-2xs">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {activePlan}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Quick Actions (When viewed in Premium mode) */}
        {!isFreemium && (
          <div className="w-full sm:w-auto bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-4.5 min-w-[240px] shadow-2xs">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2.5">
              PREMIUM ACTIONS
            </h4>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsMessageParentOpen(true)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#B83806]" />
                <span>Message Parent</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateReport}
                className="w-full px-3.5 py-2 rounded-xl bg-[#9E3508] hover:bg-[#852C06] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>
                  {reportGenerating ? 'Generating...' : reportReady ? '✓ Report Downloaded' : 'Export Full Report'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-slate-200 flex items-center gap-8 text-xs font-bold text-slate-500">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'text-[#B83806] border-b-2 border-[#B83806]'
              : 'hover:text-slate-800'
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('activity')}
          className={`pb-3.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'activity'
              ? 'text-[#B83806] border-b-2 border-[#B83806]'
              : 'hover:text-slate-800'
          }`}
        >
          <span>Activity</span>
          <span className="font-bold">{isFreemium ? '24' : '36'}</span>
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
          <span className="font-bold">{isFreemium ? '10' : '15'}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`pb-3.5 transition-colors cursor-pointer ${
            activeTab === 'skills'
              ? 'text-[#B83806] border-b-2 border-[#B83806]'
              : 'hover:text-slate-800'
          }`}
        >
          Life Skills
        </button>
      </div>

      {/* ── TAB 1: OVERVIEW (Image 2) ── */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              Basic Information
            </h2>
            <Clock className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Child Name</span>
              <span className="font-bold text-slate-900">{isFreemium ? 'Emma Johnson' : childDisplayName}</span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Child ID</span>
              <span className="font-semibold text-slate-700">{displayChildId}</span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Age</span>
              <span className="font-semibold text-slate-700">8 years</span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Parent/Guardian</span>
              <Link to="/admin/parents/PRT-00123" className="font-bold text-slate-900 hover:text-[#B83806] hover:underline">
                {parentName}
              </Link>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Parent Plan</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200 text-[11px]">
                {activePlan}
              </span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Registration Date</span>
              <span className="font-semibold text-slate-700">12 Jan 2025</span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Last Active</span>
              <span className="font-semibold text-slate-700">2 hours ago</span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Account Status</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ACTIVITY (Image 3) ── */}
      {activeTab === 'activity' && (
        <div className="flex flex-col gap-6">
          {/* 5 KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {/* Card 1: Total Logins */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">Total Logins</span>
                <LogIn className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {isFreemium ? '12' : '18'}
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                {isFreemium ? 'Last: Today, 5h ago' : 'Last: Today, 2h ago'}
              </p>
            </div>

            {/* Card 2: Tasks Attempted */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">Tasks Attempted</span>
                <FileText className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {isFreemium ? '10' : '24'}
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                {isFreemium ? 'Across 2 free skills' : 'Across 5 core skills'}
              </p>
            </div>

            {/* Card 3: Tasks Completed */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">Tasks Completed</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {isFreemium ? '8' : '24'}
                </span>
                <span className="text-xs text-emerald-600 font-bold">
                  {isFreemium ? '80% rate' : '100% rate'}
                </span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: isFreemium ? '80%' : '100%' }}
                />
              </div>
            </div>

            {/* Card 4: Total Points */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">Total Points</span>
                <Award className="w-3.5 h-3.5 text-amber-500 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {isFreemium ? '950' : '2,320'}
                </span>
                <span className="text-xs font-bold text-slate-500">XP</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">
                {isFreemium ? '+180 this week' : '+470 this week'}
              </p>
            </div>

            {/* Card 5: Current Streak */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">Current Streak</span>
                <Flame className="w-3.5 h-3.5 text-orange-500 stroke-[2]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {isFreemium ? '5' : '9'}
                </span>
                <span className="text-xs font-bold text-slate-500">Days</span>
              </div>
              <p className="text-[11px] text-orange-600 font-bold mt-1">
                {isFreemium ? '🏆 Rising Champ' : '🔥 Super Learner'}
              </p>
            </div>
          </div>

          {/* Activity Timeline Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                  placeholder="Search activities or milestones..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806] font-medium"
                />
              </div>

              <div className="flex items-center gap-2 relative">
                {/* Activity types dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowActivityTypeMenu(!showActivityTypeMenu)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{activityTypeFilter === 'All' ? 'All Activity Types' : activityTypeFilter}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {showActivityTypeMenu && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 text-xs">
                      {['All', 'Challenges', 'Practice Modules', 'Milestones'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setActivityTypeFilter(opt);
                            setShowActivityTypeMenu(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium text-slate-700"
                        >
                          {opt === 'All' ? 'All Activity Types' : opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Range dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowActivityRangeMenu(!showActivityRangeMenu)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{activityRangeFilter}</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {showActivityRangeMenu && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 text-xs">
                      {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'All Time'].map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => {
                            setActivityRangeFilter(range);
                            setShowActivityRangeMenu(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium text-slate-700"
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xs font-bold text-slate-900">
                Activity Timeline
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                Showing recent 6 events
              </span>
            </div>

            {/* Timeline Items */}
            <div className="divide-y divide-slate-100">
              {/* Event 1: Sorting Family Groceries */}
              <div className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                        CHALLENGE COMPLETED
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Today, 10:14 AM</span>
                    </div>
                    <span className="text-xs font-black text-emerald-600 shrink-0">+80 XP</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Sorting Family Groceries
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Completed hands-on domestic sorting categorized by item types (Produce vs Dairy).
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-2 flex items-center gap-1.5">
                    <span>Problem Solving</span>
                    <span>•</span>
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified by Sarah (Parent)
                    </span>
                  </p>
                </div>
              </div>

              {/* Event 2: Number Counting & Basic Addition */}
              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                        PRACTICE MODULE
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Yesterday, 4:20 PM</span>
                    </div>
                    <span className="text-xs font-black text-slate-700 shrink-0">+35 XP</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Number Counting &amp; Basic Addition
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Interactive counting exercises with animated visual objects. 10 of 10 questions correct with zero hints required.
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-2">
                    ⏱ 18 mins session • 📱 iPadOS 17.2
                  </p>
                </div>
              </div>

              {/* Event 3: Completed 5th Challenge */}
              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider">
                        MILESTONE UNLOCKED
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Oct 24, 2023</span>
                    </div>
                    <span className="text-xs font-black text-amber-600 shrink-0">+50 XP Bonus</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Completed 5th Challenge
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Liam has successfully completed 5 cumulative developmental challenges since registration.
                  </p>
                  <p className="text-[11px] text-amber-700 font-bold mt-2">
                    ⭐ Junior Explorer Ribbon
                  </p>
                </div>
              </div>

              {/* Event 4: Bedtime Reading */}
              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider">
                        PRACTICE SESSION
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Oct 22, 2023</span>
                    </div>
                    <span className="text-xs font-black text-blue-600 shrink-0">+40 XP</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Guided Story Reading Aloud
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Read chapter 3 of African Folk Tales with clear pronunciation and expression.
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-2">
                    Confidence • Supervised by Parent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: CHALLENGES (Image 4) ── */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left 2 Cols: Challenges list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Filter toolbar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={challengeSearch}
                  onChange={(e) => setChallengeSearch(e.target.value)}
                  placeholder="Search challenges..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806]"
                />
              </div>
              <div className="relative">
                <select
                  value={challengeSkillFilter}
                  onChange={(e) => setChallengeSkillFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="All">All Life Skills</option>
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
                  value={challengeStatusFilter}
                  onChange={(e) => setChallengeStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Challenge Cards List */}
            <div className="flex flex-col gap-3.5">
              {/* Challenge 1: Public Speaking at Dinner Table */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4.5 h-4.5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          Public Speaking at Dinner Table
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#C2410C] text-[10px] font-bold">
                          Confidence
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        1-minute dinner discussion presentation with parent sign-off
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                    <span className="text-[11px] font-bold text-[#EA580C]">
                      +120 XP
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Verified by Sarah Johnson • 12 Jan 2025
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModal({
                        title: 'Public Speaking Submission',
                        type: 'submission',
                        challengeName: 'Public Speaking at Dinner Table',
                        date: '12 Jan 2025',
                        xp: '+120 XP',
                        details:
                          'Liam presented his thoughts on "Why teamwork matters at school" during dinner. Spoke clearly for 1 minute 15 seconds with confidence.',
                      })
                    }
                    className="font-bold text-slate-700 hover:text-[#B83806] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Submission</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Challenge 2: Budget Boss Weekly Allowance */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <Award className="w-4.5 h-4.5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          Budget Boss Weekly Allowance
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold">
                          Financial Literacy
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mt-1 border border-amber-200">
                        <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                        <span>1.5x Boost</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Track daily savings and expenses for 7 consecutive days; upload ledger
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                    <span className="text-[11px] font-bold text-[#EA580C]">
                      +150 XP
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Verified by Sarah Johnson • 08 Jan 2025
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModal({
                        title: 'Ledger Proof Submission',
                        type: 'ledger',
                        challengeName: 'Budget Boss Weekly Allowance',
                        date: '08 Jan 2025',
                        xp: '+150 XP (1.5x Boost)',
                        details:
                          'Handwritten weekly ledger verified by parent. Saved 500 NGN, spent 300 NGN on drawing markers, balance logged correctly in piggy bank account.',
                      })
                    }
                    className="font-bold text-slate-700 hover:text-[#B83806] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Ledger Proof</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Challenge 3: Story Weavers Team Tale */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4.5 h-4.5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          Story Weavers Team Tale
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                          Creativity &amp; Teamwork
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Collaborate with peer on interactive 6-part illustrated narrative
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                      • In Progress
                    </span>
                    <span className="text-[11px] font-bold text-[#EA580C]">
                      +90 XP
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                    <span>Progress: Step 4 of 6</span>
                    <span className="text-slate-800 font-bold">65%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>

              {/* Challenge 4: Kitchen Science Problem Solving */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Target className="w-4.5 h-4.5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          Kitchen Science Problem Solving
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
                          Problem Solving
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Hypothesize and record chemical reactions with household ingredients
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                      • In Progress
                    </span>
                    <span className="text-[11px] font-bold text-[#EA580C]">
                      +130 XP
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                    <span>Progress: Step 2 of 5</span>
                    <span className="text-slate-800 font-bold">40%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>

              {/* Challenge 5: Daily Gratitude & Reflection */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                      <span className="text-base">😊</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          Daily Gratitude &amp; Reflection
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 text-[10px] font-bold">
                          Emotional Intelligence
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Log 3 gratitude moments daily for five consecutive school days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                    <span className="text-[11px] font-bold text-[#EA580C]">
                      +60 XP
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Verified by Sarah Johnson • 05 Jan 2025
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModal({
                        title: 'Reflection Log Submission',
                        type: 'reflection',
                        challengeName: 'Daily Gratitude & Reflection',
                        date: '05 Jan 2025',
                        xp: '+60 XP',
                        details:
                          'Logged 5 days of gratitude notes: family breakfast, playing football with friends, art class drawing, mom helping with homework, and weekend story time.',
                      })
                    }
                    className="font-bold text-slate-700 hover:text-[#B83806] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Reflection Log</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-medium">
              <span>Showing 1–5 of {isFreemium ? '10' : '15'} challenges</span>
              <div className="flex items-center gap-1">
                <button type="button" className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  &lt;
                </button>
                <button type="button" className="w-7 h-7 rounded-lg bg-[#B83806] text-white font-bold cursor-pointer">
                  1
                </button>
                <button type="button" className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  2
                </button>
                <button type="button" className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Right Col: Parent Focus Area Boost Card (Image 4) */}
          <div>
            <div className="bg-[#FFFDF7] rounded-3xl border border-amber-200 p-6 shadow-2xs sticky top-24">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center">
                    <Rocket className="w-4.5 h-4.5 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      Parent Focus Area Boost
                    </h4>
                    <p className="text-[11px] font-bold text-amber-800 mt-0.5">
                      1.5x Multiplier Active
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 text-[10px] font-bold border border-amber-200">
                  Active
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Sarah Johnson selected <strong className="text-slate-800">Financial Literacy</strong> as Emma&apos;s primary growth priority. Completed quests in this area earn accelerated XP.
              </p>

              <div className="pt-3 border-t border-amber-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Focus Progress</span>
                  <span className="font-bold text-slate-900">2 of 3 Completed</span>
                </div>
                <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '66%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: LIFE SKILLS (Image 1) ── */}
      {activeTab === 'skills' && (
        <div className="flex flex-col gap-6">
          {/* Detailed assessment mode if an assessment is clicked */}
          {selectedAssessmentId && ASSESSMENTS[selectedAssessmentId] ? (
            (() => {
              const assessment = ASSESSMENTS[selectedAssessmentId];
              return (
                <div className="flex flex-col gap-5">
                  {/* Section Header with Filter */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        Life Skills Mastery &amp; Assessment
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Validated competency benchmarks aligned with Grade 3 developmental milestones
                      </p>
                    </div>
                    <div className="relative self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setIsCompetencyDropdownOpen(!isCompetencyDropdownOpen)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                      >
                        <span className="font-bold text-slate-900">FILTER:</span>
                        <span>All 5 Competencies</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      {isCompetencyDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-20 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAssessmentId(null);
                              setIsCompetencyDropdownOpen(false);
                            }}
                            className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-bold text-[#B83806] flex items-center justify-between cursor-pointer"
                          >
                            <span>All 5 Competencies (Overview)</span>
                          </button>
                          <div className="h-px bg-slate-100 my-1" />
                          {Object.values(ASSESSMENTS).map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setSelectedAssessmentId(item.id);
                                setIsCompetencyDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                                item.id === selectedAssessmentId
                                  ? 'bg-orange-50/60 font-bold text-[#B83806]'
                                  : 'text-slate-700 font-medium'
                              }`}
                            >
                              <span>{item.skillName}</span>
                              <span className="text-[11px] font-bold text-slate-500">
                                {item.overallScore}%
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back button to overview */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId(null)}
                      className="text-xs font-bold text-[#B83806] hover:underline flex items-center gap-1.5 cursor-pointer w-fit"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Competencies List</span>
                    </button>
                  </div>

                  {/* Two-Column Assessment View */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Left Card: Assessment Information */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-2xs flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-4 bg-[#B83806] rounded-full inline-block" />
                          <h4 className="text-sm font-black text-slate-900 tracking-tight">
                            Assessment Information
                          </h4>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-800 bg-[#FFF3E8] border border-amber-200/80">
                          {assessment.badgeType}
                        </span>
                      </div>

                      <div className="mt-4 p-4 rounded-2xl bg-[#FFF9F6] border border-orange-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            OVERALL SCORE
                          </span>
                          <span className="text-3xl font-black text-slate-900 tracking-tight mt-0.5 block">
                            {assessment.overallScore}%
                          </span>
                        </div>
                        <div className="w-11 h-11 rounded-full border border-orange-200 bg-[#FFF1ED] flex items-center justify-center text-[#B83806]">
                          <Award className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      <div className="mt-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          ASSESSMENT TYPE
                        </span>
                        <p className="text-sm font-black text-slate-900 mt-1">
                          {assessment.skillName}
                        </p>
                      </div>

                      <div className="flex items-center justify-between py-2.5 border-b border-slate-100 mt-2">
                        <span className="text-xs text-slate-500 font-medium">Date Completed</span>
                        <span className="text-xs font-bold text-slate-800">{assessment.completedDate}</span>
                      </div>

                      <div className="mt-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          COMPLETED BY
                        </span>
                        <p className="text-sm font-black text-slate-900 mt-0.5">
                          {assessment.completedBy}
                        </p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          {assessment.supervisor}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-[#FAF8F5] rounded-2xl p-3.5 border border-slate-100">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                            TOTAL QUESTIONS
                          </span>
                          <p className="text-sm font-extrabold text-slate-900 mt-1">
                            {assessment.totalQuestions} Questions
                          </p>
                        </div>
                        <div className="bg-[#FAF8F5] rounded-2xl p-3.5 border border-slate-100">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                            TIME SPENT
                          </span>
                          <p className="text-sm font-extrabold text-slate-900 mt-1">
                            {assessment.timeSpent}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-100">
                        <span className="text-xs text-slate-500 font-medium">Status</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {assessment.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-500 font-medium">Retake Eligibility</span>
                        <span className="text-xs font-bold text-slate-800">{assessment.retakeEligibility}</span>
                      </div>
                    </div>

                    {/* Right Card: Question Responses */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-2xs flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-4 bg-[#B83806] rounded-full inline-block" />
                          <h4 className="text-sm font-black text-slate-900 tracking-tight">
                            Question Responses
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-[#B83806]">
                          {assessment.latestCountText}
                        </span>
                      </div>

                      <div className="flex flex-col gap-3">
                        {assessment.questions.map((q) => (
                          <div
                            key={q.questionNumber}
                            className="bg-[#FAF8F5] rounded-2xl p-4 border border-slate-100/90"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                QUESTION {q.questionNumber}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                +{q.points} pts
                              </span>
                            </div>
                            <p className="text-sm font-bold text-slate-900 mt-1">
                              {q.title}
                            </p>
                            <p className="text-xs text-slate-600 mt-1 font-medium">
                              <span className="text-slate-500 font-normal">Answer: </span>
                              {q.correctAnswerHighlight ? (
                                <>
                                  <span className="text-emerald-700 font-bold">
                                    {q.correctAnswerHighlight}
                                  </span>
                                  <span className="text-slate-400 font-normal"> (Correct)</span>
                                </>
                              ) : (
                                <span className="text-slate-700">{q.answerText.replace('Answer: ', '')}</span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-[#FFFDF3] rounded-2xl p-4 border border-amber-200/70 mt-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[#B83806] font-serif font-black text-lg leading-none">”</span>
                          <span className="text-xs font-bold text-slate-800 tracking-tight">
                            Parent Note &amp; Evaluation
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
                          {assessment.parentNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <>
              {/* 5 Top Stat Cards (Image 1) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {/* 1: SKILLS TRACKED */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      SKILLS TRACKED
                    </span>
                    <BookOpen className="w-3.5 h-3.5 text-orange-600 stroke-[2]" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">5 of 5</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">Core Competencies Active</p>
                </div>

                {/* 2: OVERALL MASTERY */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      OVERALL MASTERY
                    </span>
                    <Award className="w-3.5 h-3.5 text-amber-600 stroke-[2]" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      {isFreemium ? '78%' : '82%'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">Average Progress</span>
                  </div>
                  <div className="w-full h-1 bg-[#F4EBE3] rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-[#B83806] rounded-full"
                      style={{ width: isFreemium ? '78%' : '82%' }}
                    />
                  </div>
                </div>

                {/* 3: TOP STRENGTH */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      TOP STRENGTH
                    </span>
                    <Target className="w-3.5 h-3.5 text-teal-600 stroke-[2]" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 tracking-tight truncate mt-1">
                    Problem Solving
                  </p>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">
                    ● {isFreemium ? '85%' : '88%'} Mastery Level
                  </p>
                </div>

                {/* 4: FOCUS AREA */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      FOCUS AREA
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 stroke-[2]" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 tracking-tight truncate mt-1">
                    Financial Literacy
                  </p>
                  <p className="text-[11px] text-amber-700 font-bold mt-1">
                    Parent Designated (1.5x)
                  </p>
                </div>

                {/* 5: TOTAL SKILL XP */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      TOTAL SKILL XP
                    </span>
                    <Zap className="w-3.5 h-3.5 text-orange-500 stroke-[2]" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      {isFreemium ? '2,320' : '3,150'}
                    </span>
                    <span className="text-xs font-bold text-slate-500">XP</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    {isFreemium ? 'Across 18 tracked items' : 'Across 28 tracked items'}
                  </p>
                </div>
              </div>

              {/* Section Header with Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Life Skills Mastery &amp; Assessment
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Validated competency benchmarks aligned with Grade 3 developmental milestones
                  </p>
                </div>
                <div className="relative self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsCompetencyDropdownOpen(!isCompetencyDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                  >
                    <span className="font-bold text-slate-500">FILTER:</span>
                    <span>All 5 Competencies</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isCompetencyDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-20 text-xs">
                      {Object.values(ASSESSMENTS).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedAssessmentId(item.id);
                            setIsCompetencyDropdownOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer text-slate-700 font-medium"
                        >
                          <span>{item.skillName}</span>
                          <span className="text-[11px] font-bold text-slate-500">{item.overallScore}%</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 5 Competency Cards (Image 1) */}
              <div className="flex flex-col gap-4">
                {/* 1. Problem Solving */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-slate-900">1. Problem Solving</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-black tracking-wide border border-teal-100">
                            STRONG
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Analytical breakdown, root-cause inquiry, and deductive reasoning
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900 leading-none">85%</p>
                      <p className="text-[11px] text-slate-400 font-bold mt-1">310 XP Earned</p>
                    </div>
                  </div>

                  {/* Thick terracotta progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '85%' }} />
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>5 Challenges Completed • Milestones: Logic puzzles, independent deduction</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('problem-solving')}
                      className="font-bold text-slate-700 hover:text-[#B83806] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 2. Financial Literacy */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-base font-bold text-slate-900">2. Financial Literacy</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-black tracking-wide border border-teal-100">
                            STRONG
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FEF3C7]/60 text-amber-800 text-[10px] font-bold border border-amber-200/80 mb-1.5">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          <span>Parent Focus Area (1.5x Boost)</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Resource allocation, basic budgeting, needs vs. wants valuation
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900 leading-none">80%</p>
                      <p className="text-[11px] text-slate-400 font-bold mt-1">330 XP Earned</p>
                    </div>
                  </div>

                  {/* Thick terracotta progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '80%' }} />
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>4 Challenges Completed • Milestones: Weekly budgeting, expense tracking</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('financial-literacy')}
                      className="font-bold text-slate-700 hover:text-[#B83806] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 3. Confidence & Expression */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-slate-900">3. Confidence &amp; Expression</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black tracking-wide border border-blue-100">
                            GOOD
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Articulate self-expression, empathetic listening, and public discourse
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900 leading-none">72%</p>
                      <p className="text-[11px] text-slate-400 font-bold mt-1">320 XP Earned</p>
                    </div>
                  </div>

                  {/* Thick terracotta progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '72%' }} />
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>4 Challenges Completed • Milestones: Public speaking, dinner discussions</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('confidence-expression')}
                      className="font-bold text-slate-700 hover:text-[#B83806] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 4. Creativity & Teamwork */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-slate-900">4. Creativity &amp; Teamwork</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black tracking-wide border border-amber-200">
                            DEVELOPING
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Cooperative play, imaginative synthesis, and group ideation
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900 leading-none">65%</p>
                      <p className="text-[11px] text-slate-400 font-bold mt-1">180 XP Earned</p>
                    </div>
                  </div>

                  {/* Thick terracotta progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '65%' }} />
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>3 Challenges Completed • Milestones: Peer storytelling, collaborative drawing</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('creativity-teamwork')}
                      className="font-bold text-slate-700 hover:text-[#B83806] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 5. Leadership & Decision Making */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Target className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-slate-900">5. Leadership &amp; Decision Making</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black tracking-wide border border-amber-200">
                            DEVELOPING
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Autonomy in task sequencing, initiative, and ethical choices
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900 leading-none">60%</p>
                      <p className="text-[11px] text-slate-400 font-bold mt-1">140 XP Earned</p>
                    </div>
                  </div>

                  {/* Thick terracotta progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '60%' }} />
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex items-center justify-end text-[11px]">
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('leadership-decision')}
                      className="font-bold text-slate-700 hover:text-[#B83806] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Message Parent Modal (for Premium) */}
      {isMessageParentOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 p-6 shadow-2xl relative text-left">
            <button
              type="button"
              onClick={() => setIsMessageParentOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#C2410C] font-bold text-[10px] border border-orange-200">
                Direct Parent Dispatch
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Message {parentName}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Regarding {childDisplayName} ({displayChildId})
            </p>

            <form onSubmit={handleSendMessage} className="mt-4 space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Message Content
                </label>
                <textarea
                  value={parentMessage}
                  onChange={(e) => setParentMessage(e.target.value)}
                  placeholder="Type an official recommendation or update for the parent..."
                  rows={4}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806] font-medium resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  {messageSent ? '✓ Sent to parent notification feed' : 'Dispatches via in-app banner'}
                </span>
                <button
                  type="submit"
                  disabled={messageSent}
                  className="px-4 py-2 rounded-xl bg-[#9E3508] hover:bg-[#852C06] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{messageSent ? 'Sent!' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submission / Verification Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-100 p-6 sm:p-7 shadow-2xl relative text-left">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                Verified Submission
              </span>
              <span className="text-xs text-slate-400 font-medium">• {activeModal.date}</span>
            </div>

            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {activeModal.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Challenge: <span className="text-slate-800 font-bold">{activeModal.challengeName}</span>
            </p>

            <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-orange-100 my-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  AWARDED REWARD
                </span>
                <span className="text-xs font-black text-[#EA580C]">{activeModal.xp}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeModal.details}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified by Sarah Johnson (Parent)</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChildProfilePage;
