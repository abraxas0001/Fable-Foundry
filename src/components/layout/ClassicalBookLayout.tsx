'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import ClassicalSettingsPanel from '@/components/ui/ClassicalSettingsPanel';

interface ClassicalBookLayoutProps {
  children: ReactNode;
  showBookmarks?: boolean;
  bookmarks?: Array<{ id: string; label: string; href: string; active?: boolean }>;
}

const ClassicalBookLayout = ({ 
  children, 
  showBookmarks = true, 
  bookmarks = [] 
}: ClassicalBookLayoutProps) => {
  
  const defaultBookmarks = [
    { id: 'home', label: 'Home', href: '/', active: false },
    { id: 'library', label: 'Library', href: '/library', active: false },
    { id: 'narrators', label: 'Narrators', href: '/narrators', active: false },
    { id: 'community', label: 'Community', href: '/community', active: false },
  ];

  const displayBookmarks = bookmarks.length > 0 ? bookmarks : defaultBookmarks;

  return (
    <div className="min-h-screen bg-[var(--bg-desk)] p-4 md:p-8">
      {/* Wooden Desk Background Effect */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--bg-wood), transparent 70%)',
        }}
      />

      {/* Main Book Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: -5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="book-container relative max-w-6xl mx-auto"
      >
        {/* Book Spine Shadow */}
        <div 
          className="absolute -left-2 top-2 bottom-2 w-4 bg-gradient-to-r from-[var(--shadow-heavy)] to-transparent rounded-l-lg"
          style={{ transform: 'perspective(100px) rotateY(-5deg)' }}
        />

        {/* Bookmark Navigation */}
        {showBookmarks && (
          <nav className="bookmark-nav">
            {displayBookmarks.map((bookmark, index) => (
              <motion.a
                key={bookmark.id}
                href={bookmark.href}
                className={`bookmark ${bookmark.active ? 'active' : ''}`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ x: -5 }}
              >
                {bookmark.label}
              </motion.a>
            ))}
          </nav>
        )}

        {/* Main Book Content */}
        <div className="book-page relative">
          {/* Page Margin Lines */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--border-primary)] opacity-30" />
          <div className="absolute left-12 top-0 bottom-0 w-px bg-[var(--border-primary)] opacity-20" />
          
          {/* Content Area */}
          <div className="relative z-10">
            {children}
          </div>

          {/* Decorative Corner Flourishes */}
          <div className="absolute top-4 left-4 w-8 h-8 opacity-20">
            <svg viewBox="0 0 32 32" className="w-full h-full fill-[var(--text-accent)]">
              <path d="M2 2 L30 2 L30 4 L4 4 L4 30 L2 30 Z" />
              <path d="M6 6 L26 6 L26 8 L8 8 L8 26 L6 26 Z" />
            </svg>
          </div>
          
          <div className="absolute top-4 right-4 w-8 h-8 opacity-20 transform rotate-90">
            <svg viewBox="0 0 32 32" className="w-full h-full fill-[var(--text-accent)]">
              <path d="M2 2 L30 2 L30 4 L4 4 L4 30 L2 30 Z" />
              <path d="M6 6 L26 6 L26 8 L8 8 L8 26 L6 26 Z" />
            </svg>
          </div>
          
          <div className="absolute bottom-4 left-4 w-8 h-8 opacity-20 transform -rotate-90">
            <svg viewBox="0 0 32 32" className="w-full h-full fill-[var(--text-accent)]">
              <path d="M2 2 L30 2 L30 4 L4 4 L4 30 L2 30 Z" />
              <path d="M6 6 L26 6 L26 8 L8 8 L8 26 L6 26 Z" />
            </svg>
          </div>
          
          <div className="absolute bottom-4 right-4 w-8 h-8 opacity-20 transform rotate-180">
            <svg viewBox="0 0 32 32" className="w-full h-full fill-[var(--text-accent)]">
              <path d="M2 2 L30 2 L30 4 L4 4 L4 30 L2 30 Z" />
              <path d="M6 6 L26 6 L26 8 L8 8 L8 26 L6 26 Z" />
            </svg>
          </div>

          {/* Random Ink Blots for Unreliable Narrator */}
          <div className="ink-blot w-3 h-3 absolute top-1/4 right-1/3" />
          <div className="ink-blot w-2 h-2 absolute bottom-1/3 left-1/4" />
          <div className="ink-blot w-4 h-4 absolute top-2/3 right-1/4 opacity-50" />
        </div>

        {/* Book Binding Details */}
        <div className="absolute left-0 top-8 bottom-8 w-1 bg-[var(--gold-accent)] rounded-full opacity-60" />
        <div className="absolute left-0 top-16 bottom-16 w-px bg-[var(--border-ornate)] opacity-40" />
      </motion.div>

      {/* Settings Panel */}
      <ClassicalSettingsPanel />

      {/* Ambient Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--gold-accent)] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassicalBookLayout;