'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cog6ToothIcon, 
  SunIcon, 
  MoonIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

const ClassicalSettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, vibe, fontSize, toggleTheme, setVibe, setFontSize } = useTheme();

  const vibeOptions = [
    { value: 'default', label: 'Classical Library', description: 'Warm, scholarly atmosphere' },
    { value: 'mystery', label: 'Mystery Novel', description: 'Dark, shadowy ambiance' },
    { value: 'royal', label: 'Royal Court', description: 'Golden, ornate elegance' },
    { value: 'unreliable', label: 'Unreliable Narrator', description: 'Slightly unsettling feel' },
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: '14px' },
    { value: 'medium', label: 'Medium', description: '16px' },
    { value: 'large', label: 'Large', description: '18px' },
  ];

  return (
    <>
      {/* Wax Seal Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="settings-toggle wax-seal-button"
        aria-label="Open settings"
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 z-[999]"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="settings-panel open z-[1000]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[var(--border-primary)]">
                <h2 className="font-title text-xl text-[var(--text-accent)]">
                  Reading Preferences
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Close settings"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Theme Toggle */}
              <div className="mb-6">
                <h3 className="font-heading text-lg mb-3 text-[var(--text-primary)]">
                  Illumination
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'bg-[var(--gold-light)] border-[var(--border-accent)] text-[var(--text-primary)]'
                        : 'border-[var(--border-primary)] text-[var(--text-muted)] hover:border-[var(--border-accent)]'
                    }`}
                  >
                    <SunIcon className="w-4 h-4" />
                    <span className="font-body">Parchment</span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'bg-[var(--gold-light)] border-[var(--border-accent)] text-[var(--text-primary)]'
                        : 'border-[var(--border-primary)] text-[var(--text-muted)] hover:border-[var(--border-accent)]'
                    }`}
                  >
                    <MoonIcon className="w-4 h-4" />
                    <span className="font-body">Leather</span>
                  </button>
                </div>
              </div>

              {/* Vibe Selection */}
              <div className="mb-6">
                <h3 className="font-heading text-lg mb-3 text-[var(--text-primary)]">
                  Atmosphere
                </h3>
                <div className="space-y-2">
                  {vibeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setVibe(option.value as any)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        vibe === option.value
                          ? 'bg-[var(--gold-light)] border-[var(--border-accent)] text-[var(--text-primary)]'
                          : 'border-[var(--border-primary)] text-[var(--text-muted)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="font-body font-semibold">{option.label}</div>
                      <div className="text-sm opacity-75">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="mb-6">
                <h3 className="font-heading text-lg mb-3 text-[var(--text-primary)]">
                  Text Size
                </h3>
                <div className="flex gap-2">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value as any)}
                      className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all text-center ${
                        fontSize === option.value
                          ? 'bg-[var(--gold-light)] border-[var(--border-accent)] text-[var(--text-primary)]'
                          : 'border-[var(--border-primary)] text-[var(--text-muted)] hover:border-[var(--border-accent)]'
                      }`}
                    >
                      <div className="font-body font-semibold">{option.label}</div>
                      <div className="text-xs opacity-75">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ornate Divider */}
              <div className="chapter-divider my-6">
                <span>⚜</span>
              </div>

              {/* Additional Settings */}
              <div className="text-center">
                <p className="text-[var(--text-muted)] text-sm font-body italic">
                  "Every reader, in reading, reads himself. The writer's work is merely a kind of optical instrument that makes it possible for the reader to discern what, without this book, he would perhaps never have seen in himself."
                </p>
                <p className="text-[var(--text-accent)] text-xs mt-2 font-elegant">
                  — Marcel Proust
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClassicalSettingsPanel;