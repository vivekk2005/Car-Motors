import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Sparkles, Car, Shield, Gauge } from 'lucide-react';
import { SITE_CONFIG, CourseItem } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

interface CoursesSectionProps {
  onOpenBooking: (courseName?: string) => void;
  onOpenAdvisor: () => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onOpenBooking, onOpenAdvisor }) => {
  const { isNight } = useTheme();
  const [filter, setFilter] = useState<string>('all');

  const filteredCourses = SITE_CONFIG.courses.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'manual') return c.transmission === 'Manual' || c.transmission === 'Both Available';
    if (filter === 'auto') return c.transmission === 'Automatic' || c.transmission === 'Both Available';
    return true;
  });

  return (
    <section id="courses" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
              <Car className="w-3.5 h-3.5" />
              <span>PRACTICAL DRIVING CURRICULUM</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              FIND YOUR WAY{' '}
              <span className="text-brand-yellow">BEHIND THE WHEEL.</span>
            </h2>

            <p className={`text-base sm:text-lg ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Structured practical driving categories tailored for first-time learners, city commuters, and license holders rebuilding confidence.
            </p>
          </div>

          {/* Filter Pills & Advisor Button */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'manual', label: 'Manual' },
              { id: 'auto', label: 'Automatic' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playUiClick();
                  setFilter(tab.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  filter === tab.id
                    ? 'bg-brand-yellow text-black shadow-glow-yellow'
                    : isNight
                    ? 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                    : 'bg-neutral-200 text-neutral-700 hover:text-black hover:bg-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={onOpenAdvisor}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black transition-all duration-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Help Me Choose</span>
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: CourseItem, idx: number) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`group flex flex-col justify-between rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${
                isNight
                  ? 'bg-neutral-900/80 border-neutral-800 hover:border-brand-yellow/60 shadow-glass-night'
                  : 'bg-white border-neutral-200 hover:border-brand-yellow/80 shadow-glass-day'
              }`}
            >
              <div>
                {/* Course Image Header with Badge */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Transmission & Popular Pill */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md border border-white/20 text-white">
                      {course.transmission}
                    </span>
                    {course.popular && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-yellow text-black shadow-md">
                        POPULAR
                      </span>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-brand-yellow font-bold">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <h3 className={`font-display font-bold text-xl sm:text-2xl tracking-tight transition-colors ${
                    isNight ? 'text-white group-hover:text-brand-yellow' : 'text-neutral-900 group-hover:text-amber-600'
                  }`}>
                    {course.title}
                  </h3>

                  <p className={`text-sm leading-relaxed ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {course.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                      Key Learning Outcomes:
                    </span>
                    <ul className="space-y-2 text-xs">
                      {course.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-yellow shrink-0 mt-0.5" />
                          <span className={isNight ? 'text-neutral-300' : 'text-neutral-700'}>
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 sm:p-7 pt-0 border-t border-neutral-700/20 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block">
                    Duration
                  </span>
                  <span className={`text-xs font-semibold ${isNight ? 'text-white' : 'text-neutral-900'}`}>
                    {course.duration}
                  </span>
                </div>

                <button
                  onClick={() => {
                    playUiClick();
                    onOpenBooking(course.title);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow transition-all duration-300"
                >
                  <span>Enquire Now</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proposed disclaimer note */}
        <p className="text-center text-xs text-neutral-500 font-mono mt-8">
          * Note: Course modules can be customized based on individual learner proficiency and RTO driving test requirements.
        </p>
      </div>
    </section>
  );
};
