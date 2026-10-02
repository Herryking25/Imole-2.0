import React, { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Edit } from 'lucide-react';
import { ChallengeService } from '../../services/challengeService';
import type { Challenge, DifficultyLevel } from '../../types/challenge';
import type { SkillId } from '../../types/skills';
import { SKILL_LIST } from '../../data/skills';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface ChallengeListProps {
  onEditChallenge: (challenge: Challenge) => void;
  onAddNew: () => void;
}

export const ChallengeList: React.FC<ChallengeListProps> = ({
  onEditChallenge,
  onAddNew,
}) => {
  const [skillFilter, setSkillFilter] = useState<SkillId | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const challenges = ChallengeService.filterChallenges({
    skillId: skillFilter,
    difficulty: difficultyFilter,
    searchQuery,
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#a73605]" />
            <span>Challenge Library</span>
            <span className="text-xs font-bold bg-[#fff1ea] text-[#a73605] px-2.5 py-0.5 rounded-full">
              {challenges.length} Curated
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize challenges across the 5 essential Nigerian life skill categories.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onAddNew}
          icon={<Plus className="w-4 h-4" />}
          className="bg-[#a73605] hover:bg-[#8e2e04]"
        >
          Add New Challenge
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#f7cbb2]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value as SkillId | 'all')}
            className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#f7cbb2]"
          >
            <option value="all">All Skills (5 Areas)</option>
            {SKILL_LIST.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as DifficultyLevel | 'all')}
            className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#f7cbb2]"
          >
            <option value="all">All Difficulties</option>
            <option value="primary">Primary School</option>
            <option value="jss">Junior Secondary (JSS)</option>
            <option value="sss">Senior Secondary (SSS)</option>
          </select>
        </div>
      </div>

      {/* Table / List */}
      <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
        {challenges.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            No challenges match your active filter.
          </div>
        ) : (
          challenges.map((c) => (
            <div
              key={c.id}
              className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="info" size="sm">
                    Day {c.dayNumber}
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    {c.difficulty.toUpperCase()}
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {c.skillId.replace(/-/g, ' ')}
                  </span>
                  <span className="text-[11px] font-bold text-[#a73605] bg-[#fff1ea] px-2 py-0.2 rounded-md">
                    +{c.points} pts
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate">{c.title.en}</h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">{c.scenario.en}</p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditChallenge(c)}
                  icon={<Edit className="w-3.5 h-3.5" />}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

