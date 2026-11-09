import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Challenge } from '../../types/challenge';
import { useLanguage } from '../../hooks/useLanguage';

interface ChallengeResponseFormProps {
  challenge: Challenge;
  isSubmitting: boolean;
  onSubmit: (response: string, selectedOptionId?: string) => void;
  onSkip?: () => void;
  challengeIndex?: number;   // 0-based index in full list
  totalChallenges?: number;  // e.g. 30
}

/** Maps internal difficulty codes → human-readable labels */
const DIFFICULTY_LABEL: Record<string, string> = {
  primary: 'Easy',
  jss: 'Medium',
  sss: 'Hard',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

/** Skill ID → display name + emoji */
const SKILL_META: Record<string, { label: string; emoji: string }> = {
  'mental-math-logic': { label: 'Mental Math', emoji: '🧠' },
  'mental-math': { label: 'Mental Math', emoji: '🧠' },
  'persuasive-speaking': { label: 'Persuasive Speaking', emoji: '🎤' },
  'financial-literacy': { label: 'Financial Literacy', emoji: '💰' },
  'creative-problem-solving': { label: 'Creative Problem-Solving', emoji: '💡' },
  'emotional-intelligence': { label: 'Emotional Intelligence', emoji: '❤️' },
};

export const ChallengeResponseForm: React.FC<ChallengeResponseFormProps> = ({
  challenge,
  isSubmitting,
  onSubmit,
  onSkip,
  challengeIndex = 0,
  totalChallenges = 30,
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [textResponse, setTextResponse] = useState<string>('');

  /* ── Localised strings ── */
  const scenario = challenge.scenario[language] || challenge.scenario.en;
  const question = challenge.question[language] || challenge.question.en;

  /* ── Skill pill metadata ── */
  const skillId = challenge.skillId;
  const skill = SKILL_META[skillId] ?? { label: skillId, emoji: '📌' };
  const diffLabel = DIFFICULTY_LABEL[challenge.difficulty] ?? challenge.difficulty;

  /* ── Validation ── */
  const isFormValid =
    challenge.type === 'mcq' ? Boolean(selectedOptionId) : textResponse.trim().length >= 5;

  const handleSubmit = () => {
    if (!isFormValid || isSubmitting) return;
    if (challenge.type === 'mcq') {
      const opt = challenge.options?.find((o) => o.id === selectedOptionId);
      const text = opt ? (opt.text[language] || opt.text.en) : '';
      onSubmit(text, selectedOptionId);
    } else {
      onSubmit(textResponse.trim());
    }
  };

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F6]">

      {/* ── Top bar ── */}
      <header className="flex items-center gap-3 px-4 pt-5 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#F0E6E0] shadow-sm flex-shrink-0 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-[#1F1612]" />
        </button>

        {/* Skill · Difficulty pill */}
        <div className="flex items-center gap-1.5 bg-white border border-[#F0E6E0] rounded-full px-3.5 py-1.5 shadow-sm">
          <span className="text-sm leading-none">{skill.emoji}</span>
          <span className="text-xs font-semibold text-[#1F1612]">{skill.label}</span>
          <span className="text-[#C9B5AD] text-xs">·</span>
          <span className="text-xs font-medium text-[#6B5E57]">{diffLabel}</span>
        </div>
      </header>

      {/* ── Scrollable content ── */}
      <main className="flex-1 overflow-y-auto px-4 pb-32">

        {/* Scenario card */}
        <div className="bg-white rounded-3xl border border-[#F0E6E0] shadow-sm p-5 mb-5">
          {/* Scenario text */}
          <p className="text-xl font-black text-[#1F1612] leading-snug mb-4">
            {scenario}
          </p>

          {/* Inner skill pill (matches design — pill appears again inside card) */}
          <div className="flex items-center gap-1.5 bg-[#FFF8F6] border border-[#F0E6E0] rounded-full px-3 py-1.5 w-fit mb-4">
            <span className="text-xs leading-none">{skill.emoji}</span>
            <span className="text-xs font-semibold text-[#1F1612]">{skill.label}</span>
            <span className="text-[#C9B5AD] text-xs">·</span>
            <span className="text-xs font-medium text-[#6B5E57]">{diffLabel}</span>
          </div>

          {/* Question */}
          <p className="text-sm text-[#4A3728] leading-relaxed">
            {question}
          </p>
        </div>

        {/* ── MCQ options ── */}
        {challenge.type === 'mcq' && challenge.options && (
          <div className="bg-white rounded-3xl border border-[#F0E6E0] shadow-sm overflow-hidden">
            {challenge.options.map((option, idx) => {
              const optionText = option.text[language] || option.text.en;
              const isSelected = selectedOptionId === option.id;
              const isLast = idx === (challenge.options?.length ?? 0) - 1;

              return (
                <label
                  key={option.id}
                  className={[
                    'flex items-center gap-4 px-5 py-4 cursor-pointer select-none transition-colors',
                    isSelected ? 'bg-[#FFF1ED]' : 'bg-white hover:bg-[#FFF8F6]',
                    !isLast ? 'border-b border-[#F5EBE8]' : '',
                  ].join(' ')}
                  onClick={() => setSelectedOptionId(option.id)}
                >
                  {/* Radio circle */}
                  <div
                    className={[
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                      isSelected
                        ? 'border-[#B83806] bg-[#B83806]'
                        : 'border-[#C9B5AD] bg-white',
                    ].join(' ')}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Option text */}
                  <span
                    className={[
                      'text-sm leading-snug',
                      isSelected
                        ? 'font-semibold text-[#B83806]'
                        : 'font-medium text-[#1F1612]',
                    ].join(' ')}
                  >
                    {optionText}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        {/* ── Text response ── */}
        {challenge.type === 'text' && (
          <div className="bg-white rounded-3xl border border-[#F0E6E0] shadow-sm p-5">
            <label className="block text-xs font-semibold text-[#9E9189] uppercase tracking-wide mb-3">
              Your Answer
            </label>
            <textarea
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
              rows={5}
              placeholder="Write your thoughtful answer here…"
              className={[
                'w-full px-4 py-3.5 rounded-2xl border-2 text-sm text-[#1F1612] resize-none outline-none transition-colors',
                'placeholder:text-[#C9B5AD] leading-relaxed',
                textResponse.length >= 5
                  ? 'border-[#B83806] bg-[#FFF8F6]'
                  : 'border-[#F0E6E0] bg-[#FFF8F6] focus:border-[#FECDB4]',
              ].join(' ')}
            />
            <div className="flex justify-between items-center mt-2 text-xs text-[#9E9189]">
              <span>Minimum 5 characters</span>
              <span
                className={textResponse.length >= 5 ? 'text-[#B83806] font-semibold' : ''}
              >
                {textResponse.length} chars
              </span>
            </div>
          </div>
        )}
      </main>

      {/* ── Fixed bottom action bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#FFF8F6] border-t border-[#F0E6E0]">
        <div className="max-w-lg mx-auto px-4 pt-3 pb-5">
          {/* Buttons row */}
          <div className="flex items-center gap-3 mb-2">
            {/* Skip */}
            <button
              type="button"
              onClick={onSkip ?? (() => navigate(-1))}
              className="flex-shrink-0 px-6 py-3.5 rounded-full bg-[#F5EBE8] text-[#6B5E57] text-sm font-semibold border border-[#EDD9D1] active:scale-95 transition-transform"
            >
              Skip
            </button>

            {/* Submit Answer */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className={[
                'flex-1 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95',
                isFormValid && !isSubmitting
                  ? 'bg-[#B83806] text-white shadow-md'
                  : 'bg-[#E5D5D0] text-[#A88B82] cursor-not-allowed',
              ].join(' ')}
            >
              {isSubmitting ? 'Submitting…' : 'Submit Answer'}
            </button>
          </div>

          {/* Challenge counter label */}
          <p className="text-center text-xs text-[#9E9189] font-medium">
            Challenge {challengeIndex + 1} of {totalChallenges}
            {challenge.dayNumber ? ` · Day ${challenge.dayNumber}` : ''}
          </p>
        </div>
      </div>

    </div>
  );
};
