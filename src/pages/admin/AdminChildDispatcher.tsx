import React from 'react';
import { useParams } from 'react-router-dom';
import { AdminChildProfilePage } from './AdminChildProfilePage';

export const AdminChildDispatcher: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();

  // If CHD-00124 or CHD-00126, default to Freemium profile
  if (childId === 'CHD-00124' || childId === 'CHD-00126') {
    return <AdminChildProfilePage defaultPlan="Freemium" />;
  }

  // If CHD-00123, CHD-00125, CHD-00127, default to Premium profile
  if (childId === 'CHD-00123' || childId === 'CHD-00125' || childId === 'CHD-00127') {
    return <AdminChildProfilePage defaultPlan="Premium" />;
  }

  // Default to child profile which has the interactive Freemium / Premium toggle
  return <AdminChildProfilePage />;
};

export default AdminChildDispatcher;
