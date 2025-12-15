'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'modern-primary' | 'modern-secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-modern-lg focus:ring-primary-500 rounded-lg',
      secondary: 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 hover:shadow-modern-md focus:ring-neutral-500 rounded-lg',
      ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-500 rounded-lg',
      'modern-primary': 'btn-modern-primary',
      'modern-secondary': 'btn-modern-secondary',
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-xl',
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
      <motion.button
        ref={ref}
        className={combinedClasses}
        whileHover={{ 
          scale: 1.02,
          y: -1,
        }}
        whileTap={{ 
          scale: 0.98,
          y: 0,
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut"
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;