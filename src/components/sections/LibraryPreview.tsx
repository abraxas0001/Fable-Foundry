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
    <section id="library-preview" className="py-20 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-3xl md:text-5xl mb-6">
            Discover Your Next{' '}
            <span className="text-amber">Adventure</span>
          </h2>
          <p className="text-body text-xl max-w-3xl mx-auto text-charcoal/80">
            Explore our curated collection of stories, each brought to life by our talented Foundry Smiths
          </p>
        </motion.div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gradient-to-br from-amber/10 to-sienna/10 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-amber/20 rounded animate-pulse"></div>
                  <div className="h-3 bg-sienna/20 rounded animate-pulse w-3/4"></div>
                  <div className="h-3 bg-charcoal/20 rounded animate-pulse w-1/2"></div>
                  <div className="h-8 bg-amber/20 rounded animate-pulse mt-4"></div>
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

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-heading text-2xl md:text-3xl text-center mb-8">
            Browse by{' '}
            <span className="text-amber">Genre</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Fantasy', 'Mystery', 'Sci-Fi', 'Romance', 'Adventure', 'Historical'].map((genre, index) => (
              <motion.div
                key={genre}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/library?genre=${genre.toLowerCase()}`}
                  className="inline-block bg-white hover:bg-amber/10 border border-amber/30 hover:border-amber/60 rounded-full px-6 py-3 text-charcoal hover:text-amber transition-all duration-250 font-medium"
                >
                  {genre}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/library">
            <Button variant="primary" size="lg">
              Explore Full Library
            </Button>
          </Link>
          <p className="text-charcoal/60 mt-4">
            Over 500 stories waiting to be discovered
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LibraryPreview;