import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageSquare, Phone, Sparkles, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { SITE_CONFIG, PackageItem } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

interface PackagesSectionProps {
  onOpenBooking: (packageName?: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onOpenBooking }) => {
  const { isNight } = useTheme();

  const handleWhatsAppEnquiry = (pkgName: string) => {
    playUiClick();
    const msg = `Hello A ONE Motors, I am inquiring about the ${pkgName} in Mayyil, Kannur. Please share fee structure and available time slots.`;
    const url = `${SITE_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="packages" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT TRAINING PROGRAMS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight">
            CHOOSE YOUR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-400 to-yellow-200">
              DRIVING JOURNEY.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Structured practical modules designed to take you from your first ignition to complete highway confidence.
          </p>
        </div>

        {/* 4 Pricing / Training Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SITE_CONFIG.packages.map((pkg: PackageItem, idx: number) => {
            const isHighlight = pkg.isPopular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border transition-all duration-300 ${
                  isHighlight
                    ? 'border-brand-yellow bg-neutral-900/90 shadow-[0_0_40px_rgba(255,212,0,0.2)] ring-1 ring-brand-yellow'
                    : isNight
                    ? 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 shadow-glass-night'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-glass-day'
                }`}
              >
                {/* Popular Choice Floating Tag */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-brand-yellow text-black shadow-lg">
                    POPULAR CHOICE
                  </div>
                )}

                <div>
                  {/* Package Number & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-brand-yellow">
                      {pkg.number}
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800 text-[11px] font-mono text-neutral-300 border border-neutral-700">
                      <Clock className="w-3 h-3 text-brand-yellow" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Package Name */}
                  <h3 className={`font-display font-black text-2xl tracking-tight mb-2 ${
                    isNight || isHighlight ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-neutral-400 mb-4 min-h-[32px]">
                    {pkg.tagline}
                  </p>

                  {/* Price Tag Line */}
                  <div className="py-3 px-4 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                      Course Fee
                    </span>
                    <span className="text-base font-display font-bold text-brand-yellow">
                      {pkg.priceNote}
                    </span>
                  </div>

                  {/* Suitable For */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      Ideal For:
                    </span>
                    <p className={`text-xs ${isNight || isHighlight ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {pkg.suitableFor}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8 text-xs">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      Curriculum Includes:
                    </span>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
                        <span className={isNight || isHighlight ? 'text-neutral-300' : 'text-neutral-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-neutral-700/30">
                  <button
                    onClick={() => {
                      playUiClick();
                      onOpenBooking(pkg.name);
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                      isHighlight
                        ? 'bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    }`}
                  >
                    <span>Enquire Package</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppEnquiry(pkg.name)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-brand-yellow flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Enquiry</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note requirement */}
        <div className="mt-12 text-center max-w-xl mx-auto p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400">
          <p className="font-semibold text-neutral-300">
            "Contact us for current fees, available schedules, and package details."
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">
            Training schedules can be booked in morning or evening shifts according to student convenience.
          </p>
        </div>
      </div>
    </section>
  );
};
