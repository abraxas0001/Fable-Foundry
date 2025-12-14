'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTurnAnimationProps {
  children: React.ReactNode;
  nextContent?: React.ReactNode;
  onPageTurn?: () => void;
  triggerTurn?: boolean;
}

const PageTurnAnimation = ({ 
  children, 
  nextContent, 
  onPageTurn, 
  triggerTurn = false 
}: PageTurnAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerTurn && !isAnimating) {
      handlePageTurn();
    }
  }, [triggerTurn, isAnimating]);

  const handlePageTurn = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Start the page turn animation
    setTimeout(() => {
      setShowNext(true);
      onPageTurn?.();
    }, 600); // Halfway through the animation
    
    // Complete the animation
    setTimeout(() => {
      setIsAnimating(false);
      setShowNext(false);
    }, 1200);
  };

  return (
    <div 
      ref={containerRef}
      className="page-turn-container relative w-full h-full overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Current Page */}
      <motion.div
        className={`page absolute inset-0 ${isAnimating ? 'turning' : ''}`}
        style={{
          transformOrigin: 'left center',
          backfaceVisibility: 'hidden',
          zIndex: isAnimating ? 10 : 1,
        }}
        animate={{
          rotateY: isAnimating ? -180 : 0,
        }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="w-full h-full bg-[var(--bg-book)] relative">
          {/* Page Shadow */}
          <motion.div
            className="page-shadow absolute top-0 right-0 w-12 h-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--shadow-light))',
            }}
            animate={{
              opacity: isAnimating ? 1 : 0,
            }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
            }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Page curl effect */}
          {isAnimating && (
            <motion.div
              className="absolute top-0 right-0 w-0 h-0"
              style={{
                borderLeft: '20px solid var(--bg-book)',
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
              }}
              animate={{
                right: [0, -10, 0],
              }}
              transition={{
                duration: 1.2,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Next Page (revealed during animation) */}
      <AnimatePresence>
        {showNext && nextContent && (
          <motion.div
            className="page absolute inset-0"
            style={{
              zIndex: 5,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full bg-[var(--bg-book)]">
              {nextContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background page (always visible) */}
      <div 
        className="page absolute inset-0"
        style={{ zIndex: 0 }}
      >
        <div className="w-full h-full bg-[var(--bg-book)]">
          {nextContent || children}
        </div>
      </div>

      {/* Page turn trigger area (invisible) */}
      <div
        className="absolute top-0 right-0 w-16 h-full cursor-pointer z-20"
        onClick={handlePageTurn}
        style={{ 
          background: 'transparent',
        }}
        title="Click to turn page"
      />
    </div>
  );
};

export default PageTurnAnimation;