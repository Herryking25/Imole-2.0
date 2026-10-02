import React from 'react';
import { SKILL_LIST } from '../../data/skills';
import { useProgress } from '../../hooks/useProgress';
import { useLanguage } from '../../hooks/useLanguage';
import { ProgressBar } from '../common/ProgressBar';
import { Calculator, Mic, Wallet, Lightbulb, HeartHandshake, Award } from 'lucide-react';

export const ProgressCard: React.FC = () => {
  const { skills } = useProgress();
  const { language, t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'Mic':
        return <Mic className="w-5 h-5" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100">
        <h3 className="text-base sm:text-lg font-black text-slate-900">
          {t.progress.skillBreakdown}
        </h3>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          5 Core Areas
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {SKILL_LIST.map((skill) => {
          const prog = skills[skill.id] || { points: 0, challengesCompleted: 0, masteryLevel: 1 };
          const skillName =
            language === 'yo'
              ? skill.yorubaName
              : language === 'pcm'
              ? skill.pidginName
              : skill.name;

          // Max 500 points for full 100% bar in MVP
          const percentage = Math.min(100, Math.round((prog.points / 500) * 100));

          return (
            <div
              key={skill.id}
              className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors bg-slate-50/40"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: skill.bgColor, color: skill.color }}
                  >
                    {getIcon(skill.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                      {skillName}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {prog.challengesCompleted} {t.common.completed.toLowerCase()} • {t.common.level} {prog.masteryLevel}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-slate-800">
                    {prog.points}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold ml-1">{t.common.pts}</span>
                </div>
              </div>

              <ProgressBar
                progress={percentage}
                color={skill.color}
                height="sm"
                showPercentage={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
