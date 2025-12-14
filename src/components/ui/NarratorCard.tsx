'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PlayIcon, UserIcon } from '@heroicons/react/24/outline';
import { FoundrySmith } from '@/types';
import { useState } from 'react';

interface NarratorCardProps {
  narrator: FoundrySmith;
  showSocialLinks?: boolean;
}

const NarratorCard = ({ narrator, showSocialLinks = false }: NarratorCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const narratorSlug = narrator.name.toLowerCase().replace(/\s+/g, '-') + `-${narrator.id}`;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/narrators/${narratorSlug}`} className="flex flex-col h-full">
        {/* Avatar */}
        <div className="relative h-64 overflow-hidden">
          {!imageError ? (
            <>
              {/* Placeholder while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-sienna/30 animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-amber/50 rounded-full flex items-center justify-center">
                      <UserIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Actual image */}
              <img
                src={narrator.avatar.idle}
                alt={`${narrator.name} avatar`}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            // Fallback when image fails to load
            <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-sienna/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-amber rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl text-white font-bold">
                      {narrator.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <p className="text-charcoal/60 text-sm">Narrator Avatar</p>
                </div>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto">
                <PlayIcon className="w-8 h-8 ml-1" />
              </div>
              <p className="text-sm font-medium">Listen to Sample</p>
            </div>
          </motion.div>
        </div>

        {/* Narrator Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-heading text-xl font-bold mb-2 group-hover:text-amber transition-colors duration-250">
            {narrator.name}
          </h3>
          
          <p className="text-charcoal/70 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
            {narrator.bio}
          </p>

          {/* Specialties */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {narrator.specialties.slice(0, 3).map((specialty) => (
                <span
                  key={specialty}
                  className="bg-amber/10 text-amber px-3 py-1 rounded-full text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
              {narrator.specialties.length > 3 && (
                <span className="text-xs text-charcoal/60 px-2 py-1">
                  +{narrator.specialties.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Voice Characteristics */}
          {narrator.voiceProfile.characteristics.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-charcoal/80 mb-2">Voice Style</h4>
              <div className="flex flex-wrap gap-1">
                {narrator.voiceProfile.characteristics.slice(0, 3).map((characteristic) => (
                  <span
                    key={characteristic}
                    className="bg-sienna/10 text-sienna px-2 py-1 rounded-full text-xs"
                  >
                    {characteristic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links (shown on hover) */}
          {showSocialLinks && narrator.socialLinks && isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3 mt-4"
            >
              {narrator.socialLinks.website && (
                <a
                  href={narrator.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-amber transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  🌐
                </a>
              )}
              {narrator.socialLinks.twitter && (
                <a
                  href={narrator.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-amber transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  🐦
                </a>
              )}
              {narrator.socialLinks.instagram && (
                <a
                  href={narrator.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-amber transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  📷
                </a>
              )}
            </motion.div>
          )}

          {/* Action Button */}
          <div className="mt-auto pt-4">
            <div className="w-full bg-amber/10 text-amber text-center py-2 px-4 rounded-lg font-medium group-hover:bg-amber group-hover:text-white transition-all duration-250">
              View Profile
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NarratorCard;