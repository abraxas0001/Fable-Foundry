import { Metadata } from 'next';
import UserDashboard from '@/components/pages/UserDashboard';

export const metadata: Metadata = {
  title: 'Dashboard - FableFoundry',
  description: 'Manage your reading progress, bookmarks, and preferences on FableFoundry.',
};

export default function DashboardPage() {
  return <UserDashboard />;
}