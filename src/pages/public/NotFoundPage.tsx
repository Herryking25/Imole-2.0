import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-6xl font-black text-emerald-600 mb-2">404</span>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button variant="primary" size="md" onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </div>
  );
};

