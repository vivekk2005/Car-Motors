import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Check, Compass, Shield, Zap } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { playUiClick } from '../../utils/audio';

interface CourseAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackageOrCourse: (name: string) => void;
}

export const CourseAdvisorModal: React.FC<CourseAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSelectPackageOrCourse,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    experience: '',
    transmission: '',
    speed: '',
  });

  const handleSelect = (key: 'experience' | 'transmission' | 'speed', value: string) => {
    playUiClick();
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // results
    }
  };

  const reset = () => {
    setStep(1);
    setAnswers({ experience: '', transmission: '', speed: '' });
  };

  const getRecommendation = () => {
    if (answers.experience === 'beginner') {
      if (answers.speed === 'fast') {
        return {
          title: '15 Days Confidence Builder',
          desc: 'Structured daily sessions designed to build confident reflexes quickly.',
          courseName: 'Beginner Driving Course',
          tag: 'Recommended Match',
        };
      }
      return {
        title: '31 Days Complete Driver',
        desc: 'Comprehensive end-to-end curriculum for zero-hesitation independent driving.',
        courseName: 'Beginner Driving Course',
        tag: 'Complete Mastery',
      };
    }
    if (answers.experience === 'refresher') {
      return {
        title: '7 Days Quick Start / Refresher',
        desc: 'Targeted drills to revive muscle memory and eliminate highway hesitation.',
        courseName: 'Refresher Driving Course',
        tag: 'Quick Revival',
      };
    }
    return {
      title: 'City Driving Practice & Reverse Bay',
      desc: 'Targeted maneuvers for heavy city traffic and parallel parking confidence.',
      courseName: 'City Driving Practice',
      tag: 'Specialized Training',
    };
  };

  const rec = getRecommendation();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-neutral-700 p-6 sm:p-8 text-white z-10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-brand-yellow">
              <Sparkles className="w-4 h-4" />
              <span>AI DRIVING COURSE ADVISOR</span>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold">
                  What is your current driving experience?
                </h3>
                <p className="text-xs text-neutral-400">Step 1 of 3</p>
                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'beginner', label: 'Complete Beginner (Never driven before)' },
                    { id: 'some', label: 'Know basic steering, but get nervous in traffic' },
                    { id: 'refresher', label: 'Have a license, but haven’t driven in years' },
                    { id: 'parking', label: 'Struggle specifically with reverse & parking' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect('experience', opt.id)}
                      className="w-full text-left p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-brand-yellow transition duration-200 flex items-center justify-between text-sm"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-yellow" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold">
                  Which transmission do you wish to train on?
                </h3>
                <p className="text-xs text-neutral-400">Step 2 of 3</p>
                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'manual', label: 'Manual (Clutch & Gear Stick)' },
                    { id: 'auto', label: 'Automatic (AMT / AT)' },
                    { id: 'both', label: 'Both / Would like instructor recommendation' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect('transmission', opt.id)}
                      className="w-full text-left p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-brand-yellow transition duration-200 flex items-center justify-between text-sm"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold">
                  What is your preferred completion timetable?
                </h3>
                <p className="text-xs text-neutral-400">Step 3 of 3</p>
                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'fast', label: 'Focused 15 Days (Recommended pace)' },
                    { id: 'comprehensive', label: 'Comprehensive 1 Month (Full mastery)' },
                    { id: 'weekend', label: 'Flexible or Weekend Only Schedule' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect('speed', opt.id)}
                      className="w-full text-left p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-brand-yellow transition duration-200 flex items-center justify-between text-sm"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 text-center py-2">
                <div className="w-14 h-14 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow mx-auto flex items-center justify-center">
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-yellow text-black uppercase tracking-wider mb-2">
                    {rec.tag}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white">{rec.title}</h3>
                  <p className="text-sm text-neutral-300 mt-2">{rec.desc}</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-left text-xs space-y-2">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Check className="w-4 h-4 text-brand-yellow" />
                    <span>Includes dual-control training car</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Check className="w-4 h-4 text-brand-yellow" />
                    <span>Personalized coaching in Mayyil, Kannur</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Check className="w-4 h-4 text-brand-yellow" />
                    <span>Morning & evening flexible batches available</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={reset}
                    className="flex-1 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectPackageOrCourse(rec.title);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-brand-yellow text-black font-bold text-xs hover:bg-brand-yellowHover shadow-glow-yellow"
                  >
                    Enquire This Package
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
