// Sanity API functions for FableFoundry
import { sanityClient } from './client';
import {
  STORIES_QUERY,
  STORY_BY_SLUG_QUERY,
  FEATURED_STORIES_QUERY,
  STORIES_BY_GENRE_QUERY,
  NARRATORS_QUERY,
  NARRATOR_BY_SLUG_QUERY,
  SEARCH_STORIES_QUERY,
  ALL_GENRES_QUERY,
  ALL_NARRATORS_SIMPLE_QUERY,
  STORY_SLUGS_QUERY,
  NARRATOR_SLUGS_QUERY,
} from './queries';

// Story API functions
export async function getAllStories() {
  try {
    const stories = await sanityClient.fetch(STORIES_QUERY);
    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
}

export async function getStoryBySlug(slug: string) {
  try {
    const story = await sanityClient.fetch(STORY_BY_SLUG_QUERY, { slug });
    return story;
  } catch (error) {
    console.error('Error fetching story by slug:', error);
    return null;
  }
}

export async function getFeaturedStories() {
  try {
    const stories = await sanityClient.fetch(FEATURED_STORIES_QUERY);
    return stories;
  } catch (error) {
    console.error('Error fetching featured stories:', error);
    return [];
  }
}

export async function getStoriesByGenre(genre: string) {
  try {
    const stories = await sanityClient.fetch(STORIES_BY_GENRE_QUERY, { genre });
    return stories;
  } catch (error) {
    console.error('Error fetching stories by genre:', error);
    return [];
  }
}

export async function searchStories(searchTerm: string) {
  try {
    const stories = await sanityClient.fetch(SEARCH_STORIES_QUERY, { searchTerm });
    return stories;
  } catch (error) {
    console.error('Error searching stories:', error);
    return [];
  }
}

// Narrator API functions
export async function getAllNarrators() {
  try {
    const narrators = await sanityClient.fetch(NARRATORS_QUERY);
    return narrators;
  } catch (error) {
    console.error('Error fetching narrators:', error);
    return [];
  }
}

export async function getNarratorBySlug(slug: string) {
  try {
    const narrator = await sanityClient.fetch(NARRATOR_BY_SLUG_QUERY, { slug });
    return narrator;
  } catch (error) {
    console.error('Error fetching narrator by slug:', error);
    return null;
  }
}

export async function getNarratorsSimple() {
  try {
    const narrators = await sanityClient.fetch(ALL_NARRATORS_SIMPLE_QUERY);
    return narrators;
  } catch (error) {
    console.error('Error fetching simple narrators:', error);
    return [];
  }
}

// Utility API functions
export async function getAllGenres() {
  try {
    const genres = await sanityClient.fetch(ALL_GENRES_QUERY);
    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}

export async function getAllStorySlugs() {
  try {
    const slugs = await sanityClient.fetch(STORY_SLUGS_QUERY);
    return slugs;
  } catch (error) {
    console.error('Error fetching story slugs:', error);
    return [];
  }
}

export async function getAllNarratorSlugs() {
  try {
    const slugs = await sanityClient.fetch(NARRATOR_SLUGS_QUERY);
    return slugs;
  } catch (error) {
    console.error('Error fetching narrator slugs:', error);
    return [];
  }
}

// Preview mode functions (for content editors)
export async function getPreviewStoryBySlug(slug: string, token: string) {
  try {
    const client = sanityClient.withConfig({ token, useCdn: false });
    const story = await client.fetch(STORY_BY_SLUG_QUERY, { slug });
    return story;
  } catch (error) {
    console.error('Error fetching preview story:', error);
    return null;
  }
}

export async function getPreviewNarratorBySlug(slug: string, token: string) {
  try {
    const client = sanityClient.withConfig({ token, useCdn: false });
    const narrator = await client.fetch(NARRATOR_BY_SLUG_QUERY, { slug });
    return narrator;
  } catch (error) {
    console.error('Error fetching preview narrator:', error);
    return null;
  }
}

// Cache revalidation helper
export function revalidateContent(paths: string[]) {
  // This would be used with Next.js ISR to revalidate specific paths
  // Implementation depends on your deployment setup
  console.log('Revalidating paths:', paths);
}

// Webhook handler for content updates
export function handleWebhook(body: any) {
  const { _type, slug } = body;
  
  const pathsToRevalidate: string[] = [];
  
  if (_type === 'story' && slug?.current) {
    pathsToRevalidate.push(`/stories/${slug.current}`);
    pathsToRevalidate.push('/library');
    pathsToRevalidate.push('/');
  }
  
  if (_type === 'narrator' && slug?.current) {
    pathsToRevalidate.push(`/narrators/${slug.current}`);
    pathsToRevalidate.push('/narrators');
  }
  
  if (pathsToRevalidate.length > 0) {
    revalidateContent(pathsToRevalidate);
  }
  
  return pathsToRevalidate;
}