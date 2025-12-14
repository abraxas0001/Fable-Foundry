'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'amber' | 'sienna' | 'charcoal';
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'amber', 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    amber: 'border-amber border-t-transparent',
    sienna: 'border-sienna border-t-transparent',
    charcoal: 'border-charcoal border-t-transparent',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 rounded-full ${colorClasses[color]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

export default LoadingSpinner;