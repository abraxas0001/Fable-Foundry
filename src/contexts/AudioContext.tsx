'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Story, AudioState } from '@/types';

interface AudioContextType {
  currentStory: Story | null;
  audioState: AudioState;
  isPlayerVisible: boolean;
  playStory: (story: Story) => void;
  pauseStory: () => void;
  togglePlayback: () => void;
  setPlayerVisible: (visible: boolean) => void;
  updateAudioState: (state: Partial<AudioState>) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
    isLoading: false,
  });

  const playStory = useCallback((story: Story) => {
    setCurrentStory(story);
    setIsPlayerVisible(true);
    setAudioState(prev => ({ ...prev, isPlaying: true, isLoading: true }));
  }, []);

  const pauseStory = useCallback(() => {
    setAudioState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlayback = useCallback(() => {
    setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const setPlayerVisible = useCallback((visible: boolean) => {
    setIsPlayerVisible(visible);
    if (!visible) {
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const updateAudioState = useCallback((newState: Partial<AudioState>) => {
    setAudioState(prev => ({ ...prev, ...newState }));
  }, []);

  const value: AudioContextType = {
    currentStory,
    audioState,
    isPlayerVisible,
    playStory,
    pauseStory,
    togglePlayback,
    setPlayerVisible,
    updateAudioState,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};