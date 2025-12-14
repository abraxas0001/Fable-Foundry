'use client';

import { motion } from 'framer-motion';

interface StoryContentProps {
  paragraphs: string[];
  fontSize: 'small' | 'medium' | 'large';
}

const StoryContent = ({ paragraphs, fontSize }: StoryContentProps) => {
  const fontSizeClasses = {
    small: 'text-base leading-relaxed',
    medium: 'text-lg leading-relaxed',
    large: 'text-xl leading-loose',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const paragraphTransition = {
    duration: 0.6,
    ease: "easeOut" as const,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="prose prose-lg max-w-none"
    >
      {paragraphs.map((paragraph, index) => (
        <motion.div
          key={index}
          variants={paragraphVariants}
          transition={paragraphTransition}
          className="mb-6"
        >
          {/* First paragraph gets special styling */}
          {index === 0 ? (
            <p className={`${fontSizeClasses[fontSize]} first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:text-amber first-letter:float-left first-letter:mr-3 first-letter:mt-1`}>
              {paragraph}
            </p>
          ) : (
            <p className={`${fontSizeClasses[fontSize]} text-charcoal/90`}>
              {paragraph}
            </p>
          )}

          {/* Add pull quote for certain paragraphs */}
          {(index === 2 || index === 5) && (
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="my-8 pl-6 border-l-4 border-amber italic text-sienna font-caveat text-2xl"
            >
              {index === 2 
                ? "The trees here whispered secrets in languages forgotten by time..."
                : "Magic wasn't something you found in distant places. It was something you carried within yourself..."
              }
            </motion.blockquote>
          )}

          {/* Add section break after certain paragraphs */}
          {(index === 3 || index === 6) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center my-12"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber rounded-full"></div>
                <div className="w-3 h-3 bg-amber rounded-full"></div>
                <div className="w-2 h-2 bg-amber rounded-full"></div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Story End Marker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-16 mb-8"
      >
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-amber/10 rounded-full">
          <div className="w-3 h-3 bg-amber rounded-full"></div>
          <span className="text-amber font-medium">The End</span>
          <div className="w-3 h-3 bg-amber rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StoryContent;