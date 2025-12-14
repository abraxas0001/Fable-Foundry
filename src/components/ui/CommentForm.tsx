'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import { useAuth } from '@/contexts/AuthContext';

interface CommentFormProps {
  onSubmit: (content: string, storyId?: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  storyId?: string;
  compact?: boolean;
}

const CommentForm = ({ 
  onSubmit, 
  onCancel, 
  placeholder = "Share your thoughts...", 
  storyId,
  compact = false 
}: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, userProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim(), storyId);
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-amber/10 border border-amber/30 rounded-xl p-6 text-center">
        <p className="text-charcoal/70 mb-4">
          Sign in to join the discussion and share your thoughts with the community.
        </p>
        <Button variant="primary" size="sm">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 bg-amber rounded-full flex items-center justify-center flex-shrink-0">
            {userProfile?.communityProfile.avatar ? (
              <img
                src={userProfile.communityProfile.avatar}
                alt={userProfile.communityProfile.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-sm">
                {userProfile?.communityProfile.displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Form */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className={`w-full px-4 py-3 border border-amber/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent transition-all duration-250 ${
                compact ? 'min-h-[80px]' : 'min-h-[120px]'
              }`}
              disabled={isSubmitting}
            />

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-charcoal/60">
                {content.length}/1000 characters
              </div>
              
              <div className="flex items-center gap-3">
                {onCancel && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!content.trim() || isSubmitting || content.length > 1000}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-4 h-4" />
                      {compact ? 'Reply' : 'Post'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CommentForm;