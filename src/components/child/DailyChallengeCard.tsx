import React from 'react';
import { Clock, CheckCircle2, Award, Sparkles } from 'lucide-react';
import type { Challenge } from '../../types/challenge';
import { SKILLS_DATA } from '../../data/skills';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../hooks/useLanguage';

interface DailyChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  countdown: { hours: number; minutes: number; seconds: number };
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challenge,
  isCompleted,
  countdown,
}) => {
  const { language, t } = useLanguage();
  const skill = SKILLS_DATA[challenge.skillId] || SKILLS_DATA['mental-math-logic'];

  const skillName =
    language === 'yo'
      ? skill.yorubaName
      : language === 'pcm'
      ? skill.pidginName
      : skill.name;

  const title = challenge.title[language] || challenge.title.en;
  const scenario = challenge.scenario[language] || challenge.scenario.en;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (isCompleted) {
    return (
      <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 text-center shadow-lg relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full uppercase tracking-wider mb-2">
          {t.common.completed}
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          {t.dailyChallenge.lockedTitle}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-6">
          {t.dailyChallenge.lockedMessage}
        </p>

        {/* Midnight Countdown */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 max-w-xs mx-auto">
          <span className="text-xs font-bold text-slate-500 block mb-2">
            {t.dailyChallenge.timeRemaining}
          </span>
          <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-black text-emerald-800 font-mono">
            <span className="p-2 bg-white rounded-xl shadow-xs border border-slate-200">
              {pad(countdown.hours)}h
            </span>
            <span>:</span>
            <span className="p-2 bg-white rounded-xl shadow-xs border border-slate-200">
              {pad(countdown.minutes)}m
            </span>
            <span>:</span>
            <span className="p-2 bg-white rounded-xl shadow-xs border border-slate-200">
              {pad(countdown.seconds)}s
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm text-left">
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
            style={{ backgroundColor: skill.bgColor, color: skill.color }}
          >
            {skillName}
          </span>
          <Badge variant="neutral" size="sm">
            {challenge.difficulty.toUpperCase()}
          </Badge>
          <Badge variant="info" size="sm">
            {t.common.day} {challenge.dayNumber}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
          <Award className="w-3.5 h-3.5" />
          <span>+{challenge.points} {t.common.pts}</span>
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
        {title}
      </h1>

      <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 sm:p-5 mb-2 text-slate-700 text-sm sm:text-base leading-relaxed">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Scenario</span>
        </div>
        <p className="font-normal">{scenario}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 pt-3">
        <Clock className="w-3.5 h-3.5" />
        <span>Estimated time: 2–3 minutes</span>
      </div>
    </div>
  );
};
