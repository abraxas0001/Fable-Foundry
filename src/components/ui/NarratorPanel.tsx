'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FoundrySmith, Story } from '@/types';

interface NarratorPanelProps {
  narrator: FoundrySmith;
  story: Story;
  isVisible: boolean;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

const NarratorPanel = ({
  narrator,
  story,
  isVisible,
  isAudioPlaying,
  onToggleAudio
}: NarratorPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Narrator Avatar */}
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-amber/20 to-sienna/30 flex items-center justify-center">
          <div className="w-24 h-24 bg-amber rounded-full flex items-center justify-center">
            <span className="text-2xl text-white font-bold">
              {narrator.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        
        {/* Audio Control Overlay */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <button
                onClick={onToggleAudio}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-250 ${
                  isAudioPlaying
                    ? 'bg-amber text-white animate-pulse-gentle'
                    : 'bg-white text-amber hover:bg-amber hover:text-white'
                }`}
              >
                {isAudioPlaying ? (
                  <SpeakerWaveIcon className="w-8 h-8" />
                ) : (
                  <SpeakerXMarkIcon className="w-8 h-8" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Narrator Info */}
      <div className="p-6">
        <h3 className="text-heading text-xl font-bold mb-2">
          {narrator.name}
        </h3>
        
        <p className="text-charcoal/70 text-sm mb-4 leading-relaxed">
          {narrator.bio}
        </p>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-charcoal/80 mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {narrator.specialties.map(specialty => (
              <span
                key={specialty}
                className="bg-amber/10 text-amber px-2 py-1 rounded-full text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Audio Controls */}
        <div className="mb-6">
          <button
            onClick={onToggleAudio}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-250 ${
              isAudioPlaying
                ? 'bg-amber text-white'
                : 'bg-amber/10 text-amber hover:bg-amber hover:text-white'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <SpeakerWaveIcon className="w-5 h-5" />
                Playing Audio
              </>
            ) : (
              <>
                <SpeakerXMarkIcon className="w-5 h-5" />
                Play Audio
              </>
            )}
          </button>
        </div>

        {/* Narrator Profile Link */}
        <Link
          href={`/narrators/${narrator.id}`}
          className="block w-full text-center py-2 px-4 border border-amber/30 text-amber hover:bg-amber hover:text-white rounded-lg transition-all duration-250 font-medium"
        >
          View Profile
        </Link>

        {/* Reading Progress Indicator */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-3 bg-amber/10 rounded-lg"
            >
              <div className="flex items-center gap-2 text-amber text-sm">
                <div className="w-2 h-2 bg-amber rounded-full animate-pulse" />
                <span>You're halfway through!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NarratorPanel;