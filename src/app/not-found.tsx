'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, HomeIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-amber/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <MagnifyingGlassIcon className="w-10 h-10 text-amber" />
        </div>
        
        <h1 className="text-6xl font-bold text-charcoal mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Story Not Found
        </h2>
        
        <p className="text-charcoal/70 mb-8 leading-relaxed">
          The story you're looking for seems to have wandered off into the mists. 
          Perhaps it's waiting to be discovered in our library?
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/library">
            <Button variant="primary" className="flex items-center gap-2">
              <MagnifyingGlassIcon className="w-4 h-4" />
              Browse Stories
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="secondary" className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}