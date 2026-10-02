import React from 'react';
import { SkillBreakdownDetail } from '../../components/parent/SkillBreakdownDetail';

export const ParentSkillBreakdownPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <SkillBreakdownDetail />
    </div>
  );
};

export default ParentSkillBreakdownPage;
