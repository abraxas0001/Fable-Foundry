import { Metadata } from 'next';
import CommunityFeed from '@/components/pages/CommunityFeed';

export const metadata: Metadata = {
  title: 'Community - FableFoundry',
  description: 'Join the FableFoundry community to discuss stories, share thoughts, and connect with fellow readers.',
  openGraph: {
    title: 'Community - FableFoundry',
    description: 'Connect with fellow story lovers and share your thoughts.',
  },
};

export default function CommunityPage() {
  return <CommunityFeed />;
}