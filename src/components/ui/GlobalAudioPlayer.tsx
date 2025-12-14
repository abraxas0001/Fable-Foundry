'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AudioPlayer from './AudioPlayer';
import { useAudio } from '@/contexts/AudioContext';

const GlobalAudioPlayer = () => {
  const { currentStory, isPlayerVisible, setPlayerVisible } = useAudio();

  if (!isPlayerVisible || !currentStory) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={() => setPlayerVisible(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-charcoal text-white rounded-full flex items-center justify-center hover:bg-amber transition-colors z-10"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>

          {/* Audio Player */}
          <AudioPlayer
            src={currentStory.audio?.fullNarration}
            title={currentStory.title}
            narrator={currentStory.narrator.name}
            isVisible={true}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalAudioPlayer;