import { Metadata } from 'next';
import StoryLibrary from '@/components/pages/StoryLibrary';

export const metadata: Metadata = {
  title: 'Story Library - FableFoundry',
  description: 'Explore our curated collection of stories, each brought to life by talented Foundry Smiths. Filter by genre, narrator, difficulty, and more.',
  openGraph: {
    title: 'Story Library - FableFoundry',
    description: 'Discover your next favorite story from our extensive collection.',
  },
};

export default function LibraryPage() {
  return <StoryLibrary />;
}