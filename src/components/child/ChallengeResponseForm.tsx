import React, { useState } from 'react';
import type { Challenge } from '../../types/challenge';
import { Button } from '../common/Button';
import { useLanguage } from '../../hooks/useLanguage';
import { Send, CheckCircle2 } from 'lucide-react';

interface ChallengeResponseFormProps {
  challenge: Challenge;
  isSubmitting: boolean;
  onSubmit: (response: string, selectedOptionId?: string) => void;
}

export const ChallengeResponseForm: React.FC<ChallengeResponseFormProps> = ({
  challenge,
  isSubmitting,
  onSubmit,
}) => {
  const { language, t } = useLanguage();
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [textResponse, setTextResponse] = useState<string>('');

  const question = challenge.question[language] || challenge.question.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (challenge.type === 'mcq') {
      if (!selectedOptionId) return;
      const opt = challenge.options?.find((o) => o.id === selectedOptionId);
      const text = opt ? opt.text[language] || opt.text.en : '';
      onSubmit(text, selectedOptionId);
    } else {
      if (!textResponse.trim()) return;
      onSubmit(textResponse.trim());
    }
  };

  const isFormValid =
    challenge.type === 'mcq' ? Boolean(selectedOptionId) : textResponse.trim().length >= 5;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm text-left flex flex-col gap-5"
    >
      <div>
        <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
          {question}
        </h3>
        <p className="text-xs text-slate-500">
          {challenge.type === 'mcq'
            ? t.dailyChallenge.selectOptionPrompt
            : t.dailyChallenge.yourAnswer}
        </p>
      </div>

      {challenge.type === 'mcq' && challenge.options && (
        <div className="flex flex-col gap-3">
          {challenge.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const optionText = option.text[language] || option.text.en;
            return (
              <label
                key={option.id}
                onClick={() => setSelectedOptionId(option.id)}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2 transition-colors ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-[11px] font-bold text-slate-500">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-slate-800 leading-snug">
                  {optionText}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {challenge.type === 'text' && (
        <div className="flex flex-col gap-2">
          <textarea
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
            rows={4}
            placeholder={t.dailyChallenge.writeAnswerPlaceholder}
            className="w-full p-4 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm leading-relaxed resize-none outline-none transition-all placeholder:text-slate-400"
          />
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Minimum 5 characters</span>
            <span>{textResponse.length} chars</span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={!isFormValid || isSubmitting}
        icon={<Send className="w-4 h-4" />}
      >
        {isSubmitting ? t.dailyChallenge.submitting : t.common.submit}
      </Button>
    </form>
  );
};
