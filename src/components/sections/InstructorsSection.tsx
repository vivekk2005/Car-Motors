import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Star, ShieldCheck, ChevronRight, MessageSquare, Quote } from 'lucide-react';
import { SITE_CONFIG, InstructorItem } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

interface InstructorsSectionProps {
  onOpenBooking: (instructorName?: string) => void;
}

export const InstructorsSection: React.FC<InstructorsSectionProps> = ({ onOpenBooking }) => {
  const { isNight } = useTheme();

  return (
    <section id="instructors" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
            <UserCheck className="w-3.5 h-3.5" />
            <span>CERTIFIED DRIVING MENTORS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            LEARN FROM PEOPLE{' '}
            <span className="text-brand-yellow">WHO GUIDE YOU.</span>
          </h2>

          <p className={`text-base sm:text-lg ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Meet our patient, certified instructors named and commended by students in real Google reviews.
          </p>
        </div>

        {/* 3 Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_CONFIG.instructors.map((instructor: InstructorItem, idx: number) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className={`group flex flex-col justify-between rounded-3xl overflow-hidden border transition-all duration-500 ${
                isNight
                  ? 'bg-neutral-900/90 border-neutral-800 hover:border-brand-yellow/60 shadow-glass-night'
                  : 'bg-white border-neutral-200 hover:border-brand-yellow/80 shadow-glass-day'
              }`}
            >
              <div>
                {/* Portrait Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-brand-yellow text-black shadow-md">
                      {instructor.experienceBadge}
                    </span>
                  </div>

                  {/* Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display font-black text-2xl text-white">
                      {instructor.name}
                    </h3>
                    <p className="text-xs font-mono text-brand-yellow uppercase tracking-wider">
                      {instructor.role}
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4">
                  {/* Verified Student Feedback Quote */}
                  <div className="p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs italic text-neutral-300 relative">
                    <Quote className="w-4 h-4 text-brand-yellow/40 inline mr-1" />
                    <span>{instructor.feedbackHighlight}</span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {instructor.bio}
                  </p>

                  {/* Specializations */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-semibold">
                      Specialities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {instructor.specialty.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg text-[11px] bg-neutral-800 text-neutral-300 border border-neutral-700"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 mt-2">
                <button
                  onClick={() => {
                    playUiClick();
                    onOpenBooking(`Training with ${instructor.name}`);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-neutral-800 group-hover:bg-brand-yellow text-neutral-200 group-hover:text-black transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <span>Request {instructor.name.split(' ')[0]}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
