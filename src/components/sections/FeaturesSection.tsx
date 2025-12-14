'use client';

import { motion } from 'framer-motion';
import { 
  BookOpenIcon, 
  SpeakerWaveIcon, 
  UserGroupIcon, 
  SparklesIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: BookOpenIcon,
    title: 'Curated Stories',
    description: 'Hand-picked tales from talented authors, each crafted to transport you to new worlds and experiences.',
    color: 'text-amber',
    bgColor: 'bg-amber/10',
  },
  {
    icon: SpeakerWaveIcon,
    title: 'Expert Narration',
    description: 'Our Foundry Smiths bring stories to life with their unique voices and captivating storytelling abilities.',
    color: 'text-sienna',
    bgColor: 'bg-sienna/10',
  },
  {
    icon: UserGroupIcon,
    title: 'Community Driven',
    description: 'Connect with fellow story lovers, share thoughts, and discover new favorites through our vibrant community.',
    color: 'text-golden',
    bgColor: 'bg-golden/10',
  },
  {
    icon: SparklesIcon,
    title: 'Immersive Experience',
    description: 'Beautiful animations, warm design, and intuitive navigation create a truly magical reading experience.',
    color: 'text-amber',
    bgColor: 'bg-amber/10',
  },
  {
    icon: HeartIcon,
    title: 'Personal Journey',
    description: 'Track your reading progress, bookmark favorites, and customize your experience to match your preferences.',
    color: 'text-sienna',
    bgColor: 'bg-sienna/10',
  },
  {
    icon: AdjustmentsHorizontalIcon,
    title: 'Accessibility First',
    description: 'Designed for everyone with full keyboard navigation, screen reader support, and customizable settings.',
    color: 'text-golden',
    bgColor: 'bg-golden/10',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-3xl md:text-5xl mb-6">
            Why Choose{' '}
            <span className="text-amber">FableFoundry</span>?
          </h2>
          <p className="text-body text-xl max-w-3xl mx-auto text-charcoal/80">
            We've crafted every detail to create the perfect storytelling experience, 
            where technology meets the timeless art of narrative.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-parchment rounded-xl p-8 h-full border border-amber/20 hover:border-amber/40 transition-all duration-250 hover:shadow-lg">
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-250`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-heading text-xl font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="text-body text-charcoal/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-amber/10 to-sienna/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-heading text-2xl md:text-3xl mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-body text-lg mb-8 max-w-2xl mx-auto text-charcoal/80">
              Join thousands of readers who have discovered the magic of FableFoundry. 
              Your next favorite story is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Explore Stories
              </button>
              <button className="btn-secondary">
                Meet Our Narrators
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;