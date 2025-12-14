// Content synchronization utilities
import { Story, FoundrySmith } from '@/types';
import { getAllStories, getAllNarrators } from '@/lib/sanity/api';

interface SyncResult {
  success: boolean;
  updated: number;
  errors: string[];
}

// Synchronize content from CMS
export async function syncContentFromCMS(): Promise<SyncResult> {
  const result: SyncResult = {
    success: true,
    updated: 0,
    errors: [],
  };

  try {
    // Sync stories
    const stories = await getAllStories();
    result.updated += stories.length;

    // Sync narrators
    const narrators = await getAllNarrators();
    result.updated += narrators.length;

    // Validate data consistency
    const validationErrors = await validateDataConsistency(stories, narrators);
    if (validationErrors.length > 0) {
      result.errors.push(...validationErrors);
      result.success = false;
    }

  } catch (error) {
    result.success = false;
    result.errors.push(`Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return result;
}

// Validate data consistency across references
export async function validateDataConsistency(
  stories: Story[], 
  narrators: FoundrySmith[]
): Promise<string[]> {
  const errors: string[] = [];
  const narratorIds = new Set(narrators.map(n => n.id));

  // Check that all story narrators exist
  stories.forEach(story => {
    if (!narratorIds.has(story.narrator.id)) {
      errors.push(`Story "${story.title}" references non-existent narrator ID: ${story.narrator.id}`);
    }
  });

  // Check narrator data consistency
  narrators.forEach(narrator => {
    // Validate required fields
    if (!narrator.name || !narrator.bio) {
      errors.push(`Narrator ${narrator.id} missing required fields`);
    }

    // Validate avatar URLs
    if (!narrator.avatar.idle || !narrator.avatar.speaking) {
      errors.push(`Narrator ${narrator.name} missing avatar images`);
    }
  });

  // Check story data consistency
  stories.forEach(story => {
    // Validate required fields
    if (!story.title || !story.author || !story.content) {
      errors.push(`Story ${story.id} missing required fields`);
    }

    // Validate cover image
    if (!story.coverImage.url) {
      errors.push(`Story "${story.title}" missing cover image`);
    }

    // Validate metadata
    if (!story.metadata.genre.length) {
      errors.push(`Story "${story.title}" missing genre classification`);
    }
  });

  return errors;
}

// Auto-update content when CMS changes
export async function handleContentUpdate(documentType: string, documentId: string): Promise<void> {
  try {
    switch (documentType) {
      case 'story':
        // Invalidate story cache and update
        console.log(`Updating story: ${documentId}`);
        // In a real app, you'd update your cache/database here
        break;
      
      case 'narrator':
        // Invalidate narrator cache and update
        console.log(`Updating narrator: ${documentId}`);
        // In a real app, you'd update your cache/database here
        break;
      
      default:
        console.warn(`Unknown document type: ${documentType}`);
    }
  } catch (error) {
    console.error(`Failed to update ${documentType} ${documentId}:`, error);
    throw error;
  }
}

// Ensure narrator references are consistent across all stories
export function ensureNarratorConsistency(stories: Story[], narrators: FoundrySmith[]): Story[] {
  const narratorMap = new Map(narrators.map(n => [n.id, n]));
  
  return stories.map(story => {
    const narrator = narratorMap.get(story.narrator.id);
    if (narrator) {
      // Update story with latest narrator data
      return {
        ...story,
        narrator: {
          ...narrator,
          // Preserve any story-specific narrator overrides if needed
        }
      };
    }
    return story;
  });
}

// Content validation schema
export interface ContentValidationRule {
  field: string;
  required: boolean;
  type: 'string' | 'number' | 'array' | 'object' | 'url';
  minLength?: number;
  maxLength?: number;
}

export const storyValidationRules: ContentValidationRule[] = [
  { field: 'title', required: true, type: 'string', minLength: 1, maxLength: 200 },
  { field: 'author', required: true, type: 'string', minLength: 1, maxLength: 100 },
  { field: 'content', required: true, type: 'string', minLength: 100 },
  { field: 'description', required: true, type: 'string', minLength: 10, maxLength: 500 },
  { field: 'coverImage.url', required: true, type: 'url' },
  { field: 'metadata.genre', required: true, type: 'array' },
];

export const narratorValidationRules: ContentValidationRule[] = [
  { field: 'name', required: true, type: 'string', minLength: 1, maxLength: 100 },
  { field: 'bio', required: true, type: 'string', minLength: 10, maxLength: 1000 },
  { field: 'avatar.idle', required: true, type: 'url' },
  { field: 'avatar.speaking', required: true, type: 'url' },
  { field: 'specialties', required: true, type: 'array' },
];

// Validate content against rules
export function validateContent(content: any, rules: ContentValidationRule[]): string[] {
  const errors: string[] = [];

  rules.forEach(rule => {
    const value = getNestedValue(content, rule.field);
    
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`Required field "${rule.field}" is missing`);
      return;
    }

    if (value !== undefined && value !== null) {
      // Type validation
      if (rule.type === 'string' && typeof value !== 'string') {
        errors.push(`Field "${rule.field}" must be a string`);
      } else if (rule.type === 'array' && !Array.isArray(value)) {
        errors.push(`Field "${rule.field}" must be an array`);
      } else if (rule.type === 'url' && typeof value === 'string' && !isValidUrl(value)) {
        errors.push(`Field "${rule.field}" must be a valid URL`);
      }

      // Length validation
      if (typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(`Field "${rule.field}" must be at least ${rule.minLength} characters`);
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(`Field "${rule.field}" must be no more than ${rule.maxLength} characters`);
        }
      }
    }
  });

  return errors;
}

// Helper function to get nested object values
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Helper function to validate URLs
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}