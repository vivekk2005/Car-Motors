import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface AnimatedRoadDividerProps {
  variant?: 'straight' | 'curve-left' | 'curve-right';
  checkpointLabel?: string;
}

export const AnimatedRoadDivider: React.FC<AnimatedRoadDividerProps> = ({
  variant = 'straight',
  checkpointLabel,
}) => {
  const { isNight } = useTheme();

  return (
    <div className="relative w-full py-8 overflow-hidden select-none flex flex-col items-center justify-center">
      {/* Highway Asphalt Strip */}
      <div className="relative w-full max-w-4xl h-14 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Outer White Guard Lines */}
        <div className="absolute top-1.5 inset-x-0 h-0.5 bg-white/40" />
        <div className="absolute bottom-1.5 inset-x-0 h-0.5 bg-white/40" />

        {/* Moving Yellow Center Dashed Markings */}
        <div className="absolute inset-x-0 flex items-center justify-around overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 w-12 bg-brand-yellow rounded-sm"
              animate={{ x: [-80, 80] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Small Driving Car Silhouette cruising the lane */}
        <motion.div
          className="absolute z-10 flex items-center"
          animate={{ x: ['-200%', '800%'] }}
          transition={{
            repeat: Infinity,
            duration: 6.5,
            ease: 'easeInOut',
          }}
        >
          {/* Mini Sports Car Top-Down Silhouette */}
          <div className="relative w-12 h-6 bg-brand-yellow rounded-lg shadow-[0_0_12px_#FFD400] flex items-center justify-center">
            <div className="w-6 h-3 bg-neutral-950 rounded-sm" />
            {/* Front Headlights Beam */}
            <div className="absolute -right-5 top-0 bottom-0 w-6 bg-gradient-to-r from-brand-yellow/60 to-transparent" />
          </div>
        </motion.div>

        {/* Checkpoint milestone tag */}
        {checkpointLabel && (
          <div className="relative z-20 px-4 py-1 rounded-full bg-black/80 backdrop-blur-md border border-brand-yellow/40 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-brand-yellow uppercase">
            {checkpointLabel}
          </div>
        )}
      </div>
    </div>
  );
};
