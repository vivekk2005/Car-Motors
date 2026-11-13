import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Gauge, ShieldCheck, Clock, Compass, Award, Sparkles, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';

export const WhyChooseUs: React.FC = () => {
  const { isNight } = useTheme();

  const iconMap: Record<string, React.ReactNode> = {
    UserCheck: <UserCheck className="w-6 h-6" />,
    Gauge: <Gauge className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />,
    Compass: <Compass className="w-6 h-6" />,
    Award: <Award className="w-6 h-6" />,
  };

  return (
    <section id="why-us" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE A ONE MOTORS DIFFERENCE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight">
            THE RIGHT PLACE TO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-400 to-yellow-200">
              TAKE CONTROL.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Master driving through dedicated one-on-one sessions, certified trainers, and structured practical road experience in Mayyil, Kannur.
          </p>
        </div>

        {/* 6 Interactive Bento Feature Blocks (01 — 06) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.whyChooseUs.map((feature, idx) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group relative p-8 rounded-3xl border transition-all duration-300 ${
                isNight
                  ? 'bg-neutral-900/70 hover:bg-neutral-900 border-neutral-800 hover:border-brand-yellow/50 shadow-glass-night'
                  : 'bg-white hover:bg-neutral-50/90 border-neutral-200/90 hover:border-brand-yellow shadow-glass-day'
              }`}
            >
              {/* Feature Number & Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-2xl font-black text-brand-yellow">
                  {feature.num}
                </span>

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 group-hover:scale-110 group-hover:bg-brand-yellow group-hover:text-black transition-all duration-300">
                  {iconMap[feature.icon] || <CheckCircle className="w-6 h-6" />}
                </div>
              </div>

              {/* Title & Short Tag */}
              <div className="space-y-1 mb-3">
                <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">
                  {feature.short}
                </span>
                <h3 className={`font-display font-bold text-xl tracking-tight transition-colors ${
                  isNight ? 'text-white group-hover:text-brand-yellow' : 'text-neutral-900 group-hover:text-amber-600'
                }`}>
                  {feature.title}
                </h3>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {feature.description}
              </p>

              {/* Subtle hover bottom road indicator line */}
              <div className="mt-6 pt-4 border-t border-neutral-700/20 flex items-center gap-2">
                <div className="h-1 w-6 rounded-full bg-brand-yellow/30 group-hover:w-16 group-hover:bg-brand-yellow transition-all duration-300" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  Mayyil, Kannur Training Standard
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
