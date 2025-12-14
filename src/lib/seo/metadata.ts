// SEO metadata utilities for FableFoundry
import { Metadata } from 'next';
import { Story, FoundrySmith } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fablefoundry.com';
const siteName = 'FableFoundry';
const defaultDescription = 'A warm, interactive storytelling platform where rotating narrator avatars guide you through immersive tales crafted like a hand-forged hearth.';

// Base metadata for the site
export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: `%s | ${siteName}`,
    default: `${siteName} - Stories Forged for You`,
  },
  description: defaultDescription,
  keywords: [
    'storytelling',
    'interactive stories',
    'audio narration',
    'digital library',
    'immersive reading',
    'narrator avatars',
    'story community',
    'reading platform',
  ],
  authors: [{ name: 'FableFoundry Team' }],
  creator: 'FableFoundry',
  publisher: 'FableFoundry',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName,
    title: `${siteName} - Stories Forged for You`,
    description: defaultDescription,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FableFoundry - Interactive Storytelling Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Stories Forged for You`,
    description: defaultDescription,
    images: ['/twitter-image.jpg'],
    creator: '@fablefoundry',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// Generate metadata for story pages
export const generateStoryMetadata = (story: Story): Metadata => {
  const title = `${story.title} by ${story.author}`;
  const description = `Read "${story.title}" by ${story.author}, narrated by ${story.narrator.name}. A ${story.metadata.genre.join(', ')} story on FableFoundry.`;
  const url = `${baseUrl}/stories/${story.slug}`;

  return {
    title,
    description,
    keywords: [
      ...story.metadata.genre,
      ...story.metadata.tags,
      story.author,
      story.narrator.name,
      'story',
      'narration',
    ],
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: [
        {
          url: story.coverImage.url,
          width: story.coverImage.width,
          height: story.coverImage.height,
          alt: story.coverImage.alt,
        },
      ],
      authors: [story.author],
      publishedTime: story.publishedAt.toISOString(),
      modifiedTime: story.updatedAt.toISOString(),
      section: 'Stories',
      tags: story.metadata.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [story.coverImage.url],
    },
  };
};

// Generate metadata for narrator pages
export const generateNarratorMetadata = (narrator: FoundrySmith, storiesCount?: number): Metadata => {
  const title = `${narrator.name} - Narrator Profile`;
  const description = `Meet ${narrator.name}, one of our talented Foundry Smiths. ${narrator.bio} ${storiesCount ? `Narrator of ${storiesCount} stories.` : ''}`;
  const url = `${baseUrl}/narrators/${narrator.name.toLowerCase().replace(/\s+/g, '-')}-${narrator.id}`;

  return {
    title,
    description,
    keywords: [
      narrator.name,
      'narrator',
      'voice actor',
      'storyteller',
      ...narrator.specialties,
      ...narrator.voiceProfile.characteristics,
    ],
    openGraph: {
      type: 'profile',
      url,
      title,
      description,
      images: [
        {
          url: narrator.avatar.idle,
          width: 400,
          height: 400,
          alt: `${narrator.name} - Narrator Avatar`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [narrator.avatar.idle],
    },
  };
};

// Generate structured data for stories
export const generateStoryStructuredData = (story: Story) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: story.title,
    author: {
      '@type': 'Person',
      name: story.author,
    },
    description: `A ${story.metadata.genre.join(', ')} story by ${story.author}`,
    genre: story.metadata.genre,
    datePublished: story.publishedAt.toISOString(),
    dateModified: story.updatedAt.toISOString(),
    image: story.coverImage.url,
    url: `${baseUrl}/stories/${story.slug}`,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
    },
    readingTime: `PT${story.metadata.duration}M`,
    keywords: story.metadata.tags.join(', '),
  };
};

// Generate structured data for narrators
export const generateNarratorStructuredData = (narrator: FoundrySmith) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: narrator.name,
    description: narrator.bio,
    image: narrator.avatar.idle,
    url: `${baseUrl}/narrators/${narrator.name.toLowerCase().replace(/\s+/g, '-')}-${narrator.id}`,
    jobTitle: 'Voice Actor & Narrator',
    worksFor: {
      '@type': 'Organization',
      name: siteName,
    },
    knowsAbout: narrator.specialties,
  };
};