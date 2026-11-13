import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MapPin, ArrowDown, ChevronRight, Sparkles, Award } from 'lucide-react';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { SITE_CONFIG } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreCourses: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExploreCourses }) => {
  const { isNight } = useTheme();

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden">
      {/* --- BACKGROUND 3D CANVAS LAYER --- */}
      <div className="absolute inset-0 z-0">
        <Hero3DCanvas />
      </div>

      {/* --- CINEMATIC VIGNETTE & GRADIENT MASKS --- */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-700 ${
          isNight
            ? 'bg-gradient-to-t from-night-bg via-transparent to-black/60'
            : 'bg-gradient-to-t from-day-bg via-transparent to-white/60'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-full lg:w-1/2 z-10 transition-opacity duration-700 ${
          isNight
            ? 'bg-gradient-to-r from-night-bg/95 via-night-bg/60 to-transparent'
            : 'bg-gradient-to-r from-day-bg/95 via-day-bg/60 to-transparent'
        }`}
      />

      {/* --- HERO CONTENT CONTAINER --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Small Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-md border border-brand-yellow/40 bg-brand-yellow/10 text-xs font-bold tracking-widest text-brand-yellow uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.hero.badge}</span>
          </motion.div>

          {/* Main Massive Editorial Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-1 sm:space-y-2"
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95]">
              <span className={isNight ? 'text-white' : 'text-neutral-900'}>LEARN TO DRIVE.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-400 to-yellow-200 drop-shadow-[0_4px_30px_rgba(255,212,0,0.35)]">
                OWN THE ROAD.
              </span>
            </h1>

            <div className="pt-2">
              <span className="text-sm sm:text-base font-mono font-medium tracking-wide text-brand-yellow/90">
                // {SITE_CONFIG.hero.altAnimated}
              </span>
            </div>
          </motion.div>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed ${
              isNight ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            {SITE_CONFIG.hero.description}
          </motion.p>

          {/* Verified Google Ratings & Location Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 sm:gap-6 pt-2"
          >
            {/* Google Rating Badge */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl backdrop-blur-md border border-white/10 bg-black/40">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="text-xs">
                <span className="font-bold text-white">{SITE_CONFIG.metrics.googleRating}</span>
                <span className="text-neutral-400"> / 5.0 </span>
                <span className="text-brand-yellow font-semibold">({SITE_CONFIG.metrics.reviewCountDisplay} Reviews)</span>
              </div>
            </div>

            {/* Location Pill */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-md border border-white/10 bg-black/40 text-xs text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Mayyil, Kannur, Kerala</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <button
              onClick={() => {
                playUiClick();
                onOpenBooking();
              }}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow hover:scale-105 transition-all duration-300"
            >
              <span>{SITE_CONFIG.hero.primaryCta}</span>
              <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                playUiClick();
                onExploreCourses();
              }}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase border backdrop-blur-md transition-all duration-300 ${
                isNight
                  ? 'border-white/20 bg-white/5 text-white hover:border-brand-yellow hover:text-brand-yellow hover:bg-white/10'
                  : 'border-black/20 bg-black/5 text-black hover:border-brand-yellow hover:bg-black/10'
              }`}
            >
              <span>{SITE_CONFIG.hero.secondaryCta}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* --- BOTTOM SCROLL INDICATOR --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex items-center justify-between text-xs pt-4">
        <a
          href="#about"
          className="group inline-flex items-center gap-2 font-mono tracking-widest uppercase transition-colors text-brand-yellow"
        >
          <span className="w-6 h-6 rounded-full border border-brand-yellow/50 flex items-center justify-center group-hover:translate-y-1 transition-transform">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </span>
          <span className="opacity-80 group-hover:opacity-100">SCROLL TO EXPLORE ROAD</span>
        </a>

        <div className="hidden sm:flex items-center gap-4 text-neutral-400 font-mono text-[11px]">
          <span>DUAL-CONTROL CARS</span>
          <span>•</span>
          <span>RTO CERTIFIED INSTRUCTORS</span>
          <span>•</span>
          <span>FLEXIBLE TIMINGS</span>
        </div>
      </div>
    </section>
  );
};
