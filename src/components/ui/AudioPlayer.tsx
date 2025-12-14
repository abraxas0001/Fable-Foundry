'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ForwardIcon,
  BackwardIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { formatDuration } from '@/lib/utils/data';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  narrator?: string;
  isVisible?: boolean;
  onToggle?: (isPlaying: boolean) => void;
  className?: string;
}

const AudioPlayer = ({
  src,
  title,
  narrator,
  isVisible = true,
  onToggle,
  className = ""
}: AudioPlayerProps) => {
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const { audioState, controls } = useAudioPlayer({
    src,
    onTimeUpdate: (currentTime, duration) => {
      // Could be used for progress tracking
    },
    onEnded: () => {
      onToggle?.(false);
    }
  });

  useEffect(() => {
    onToggle?.(audioState.isPlaying);
  }, [audioState.isPlaying, onToggle]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    controls.setVolume(volume);
    setIsMuted(volume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    controls.seek(time);
  };

  const toggleMute = () => {
    if (isMuted) {
      controls.unmute();
      setIsMuted(false);
    } else {
      controls.mute();
      setIsMuted(true);
    }
  };

  const progressPercentage = audioState.duration > 0 
    ? (audioState.currentTime / audioState.duration) * 100 
    : 0;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`bg-white rounded-xl shadow-lg border border-amber/20 ${className}`}
      >
        {/* Compact Player */}
        <div className="p-4">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={controls.toggle}
              disabled={audioState.isLoading}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250 ${
                audioState.isPlaying
                  ? 'bg-amber text-white'
                  : 'bg-amber/10 text-amber hover:bg-amber hover:text-white'
              } ${audioState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {audioState.isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : audioState.isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6 ml-0.5" />
              )}
            </button>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              {title && (
                <h4 className="font-medium text-charcoal truncate">{title}</h4>
              )}
              {narrator && (
                <p className="text-sm text-charcoal/60 truncate">
                  Narrated by {narrator}
                </p>
              )}
            </div>

            {/* Controls Toggle */}
            <button
              onClick={() => setShowControls(!showControls)}
              className="p-2 text-charcoal/60 hover:text-amber transition-colors"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center gap-2 text-xs text-charcoal/60 mb-2">
              <span>{formatDuration(Math.floor(audioState.currentTime / 60))}</span>
              <div className="flex-1 relative">
                <div className="h-1 bg-amber/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={audioState.duration}
                  value={audioState.currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span>{formatDuration(Math.floor(audioState.duration / 60))}</span>
            </div>
          </div>

          {/* Error Display */}
          {audioState.error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{audioState.error}</p>
            </div>
          )}
        </div>

        {/* Extended Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-amber/20 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => controls.skipBackward(10)}
                    className="p-2 text-charcoal/60 hover:text-amber transition-colors"
                    title="Skip back 10s"
                  >
                    <BackwardIcon className="w-5 h-5" />
                  </button>

                  <button
                    onClick={controls.toggle}
                    className="w-10 h-10 rounded-full bg-amber text-white flex items-center justify-center hover:bg-sienna transition-colors"
                  >
                    {audioState.isPlaying ? (
                      <PauseIcon className="w-5 h-5" />
                    ) : (
                      <PlayIcon className="w-5 h-5 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() => controls.skipForward(10)}
                    className="p-2 text-charcoal/60 hover:text-amber transition-colors"
                    title="Skip forward 10s"
                  >
                    <ForwardIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="text-charcoal/60 hover:text-amber transition-colors"
                  >
                    {isMuted || audioState.volume === 0 ? (
                      <SpeakerXMarkIcon className="w-5 h-5" />
                    ) : (
                      <SpeakerWaveIcon className="w-5 h-5" />
                    )}
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={audioState.volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-amber/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <span className="text-xs text-charcoal/60 w-8">
                    {Math.round(audioState.volume * 100)}%
                  </span>
                </div>

                {/* Playback Speed */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-charcoal/60 w-12">Speed:</span>
                  <div className="flex gap-2">
                    {[0.75, 1, 1.25, 1.5, 2].map(rate => (
                      <button
                        key={rate}
                        onClick={() => controls.setPlaybackRate(rate)}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                          audioState.playbackRate === rate
                            ? 'bg-amber text-white'
                            : 'bg-amber/10 text-amber hover:bg-amber/20'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudioPlayer;