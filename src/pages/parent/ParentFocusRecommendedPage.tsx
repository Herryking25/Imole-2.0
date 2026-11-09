import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Target } from 'lucide-react';

interface LocationState {
  skillName?: string;
  childName?: string;
}

interface RecommendedChallenge {
  _id: string;
  title: string;
  skill: string;
  duration: string;
  emoji: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  isFocus: boolean;
  isRecommended: boolean;
}

const FOCUS_CHALLENGES: RecommendedChallenge[] = [
  { _id: 'r1', title: 'Budget Planning', skill: 'Basic Finance', duration: '15 mins', emoji: '🧮', difficulty: 'MEDIUM', isFocus: true, isRecommended: true },
  { _id: 'r2', title: 'Save More Challenge', skill: 'Basic Finance', duration: '20 mins', emoji: '💰', difficulty: 'MEDIUM', isFocus: true, isRecommended: false },
];

const OTHER_CHALLENGES: RecommendedChallenge[] = [
  { _id: 'r3', title: 'Public Speaking 101', skill: 'Speaking & Comms', duration: '10 mins', emoji: '🗣️', difficulty: 'EASY', isFocus: false, isRecommended: false },
  { _id: 'r4', title: 'Logic Puzzle', skill: 'Math & Logic', duration: '12 mins', emoji: '🧠', difficulty: 'MEDIUM', isFocus: false, isRecommended: false },
];

const difficultyStyle: Record<string, string> = {
  EASY: 'bg-emerald-50 text-emerald-700',
  MEDIUM: 'bg-amber-50 text-amber-600',
  HARD: 'bg-rose-50 text-rose-600',
};

export const ParentFocusRecommendedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { skillName = 'Basic Finance', childName = 'Tobi' } = (location.state as LocationState) ?? {};

  // suppress unused
  void childName;

  const renderCard = (ch: RecommendedChallenge) => (
    <button
      key={ch._id}
      type="button"
      className="relative w-full text-left bg-white rounded-3xl border-2 border-slate-100 p-4 flex items-center gap-4 hover:border-[#B83806]/30 active:scale-[0.99] transition-all cursor-pointer"
      style={ch.isFocus ? { borderColor: '#B83806' } : undefined}
    >
      {/* FOCUS badge */}
      {ch.isFocus && (
        <span className="absolute -top-3 right-4 bg-[#B83806] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wide">
          FOCUS
        </span>
      )}

      {/* Emoji */}
      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-2xl">
        {ch.emoji}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 truncate">{ch.title}</p>
        <p className="text-xs text-slate-400 font-medium mt-0.5">{ch.skill} • {ch.duration}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${difficultyStyle[ch.difficulty]}`}>
            {ch.difficulty}
          </span>
          {ch.isRecommended && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              RECOMMENDED
            </span>
          )}
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <span className="text-sm font-bold text-[#B83806]">Recommended</span>
        </div>

        {/* Focus area active banner */}
        <div className="bg-[#FFF1ED] border border-[#FBCBB7] rounded-2xl px-4 py-3.5 flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-white border border-[#FBCBB7] flex items-center justify-center shrink-0">
            <Target className="w-4.5 h-4.5 text-[#B83806] stroke-[1.8]" style={{ width: '1.1rem', height: '1.1rem' }} />
          </div>
          <div>
            <p className="text-[10px] font-black text-[#B83806] uppercase tracking-widest">FOCUS AREA ACTIVE</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{skillName} challenges first</p>
          </div>
        </div>

        {/* Priority challenges */}
        <div className="mb-5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">PRIORITY CHALLENGES</p>
          <div className="flex flex-col gap-5">
            {FOCUS_CHALLENGES.map(renderCard)}
          </div>
        </div>

        {/* Other challenges */}
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">OTHER CHALLENGES</p>
          <div className="flex flex-col gap-3">
            {OTHER_CHALLENGES.map(renderCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentFocusRecommendedPage;

