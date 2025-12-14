// Sanity client configuration
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity configuration
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};

// Create Sanity client
export const sanityClient = createClient(sanityConfig);

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);

// Helper function to get optimized image URL
export const getImageUrl = (
  source: any,
  width?: number,
  height?: number,
  quality: number = 80
) => {
  let imageBuilder = urlFor(source).quality(quality);
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  return imageBuilder.url();
};

// Helper function to get responsive image URLs
export const getResponsiveImageUrls = (source: any) => {
  return {
    small: getImageUrl(source, 400, 300),
    medium: getImageUrl(source, 800, 600),
    large: getImageUrl(source, 1200, 900),
    original: urlFor(source).url(),
  };
};