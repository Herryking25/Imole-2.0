import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  User,
  Sparkles,
  CheckCircle2,
  CreditCard,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit3,
  MoreVertical,
  ExternalLink,
  Check,
  ArrowLeft,
  X,
} from 'lucide-react';

type SettingsTab = 'overview' | 'account' | 'skills' | 'challenges' | 'subscriptions';

interface LifeSkillItem {
  code: string;
  name: string;
  description: string;
  challengesCount: number;
  status: 'Active' | 'Inactive';
  icon: string;
}

const INITIAL_LIFE_SKILLS: LifeSkillItem[] = [
  {
    code: 'SKL-FIN',
    name: 'Financial Literacy',
    description: 'Teaching fundamental budgeting, needs vs. wants, and compounding savings.',
    challengesCount: 6,
    status: 'Active',
    icon: '💰',
  },
  {
    code: 'SKL-CNF',
    name: 'Confidence',
    description: 'Building resilient self-advocacy, dinner discussions, and articulate expression.',
    challengesCount: 5,
    status: 'Active',
    icon: '⭐',
  },
  {
    code: 'SKL-PRB',
    name: 'Problem Solving',
    description: 'Critical thinking, analytical inquiry, and deductive hypothesis formulation.',
    challengesCount: 6,
    status: 'Active',
    icon: '💡',
  },
  {
    code: 'SKL-COM',
    name: 'Communication',
    description: 'Active listening, non-verbal comprehension, and structured storytelling.',
    challengesCount: 5,
    status: 'Active',
    icon: '💬',
  },
  {
    code: 'SKL-LDR',
    name: 'Leadership',
    description: 'Guiding peers, taking initiative, and ethical consensus decision making.',
    challengesCount: 4,
    status: 'Active',
    icon: '🚩',
  },
  {
    code: 'SKL-TMK',
    name: 'Teamwork',
    description: 'Cooperative project execution, sharing tasks, and collaborative problem solving.',
    challengesCount: 4,
    status: 'Active',
    icon: '👥',
  },
  {
    code: 'SKL-EMO',
    name: 'Emotional Intelligence',
    description: 'Self-regulation, recognising emotion cues in self and peers, and empathy.',
    challengesCount: 4,
    status: 'Active',
    icon: '❤️',
  },
  {
    code: 'SKL-ART',
    name: 'Creative Arts',
    description: 'Fostering imaginative self-expression, music, visual synthesis, and arts.',
    challengesCount: 3,
    status: 'Active',
    icon: '🎨',
  },
  {
    code: 'SKL-CVC',
    name: 'Civic Duty',
    description: 'Community responsibility, neighborhood care, and ethical citizenship.',
    challengesCount: 3,
    status: 'Active',
    icon: '🌍',
  },
  {
    code: 'SKL-HLT',
    name: 'Health & Hygiene',
    description: 'Physical wellbeing routines, sleep schedules, and wholesome self-care habits.',
    challengesCount: 2,
    status: 'Active',
    icon: '🩺',
  },
];

interface ChallengeItem {
  id: string;
  name: string;
  subtitle: string;
  skill: string;
  skillDotColor: string;
  points: number;
  completionRequirements: string;
  status: 'Active' | 'Inactive';
  icon: string;
}

const INITIAL_CHALLENGES: ChallengeItem[] = [
  {
    id: 'ch-1',
    name: 'Public Speaking at Dinner Table',
    subtitle: 'Family discussion presentation',
    skill: 'Confidence',
    skillDotColor: 'bg-[#F59E0B]',
    points: 120,
    completionRequirements:
      'Record 1-minute dinner discussion sharing one key daily insight with parents or siblings.',
    status: 'Active',
    icon: '🗣️',
  },
  {
    id: 'ch-2',
    name: 'Budget Boss Weekly Allowance',
    subtitle: 'Piggy bank & expense tracking',
    skill: 'Financial Literacy',
    skillDotColor: 'bg-[#D97706]',
    points: 150,
    completionRequirements:
      'Track daily savings and expenses in a ledger for 7 consecutive days; upload ledger photo.',
    status: 'Active',
    icon: '💰',
  },
  {
    id: 'ch-3',
    name: 'Story Weavers Team Tale',
    subtitle: 'Collaborative narrative relay',
    skill: 'Creativity & Teamwork',
    skillDotColor: 'bg-[#A855F7]',
    points: 90,
    completionRequirements:
      'Take turns co-creating a 3-part illustrated adventure story with siblings or friends.',
    status: 'Active',
    icon: '📖',
  },
  {
    id: 'ch-4',
    name: 'Kitchen Science Problem Solving',
    subtitle: 'Density and experiment log',
    skill: 'Problem Solving',
    skillDotColor: 'bg-[#3B82F6]',
    points: 130,
    completionRequirements:
      'Complete 3 safe kitchen science steps with parent supervision; note predictions and result.',
    status: 'Active',
    icon: '⚗️',
  },
  {
    id: 'ch-5',
    name: 'Conflict Resolution Roleplay',
    subtitle: 'Active listening & empathy',
    skill: 'Emotional Intelligence',
    skillDotColor: 'bg-[#EC4899]',
    points: 140,
    completionRequirements:
      'Practice reflective listening simulation with a partner; answer 3 short empathy prompts.',
    status: 'Active',
    icon: '🤝',
  },
  {
    id: 'ch-6',
    name: 'Civic Clean-up Neighborhood Hero',
    subtitle: 'Seasonal environmental mission',
    skill: 'Civic Duty',
    skillDotColor: 'bg-[#10B981]',
    points: 110,
    completionRequirements:
      'Organize 20 minutes of neighborhood park or pathway cleanup; upload verified photo.',
    status: 'Inactive',
    icon: '♻️',
  },
];

export const AdminSettingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as SettingsTab) || 'overview';

  const setTab = (tab: SettingsTab) => {
    if (tab === 'overview') {
      searchParams.delete('tab');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ tab });
    }
  };

  // State for Account Settings
  const [adminName, setAdminName] = useState('Admin Raheemah');
  const [adminEmail, setAdminEmail] = useState('admin@imole.com');
  const [currentPassword, setCurrentPassword] = useState('secretpassword123');
  const [newPassword, setNewPassword] = useState('');
  const [accountSaved, setAccountSaved] = useState(false);

  // State for Life Skills
  const [skillsList, setSkillsList] = useState<LifeSkillItem[]>(INITIAL_LIFE_SKILLS);
  const [skillSearch, setSkillSearch] = useState('');
  const [skillStatusFilter, setSkillStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillDesc, setNewSkillDesc] = useState('');

  // State for Challenges
  const [challengesList, setChallengesList] = useState<ChallengeItem[]>(INITIAL_CHALLENGES);
  const [challengeSearch, setChallengeSearch] = useState('');
  const [challengeSkillFilter, setChallengeSkillFilter] = useState('All');
  const [challengeStatusFilter, setChallengeStatusFilter] = useState('All');
  const [showAddChallengeModal, setShowAddChallengeModal] = useState(false);
  const [newChallengeName, setNewChallengeName] = useState('');
  const [newChallengeSkill, setNewChallengeSkill] = useState('Confidence');
  const [newChallengePoints, setNewChallengePoints] = useState(100);
  const [newChallengeReqs, setNewChallengeReqs] = useState('');

  // State for Subscription Settings
  const [freemiumMaxChildren, setFreemiumMaxChildren] = useState(1);
  const [freemiumMonthlyQuota, setFreemiumMonthlyQuota] = useState(4);
  const [premiumMaxChildren, setPremiumMaxChildren] = useState(3);
  const [premiumPriceMonthly, setPremiumPriceMonthly] = useState(9.99);
  const [premiumPriceAnnual, setPremiumPriceAnnual] = useState(99.99);
  const [subscriptionSaved, setSubscriptionSaved] = useState(false);

  // Filtered skills
  const filteredSkills = skillsList.filter((s) => {
    if (skillSearch.trim()) {
      const q = skillSearch.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q) && !s.code.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (skillStatusFilter !== 'All' && s.status !== skillStatusFilter) return false;
    return true;
  });

  // Filtered challenges
  const filteredChallenges = challengesList.filter((c) => {
    if (challengeSearch.trim()) {
      const q = challengeSearch.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.subtitle.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (challengeSkillFilter !== 'All' && c.skill !== challengeSkillFilter) return false;
    if (challengeStatusFilter !== 'All' && c.status !== challengeStatusFilter) return false;
    return true;
  });

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 3000);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const newSkill: LifeSkillItem = {
      code: `SKL-${newSkillName.slice(0, 3).toUpperCase()}`,
      name: newSkillName,
      description: newSkillDesc || 'Custom curriculum developmental competency.',
      challengesCount: 0,
      status: 'Active',
      icon: '✨',
    };
    setSkillsList([newSkill, ...skillsList]);
    setNewSkillName('');
    setNewSkillDesc('');
    setShowAddSkillModal(false);
  };

  const handleAddChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChallengeName.trim()) return;
    const newCh: ChallengeItem = {
      id: `ch-${Date.now()}`,
      name: newChallengeName,
      subtitle: `${newChallengeSkill} practice task`,
      skill: newChallengeSkill,
      skillDotColor: 'bg-[#F59E0B]',
      points: Number(newChallengePoints) || 100,
      completionRequirements: newChallengeReqs || 'Complete task and submit verification.',
      status: 'Active',
      icon: '🎯',
    };
    setChallengesList([newCh, ...challengesList]);
    setNewChallengeName('');
    setNewChallengeReqs('');
    setShowAddChallengeModal(false);
  };

  const handleSaveSubscriptions = () => {
    setSubscriptionSaved(true);
    setTimeout(() => setSubscriptionSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 text-left max-w-7xl mx-auto pb-16">
      {/* ========================================================
          1. SETTINGS OVERVIEW (When no subtab is active)
      ======================================================== */}
      {currentTab === 'overview' && (
        <>
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Manage administrative credentials, curriculum life skills, challenges, and platform subscriptions
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Account Settings */}
            <div className="bg-white rounded-2xl border border-[#EDE8E1] p-6 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-base font-bold text-[#111827]">Account Settings</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                    ACTIVE ADMIN
                  </span>
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed mb-5">
                  View and update your administrator credentials, email, password, and active security profile.
                </p>

                <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#F0EBE1] space-y-2.5 text-xs mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Admin Name:</span>
                    <span className="font-semibold text-[#111827]">{adminName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Email:</span>
                    <span className="font-semibold text-[#111827]">{adminEmail}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Password:</span>
                    <span className="font-mono text-xs tracking-wider text-[#111827]">••••••••••••</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Role &amp; Profile:</span>
                    <span className="font-bold text-[#C2410C]">Administrator</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTab('account')}
                className="w-full sm:w-auto self-end px-5 py-2.5 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Manage Account Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: Life-Skill Management */}
            <div className="bg-white rounded-2xl border border-[#EDE8E1] p-6 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-base font-bold text-[#111827]">Life-Skill Management</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F1F5F9] text-[#475569]">
                    10 Total Skills
                  </span>
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed mb-5">
                  Configure curriculum life-skills, associated descriptions, status, and linked challenges.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                    Communication (6)
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                    Confidence (5)
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                    Leadership (4)
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                    Problem Solving (7)
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                    +6 More Skills
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTab('skills')}
                className="w-full sm:w-auto self-end px-5 py-2.5 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Configure Life Skills</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3: Challenge Management */}
            <div className="bg-white rounded-2xl border border-[#EDE8E1] p-6 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-base font-bold text-[#111827]">Challenge Management</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669]">
                    42 Active
                  </span>
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed mb-5">
                  Create, edit, activate/deactivate challenges, assign point values, and set completion rules.
                </p>

                <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#F0EBE1] space-y-2.5 text-xs mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#374151]">Budget Boss: Weekly Allowance</span>
                    <span className="font-bold text-[#C2410C]">120 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#374151]">Public Speaking at Dinner Table</span>
                    <span className="font-bold text-[#C2410C]">150 pts</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTab('challenges')}
                className="w-full sm:w-auto self-end px-5 py-2.5 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Manage Challenges</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 4: Subscription Settings */}
            <div className="bg-white rounded-2xl border border-[#EDE8E1] p-6 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-base font-bold text-[#111827]">Subscription Settings</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F3FF] text-[#6D28D9]">
                    Platform Config
                  </span>
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed mb-5">
                  Configure system feature entitlements, pricing tiers, and limits for Freemium and Premium parents.
                </p>

                <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#F0EBE1] grid grid-cols-2 gap-4 text-xs mb-6">
                  <div className="border-r border-[#E5E7EB] pr-3">
                    <p className="font-bold text-[#111827] mb-1.5">Freemium Plan</p>
                    <ul className="space-y-1 text-[#6B7280] text-[11px]">
                      <li>• Max 1 child link</li>
                      <li>• Basic life-skill radar</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] mb-1.5">Premium Plan</p>
                    <ul className="space-y-1 text-[#6B7280] text-[11px]">
                      <li>• Up to 3 children</li>
                      <li>• Full radar &amp; PDF reports</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTab('subscriptions')}
                className="w-full sm:w-auto self-end px-5 py-2.5 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Configure Tiers &amp; Pricing</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ========================================================
          SUBTAB VIEWS (Breadcrumb + 4 Pills Header)
      ======================================================== */}
      {currentTab !== 'overview' && (
        <>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setTab('overview')}
              className="font-bold text-[#C2410C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
            <span className="text-[#D1D5DB]">/</span>
            <span className="font-semibold text-[#4B5563]">
              {currentTab === 'account' && 'Account Settings'}
              {currentTab === 'skills' && 'Life-Skill Management'}
              {currentTab === 'challenges' && 'Challenge Management'}
              {currentTab === 'subscriptions' && 'Subscription Settings'}
            </span>
          </div>

          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                {currentTab === 'account' && 'Account Settings'}
                {currentTab === 'skills' && 'Platform Settings & Controls'}
                {currentTab === 'challenges' && 'Challenge Management'}
                {currentTab === 'subscriptions' && 'Subscription Governance & Pricing'}
              </h1>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                {currentTab === 'account' &&
                  'Manage administrator credentials, contact information, and elevated security privileges.'}
                {currentTab === 'skills' &&
                  'Manage core developmental metrics, subscription governance, and platform security rules.'}
                {currentTab === 'challenges' &&
                  'Create, edit, and organize interactive challenges for children across core life skills.'}
                {currentTab === 'subscriptions' &&
                  'Configure system feature entitlements, pricing tiers, and limits for Freemium and Premium parents.'}
              </p>
            </div>

            {/* Action Buttons depending on tab */}
            {currentTab === 'skills' && (
              <button
                type="button"
                onClick={() => setShowAddSkillModal(true)}
                className="self-start sm:self-auto px-4 py-2 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Life Skill</span>
              </button>
            )}

            {currentTab === 'challenges' && (
              <button
                type="button"
                onClick={() => setShowAddChallengeModal(true)}
                className="self-start sm:self-auto px-4 py-2 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Challenge</span>
              </button>
            )}
          </div>

          {/* Pill Tab Bar */}
          <div className="bg-[#F3EFEA]/80 p-1 rounded-xl inline-flex self-start border border-[#EBE4DC] gap-1 overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setTab('account')}
              className={`px-4 py-2 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'account'
                  ? 'bg-white text-[#111827] font-bold shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] font-medium'
              }`}
            >
              Account Settings
            </button>
            <button
              type="button"
              onClick={() => setTab('skills')}
              className={`px-4 py-2 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'skills'
                  ? 'bg-white text-[#111827] font-bold shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] font-medium'
              }`}
            >
              Life-Skill Management
            </button>
            <button
              type="button"
              onClick={() => setTab('challenges')}
              className={`px-4 py-2 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'challenges'
                  ? 'bg-white text-[#111827] font-bold shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] font-medium'
              }`}
            >
              Challenge Management
            </button>
            <button
              type="button"
              onClick={() => setTab('subscriptions')}
              className={`px-4 py-2 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'subscriptions'
                  ? 'bg-white text-[#111827] font-bold shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] font-medium'
              }`}
            >
              Subscription Settings
            </button>
          </div>

          {/* ========================================================
              TAB 1: ACCOUNT SETTINGS VIEW (Matching media_1794266012700_13c90204.png)
          ======================================================== */}
          {currentTab === 'account' && (
            <div className="space-y-6">
              {/* Account Form Card */}
              <div className="bg-white rounded-2xl border border-[#EDE8E1] p-6 sm:p-8 shadow-xs">
                {/* Admin Profile Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-[#F3EFEA]">
                  <div className="w-14 h-14 rounded-full bg-[#78350F] text-[#FEF3C7] font-extrabold text-lg flex items-center justify-center shrink-0 shadow-xs">
                    AR
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#111827]">{adminName}</h2>
                    <p className="text-xs text-[#6B7280]">Super Administrator (Full System Privileges)</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                      Last login: Today at 08:30 AM (IP: 102.89.44.12)
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSaveAccount} className="pt-6 space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1.5">
                      Admin Name
                    </label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-[#FFFDF9] border border-[#FED7AA]/70 rounded-xl text-[#111827] font-medium focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-[#FFFDF9] border border-[#FED7AA]/70 rounded-xl text-[#111827] font-medium focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="text"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-[#FFFDF9] border border-[#FED7AA]/70 rounded-xl text-[#111827] font-medium focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Leave blank to keep unchanged"
                      className="w-full px-4 py-2.5 text-xs bg-white border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {accountSaved && (
                      <span className="text-xs font-semibold text-[#059669] flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>Account details saved successfully</span>
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-6 py-2.5 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Role Permissions Card */}
              <div className="bg-white rounded-2xl border border-[#EDE8E1] p-6 shadow-xs">
                <h3 className="text-xs font-extrabold text-[#374151] uppercase tracking-wider mb-4">
                  ROLE PERMISSIONS
                </h3>
                <div className="divide-y divide-[#F3EFEA] text-xs">
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#374151] font-medium">Manage Platform Learners &amp; Parents</span>
                    <span className="font-bold text-[#059669]">Enabled</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#374151] font-medium">Modify Life-Skills &amp; Challenges</span>
                    <span className="font-bold text-[#059669]">Enabled</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#374151] font-medium">Change Subscription Rules &amp; Pricing</span>
                    <span className="font-bold text-[#059669]">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: LIFE-SKILL MANAGEMENT VIEW (Matching media_1794266012814_46b7c6ff.jpg)
          ======================================================== */}
          {currentTab === 'skills' && (
            <div className="space-y-4">
              {/* Inner Section Header */}
              <div className="bg-white rounded-2xl border border-[#EDE8E1] p-5 sm:p-6 shadow-xs">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-[#111827]">Life-Skill Management</h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    View and manage the core life skills taught to children, update their descriptions, and assign associated challenges.
                  </p>
                </div>

                {/* Toolbar Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      placeholder="Search life skills by title, description or code..."
                      className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B7280]">Status:</span>
                    <div className="relative">
                      <select
                        value={skillStatusFilter}
                        onChange={(e) => setSkillStatusFilter(e.target.value as any)}
                        className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 pr-7 text-xs font-medium text-[#374151] cursor-pointer focus:outline-none focus:border-[#C2410C]"
                      >
                        <option value="All">All Skills</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#F3EFEA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider bg-[#FAFAF9]">
                        <th className="py-3 px-4">LIFE-SKILL NAME</th>
                        <th className="py-3 px-4">DESCRIPTION</th>
                        <th className="py-3 px-4 text-center">CHALLENGES</th>
                        <th className="py-3 px-4 text-center">STATUS</th>
                        <th className="py-3 px-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EFEA]">
                      {filteredSkills.map((skill) => (
                        <tr key={skill.code} className="hover:bg-[#FAF8F5]/80 transition-colors">
                          {/* Name + Code */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <span className="text-base">{skill.icon}</span>
                              <div>
                                <div className="font-bold text-xs text-[#111827]">
                                  {skill.name}
                                </div>
                                <div className="font-mono text-[10px] text-[#9CA3AF]">
                                  {skill.code}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Description */}
                          <td className="py-3.5 px-4 text-[#6B7280] max-w-md truncate">
                            {skill.description}
                          </td>

                          {/* Challenges */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F3EFEA] text-[#78350F]">
                              <span>{skill.challengesCount}</span>
                              <span className="text-[10px] text-[#9CA3AF]">Challenges</span>
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                skill.status === 'Active'
                                  ? 'bg-[#ECFDF5] text-[#059669]'
                                  : 'bg-[#F1F5F9] text-[#64748B]'
                              }`}
                            >
                              {skill.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                className="text-xs font-semibold text-[#374151] hover:text-[#C2410C] cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="text-[#9CA3AF] hover:text-[#111827] cursor-pointer"
                              >
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 mt-2 border-t border-[#F3EFEA] text-xs text-[#6B7280]">
                  <span className="font-medium">
                    {skillsList.filter((s) => s.status === 'Active').length} of {skillsList.length} Life Skills Active
                  </span>
                  <span className="text-[#9CA3AF] text-[11px]">
                    Changes auto-save across learner mobile apps
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: CHALLENGE MANAGEMENT VIEW (Matching media_1794266012778_d765cac3.jpg)
          ======================================================== */}
          {currentTab === 'challenges' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#EDE8E1] p-5 sm:p-6 shadow-xs">
                {/* Search & Filters Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={challengeSearch}
                      onChange={(e) => setChallengeSearch(e.target.value)}
                      placeholder="Search challenges..."
                      className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <select
                        value={challengeSkillFilter}
                        onChange={(e) => setChallengeSkillFilter(e.target.value)}
                        className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 pr-7 text-xs font-medium text-[#374151] cursor-pointer focus:outline-none focus:border-[#C2410C]"
                      >
                        <option value="All">All Life Skills</option>
                        <option value="Confidence">Confidence</option>
                        <option value="Financial Literacy">Financial Literacy</option>
                        <option value="Creativity & Teamwork">Creativity &amp; Teamwork</option>
                        <option value="Problem Solving">Problem Solving</option>
                        <option value="Emotional Intelligence">Emotional Intelligence</option>
                        <option value="Civic Duty">Civic Duty</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={challengeStatusFilter}
                        onChange={(e) => setChallengeStatusFilter(e.target.value)}
                        className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 pr-7 text-xs font-medium text-[#374151] cursor-pointer focus:outline-none focus:border-[#C2410C]"
                      >
                        <option value="All">Status: All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <span className="text-xs font-semibold text-[#6B7280] ml-2">
                      {filteredChallenges.length} Challenges listed
                    </span>
                  </div>
                </div>

                {/* Challenges Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#F3EFEA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider bg-[#FAFAF9]">
                        <th className="py-3 px-4">CHALLENGE NAME</th>
                        <th className="py-3 px-4">ASSIGNED LIFE SKILL</th>
                        <th className="py-3 px-4 text-center">POINTS</th>
                        <th className="py-3 px-4">COMPLETION REQUIREMENTS</th>
                        <th className="py-3 px-4 text-center">STATUS</th>
                        <th className="py-3 px-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EFEA]">
                      {filteredChallenges.map((ch) => (
                        <tr key={ch.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                          {/* Name + Subtitle */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <span className="text-base">{ch.icon}</span>
                              <div>
                                <div className="font-bold text-xs text-[#111827]">{ch.name}</div>
                                <div className="text-[11px] text-[#9CA3AF]">{ch.subtitle}</div>
                              </div>
                            </div>
                          </td>

                          {/* Assigned Life Skill */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F3EFEA] text-[#374151]">
                              <span className={`w-1.5 h-1.5 rounded-full ${ch.skillDotColor}`} />
                              {ch.skill}
                            </span>
                          </td>

                          {/* Points */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="font-bold text-xs text-[#C2410C]">
                              {ch.points} XP
                            </span>
                          </td>

                          {/* Completion Requirements */}
                          <td className="py-3.5 px-4 text-[#6B7280] max-w-sm text-[11px] leading-relaxed">
                            {ch.completionRequirements}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                ch.status === 'Active'
                                  ? 'bg-[#ECFDF5] text-[#059669]'
                                  : 'bg-[#F1F5F9] text-[#64748B]'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  ch.status === 'Active' ? 'bg-[#10B981]' : 'bg-[#94A3B8]'
                                }`}
                              />
                              {ch.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                className="text-xs font-semibold text-[#374151] hover:text-[#C2410C] cursor-pointer flex items-center gap-1"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                className="p-1 rounded text-[#9CA3AF] hover:text-[#111827] cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: SUBSCRIPTION SETTINGS VIEW
          ======================================================== */}
          {currentTab === 'subscriptions' && (
            <div className="space-y-6">
              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Freemium Configuration */}
                <div className="bg-white rounded-2xl border border-[#EDE8E1] p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-[#111827]">Freemium Plan Rules</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F3E8FF] text-[#7E22CE]">
                      Free Tier
                    </span>
                  </div>

                  <p className="text-xs text-[#6B7280] mb-5">
                    Configure restrictions, limits, and trial quotas for standard non-paying parents.
                  </p>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-[#374151] mb-1">
                        Max Children Allowed
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={3}
                        value={freemiumMaxChildren}
                        onChange={(e) => setFreemiumMaxChildren(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                      />
                      <p className="text-[11px] text-[#9CA3AF] mt-1">Default: 1 child per freemium account.</p>
                    </div>

                    <div>
                      <label className="block font-bold text-[#374151] mb-1">
                        Monthly Free Challenge Quota
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={freemiumMonthlyQuota}
                        onChange={(e) => setFreemiumMonthlyQuota(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                      />
                      <p className="text-[11px] text-[#9CA3AF] mt-1">Default: 4 challenges per month.</p>
                    </div>

                    <div className="pt-2 border-t border-[#F3EFEA] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#374151]">Watermarked PDF Reports</span>
                        <span className="font-bold text-[#059669]">Enforced</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#374151]">Parent Focus Boost</span>
                        <span className="font-bold text-[#DC2626]">Locked</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Configuration */}
                <div className="bg-white rounded-2xl border border-[#EDE8E1] p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-[#111827]">Premium Plan Rules &amp; Pricing</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#B45309]">
                      Paid Tier
                    </span>
                  </div>

                  <p className="text-xs text-[#6B7280] mb-5">
                    Set multi-child capacity, custom focus multiplier settings, and subscription pricing.
                  </p>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#374151] mb-1">
                          Monthly Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={premiumPriceMonthly}
                          onChange={(e) => setPremiumPriceMonthly(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#374151] mb-1">
                          Annual Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={premiumPriceAnnual}
                          onChange={(e) => setPremiumPriceAnnual(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[#374151] mb-1">
                        Max Children Allowed
                      </label>
                      <input
                        type="number"
                        min={2}
                        max={10}
                        value={premiumMaxChildren}
                        onChange={(e) => setPremiumMaxChildren(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                      />
                    </div>

                    <div className="pt-2 border-t border-[#F3EFEA] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#374151]">Focus Boost Multiplier</span>
                        <span className="font-bold text-[#059669]">1.5x Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#374151]">Unlimited Challenges</span>
                        <span className="font-bold text-[#059669]">Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Bar */}
              <div className="bg-white rounded-2xl border border-[#EDE8E1] p-4 flex items-center justify-between shadow-xs">
                <div>
                  {subscriptionSaved && (
                    <span className="text-xs font-semibold text-[#059669] flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Subscription governance rules saved!</span>
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSaveSubscriptions}
                  className="px-6 py-2.5 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Save Subscription Rules
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================
          MODALS
      ======================================================== */}
      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#EDE8E1] text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#111827]">Add New Life Skill</h3>
              <button
                type="button"
                onClick={() => setShowAddSkillModal(false)}
                className="text-[#9CA3AF] hover:text-[#111827] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSkill} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#374151] mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Critical Thinking"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#374151] mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the developmental competency and behavior milestones..."
                  value={newSkillDesc}
                  onChange={(e) => setNewSkillDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSkillModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Challenge Modal */}
      {showAddChallengeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#EDE8E1] text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#111827]">Create New Challenge</h3>
              <button
                type="button"
                onClick={() => setShowAddChallengeModal(false)}
                className="text-[#9CA3AF] hover:text-[#111827] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddChallenge} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#374151] mb-1">Challenge Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Morning Routine Master"
                  value={newChallengeName}
                  onChange={(e) => setNewChallengeName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#374151] mb-1">Life Skill</label>
                  <select
                    value={newChallengeSkill}
                    onChange={(e) => setNewChallengeSkill(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                  >
                    {skillsList.map((s) => (
                      <option key={s.code} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#374151] mb-1">Points (XP)</label>
                  <input
                    type="number"
                    value={newChallengePoints}
                    onChange={(e) => setNewChallengePoints(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#374151] mb-1">
                  Completion Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Steps the child must complete and what evidence parents verify..."
                  value={newChallengeReqs}
                  onChange={(e) => setNewChallengeReqs(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#C2410C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddChallengeModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B83806] hover:bg-[#9E3005] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Create Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
