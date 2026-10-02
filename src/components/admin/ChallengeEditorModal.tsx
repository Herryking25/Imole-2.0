import React, { useState } from 'react';
import type { Challenge, DifficultyLevel } from '../../types/challenge';
import type { SkillId } from '../../types/skills';
import { SKILL_LIST } from '../../data/skills';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { ChallengeService } from '../../services/challengeService';

interface ChallengeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeToEdit?: Challenge | null;
  onSaved: () => void;
}

interface FormProps {
  challengeToEdit?: Challenge | null;
  onSaved: () => void;
  onClose: () => void;
}

const ChallengeEditorForm: React.FC<FormProps> = ({
  challengeToEdit,
  onSaved,
  onClose,
}) => {
  const [skillId, setSkillId] = useState<SkillId>(() => challengeToEdit?.skillId || 'mental-math-logic');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(() => challengeToEdit?.difficulty || 'primary');
  const [dayNumber, setDayNumber] = useState<number>(() => challengeToEdit?.dayNumber || Math.floor(Date.now() % 365));
  const [points, setPoints] = useState<number>(() => challengeToEdit?.points || 50);

  const [titleEn, setTitleEn] = useState(() => challengeToEdit?.title.en || '');
  const [titleYo, setTitleYo] = useState(() => challengeToEdit?.title.yo || '');
  const [titlePcm, setTitlePcm] = useState(() => challengeToEdit?.title.pcm || '');

  const [scenarioEn, setScenarioEn] = useState(() => challengeToEdit?.scenario.en || '');
  const [scenarioYo, setScenarioYo] = useState(() => challengeToEdit?.scenario.yo || '');
  const [scenarioPcm, setScenarioPcm] = useState(() => challengeToEdit?.scenario.pcm || '');

  const [questionEn, setQuestionEn] = useState(() => challengeToEdit?.question.en || '');
  const [educationalTipEn, setEducationalTipEn] = useState(() => challengeToEdit?.educationalTip.en || '');
  const [encouragementEn, setEncouragementEn] = useState(() => challengeToEdit?.encouragement.en || 'Well done!');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newChallenge: Challenge = {
      id: challengeToEdit ? challengeToEdit.id : `custom_${Date.now()}`,
      dayNumber: Number(dayNumber),
      skillId,
      difficulty,
      type: challengeToEdit ? challengeToEdit.type : 'text',
      title: {
        en: titleEn || 'Life Skill Challenge',
        yo: titleYo || titleEn,
        pcm: titlePcm || titleEn,
      },
      scenario: {
        en: scenarioEn || '',
        yo: scenarioYo || scenarioEn,
        pcm: scenarioPcm || scenarioEn,
      },
      question: {
        en: questionEn || '',
        yo: challengeToEdit?.question.yo || questionEn,
        pcm: challengeToEdit?.question.pcm || questionEn,
      },
      options: challengeToEdit?.options,
      sampleAnswer: challengeToEdit?.sampleAnswer,
      educationalTip: {
        en: educationalTipEn || '',
        yo: challengeToEdit?.educationalTip.yo || educationalTipEn,
        pcm: challengeToEdit?.educationalTip.pcm || educationalTipEn,
      },
      encouragement: {
        en: encouragementEn || 'Well done!',
        yo: challengeToEdit?.encouragement.yo || encouragementEn,
        pcm: challengeToEdit?.encouragement.pcm || encouragementEn,
      },
      points: Number(points),
    };

    ChallengeService.saveCustomChallenge(newChallenge);
    onSaved();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Life Skill Area</label>
          <select
            value={skillId}
            onChange={(e) => setSkillId(e.target.value as SkillId)}
            className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white"
          >
            {SKILL_LIST.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white"
          >
            <option value="primary">Primary (Ages 8–11)</option>
            <option value="jss">JSS (Ages 12–14)</option>
            <option value="sss">SSS (Ages 15–16)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Day #</label>
          <input
            type="number"
            value={dayNumber}
            onChange={(e) => setDayNumber(Number(e.target.value))}
            min={1}
            max={365}
            className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            min={10}
            max={200}
            className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white"
          />
        </div>
      </div>

      {/* Titles in 3 Languages */}
      <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-3">
        <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
          Title (Trilingual)
        </span>
        <Input
          label="Title (English)"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          required
        />
        <Input
          label="Title (Yorùbá)"
          value={titleYo}
          onChange={(e) => setTitleYo(e.target.value)}
          placeholder="Àkọlé ní Èdè Yorùbá"
        />
        <Input
          label="Title (Naija Pidgin)"
          value={titlePcm}
          onChange={(e) => setTitlePcm(e.target.value)}
          placeholder="Title for Pidgin"
        />
      </div>

      {/* Scenario in 3 Languages */}
      <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-3">
        <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
          Scenario (Trilingual)
        </span>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-700">Scenario (English)</label>
          <textarea
            value={scenarioEn}
            onChange={(e) => setScenarioEn(e.target.value)}
            rows={2}
            required
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 resize-none outline-none focus:ring-2 focus:ring-[#f7cbb2]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-700">Scenario (Yorùbá)</label>
          <textarea
            value={scenarioYo}
            onChange={(e) => setScenarioYo(e.target.value)}
            rows={2}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 resize-none outline-none focus:ring-2 focus:ring-[#f7cbb2]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-700">Scenario (Naija Pidgin)</label>
          <textarea
            value={scenarioPcm}
            onChange={(e) => setScenarioPcm(e.target.value)}
            rows={2}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 resize-none outline-none focus:ring-2 focus:ring-[#f7cbb2]"
          />
        </div>
      </div>

      {/* Question */}
      <Input
        label="Question (English)"
        value={questionEn}
        onChange={(e) => setQuestionEn(e.target.value)}
        required
      />

      {/* Educational Tip & Encouragement */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700">Educational Tip (English)</label>
          <textarea
            value={educationalTipEn}
            onChange={(e) => setEducationalTipEn(e.target.value)}
            rows={2}
            className="w-full p-3 text-xs rounded-xl border border-slate-200 resize-none outline-none focus:ring-2 focus:ring-[#f7cbb2]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700">Encouragement Message</label>
          <textarea
            value={encouragementEn}
            onChange={(e) => setEncouragementEn(e.target.value)}
            rows={2}
            className="w-full p-3 text-xs rounded-xl border border-slate-200 resize-none outline-none focus:ring-2 focus:ring-[#f7cbb2]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="outline" size="sm" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" type="submit" className="bg-[#a73605] hover:bg-[#8e2e04]">
          Save Challenge
        </Button>
      </div>
    </form>
  );
};

export const ChallengeEditorModal: React.FC<ChallengeEditorModalProps> = ({
  isOpen,
  onClose,
  challengeToEdit,
  onSaved,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={challengeToEdit ? 'Edit Challenge' : 'Add New Challenge'}
      maxWidth="lg"
    >
      <ChallengeEditorForm
        key={challengeToEdit?.id || 'new_challenge'}
        challengeToEdit={challengeToEdit}
        onSaved={onSaved}
        onClose={onClose}
      />
    </Modal>
  );
};

