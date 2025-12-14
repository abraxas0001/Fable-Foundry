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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
    >
      <Link href={`/stories/${story.slug}`} className="flex flex-col h-full">
        {/* Cover Image */}
        <div className="relative h-64 overflow-hidden">
          {!imageError ? (
            <>
              {/* Placeholder while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-sienna/30 animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber/50 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl text-white">📖</span>
                      </div>
                      <p className="text-charcoal/60 text-sm">Loading...</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Actual image */}
              <img
                src={story.coverImage.url}
                alt={story.coverImage.alt}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            // Fallback when image fails to load
            <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-sienna/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber/50 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl text-white">📖</span>
                  </div>
                  <p className="text-charcoal/60 text-sm">Story Cover</p>
                </div>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {story.metadata.isNew && (
              <span className="bg-amber text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                New
              </span>
            )}
            {showBookmark && (
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full shadow-lg transition-all duration-250 ${
                  isBookmarked 
                    ? 'bg-amber text-white' 
                    : 'bg-white/90 text-charcoal hover:bg-amber hover:text-white'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <HeartIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Rating overlay */}
          {story.metadata.rating && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-lg flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-golden fill-current" />
              <span className="text-sm font-medium">{story.metadata.rating}</span>
            </div>
          )}
        </div>

        {/* Story Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-heading text-lg font-bold mb-2 line-clamp-2 group-hover:text-amber transition-colors duration-250">
            {story.title}
          </h3>
          
          <p className="text-sienna text-sm mb-1">by {story.author}</p>
          <p className="text-charcoal/70 text-sm mb-3">
            Narrated by {story.narrator.name}
          </p>
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-charcoal/60 mb-4">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{formatDuration(story.metadata.duration)}</span>
            </div>
            <div className="flex gap-1">
              {story.metadata.genre.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="bg-amber/10 text-amber px-2 py-1 rounded-full text-xs font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Difficulty indicator */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal/60">Difficulty:</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`w-2 h-2 rounded-full ${
                      level <= (story.metadata.difficulty === 'beginner' ? 1 : story.metadata.difficulty === 'intermediate' ? 2 : 3)
                        ? 'bg-amber'
                        : 'bg-amber/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-charcoal/60 capitalize">
                {story.metadata.difficulty}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            <Button
              variant="secondary"
              size="sm"
              className="w-full group-hover:bg-amber group-hover:text-white transition-all duration-250"
            >
              Read Story
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;