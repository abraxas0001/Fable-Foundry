'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'image';
  lines?: number;
}

const SkeletonLoader = ({ 
  className = '', 
  variant = 'text', 
  lines = 1 
}: SkeletonLoaderProps) => {
  const shimmerAnimation = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear' as const,
    },
  };

  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded';

  if (variant === 'text') {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`${baseClasses} h-4 mb-2 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
            {...shimmerAnimation}
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <motion.div
        className={`${baseClasses} w-12 h-12 rounded-full ${className}`}
        {...shimmerAnimation}
      />
    );
  }

  if (variant === 'image') {
    return (
      <motion.div
        className={`${baseClasses} w-full h-48 ${className}`}
        {...shimmerAnimation}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-6 ${className}`}>
        <motion.div
          className={`${baseClasses} w-full h-48 mb-4`}
          {...shimmerAnimation}
        />
        <motion.div
          className={`${baseClasses} h-6 mb-2`}
          {...shimmerAnimation}
        />
        <motion.div
          className={`${baseClasses} h-4 mb-2`}
          {...shimmerAnimation}
        />
        <motion.div
          className={`${baseClasses} h-4 w-3/4`}
          {...shimmerAnimation}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      {...shimmerAnimation}
    />
  );
};

export default SkeletonLoader;