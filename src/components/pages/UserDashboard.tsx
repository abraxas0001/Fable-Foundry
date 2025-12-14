'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon, 
  HeartIcon, 
  ClockIcon, 
  UserIcon,
  Cog6ToothIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import StoryCard from '@/components/ui/StoryCard';
import Button from '@/components/ui/Button';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { Story } from '@/types';
import { generateMockNarrator, generateMockStory } from '@/lib/utils/data';

const UserDashboard = () => {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookmarks' | 'progress' | 'settings'>('overview');
  const [bookmarkedStories, setBookmarkedStories] = useState<Story[]>([]);
  const [recentStories, setRecentStories] = useState<Story[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      // Generate mock data for demonstration
      const generateMockData = () => {
        const mockNarrators = Array.from({ length: 4 }, (_, i) => generateMockNarrator(`${i + 1}`));
        const mockBookmarks = mockNarrators.map((narrator, i) => generateMockStory(`bookmark-${i + 1}`, narrator));
        const mockRecent = mockNarrators.map((narrator, i) => generateMockStory(`recent-${i + 1}`, narrator));
        
        setTimeout(() => {
          setBookmarkedStories(mockBookmarks);
          setRecentStories(mockRecent);
          setLoadingData(false);
        }, 500);
      };

      generateMockData();
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !userProfile) {
    return null;
  }

  const stats = [
    {
      icon: BookOpenIcon,
      label: 'Stories Read',
      value: '24',
      color: 'text-amber',
      bgColor: 'bg-amber/10',
    },
    {
      icon: HeartIcon,
      label: 'Bookmarks',
      value: bookmarkedStories.length.toString(),
      color: 'text-sienna',
      bgColor: 'bg-sienna/10',
    },
    {
      icon: ClockIcon,
      label: 'Hours Listened',
      value: '47.5',
      color: 'text-golden',
      bgColor: 'bg-golden/10',
    },
    {
      icon: ChartBarIcon,
      label: 'Reading Streak',
      value: '12 days',
      color: 'text-amber',
      bgColor: 'bg-amber/10',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'bookmarks', label: 'Bookmarks', icon: HeartIcon },
    { id: 'progress', label: 'Progress', icon: ClockIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
  ] as const;

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-white border-b border-amber/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6"
          >
            {/* Avatar */}
            <div className="w-20 h-20 bg-amber rounded-full flex items-center justify-center">
              {userProfile.communityProfile.avatar ? (
                <img
                  src={userProfile.communityProfile.avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-10 h-10 text-white" />
              )}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-heading text-3xl md:text-4xl mb-2">
                Welcome back, {userProfile.communityProfile.displayName}!
              </h1>
              <p className="text-charcoal/70">
                Member since {userProfile.communityProfile.joinedAt.toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-250 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber text-white shadow-sm'
                  : 'text-charcoal/70 hover:text-amber'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-charcoal mb-1">{stat.value}</div>
                  <div className="text-sm text-charcoal/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-heading text-xl font-bold mb-6">Continue Reading</h2>
              {loadingData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-amber/20 rounded-lg mb-4"></div>
                      <div className="h-4 bg-amber/20 rounded mb-2"></div>
                      <div className="h-3 bg-sienna/20 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentStories.slice(0, 3).map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'bookmarks' && (
          <motion.div
            key="bookmarks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading text-xl font-bold">Your Bookmarks</h2>
                <span className="text-charcoal/60">{bookmarkedStories.length} stories</span>
              </div>
              
              {loadingData ? (
                <LoadingGrid count={6} />
              ) : bookmarkedStories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <HeartIcon className="w-16 h-16 text-amber/40 mx-auto mb-4" />
                  <h3 className="text-heading text-lg mb-2">No bookmarks yet</h3>
                  <p className="text-charcoal/60 mb-6">
                    Start bookmarking stories you love to find them easily later.
                  </p>
                  <Button variant="primary" onClick={() => router.push('/library')}>
                    Explore Stories
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-heading text-xl font-bold mb-6">Reading Progress</h2>
              
              <div className="space-y-6">
                {recentStories.slice(0, 4).map((story, index) => (
                  <div key={story.id} className="flex items-center gap-4 p-4 bg-parchment rounded-lg">
                    <div className="w-16 h-20 bg-gradient-to-br from-amber/20 to-sienna/30 rounded-lg flex items-center justify-center">
                      <span className="text-xs">📖</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal mb-1">{story.title}</h3>
                      <p className="text-sm text-charcoal/60 mb-2">by {story.author}</p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs text-charcoal/60 mb-1">
                            <span>Progress</span>
                            <span>{Math.floor(Math.random() * 100)}%</span>
                          </div>
                          <div className="h-2 bg-amber/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber rounded-full transition-all duration-300"
                              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                            />
                          </div>
                        </div>
                        
                        <Button variant="secondary" size="sm">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-heading text-xl font-bold mb-6">Settings & Preferences</h2>
              
              <div className="space-y-8">
                {/* Profile Settings */}
                <div>
                  <h3 className="text-heading text-lg font-semibold mb-4">Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.communityProfile.displayName}
                        className="w-full max-w-md px-4 py-2 border border-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userProfile.email}
                        className="w-full max-w-md px-4 py-2 border border-amber/30 rounded-lg bg-gray-50 text-charcoal/60"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Reading Preferences */}
                <div>
                  <h3 className="text-heading text-lg font-semibold mb-4">Reading Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Theme
                      </label>
                      <select className="w-full max-w-md px-4 py-2 border border-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Font Size
                      </label>
                      <select className="w-full max-w-md px-4 py-2 border border-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="autoplay"
                        className="w-4 h-4 text-amber border-amber/30 rounded focus:ring-amber focus:ring-2"
                      />
                      <label htmlFor="autoplay" className="text-sm font-medium text-charcoal">
                        Auto-play audio narration
                      </label>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-amber/20">
                  <Button variant="primary">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;