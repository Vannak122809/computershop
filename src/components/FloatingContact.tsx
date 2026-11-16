'use client';

import React, { useState, useEffect } from 'react';
import { Send, Phone, ArrowUp, MessageCircle } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function FloatingContact() {
  const { lang } = useStore();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end space-y-2.5">
      
      {/* Back to Top Smooth Scroll Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-10 h-10 rounded-full bg-white text-slate-700 hover:text-[#0187ca] hover:bg-sky-50 border border-slate-200 shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 animate-slide-up btn-tactile group"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Telegram Floating Quick Button with Shimmer & Floating Animation */}
      <div className="relative animate-float">
        <a
          href="https://t.me/shinggg168"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-gradient-to-r from-[#229ED9] to-[#0187ca] hover:from-[#1e8ec3] hover:to-[#0073ad] text-white px-4 py-2.5 rounded-full shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 relative border border-white/25 btn-tactile"
        >
          {/* Active Ping Signal */}
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping absolute -top-1 -right-1"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 border border-white"></span>
          
          <Send className="w-4 h-4 mr-2 group-hover:rotate-12 transition transform" />
          <span className="text-xs font-bold font-khmer flex items-center">
            <span>{lang === 'kh' ? 'សួរតាម Telegram' : 'Chat on Telegram'}</span>
            <span className="text-[10px] font-mono opacity-90 ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
              @shinggg168
            </span>
          </span>
        </a>
      </div>

      {/* Call Floating Quick Button */}
      <a
        href="tel:+85512345678"
        className="group flex items-center bg-slate-900/95 hover:bg-slate-900 text-cyan-300 hover:text-cyan-200 border border-slate-700/80 px-3.5 py-2 rounded-full shadow-lg hover:shadow-slate-800/40 transition-all duration-300 hover:scale-105 text-xs font-medium backdrop-blur-sm btn-tactile"
      >
        <Phone className="w-3.5 h-3.5 mr-1.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="font-mono font-semibold">012 345 678</span>
      </a>
    </aside>
  );
}
