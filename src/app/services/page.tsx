'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { itServices } from '@/lib/data';
import { createServiceTelegramLink } from '@/lib/telegram';
import { 
  Network, 
  Wifi, 
  ShieldAlert, 
  Server, 
  Fingerprint, 
  Printer, 
  Wrench, 
  CheckCircle2, 
  Send, 
  Clock, 
  Building, 
  ArrowRight 
} from 'lucide-react';

export default function ServicesPage() {
  const { lang, t, openSolutionModal } = useStore();

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'Network': return <Network className="w-6 h-6 text-[#0187ca]" />;
      case 'Wifi': return <Wifi className="w-6 h-6 text-sky-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-rose-600" />;
      case 'Server': return <Server className="w-6 h-6 text-indigo-600" />;
      case 'Fingerprint': return <Fingerprint className="w-6 h-6 text-purple-600" />;
      case 'Printer': return <Printer className="w-6 h-6 text-amber-600" />;
      default: return <Wrench className="w-6 h-6 text-[#0187ca]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 space-y-10 font-khmer">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="shimmer-badge inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-300 shadow-2xs">
          <Wrench className="w-3.5 h-3.5 text-emerald-600" />
          <span>ENTERPRISE IT INFRASTRUCTURE & SLA</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
          {lang === 'kh' ? 'សេវាកម្ម IT & ដំណោះស្រាយបណ្តាញ' : 'NV Technology IT Solutions & Services'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {lang === 'kh'
            ? 'NV Technology ផ្តល់សេវាកម្មរៀបចំប្រព័ន្ធ Network, Wi-Fi, Firewall, Server, ស្កេនមេដៃ និងកិច្ចសន្យាថែទាំកុំព្យូទ័រប្រចាំខែ ដោយក្រុមវិស្វករជំនាញ។'
            : 'End-to-end enterprise IT solutions including structured cabling, seamless Wi-Fi roaming, Fortinet security, Windows/Linux server setups, and outsourced IT SLA maintenance.'}
        </p>
      </div>

      {/* Services List (7 Core Services) */}
      <div className="space-y-6">
        {itServices.map((service, index) => {
          const telegramLink = createServiceTelegramLink(
            lang === 'kh' ? service.title_kh : service.title_en,
            lang
          );

          return (
            <div
              key={service.id}
              id={service.slug}
              className="group p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                {/* Left Header & Intro (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-3.5">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 shadow-2xs">
                      {getServiceIcon(service.icon)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#0187ca] font-bold tracking-wider uppercase block">
                        SERVICE #{index + 1}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {lang === 'kh' ? service.title_kh : service.title_en}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'kh' ? service.description_kh : service.description_en}
                  </p>

                  {/* SLA & Profile Tags */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2 text-slate-700">
                      <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-800">SLA: </strong>
                        <span>{lang === 'kh' ? service.sla_kh : service.sla_en}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2 text-slate-700">
                      <Building className="w-4 h-4 text-[#0187ca] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#0187ca]">Suitable For: </strong>
                        <span>{lang === 'kh' ? service.suitable_for_kh : service.suitable_for_en}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Deliverables & Booking CTAs (lg:col-span-7) */}
                <div className="lg:col-span-7 bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                      {lang === 'kh' ? 'អ្វីដែលយើងនឹងអនុវត្តជូន (Scope of Deliverables)' : 'Scope of Deliverables'}
                    </h3>

                    <div className="space-y-2">
                      {(lang === 'kh' ? service.deliverables_kh : service.deliverables_en).map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-2.5">
                    <button
                      onClick={() => openSolutionModal(service)}
                      className="btn-tactile px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-glow-emerald active:scale-95 flex items-center space-x-1.5"
                    >
                      <span>{lang === 'kh' ? 'ស្នើសុំការចុះពិនិត្យ (Site Survey) ឥតគិតថ្លៃ' : 'Book Free Site Survey'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-tactile px-4 py-2.5 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs transition-all flex items-center space-x-1.5 shadow-xs active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
