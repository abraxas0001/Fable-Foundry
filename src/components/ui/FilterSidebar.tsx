'use client';

import { motion } from 'framer-motion';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { StoryFilters } from '@/types';
import Button from './Button';

interface FilterSidebarProps {
  filters: StoryFilters;
  onFilterChange: (filters: Partial<StoryFilters>) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  onClose?: () => void;
}

const genres = [
  'Fantasy', 'Mystery', 'Sci-Fi', 'Romance', 'Adventure', 
  'Horror', 'Drama', 'Comedy', 'Thriller', 'Historical'
];

const difficulties = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const narrators = [
  'Sage Thornwick', 'Raven Blackwood', 'Professor Quill', 'Elder Oakenheart',
  'Luna Nightingale', 'Captain Jasper', 'Dr. Amelia Sterling', 'Marcus Shadowheart'
];

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  onClose
}: FilterSidebarProps) => {
  const handleGenreToggle = (genre: string) => {
    const currentGenres = filters.genre || [];
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];
    
    onFilterChange({ 
      genre: newGenres.length > 0 ? newGenres : undefined 
    });
  };

  const handleNarratorToggle = (narrator: string) => {
    const currentNarrators = filters.narrator || [];
    const newNarrators = currentNarrators.includes(narrator)
      ? currentNarrators.filter(n => n !== narrator)
      : [...currentNarrators, narrator];
    
    onFilterChange({ 
      narrator: newNarrators.length > 0 ? newNarrators : undefined 
    });
  };

  const handleDifficultyToggle = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    const currentDifficulties = filters.difficulty || [];
    const newDifficulties = currentDifficulties.includes(difficulty)
      ? currentDifficulties.filter(d => d !== difficulty)
      : [...currentDifficulties, difficulty];
    
    onFilterChange({ 
      difficulty: newDifficulties.length > 0 ? newDifficulties : undefined 
    });
  };

  const handleDurationChange = (type: 'min' | 'max', value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    const currentDuration = filters.duration || {};
    
    onFilterChange({
      duration: {
        ...currentDuration,
        [type]: numValue,
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-amber" />
          <h3 className="text-heading text-lg font-bold">Filters</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-amber hover:text-sienna transition-colors"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Genre Filter */}
        <div>
          <h4 className="font-semibold text-charcoal mb-3">Genre</h4>
          <div className="space-y-2">
            {genres.map(genre => (
              <label key={genre} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.genre?.includes(genre) || false}
                  onChange={() => handleGenreToggle(genre)}
                  className="w-4 h-4 text-amber border-amber/30 rounded focus:ring-amber focus:ring-2"
                />
                <span className="text-sm text-charcoal/80">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <h4 className="font-semibold text-charcoal mb-3">Difficulty</h4>
          <div className="space-y-2">
            {difficulties.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.difficulty?.includes(value as any) || false}
                  onChange={() => handleDifficultyToggle(value as any)}
                  className="w-4 h-4 text-amber border-amber/30 rounded focus:ring-amber focus:ring-2"
                />
                <span className="text-sm text-charcoal/80">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <h4 className="font-semibold text-charcoal mb-3">Duration (minutes)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Min</label>
              <input
                type="number"
                min="0"
                max="300"
                value={filters.duration?.min || ''}
                onChange={(e) => handleDurationChange('min', e.target.value)}
                className="w-full px-3 py-2 border border-amber/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Max</label>
              <input
                type="number"
                min="0"
                max="300"
                value={filters.duration?.max || ''}
                onChange={(e) => handleDurationChange('max', e.target.value)}
                className="w-full px-3 py-2 border border-amber/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
                placeholder="300"
              />
            </div>
          </div>
        </div>

        {/* Narrator Filter */}
        <div>
          <h4 className="font-semibold text-charcoal mb-3">Narrator</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {narrators.map(narrator => (
              <label key={narrator} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.narrator?.includes(narrator) || false}
                  onChange={() => handleNarratorToggle(narrator)}
                  className="w-4 h-4 text-amber border-amber/30 rounded focus:ring-amber focus:ring-2"
                />
                <span className="text-sm text-charcoal/80">{narrator}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button (Mobile) */}
      {onClose && (
        <div className="mt-6 lg:hidden">
          <Button
            variant="primary"
            className="w-full"
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default FilterSidebar;