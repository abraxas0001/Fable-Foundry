'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ExclamationTriangleIcon className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-charcoal mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-charcoal/70 mb-8 leading-relaxed">
          We encountered an unexpected error while loading this page. 
          Our team has been notified and is working on a fix.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-red-50 p-4 rounded-lg mb-8 text-sm">
            <summary className="cursor-pointer font-medium text-red-800 mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-red-700 whitespace-pre-wrap overflow-auto max-h-40">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
            {error.digest && (
              <p className="mt-2 text-red-600">
                Error ID: {error.digest}
              </p>
            )}
          </details>
        )}
        
        <div className="flex gap-4 justify-center">
          <Button
            variant="primary"
            onClick={reset}
            className="flex items-center gap-2"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2"
          >
            <HomeIcon className="w-4 h-4" />
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}