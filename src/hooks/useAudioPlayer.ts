'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AudioState } from '@/types';

interface UseAudioPlayerProps {
  src?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

export const useAudioPlayer = ({
  src,
  autoPlay = false,
  onEnded,
  onTimeUpdate
}: UseAudioPlayerProps = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
    isLoading: false,
    error: undefined,
  });

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      
      const audio = audioRef.current;
      
      // Event listeners
      const handleLoadStart = () => {
        setAudioState(prev => ({ ...prev, isLoading: true, error: undefined }));
      };

      const handleLoadedMetadata = () => {
        setAudioState(prev => ({
          ...prev,
          duration: audio.duration,
          isLoading: false,
        }));
      };

      const handleTimeUpdate = () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        
        setAudioState(prev => ({
          ...prev,
          currentTime,
          duration,
        }));

        onTimeUpdate?.(currentTime, duration);
      };

      const handlePlay = () => {
        setAudioState(prev => ({ ...prev, isPlaying: true }));
      };

      const handlePause = () => {
        setAudioState(prev => ({ ...prev, isPlaying: false }));
      };

      const handleEnded = () => {
        setAudioState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
        onEnded?.();
      };

      const handleError = (e: Event) => {
        const error = (e.target as HTMLAudioElement)?.error;
        setAudioState(prev => ({
          ...prev,
          isLoading: false,
          error: error?.message || 'Audio playback error',
          isPlaying: false,
        }));
      };

      const handleVolumeChange = () => {
        setAudioState(prev => ({ ...prev, volume: audio.volume }));
      };

      const handleRateChange = () => {
        setAudioState(prev => ({ ...prev, playbackRate: audio.playbackRate }));
      };

      // Add event listeners
      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.addEventListener('volumechange', handleVolumeChange);
      audio.addEventListener('ratechange', handleRateChange);

      // Cleanup
      return () => {
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('volumechange', handleVolumeChange);
        audio.removeEventListener('ratechange', handleRateChange);
        
        audio.pause();
        audio.src = '';
      };
    }
  }, [onEnded, onTimeUpdate]);

  // Update audio source
  useEffect(() => {
    if (audioRef.current && src) {
      audioRef.current.src = src;
      if (autoPlay) {
        play();
      }
    }
  }, [src, autoPlay]);

  // Control functions
  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio:', error);
        setAudioState(prev => ({
          ...prev,
          error: 'Failed to play audio',
          isPlaying: false,
        }));
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (audioState.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [audioState.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, audioState.duration));
    }
  }, [audioState.duration]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = Math.max(0.25, Math.min(2, rate));
    }
  }, []);

  const skipForward = useCallback((seconds: number = 10) => {
    seek(audioState.currentTime + seconds);
  }, [audioState.currentTime, seek]);

  const skipBackward = useCallback((seconds: number = 10) => {
    seek(audioState.currentTime - seconds);
  }, [audioState.currentTime, seek]);

  const mute = useCallback(() => {
    setVolume(0);
  }, [setVolume]);

  const unmute = useCallback(() => {
    setVolume(1);
  }, [setVolume]);

  return {
    audioState,
    controls: {
      play,
      pause,
      toggle,
      seek,
      setVolume,
      setPlaybackRate,
      skipForward,
      skipBackward,
      mute,
      unmute,
    },
    audioRef,
  };
};