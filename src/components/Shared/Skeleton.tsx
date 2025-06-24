import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
  variant?: 'text' | 'rectangular' | 'circular';
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  count = 1, 
  variant = 'rectangular' 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
      default:
        return 'rounded-lg';
    }
  };

  const baseClasses = `bg-warm-100 animate-pulse-gentle ${getVariantClasses()}`;

  if (count === 1) {
    return (
      <div 
        className={`${baseClasses} ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${className}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

export default Skeleton;