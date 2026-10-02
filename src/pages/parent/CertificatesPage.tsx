import React from 'react';
import { CertificateCard } from '../../components/parent/CertificateCard';

export const CertificatesPage: React.FC = () => {
  return (
    <div className="w-full py-2 sm:py-4 flex justify-center">
      <CertificateCard />
    </div>
  );
};

export default CertificatesPage;

