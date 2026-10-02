import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { SkillBreakdownService, type SkillResponseItem } from '../../services/skillBreakdownService';
import { SKILLS_DATA, SKILL_LIST } from '../../data/skills';
import type { SkillId } from '../../types/skills';

interface SkillBreakdownDetailProps {
  initialSkillId?: SkillId;
}

export const SkillBreakdownDetail: React.FC<SkillBreakdownDetailProps> = ({
  initialSkillId = 'mental-math-logic',
}) => {
  const navigate = useNavigate();
  const { skillId: routeSkillId } = useParams<{ skillId?: string }>();
  const { profile } = useApp();

  const childName = profile?.name || profile?.firstName || 'Tobi';

  // Validate skillId from URL or prop
  const validSkillId: SkillId = (
    routeSkillId && SKILLS_DATA[routeSkillId as SkillId]
      ? routeSkillId
      : initialSkillId && SKILLS_DATA[initialSkillId]
      ? initialSkillId
      : 'mental-math-logic'
  ) as SkillId;

  const [selectedSkill, setSelectedSkill] = useState<SkillId>(validSkillId);
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong'>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Sync state if route changes
  React.useEffect(() => {
    if (routeSkillId && SKILLS_DATA[routeSkillId as SkillId]) {
      setSelectedSkill(routeSkillId as SkillId);
    }
  }, [routeSkillId]);

  const currentSkillMeta = SKILLS_DATA[selectedSkill];

  // Fetch responses for current skill
  const rawResponses = useMemo(() => {
    return SkillBreakdownService.getSkillResponses(selectedSkill);
  }, [selectedSkill]);

  // Aggregate stats
  const stats = useMemo(() => {
    const total = rawResponses.length;
    const correct = rawResponses.filter((r) => r.isCorrect).length;
    const wrong = total - correct;
    const scorePercentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, correct, wrong, scorePercentage };
  }, [rawResponses]);

  // Filtered responses
  const displayedResponses = useMemo(() => {
    if (filterType === 'correct') {
      return rawResponses.filter((r) => r.isCorrect);
    }
    if (filterType === 'wrong') {
      return rawResponses.filter((r) => !r.isCorrect);
    }
    return rawResponses;
  }, [rawResponses, filterType]);

  const handleSkillChange = (newSkillId: SkillId) => {
    setSelectedSkill(newSkillId);
    setFilterType('all');
    setIsFilterDropdownOpen(false);
  };

  const getDifficultyStars = (stars: number) => {
    return '⭐'.repeat(stars);
  };

  const getActionIcon = (type: SkillResponseItem['actionType']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />;
      case 'retry':
        return <RotateCcw className="w-4 h-4 text-rose-600 shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />;
    }
  };

  // Nice skill icon lookup
  const getSkillEmoji = (id: SkillId) => {
    switch (id) {
      case 'mental-math-logic':
        return '🧠';
      case 'financial-literacy':
        return '💰';
      case 'persuasive-speaking':
        return '🎤';
      case 'creative-problem-solving':
        return '💡';
      case 'emotional-intelligence':
        return '❤️';
      default:
        return '📚';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-5 select-none font-sans pb-16 px-1 sm:px-4">
      {/* ── Top Bar with Back Navigation ── */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => navigate('/parent')}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#a73605] hover:text-[#8e2e04] active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold text-slate-400">
          Skill Performance Breakdown
        </span>
      </div>

      {/* ── 4 Summary Stat Cards ── */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
        {/* Total */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#f3e7dc] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
          <span className="text-lg sm:text-xl mb-1 filter drop-shadow-2xs">🎯</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {stats.total}
          </span>
          <span className="text-[11px] font-bold text-slate-400 mt-0.5">Total</span>
        </div>

        {/* Correct */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#f3e7dc] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
          <span className="text-lg sm:text-xl mb-1 filter drop-shadow-2xs">🪄</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 leading-tight">
            {stats.correct}
          </span>
          <span className="text-[11px] font-bold text-emerald-600 mt-0.5">Correct</span>
        </div>

        {/* Wrong */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#f3e7dc] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
          <span className="text-lg sm:text-xl mb-1 filter drop-shadow-2xs">❌</span>
          <span className="text-xl sm:text-2xl font-black text-rose-600 leading-tight">
            {stats.wrong}
          </span>
          <span className="text-[11px] font-bold text-rose-600 mt-0.5">Wrong</span>
        </div>

        {/* Score */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#f3e7dc] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
          <span className="text-lg sm:text-xl mb-1 filter drop-shadow-2xs">🎯</span>
          <span className="text-xl sm:text-2xl font-black text-amber-600 leading-tight">
            {stats.scorePercentage}%
          </span>
          <span className="text-[11px] font-bold text-amber-600 mt-0.5">Score</span>
        </div>
      </div>

      {/* ── Skill Horizontal Selector Pills ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
        {SKILL_LIST.map((s) => {
          const isSelected = s.id === selectedSkill;
          return (
            <button
              key={s.id}
              onClick={() => handleSkillChange(s.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#a73605] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-[#f3e7dc] hover:bg-[#faf4ee] hover:text-slate-900'
              }`}
            >
              <span>{getSkillEmoji(s.id)}</span>
              <span>
                {s.id === 'mental-math-logic' ? 'Math Review' : s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Subheader with Skill Info & Breakdown Filter Dropdown ── */}
      <div className="flex items-center justify-between gap-2 pt-1 pb-1 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-lg shadow-2xs text-white">
            {getSkillEmoji(selectedSkill)}
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
              {selectedSkill === 'mental-math-logic'
                ? 'Math Review'
                : currentSkillMeta?.name || 'Skill Review'}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              {childName}&apos;s Responses
            </p>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e5d8cc] text-xs font-bold text-slate-700 hover:bg-[#faf4ee] shadow-2xs transition-all cursor-pointer"
          >
            <Filter className="w-3 h-3 text-[#a73605]" />
            <span>
              Breakdown:{' '}
              {filterType === 'all'
                ? `All (${stats.total})`
                : filterType === 'correct'
                ? `Correct (${stats.correct})`
                : `Wrong (${stats.wrong})`}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isFilterDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setFilterType('all');
                  setIsFilterDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-xs font-bold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                  filterType === 'all' ? 'text-[#a73605] bg-[#fef5ee]' : 'text-slate-700'
                }`}
              >
                <span>All Responses</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-600">
                  {stats.total}
                </span>
              </button>

              <button
                onClick={() => {
                  setFilterType('correct');
                  setIsFilterDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-xs font-bold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                  filterType === 'correct' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-700'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>✅</span> Correct Only
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[10px] text-emerald-800">
                  {stats.correct}
                </span>
              </button>

              <button
                onClick={() => {
                  setFilterType('wrong');
                  setIsFilterDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-xs font-bold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                  filterType === 'wrong' ? 'text-rose-700 bg-rose-50' : 'text-slate-700'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>❌</span> Needs Review
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-[10px] text-rose-800">
                  {stats.wrong}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── List of Question Response Cards ── */}
      <div className="flex flex-col gap-4">
        {displayedResponses.length === 0 ? (
          <div className="w-full bg-white rounded-3xl p-8 border border-[#f3e7dc] text-center flex flex-col items-center justify-center gap-3">
            <span className="text-3xl">📝</span>
            <h3 className="text-base font-bold text-slate-800">No responses match this filter</h3>
            <p className="text-xs text-slate-500 max-w-xs">
              Try choosing &quot;All Responses&quot; or select another skill category above.
            </p>
            <button
              onClick={() => setFilterType('all')}
              className="mt-2 px-4 py-2 rounded-xl bg-[#a73605] text-white text-xs font-bold"
            >
              Show All Responses
            </button>
          </div>
        ) : (
          displayedResponses.map((item) => {
            const isCorrect = item.isCorrect;

            return (
              <div
                key={item.id}
                className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-[#f3e7dc] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-4 text-left transition-all"
              >
                {/* Card Header: Title & Status Badge */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {item.title}
                  </h3>

                  {isCorrect ? (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-emerald-700 text-xs font-black shadow-2xs shrink-0">
                      <span>✅</span>
                      <span>Correct</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#fef2f2] border border-[#fecaca] text-rose-700 text-xs font-black shadow-2xs shrink-0">
                      <span>❌</span>
                      <span>Wrong</span>
                    </div>
                  )}
                </div>

                {/* Metadata: Difficulty & Date */}
                <div className="flex items-center gap-2 -mt-2 text-xs font-medium text-slate-400">
                  <span className="font-bold text-amber-500">
                    {getDifficultyStars(item.difficultyStars)} {item.difficultyLabel}
                  </span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>

                {/* QUESTION Section */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    QUESTION:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                    {item.question}
                  </p>
                </div>

                {/* Child's Answer Section */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <span>👦</span>
                    <span>Child&apos;s Answer:</span>
                  </span>
                  <div className="w-full bg-slate-100 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 break-words">
                    &quot;{item.childAnswer}&quot;
                  </div>
                </div>

                {/* Correct Answer Section */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <span>✅</span>
                    <span>Correct Answer:</span>
                  </span>
                  <div className="w-full bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-emerald-950 break-words">
                    &quot;{item.correctAnswer}&quot;
                  </div>
                </div>

                {/* Learning Tip & Explanations Box */}
                <div className="w-full bg-[#fffbeb] border border-[#fef08a] rounded-2xl p-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs">
                    <span>💡</span>
                    <span>Learning Tip &amp; Explanation:</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-amber-950/90 leading-relaxed whitespace-pre-line">
                    {item.learningTip}
                  </p>
                </div>

                {/* Actionable Feedback Note */}
                <div
                  className={`flex items-center gap-2 pt-0.5 text-xs sm:text-sm font-bold ${
                    isCorrect ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {getActionIcon(item.actionType)}
                  <span>
                    {isCorrect ? 'Correct! ' : 'Wrong - '}
                    {item.actionNote.replace(/^(Correct!\s*|Wrong\s*-\s*)/i, '')}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Bottom Button: Back to Parent Dashboard ── */}
      <div className="w-full pt-4">
        <button
          onClick={() => navigate('/parent')}
          className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-[#faf5f0] border border-[#e8d7c9] active:scale-[0.99] text-[#a73605] font-extrabold text-sm sm:text-base shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back to Parent Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default SkillBreakdownDetail;
