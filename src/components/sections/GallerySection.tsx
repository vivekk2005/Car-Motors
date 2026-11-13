import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { SITE_CONFIG, GalleryItem } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

export const GallerySection: React.FC = () => {
  const { isNight } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Training Cars',
    'Road Training',
    'Driving Practice',
    'Instructor Sessions',
    'Learning Moments',
  ];

  const filteredItems = SITE_CONFIG.gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (idx: number) => {
    playUiClick();
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    playUiClick();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    playUiClick();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
            <Camera className="w-3.5 h-3.5" />
            <span>DRIVING IN ACTION</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            EVERY LESSON{' '}
            <span className="text-brand-yellow">HAS A STORY.</span>
          </h2>

          <p className={`text-base sm:text-lg ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Explore our training fleet, instructor sessions, and hands-on road practice across Mayyil, Kannur.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playUiClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-yellow text-black shadow-glow-yellow'
                  : isNight
                  ? 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                  : 'bg-neutral-200 text-neutral-700 hover:text-black hover:bg-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: GalleryItem, idx: number) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(idx)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer border border-neutral-800 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/20 text-brand-yellow">
                  {item.category}
                </span>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-brand-yellow" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-yellow transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FULLSCREEN LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Lightbox Content Container */}
            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
              {/* Top Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 p-2.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl max-h-[75vh] w-full flex items-center justify-center bg-black">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[75vh] w-auto object-contain"
                />

                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption Bar */}
              <div className="w-full mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-white">
                <div>
                  <h4 className="font-display font-bold text-lg text-brand-yellow">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {filteredItems[lightboxIndex].caption}
                  </p>
                </div>
                <div className="text-xs font-mono text-neutral-500">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
