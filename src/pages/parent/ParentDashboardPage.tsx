import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ListChecks,
  Award,
  Settings,
  Lock,
  ArrowRight,
  Crown,
  LogOut,
  ArrowLeft,
  ChevronDown,
  RefreshCw,
  Star,
  Plus,
  Download,
  ChevronRight,
  Target,
  Lightbulb,
} from 'lucide-react';
import { useParent } from '../../hooks/useParent';
import { ParentProfileService } from '../../services/parentProfileService';
import { LinkChildModal } from '../../components/parent/LinkChildModal';
import { FocusAreaModal, type FocusSkill } from '../../components/parent/FocusAreaModal';

type Tab = 'home' | 'challenges' | 'certificates' | 'settings';

// ── Premium flag ──────────────────────────────────────────────────────────────
const getIsPremium = () =>
  localStorage.getItem('imole_v1_parent_premium') === 'true';

// ── Shared Header ─────────────────────────────────────────────────────────────
interface DashboardHeaderProps {
  childName: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ childName, isPremium, onUpgrade }) => (
  <div className="flex items-center justify-between px-5 pt-5 pb-3">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 overflow-hidden flex items-center justify-center text-white text-lg font-bold shadow-sm">
        {childName.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">VIEWING</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-sm font-bold text-slate-900">{childName}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
        </div>
      </div>
    </div>

    {isPremium ? (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B83806] text-white text-xs font-bold shadow-sm shadow-[#B83806]/20">
        <Crown className="w-3.5 h-3.5 text-amber-300" strokeWidth={2} />
        <span>PREMIUM</span>
      </div>
    ) : (
      <button
        type="button"
        onClick={onUpgrade}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-slate-500 text-xs font-bold hover:border-[#B83806] hover:text-[#B83806] transition-colors cursor-pointer"
      >
        <div className="w-3.5 h-3.5 rounded-full border border-slate-400 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        </div>
        <span>FREE</span>
      </button>
    )}
  </div>
);

// ── Bottom Nav ────────────────────────────────────────────────────────────────
interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home className="w-5 h-5 stroke-[1.8]" />, label: 'Home' },
    { id: 'challenges', icon: <ListChecks className="w-5 h-5 stroke-[1.8]" />, label: 'Challenges' },
    { id: 'certificates', icon: <Award className="w-5 h-5 stroke-[1.8]" />, label: 'Certificates' },
    { id: 'settings', icon: <Settings className="w-5 h-5 stroke-[1.8]" />, label: 'Settings' },
  ];
  return (
    <nav className="flex items-center justify-around px-2 py-3 bg-white border-t border-slate-100 safe-area-pb">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors cursor-pointer ${
              isActive ? 'text-[#B83806]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon}
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

// ── HOME TAB (FREE) ───────────────────────────────────────────────────────────
interface FreeHomeTabProps {
  childName: string;
  completedCount: number;
  avgScore: string;
  isLoadingProgress: boolean;
  onRefresh: () => void;
  onUpgrade: () => void;
}

const FreeHomeTab: React.FC<FreeHomeTabProps> = ({
  childName, completedCount, avgScore, isLoadingProgress, onRefresh, onUpgrade,
}) => (
  <div className="flex flex-col gap-0 flex-1 overflow-y-auto pb-4">
    <div className="grid grid-cols-2 gap-3 px-5 pt-2 pb-5">
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
        <span className="text-2xl mb-1">📚</span>
        <span className="text-2xl font-black text-slate-900">{completedCount}</span>
        <span className="text-xs font-medium text-slate-500 mt-0.5">Completed</span>
      </div>
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
        <span className="text-2xl mb-1">⭐</span>
        <span className="text-2xl font-black text-slate-900">{avgScore}</span>
        <span className="text-xs font-medium text-slate-500 mt-0.5">Avg Score</span>
      </div>
    </div>

    {/* Skill Breakdown – locked */}
    <div className="mx-5 bg-white rounded-3xl border border-slate-100 shadow-sm mb-4 overflow-hidden">
      <div className="p-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">Skill Breakdown</h3>
          <Lock className="w-4 h-4 text-slate-400 stroke-[1.8]" />
        </div>
        <div className="relative">
          <div className="flex flex-col gap-3 blur-sm pointer-events-none select-none" aria-hidden>
            {['Math & Logic', 'Basic Finance', 'Speaking & Comms'].map((name, i) => (
              <div key={name} className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-700 w-28 shrink-0">{name}</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#B83806] rounded-full" style={{ width: i === 0 ? '80%' : i === 1 ? '40%' : '65%' }} />
                </div>
                <span className="text-xs font-bold text-slate-800 w-8 text-right">--</span>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-2xl gap-2 py-4">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#B83806] stroke-[1.8]" />
            </div>
            <p className="text-sm font-bold text-slate-900">Unlock deep insights</p>
            <p className="text-xs text-slate-500 text-center max-w-[180px]">
              See {childName}&apos;s progress across every life skill
            </p>
            <button
              type="button"
              onClick={onUpgrade}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B83806] rounded-full text-white text-xs font-bold hover:bg-[#9A2F05] transition-colors cursor-pointer mt-1"
            >
              <Star className="w-3.5 h-3.5 fill-amber-300 stroke-amber-300" />
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="mx-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
        <button type="button" onClick={onRefresh} disabled={isLoadingProgress} className="text-slate-400 hover:text-[#B83806] transition-colors cursor-pointer">
          <RefreshCw className={`w-4 h-4 ${isLoadingProgress ? 'animate-spin text-[#B83806]' : ''}`} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <span className="text-emerald-600 text-sm font-black">✓</span>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">Completed &quot;Fractions are Fun&quot;</p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Today, 2:30 PM</p>
        </div>
      </div>
    </div>
  </div>
);

// ── HOME TAB (PREMIUM) ────────────────────────────────────────────────────────
interface SkillRow { name: string; pct: number; badge: string | null; badgeColor: string; barColor: string; }

const PREMIUM_SKILLS: SkillRow[] = [
  { name: 'Math & Logic', pct: 80, badge: 'Strong', badgeColor: 'bg-emerald-50 text-emerald-700', barColor: 'bg-[#B83806]' },
  { name: 'Basic Finance', pct: 40, badge: 'Practice', badgeColor: 'bg-amber-50 text-amber-700', barColor: 'bg-blue-500' },
  { name: 'Speaking & Comms', pct: 65, badge: null, badgeColor: '', barColor: 'bg-emerald-500' },
];

interface PremiumHomeTabProps {
  childName: string;
  completedCount: number;
  avgScore: string;
  isLoadingProgress: boolean;
  onRefresh: () => void;
  currentFocus: string;
  onOpenFocusModal: () => void;
}

const PremiumHomeTab: React.FC<PremiumHomeTabProps> = ({
  childName, completedCount, avgScore, isLoadingProgress, onRefresh, currentFocus, onOpenFocusModal,
}) => (
  <div className="flex flex-col gap-0 flex-1 overflow-y-auto pb-4">
    {/* 3 stat cards */}
    <div className="grid grid-cols-3 gap-3 px-5 pt-2 pb-5">
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center">
        <span className="text-xl mb-1">📚</span>
        <span className="text-xl font-black text-slate-900">{completedCount}</span>
        <span className="text-[10px] font-medium text-slate-500 mt-0.5">Done</span>
      </div>
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center">
        <span className="text-xl mb-1">⭐</span>
        <span className="text-xl font-black text-slate-900">{avgScore}</span>
        <span className="text-[10px] font-medium text-slate-500 mt-0.5">Avg</span>
      </div>
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center">
        <span className="text-xl mb-1">🏆</span>
        <span className="text-xl font-black text-slate-900">#8</span>
        <span className="text-[10px] font-medium text-slate-500 mt-0.5">Rank</span>
      </div>
    </div>

    {/* Skill Breakdown – unlocked */}
    <div className="mx-5 bg-white rounded-3xl border border-slate-100 shadow-sm mb-4 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-slate-900">Skill Breakdown</h3>
        <button type="button" onClick={onRefresh} disabled={isLoadingProgress} className="text-slate-400 hover:text-[#B83806] transition-colors cursor-pointer">
          <RefreshCw className={`w-4 h-4 ${isLoadingProgress ? 'animate-spin text-[#B83806]' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {PREMIUM_SKILLS.map((skill) => (
          <button key={skill.name} type="button" className="w-full text-left cursor-pointer group">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900">{skill.name}</span>
                {skill.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${skill.badgeColor}`}>
                    {skill.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-700">{skill.pct}%</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
              </div>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${skill.barColor} rounded-full transition-all`} style={{ width: `${skill.pct}%` }} />
            </div>
          </button>
        ))}
      </div>

      {/* Set Focus Area button */}
      <button
        type="button"
        onClick={onOpenFocusModal}
        className="mt-5 w-full py-3 rounded-2xl bg-[#FFF1ED] text-[#B83806] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#FBCBB7] transition-colors cursor-pointer"
      >
        <Target className="w-4 h-4 stroke-[1.8]" />
        Set a Focus Area for {childName}
      </button>
    </div>

    {/* Current Focus row */}
    <div className="mx-5 bg-white rounded-3xl border border-slate-100 shadow-sm px-4 py-3.5 flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-full bg-[#FFF1ED] flex items-center justify-center shrink-0">
        <Target className="w-4 h-4 text-[#B83806] stroke-[1.8]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CURRENT FOCUS</p>
        <p className="text-sm font-bold text-slate-900 mt-0.5">{currentFocus}</p>
      </div>
      <button
        type="button"
        onClick={onOpenFocusModal}
        className="text-sm font-bold text-[#B83806] hover:underline cursor-pointer shrink-0"
      >
        Change
      </button>
    </div>
  </div>
);

// ── CHALLENGES TAB (FREE) ─────────────────────────────────────────────────────
interface FreeChallengesTabProps {
  childName: string;
  challengeHistory: { _id: string; question?: string; isCorrect: boolean; submittedAt: string }[];
  onUpgrade: () => void;
}

const MOCK_FREE_CHALLENGES = [
  { _id: 'c1', question: 'Quick Change', isCorrect: false, submittedAt: '2026-06-15' },
  { _id: 'c2', question: 'Save ₦15,000', isCorrect: true, submittedAt: '2026-06-14' },
  { _id: 'c3', question: 'Budget Planning', isCorrect: true, submittedAt: '2026-06-13' },
  { _id: 'c4', question: 'Team Cooperation', isCorrect: false, submittedAt: '2026-06-12' },
  { _id: 'c5', question: 'Healthy Choices', isCorrect: true, submittedAt: '2026-06-11' },
  { _id: 'c6', question: 'Problem Solving', isCorrect: false, submittedAt: '2026-06-10' },
];

const FreeChallengesTab: React.FC<FreeChallengesTabProps> = ({ childName, challengeHistory, onUpgrade }) => {
  const items = challengeHistory.length > 0
    ? challengeHistory.map((c) => ({ ...c, question: c.question ?? 'Challenge' }))
    : MOCK_FREE_CHALLENGES;

  const totalCount = items.length;
  const correctCount = items.filter((c) => c.isCorrect).length;
  const wrongCount = items.filter((c) => !c.isCorrect).length;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto pb-4">
      <div className="px-5 pt-2 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900">Challenges</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{childName}&apos;s challenge activity</p>
      </div>
      <div className="flex gap-3 px-5 mb-4">
        {[{ label: 'TOTAL', value: totalCount, color: 'text-slate-900' }, { label: 'CORRECT', value: correctCount, color: 'text-emerald-600' }, { label: 'WRONG', value: wrongCount, color: 'text-rose-600' }].map(({ label, value, color }) => (
          <div key={label} className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm py-3 flex flex-col items-center">
            <span className={`text-lg font-black ${color}`}>{value}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 px-5 mb-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div>
                <p className="text-sm font-bold text-slate-900">{item.question}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">{item.submittedAt}</p>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${item.isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
                {item.isCorrect ? 'Correct' : 'Wrong'}
              </span>
            </div>
            <div className="border-t border-slate-50 px-4 py-2.5 flex items-center gap-2 text-slate-400">
              <Lock className="w-3.5 h-3.5 stroke-[2]" />
              <span className="text-xs font-medium">Upgrade to view answer</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#B83806] rounded-3xl p-5 mx-5 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">PREMIUM</span>
        </div>
        <h3 className="text-white font-bold text-base mb-1">See every answer &amp; correction</h3>
        <p className="text-white/80 text-xs font-medium mb-4">Learn exactly where {childName} struggles.</p>
        <button type="button" onClick={onUpgrade} className="w-full py-3 bg-white rounded-2xl text-[#B83806] font-bold text-sm hover:bg-slate-50 active:scale-[0.99] transition-all cursor-pointer">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

// ── CHALLENGES TAB (PREMIUM) ──────────────────────────────────────────────────
type ChallengeFilter = 'all' | 'correct' | 'wrong';

interface PremiumChallenge {
  _id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isCorrect: boolean;
  date: string;
  question: string;
  childAnswer: string;
  correctAnswer: string;
  tip?: string;
}

const MOCK_PREMIUM_CHALLENGES: PremiumChallenge[] = [
  {
    _id: 'p1', title: 'Quick Change', difficulty: 'Medium', isCorrect: false,
    date: 'June 15, 2026',
    question: 'You buy 3 biscuits at ₦150 each. You pay ₦500. What is your change?',
    childAnswer: '₦50 change, 85% spent',
    correctAnswer: '₦50 change, 90% spent',
    tip: 'Always calculate total cost first: 3 × ₦150 = ₦450.',
  },
  {
    _id: 'p2', title: 'Save ₦15,000', difficulty: 'Hard', isCorrect: true,
    date: 'June 14, 2026',
    question: 'You earn ₦2,000 weekly. Plan to save ₦15,000 in 8 weeks.',
    childAnswer: '₦16,000 saved',
    correctAnswer: '₦16,000 saved',
  },
  {
    _id: 'p3', title: 'Budget Planning', difficulty: 'Easy', isCorrect: true,
    date: 'June 13, 2026',
    question: 'You have ₦5,000. Allocate 40% to food, 30% to transport, save the rest.',
    childAnswer: '₦1,500 saved',
    correctAnswer: '₦1,500 saved',
  },
  {
    _id: 'p4', title: 'Team Cooperation', difficulty: 'Medium', isCorrect: false,
    date: 'June 12, 2026',
    question: 'Your group of 4 must share ₦2,400 equally. How much per person?',
    childAnswer: '₦500',
    correctAnswer: '₦600',
    tip: 'Divide total evenly: ₦2,400 ÷ 4 = ₦600.',
  },
  {
    _id: 'p5', title: 'Healthy Choices', difficulty: 'Hard', isCorrect: true,
    date: 'June 11, 2026',
    question: 'You have ₦3,000 for lunch this week (5 days). What is your daily budget?',
    childAnswer: '₦600 per day',
    correctAnswer: '₦600 per day',
  },
  {
    _id: 'p6', title: 'Problem Solving', difficulty: 'Easy', isCorrect: false,
    date: 'June 10, 2026',
    question: 'A pencil costs ₦80. How many can you buy with ₦500?',
    childAnswer: '7 pencils',
    correctAnswer: '6 pencils',
    tip: 'Floor division: ₦500 ÷ ₦80 = 6.25 → 6 pencils.',
  },
];

const difficultyStyle: Record<string, string> = {
  Easy: 'bg-emerald-50 text-emerald-700',
  Medium: 'bg-amber-50 text-amber-600',
  Hard: 'bg-rose-50 text-rose-600',
};

interface PremiumChallengesTabProps { childName: string; }

const PremiumChallengesTab: React.FC<PremiumChallengesTabProps> = ({ childName }) => {
  const [filter, setFilter] = useState<ChallengeFilter>('all');
  const items = filter === 'all' ? MOCK_PREMIUM_CHALLENGES
    : filter === 'correct' ? MOCK_PREMIUM_CHALLENGES.filter((c) => c.isCorrect)
    : MOCK_PREMIUM_CHALLENGES.filter((c) => !c.isCorrect);

  const total = MOCK_PREMIUM_CHALLENGES.length;
  const correct = MOCK_PREMIUM_CHALLENGES.filter((c) => c.isCorrect).length;
  const wrong = MOCK_PREMIUM_CHALLENGES.filter((c) => !c.isCorrect).length;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto pb-4">
      <div className="px-5 pt-2 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900">All Challenges</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Full history &amp; corrections</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-5 mb-4">
        {([['all', `All (${total})`], ['correct', `Correct (${correct})`], ['wrong', `Wrong (${wrong})`]] as [ChallengeFilter, string][]).map(([f, label]) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === f ? 'bg-[#B83806] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#B83806] hover:text-[#B83806]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Challenge cards */}
      <div className="flex flex-col gap-4 px-5 pb-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="flex items-start justify-between px-4 pt-4 pb-3">
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">{item.title}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${difficultyStyle[item.difficulty]}`}>
                    {item.difficulty}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
                </div>
              </div>
              <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ml-2 ${
                item.isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
              }`}>
                {item.isCorrect ? '✓' : '✕'} {item.isCorrect ? 'Correct' : 'Wrong'}
              </span>
            </div>

            {/* Question text */}
            <div className="px-4 pb-3">
              <p className="text-xs text-slate-700 leading-relaxed">{item.question}</p>
            </div>

            {/* Child's answer */}
            <div className="mx-4 mb-2 bg-slate-50 rounded-2xl px-3.5 py-2.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Child&apos;s Answer:</p>
              <p className={`text-xs font-semibold ${item.isCorrect ? 'text-slate-800' : 'text-rose-500 line-through'}`}>
                &quot;{item.childAnswer}&quot;
              </p>
            </div>

            {/* Correct answer */}
            <div className="mx-4 mb-2 bg-emerald-50 rounded-2xl px-3.5 py-2.5">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide mb-1">Correct Answer:</p>
              <p className="text-xs font-semibold text-emerald-800">&quot;{item.correctAnswer}&quot;</p>
            </div>

            {/* Tip */}
            {item.tip && (
              <div className="mx-4 mb-4 bg-amber-50 rounded-2xl px-3.5 py-2.5 flex items-start gap-2.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 stroke-[1.8] shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">{item.tip}</p>
              </div>
            )}

            {!item.tip && <div className="pb-2" />}
          </div>
        ))}
      </div>
      {/* Suppress unused var */}
      <span className="hidden">{childName}</span>
    </div>
  );
};

// ── CERTIFICATES TAB (FREE) ───────────────────────────────────────────────────
interface FreeCertItem { _id: string; title: string; skillId?: { name: string }; issuedAt: string; }

const MOCK_FREE_CERTS = [
  { _id: 'cert1', title: 'Mental Math Master', skillName: 'Mental Math', issuedAt: '2023-10-12', emoji: '🧮', locked: false },
  { _id: 'cert2', title: 'Finance Basics', skillName: 'Financial Literacy', issuedAt: '2023-10-08', emoji: '💰', locked: true },
  { _id: 'cert3', title: 'Word Wizard', skillName: 'Language Arts', issuedAt: '2023-12-01', emoji: '✏️', locked: true },
];
const TOTAL_CERTS = 5; const EARNED_CERTS = 3;

interface FreeCertificatesTabProps { childName: string; certificates: FreeCertItem[]; onUpgrade: () => void; }

const FreeCertificatesTab: React.FC<FreeCertificatesTabProps> = ({ childName, certificates, onUpgrade }) => {
  const hasBackend = certificates.length > 0;
  const earnedCount = hasBackend ? certificates.length : EARNED_CERTS;
  const progressPct = Math.round((earnedCount / TOTAL_CERTS) * 100);
  const unlockedMock = MOCK_FREE_CERTS.filter((c) => !c.locked);
  const lockedCount = hasBackend ? 0 : MOCK_FREE_CERTS.filter((c) => c.locked).length;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto pb-4">
      <div className="px-5 pt-2 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900">Certificates</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{childName}&apos;s earned credentials</p>
      </div>
      <div className="mx-5 mb-4 bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-3">
            <Award className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-sm font-bold text-slate-900">{earnedCount} of {TOTAL_CERTS} certificates earned</p>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Unlocked certs */}
      <div className="flex flex-col gap-3 px-5 mb-4">
        {(hasBackend ? certificates : unlockedMock).map((cert) => {
          const title = 'title' in cert ? cert.title : '';
          const emoji = 'emoji' in cert ? (cert as typeof MOCK_FREE_CERTS[0]).emoji : '🏆';
          const dateStr = 'issuedAt' in cert ? cert.issuedAt : '';
          return (
            <div key={cert._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-2xl">{emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{title}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </p>
              </div>
              <button type="button" className="w-9 h-9 rounded-full bg-[#FFF1ED] flex items-center justify-center text-[#B83806] hover:bg-[#FBCBB7] transition-colors cursor-pointer shrink-0" aria-label="Download">
                <Download className="w-4 h-4 stroke-[1.8]" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Locked overlay */}
      {!hasBackend && lockedCount > 0 && (
        <div className="mx-5 mb-4 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="relative px-4 py-4" style={{ minHeight: '180px' }}>
            <div className="blur-sm pointer-events-none select-none flex flex-col gap-3" aria-hidden>
              {MOCK_FREE_CERTS.filter((c) => c.locked).map((cert) => (
                <div key={cert._id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-2xl">{cert.emoji}</div>
                  <div><p className="text-sm font-bold text-slate-900">{cert.title}</p></div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl px-6">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#B83806] stroke-[1.8]" />
              </div>
              <p className="text-sm font-bold text-slate-800">{lockedCount} more locked</p>
              <button type="button" onClick={onUpgrade} className="px-6 py-2.5 bg-[#B83806] rounded-full text-white text-xs font-bold hover:bg-[#9A2F05] transition-colors cursor-pointer">
                Unlock with Premium
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── CERTIFICATES TAB (PREMIUM) ────────────────────────────────────────────────
const MOCK_PREMIUM_CERTS = [
  { _id: 'cert1', title: 'Mental Math Master', skillName: 'Mental Math', date: 'Oct 12, 2023', emoji: '🧮', locked: false, lockReason: null },
  { _id: 'cert2', title: 'Finance Basics', skillName: 'Financial Literacy', date: 'Nov 05, 2023', emoji: '💰', locked: false, lockReason: null },
  { _id: 'cert3', title: 'Word Wizard', skillName: 'Language Arts', date: 'Dec 01, 2023', emoji: '✏️', locked: false, lockReason: null },
  { _id: 'cert4', title: 'Public Speaking', skillName: 'Speaking & Comms', date: '', emoji: '🗣️', locked: true, lockReason: 'Level 5 required' },
  { _id: 'cert5', title: 'Science Explorer', skillName: 'Science', date: '', emoji: '🔬', locked: true, lockReason: 'Level 7 required' },
];

interface PremiumCertificatesTabProps { childName: string; }

const PremiumCertificatesTab: React.FC<PremiumCertificatesTabProps> = ({ childName }) => {
  const earned = MOCK_PREMIUM_CERTS.filter((c) => !c.locked).length;
  const total = MOCK_PREMIUM_CERTS.length;
  const pct = Math.round((earned / total) * 100);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto pb-4">
      <div className="px-5 pt-2 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900">Certificates</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Tap any to view full certificate</p>
      </div>

      {/* Progress card */}
      <div className="mx-5 mb-4 bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-3">
            <Award className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-sm font-bold text-slate-900">{earned} of {total} certificates earned</p>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Cert list */}
      <div className="flex flex-col gap-3 px-5">
        {MOCK_PREMIUM_CERTS.map((cert) => (
          cert.locked ? (
            <div key={cert._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 opacity-70">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 text-2xl grayscale">{cert.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-500 truncate">{cert.title}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Locked ({cert.lockReason})</p>
              </div>
              <Lock className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
            </div>
          ) : (
            <button key={cert._id} type="button" className="w-full text-left bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 hover:bg-slate-50 active:scale-[0.99] transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-2xl">{cert.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{cert.title}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">{cert.date}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2] shrink-0" />
            </button>
          )
        ))}
      </div>
      <span className="hidden">{childName}</span>
    </div>
  );
};

// ── SETTINGS TAB ──────────────────────────────────────────────────────────────
interface SettingsTabProps {
  childName: string;
  isPremium: boolean;
  onLogout: () => void;
  onBackToChild: () => void;
  onChangePin: () => void;
  onUpgrade: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ childName, isPremium, onLogout, onBackToChild, onChangePin, onUpgrade }) => (
  <div className="flex flex-col flex-1 overflow-y-auto pb-4">
    <div className="px-5 pt-2 pb-4">
      <h2 className="text-xl font-extrabold text-slate-900">Settings</h2>
      <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your account</p>
    </div>

    {/* Premium upgrade card – hide if already premium */}
    {!isPremium && (
      <button
        type="button"
        onClick={onUpgrade}
        className="w-full text-left bg-[#B83806] rounded-3xl mx-5 p-5 mb-5 cursor-pointer hover:bg-[#9A2F05] transition-colors active:scale-[0.99]"
        style={{ width: 'calc(100% - 2.5rem)' }}
      >
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
            <Crown className="w-5 h-5 text-amber-300" />
          </div>
          <ArrowRight className="w-5 h-5 text-white/70 mt-1 stroke-[2]" />
        </div>
        <h3 className="text-white font-bold text-base mb-1">Upgrade to Premium</h3>
        <p className="text-white/80 text-xs font-medium">Unlock deep skill insights &amp; full history.</p>
      </button>
    )}

    {/* Premium active badge */}
    {isPremium && (
      <div className="mx-5 mb-5 bg-amber-50 border border-amber-100 rounded-3xl p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#B83806] flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5 text-amber-300" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Premium Active</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">All features unlocked for {childName}.</p>
        </div>
      </div>
    )}

    {/* Account section */}
    <div className="mx-5 mb-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">ACCOUNT</p>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <button type="button" onClick={onChangePin} className="w-full flex items-center justify-between px-4 py-4 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFF1ED] flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#B83806] stroke-[1.8]" />
            </div>
            <span className="text-sm font-semibold text-slate-900">Change PIN</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 stroke-[2]" />
        </button>
        <button type="button" onClick={onBackToChild} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-[#FFF1ED] flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-[#B83806] stroke-[1.8]" />
          </div>
          <span className="text-sm font-semibold text-slate-900">Back to Child App</span>
        </button>
      </div>
    </div>

    {/* Viewing pill */}
    <div className="mx-5 mb-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">VIEWING</p>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-sm font-bold">
          {childName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-slate-900">{childName}</span>
      </div>
    </div>

    <div className="mx-5 mt-2">
      <button type="button" onClick={onLogout} className="w-full py-4 rounded-2xl border-2 border-rose-200 text-rose-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-rose-50 active:scale-[0.99] transition-all cursor-pointer">
        <LogOut className="w-4 h-4 stroke-[2]" />
        <span>Logout</span>
      </button>
    </div>
  </div>
);

// ── MAIN DASHBOARD PAGE ───────────────────────────────────────────────────────
export const ParentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [isPremium] = useState<boolean>(getIsPremium);
  const [currentFocus, setCurrentFocus] = useState<string>(
    () => localStorage.getItem('imole_v1_parent_focus') || 'Basic Finance'
  );

  const {
    selectedChild,
    children,
    progressData,
    certificates,
    challengeHistory,
    isLoadingProgress,
    refreshProgress,
    logout,
  } = useParent();

  const childName = progressData?.child?.name || selectedChild?.name || 'Tobi Adeyemi';

  const backendCompleted = progressData?.skills?.reduce((acc, s) => acc + (s.challengesCompleted || 0), 0);
  const completedCount = backendCompleted && backendCompleted > 0 ? backendCompleted : 12;
  const totalPoints = progressData?.skills?.reduce((acc, s) => acc + (s.score || 0), 0);
  const avgScore = completedCount > 0
    ? ((totalPoints || completedCount * 8) / completedCount / 2).toFixed(1)
    : '4.2';

  const handleLogout = () => { logout(); ParentProfileService.resetProfile(); navigate('/parent/auth'); };
  const handleUpgrade = () => navigate('/parent/premium');

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none max-w-sm mx-auto">
      <DashboardHeader childName={childName} isPremium={isPremium} onUpgrade={handleUpgrade} />

      {/* Link child banner */}
      {children.length === 0 && (
        <div className="mx-5 mb-3 bg-[#FFF1ED] border border-[#FBCBB7] rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900">Link Your Child&apos;s Device</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Use the 6-character code from child&apos;s Settings</p>
          </div>
          <button type="button" onClick={() => setIsLinkModalOpen(true)} className="shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#B83806] text-white text-xs font-bold hover:bg-[#9A2F05] transition-colors cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Link
          </button>
        </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'home' && (isPremium
          ? (
            <PremiumHomeTab
              childName={childName}
              completedCount={completedCount}
              avgScore={avgScore}
              isLoadingProgress={isLoadingProgress}
              onRefresh={refreshProgress}
              currentFocus={currentFocus}
              onOpenFocusModal={() => setIsFocusModalOpen(true)}
            />
          )
          : <FreeHomeTab childName={childName} completedCount={completedCount} avgScore={avgScore} isLoadingProgress={isLoadingProgress} onRefresh={refreshProgress} onUpgrade={handleUpgrade} />
        )}
        {activeTab === 'challenges' && (isPremium
          ? <PremiumChallengesTab childName={childName} />
          : <FreeChallengesTab childName={childName} challengeHistory={challengeHistory} onUpgrade={handleUpgrade} />
        )}
        {activeTab === 'certificates' && (isPremium
          ? <PremiumCertificatesTab childName={childName} />
          : <FreeCertificatesTab childName={childName} certificates={certificates} onUpgrade={handleUpgrade} />
        )}
        {activeTab === 'settings' && (
          <SettingsTab
            childName={childName}
            isPremium={isPremium}
            onLogout={handleLogout}
            onBackToChild={() => navigate('/child/dashboard')}
            onChangePin={() => navigate('/parent/set-pin')}
            onUpgrade={handleUpgrade}
          />
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <LinkChildModal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} />

      {isFocusModalOpen && (
        <FocusAreaModal
          childName={childName}
          currentFocus={currentFocus}
          onClose={() => setIsFocusModalOpen(false)}
          onConfirm={(skill: FocusSkill) => {
            setCurrentFocus(skill.name);
            localStorage.setItem('imole_v1_parent_focus', skill.name);
            setIsFocusModalOpen(false);
            navigate('/parent/focus/success', { state: { skillName: skill.name, childName } });
          }}
        />
      )}
    </div>
  );
};

export default ParentDashboardPage;
