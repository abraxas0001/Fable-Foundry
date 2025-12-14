'use client';

import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeToggle = ({ className = "", showLabel = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-charcoal">
          Theme
        </span>
      )}
      
      <button
        onClick={toggleTheme}
        className="relative w-14 h-8 bg-amber/20 rounded-full p-1 transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {/* Toggle Background */}
        <motion.div
          className={`absolute inset-1 rounded-full transition-colors duration-250 ${
            theme === 'dark' ? 'bg-amber' : 'bg-white'
          }`}
          animate={{
            x: theme === 'dark' ? 24 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />

        {/* Icons */}
        <div className="relative flex items-center justify-between h-full px-1">
          <SunIcon 
            className={`w-4 h-4 transition-colors duration-250 ${
              theme === 'light' ? 'text-amber' : 'text-charcoal/40'
            }`} 
          />
          <MoonIcon 
            className={`w-4 h-4 transition-colors duration-250 ${
              theme === 'dark' ? 'text-white' : 'text-charcoal/40'
            }`} 
          />
        </div>

        {/* Toggle Knob */}
        <motion.div
          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center"
          animate={{
            x: theme === 'dark' ? 24 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {theme === 'dark' ? (
            <MoonIcon className="w-3 h-3 text-amber" />
          ) : (
            <SunIcon className="w-3 h-3 text-amber" />
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;