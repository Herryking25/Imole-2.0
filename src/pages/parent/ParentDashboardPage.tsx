import React from 'react';
import { ChildProgressOverview } from '../../components/parent/ChildProgressOverview';

export const ParentDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <ChildProgressOverview />
    </div>
  );
};

