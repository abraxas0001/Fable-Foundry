'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import NarratorCard from '@/components/ui/NarratorCard';
import SearchBar from '@/components/ui/SearchBar';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { FoundrySmith } from '@/types';
import { generateMockNarrator, debounce } from '@/lib/utils/data';

const NarratorsDirectory = () => {
  const [narrators, setNarrators] = useState<FoundrySmith[]>([]);
  const [filteredNarrators, setFilteredNarrators] = useState<FoundrySmith[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Generate mock narrators
  useEffect(() => {
    const generateMockData = () => {
      const mockNarrators = Array.from({ length: 12 }, (_, i) => generateMockNarrator(`${i + 1}`));
      
      setTimeout(() => {
        setNarrators(mockNarrators);
        setFilteredNarrators(mockNarrators);
        setLoading(false);
      }, 800);
    };

    generateMockData();
  }, []);

  // Filter narrators based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredNarrators(narrators);
      return;
    }

    const filtered = narrators.filter(narrator =>
      narrator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      narrator.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      narrator.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredNarrators(filtered);
  }, [searchTerm, narrators]);

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-white border-b border-amber/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-heading text-3xl md:text-5xl mb-6">
              Meet Our{' '}
              <span className="text-amber">Foundry Smiths</span>
            </h1>
            <p className="text-body text-xl text-charcoal/80 max-w-3xl mx-auto mb-8">
              Discover the talented voices behind our stories. Each Foundry Smith brings their unique 
              style and expertise to create immersive storytelling experiences.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search narrators by name or specialty..."
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-charcoal/70">
            {loading ? (
              'Loading narrators...'
            ) : (
              <>
                Showing {filteredNarrators.length} of {narrators.length} narrators
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 text-amber hover:text-sienna transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </>
            )}
          </p>
        </div>

        {/* Narrators Grid */}
        {loading ? (
          <LoadingGrid count={12} />
        ) : filteredNarrators.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-amber/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-amber/60" />
            </div>
            <h3 className="text-heading text-xl mb-2">No narrators found</h3>
            <p className="text-charcoal/60 mb-6">
              Try adjusting your search terms to find more narrators.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="btn-secondary"
            >
              Clear Search
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredNarrators.map((narrator, index) => (
              <motion.div
                key={narrator.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <NarratorCard narrator={narrator} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        {!loading && filteredNarrators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-amber/10 to-sienna/10 rounded-2xl p-8 md:p-12">
              <h3 className="text-heading text-2xl md:text-3xl mb-4">
                Ready to Listen?
              </h3>
              <p className="text-body text-lg mb-8 max-w-2xl mx-auto text-charcoal/80">
                Explore our story library to hear these talented narrators bring tales to life 
                with their unique voices and storytelling abilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Browse Stories
                </button>
                <button className="btn-secondary">
                  Learn About Audio Features
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NarratorsDirectory;