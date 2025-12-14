import { Metadata } from 'next';
import NarratorsDirectory from '@/components/pages/NarratorsDirectory';

export const metadata: Metadata = {
  title: 'Narrators - FableFoundry',
  description: 'Meet our talented Foundry Smiths - the voices that bring our stories to life with their unique storytelling abilities.',
  openGraph: {
    title: 'Narrators - FableFoundry',
    description: 'Discover the talented voices behind our stories.',
  },
};

export default function NarratorsPage() {
  return <NarratorsDirectory />;
}