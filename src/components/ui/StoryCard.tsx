'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import Button from './Button';
import { Story } from '@/types';
import { formatDuration } from '@/lib/utils/data';
import { useState } from 'react';

interface StoryCardProps {
  story: Story;
  showBookmark?: boolean;
  onBookmark?: (storyId: string) => void;
  isBookmarked?: boolean;
}

const StoryCard = ({ 
  story, 
  showBookmark = true, 
  onBookmark, 
  isBookmarked = false 
}: StoryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(story.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="card-modern-interactive h-full flex flex-col relative overflow-hidden"
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <Link href={`/stories/${story.slug}`} className="flex flex-col h-full relative z-10">
        {/* Cover Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          {!imageError ? (
            <>
              {/* Placeholder while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-modern-rainbow animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div 
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-2 flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-2xl">📖</span>
                      </motion.div>
                      <p className="text-white/80 text-sm font-medium">Loading story...</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Actual image */}
              <img
                src={story.coverImage.url}
                alt={story.coverImage.alt}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            // Modern fallback when image fails to load
            <div className="absolute inset-0 bg-gradient-modern-rainbow">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div 
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mx-auto mb-3 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-3xl">📚</span>
                  </motion.div>
                  <p className="text-white font-medium">Story Awaits</p>
                </div>
              </div>
            </div>
          )}

          {/* Modern Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            {story.metadata.isNew && (
              <motion.span 
                className="bg-gradient-to-r from-accent-green to-accent-blue text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-modern backdrop-blur-sm"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                ✨ New
              </motion.span>
            )}
            {showBookmark && (
              <motion.button
                onClick={handleBookmark}
                className={`p-2.5 rounded-full shadow-modern backdrop-blur-sm transition-all duration-300 ${
                  isBookmarked 
                    ? 'bg-gradient-to-r from-accent-pink to-primary-500 text-white' 
                    : 'bg-white/90 text-neutral-600 hover:bg-gradient-to-r hover:from-accent-pink hover:to-primary-500 hover:text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <HeartIcon className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {/* Modern Rating overlay */}
          {story.metadata.rating && (
            <motion.div 
              className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-modern"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{story.metadata.rating}</span>
            </motion.div>
          )}
        </div>

        {/* Modern Story Info */}
        <div className="p-6 flex-1 flex flex-col space-y-4">
          <div>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold mb-2 line-clamp-2 text-neutral-900 group-hover:text-gradient-modern transition-all duration-300">
              {story.title}
            </h3>
            
            <div className="space-y-1">
              <p className="text-neutral-600 text-sm font-medium">by {story.author}</p>
              <p className="text-neutral-500 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-gradient-modern-primary rounded-full"></span>
                Narrated by {story.narrator.name}
              </p>
            </div>
          </div>
          
          {/* Modern Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-neutral-500">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{formatDuration(story.metadata.duration)}</span>
            </div>
            <div className="flex gap-1.5">
              {story.metadata.genre.slice(0, 2).map((genre, index) => (
                <span
                  key={genre}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                    index === 0 ? 'bg-gradient-to-r from-primary-400 to-primary-500' : 
                    'bg-gradient-to-r from-accent-purple to-accent-pink'
                  }`}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Modern Difficulty indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-neutral-500">Difficulty:</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <motion.div
                    key={level}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      level <= (story.metadata.difficulty === 'beginner' ? 1 : story.metadata.difficulty === 'intermediate' ? 2 : 3)
                        ? 'bg-gradient-to-r from-accent-green to-accent-blue'
                        : 'bg-neutral-200'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </div>
            <span className="text-xs font-semibold text-neutral-600 capitalize bg-neutral-100 px-2 py-1 rounded-full">
              {story.metadata.difficulty}
            </span>
          </div>

          {/* Modern Action Button */}
          <div className="mt-auto pt-2">
            <motion.button
              className="w-full bg-gradient-to-r from-neutral-100 to-neutral-50 text-neutral-700 py-3 px-4 rounded-xl font-semibold text-sm border border-neutral-200 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-modern-sm group-hover:shadow-modern-md"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <span className="flex items-center justify-center gap-2">
                Start Reading
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;