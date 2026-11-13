import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Compass, ChevronRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { ThemeToggle } from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

interface HeaderProps {
  onOpenBooking: (courseOrPackage?: string) => void;
  onOpenAdvisor: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenAdvisor }) => {
  const { isNight } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = ['home', 'about', 'courses', 'packages', 'why-us', 'reviews', 'gallery', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Courses', href: '#courses', id: 'courses' },
    { label: 'Packages', href: '#packages', id: 'packages' },
    { label: 'Why Choose Us', href: '#why-us', id: 'why-us' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    playUiClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? isNight
              ? 'bg-night-bg/85 backdrop-blur-xl border-b border-white/10 shadow-glass-night py-3'
              : 'bg-white/85 backdrop-blur-xl border-b border-black/10 shadow-glass-day py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* --- LEFT: LOGO (STEERING WHEEL + ROAD SYMBOL) --- */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              {/* Minimal Steering Wheel + Highway Road Symbol SVG */}
              <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br from-brand-yellow via-amber-400 to-amber-500 p-0.5 shadow-md shadow-brand-yellow/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-[14px] bg-neutral-950 flex items-center justify-center">
                  <svg
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-brand-yellow"
                  >
                    {/* Outer steering rim */}
                    <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.5" />
                    {/* Inner hub */}
                    <circle cx="18" cy="18" r="4.5" fill="currentColor" />
                    {/* Horizontal steering spokes */}
                    <path d="M4 18H13.5M22.5 18H32" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    {/* Lower vertical spoke extending into highway perspective */}
                    <path d="M18 22.5V32" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    {/* Highway perspective lane dashes inside */}
                    <path d="M14 31L16 23M22 31L20 23" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-display text-lg sm:text-xl font-black tracking-tight ${isNight ? 'text-white' : 'text-day-text'}`}>
                    A ONE MOTORS
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block animate-pulse" />
                </div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-brand-yellow">
                  DRIVING SCHOOL • MAYYIL, KANNUR
                </span>
              </div>
            </a>

            {/* --- CENTER: DESKTOP NAVIGATION --- */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border transition-colors duration-300 border-white/10 bg-black/20">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'text-black bg-brand-yellow shadow-sm font-bold'
                        : isNight
                        ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                        : 'text-neutral-700 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* --- RIGHT: THEME TOGGLE, CTA BUTTON & MOBILE TRIGGER --- */}
            <div className="flex items-center gap-3">
              {/* Day / Night Mode Switch */}
              <ThemeToggle />

              {/* Advisor Quiz Button (hidden on small mobile) */}
              <button
                onClick={onOpenAdvisor}
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition duration-300 border-white/20 hover:border-brand-yellow text-white/90 hover:text-brand-yellow bg-white/5 backdrop-blur-md"
                title="AI Course Selector"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Find Course</span>
              </button>

              {/* Book Your Lesson CTA Button */}
              <button
                onClick={() => {
                  playUiClick();
                  onOpenBooking();
                }}
                className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow hover:scale-105 transition-all duration-300"
              >
                <span>Book Lesson</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className={`lg:hidden p-2 rounded-xl transition ${
                  isNight ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-900'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={`fixed inset-x-0 top-16 z-30 p-6 lg:hidden border-b shadow-2xl backdrop-blur-2xl ${
              isNight ? 'bg-neutral-950/95 border-neutral-800 text-white' : 'bg-white/95 border-neutral-200 text-neutral-900'
            }`}
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    activeSection === link.id
                      ? 'bg-brand-yellow text-black font-bold'
                      : isNight
                      ? 'hover:bg-neutral-800 text-neutral-300'
                      : 'hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 border-t border-neutral-700/50 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdvisor();
                  }}
                  className="w-full py-3 rounded-xl border border-brand-yellow/40 text-brand-yellow text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Course Finder</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 rounded-xl bg-brand-yellow text-black text-xs font-bold tracking-wider uppercase shadow-glow-yellow"
                >
                  Book Your Lesson Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
