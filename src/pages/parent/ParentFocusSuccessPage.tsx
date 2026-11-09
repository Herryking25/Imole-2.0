import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Target } from 'lucide-react';
import { FocusAreaModal, type FocusSkill } from '../../components/parent/FocusAreaModal';

interface LocationState {
  skillName?: string;
  childName?: string;
}

export const ParentFocusSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) ?? {};
  const [skillName, setSkillName] = useState(state.skillName || 'Basic Finance');
  const childName = state.childName || 'Tobi';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full mx-auto px-5 py-10">

        {/* Success icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-3 text-center">
          Focus Area Set!
        </h1>
        <p className="text-sm text-slate-500 font-medium text-center max-w-xs mb-10 leading-relaxed">
          {childName}&apos;s challenges will now prioritise{' '}
          <span className="font-bold text-slate-800">{skillName}</span>.
        </p>

        {/* Current focus card */}
        <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm px-4 py-4 flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-[#FFF1ED] flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-[#B83806] stroke-[1.8]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CURRENT FOCUS</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{skillName}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-bold text-[#B83806] hover:underline cursor-pointer shrink-0"
          >
            Change
          </button>
        </div>

        {/* CTAs */}
        <div className="w-full flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate('/parent/focus/recommended', { state: { skillName, childName } })}
            className="w-full py-4 rounded-2xl bg-[#B83806] text-white font-extrabold text-sm hover:bg-[#9A2F05] active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-[#B83806]/20"
          >
            See Updated Recommendations
          </button>
          <button
            type="button"
            onClick={() => navigate('/parent', { replace: true })}
            className="w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 active:scale-[0.99] transition-all cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {isModalOpen && (
        <FocusAreaModal
          childName={childName}
          currentFocus={skillName}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(skill: FocusSkill) => {
            setSkillName(skill.name);
            localStorage.setItem('imole_v1_parent_focus', skill.name);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ParentFocusSuccessPage;
