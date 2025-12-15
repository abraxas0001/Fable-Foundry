'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookmarkIcon, 
  ShareIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import ClassicalBookLayout from '@/components/layout/ClassicalBookLayout';
import PageTurnAnimation from '@/components/ui/PageTurnAnimation';
import NarratorPanel from '@/components/ui/NarratorPanel';
import AudioPlayer from '@/components/ui/AudioPlayer';
import { Story } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { useAudio } from '@/contexts/AudioContext';

interface ClassicalStoryReaderProps {
  story: Story;
}

const ClassicalStoryReader = ({ story }: ClassicalStoryReaderProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNarrator, setShowNarrator] = useState(true);
  const [triggerPageTurn, setTriggerPageTurn] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const { applyVibeClass } = useTheme();
  const { playStory, pauseStory, audioState, currentStory } = useAudio();
  
  const isAudioPlaying = currentStory?.id === story.id && audioState.isPlaying;

  // Mock chapters - in real app, this would come from story content
  const chapters = [
    {
      title: "Chapter I: The Beginning",
      content: story.content,
    },
    {
      title: "Chapter II: The Journey",
      content: "The continuation of our tale unfolds...",
    },
    {
      title: "Chapter III: The Resolution", 
      content: "And so our story reaches its conclusion...",
    }
  ];

  // Apply contextual vibe based on story genre
  useEffect(() => {
    if (story.metadata.genre.includes('mystery')) {
      applyVibeClass('mystery');
    } else if (story.metadata.genre.includes('fantasy')) {
      applyVibeClass('royal');
    }
  }, [story, applyVibeClass]);

  // Handle scroll for progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setTriggerPageTurn(true);
      setTimeout(() => {
        setCurrentChapter(prev => prev + 1);
        setTriggerPageTurn(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 600);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setTriggerPageTurn(true);
      setTimeout(() => {
        setCurrentChapter(prev => prev - 1);
        setTriggerPageTurn(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 600);
    }
  };

  const handleAudioToggle = () => {
    if (isAudioPlaying) {
      pauseStory();
    } else {
      playStory(story);
    }
  };

  const bookmarks = [
    { id: 'home', label: 'Home', href: '/', active: false },
    { id: 'library', label: 'Library', href: '/library', active: false },
    { id: 'story', label: 'Reading', href: '#', active: true },
    { id: 'community', label: 'Community', href: '/community', active: false },
  ];

  return (
    <ClassicalBookLayout bookmarks={bookmarks}>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--border-primary)] z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: readingProgress / 100 }}
        style={{ 
          background: `linear-gradient(90deg, var(--gold-accent), var(--gold-dark))`,
          transformOrigin: 'left'
        }}
      />

      {/* Story Header */}
      <div className="mb-12">
        {/* Back Navigation */}
        <Link 
          href="/library"
          className="inline-flex items-center gap-2 mb-8 text-[var(--text-muted)] hover:text-[var(--text-accent)] transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="font-body">Return to Library</span>
        </Link>

        {/* Story Title */}
        <div className="text-center mb-8">
          <h1 className="font-title text-4xl md:text-6xl text-[var(--text-accent)] mb-4">
            {story.title}
          </h1>
          <div className="chapter-divider mb-6">
            <span>❦</span>
          </div>
          <p className="font-heading text-xl text-[var(--text-secondary)] mb-2">
            by {story.author}
          </p>
          <p className="font-body text-[var(--text-muted)]">
            Narrated by {story.narrator.name}
          </p>
        </div>

        {/* Story Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="brass-plaque-button flex items-center gap-2"
          >
            <BookmarkIcon className="w-5 h-5" />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleAudioToggle}
            className="brass-plaque-button flex items-center gap-2"
          >
            {isAudioPlaying ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
            <span>{isAudioPlaying ? 'Pause' : 'Listen'}</span>
          </button>

          <button className="brass-plaque-button flex items-center gap-2">
            <ShareIcon className="w-5 h-5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => setShowNarrator(!showNarrator)}
            className="brass-plaque-button"
          >
            {showNarrator ? 'Hide Narrator' : 'Show Narrator'}
          </button>
        </div>
      </div>

      {/* Main Reading Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Narrator Panel */}
        <AnimatePresence>
          {showNarrator && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-8">
                <NarratorPanel 
                  narrator={story.narrator} 
                  story={story}
                  isVisible={true}
                  isAudioPlaying={false}
                  onToggleAudio={() => {}}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Content with Page Turn */}
        <div className={`${showNarrator ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          <PageTurnAnimation
            triggerTurn={triggerPageTurn}
            nextContent={
              <div className="p-8">
                <h2 className="font-heading text-3xl text-[var(--text-accent)] mb-8 text-center">
                  {chapters[Math.min(currentChapter + 1, chapters.length - 1)]?.title}
                </h2>
                <div className="font-body text-lg leading-relaxed text-[var(--text-primary)]">
                  {chapters[Math.min(currentChapter + 1, chapters.length - 1)]?.content}
                </div>
              </div>
            }
          >
            <div ref={contentRef} className="p-8">
              {/* Chapter Title */}
              <h2 className="font-heading text-3xl text-[var(--text-accent)] mb-8 text-center">
                {chapters[currentChapter]?.title}
              </h2>

              {/* Chapter Content */}
              <div className="font-body text-lg leading-relaxed text-[var(--text-primary)] space-y-6">
                {Array.isArray(story.content) ? (
                  story.content.map((paragraph, index) => (
                    <p key={index} className="mb-6 first-letter:text-6xl first-letter:font-title first-letter:text-[var(--text-accent)] first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                      {typeof paragraph === 'string' ? paragraph : paragraph.children?.[0]?.text || ''}
                    </p>
                  ))
                ) : (
                  <p className="mb-6 first-letter:text-6xl first-letter:font-title first-letter:text-[var(--text-accent)] first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                    {story.content}
                  </p>
                )}
              </div>

              {/* Chapter Navigation */}
              <div className="flex justify-between items-center mt-16 pt-8 border-t-2 border-[var(--border-primary)]">
                <button
                  onClick={handlePrevChapter}
                  disabled={currentChapter === 0}
                  className="ink-stamp-button flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                  <span>Previous Chapter</span>
                </button>

                <div className="text-center">
                  <span className="font-elegant text-[var(--text-muted)]">
                    Chapter {currentChapter + 1} of {chapters.length}
                  </span>
                </div>

                <button
                  onClick={handleNextChapter}
                  disabled={currentChapter === chapters.length - 1}
                  className="ink-stamp-button flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next Chapter</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </PageTurnAnimation>
        </div>
      </div>

      {/* Audio Player */}
      <AnimatePresence>
        {isAudioPlaying && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-8 right-8 z-40"
          >
            <div className="max-w-4xl mx-auto">
              <AudioPlayer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Metadata Footer */}
      <div className="mt-16 pt-8 border-t-2 border-[var(--border-primary)] text-center">
        <div className="chapter-divider mb-6">
          <span>⚜ ⚜ ⚜</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[var(--text-muted)]">
          <div>
            <span className="font-semibold">Genre:</span><br />
            {story.metadata.genre.join(', ')}
          </div>
          <div>
            <span className="font-semibold">Duration:</span><br />
            {story.metadata.duration} minutes
          </div>
          <div>
            <span className="font-semibold">Difficulty:</span><br />
            {story.metadata.difficulty}
          </div>
          <div>
            <span className="font-semibold">Rating:</span><br />
            {story.metadata.rating ? `${story.metadata.rating}/5` : 'Unrated'}
          </div>
        </div>
      </div>
    </ClassicalBookLayout>
  );
};

export default ClassicalStoryReader;