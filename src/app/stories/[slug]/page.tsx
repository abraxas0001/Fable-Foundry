import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StoryReader from '@/components/pages/StoryReader';
import { generateMockNarrator, generateMockStory } from '@/lib/utils/data';
import { generateStoryMetadata, generateStoryStructuredData } from '@/lib/seo/metadata';

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for the story page
export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // In a real app, you'd fetch the story data here
  // For now, we'll use mock data
  const storyId = slug.split('-').pop() || '1';
  const mockNarrator = generateMockNarrator(storyId);
  const mockStory = generateMockStory(storyId, mockNarrator);
  mockStory.slug = slug;
  
  return generateStoryMetadata(mockStory);
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  
  // In a real app, you'd fetch the story from your API/CMS
  // For now, we'll generate mock data based on the slug
  const storyId = slug.split('-').pop() || '1';
  const mockNarrator = generateMockNarrator(storyId);
  const mockStory = generateMockStory(storyId, mockNarrator);
  
  // Set the slug to match the URL
  mockStory.slug = slug;
  
  if (!mockStory) {
    notFound();
  }

  const structuredData = generateStoryStructuredData(mockStory);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StoryReader story={mockStory} />
    </>
  );
}