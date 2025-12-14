// Data utility functions for FableFoundry

import { Story, FoundrySmith, FilterOptions, StoryFilters } from '@/types';

// Mock data generators for development
export const generateMockNarrator = (id: string): FoundrySmith => ({
  id,
  name: `Narrator ${id}`,
  bio: `A talented storyteller with years of experience bringing tales to life. Known for their captivating voice and ability to transport listeners to other worlds.`,
  avatar: {
    idle: `/api/placeholder/200/200?text=N${id}`,
    speaking: `/api/placeholder/200/200?text=N${id}-S`,
    introduction: `/api/placeholder/200/200?text=N${id}-I`,
  },
  voiceProfile: {
    audioSamples: [`/audio/narrator-${id}-sample.mp3`],
    characteristics: ['Warm', 'Expressive', 'Clear'],
  },
  specialties: ['Fantasy', 'Adventure'],
  socialLinks: {
    twitter: `https://twitter.com/narrator${id}`,
    website: `https://narrator${id}.com`,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const generateMockStory = (id: string, narrator: FoundrySmith): Story => {
  const titles = [
    'The Enchanted Grove',
    'Midnight at the Crossroads',
    'The Last Library',
    'Songs of the Ancient Oak',
    'The Crystal Caverns',
    'Whispers in the Wind',
    'The Forgotten Kingdom',
    'Tales of the Starlight Express',
  ];
  
  const authors = [
    'Elena Moonwhisper',
    'Marcus Shadowheart',
    'Dr. Amelia Sterling',
    'Willow Greenleaf',
    'Captain Jasper Thornfield',
    'Luna Nightingale',
    'Professor Quill',
    'Sage Thornwick',
  ];

  const genres = [
    ['Fantasy', 'Adventure'],
    ['Mystery', 'Thriller'],
    ['Sci-Fi', 'Drama'],
    ['Fantasy', 'Nature'],
    ['Adventure', 'Mystery'],
    ['Romance', 'Drama'],
    ['Historical', 'Adventure'],
    ['Fantasy', 'Comedy'],
  ];

  const randomIndex = Math.floor(Math.random() * titles.length);

  return {
    id,
    title: titles[randomIndex] || `Story ${id}`,
    author: authors[randomIndex] || `Author ${id}`,
    narrator,
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: `This is the beginning of ${titles[randomIndex]}. A tale that will take you on an incredible journey...`,
          },
        ],
      },
    ],
    metadata: {
      duration: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
      genre: genres[randomIndex] || ['Fantasy'],
      difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as 'beginner' | 'intermediate' | 'advanced',
      tags: ['popular', 'featured', 'new'].slice(0, Math.floor(Math.random() * 3) + 1),
      isNew: Math.random() > 0.7,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      ratingCount: Math.floor(Math.random() * 500) + 50,
    },
    coverImage: {
      url: `/api/placeholder/300/400?text=${encodeURIComponent(titles[randomIndex] || `Story ${id}`)}`,
      alt: `Cover image for ${titles[randomIndex]}`,
      width: 300,
      height: 400,
    },
    publishedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within last year
    slug: (titles[randomIndex] || `story-${id}`).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// Data filtering and sorting utilities
export const filterStories = (stories: Story[], filters: StoryFilters): Story[] => {
  let filteredStories = [...stories];

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredStories = filteredStories.filter(story =>
      story.title.toLowerCase().includes(searchTerm) ||
      story.author.toLowerCase().includes(searchTerm) ||
      story.narrator.name.toLowerCase().includes(searchTerm)
    );
  }

  // Genre filter
  if (filters.genre && filters.genre.length > 0) {
    filteredStories = filteredStories.filter(story =>
      filters.genre!.some(genre => story.metadata.genre.includes(genre))
    );
  }

  // Narrator filter
  if (filters.narrator && filters.narrator.length > 0) {
    filteredStories = filteredStories.filter(story =>
      filters.narrator!.includes(story.narrator.id)
    );
  }

  // Duration filter
  if (filters.duration) {
    if (filters.duration.min !== undefined) {
      filteredStories = filteredStories.filter(story => story.metadata.duration >= filters.duration!.min!);
    }
    if (filters.duration.max !== undefined) {
      filteredStories = filteredStories.filter(story => story.metadata.duration <= filters.duration!.max!);
    }
  }

  // Difficulty filter
  if (filters.difficulty && filters.difficulty.length > 0) {
    filteredStories = filteredStories.filter(story =>
      filters.difficulty!.includes(story.metadata.difficulty)
    );
  }

  return filteredStories;
};

export const sortStories = (stories: Story[], sortBy: string = 'newest', sortOrder: 'asc' | 'desc' = 'desc'): Story[] => {
  const sortedStories = [...stories];

  sortedStories.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'newest':
        comparison = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        break;
      case 'oldest':
        comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        break;
      case 'popular':
        comparison = (b.metadata.ratingCount || 0) - (a.metadata.ratingCount || 0);
        break;
      case 'rating':
        comparison = (b.metadata.rating || 0) - (a.metadata.rating || 0);
        break;
      case 'duration':
        comparison = a.metadata.duration - b.metadata.duration;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      default:
        comparison = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sortedStories;
};

// Pagination utility
export const paginateData = <T>(data: T[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: data.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
      hasNext: endIndex < data.length,
      hasPrev: page > 1,
    },
  };
};

// Format duration utility
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

// Format date utility
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

// Format relative time utility
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
  }

  return formatDate(dateObj);
};

// Generate unique slug
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// Truncate text utility
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength).trim() + '...';
};

// Get unique values from array of objects
export const getUniqueValues = <T, K extends keyof T>(array: T[], key: K): T[K][] => {
  return Array.from(new Set(array.map(item => item[key])));
};

// Debounce utility for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};