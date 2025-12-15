'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import StoryDemo from '../ui/StoryDemo';

const HeroSection = () => {
  const scrollToLibrary = () => {
    const librarySection = document.getElementById('library-preview');
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isNarratorHovered, setIsNarratorHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-primary-50 to-neutral-100">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary-200/30 to-accent-purple/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-r from-accent-blue/20 to-primary-300/30 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * -0.015,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-accent-pink/20 to-accent-green/20 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
            rotate: [0, 360],
          }}
          transition={{
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-modern text-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-modern-lg text-left lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700 shadow-modern border border-neutral-200/50"
            >
              <span className="w-2 h-2 bg-gradient-modern-primary rounded-full mr-2 animate-pulse-modern"></span>
              ✨ Welcome to the future of storytelling
            </motion.div>

            <h1 className="font-['Space_Grotesk'] text-display-xl lg:text-display-2xl font-bold text-neutral-900 leading-none">
              Stories that{' '}
              <span className="text-gradient-modern">adapt</span>
              <br />
              to your{' '}
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                imagination
              </motion.span>
            </h1>
            
            <p className="text-xl text-neutral-600 max-w-xl leading-relaxed">
              Experience personalized narratives with AI-powered narrators who bring each story to life just for you.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToLibrary}
                className="btn-modern-primary text-base px-8 py-4 font-semibold group"
              >
                <span>Start Your Journey</span>
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </button>
              
              <button className="btn-modern-secondary text-base px-8 py-4 font-semibold group">
                <span>Watch Demo</span>
                <span className="ml-2 group-hover:scale-110 transition-transform duration-200">▶</span>
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 pt-8"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-white shadow-modern narrator-avatar-${i + 1} flex items-center justify-center text-white font-semibold text-sm`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-neutral-600">
                <div className="font-semibold text-neutral-900">10,000+ readers</div>
                <div>already exploring stories</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Story Demo Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1,
              ease: "easeOut",
              delay: 0.5
            }}
            className="relative w-full max-w-2xl mx-auto"
          >
            <StoryDemo />
          </motion.div>
        </div>
      </div>

      {/* Modern scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToLibrary}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <span className="text-xs font-medium">Explore Stories</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-current rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;