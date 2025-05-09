
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'full', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  return (
    <div className={`flex items-center ${variant === 'icon' ? '' : 'space-x-2'} ${className}`}>
      <div className={`${sizeClasses[size]} aspect-square flex items-center justify-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105`}>
        <img 
          src="/lovable-uploads/b98c86bf-eb30-48c8-b5cd-db790735e047.png" 
          alt="MetaMaster Logo" 
          className={`${sizeClasses[size]}`}
        />
      </div>
      
      {variant === 'full' && (
        <span className="font-bold text-xl bg-gradient-to-r from-metamaster-primary to-metamaster-secondary bg-clip-text text-transparent transition-all duration-300 transform hover:scale-105">
          MetaMaster
        </span>
      )}
    </div>
  );
};

export default Logo;
