'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  PauseIcon, 
  ChevronLeftIcon,
  ShareIcon,
  HeartIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import StoryCard from '@/components/ui/StoryCard';
import { FoundrySmith, Story } from '@/types';
import { useAudio } from '@/contexts/AudioContext';

interface NarratorProfileProps {
  narrator: FoundrySmith;
  stories: Story[];
}

const NarratorProfile = ({ narrator, stories }: NarratorProfileProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'stories' | 'about'>('stories');
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { playStory, audioState, currentStory } = useAudio();

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // In a real app, you'd save this to the backend
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${narrator.name} - FableFoundry`,
          text: `Check out ${narrator.name}, a talented narrator on FableFoundry`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const toggleSamplePlayback = () => {
    setIsPlayingSample(!isPlayingSample);
    // In a real app, you'd control actual audio playback of voice samples
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-white border-b border-amber/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/narrators"
            className="inline-flex items-center gap-2 text-charcoal hover:text-amber transition-colors mb-6"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Narrators</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Parallax Background */}
        <div className="h-80 bg-gradient-to-br from-amber/20 via-sienna/10 to-golden/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-16 h-16 bg-amber/30 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-20 right-32 w-12 h-12 bg-sienna/30 rounded-full"
          />
        </div>

        {/* Profile Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-32">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Avatar */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber/20 to-sienna/30">
                      {!imageError ? (
                        <>
                          {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <UserIcon className="w-24 h-24 text-amber/60" />
                            </div>
                          )}
                          <img
                            src={narrator.avatar.idle}
                            alt={`${narrator.name} avatar`}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                              imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-32 h-32 bg-amber rounded-full mx-auto mb-4 flex items-center justify-center">
                              <span className="text-4xl text-white font-bold">
                                {narrator.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Voice Sample Player */}
                    {narrator.voiceProfile.audioSamples.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleSamplePlayback}
                        className={`absolute bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-250 ${
                          isPlayingSample
                            ? 'bg-amber text-white'
                            : 'bg-white text-amber hover:bg-amber hover:text-white'
                        }`}
                      >
                        {isPlayingSample ? (
                          <PauseIcon className="w-8 h-8" />
                        ) : (
                          <PlayIcon className="w-8 h-8 ml-1" />
                        )}
                      </motion.button>
                    )}
                  </motion.div>
                </div>

                {/* Info */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h1 className="text-heading text-3xl md:text-5xl mb-4">
                      {narrator.name}
                    </h1>
                    
                    <p className="text-body text-lg text-charcoal/80 mb-6 leading-relaxed">
                      {narrator.bio}
                    </p>

                    {/* Specialties */}
                    <div className="mb-6">
                      <h3 className="text-heading text-lg font-semibold mb-3">Specialties</h3>
                      <div className="flex flex-wrap gap-3">
                        {narrator.specialties.map(specialty => (
                          <span
                            key={specialty}
                            className="bg-amber/10 text-amber px-4 py-2 rounded-full font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Voice Characteristics */}
                    <div className="mb-8">
                      <h3 className="text-heading text-lg font-semibold mb-3">Voice Style</h3>
                      <div className="flex flex-wrap gap-2">
                        {narrator.voiceProfile.characteristics.map(characteristic => (
                          <span
                            key={characteristic}
                            className="bg-sienna/10 text-sienna px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {characteristic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="primary"
                        onClick={handleFollow}
                        className="flex items-center gap-2"
                      >
                        {isFollowing ? (
                          <HeartSolidIcon className="w-5 h-5" />
                        ) : (
                          <HeartIcon className="w-5 h-5" />
                        )}
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={handleShare}
                        className="flex items-center gap-2"
                      >
                        <ShareIcon className="w-5 h-5" />
                        Share Profile
                      </Button>

                      {narrator.voiceProfile.audioSamples.length > 0 && (
                        <Button
                          variant="secondary"
                          onClick={toggleSamplePlayback}
                          className="flex items-center gap-2"
                        >
                          {isPlayingSample ? (
                            <PauseIcon className="w-5 h-5" />
                          ) : (
                            <PlayIcon className="w-5 h-5" />
                          )}
                          Voice Sample
                        </Button>
                      )}
                    </div>

                    {/* Social Links */}
                    {narrator.socialLinks && (
                      <div className="flex gap-4 mt-6">
                        {narrator.socialLinks.website && (
                          <a
                            href={narrator.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-charcoal/60 hover:text-amber transition-colors"
                          >
                            🌐 Website
                          </a>
                        )}
                        {narrator.socialLinks.twitter && (
                          <a
                            href={narrator.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-charcoal/60 hover:text-amber transition-colors"
                          >
                            🐦 Twitter
                          </a>
                        )}
                        {narrator.socialLinks.instagram && (
                          <a
                            href={narrator.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-charcoal/60 hover:text-amber transition-colors"
                          >
                            📷 Instagram
                          </a>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-250 ${
              activeTab === 'stories'
                ? 'bg-amber text-white shadow-sm'
                : 'text-charcoal/70 hover:text-amber'
            }`}
          >
            Stories ({stories.length})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-250 ${
              activeTab === 'about'
                ? 'bg-amber text-white shadow-sm'
                : 'text-charcoal/70 hover:text-amber'
            }`}
          >
            About
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'stories' ? (
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-heading text-2xl md:text-3xl mb-8">
              Stories by {narrator.name}
            </h2>
            
            {stories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <StoryCard story={story} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-amber/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-heading text-xl mb-2">No stories yet</h3>
                <p className="text-charcoal/60">
                  {narrator.name} hasn't narrated any stories yet. Check back soon!
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <h2 className="text-heading text-2xl md:text-3xl mb-8">
              About {narrator.name}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-body text-lg leading-relaxed mb-6">
                {narrator.bio}
              </p>
              
              <h3 className="text-heading text-xl font-semibold mb-4">Experience & Style</h3>
              <p className="text-body leading-relaxed mb-6">
                With a voice characterized by {narrator.voiceProfile.characteristics.join(', ').toLowerCase()}, 
                {narrator.name} brings a unique perspective to storytelling. Specializing in {narrator.specialties.join(', ')}, 
                they have developed a distinctive style that captivates listeners and brings characters to life.
              </p>

              <h3 className="text-heading text-xl font-semibold mb-4">Approach to Storytelling</h3>
              <p className="text-body leading-relaxed">
                Every story is an opportunity to create a connection between the listener and the narrative. 
                {narrator.name} believes in the power of voice to transform written words into living, breathing experiences 
                that resonate long after the story ends.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NarratorProfile;