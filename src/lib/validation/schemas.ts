// Data validation schemas using Zod
import { z } from 'zod';

// User Profile Validation
export const userProfileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters').max(50, 'Display name must be less than 50 characters'),
  avatarUrl: z.string().url().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    fontSize: z.enum(['small', 'medium', 'large']),
    autoplay: z.boolean(),
    preferredNarrators: z.array(z.string()),
  }),
});

// Story Filter Validation
export const storyFiltersSchema = z.object({
  search: z.string().optional(),
  genre: z.array(z.string()).optional(),
  narrator: z.array(z.string()).optional(),
  duration: z.object({
    min: z.number().min(0).optional(),
    max: z.number().max(300).optional(),
  }).optional(),
  difficulty: z.array(z.enum(['beginner', 'intermediate', 'advanced'])).optional(),
  sortBy: z.enum(['newest', 'oldest', 'popular', 'rating', 'duration']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Comment Validation
export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment must be less than 1000 characters'),
  storyId: z.string().min(1, 'Story ID is required'),
  parentId: z.string().optional(),
});

// Reading Progress Validation
export const readingProgressSchema = z.object({
  storyId: z.string().min(1, 'Story ID is required'),
  progressPercentage: z.number().min(0).max(100),
  lastPosition: z.number().min(0),
});

// Story Rating Validation
export const storyRatingSchema = z.object({
  storyId: z.string().min(1, 'Story ID is required'),
  rating: z.number().min(1).max(5),
});

// Bookmark Validation
export const bookmarkSchema = z.object({
  storyId: z.string().min(1, 'Story ID is required'),
});

// Contact Form Validation
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

// Newsletter Subscription Validation
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Search Validation
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty').max(100, 'Search query must be less than 100 characters'),
  filters: storyFiltersSchema.optional(),
});

// Pagination Validation
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// Audio State Validation
export const audioStateSchema = z.object({
  isPlaying: z.boolean(),
  currentTime: z.number().min(0),
  duration: z.number().min(0),
  volume: z.number().min(0).max(1),
  playbackRate: z.number().min(0.25).max(2),
  isLoading: z.boolean(),
  error: z.string().optional(),
});

// Utility functions for validation
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map(err => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      success: false,
      errors: ['Validation failed'],
    };
  }
};

export const validatePartialData = (schema: z.ZodObject<any>, data: unknown): { success: true; data: any } | { success: false; errors: string[] } => {
  try {
    const partialSchema = schema.partial();
    const validatedData = partialSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map(err => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      success: false,
      errors: ['Validation failed'],
    };
  }
};

// Type exports for use in components
export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type StoryFiltersInput = z.infer<typeof storyFiltersSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type ReadingProgressInput = z.infer<typeof readingProgressSchema>;
export type StoryRatingInput = z.infer<typeof storyRatingSchema>;
export type BookmarkInput = z.infer<typeof bookmarkSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type AudioStateInput = z.infer<typeof audioStateSchema>;