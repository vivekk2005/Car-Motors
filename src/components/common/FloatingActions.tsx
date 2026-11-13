import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { playUiClick } from '../../utils/audio';

export const FloatingActions: React.FC = () => {
  const handleWhatsApp = () => {
    playUiClick();
    const url = `${SITE_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefaultMessage)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    playUiClick();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Phone Call Floating Button */}
      <a
        href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
        onClick={handleCall}
        aria-label="Direct Phone Call to A ONE Motors"
        className="group relative flex items-center justify-center w-13 h-13 p-3.5 rounded-full bg-neutral-900 border border-brand-yellow/60 text-brand-yellow shadow-lg hover:scale-110 hover:bg-neutral-800 transition-all duration-300"
      >
        <Phone className="w-5 h-5 fill-brand-yellow/20" />
        
        {/* Tooltip on hover */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs font-mono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Call +91 81292 59790
        </span>
      </a>

      {/* WhatsApp Floating Button with Pulsing Wave */}
      <button
        onClick={handleWhatsApp}
        aria-label="Chat with A ONE Motors on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-300"
      >
        {/* Pulsing ring wave animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10" />

        <MessageSquare className="w-7 h-7 fill-white" />

        {/* WhatsApp Tooltip */}
        <span className="absolute right-16 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Chat on WhatsApp</span>
        </span>
      </button>
    </div>
  );
};
