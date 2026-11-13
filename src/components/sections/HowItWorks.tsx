import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Calendar, Car, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const { isNight } = useTheme();

  const iconMap: Record<string, React.ReactNode> = {
    PhoneCall: <PhoneCall className="w-6 h-6" />,
    Calendar: <Calendar className="w-6 h-6" />,
    Car: <Car className="w-6 h-6" />,
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEAMLESS ONBOARDING</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            THREE STEPS.{' '}
            <span className="text-brand-yellow">ONE BIG MILESTONE.</span>
          </h2>

          <p className={`text-base sm:text-lg ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Starting your driving training at A ONE Motors in Mayyil, Kannur is straightforward and hassle-free.
          </p>
        </div>

        {/* Road Timeline Container */}
        <div className="relative">
          {/* Desktop Connecting Highway Graphic Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-8 bg-neutral-900 border-y border-neutral-800 rounded-full overflow-hidden z-0 shadow-inner">
            {/* Center animated road dashed lane */}
            <div className="absolute inset-0 flex items-center justify-around">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="h-1 w-8 bg-brand-yellow/80 rounded-sm animate-pulse" />
              ))}
            </div>

            {/* Traveling Mini Car */}
            <motion.div
              className="absolute top-1 z-10"
              animate={{ left: ['0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            >
              <div className="w-10 h-5 bg-brand-yellow rounded shadow-[0_0_12px_#FFD400] flex items-center justify-center">
                <div className="w-4 h-2 bg-black rounded-xs" />
                <div className="absolute -right-3 top-0 bottom-0 w-4 bg-gradient-to-r from-brand-yellow to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* 3 Step Cards */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SITE_CONFIG.howItWorks.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`group relative p-8 rounded-3xl border transition-all duration-300 ${
                  isNight
                    ? 'bg-neutral-900/90 border-neutral-800 hover:border-brand-yellow/50 shadow-glass-night'
                    : 'bg-white border-neutral-200 hover:border-brand-yellow shadow-glass-day'
                }`}
              >
                {/* Step Marker Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-yellow text-black font-display font-black text-xl flex items-center justify-center shadow-glow-yellow">
                    {step.step}
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 text-brand-yellow border border-neutral-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[step.icon] || <Car className="w-6 h-6" />}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-yellow font-bold">
                    {step.action}
                  </span>
                  <h3 className={`font-display font-bold text-2xl tracking-tight ${
                    isNight ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {step.title}
                  </h3>
                </div>

                <p className={`text-sm leading-relaxed mb-6 ${
                  isNight ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {step.description}
                </p>

                <div className="pt-4 border-t border-neutral-700/20 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">
                    {step.highlight}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-brand-yellow/10 text-brand-yellow flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              playUiClick();
              onOpenBooking();
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow hover:scale-105 transition-all duration-300"
          >
            <span>Begin Step 01 — Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
