'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar = ({ progress, className = "" }: ProgressBarProps) => {
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="h-1 bg-amber/20">
        <motion.div
          className="h-full bg-gradient-to-r from-amber to-golden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;