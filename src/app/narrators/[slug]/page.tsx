import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NarratorProfile from '@/components/pages/NarratorProfile';
import { generateMockNarrator, generateMockStory } from '@/lib/utils/data';
import { generateNarratorMetadata, generateNarratorStructuredData } from '@/lib/seo/metadata';

interface NarratorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for the narrator page
export async function generateMetadata({ params }: NarratorPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // In a real app, you'd fetch the narrator data here
  const narratorId = slug.split('-').pop() || '1';
  const mockNarrator = generateMockNarrator(narratorId);
  
  return generateNarratorMetadata(mockNarrator, 6);
}

export default async function NarratorPage({ params }: NarratorPageProps) {
  const { slug } = await params;
  
  // In a real app, you'd fetch the narrator from your API/CMS
  const narratorId = slug.split('-').pop() || '1';
  const mockNarrator = generateMockNarrator(narratorId);
  
  // Generate some stories for this narrator
  const narratorStories = Array.from({ length: 6 }, (_, i) => 
    generateMockStory(`${narratorId}-${i + 1}`, mockNarrator)
  );
  
  if (!mockNarrator) {
    notFound();
  }

  const structuredData = generateNarratorStructuredData(mockNarrator);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NarratorProfile narrator={mockNarrator} stories={narratorStories} />
    </>
  );
}