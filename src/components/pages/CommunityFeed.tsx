'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftIcon, 
  HeartIcon, 
  ShareIcon,
  FunnelIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/Button';
import CommentThread from '@/components/ui/CommentThread';
import CommentForm from '@/components/ui/CommentForm';
import { Comment } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { formatRelativeTime } from '@/lib/utils/data';

const CommunityFeed = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { user, userProfile } = useAuth();

  // Generate mock comments
  useEffect(() => {
    const generateMockComments = () => {
      const mockComments: Comment[] = [
        {
          id: '1',
          userId: 'user1',
          storyId: 'story1',
          content: 'Just finished "The Enchanted Grove" and I\'m absolutely mesmerized! The way Elena\'s journey unfolded was pure magic. Has anyone else read this masterpiece?',
          upvotes: 24,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          author: {
            displayName: 'Sarah Chen',
            avatar: '/api/placeholder/40/40?text=SC',
          },
          replies: [
            {
              id: '2',
              userId: 'user2',
              storyId: 'story1',
              content: 'Yes! That story gave me chills. The narrator\'s voice was perfect for it too.',
              parentId: '1',
              upvotes: 8,
              createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
              updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
              author: {
                displayName: 'Marcus Rodriguez',
                avatar: '/api/placeholder/40/40?text=MR',
              },
            },
          ],
        },
        {
          id: '3',
          userId: 'user3',
          storyId: 'story2',
          content: 'Looking for recommendations! I love mystery stories with strong female protagonists. Any suggestions from the community?',
          upvotes: 15,
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          author: {
            displayName: 'Emily Watson',
            avatar: '/api/placeholder/40/40?text=EW',
          },
          replies: [
            {
              id: '4',
              userId: 'user4',
              storyId: 'story2',
              content: 'You should definitely check out "Midnight at the Crossroads"! Perfect fit for what you\'re looking for.',
              parentId: '3',
              upvotes: 12,
              createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
              updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
              author: {
                displayName: 'David Kim',
                avatar: '/api/placeholder/40/40?text=DK',
              },
            },
          ],
        },
        {
          id: '5',
          userId: 'user5',
          storyId: 'story3',
          content: 'The audio quality on FableFoundry is incredible! I love how each narrator brings their own unique style. Sage Thornwick\'s performance in "Songs of the Ancient Oak" was phenomenal.',
          upvotes: 31,
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          author: {
            displayName: 'Luna Nightingale',
            avatar: '/api/placeholder/40/40?text=LN',
          },
        },
      ];

      setTimeout(() => {
        setComments(mockComments);
        setLoading(false);
      }, 800);
    };

    generateMockComments();
  }, []);

  const handleUpvote = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, upvotes: comment.upvotes + 1 };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId 
              ? { ...reply, upvotes: reply.upvotes + 1 }
              : reply
          ),
        };
      }
      return comment;
    }));
  };

  const handleNewComment = (content: string, storyId?: string) => {
    if (!user || !userProfile) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      storyId: storyId || 'general',
      content,
      upvotes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        displayName: userProfile.communityProfile.displayName,
        avatar: userProfile.communityProfile.avatar,
      },
    };

    setComments(prev => [newComment, ...prev]);
    setShowCommentForm(false);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-white border-b border-amber/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-heading text-3xl md:text-5xl mb-4">
              Community <span className="text-amber">Discussions</span>
            </h1>
            <p className="text-body text-xl text-charcoal/80 max-w-3xl mx-auto">
              Share your thoughts, discover new perspectives, and connect with fellow story enthusiasts
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-250 ${
                  sortBy === 'latest'
                    ? 'bg-amber text-white shadow-sm'
                    : 'text-charcoal/70 hover:text-amber'
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-250 ${
                  sortBy === 'popular'
                    ? 'bg-amber text-white shadow-sm'
                    : 'text-charcoal/70 hover:text-amber'
                }`}
              >
                Popular
              </button>
            </div>
          </div>

          {user && (
            <Button
              variant="primary"
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              New Discussion
            </Button>
          )}
        </div>

        {/* Comment Form */}
        <AnimatePresence>
          {showCommentForm && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <CommentForm
                onSubmit={handleNewComment}
                onCancel={() => setShowCommentForm(false)}
                placeholder="Start a new discussion about your favorite stories..."
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comments Feed */}
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber/20 rounded-full"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-amber/20 rounded w-1/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-charcoal/20 rounded"></div>
                      <div className="h-3 bg-charcoal/20 rounded w-3/4"></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-6 bg-amber/20 rounded w-16"></div>
                      <div className="h-6 bg-sienna/20 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ChatBubbleLeftIcon className="w-16 h-16 text-amber/40 mx-auto mb-4" />
            <h3 className="text-heading text-xl mb-2">No discussions yet</h3>
            <p className="text-charcoal/60 mb-6">
              Be the first to start a conversation about your favorite stories!
            </p>
            {user && (
              <Button
                variant="primary"
                onClick={() => setShowCommentForm(true)}
              >
                Start Discussion
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {sortedComments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <CommentThread
                    comment={comment}
                    onUpvote={handleUpvote}
                    onReply={(content, parentId) => {
                      // Handle reply logic here
                      console.log('Reply:', content, parentId);
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load More */}
        {!loading && comments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button variant="secondary">
              Load More Discussions
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;