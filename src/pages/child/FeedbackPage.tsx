import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Trophy, BarChart3, ArrowRight } from 'lucide-react';
import { useDailyChallenge } from '../../hooks/useDailyChallenge';
import { useStreak } from '../../hooks/useStreak';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../../components/common/Button';

export const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { challenge, lastFeedback } = useDailyChallenge();
  const { currentStreak } = useStreak();
  const { language, t } = useLanguage();

  const tip = lastFeedback
    ? lastFeedback.educationalTip
    : challenge.educationalTip[language] || challenge.educationalTip.en;

  const encouragement = lastFeedback
    ? lastFeedback.encouragement
    : challenge.encouragement[language] || challenge.encouragement.en;

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-6 py-4">
      <div className="w-16 h-16 rounded-3xl bg-amber-100 border-4 border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
        <Sparkles className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          {t.feedback.wellDone}
        </h2>
        <p className="text-sm sm:text-base font-semibold text-emerald-700">
          {encouragement}
        </p>
      </div>

      <div className="w-full bg-white rounded-3xl border border-slate-200 p-6 text-left shadow-xs">
        <span className="text-xs font-black text-amber-700 uppercase tracking-wider block mb-2">
          💡 {t.feedback.educationalTipTitle}
        </span>
        <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4">
          {tip}
        </p>
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Current Streak: <strong className="text-amber-600 font-black">{currentStreak} Days</strong></span>
          <span>Challenge: <strong>{challenge.title[language] || challenge.title.en}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={() => navigate('/child/leaderboard')}
          icon={<Trophy className="w-4 h-4 text-amber-500" />}
        >
          {t.feedback.viewLeaderboard}
        </Button>

        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() => navigate('/child/progress')}
          icon={<BarChart3 className="w-4 h-4" />}
        >
          {t.feedback.viewProgress}
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/child/challenge')}
        icon={<ArrowRight className="w-4 h-4" />}
      >
        Back to Today’s Challenge
      </Button>
    </div>
  );
};
