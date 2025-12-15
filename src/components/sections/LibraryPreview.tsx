'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import StoryCard from '../ui/StoryCard';
import { generateMockNarrator, generateMockStory, formatDuration } from '@/lib/utils/data';
import { Story } from '@/types';

const LibraryPreview = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock data for preview
    const mockNarrators = Array.from({ length: 4 }, (_, i) => generateMockNarrator(`${i + 1}`));
    const mockStories = mockNarrators.map((narrator, i) => generateMockStory(`${i + 1}`, narrator));
    
    // Simulate loading delay
    setTimeout(() => {
      setStories(mockStories);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <section id="library-preview" className="section-modern bg-gradient-to-br from-neutral-50 via-primary-50/30 to-neutral-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent-blue/20 to-accent-green/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-modern relative z-10">
        {/* Modern Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-neutral-700 shadow-modern border border-neutral-200/50 mb-6"
          >
            <span className="w-2 h-2 bg-gradient-modern-primary rounded-full mr-2 animate-pulse-modern"></span>
            ✨ Curated Stories
          </motion.div>
          
          <h2 className="font-['Space_Grotesk'] text-display-lg lg:text-display-xl font-bold text-neutral-900 mb-6 leading-tight">
            Discover stories that{' '}
            <span className="text-gradient-modern">spark joy</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Every story is carefully crafted and narrated by AI personalities who understand your unique taste
          </p>
        </motion.div>

        {/* Modern Story Grid */}
        <div className="grid-modern-4 mb-20">
          {loading ? (
            // Modern Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-modern h-96"
              >
                <div className="h-64 bg-gradient-modern-rainbow animate-pulse rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-neutral-200 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-neutral-200 rounded-lg animate-pulse w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded-lg animate-pulse w-1/2"></div>
                  <div className="h-10 bg-neutral-200 rounded-xl animate-pulse mt-6"></div>
                </div>
              </motion.div>
            ))
          ) : (
            stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StoryCard story={story} />
              </motion.div>
            ))
          )}
        </div>

        {/* Modern Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="font-['Space_Grotesk'] text-display-sm font-bold text-center mb-12 text-neutral-900">
            Explore by{' '}
            <span className="text-gradient-modern">genre</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Fantasy', emoji: '🧙‍♂️', gradient: 'from-accent-purple to-accent-pink' },
              { name: 'Mystery', emoji: '🔍', gradient: 'from-neutral-600 to-neutral-800' },
              { name: 'Sci-Fi', emoji: '🚀', gradient: 'from-accent-blue to-accent-green' },
              { name: 'Romance', emoji: '💕', gradient: 'from-accent-pink to-primary-400' },
              { name: 'Adventure', emoji: '⚔️', gradient: 'from-primary-500 to-accent-green' },
              { name: 'Historical', emoji: '🏛️', gradient: 'from-amber-500 to-orange-500' }
            ].map((genre, index) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/library?genre=${genre.name.toLowerCase()}`}
                  className="group"
                >
                  <motion.div
                    className={`inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm hover:bg-white border border-neutral-200/50 hover:border-neutral-300 rounded-2xl px-6 py-4 text-neutral-700 hover:text-neutral-900 transition-all duration-300 font-semibold shadow-modern hover:shadow-modern-md`}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${genre.gradient} rounded-xl flex items-center justify-center text-white shadow-modern group-hover:shadow-modern-md transition-all duration-300`}>
                      <span className="text-sm">{genre.emoji}</span>
                    </div>
                    {genre.name}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modern Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-modern p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-neutral-900 mb-4">
              Ready to dive deeper?
            </h3>
            <p className="text-neutral-600 mb-8 text-lg">
              Discover over <span className="font-bold text-gradient-modern">500+ stories</span> waiting to be explored
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/library">
                <motion.button
                  className="btn-modern-primary text-base px-8 py-4 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore Full Library</span>
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
              
              <motion.button
                className="btn-modern-secondary text-base px-8 py-4 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Personalized Picks</span>
                <span className="ml-2 group-hover:scale-110 transition-transform duration-200">✨</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LibraryPreview;