import React from 'react';
import { AVATAR_OPTIONS } from '../../utils/avatarUtils';

interface AvatarPickerProps {
  selectedAvatarId: string;
  onSelect: (avatarId: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  selectedAvatarId,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full">
      {AVATAR_OPTIONS.map((item) => {
        const isSelected = selectedAvatarId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
              isSelected
                ? 'border-emerald-500 bg-emerald-50 shadow-sm scale-105 ring-2 ring-emerald-200'
                : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="text-3xl sm:text-4xl mb-1.5 transform transition-transform hover:scale-110">
              {item.emoji}
            </span>
            <span className="text-[11px] font-bold text-slate-700 text-center leading-tight truncate max-w-full">
              {item.name.split(' ')[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

