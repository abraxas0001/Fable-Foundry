'use client';

import { motion } from 'framer-motion';

interface LoadingGridProps {
  count?: number;
  className?: string;
}

const LoadingGrid = ({ count = 12, className = "" }: LoadingGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Cover Image Skeleton */}
          <div className="h-64 bg-gradient-to-br from-amber/10 to-sienna/10 animate-pulse relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>

          {/* Content Skeleton */}
          <div className="p-6 space-y-3">
            {/* Title */}
            <div className="h-5 bg-amber/20 rounded animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
            
            {/* Author */}
            <div className="h-4 bg-sienna/20 rounded animate-pulse w-3/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
            
            {/* Narrator */}
            <div className="h-4 bg-charcoal/20 rounded animate-pulse w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>

            {/* Metadata row */}
            <div className="flex justify-between items-center pt-2">
              <div className="h-3 bg-charcoal/20 rounded animate-pulse w-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-amber/20 rounded-full animate-pulse w-16 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
                <div className="h-6 bg-amber/20 rounded-full animate-pulse w-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>

            {/* Difficulty indicators */}
            <div className="flex items-center gap-2 pt-2">
              <div className="h-3 bg-charcoal/20 rounded animate-pulse w-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-amber/20 rounded-full animate-pulse relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="h-10 bg-amber/20 rounded-lg animate-pulse mt-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingGrid;