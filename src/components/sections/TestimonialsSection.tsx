'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Book Enthusiast',
    avatar: '/api/placeholder/80/80?text=SC',
    content: 'FableFoundry has completely transformed my reading experience. The narrators bring such life to every story, and the community discussions add a whole new dimension to storytelling.',
    rating: 5,
    story: 'The Enchanted Grove',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Daily Commuter',
    avatar: '/api/placeholder/80/80?text=MR',
    content: 'Perfect for my daily commute! The audio quality is exceptional, and I love how I can seamlessly switch between reading and listening. The progress tracking is a game-changer.',
    rating: 5,
    story: 'Midnight at the Crossroads',
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Literature Teacher',
    avatar: '/api/placeholder/80/80?text=EW',
    content: 'As an educator, I appreciate the accessibility features and the variety of difficulty levels. My students are more engaged with literature than ever before.',
    rating: 5,
    story: 'The Last Library',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Busy Parent',
    avatar: '/api/placeholder/80/80?text=DK',
    content: 'Finally found a platform that fits my hectic schedule. The bookmark feature lets me pick up exactly where I left off, and the warm design is so relaxing after long days.',
    rating: 5,
    story: 'Songs of the Ancient Oak',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-sienna/5 to-amber/5">
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
            What Our{' '}
            <span className="text-amber">Community</span>{' '}
            Says
          </h2>
          <p className="text-body text-xl max-w-3xl mx-auto text-charcoal/80">
            Join thousands of readers who have found their perfect storytelling companion
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-250"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-golden" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-body text-charcoal/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber to-sienna rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-charcoal">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-charcoal/60">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-amber font-medium">
                    Currently reading: {testimonial.story}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '10K+', label: 'Happy Readers' },
            { number: '500+', label: 'Stories Available' },
            { number: '50+', label: 'Expert Narrators' },
            { number: '4.9', label: 'Average Rating' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber mb-2">
                {stat.number}
              </div>
              <div className="text-charcoal/70 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg"
        >
          <h3 className="text-heading text-2xl md:text-3xl mb-4">
            Stay Updated with New Stories
          </h3>
          <p className="text-body text-lg mb-8 max-w-2xl mx-auto text-charcoal/80">
            Be the first to know when new stories and narrators join our community. 
            Plus, get exclusive access to behind-the-scenes content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-charcoal/60 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;