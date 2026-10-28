import React from 'react';
import { useParams } from 'react-router-dom';
import { AdminChildFreemiumPage } from './AdminChildFreemiumPage';
import { AdminChildProfilePage } from './AdminChildProfilePage';

export const AdminChildDispatcher: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();

  // If CHD-00124 (Liam Johnson), show the Freemium child design (Image 2)
  if (childId === 'CHD-00124') {
    return <AdminChildFreemiumPage />;
  }

  // Default to Emma Johnson's Admin Child Profile (Image 4 & 5)
  return <AdminChildProfilePage />;
};
