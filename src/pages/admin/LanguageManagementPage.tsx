import React from 'react';
import { LanguageManager } from '../../components/admin/LanguageManager';

export const LanguageManagementPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <LanguageManager />
    </div>
  );
};

