'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '../ui/Button';
import Image from 'next/image';

const HeroSection = () => {
  const scrollToLibrary = () => {
    const librarySection = document.getElementById('library-preview');
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isNarratorHovered, setIsNarratorHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with forge-library aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-br from-parchment via-amber/10 to-sienna/20">
        <div className="absolute inset-0 opacity-30">
          {/* Decorative background pattern */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-sienna/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-golden/30 rounded-full blur-lg"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-heading text-4xl md:text-6xl lg:text-7xl leading-tight">
              Welcome to{' '}
              <span className="text-amber">FableFoundry</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-sienna">
                stories forged for you
              </span>
            </h1>
            
            <p className="text-body text-xl md:text-2xl max-w-2xl mx-auto lg:mx-0 text-charcoal/80">
              Every narrator invites you on a personal journey through the art of storytelling
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToLibrary}
                className="text-lg px-8 py-4"
              >
                Start Your Tale
              </Button>
            </motion.div>
          </motion.div>

          {/* Foundry Smith Avatar */}
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: "easeOut",
              delay: 0.5
            }}
            className="relative"
            onHoverStart={() => setIsNarratorHovered(true)}
            onHoverEnd={() => setIsNarratorHovered(false)}
          >
            <div className="animate-narrator-entry">
              {/* Foundry Smith Avatar */}
              <motion.div 
                className="relative w-80 h-80 mx-auto cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber to-sienna rounded-full shadow-2xl"></div>
                <div className="absolute inset-4 bg-parchment rounded-full flex items-center justify-center overflow-hidden">
                  <motion.div 
                    className="text-center"
                    animate={isNarratorHovered ? { y: -5 } : { y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-24 h-24 bg-amber rounded-full mx-auto mb-4 flex items-center justify-center"
                      animate={isNarratorHovered ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-4xl text-white font-bold">FS</span>
                    </motion.div>
                    <h3 className="text-heading text-xl font-bold text-charcoal">
                      Foundry Smith
                    </h3>
                    <motion.p 
                      className="text-sienna text-sm mt-2"
                      animate={isNarratorHovered ? { opacity: 1 } : { opacity: 0.7 }}
                    >
                      {isNarratorHovered ? "Ready to guide you!" : "Your Story Guide"}
                    </motion.p>
                  </motion.div>
                </div>
                
                {/* Interactive floating elements */}
                <motion.div
                  animate={{ 
                    y: isNarratorHovered ? [-15, 15, -15] : [-10, 10, -10],
                    rotate: [0, 5, 0, -5, 0],
                    scale: isNarratorHovered ? 1.2 : 1
                  }}
                  transition={{ 
                    duration: isNarratorHovered ? 2 : 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-golden rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-white text-xs">✨</span>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: isNarratorHovered ? [15, -15, 15] : [10, -10, 10],
                    x: [-5, 5, -5],
                    scale: isNarratorHovered ? 1.2 : 1
                  }}
                  transition={{ 
                    duration: isNarratorHovered ? 2.5 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-2 -left-6 w-6 h-6 bg-amber rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-white text-xs">📚</span>
                </motion.div>

                {/* Additional floating elements on hover */}
                {isNarratorHovered && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-1/4 -left-8 w-4 h-4 bg-sienna rounded-full shadow-lg"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute bottom-1/4 -right-8 w-4 h-4 bg-golden rounded-full shadow-lg"
                    />
                  </>
                )}
              </motion.div>
            </div>

            {/* Narrator introduction tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isNarratorHovered ? 1 : 0,
                y: isNarratorHovered ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 max-w-xs text-center border border-amber/20"
            >
              <p className="text-sm text-charcoal">
                "Welcome to FableFoundry! I'm here to guide you through our magical collection of stories."
              </p>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-amber/20 rotate-45"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-amber rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-amber rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;