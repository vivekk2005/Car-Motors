import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Send, CheckCircle, Navigation, Clock, ShieldCheck, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { useTheme } from '../../context/ThemeContext';
import { playUiClick } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { isNight } = useTheme();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    course: '15 Days Confidence Builder',
    timeSlot: 'Morning (8:00 AM - 10:00 AM)',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+ -]{10,14}$/.test(form.phone.trim())) {
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
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFD400', '#FFFFFF', '#FF8800'],
      });
    } catch {
      // ignore
    }

    // Connect to WhatsApp workflow directly
    const text = `Hello A ONE Motors,\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Preferred Course:* ${form.course}\n*Preferred Time Slot:* ${form.timeSlot}\n*Message:* ${form.message || 'I would like to enquire about driving training.'}\n\nPlease share batch availability and fee structure.`;
    const targetUrl = `https://wa.me/918129259790?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>VISIT OR CONNECT</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            YOUR NEXT STOP:{' '}
            <span className="text-brand-yellow">A ONE MOTORS.</span>
          </h2>

          <p className={`text-base sm:text-lg ${isNight ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Conveniently situated at Raghava Complex, Near MMC Hospital, Chirakkal-Mayyil-Kolam Road, Mayyil, Kannur, Kerala 670602. Reach out via WhatsApp, direct call, or submit the enquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* --- LEFT: BUSINESS DETAILS & GOOGLE MAPS EMBED --- */}
          <div className="lg:col-span-5 space-y-6">
            {/* Business Contact Card */}
            <div className={`p-8 rounded-3xl border ${
              isNight ? 'bg-neutral-900/90 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
            } shadow-2xl space-y-6`}>
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-yellow font-bold">
                  HEADQUARTERS
                </span>
                <h3 className="font-display font-black text-2xl">
                  {SITE_CONFIG.brand.name}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  {SITE_CONFIG.brand.hindiName}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Address</h4>
                  <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
                    {SITE_CONFIG.location.fullAddress}
                  </p>
                  <p className="text-brand-yellow text-xs font-mono mt-1 font-semibold">
                    Plus Code: {SITE_CONFIG.location.googlePlusCode}
                  </p>
                </div>
              </div>

              {/* Phone & Direct Calling */}
              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Call Us</h4>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                    className="text-brand-yellow font-bold text-base hover:underline block mt-0.5"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    Operating daily: 6:00 AM – 8:00 PM
                  </p>
                </div>
              </div>

              {/* WhatsApp Fast Channel */}
              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Instant WhatsApp</h4>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    Get fee schedule & slot availability instantly
                  </p>
                  <a
                    href={`${SITE_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 text-xs font-bold hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <span>Chat on WhatsApp</span>
                    <Navigation className="w-3 h-3 rotate-45" />
                  </a>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href={SITE_CONFIG.location.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center gap-2 border border-neutral-700"
                >
                  <Navigation className="w-4 h-4 text-brand-yellow" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-neutral-800 shadow-xl">
              <iframe
                title="A ONE Motors Mayyil Kannur Kerala Location Map"
                src={SITE_CONFIG.location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-125"
              />
              {/* Overlay Label */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Mayyil, Kannur, Kerala</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: CONTACT ENQUIRY FORM --- */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-3xl border ${
              isNight ? 'bg-neutral-900/90 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
            } shadow-2xl`}>
              <div className="space-y-1 mb-8">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-yellow font-bold">
                  DIRECT ENQUIRY
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl">
                  Send a Training Enquiry
                </h3>
                <p className="text-xs text-neutral-400">
                  Fill in your details below and our team will connect with batch options.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-neutral-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-brand-yellow transition"
                      />
                      {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-neutral-300">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 81292 XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-brand-yellow transition"
                      />
                      {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-neutral-300">
                        Preferred Course
                      </label>
                      <select
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-brand-yellow transition"
                      >
                        <option value="15 Days Confidence Builder">15 Days Confidence Builder (Popular)</option>
                        <option value="7 Days Quick Start">7 Days Quick Start</option>
                        <option value="31 Days Complete Driver">31 Days Complete Driver</option>
                        <option value="Beginner Driving Course">Beginner Driving Course</option>
                        <option value="City Driving Practice">City Driving Practice</option>
                        <option value="Parking & Reverse Training">Parking & Reverse Training</option>
                        <option value="Refresher Driving Course">Refresher Driving Course</option>
                        <option value="Custom Training Schedule">Custom Training Schedule</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-neutral-300">
                        Preferred Training Time
                      </label>
                      <select
                        value={form.timeSlot}
                        onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-brand-yellow transition"
                      >
                        <option value="Early Morning (6:30 AM - 8:30 AM)">Early Morning (6:30 AM - 8:30 AM)</option>
                        <option value="Morning (8:30 AM - 11:00 AM)">Morning (8:30 AM - 11:00 AM)</option>
                        <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                        <option value="Evening (4:00 PM - 7:30 PM)">Evening (4:00 PM - 7:30 PM)</option>
                        <option value="Weekend Special Only">Weekend Special Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-neutral-300">
                      Message / Special Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your driving background, questions regarding manual/automatic, or specific areas you want to master..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-brand-yellow transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl font-bold uppercase tracking-wider text-xs bg-brand-yellow text-black hover:bg-brand-yellowHover shadow-glow-yellow flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Connect on WhatsApp</span>
                  </button>

                  <p className="text-center text-xs text-neutral-400">
                    We will directly open WhatsApp with your training preferences.
                  </p>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-white">
                    Enquiry Ready!
                  </h4>
                  <p className="text-neutral-300 text-sm max-w-md mx-auto">
                    Opening WhatsApp to connect with A ONE Motors team on +91 81292 59790 now...
                  </p>
                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
