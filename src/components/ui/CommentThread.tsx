'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Comment } from '@/types';
import { formatRelativeTime } from '@/lib/utils/data';
import CommentForm from './CommentForm';
import { useAuth } from '@/contexts/AuthContext';

interface CommentThreadProps {
  comment: Comment;
  onUpvote: (commentId: string) => void;
  onReply: (content: string, parentId: string) => void;
  depth?: number;
}

const CommentThread = ({ comment, onUpvote, onReply, depth = 0 }: CommentThreadProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const { user } = useAuth();

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
    onUpvote(comment.id);
  };

  const handleReply = (content: string) => {
    onReply(content, comment.id);
    setShowReplyForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${depth > 0 ? 'ml-8 mt-4' : ''}`}
    >
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Comment Header */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 bg-amber rounded-full flex items-center justify-center flex-shrink-0">
            {comment.author.avatar ? (
              <img
                src={comment.author.avatar}
                alt={comment.author.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-sm">
                {comment.author.displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-charcoal">
                {comment.author.displayName}
              </h4>
              <span className="text-charcoal/60 text-sm">
                {formatRelativeTime(comment.createdAt)}
              </span>
            </div>

            <p className="text-charcoal/90 leading-relaxed mb-4">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-250 ${
                  isUpvoted
                    ? 'bg-amber/10 text-amber'
                    : 'text-charcoal/60 hover:bg-amber/10 hover:text-amber'
                }`}
              >
                {isUpvoted ? (
                  <HeartSolidIcon className="w-4 h-4" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{comment.upvotes}</span>
              </button>

              {user && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg text-charcoal/60 hover:bg-sienna/10 hover:text-sienna transition-all duration-250"
                >
                  <ChatBubbleLeftIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Reply</span>
                </button>
              )}

              <button className="flex items-center gap-2 px-3 py-1 rounded-lg text-charcoal/60 hover:bg-golden/10 hover:text-golden transition-all duration-250">
                <ShareIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Menu */}
          <button className="text-charcoal/40 hover:text-charcoal transition-colors p-1">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Reply Form */}
        <AnimatePresence>
          {showReplyForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 ml-14"
            >
              <CommentForm
                onSubmit={handleReply}
                onCancel={() => setShowReplyForm(false)}
                placeholder={`Reply to ${comment.author.displayName}...`}
                compact
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          <AnimatePresence>
            {comment.replies.map((reply) => (
              <CommentThread
                key={reply.id}
                comment={reply}
                onUpvote={onUpvote}
                onReply={onReply}
                depth={depth + 1}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default CommentThread;