import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, isNight, toggleTheme } = useTheme();

  const handleToggle = () => {
    playUiClick();
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${isNight ? 'Day Mode' : 'Night Mode'}`}
      className={`relative inline-flex items-center h-10 w-20 rounded-full p-1 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 ${
        isNight
          ? 'bg-neutral-900 border border-neutral-700/80 shadow-inner'
          : 'bg-neutral-200 border border-neutral-300 shadow-inner'
      } ${className}`}
    >
      {/* Background Track Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <Sun
          className={`w-4 h-4 transition-opacity duration-300 ${
            isNight ? 'text-neutral-500 opacity-60' : 'text-amber-500 opacity-100'
          }`}
        />
        <Moon
          className={`w-4 h-4 transition-opacity duration-300 ${
            isNight ? 'text-brand-yellow opacity-100' : 'text-neutral-400 opacity-50'
          }`}
        />
      </div>

      {/* Floating Animated Thumb with Spring Physics */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
          isNight
            ? 'bg-neutral-800 text-brand-yellow translate-x-10 shadow-[0_0_15px_rgba(255,212,0,0.5)]'
            : 'bg-white text-amber-500 translate-x-0 shadow-md'
        }`}
      >
        {isNight ? (
          <Moon className="w-4 h-4 fill-brand-yellow/20" />
        ) : (
          <Sun className="w-4 h-4 fill-amber-400/20" />
        )}
      </motion.div>
    </button>
  );
};
