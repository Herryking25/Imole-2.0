import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ParentProfileService } from '../services/parentProfileService';
import { ParentApiClient } from '../services/api/parentApiClient';
import { ParentUnlockPage } from '../pages/parent/ParentUnlockPage';

export const ParentLayout: React.FC = () => {
  const hasBackendToken = ParentApiClient.hasToken();
  const isComplete = ParentProfileService.isProfileComplete() || hasBackendToken;
  const hasPin = ParentProfileService.hasPin();
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return !hasPin || ParentProfileService.isSessionUnlocked();
  });

  if (!isComplete) {
    return <Navigate to="/parent/auth" replace />;
  }

  if (hasPin && !isUnlocked) {
    return <ParentUnlockPage onUnlockSuccess={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F6] font-sans">
      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default ParentLayout;
