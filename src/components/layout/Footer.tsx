import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Shield, ArrowUp, Star, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

export const Footer: React.FC = () => {
  const { isNight } = useTheme();

  const scrollToTop = () => {
    playUiClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-12 overflow-hidden bg-neutral-950 text-white border-t border-neutral-800">
      {/* --- SUBTLE ANIMATED ROAD-LINE STRIP EFFECT --- */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-neutral-900 overflow-hidden">
        <motion.div
          className="h-full w-24 bg-brand-yellow shadow-[0_0_12px_#FFD400]"
          animate={{ x: ['-100%', '1600%'] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-neutral-800/80">
          {/* Brand Info Col */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-yellow text-black flex items-center justify-center font-black text-lg shadow-glow-yellow">
                A
              </div>
              <div>
                <h3 className="font-display font-black text-xl tracking-tight text-white">
                  {SITE_CONFIG.brand.name}
                </h3>
                <p className="text-[10px] font-mono tracking-wider uppercase text-brand-yellow">
                  {SITE_CONFIG.brand.hindiName}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Kannur's premier car driving training school located in Mayyil. Dedicated to building confident, defensive, and safety-conscious drivers.
            </p>

            {/* Google Verified Review Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white">4.7 / 5.0</span>
              <span className="text-neutral-500">•</span>
              <span className="text-brand-yellow font-semibold">6,049+ Google Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => playUiClick()}
                    className="hover:text-brand-yellow transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
              Training Courses
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {SITE_CONFIG.courses.slice(0, 5).map((course) => (
                <li key={course.id}>
                  <a
                    href="#courses"
                    onClick={() => playUiClick()}
                    className="hover:text-brand-yellow transition-colors"
                  >
                    {course.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
              Mayyil Facility
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.location.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-yellow shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-white font-mono">
                  {SITE_CONFIG.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp Consultation
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Tagline Banner */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-900">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-brand-yellow uppercase">
              A ONE MOTORS COMMITMENT
            </span>
            <h4 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
              START AS A LEARNER. LEAVE AS A CONFIDENT DRIVER.
            </h4>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-mono border border-neutral-800 transition"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-brand-yellow" />
          </button>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} A ONE Motors Driving Training School. All rights reserved.</p>
          <p>Raghava Complex, Near MMC Hospital, Chirakkal-Mayyil-Kolam Road, Mayyil, Kannur, Kerala 670602</p>
        </div>
      </div>
    </footer>
  );
};
