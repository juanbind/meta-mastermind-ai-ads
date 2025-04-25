
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'full' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  return (
    <div className={`flex items-center hover-lift ${variant === 'icon' ? '' : 'space-x-2'}`}>
      <div className={`${sizeClasses[size]} aspect-square bg-gradient-to-r from-metamaster-primary to-metamaster-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg`}>
        <span className="text-white font-bold text-lg">M</span>
      </div>
      
      {variant === 'full' && (
        <span className="font-bold text-xl bg-gradient-to-r from-metamaster-primary to-metamaster-secondary bg-clip-text text-transparent transition-all duration-300">
          MetaMaster
        </span>
      )}
    </div>
  );
};

export default Logo;
