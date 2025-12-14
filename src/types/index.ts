// Core data types for FableFoundry

export interface FoundrySmith {
  id: string;
  name: string;
  bio: string;
  avatar: {
    idle: string;
    speaking: string;
    introduction: string;
  };
  voiceProfile: {
    audioSamples: string[];
    characteristics: string[];
  };
  specialties: string[];
  socialLinks?: {
    twitter?: string;
    website?: string;
    instagram?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  narrator: FoundrySmith;
  content: any[]; // PortableText from Sanity
  metadata: {
    duration: number; // in minutes
    genre: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    isNew?: boolean;
    rating?: number;
    ratingCount?: number;
  };
  audio?: {
    fullNarration: string;
    chapterBreaks: number[];
  };
  coverImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  publishedAt: Date;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    fontSize: 'small' | 'medium' | 'large';
    autoplay: boolean;
    preferredNarrators: string[];
  };
  readingProgress: Record<string, ReadingProgress>;
  bookmarks: string[];
  communityProfile: {
    displayName: string;
    avatar?: string;
    joinedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  storyId: string;
  content: string;
  parentId?: string;
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    displayName: string;
    avatar?: string;
  };
  replies?: Comment[];
}

export interface FilterOptions {
  genre: string[];
  duration: {
    min: number;
    max: number;
  };
  narrator: string[];
  rating: number[];
  difficulty: ('beginner' | 'intermediate' | 'advanced')[];
  isNew?: boolean;
}

export interface ReadingProgress {
  storyId: string;
  progressPercentage: number;
  lastPosition: number;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface StoryFilters {
  search?: string;
  genre?: string[];
  narrator?: string[];
  duration?: {
    min?: number;
    max?: number;
  };
  difficulty?: ('beginner' | 'intermediate' | 'advanced')[];
  sortBy?: 'newest' | 'oldest' | 'popular' | 'rating' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

// Audio types
export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isLoading: boolean;
  error?: string;
}

// Theme types
export type Theme = 'light' | 'dark';

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Validation schemas (for runtime validation)
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}