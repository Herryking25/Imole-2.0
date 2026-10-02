import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, CheckCircle2, Lock, Star, Send } from 'lucide-react';
import { useDailyChallenge } from '../../hooks/useDailyChallenge';
import { useApp } from '../../hooks/useApp';
import { useLanguage } from '../../hooks/useLanguage';
import { CURATED_CHALLENGES } from '../../data/challenges';
import { Modal } from '../../components/common/Modal';
import { FeedbackModal } from '../../components/child/FeedbackModal';
import type { Challenge } from '../../types/challenge';
import type { SubmissionFeedback } from '../../types/submission';

export const DailyChallengePage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { progress } = useApp();
  const { submit, isSubmitting } = useDailyChallenge();

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeChallengeModal, setActiveChallengeModal] = useState<Challenge | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [textResponse, setTextResponse] = useState<string>('');
  const [modalFeedback, setModalFeedback] = useState<SubmissionFeedback | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Skill filter list
  const filterTabs = [
    { id: 'all', label: 'All Skills', icon: '' },
    { id: 'mental-math-logic', label: 'Math', emoji: '🧮', bg: 'bg-[#fee2e2]/80 text-[#991b1b] border-rose-200' },
    { id: 'financial-literacy', label: 'Finance', emoji: '💰', bg: 'bg-[#fef3c7]/80 text-[#92400e] border-amber-200' },
    { id: 'persuasive-speaking', label: 'Speaking', emoji: '🗣️', bg: 'bg-[#f3e8ff]/80 text-[#6b21a8] border-purple-200' },
    { id: 'creative-problem-solving', label: 'Problem Solving', emoji: '💡', bg: 'bg-[#ffedd5]/80 text-[#9a3412] border-orange-200' },
    { id: 'emotional-intelligence', label: 'Emotional IQ', emoji: '❤️', bg: 'bg-[#fce7f3]/80 text-[#9d174d] border-pink-200' },
  ];

  // Core challenge cards matching mockup
  const featuredChallenges = [
    {
      id: 'fin-01',
      title: 'Budget Boss',
      description: 'Learn how to divide your weekly allowance into savings and spending.',
      emoji: '💰',
      emojiBg: 'bg-[#fef3c7]',
      skillId: 'financial-literacy',
      status: 'completed' as const,
      stars: 2,
      maxStars: 3,
    },
    {
      id: 'mml-01',
      title: 'Market Math',
      description: 'Calculate change quickly when buying groceries at the local market.',
      emoji: '🧮',
      emojiBg: 'bg-[#fee2e2]',
      skillId: 'mental-math-logic',
      status: 'in-progress' as const,
      progressPercent: 60,
      stars: 3,
      maxStars: 3,
    },
    {
      id: 'cps-01',
      title: 'Community Helper',
      description: 'Identify three ways you can help keep your local neighborhood clean.',
      emoji: '🌍',
      emojiBg: 'bg-sky-100',
      skillId: 'creative-problem-solving',
      status: 'locked' as const,
      unlockLevel: 'Lvl 5',
      stars: 0,
      maxStars: 3,
    },
    {
      id: 'ps-07',
      title: 'Confident Speaker',
      description: 'Master body language and eye contact when pitching your ideas to an audience.',
      emoji: '🗣️',
      emojiBg: 'bg-[#f3e8ff]',
      skillId: 'persuasive-speaking',
      status: 'new' as const,
      stars: 0,
      maxStars: 3,
    },
    {
      id: 'eq-01',
      title: 'Friendship & Empathy',
      description: 'Learn active listening techniques to resolve misunderstandings calmly.',
      emoji: '❤️',
      emojiBg: 'bg-[#fce7f3]',
      skillId: 'emotional-intelligence',
      status: 'new' as const,
      stars: 0,
      maxStars: 3,
    },
  ];

  // Filter challenges
  const filteredChallenges =
    selectedFilter === 'all'
      ? featuredChallenges
      : featuredChallenges.filter((c) => c.skillId === selectedFilter);

  // Handle open challenge
  const handleOpenChallenge = (challengeId: string) => {
    const found =
      CURATED_CHALLENGES.find((c) => c.id === challengeId) ||
      CURATED_CHALLENGES.find((c) => c.skillId === selectedFilter) ||
      CURATED_CHALLENGES[0];
    setActiveChallengeModal(found);
    setSelectedOptionId('');
    setTextResponse('');
  };

  // Submit challenge answer
  const handleSubmitChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChallengeModal) return;

    let responseText = textResponse;
    if (activeChallengeModal.type === 'mcq' && selectedOptionId) {
      const opt = activeChallengeModal.options?.find((o) => o.id === selectedOptionId);
      responseText = opt ? opt.text[language] || opt.text.en : '';
    }

    const feedback = await submit(responseText, selectedOptionId);
    setActiveChallengeModal(null);
    setModalFeedback(feedback);
    setIsFeedbackOpen(true);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#faf8f5]/50 md:bg-white flex flex-col py-4 px-4 sm:px-8 pb-28 sm:pb-8 animate-in fade-in duration-300">
      <div className="max-w-xl w-full mx-auto flex flex-col gap-4">

        {/* ── Top Bar with Back Button and Title ── */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => navigate('/child/dashboard')}
            className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all cursor-pointer select-none active:scale-95"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📚</span>
            <span>All Challenges</span>
          </h1>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 select-none">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#a73605] text-white shadow-xs'
                    : tab.bg
                    ? `${tab.bg} border hover:opacity-90`
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.emoji && <span>{tab.emoji}</span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Challenges List ── */}
        <div className="flex flex-col gap-4 mt-1">
          {filteredChallenges.map((item) => {
            // ── COMPLETED CARD ──
            if (item.status === 'completed') {
              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenChallenge(item.id)}
                  className="w-full bg-white rounded-3xl border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-2 cursor-pointer hover:border-slate-200 transition-all select-none active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-full ${item.emojiBg} flex items-center justify-center text-2xl shadow-xs shrink-0`}>
                      {item.emoji}
                    </div>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <Star className="w-4 h-4 text-slate-200" />
                    </div>
                  </div>

                  <h2 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-50 mt-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#a73605]">
                      <CheckCircle2 className="w-4 h-4 fill-[#a73605] text-white" />
                      <span>Completed</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#a73605]" />
                  </div>
                </div>
              );
            }

            // ── IN PROGRESS CARD ──
            if (item.status === 'in-progress') {
              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenChallenge(item.id)}
                  className="w-full bg-white rounded-3xl border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-2 cursor-pointer hover:border-slate-200 transition-all select-none active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-full ${item.emojiBg} flex items-center justify-center text-2xl shadow-xs shrink-0`}>
                      {item.emoji}
                    </div>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                  </div>

                  <h2 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-2">
                    <div
                      className="h-full bg-[#a73605] rounded-full transition-all duration-500"
                      style={{ width: `${item.progressPercent || 60}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-slate-700">
                      In Progress
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenChallenge(item.id);
                      }}
                      className="bg-[#a73605] hover:bg-[#8e2e04] active:scale-95 text-white font-bold text-xs px-5 py-2 rounded-full shadow-xs transition-all cursor-pointer"
                    >
                      Resume
                    </button>
                  </div>
                </div>
              );
            }

            // ── LOCKED CARD ──
            if (item.status === 'locked') {
              return (
                <div
                  key={item.id}
                  className="w-full bg-[#fef2f2]/60 border border-rose-100/80 rounded-3xl p-5 relative overflow-hidden flex flex-col gap-2 opacity-80 select-none"
                >
                  {/* Center Lock Capsule Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xs shadow-md border border-slate-100 rounded-full px-3.5 py-4 flex items-center justify-center z-10">
                    <Lock className="w-5 h-5 text-slate-600 stroke-[2.2]" />
                  </div>

                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-full ${item.emojiBg} flex items-center justify-center text-2xl shadow-xs shrink-0 opacity-40`}>
                      {item.emoji}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 text-center">
                      Complete prev level to unlock
                    </span>
                    <div className="flex items-center gap-0.5 text-slate-300 text-sm">
                      <Star className="w-4 h-4 text-slate-300" />
                      <Star className="w-4 h-4 text-slate-300" />
                      <Star className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-slate-400 tracking-tight mt-1">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-rose-100/50 mt-1 text-xs font-semibold text-slate-400">
                    <span>Locked</span>
                    <span>Unlocks at {item.unlockLevel}</span>
                  </div>
                </div>
              );
            }

            // ── NEW / AVAILABLE CARD ──
            return (
              <div
                key={item.id}
                onClick={() => handleOpenChallenge(item.id)}
                className="w-full bg-white rounded-3xl border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-2 cursor-pointer hover:border-slate-200 transition-all select-none active:scale-[0.99]"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-full ${item.emojiBg} flex items-center justify-center text-2xl shadow-xs shrink-0`}>
                    {item.emoji}
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                    <Star className="w-4 h-4 text-slate-200" />
                    <Star className="w-4 h-4 text-slate-200" />
                    <Star className="w-4 h-4 text-slate-200" />
                  </div>
                </div>

                <h2 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-50 mt-1">
                  <span className="text-xs font-bold text-[#a73605]">
                    Ready to Play
                  </span>
                  <button className="bg-[#a73605] hover:bg-[#8e2e04] active:scale-95 text-white font-bold text-xs px-5 py-2 rounded-full shadow-xs transition-all cursor-pointer">
                    Start
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Completion Count Badge ── */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="bg-[#fee2e2]/90 text-[#991b1b] border border-rose-200/80 rounded-full px-6 py-1.5 text-xs font-extrabold shadow-xs">
            {progress.totalCompleted > 0 ? `${progress.totalCompleted}/30` : '12/30'} completed
          </div>
        </div>

      </div>

      {/* ── Interactive Challenge Quiz Modal ── */}
      {activeChallengeModal && (
        <Modal
          isOpen={Boolean(activeChallengeModal)}
          onClose={() => setActiveChallengeModal(null)}
          title={activeChallengeModal.title[language] || activeChallengeModal.title.en}
        >
          <form onSubmit={handleSubmitChallenge} className="flex flex-col gap-4 text-left">
            <p className="text-sm font-medium text-slate-600 bg-amber-50/70 border border-amber-200/70 p-3.5 rounded-2xl">
              {activeChallengeModal.scenario[language] || activeChallengeModal.scenario.en}
            </p>

            <h3 className="text-base font-extrabold text-slate-900">
              {activeChallengeModal.question[language] || activeChallengeModal.question.en}
            </h3>

            {activeChallengeModal.type === 'mcq' && activeChallengeModal.options && (
              <div className="flex flex-col gap-2.5">
                {activeChallengeModal.options.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#a73605] bg-[#fff7ed] text-[#a73605] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-600">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt.text[language] || opt.text.en}</span>
                      </span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#a73605]" />}
                    </button>
                  );
                })}
              </div>
            )}

            {activeChallengeModal.type === 'text' && (
              <textarea
                value={textResponse}
                onChange={(e) => setTextResponse(e.target.value)}
                rows={3}
                placeholder="Write your thoughtful answer here..."
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#a73605]/30 resize-none"
              />
            )}

            <button
              type="submit"
              disabled={isSubmitting || (activeChallengeModal.type === 'mcq' ? !selectedOptionId : !textResponse.trim())}
              className="w-full py-3.5 rounded-full bg-[#a73605] hover:bg-[#8e2e04] active:scale-95 disabled:opacity-50 text-white font-bold text-sm tracking-wide shadow-md shadow-[#a73605]/20 flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Answer</span>
                </>
              )}
            </button>
          </form>
        </Modal>
      )}

      {/* ── Feedback Celebration Modal ── */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        feedback={modalFeedback}
      />
    </div>
  );
};

export default DailyChallengePage;
