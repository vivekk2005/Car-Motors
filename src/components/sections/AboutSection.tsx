import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MapPin, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const { isNight } = useTheme();

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* --- LEFT: VISUAL SHOWCASE --- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              {/* Premium Automotive Training Visual */}
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
                alt="A ONE Motors Driving Training School Mayyil Kannur Kerala"
                className="w-full h-[420px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Floating Verified Rating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-yellow uppercase">
                    GOOGLE VERIFIED RATING
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-display font-black text-white">
                      {SITE_CONFIG.metrics.googleRating}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right border-l border-white/20 pl-4">
                  <div className="text-xl font-display font-bold text-brand-yellow">
                    {SITE_CONFIG.metrics.reviewCountDisplay}
                  </div>
                  <span className="text-[10px] text-neutral-300">Google Reviews</span>
                </div>
              </div>

              {/* Brand Badge Pill */}
              <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                {SITE_CONFIG.brand.name}
              </div>
            </div>

            {/* Background Decorative Ambient Glow */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* --- RIGHT: TEXT CONTENT & VERIFIED STATS --- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ABOUT A ONE MOTORS</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-[1.05]">
              MORE THAN DRIVING.
              <br />
              <span className="text-brand-yellow">IT'S ABOUT CONFIDENCE.</span>
            </h2>

            <div className={`space-y-4 text-base sm:text-lg leading-relaxed ${isNight ? 'text-neutral-300' : 'text-neutral-700'}`}>
              <p>
                At A ONE Motors Driving Training School, we believe learning to drive is more than operating a vehicle. It's about developing confidence, awareness, control, and responsibility on the road.
              </p>
              <p className="text-sm sm:text-base">
                Whether you are stepping into the driver's seat for the first time or looking to improve your driving skills, our goal is to make your learning journey comfortable and practical.
              </p>
            </div>

            {/* Verified Statistics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border transition-colors ${isNight ? 'bg-night-surface border-night-border' : 'bg-white border-day-border shadow-sm'}`}>
                <div className="text-3xl font-display font-black text-brand-yellow">
                  4.7 <span className="text-sm font-normal text-neutral-400">/ 5.0</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider mt-1 text-neutral-400">
                  Google Rating
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">High Student Satisfaction</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-colors ${isNight ? 'bg-night-surface border-night-border' : 'bg-white border-day-border shadow-sm'}`}>
                <div className="text-3xl font-display font-black text-brand-yellow">
                  6,049+
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider mt-1 text-neutral-400">
                  Google Reviews
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">Verified Public Feedback</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-colors ${isNight ? 'bg-night-surface border-night-border' : 'bg-white border-day-border shadow-sm'}`}>
                <div className="flex items-center gap-1.5 text-brand-yellow">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xl font-display font-bold">Mayyil</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider mt-1 text-neutral-400">
                  Kannur, Kerala
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">Raghava Complex, Near MMC</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-colors ${isNight ? 'bg-night-surface border-night-border' : 'bg-white border-day-border shadow-sm'}`}>
                <div className="flex items-center gap-1.5 text-brand-yellow">
                  <Award className="w-5 h-5" />
                  <span className="text-xl font-display font-bold">Dual-Control</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider mt-1 text-neutral-400">
                  Safety System
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">Full Instructor Override</div>
              </div>
            </div>

            {/* Key highlights checklist */}
            <div className="space-y-2 pt-2 text-sm">
              {[
                'Practical on-road training focused on real town & highway traffic',
                'Patient, certified instructors tailored to first-time drivers',
                'Morning & evening slots to fit your professional schedule',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow shrink-0" />
                  <span className={isNight ? 'text-neutral-300' : 'text-neutral-700'}>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  playUiClick();
                  onOpenBooking();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow transition-all duration-300"
              >
                <span>Book Your First Lesson</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
