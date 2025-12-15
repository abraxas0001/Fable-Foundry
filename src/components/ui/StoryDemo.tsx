'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const StoryDemo = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const storyPages = [
    {
      title: "Whispers in the Borders of Eldridge Hollow",
      content: `Under the night's starlit quilt, the air turned as if it had been carved from the very murmurs of the past. I was tired of the monotony that kept me shackled to a cramped office in the city—a place I had left in search of a story that could not be found at any magazine desk.

My compass had lost my taste for new beginnings. It was that evening, while a storm threatened to break over the Saffron Hills, that I found myself dropped upon a weathered satchel by some stranger at a crossing.

The satchel—I hope you don't think it was merely an accident—contained a single, sealed parchment: a letter in a hand that was as delicate as a crinkled parchment hawthorn leaf.`,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Letter Unveiled",
      content: `"Jessie Whitaker's House of Secrets"—the hands were almost octagonal in shape. The ink had already brushed off, likeness emblazoned deeply on a sheet that had fogged through the years.

I couldn't ignore the letter. The notion of delivering a poetic past into a city determined me to turn toward Eldridge Hollow, a place that I had ever fainted from the city—a place that thrived in the shadows of day.

All its citizens weren't from this year: amidst the labyrinth of ghosts, in the setting I discovered, all fascinated by whispered tales of old.`,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Landing at Eldridge Hollow",
      content: `At the edge of the city, the last light of downtown was extinguished. I arrived at the small wrought-iron gate, rusted but detailed. The tree was formal looking, with rivulets that seemed to call from an empty line.

Then a car came—a shabby cabin that looked like a relic of ember. There was Thomas, an 80-year-old, who told me about the walls of this very old house. His voice had been powerless, echoing up from his basement in silence.

The town's secret was about to unfold before my very eyes.`,
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Lighthouse Mystery",
      content: `Eldridge Hollow was a border town, but when the sun hit the broadly silvered roofs, it was like moonburned sorrow coiling with charm through the fog holes.

At the base of the town stood the old lighthouse—not a lighthouse, but a building that had grown from the hillside itself. This terrifying thing had a sort of clawed drive, and the assembled square was known as "Old Myra's House."

The eyes of the building were good when I'd been there. The center of my world, my nerve, my heart—the things I had burned. A sense that kept overflowing inward, calling me deeper into the mystery.`,
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % storyPages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + storyPages.length) % storyPages.length);
  };

  const currentStory = storyPages[currentPage];

  return (
    <div className="relative">
      {/* Demo Toggle Button */}
      <motion.button
        onClick={() => setIsReading(!isReading)}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700 shadow-modern border border-neutral-200/50 hover:bg-white hover:shadow-modern-md transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <BookOpenIcon className="w-4 h-4" />
        {isReading ? 'Close Story Demo' : 'Try Reading Experience'}
      </motion.button>

      {/* Story Demo */}
      <AnimatePresence>
        {isReading && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 blur-3xl rounded-3xl opacity-60"></div>
            
            {/* Main story card */}
            <div className="relative vintage-paper aged-paper rounded-3xl shadow-modern-xl border border-amber-200/50 overflow-hidden book-binding story-atmosphere-eldridge">
              {/* Story image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  key={currentPage}
                  src={currentStory.image}
                  alt={currentStory.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Page indicator */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentPage + 1} / {storyPages.length}
                </div>
              </div>

              {/* Story content */}
              <div className="p-8 manuscript-lines quill-cursor">
                <motion.h3
                  key={`title-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="handwritten-title text-3xl text-amber-900 mb-8 leading-tight chapter-decoration ink-blot"
                >
                  {currentStory.title}
                </motion.h3>

                <motion.div
                  key={`content-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative"
                >
                  {/* Handwritten style text */}
                  <div className="handwritten-text text-lg text-amber-800 space-y-6">
                    {currentStory.content.split('\n\n').map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                        className={`handwritten-paragraph relative ${
                          index % 3 === 0 ? 'ml-2' : index % 3 === 1 ? 'mr-1' : 'ml-1'
                        }`}
                        style={{
                          transform: `rotate(${(Math.sin(index) * 0.3)}deg)`,
                          marginTop: index > 0 ? '1.5rem' : '0'
                        }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 text-amber-300/30 text-8xl font-['Dancing_Script'] leading-none transform -rotate-12">
                    "
                  </div>
                  
                  {/* Vintage flourish */}
                  <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
                      <path d="M20,50 Q50,20 80,50 Q50,80 20,50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
                      <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-amber-200/50">
                  <motion.button
                    onClick={prevPage}
                    className="flex items-center gap-2 px-4 py-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-xl transition-all duration-200 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    Previous
                  </motion.button>

                  {/* Page dots */}
                  <div className="flex gap-2">
                    {storyPages.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentPage 
                            ? 'bg-amber-600 w-6' 
                            : 'bg-amber-300 hover:bg-amber-400'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={nextPage}
                    className="flex items-center gap-2 px-4 py-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-xl transition-all duration-200 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={currentPage === storyPages.length - 1}
                  >
                    Next
                    <ChevronRightIcon className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Story metadata */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-6 pt-4 border-t border-amber-200/50 flex items-center justify-between text-sm text-amber-600"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      AI Narrator: Eleanor Blackwood
                    </span>
                    <span>Gothic Mystery</span>
                  </div>
                  <span>~15 min read</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryDemo;