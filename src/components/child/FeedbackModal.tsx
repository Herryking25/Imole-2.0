import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Flame, Award, Lightbulb, ArrowRight, Trophy } from 'lucide-react';
import type { SubmissionFeedback } from '../../types/submission';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useLanguage } from '../../hooks/useLanguage';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: SubmissionFeedback | null;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  feedback,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (!feedback) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="flex flex-col items-center text-center">
        {/* Celebration Trophy Icon */}
        <div className="w-16 h-16 rounded-3xl bg-amber-100 border-4 border-amber-200 text-amber-600 flex items-center justify-center mb-4 shadow-sm animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-1">
          {t.feedback.wellDone}
        </h2>
        <p className="text-sm font-semibold text-emerald-700 mb-5">
          {feedback.encouragement}
        </p>

        {/* Score & Streak Stats Bar */}
        <div className="grid grid-cols-2 gap-3 w-full mb-5">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex flex-col items-center">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              {t.common.points}
            </span>
            <span className="text-2xl font-black text-emerald-900">
              +{feedback.pointsEarned}
            </span>
          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-2xl flex flex-col items-center">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {t.common.streak}
            </span>
            <span className="text-2xl font-black text-amber-900">
              {feedback.newStreak} {t.common.days}
            </span>
          </div>
        </div>

        {/* Educational Tip Card */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left mb-6">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>{t.feedback.educationalTipTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {feedback.educationalTip}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 w-full">
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => {
              onClose();
              navigate('/child/leaderboard');
            }}
            icon={<Trophy className="w-4 h-4" />}
          >
            {t.feedback.viewLeaderboard}
          </Button>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => {
              onClose();
              navigate('/child/progress');
            }}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {t.feedback.viewProgress}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
