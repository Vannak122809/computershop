'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { prebuiltPCs } from '@/lib/data';
import { Product, CustomPCSelection } from '@/lib/types';
import { checkCompatibility } from '@/lib/compatibility';
import { createCustomPCTelegramLink } from '@/lib/telegram';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  HardDrive, 
  Monitor, 
  Box, 
  Fan, 
  Zap, 
  Check, 
  AlertTriangle, 
  XCircle, 
  Send, 
  RefreshCcw, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ShieldAlert,
  ShoppingCart
} from 'lucide-react';

const PART_STEPS: { type: keyof CustomPCSelection; label_kh: string; label_en: string; icon: any }[] = [
  { type: 'cpu', label_kh: '1. CPU (Processor)', label_en: '1. Processor (CPU)', icon: Cpu },
  { type: 'motherboard', label_kh: '2. Motherboard (មេប័រ)', label_en: '2. Motherboard', icon: Layers },
  { type: 'ram', label_kh: '3. RAM (រ៉េម)', label_en: '3. Memory (RAM)', icon: Zap },
  { type: 'storage_ssd', label_kh: '4. SSD (Storage)', label_en: '4. SSD Storage', icon: HardDrive },
  { type: 'gpu', label_kh: '5. GPU (Graphics Card)', label_en: '5. Graphics Card (GPU)', icon: Monitor },
  { type: 'case', label_kh: '6. Case (តួម៉ាស៊ីន)', label_en: '6. PC Case', icon: Box },
  { type: 'cooler', label_kh: '7. CPU Cooler (កង្ហារត្រជាក់)', label_en: '7. CPU Cooler', icon: Fan },
  { type: 'psu', label_kh: '8. Power Supply (PSU)', label_en: '8. Power Supply (PSU)', icon: Zap },
];

function CustomPCBuilderContent() {
  const { lang, t, products, customPC, setCustomPCPart, removeCustomPCPart, clearCustomPC, loadPrebuilt, openKhqrModal } = useStore();
  const searchParams = useSearchParams();

  const [activeStep, setActiveStep] = useState<keyof CustomPCSelection>('cpu');
  const [filterCompatibleOnly, setFilterCompatibleOnly] = useState(true);
  const [submittedToSales, setSubmittedToSales] = useState(false);
  const [salesForm, setSalesForm] = useState({ name: '', phone: '', telegram: '', notes: '' });

  useEffect(() => {
    const prebuiltId = searchParams.get('prebuilt');
    if (prebuiltId) {
      if (prebuiltId.includes('gaming')) {
        const cpu = products.find((p) => p.id === 'cpu-i5-14400f');
        const mb = products.find((p) => p.id === 'mb-msi-b760m-wifi');
        const ram = products.find((p) => p.id === 'ram-corsair-ddr5-32gb');
        const ssd = products.find((p) => p.id === 'ssd-kingston-nv2-1tb');
        const gpu = products.find((p) => p.id === 'gpu-asus-rtx-4060');
        const pcCase = products.find((p) => p.id === 'case-montech-air-100');
        const cooler = products.find((p) => p.id === 'cooler-thermalright-peerless');
        const psu = products.find((p) => p.id === 'psu-coolermaster-mwe-650w');
        loadPrebuilt({ cpu, motherboard: mb, ram, storage_ssd: ssd, gpu, case: pcCase, cooler, psu });
      } else if (prebuiltId.includes('creator')) {
        const cpu = products.find((p) => p.id === 'cpu-ryzen-7-7800x3d');
        const mb = products.find((p) => p.id === 'mb-rog-b650e' || p.id === 'mb-asus-tuf-b650-wifi');
        const ram = products.find((p) => p.id === 'ram-corsair-ddr5-32gb');
        const ssd = products.find((p) => p.id === 'ssd-samsung-990pro' || p.id === 'ssd-samsung-990-pro-1tb');
        const gpu = products.find((p) => p.id === 'gpu-gigabyte-rtx-4070-super');
        const pcCase = products.find((p) => p.id === 'case-nzxt-h5-flow' || p.id === 'case-corsair-4000d-airflow');
        const cooler = products.find((p) => p.id === 'cooler-deepcool-ls720' || p.id === 'cooler-thermalright-peerless');
        const psu = products.find((p) => p.id === 'psu-corsair-rm850e' || p.id === 'psu-corsair-rm750e-gold');
        loadPrebuilt({ cpu, motherboard: mb, ram, storage_ssd: ssd, gpu, case: pcCase, cooler, psu });
      }
    }
  }, [searchParams]);

  const report = useMemo(() => checkCompatibility(customPC), [customPC]);

  const currentParts = useMemo(() => {
    return products.filter((p) => p.part_type === activeStep);
  }, [products, activeStep]);

  const filteredParts = useMemo(() => {
    if (!filterCompatibleOnly) return currentParts;

    return currentParts.filter((part) => {
      if (activeStep === 'motherboard' && customPC.cpu?.part_spec?.socket) {
        return part.part_spec?.socket === customPC.cpu.part_spec.socket;
      }
      if (activeStep === 'cpu' && customPC.motherboard?.part_spec?.socket) {
        return part.part_spec?.socket === customPC.motherboard.part_spec.socket;
      }
      if (activeStep === 'ram' && customPC.motherboard?.part_spec?.ramType) {
        return part.part_spec?.ramType === customPC.motherboard.part_spec.ramType;
      }
      if (activeStep === 'case' && customPC.gpu?.part_spec?.gpuLengthMm) {
        return (part.part_spec?.caseMaxGpuMm || 999) >= customPC.gpu.part_spec.gpuLengthMm;
      }
      if (activeStep === 'cooler' && customPC.case?.part_spec?.caseMaxCoolerMm) {
        return (part.part_spec?.coolerHeightMm || 0) <= customPC.case.part_spec.caseMaxCoolerMm;
      }
      return true;
    });
  }, [currentParts, activeStep, customPC, filterCompatibleOnly]);

  const telegramExportLink = createCustomPCTelegramLink(
    customPC,
    report.totalPriceUsd,
    report.estimatedWattage,
    lang
  );

  const handleSelectPrebuilt = (tier: string) => {
    if (tier === 'office') {
      const cpu = products.find((p) => p.id === 'cpu-i5-14400f');
      const mb = products.find((p) => p.id === 'mb-msi-b760m-wifi');
      const ram = products.find((p) => p.id === 'ram-corsair-ddr5-32gb');
      const ssd = products.find((p) => p.id === 'ssd-kingston-nv2-1tb');
      const pcCase = products.find((p) => p.id === 'case-montech-air-100');
      const cooler = products.find((p) => p.id === 'cooler-thermalright-peerless');
      const psu = products.find((p) => p.id === 'psu-coolermaster-mwe-650w');
      loadPrebuilt({ cpu, motherboard: mb, ram, storage_ssd: ssd, case: pcCase, cooler, psu });
    } else if (tier === 'gaming') {
      const cpu = products.find((p) => p.id === 'cpu-i5-14400f');
      const mb = products.find((p) => p.id === 'mb-msi-b760m-wifi');
      const ram = products.find((p) => p.id === 'ram-corsair-ddr5-32gb');
      const ssd = products.find((p) => p.id === 'ssd-kingston-nv2-1tb');
      const gpu = products.find((p) => p.id === 'gpu-asus-rtx-4060');
      const pcCase = products.find((p) => p.id === 'case-montech-air-100');
      const cooler = products.find((p) => p.id === 'cooler-thermalright-peerless');
      const psu = products.find((p) => p.id === 'psu-coolermaster-mwe-650w');
      loadPrebuilt({ cpu, motherboard: mb, ram, storage_ssd: ssd, gpu, case: pcCase, cooler, psu });
    } else if (tier === 'creator') {
      const cpu = products.find((p) => p.id === 'cpu-ryzen-7-7800x3d');
      const mb = products.find((p) => p.id === 'mb-rog-b650e' || p.id === 'mb-asus-tuf-b650-wifi');
      const ram = products.find((p) => p.id === 'ram-corsair-ddr5-32gb');
      const ssd = products.find((p) => p.id === 'ssd-samsung-990pro' || p.id === 'ssd-samsung-990-pro-1tb');
      const gpu = products.find((p) => p.id === 'gpu-gigabyte-rtx-4070-super');
      const pcCase = products.find((p) => p.id === 'case-nzxt-h5-flow' || p.id === 'case-corsair-4000d-airflow');
      const cooler = products.find((p) => p.id === 'cooler-deepcool-ls720' || p.id === 'cooler-thermalright-peerless');
      const psu = products.find((p) => p.id === 'psu-corsair-rm850e' || p.id === 'psu-corsair-rm750e-gold');
      loadPrebuilt({ cpu, motherboard: mb, ram, storage_ssd: ssd, gpu, case: pcCase, cooler, psu });
    }
  };

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedToSales(true);
    try {
      const existing = localStorage.getItem('nv_custom_pc_requests');
      const list = existing ? JSON.parse(existing) : [];
      const newReq = {
        id: `PC-${Date.now().toString().slice(-3)}`,
        customer: salesForm.name,
        phone: salesForm.phone,
        telegram: salesForm.telegram || '@customer',
        build: [
          customPC.cpu?.name_en,
          customPC.gpu?.name_en,
          customPC.ram?.name_en,
        ].filter(Boolean).join(' + ') || 'Custom PC Build',
        total: report.totalPriceUsd,
        wattage: report.estimatedWattage,
        status: 'pending',
      };
      list.unshift(newReq);
      localStorage.setItem('nv_custom_pc_requests', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('nv_pc_requests_updated'));
    } catch (err) {
      console.error('Failed to save pc inquiry:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-khmer">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-sky-50 text-[#0187ca] text-xs font-bold border border-sky-200 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NV CUSTOM PC BUILDER v2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t.custom_pc_title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.custom_pc_desc}
          </p>
        </div>

        {/* Quick Prebuilts Loader */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
          <span className="text-slate-500 pl-2 font-medium">
            {lang === 'kh' ? 'កញ្ចប់រៀបចំស្រេច៖' : 'Templates:'}
          </span>
          <button
            onClick={() => handleSelectPrebuilt('office')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-sky-50 hover:text-[#0187ca] text-slate-700 font-semibold transition border border-slate-200"
          >
            💼 Office ($389)
          </button>
          <button
            onClick={() => handleSelectPrebuilt('gaming')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-sky-50 hover:text-[#0187ca] text-slate-700 font-semibold transition border border-slate-200"
          >
            🎮 Gaming ($899)
          </button>
          <button
            onClick={() => handleSelectPrebuilt('creator')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-sky-50 hover:text-[#0187ca] text-slate-700 font-semibold transition border border-slate-200"
          >
            🎨 Creator ($1,650)
          </button>
          <button
            onClick={clearCustomPC}
            title="Reset"
            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 8 Steps Selector List (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>{lang === 'kh' ? 'គ្រឿងបន្លាស់ (៨ ជំហាន)' : 'Components (8 Steps)'}</span>
            <span className="text-[#0187ca] font-mono font-bold">{report.partCount} / 8 Selected</span>
          </div>

          <div className="space-y-2">
            {PART_STEPS.map((step) => {
              const selectedItem = customPC[step.type];
              const isActive = activeStep === step.type;
              const Icon = step.icon;

              return (
                <div
                  key={step.type}
                  onClick={() => setActiveStep(step.type)}
                  className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between btn-tactile ${
                    isActive
                      ? 'bg-sky-50/80 border-[#0187ca] shadow-md shadow-sky-500/10 ring-2 ring-[#0187ca]/20'
                      : selectedItem
                      ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        selectedItem
                          ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[11px] text-slate-500 font-medium flex items-center space-x-1.5">
                        <span>{lang === 'kh' ? step.label_kh : step.label_en}</span>
                        {selectedItem && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        )}
                      </div>

                      {selectedItem ? (
                        <div className="text-xs font-bold text-slate-900 truncate font-khmer mt-0.5">
                          {lang === 'kh' ? selectedItem.name_kh : selectedItem.name_en}
                        </div>
                      ) : (
                        <div className="text-[11px] text-[#0187ca] flex items-center mt-0.5 font-medium">
                          <Plus className="w-3 h-3 mr-0.5" />
                          <span>{t.select_part}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    {selectedItem ? (
                      <>
                        <span className="text-xs font-black text-[#0187ca]">
                          ${selectedItem.sale_price_usd ?? selectedItem.price_usd}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCustomPCPart(step.type);
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition btn-tactile"
                          title="Remove part"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">--</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Step Part Picker (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Step Selection Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'kh'
                    ? PART_STEPS.find((s) => s.type === activeStep)?.label_kh
                    : PART_STEPS.find((s) => s.type === activeStep)?.label_en}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {lang === 'kh' ? 'ជ្រើសរើសគ្រឿងបន្លាស់ដែលត្រូវគ្នា' : 'Choose a component matching your build'}
                </p>
              </div>

              {/* Filter compatible toggle */}
              <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterCompatibleOnly}
                  onChange={(e) => setFilterCompatibleOnly(e.target.checked)}
                  className="rounded border-slate-300 text-[#0187ca] focus:ring-[#0187ca]"
                />
                <span className="font-semibold text-emerald-700">
                  {lang === 'kh' ? 'បង្ហាញតែគ្រឿងដែលត្រូវគ្នា (Compatible)' : 'Filter Compatible Only'}
                </span>
              </label>
            </div>

            {/* List of Available Components */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredParts.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-slate-200">
                  <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto mb-1.5" />
                  <p>
                    {lang === 'kh'
                      ? 'រកមិនឃើញគ្រឿងបន្លាស់ត្រូវគ្នានៅក្នុងស្តុកទេ សូមដោះធីក Filter Compatible'
                      : 'No compatible parts found with currently selected hardware.'}
                  </p>
                </div>
              ) : (
                filteredParts.map((part) => {
                  const isSelected = customPC[activeStep]?.id === part.id;

                  return (
                    <div
                      key={part.id}
                      className={`p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-sky-50 border-[#0187ca]'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <img
                          src={part.image}
                          alt={part.name_en}
                          className="w-12 h-12 rounded-lg object-contain bg-slate-50 p-1 flex-shrink-0 border border-slate-100"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] font-mono font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                              {part.brand}
                            </span>
                            {part.part_spec?.socket && (
                              <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                {part.part_spec.socket}
                              </span>
                            )}
                            {part.part_spec?.ramType && (
                              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                {part.part_spec.ramType}
                              </span>
                            )}
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 truncate mt-1">
                            {lang === 'kh' ? part.name_kh : part.name_en}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {lang === 'kh' ? part.short_desc_kh : part.short_desc_en}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="text-sm font-black text-[#0187ca]">
                            ${part.sale_price_usd ?? part.price_usd}
                          </div>
                          {part.part_spec?.tdpWatts ? (
                            <div className="text-[10px] text-slate-400 font-mono">
                              {part.part_spec.tdpWatts}W TDP
                            </div>
                          ) : null}
                        </div>

                        {isSelected ? (
                          <button
                            onClick={() => removeCustomPCPart(activeStep)}
                            className="px-3 py-1.5 rounded-lg bg-[#0187ca] text-white font-bold text-xs flex items-center space-x-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === 'kh' ? 'បានជ្រើស' : 'Selected'}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setCustomPCPart(activeStep, part);
                              const nextStep = PART_STEPS.find((s) => !customPC[s.type] && s.type !== activeStep);
                              if (nextStep) setActiveStep(nextStep.type);
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0187ca] hover:text-white text-slate-800 font-semibold text-xs transition border border-slate-200"
                          >
                            {t.select_part}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Real-time Diagnostics & Compatibility Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                {report.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {report.isValid
                    ? lang === 'kh' ? 'ភាពត្រូវគ្នានៃគ្រឿងបន្លាស់៖ ត្រឹមត្រូវ ១០០%' : 'Hardware Compatibility: 100% Valid'
                    : lang === 'kh' ? 'រកឃើញបញ្ហាមិនត្រូវគ្នា!' : 'Hardware Incompatibility Detected!'}
                </h4>
              </div>

              <div className="text-xs text-slate-500 font-mono">
                ⚡ {report.estimatedWattage}W / Rec: <strong className="text-amber-700">{report.recommendedPsuWatts}W</strong>
              </div>
            </div>

            {/* Live Animated Wattage Meter Bar */}
            <div className="space-y-1.5 py-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>{lang === 'kh' ? 'កម្រិតប្រើប្រាស់ថាមពល (Power Utilization)' : 'System Power Load'}</span>
                <span className="font-mono font-bold text-slate-800">
                  {report.estimatedWattage}W / {report.recommendedPsuWatts}W ({Math.min(100, Math.round((report.estimatedWattage / (report.recommendedPsuWatts || 500)) * 100))}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200 shadow-inner">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    report.estimatedWattage > (customPC.psu?.part_spec?.psuRecommendedWatts || customPC.psu?.part_spec?.tdpWatts || 9999)
                      ? 'bg-rose-500'
                      : report.estimatedWattage > 450
                      ? 'bg-amber-500'
                      : 'bg-[#0187ca]'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(8, Math.round((report.estimatedWattage / (report.recommendedPsuWatts || 500)) * 100)))}%` }}
                ></div>
              </div>
            </div>

            {/* Error alerts */}
            {report.errorsKh.length > 0 && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1 text-xs text-rose-800 animate-slide-up">
                {(lang === 'kh' ? report.errorsKh : report.errorsEn).map((err, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Warning alerts */}
            {report.warningsKh.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1 text-xs text-amber-800 animate-slide-up">
                {(lang === 'kh' ? report.warningsKh : report.warningsEn).map((warn, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price & CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-500 block">{t.estimated_total}</span>
                <span className="text-2xl font-black text-[#0187ca]">${report.totalPriceUsd.toLocaleString()}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    if (report.partCount > 0) {
                      openKhqrModal({
                        order_number: `NV-PC-${Date.now().toString().slice(-4)}`,
                        total_usd: report.totalPriceUsd,
                        customer_name: salesForm.name || 'Custom PC Client',
                      });
                    }
                  }}
                  disabled={report.partCount === 0}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow-glow-primary btn-tactile"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{lang === 'kh' ? 'ទិញតាម KHQR' : 'Buy with KHQR'}</span>
                </button>

                <a
                  href={telegramExportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow-md shadow-sky-500/20 btn-tactile"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.export_to_telegram}</span>
                </a>

                <button
                  onClick={() => setSubmittedToSales(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.submit_build_request}</span>
                </button>
              </div>
            </div>

            {/* Included Free Builder Services */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-600 pt-2 border-t border-slate-100 font-medium">
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Free Assembly</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Win 11 Pro Setup</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>24h Thermal Test</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>2-3 Yr Warranty</span>
              </div>
            </div>
          </div>

          {/* Quick Submit Form */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-[#0187ca]" />
              <span>{lang === 'kh' ? 'ស្នើសុំការបញ្ជាក់ស្តុក & តម្លៃផ្លូវការពីជាងជំនាញ' : 'Request Free Stock & Price Confirmation from Technician'}</span>
            </h4>

            {submittedToSales ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                <div className="font-bold flex items-center space-x-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'kh' ? 'សំណើត្រូវបានកត់ត្រាជោគជ័យ!' : 'Build Request Received!'}</span>
                </div>
                <p className="mt-1">
                  {lang === 'kh'
                    ? `ជាងជំនាញផ្នែក Custom PC របស់ NV Technology នឹងទាក់ទងមក ${salesForm.phone} ក្នុងរយៈពេល 15 នាទី។`
                    : `Our Custom PC technician will contact you at ${salesForm.phone} within 15 minutes.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSalesSubmit} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder={lang === 'kh' ? 'ឈ្មោះរបស់អ្នក *' : 'Your Name *'}
                    value={salesForm.name}
                    onChange={(e) => setSalesForm({ ...salesForm, name: e.target.value })}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={lang === 'kh' ? 'លេខទូរស័ព្ទ *' : 'Phone Number *'}
                    value={salesForm.phone}
                    onChange={(e) => setSalesForm({ ...salesForm, phone: e.target.value })}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca]"
                  />
                  <input
                    type="text"
                    placeholder="Telegram (@username)"
                    value={salesForm.telegram}
                    onChange={(e) => setSalesForm({ ...salesForm, telegram: e.target.value })}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca]"
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    {lang === 'kh' ? 'ដំឡើង និង Test ម៉ាស៊ីនដោយឥតគិតថ្លៃ ១០០%' : 'Free assembly & stress testing included'}
                  </span>
                  <button
                    type="submit"
                    disabled={report.partCount === 0}
                    className="px-4 py-1.5 rounded-lg bg-[#0187ca] hover:bg-[#0073ad] disabled:opacity-50 text-white font-bold text-xs transition"
                  >
                    {lang === 'kh' ? 'ផ្ញើសំណើ' : 'Submit Build'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomPCPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">Loading Custom PC Builder...</div>}>
      <CustomPCBuilderContent />
    </Suspense>
  );
}
