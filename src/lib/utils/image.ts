// Image optimization utilities for FableFoundry
import { urlFor } from '@/lib/sanity/client';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface OptimizedImageUrls {
  small: string;
  medium: string;
  large: string;
  original: string;
}

// Generate optimized image URLs for different screen sizes
export const getOptimizedImageUrls = (
  imageSource: any,
  aspectRatio?: number
): OptimizedImageUrls => {
  const baseBuilder = urlFor(imageSource);

  // Define breakpoints
  const breakpoints = {
    small: 400,
    medium: 800,
    large: 1200,
  };

  const urls: OptimizedImageUrls = {
    small: (() => {
      let builder = baseBuilder.width(breakpoints.small);
      if (aspectRatio) {
        builder = builder.height(Math.round(breakpoints.small / aspectRatio));
      }
      return builder.quality(80).format('webp').url();
    })(),
    medium: (() => {
      let builder = baseBuilder.width(breakpoints.medium);
      if (aspectRatio) {
        builder = builder.height(Math.round(breakpoints.medium / aspectRatio));
      }
      return builder.quality(85).format('webp').url();
    })(),
    large: (() => {
      let builder = baseBuilder.width(breakpoints.large);
      if (aspectRatio) {
        builder = builder.height(Math.round(breakpoints.large / aspectRatio));
      }
      return builder.quality(90).format('webp').url();
    })(),
    original: baseBuilder.quality(95).url(),
  };

  return urls;
};

// Generate story cover image URLs
export const getStoryCoverUrls = (imageSource: any): OptimizedImageUrls => {
  // Story covers typically have a 3:4 aspect ratio (portrait)
  return getOptimizedImageUrls(imageSource, 3 / 4);
};

// Generate narrator avatar URLs
export const getNarratorAvatarUrls = (imageSource: any): OptimizedImageUrls => {
  // Narrator avatars are typically square (1:1 aspect ratio)
  return getOptimizedImageUrls(imageSource, 1);
};

// Generate hero/banner image URLs
export const getHeroImageUrls = (imageSource: any): OptimizedImageUrls => {
  // Hero images typically have a 16:9 aspect ratio (landscape)
  return getOptimizedImageUrls(imageSource, 16 / 9);
};

// Generate responsive image srcSet string
export const generateSrcSet = (urls: OptimizedImageUrls): string => {
  return [
    `${urls.small} 400w`,
    `${urls.medium} 800w`,
    `${urls.large} 1200w`,
  ].join(', ');
};

// Generate sizes attribute for responsive images
export const generateSizes = (
  breakpoints: { [key: string]: string } = {}
): string => {
  const defaultSizes = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw',
  };

  const sizes = { ...defaultSizes, ...breakpoints };
  
  return Object.entries(sizes)
    .map(([breakpoint, size]) => 
      breakpoint === 'default' ? size : `${breakpoint} ${size}`
    )
    .join(', ');
};

// Get image metadata from Sanity asset
export const getImageMetadata = (imageAsset: any) => {
  if (!imageAsset?.asset?.metadata) {
    return null;
  }

  const { metadata } = imageAsset.asset;
  
  return {
    width: metadata.dimensions?.width,
    height: metadata.dimensions?.height,
    aspectRatio: metadata.dimensions?.width / metadata.dimensions?.height,
    format: metadata.format,
    size: metadata.size,
    hasAlpha: metadata.hasAlpha,
    isOpaque: metadata.isOpaque,
  };
};

// Generate blur placeholder for images
export const generateBlurDataURL = (
  imageSource: any,
  width: number = 10,
  height: number = 10
): string => {
  const blurUrl = urlFor(imageSource)
    .width(width)
    .height(height)
    .blur(50)
    .quality(1)
    .format('jpg')
    .url();

  return blurUrl;
};

// Create responsive image props for Next.js Image component
export const createResponsiveImageProps = (
  imageSource: any,
  alt: string,
  aspectRatio?: number,
  priority: boolean = false
) => {
  const urls = getOptimizedImageUrls(imageSource, aspectRatio);
  const metadata = getImageMetadata(imageSource);

  return {
    src: urls.medium,
    alt,
    width: metadata?.width || 800,
    height: metadata?.height || 600,
    sizes: generateSizes(),
    placeholder: 'blur' as const,
    blurDataURL: generateBlurDataURL(imageSource),
    priority,
    quality: 85,
  };
};

// Validate image source
export const isValidImageSource = (imageSource: any): boolean => {
  return !!(
    imageSource &&
    (imageSource.asset || imageSource._ref || imageSource.url)
  );
};

// Get fallback image URL
export const getFallbackImageUrl = (
  type: 'story' | 'narrator' | 'hero' = 'story',
  width: number = 400,
  height: number = 300
): string => {
  const fallbackImages = {
    story: `/api/placeholder/${width}/${height}?text=Story+Cover`,
    narrator: `/api/placeholder/${width}/${height}?text=Narrator+Avatar`,
    hero: `/api/placeholder/${width}/${height}?text=Hero+Image`,
  };

  return fallbackImages[type];
};

// Image loading states
export const imageLoadingStates = {
  loading: 'opacity-0 scale-105',
  loaded: 'opacity-100 scale-100',
  error: 'opacity-50 scale-100',
};

// CSS classes for image transitions
export const imageTransitionClasses = 
  'transition-all duration-300 ease-out transform';

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload multiple images
export const preloadImages = async (srcs: string[]): Promise<void> => {
  try {
    await Promise.all(srcs.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};