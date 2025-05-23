
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
    <div className={`flex items-center ${variant === 'icon' ? '' : 'space-x-2'}`}>
      <div className={`${sizeClasses[size]} aspect-square flex items-center justify-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105`}>
        <img 
          src="/lovable-uploads/9d60958c-dc32-4cd0-9a47-0d96ee8b0a52.png" 
          alt="AdKing Logo" 
          className={`${sizeClasses[size]}`}
        />
      </div>
      
      {variant === 'full' && (
        <span className="font-bold text-xl bg-gradient-to-r from-adking-primary to-adking-secondary bg-clip-text text-transparent transition-all duration-300 transform hover:scale-105">
          AdKing
        </span>
      )}
    </div>
  );
};

export default Logo;
