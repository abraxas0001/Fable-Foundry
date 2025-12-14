// Sitemap generation utilities
import { MetadataRoute } from 'next';
import { getAllStories, getAllNarrators } from '@/lib/sanity/api';
import { Story, FoundrySmith } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fablefoundry.com';

export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/narrators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Add all stories to sitemap
    const stories = await getAllStories();
    stories.forEach((story: Story) => {
      sitemap.push({
        url: `${baseUrl}/stories/${story.slug}`,
        lastModified: new Date(story.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });

    // Add all narrators to sitemap
    const narrators = await getAllNarrators();
    narrators.forEach((narrator: FoundrySmith) => {
      const slug = `${narrator.name.toLowerCase().replace(/\s+/g, '-')}-${narrator.id}`;
      sitemap.push({
        url: `${baseUrl}/narrators/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return sitemap;
}