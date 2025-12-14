'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import StoryCard from '@/components/ui/StoryCard';
import Button from '@/components/ui/Button';
import FilterSidebar from '@/components/ui/FilterSidebar';
import SearchBar from '@/components/ui/SearchBar';
import SortDropdown from '@/components/ui/SortDropdown';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { Story, StoryFilters } from '@/types';
import { generateMockNarrator, generateMockStory, filterStories, sortStories, paginateData, debounce } from '@/lib/utils/data';

const StoryLibrary = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<StoryFilters>({
    sortBy: 'newest',
    sortOrder: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedStories, setBookmarkedStories] = useState<Set<string>>(new Set());

  const itemsPerPage = 12;

  // Generate mock data
  useEffect(() => {
    const generateMockData = () => {
      const mockNarrators = Array.from({ length: 8 }, (_, i) => generateMockNarrator(`${i + 1}`));
      const mockStories = Array.from({ length: 24 }, (_, i) => {
        const narratorIndex = i % mockNarrators.length;
        return generateMockStory(`${i + 1}`, mockNarrators[narratorIndex]);
      });
      
      setTimeout(() => {
        setStories(mockStories);
        setLoading(false);
      }, 800);
    };

    generateMockData();
  }, []);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((term: string) => {
      setFilters(prev => ({ ...prev, search: term }));
      setCurrentPage(1);
    }, 300),
    []
  );

  // Handle search input
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Filter and sort stories
  useEffect(() => {
    if (stories.length === 0) return;

    let result = filterStories(stories, filters);
    result = sortStories(result, filters.sortBy || 'newest', filters.sortOrder || 'desc');
    
    setFilteredStories(result);
    setCurrentPage(1);
  }, [stories, filters]);

  // Paginated stories
  const paginatedResult = useMemo(() => {
    return paginateData(filteredStories, currentPage, itemsPerPage);
  }, [filteredStories, currentPage, itemsPerPage]);

  const handleFilterChange = (newFilters: Partial<StoryFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleBookmark = (storyId: string) => {
    setBookmarkedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'newest',
      sortOrder: 'desc',
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const hasActiveFilters = !!(
    filters.search ||
    filters.genre?.length ||
    filters.narrator?.length ||
    filters.difficulty?.length ||
    filters.duration
  );

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-white border-b border-amber/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-heading text-3xl md:text-5xl mb-4">
              Story <span className="text-amber">Library</span>
            </h1>
            <p className="text-body text-xl text-charcoal/80 max-w-3xl">
              Discover your next adventure from our curated collection of stories, 
              each brought to life by our talented Foundry Smiths.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2"
              >
                <FunnelIcon className="w-5 h-5" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-amber text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </Button>
            </div>

            {/* Filter Sidebar */}
            <AnimatePresence>
              {showFilters && (
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                  onClose={() => setShowFilters(false)}
                />
              )}
            </AnimatePresence>

            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search stories, authors, or narrators..."
                />
              </div>
              <div className="sm:w-48">
                <SortDropdown
                  sortBy={filters.sortBy || 'newest'}
                  sortOrder={filters.sortOrder || 'desc'}
                  onSortChange={(sortBy, sortOrder) => 
                    handleFilterChange({ 
                      sortBy: sortBy as 'newest' | 'oldest' | 'popular' | 'rating' | 'duration',
                      sortOrder 
                    })
                  }
                />
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-charcoal/70">
                {loading ? (
                  'Loading stories...'
                ) : (
                  <>
                    Showing {paginatedResult.data.length} of {filteredStories.length} stories
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="ml-2 text-amber hover:text-sienna transition-colors"
                      >
                        Clear filters
                      </button>
                    )}
                  </>
                )}
              </p>
              
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-charcoal/60">Filters active:</span>
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm bg-amber/10 text-amber px-3 py-1 rounded-full hover:bg-amber/20 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Stories Grid */}
            {loading ? (
              <LoadingGrid count={12} />
            ) : filteredStories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-amber/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-12 h-12 text-amber/60" />
                </div>
                <h3 className="text-heading text-xl mb-2">No stories found</h3>
                <p className="text-charcoal/60 mb-6">
                  Try adjusting your search terms or filters to find more stories.
                </p>
                <Button variant="secondary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedResult.data.map((story, index) => (
                      <motion.div
                        key={story.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <StoryCard
                          story={story}
                          onBookmark={handleBookmark}
                          isBookmarked={bookmarkedStories.has(story.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {paginatedResult.pagination.totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mt-12"
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, paginatedResult.pagination.totalPages) }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-amber text-white'
                                  : 'bg-white text-charcoal hover:bg-amber/10'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCurrentPage(prev => 
                          Math.min(paginatedResult.pagination.totalPages, prev + 1)
                        )}
                        disabled={currentPage === paginatedResult.pagination.totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryLibrary;