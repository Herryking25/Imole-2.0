import React from 'react';
import logoImage from '../../assets/images/Imole-logo.png';

interface ImoleLogoProps {
  size?: number;
  className?: string;
  withGlow?: boolean;
}

export const ImoleLogo: React.FC<ImoleLogoProps> = ({
  size = 120,
  className = '',
  withGlow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {withGlow && (
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(245, 158, 11, 0.42) 0%, rgba(234, 88, 12, 0.22) 50%, rgba(245, 158, 11, 0) 75%)',
            transform: 'scale(1.4)',
            filter: 'blur(10px)',
          }}
        />
      )}

      <img
        src={logoImage}
        alt="Imole logo"
        className="relative z-10 object-contain"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

