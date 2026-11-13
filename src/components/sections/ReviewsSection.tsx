import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, ExternalLink, Quote, Sparkles } from 'lucide-react';
import { SITE_CONFIG, ReviewItem } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

export const ReviewsSection: React.FC = () => {
  const { isNight } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = SITE_CONFIG.reviews;

  const nextReview = () => {
    playUiClick();
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    playUiClick();
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section id="reviews" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VERIFIED GOOGLE FEEDBACK</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            REAL PEOPLE.{' '}
            <span className="text-brand-yellow">REAL DRIVING CONFIDENCE.</span>
          </h2>

          <p className={`text-base sm:text-lg ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Read verified feedback from learners who mastered car driving with our instructors in Mayyil, Kannur.
          </p>

          {/* Rating Banner */}
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-neutral-900/80 border border-neutral-700/80 shadow-lg text-white">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-lg text-white">4.7 / 5.0</span>
              <span className="text-neutral-400 mx-2">•</span>
              <span className="text-brand-yellow font-bold">6,049 Google Reviews</span>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Spotlight Slider */}
        <div className="max-w-4xl mx-auto relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`relative p-8 sm:p-12 rounded-3xl border shadow-2xl backdrop-blur-xl ${
                isNight
                  ? 'bg-neutral-900/90 border-neutral-800 text-white'
                  : 'bg-white border-neutral-200 text-neutral-900'
              }`}
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-brand-yellow/30 absolute top-8 right-8" />

              {/* Star Rating */}
              <div className="flex items-center gap-1.5 text-amber-400 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                {current.badge && (
                  <span className="ml-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30">
                    {current.badge}
                  </span>
                )}
              </div>

              {/* Review Text */}
              <p className="text-lg sm:text-2xl font-display font-medium leading-relaxed mb-8">
                "{current.text}"
              </p>

              {/* Author & Instructor Mentioned */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-700/20">
                <div>
                  <h4 className="font-bold text-base text-white">{current.author}</h4>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{current.timeAgo}</span>
                  </div>
                </div>

                {current.instructorMentioned && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs">
                    <span className="text-neutral-400">Instructor:</span>
                    <span className="text-brand-yellow font-bold">
                      {current.instructorMentioned}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition border border-neutral-700"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playUiClick();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-brand-yellow' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition border border-neutral-700"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Read all 6,049 Google Reviews CTA Button */}
        <div className="text-center">
          <a
            href={SITE_CONFIG.location.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-transparent border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black transition-all duration-300 shadow-glow-yellow"
          >
            <span>READ ALL 6,049 GOOGLE REVIEWS</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
