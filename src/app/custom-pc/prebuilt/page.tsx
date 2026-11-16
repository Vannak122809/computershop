'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { prebuiltPCs } from '@/lib/data';
import { Sparkles, Check, Send, ShoppingCart, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function PrebuiltPCPage() {
  const { lang, t, openKhqrModal } = useStore();

  const handleOrderPrebuilt = (pc: typeof prebuiltPCs[0]) => {
    openKhqrModal({
      order_number: `NV-PC-${Date.now().toString().slice(-4)}`,
      total_usd: pc.price_usd,
      customer_name: 'Customer',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10 font-khmer">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0187ca] text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FACTORY TESTED & BENCHMARK CERTIFIED</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
          {lang === 'kh' ? 'កុំព្យូទ័ររៀបចំស្រេច (NV Pre-built PCs)' : 'NV Pre-Configured PC Packages'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {lang === 'kh'
            ? 'រៀបចំ និងតេស្ត Benchmark រួចជាស្រេចដោយវិស្វករ NV Technology ជាមួយគ្រឿងបន្លាស់សុទ្ធ ១០០% ធានា ២-៣ ឆ្នាំ និងដំឡើង Windows 11 Pro ជូនដោយឥតគិតថ្លៃ។'
            : 'Pre-assembled, stress-tested, and optimized by NV Technology technicians with genuine parts, 2-3 year warranties, and free Windows 11 Pro setup.'}
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {prebuiltPCs.map((pc) => (
          <div
            key={pc.id}
            className="group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#0187ca] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-2xs"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 text-[#0187ca] border border-sky-200">
                  {pc.tier} Tier Build
                </span>
                <span className="text-3xl font-black text-[#0187ca] font-mono">${pc.price_usd}</span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 group-hover:text-[#0187ca] transition-colors">
                  {lang === 'kh' ? pc.name_kh : pc.name_en}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'kh' ? pc.summary_kh : pc.summary_en}
                </p>
              </div>

              {/* Spec Checklist */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex items-center justify-between text-slate-700 pt-1 first:pt-0">
                  <span className="text-slate-500 font-medium">Processor (CPU):</span>
                  <span className="font-bold text-slate-900 font-mono text-right">{pc.specs.cpu}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 pt-1.5">
                  <span className="text-slate-500 font-medium">Motherboard:</span>
                  <span className="font-semibold text-slate-900 font-mono text-right">{pc.specs.motherboard}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 pt-1.5">
                  <span className="text-slate-500 font-medium">Memory (RAM):</span>
                  <span className="font-bold text-slate-900 font-mono text-right">{pc.specs.ram}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 pt-1.5">
                  <span className="text-slate-500 font-medium">Storage (SSD):</span>
                  <span className="font-bold text-slate-900 font-mono text-right">{pc.specs.storage}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 pt-1.5">
                  <span className="text-slate-500 font-medium">Graphics Card:</span>
                  <span className="font-bold text-[#0187ca] font-mono text-right">{pc.specs.gpu}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 pt-1.5">
                  <span className="text-slate-500 font-medium">Power Supply (PSU):</span>
                  <span className="font-semibold text-slate-900 font-mono text-right">{pc.specs.psu}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">{lang === 'kh' ? 'សាកសមបំផុតសម្រាប់៖ ' : 'Ideal for: '}</strong>
                  <span>{lang === 'kh' ? pc.recommended_for_kh : pc.recommended_for_en}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={`/custom-pc?prebuilt=${pc.id}`}
                className="btn-tactile py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs text-center transition-all flex items-center justify-center space-x-1.5 border border-slate-200"
              >
                <span>{lang === 'kh' ? 'កែសម្រួលគ្រឿង (Customize)' : 'Customize in Builder'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => handleOrderPrebuilt(pc)}
                className="btn-tactile py-2.5 px-4 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] active:scale-95 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-sky-500/20"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{lang === 'kh' ? 'កុម្ម៉ង់ទិញភ្លាមៗ (KHQR)' : 'Order Now with KHQR'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
