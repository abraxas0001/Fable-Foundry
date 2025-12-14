'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookmarkIcon, 
  ShareIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import NarratorPanel from '@/components/ui/NarratorPanel';
import ReaderControls from '@/components/ui/ReaderControls';
import StoryContent from '@/components/ui/StoryContent';
import AudioPlayer from '@/components/ui/AudioPlayer';
import { Story } from '@/types';
import { formatDuration } from '@/lib/utils/data';
import { useAudio } from '@/contexts/AudioContext';

interface StoryReaderProps {
  story: Story;
}

const StoryReader = ({ story }: StoryReaderProps) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNarrator, setShowNarrator] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showControls, setShowControls] = useState(true);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { playStory, pauseStory, audioState, currentStory } = useAudio();
  
  const isAudioPlaying = currentStory?.id === story.id && audioState.isPlaying;

  // Handle scroll for progress tracking and narrator visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      
      setReadingProgress(progress);
      
      // Show narrator at 50% progress
      setShowNarrator(progress >= 50);
      
      // Hide/show controls based on scroll direction
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you'd save this to the backend
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: `Check out "${story.title}" by ${story.author} on FableFoundry`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      pauseStory();
    } else {
      playStory(story);
      setShowAudioPlayer(true);
    }
  };

  // Generate mock story content
  const generateStoryContent = () => {
    const paragraphs = [
      "In the heart of an ancient forest, where sunlight filtered through emerald leaves like liquid gold, there stood a grove unlike any other. The trees here whispered secrets in languages forgotten by time, their branches intertwined in patterns that seemed to pulse with an otherworldly rhythm.",
      
      "Elena had been searching for this place her entire life, following clues left by her grandmother in a leather-bound journal filled with cryptic drawings and faded photographs. The journal spoke of a place where stories came alive, where the boundary between imagination and reality grew thin as morning mist.",
      
      "As she stepped into the grove, the air itself seemed to shimmer. The very ground beneath her feet hummed with ancient magic, and she could swear she heard the faint sound of distant laughter, as if children from centuries past were still playing among these timeless trees.",
      
      "The centermost tree was the largest, its trunk so wide that twenty people holding hands couldn't encircle it. Carved into its bark were symbols that seemed to shift and change when she wasn't looking directly at them. Elena reached out tentatively, her fingertips barely grazing the ancient wood.",
      
      "The moment her skin made contact with the tree, the world exploded into color and sound. Stories began to unfold around her like living tapestries—tales of brave knights and clever princesses, of dragons who wrote poetry and mice who built kingdoms. She was no longer just Elena; she was every hero, every dreamer, every soul who had ever dared to believe in magic.",
      
      "Time moved differently in the enchanted grove. Minutes felt like hours, and hours passed like heartbeats. Elena found herself living through adventure after adventure, each story more wondrous than the last. She sailed across seas of starlight, climbed mountains made of crystallized music, and danced with shadows that had learned to laugh.",
      
      "But as all stories must, this one too began to draw toward its close. The grove started to fade around the edges, like watercolors bleeding into white paper. Elena felt herself being gently pulled back to her own world, her own story, carrying with her the gift of all the tales she had experienced.",
      
      "When she finally opened her eyes, she was standing at the edge of an ordinary forest, the leather journal clutched in her hands. But something had changed. The world looked different now—more vibrant, more alive with possibility. She understood now what her grandmother had tried to tell her: magic wasn't something you found in distant places. It was something you carried within yourself, waiting to be awakened by the power of story.",
      
      "Elena smiled and began to walk home, already planning the stories she would write, the magic she would share. Behind her, if she had looked back, she might have seen the trees shimmer once more, as if winking at a secret only they understood. The enchanted grove would wait patiently for the next seeker, the next dreamer ready to discover that the most powerful magic of all was the ability to believe in the impossible."
    ];

    return paragraphs;
  };

  const storyParagraphs = generateStoryContent();

  return (
    <div className="min-h-screen bg-parchment">
      {/* Progress Bar */}
      <ProgressBar progress={readingProgress} />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: showControls ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-amber/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/library"
              className="flex items-center gap-2 text-charcoal hover:text-amber transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="font-medium">Back to Library</span>
            </Link>

            <div className="flex items-center gap-4">
              <ReaderControls
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                isAudioPlaying={isAudioPlaying}
                onToggleAudio={toggleAudio}
                onBookmark={handleBookmark}
                isBookmarked={isBookmarked}
                onShare={handleShare}
              />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Narrator Panel */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <NarratorPanel
                  narrator={story.narrator}
                  story={story}
                  isVisible={showNarrator}
                  isAudioPlaying={isAudioPlaying}
                  onToggleAudio={toggleAudio}
                />
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-3">
              <motion.article
                ref={contentRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Story Header */}
                <div className="relative h-64 md:h-80">
                  <Image
                    src={story.coverImage.url}
                    alt={story.coverImage.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.metadata.genre.map(genre => (
                        <span
                          key={genre}
                          className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
                      {story.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span>by {story.author}</span>
                      <span>•</span>
                      <span>Narrated by {story.narrator.name}</span>
                      <span>•</span>
                      <span>{formatDuration(story.metadata.duration)}</span>
                    </div>
                  </div>
                </div>

                {/* Story Text */}
                <div className="p-8 md:p-12">
                  <StoryContent
                    paragraphs={storyParagraphs}
                    fontSize={fontSize}
                  />
                </div>
              </motion.article>

              {/* Audio Player */}
              {showAudioPlayer && story.audio?.fullNarration && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-8"
                >
                  <AudioPlayer
                    src={story.audio.fullNarration}
                    title={story.title}
                    narrator={story.narrator.name}
                    isVisible={true}
                    onToggle={(playing) => {
                      if (!playing) {
                        setShowAudioPlayer(false);
                      }
                    }}
                  />
                </motion.div>
              )}

              {/* Story Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleBookmark}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'bg-amber text-white'
                          : 'bg-amber/10 text-amber hover:bg-amber/20'
                      }`}
                    >
                      {isBookmarked ? (
                        <HeartSolidIcon className="w-5 h-5" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sienna/10 text-sienna hover:bg-sienna/20 transition-colors"
                    >
                      <ShareIcon className="w-5 h-5" />
                      Share
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link href="/library">
                      <Button variant="secondary">
                        More Stories
                      </Button>
                    </Link>
                    <Link href={`/narrators/${story.narrator.id}`}>
                      <Button variant="primary">
                        More by {story.narrator.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryReader;