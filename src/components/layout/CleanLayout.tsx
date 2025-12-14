'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  SunIcon, 
  MoonIcon,
  BookOpenIcon,
  UsersIcon,
  MicrophoneIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

interface CleanLayoutProps {
  children: ReactNode;
}

const CleanLayout = ({ children }: CleanLayoutProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-primary">
      {/* Clean Header */}
      <header className="page-header">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <BookOpenIcon className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold font-display text-primary">
                FableFoundry
              </span>
            </Link>

            {/* Navigation */}
            <nav className="nav">
              <Link href="/" className="nav-link">
                <HomeIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link href="/library" className="nav-link">
                <BookOpenIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Library</span>
              </Link>
              <Link href="/narrators" className="nav-link">
                <MicrophoneIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Narrators</span>
              </Link>
              <Link href="/community" className="nav-link">
                <UsersIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Community</span>
              </Link>
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="page-content">
        <div className="container">
          {children}
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="border-t bg-secondary">
        <div className="container">
          <div className="flex items-center justify-between py-8">
            <div className="flex items-center gap-3">
              <BookOpenIcon className="w-6 h-6 text-accent" />
              <span className="font-semibold text-primary">FableFoundry</span>
            </div>
            <p className="text-muted text-sm">
              © 2024 FableFoundry. Crafting stories, one voice at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CleanLayout;