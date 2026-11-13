import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, MessageSquare, Phone, Calendar, Clock, Car, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import confetti from 'canvas-confetti';
import { playUiClick } from '../../utils/audio';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseOrPackage?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultCourseOrPackage = 'General Enquiry',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    selectedItem: defaultCourseOrPackage,
    timePreference: 'Morning (7:00 AM - 10:00 AM)',
    transmission: 'Manual',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your mobile number';
    } else if (!/^[0-9+ -]{10,14}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    playUiClick();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD400', '#FFFFFF', '#FF8800'],
      });
    } catch {
      // ignore
    }

    // Auto open WhatsApp with the formatted booking details
    const msg = `Hello A ONE Motors, I would like to book a lesson.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Interest:* ${formData.selectedItem}\n*Transmission:* ${formData.transmission}\n*Preferred Slot:* ${formData.timePreference}\n${formData.notes ? `*Notes:* ${formData.notes}` : ''}`;
    const whatsappUrl = `https://wa.me/918129259790?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-700/80 shadow-2xl p-6 sm:p-8 text-white z-10"
          >
            {/* Header Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30 mb-2">
                    <Car className="w-3.5 h-3.5" />
                    <span>PRIORITY BOOKING</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    Book Your Lesson at A ONE Motors
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Mayyil, Kannur • Direct instructor allocation with dual-control cars
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-800/90 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow transition"
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 81292 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-800/90 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow transition"
                    />
                    {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        Course / Package
                      </label>
                      <select
                        value={formData.selectedItem}
                        onChange={(e) => setFormData({ ...formData, selectedItem: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-brand-yellow transition"
                      >
                        <option value="15 Days Confidence Builder (Popular)">15 Days Confidence Builder</option>
                        <option value="7 Days Quick Start">7 Days Quick Start</option>
                        <option value="31 Days Complete Driver">31 Days Complete Driver</option>
                        <option value="Beginner Driving Course">Beginner Driving Course</option>
                        <option value="City Driving Practice">City Driving Practice</option>
                        <option value="Parking & Reverse Training">Parking & Reverse Training</option>
                        <option value="Refresher Course">Refresher Driving Course</option>
                        <option value="Custom Training">Custom Training Schedule</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        Transmission
                      </label>
                      <select
                        value={formData.transmission}
                        onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-brand-yellow transition"
                      >
                        <option value="Manual">Manual Transmission</option>
                        <option value="Automatic">Automatic (AMT/AT)</option>
                        <option value="Both / Not Sure">Both / Need Advice</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                      Preferred Training Slot
                    </label>
                    <select
                      value={formData.timePreference}
                      onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-brand-yellow transition"
                    >
                      <option value="Early Morning (6:30 AM - 8:30 AM)">Early Morning (6:30 AM - 8:30 AM)</option>
                      <option value="Morning (8:30 AM - 11:00 AM)">Morning (8:30 AM - 11:00 AM)</option>
                      <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="Evening (4:00 PM - 7:30 PM)">Evening (4:00 PM - 7:30 PM)</option>
                      <option value="Weekend Special Slot">Weekend Only Batches</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold tracking-wide bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow transition-all duration-300 text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>CONFIRM & CONNECT VIA WHATSAPP</span>
                    </button>
                    <p className="text-center text-xs text-neutral-400 mt-2">
                      Instant WhatsApp response • No spam guaranteed
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Enquiry Transmitted!
                </h3>
                <p className="text-neutral-300 text-sm max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Opening WhatsApp to connect directly with the A ONE Motors Mayyil, Kannur training coordinator now...
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 text-xs font-semibold"
                  >
                    <Phone className="w-4 h-4 text-brand-yellow" />
                    <span>Call +91 81292 59790</span>
                  </a>
                  <button
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl bg-brand-yellow text-black font-bold text-xs"
                  >
                    Done
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
