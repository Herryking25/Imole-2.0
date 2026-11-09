import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
} from 'lucide-react';

type Tab = 'overview' | 'activity' | 'challenges' | 'skills';

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
        title: 'Dinner Table Speech',
        answerText: 'Answer: Completed with parent audio review',
        points: 20,
      },
      {
        questionNumber: 3,
        title: 'Team Sharing Dilemma',
        answerText: 'Answer: Chose collaborative resolution',
        points: 15,
      },
    ],
    parentNote:
      '"Liam showed high engagement in math and communication questions. Recommended focus on leadership and money management."',
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

export const AdminChildProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { childId } = useParams<{ childId: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Interactive filter state
  const [activitySearch, setActivitySearch] = useState('');
  const [challengeSearch, setChallengeSearch] = useState('');
  const [challengeSkillFilter, setChallengeSkillFilter] = useState('All');
  const [challengeStatusFilter, setChallengeStatusFilter] = useState('All');

  const childName = 'Emma Johnson';
  const displayChildId = childId || 'CHD-00123';
  const parentName = 'Sarah Johnson';

  // Life Skills assessment selection
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  const [isCompetencyDropdownOpen, setIsCompetencyDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 text-left font-sans select-none pb-16">
      {/* Top Breadcrumb */}
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
      </div>

      {/* Child Header Card */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar circle */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#FEF3C7] border-2 border-white shadow-sm flex items-center justify-center shrink-0">
            <svg viewBox="0 0 80 80" className="w-12 h-12 text-slate-700 fill-current" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="30" r="14" />
              <path d="M20 74 C20 54, 28 48, 40 48 C52 48, 60 54, 60 74 Z" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {childName}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-bold">
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
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-[11px] border border-amber-200">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-slate-200 flex items-center gap-8 text-xs font-bold text-slate-500">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 transition-colors cursor-pointer ${activeTab === 'overview'
              ? 'text-[#B83806] border-b-2 border-[#B83806]'
              : 'hover:text-slate-800'
            }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('activity')}
          className={`pb-3.5 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'activity'
              ? 'text-[#B83806] border-b-2 border-[#B83806]'
              : 'hover:text-slate-800'
            }`}
        >
          <span>Activity</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-100 text-slate-600">24</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('challenges')}
          className={`pb-3.5 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'challenges'
              ? 'text-[#B83806] border-b-2 border-[#B83806]'
              : 'hover:text-slate-800'
            }`}
        >
          <span>Challenges</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-100 text-slate-600">10</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`pb-3.5 transition-colors cursor-pointer ${activeTab === 'skills'
              ? 'text-[#B83806] border-b-2 border-[#B83806]'
              : 'hover:text-slate-800'
            }`}
        >
          Life Skills
        </button>
      </div>

      {/* ── TAB 1: OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Basic Information
            </h2>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Child Name</span>
              <span className="font-bold text-slate-900">{childName}</span>
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
                Premium
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

      {/* ── TAB 2: ACTIVITY 24 ── */}
      {activeTab === 'activity' && (
        <div className="flex flex-col gap-6">
          {/* 5 KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">TOTAL LOGINS</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">18</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Last: Today, 2h ago</p>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">TASKS ATTEMPTED</span>
                <FileText className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">24</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Across 5 core skills</p>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">TASKS COMPLETED</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">24</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ 100% completion</p>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">TOTAL POINTS</span>
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">2,320</span>
                <span className="text-xs font-bold text-slate-500">XP</span>
              </div>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">↗ +470 this week</p>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">CURRENT STREAK</span>
                <Flame className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">9</span>
                <span className="text-xs font-bold text-slate-500">Days</span>
              </div>
              <p className="text-[10px] text-orange-600 font-bold mt-1">🔥 Super Learner</p>
            </div>
          </div>

          {/* Activity Timeline Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                  placeholder="Search activities or milestones..."
                  className="w-full pl-10 pr-4 py-2 bg-[#FFFBF8] border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806] font-medium"
                />
              </div>

              <div className="flex items-center gap-2">
                <button type="button" className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                  <span>All Activity Types</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button type="button" className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                  <span>Last 30 Days</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Timeline Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Activity Timeline
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                Showing recent 6 events
              </span>
            </div>

            {/* Timeline Events */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {/* Event 1 */}
              <div className="relative flex items-start justify-between gap-4">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 border-2 border-white flex items-center justify-center text-[10px]">
                  💡
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    CHALLENGE COMPLETION • Today, 14:30
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Public Speaking at Dinner Table
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Life Skill: Confidence
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified by Parent ({parentName})
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs shrink-0">
                  +120 XP
                </span>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-start justify-between gap-4">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-blue-100 text-blue-600 border-2 border-white flex items-center justify-center text-[10px]">
                  📱
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    PLATFORM PRACTICE • Today, 12:15
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Daily Reading &amp; Interactive Flashcards
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Duration: 24 mins • Device: iPadOS
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-600 shrink-0">
                  Completed
                </span>
              </div>

              {/* Event 3 */}
              <div className="relative flex items-start justify-between gap-4">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-amber-100 text-amber-600 border-2 border-white flex items-center justify-center text-[10px]">
                  ⭐
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    CHALLENGE COMPLETION • Yesterday, 17:00
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Budget Boss Weekly Allowance
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Life Skill: Financial Literacy
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified by Parent
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    1.5X BOOST
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                    +150 XP
                  </span>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative flex items-start justify-between gap-4">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-purple-100 text-purple-600 border-2 border-white flex items-center justify-center text-[10px]">
                  🏆
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    MILESTONE ACHIEVED • 14 Jan 2025
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Level 4 Confidence Badge Unlocked
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Self-Expression Milestone Tier IV
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs shrink-0">
                  +100 Bonus XP
                </span>
              </div>

              {/* Event 5 */}
              <div className="relative flex items-start justify-between gap-4">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-slate-100 text-slate-600 border-2 border-white flex items-center justify-center text-[10px]">
                  ⏳
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    CHALLENGE STARTED • 13 Jan 2025
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Story Weavers Team Tale
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Life Skill: Creativity &amp; Teamwork • Step 4 in progress
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500 shrink-0">
                  In Progress
                </span>
              </div>

              {/* Event 6 */}
              <div className="relative flex items-start justify-between gap-4">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-teal-100 text-teal-600 border-2 border-white flex items-center justify-center text-[10px]">
                  🧩
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    PROBLEM SOLVING QUIZ • 12 Jan 2025
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Logic Patterns &amp; Shapes
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Score: 100% (5/5 Correct)
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs shrink-0">
                  +80 XP
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: CHALLENGES 10 ── */}
      {activeTab === 'challenges' && (
        <div className="flex flex-col gap-6">
          {/* Top 5 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">TOTAL ASSIGNED</span>
              <p className="text-2xl font-black text-slate-900 tracking-tight">10</p>
            </div>
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">COMPLETED</span>
              <p className="text-2xl font-black text-emerald-600 tracking-tight">8</p>
            </div>
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">IN PROGRESS</span>
              <p className="text-2xl font-black text-sky-600 tracking-tight">2</p>
            </div>
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">COMPLETION RATE</span>
              <p className="text-2xl font-black text-slate-900 tracking-tight">80%</p>
            </div>
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">POINTS EARNED</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">1,250</span>
                <span className="text-xs font-bold text-slate-500">XP</span>
              </div>
            </div>
          </div>

          {/* Split View: Challenges list on Left, Focus Area card on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 cols: Challenges List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Filter controls */}
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
                {/* Challenge 1 */}
                <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🗣️</span>
                      <h4 className="text-sm font-bold text-slate-900">
                        Public Speaking at Dinner Table
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#B83806] text-[10px] font-bold">
                        Confidence
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        +120 XP
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    1-minute dinner discussion presentation with parent sign-off
                  </p>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Verified by {parentName} • 12 Jan 2025
                    </span>
                    <button type="button" className="font-bold text-[#B83806] hover:underline cursor-pointer">
                      View Submission
                    </button>
                  </div>
                </div>

                {/* Challenge 2 — Focus Area with Boost */}
                <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">💰</span>
                        <h4 className="text-sm font-bold text-slate-900">
                          Budget Boss Weekly Allowance
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
                          Financial Literacy
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                        ⚡ 1.5x Boost
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        +150 XP
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Track daily savings and expenses for 7 consecutive days; upload ledger
                  </p>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Verified by {parentName} • 08 Jan 2025
                    </span>
                    <button type="button" className="font-bold text-[#B83806] hover:underline cursor-pointer">
                      View Ledger Proof
                    </button>
                  </div>
                </div>

                {/* Challenge 3 — In Progress */}
                <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">👥</span>
                      <h4 className="text-sm font-bold text-slate-900">
                        Story Weavers Team Tale
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                        Creativity &amp; Teamwork
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">
                        • In Progress
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        +90 XP
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Collaborate with peer on interactive 6-part illustrated narrative
                  </p>
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

                {/* Challenge 4 — In Progress */}
                <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🧪</span>
                      <h4 className="text-sm font-bold text-slate-900">
                        Kitchen Science Problem Solving
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
                        Problem Solving
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">
                        • In Progress
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        +130 XP
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Hypothesize and record chemical reactions with household ingredients
                  </p>
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

                {/* Challenge 5 */}
                <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-2xs">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">😊</span>
                      <h4 className="text-sm font-bold text-slate-900">
                        Daily Gratitude &amp; Reflection
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 text-[10px] font-bold">
                        Emotional Intelligence
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        +60 XP
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Log 3 gratitude moments daily for five consecutive school days
                  </p>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Verified by {parentName} • 05 Jan 2025
                    </span>
                    <button type="button" className="font-bold text-[#B83806] hover:underline cursor-pointer">
                      View Reflection Log
                    </button>
                  </div>
                </div>
              </div>

              {/* Pagination footer */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-medium">
                <span>Showing 1–5 of 10 challenges</span>
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

            {/* Right col: Parent Focus Area Boost Card */}
            <div>
              <div className="bg-[#FFFBF2] rounded-3xl border border-amber-200/80 p-5 shadow-xs sticky top-24">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        Parent Focus Area Boost
                      </h4>
                      <p className="text-[11px] font-bold text-amber-700 mt-0.5">
                        ⚡ 1.5x Multiplier Active
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    Active
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {parentName} selected <strong>Financial Literacy</strong> as Emma&apos;s primary growth priority. Completed quests in this area earn accelerated XP.
                </p>

                <div className="pt-3 border-t border-amber-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Focus Progress</span>
                    <span className="font-bold text-amber-800">2 of 3 Completed</span>
                  </div>
                  <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '66%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: LIFE SKILLS ── */}
      {activeTab === 'skills' && (
        <div className="flex flex-col gap-6">
          {/* If an assessment is selected, show Assessment Details View matching design */}
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
                              className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer ${item.id === selectedAssessmentId ? 'bg-orange-50/60 font-bold text-[#B83806]' : 'text-slate-700 font-medium'
                                }`}
                            >
                              <span>{item.skillName}</span>
                              <span className="text-[11px] font-bold text-slate-500">{item.overallScore}%</span>
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
                      {/* Card Header */}
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

                      {/* Overall Score Box */}
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

                      {/* Assessment Type */}
                      <div className="mt-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          ASSESSMENT TYPE
                        </span>
                        <p className="text-sm font-black text-slate-900 mt-1">
                          {assessment.skillName}
                        </p>
                      </div>

                      {/* Date Completed */}
                      <div className="flex items-center justify-between py-2.5 border-b border-slate-100 mt-2">
                        <span className="text-xs text-slate-500 font-medium">Date Completed</span>
                        <span className="text-xs font-bold text-slate-800">{assessment.completedDate}</span>
                      </div>

                      {/* Completed By */}
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

                      {/* Two Metric Tiles */}
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

                      {/* Status */}
                      <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-100">
                        <span className="text-xs text-slate-500 font-medium">Status</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {assessment.status}
                        </span>
                      </div>

                      {/* Retake Eligibility */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-500 font-medium">Retake Eligibility</span>
                        <span className="text-xs font-bold text-slate-800">{assessment.retakeEligibility}</span>
                      </div>
                    </div>

                    {/* Right Card: Question Responses */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-2xs flex flex-col">
                      {/* Card Header */}
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

                      {/* Questions List */}
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

                      {/* Parent Note & Evaluation Callout */}
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
              {/* Top 5 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">SKILLS TRACKED</span>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">5 of 5</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Core Competencies Active</p>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">OVERALL MASTERY</span>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">78%</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Average Progress</p>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">TOP STRENGTH</span>
                  <p className="text-sm font-bold text-slate-900 tracking-tight truncate mt-1">Problem Solving</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">● 85% Mastery Level</p>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">FOCUS AREA</span>
                  <p className="text-sm font-bold text-slate-900 tracking-tight truncate mt-1">Financial Literacy</p>
                  <p className="text-[10px] text-amber-700 font-bold mt-1">Parent Designated (1.5x)</p>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">TOTAL SKILL XP</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">2,320</span>
                    <span className="text-xs font-bold text-slate-500">XP</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Across 18 tracked items</p>
                </div>
              </div>

              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Life Skills Mastery &amp; Assessment
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Validated competency benchmarks aligned with Grade 3 developmental milestones.
                  </p>
                </div>
                <div className="relative self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsCompetencyDropdownOpen(!isCompetencyDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                  >
                    <span>FILTER: All 5 Competencies</span>
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

              {/* Skill Competency Cards */}
              <div className="flex flex-col gap-4">
                {/* Skill 1: Problem Solving */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-black text-slate-900">1. Problem Solving</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black tracking-wide">
                          STRONG
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Analytical breakdown, root-cause inquiry, and deductive reasoning
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900">85%</p>
                      <p className="text-[10px] text-slate-400 font-bold">710 XP Earned</p>
                    </div>
                  </div>
                  {/* Thick progress bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '85%' }} />
                  </div>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      ✓ 5 Challenges Completed • Milestones: Logic puzzles, independent deduction
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('problem-solving')}
                      className="font-bold text-[#B83806] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Skill 2: Financial Literacy */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-lg font-black text-slate-900">2. Financial Literacy</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black tracking-wide">
                          STRONG
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                          ★ Parent Focus Area (1.5x Boost)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Resource allocation, basic budgeting, needs vs. wants valuation
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900">80%</p>
                      <p className="text-[10px] text-slate-400 font-bold">550 XP Earned</p>
                    </div>
                  </div>
                  {/* Thick progress bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '80%' }} />
                  </div>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      ✓ 4 Challenges Completed • Milestones: Weekly budgeting, expense tracking
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('financial-literacy')}
                      className="font-bold text-[#B83806] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Skill 3: Confidence & Expression */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-black text-slate-900">3. Confidence &amp; Expression</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black tracking-wide">
                          GOOD
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Articulate self-expression, empathetic listening, and public discourse
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900">72%</p>
                      <p className="text-[10px] text-slate-400 font-bold">520 XP Earned</p>
                    </div>
                  </div>
                  {/* Thick progress bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '72%' }} />
                  </div>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      ✓ 4 Challenges Completed • Milestones: Public speaking, dinner discussions
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('confidence-expression')}
                      className="font-bold text-[#B83806] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Skill 4: Creativity & Teamwork */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-black text-slate-900">4. Creativity &amp; Teamwork</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black tracking-wide">
                          DEVELOPING
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Cooperative play, imaginative synthesis, and group ideation
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900">65%</p>
                      <p className="text-[10px] text-slate-400 font-bold">360 XP Earned</p>
                    </div>
                  </div>
                  {/* Thick progress bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '65%' }} />
                  </div>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      ✓ 3 Challenges Completed • Milestones: Peer storytelling, collaborative drawing
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('creativity-teamwork')}
                      className="font-bold text-[#B83806] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Assessment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Skill 5: Leadership & Decision Making */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-black text-slate-900">5. Leadership &amp; Decision Making</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black tracking-wide">
                          DEVELOPING
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Autonomy in task sequencing, initiative, and ethical choices
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900">60%</p>
                      <p className="text-[10px] text-slate-400 font-bold">180 XP Earned</p>
                    </div>
                  </div>
                  {/* Thick progress bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden my-4">
                    <div className="h-full bg-[#B83806] rounded-full" style={{ width: '60%' }} />
                  </div>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      ✓ 2 Challenges Completed • Milestones: Group initiative, task scheduling
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAssessmentId('leadership-decision')}
                      className="font-bold text-[#B83806] hover:underline flex items-center gap-1 cursor-pointer"
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
    </div>
  );
};

export default AdminChildProfilePage;
