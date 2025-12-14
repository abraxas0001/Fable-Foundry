'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme } from '@/types';

type Vibe = 'default' | 'mystery' | 'royal' | 'unreliable';
type FontSize = 'small' | 'medium' | 'large';

interface ThemeContextType {
  theme: Theme;
  vibe: Vibe;
  fontSize: FontSize;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setVibe: (vibe: Vibe) => void;
  setFontSize: (size: FontSize) => void;
  applyVibeClass: (vibeType: Vibe) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [vibe, setVibeState] = useState<Vibe>('default');
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    
    // Get preferences from localStorage or system defaults
    const savedTheme = localStorage.getItem('fable-foundry-theme') as Theme;
    const savedVibe = localStorage.getItem('fable-foundry-vibe') as Vibe;
    const savedFontSize = localStorage.getItem('fable-foundry-font-size') as FontSize;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const initialTheme = savedTheme || systemTheme;
    const initialVibe = savedVibe || 'default';
    const initialFontSize = savedFontSize || 'medium';
    
    setThemeState(initialTheme);
    setVibeState(initialVibe);
    setFontSizeState(initialFontSize);
    
    applyTheme(initialTheme);
    applyVibe(initialVibe);
    applyFontSize(initialFontSize);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
    }
  };

  const applyVibe = (newVibe: Vibe) => {
    const body = document.body;
    
    // Remove existing vibe classes
    body.classList.remove('genre-mystery', 'character-royal', 'narrator-unreliable');
    
    // Apply new vibe class
    switch (newVibe) {
      case 'mystery':
        body.classList.add('genre-mystery');
        break;
      case 'royal':
        body.classList.add('character-royal');
        break;
      case 'unreliable':
        body.classList.add('narrator-unreliable');
        break;
      default:
        // Default vibe, no additional classes
        break;
    }
  };

  const applyFontSize = (size: FontSize) => {
    const root = document.documentElement;
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
        break;
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('fable-foundry-theme', newTheme);
  };

  const setVibe = (newVibe: Vibe) => {
    setVibeState(newVibe);
    applyVibe(newVibe);
    localStorage.setItem('fable-foundry-vibe', newVibe);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    applyFontSize(size);
    localStorage.setItem('fable-foundry-font-size', size);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const applyVibeClass = (vibeType: Vibe) => {
    // Temporarily apply a vibe class for contextual styling
    const body = document.body;
    
    // Remove any temporary vibe classes
    body.classList.remove('temp-mystery', 'temp-royal', 'temp-unreliable');
    
    // Apply temporary vibe class
    if (vibeType !== 'default') {
      body.classList.add(`temp-${vibeType}`);
      
      // Remove after a delay to return to normal
      setTimeout(() => {
        body.classList.remove(`temp-${vibeType}`);
      }, 5000);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  const value: ThemeContextType = {
    theme,
    vibe,
    fontSize,
    toggleTheme,
    setTheme,
    setVibe,
    setFontSize,
    applyVibeClass,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};