'use client';

import { useState } from 'react';
import CleanLayout from '@/components/layout/CleanLayout';
import Link from 'next/link';
import { 
  ChevronLeftIcon,
  BookmarkIcon,
  ShareIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { Story } from '@/types';

interface CleanStoryReaderProps {
  story: Story;
}

const CleanStoryReader = ({ story }: CleanStoryReaderProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNarrator, setShowNarrator] = useState(true);

  return (
    <CleanLayout>
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/library" className="btn btn-ghost">
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Library
        </Link>
      </div>

      {/* Story Header */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Story Cover */}
          <div className="w-full lg:w-48 aspect-[3/4] bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-white">
                  {story.title.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-muted">Story Cover</p>
            </div>
          </div>

          {/* Story Details */}
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold font-display text-primary mb-2">
              {story.title}
            </h1>
            <p className="text-lg text-secondary mb-4">
              by {story.author}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted mb-6">
              <span>Narrated by {story.narrator.name}</span>
              <span>•</span>
              <span>{story.metadata.duration} minutes</span>
              <span>•</span>
              <span>{story.metadata.genre.join(', ')}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="btn btn-primary"
              >
                {isPlaying ? (
                  <PauseIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="btn btn-secondary"
              >
                {isBookmarked ? (
                  <BookmarkSolidIcon className="w-5 h-5" />
                ) : (
                  <BookmarkIcon className="w-5 h-5" />
                )}
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>

              <button className="btn btn-ghost">
                <ShareIcon className="w-5 h-5" />
                Share
              </button>

              <button
                onClick={() => setShowNarrator(!showNarrator)}
                className="btn btn-ghost"
              >
                <SpeakerWaveIcon className="w-5 h-5" />
                {showNarrator ? 'Hide' : 'Show'} Narrator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Narrator Panel */}
        {showNarrator && (
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-white">
                    {story.narrator.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-primary">
                  {story.narrator.name}
                </h3>
                <p className="text-sm text-muted">Narrator</p>
              </div>
              
              <p className="text-sm text-secondary mb-4">
                {story.narrator.bio}
              </p>

              <div className="space-y-2">
                <h4 className="font-medium text-primary text-sm">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {story.narrator.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-accent/10 text-accent text-xs px-2 py-1 rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Story Content */}
        <div className={showNarrator ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <div className="card">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-display text-primary mb-4">
                  Chapter 1: The Beginning
                </h2>
                
                <div className="space-y-4 text-primary leading-relaxed">
                  {Array.isArray(story.content) ? (
                    story.content.map((paragraph, index) => (
                      <p key={index} className="text-base">
                        {typeof paragraph === 'string' 
                          ? paragraph 
                          : paragraph.children?.[0]?.text || ''
                        }
                      </p>
                    ))
                  ) : (
                    <p className="text-base">{story.content}</p>
                  )}
                </div>
              </div>

              {/* Chapter Navigation */}
              <div className="flex justify-between items-center pt-8 border-t">
                <button className="btn btn-ghost" disabled>
                  <ChevronLeftIcon className="w-5 h-5" />
                  Previous Chapter
                </button>
                
                <span className="text-sm text-muted">
                  Chapter 1 of 5
                </span>
                
                <button className="btn btn-secondary">
                  Next Chapter
                  <ChevronLeftIcon className="w-5 h-5 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player (when playing) */}
      {isPlaying && (
        <div className="fixed bottom-0 left-0 right-0 bg-primary border-t shadow-lg z-50">
          <div className="container">
            <div className="flex items-center gap-4 py-4">
              <button
                onClick={() => setIsPlaying(false)}
                className="btn btn-ghost btn-sm"
              >
                <PauseIcon className="w-5 h-5" />
              </button>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-primary">
                    {story.title}
                  </span>
                  <span className="text-sm text-muted">2:34 / 45:20</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              
              <button className="btn btn-ghost btn-sm">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </CleanLayout>
  );
};

export default CleanStoryReader;