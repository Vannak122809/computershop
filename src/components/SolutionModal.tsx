'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { createServiceTelegramLink } from '@/lib/telegram';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Wrench, 
  Building, 
  Phone, 
  User, 
  MapPin, 
  Clock, 
  Check, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { itServices } from '@/lib/data';

export default function SolutionModal() {
  const { solutionModal, closeSolutionModal, lang } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isOpen, service } = solutionModal;

  const [formData, setFormData] = useState({
    serviceId: itServices[0]?.id || 'srv-network',
    customServiceTitle: '',
    name: '',
    company: '',
    phone: '',
    address: '',
    deviceCount: '10-30',
    customDeviceCount: '',
    urgency: 'standard',
    notes: '',
  });

  // Re-sync form state whenever the modal opens or the active service prop changes
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setFormData((prev) => ({
        ...prev,
        serviceId: service?.id || prev.serviceId || itServices[0]?.id || 'other',
        customServiceTitle: '',
        customDeviceCount: '',
      }));
    }
  }, [isOpen, service]);

  if (!isOpen) return null;

  // Resolve active service dynamically from user selection first, with graceful fallbacks
  const matchedService = itServices.find((s) => s.id === formData.serviceId);
  const isOtherService = formData.serviceId === 'other';

  const activeServiceTitle = isOtherService
    ? (formData.customServiceTitle.trim() || (lang === 'kh' ? 'សេវាកម្ម IT ផ្សេងទៀត (Other Custom Solution)' : 'Other Custom IT Solution'))
    : (matchedService
        ? (lang === 'kh' ? matchedService.title_kh : matchedService.title_en)
        : (service ? (lang === 'kh' ? service.title_kh : service.title_en) : 'IT Solution & Survey'));

  const effectiveDeviceCount = formData.deviceCount === 'other'
    ? (formData.customDeviceCount.trim() || (lang === 'kh' ? 'ផ្សេងៗ / មិនទាន់ដឹង' : 'Other / Custom scale'))
    : formData.deviceCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const deviceOptions = [
    { value: '1-10', label_kh: '1 - 10 គ្រឿង', label_en: '1 - 10 Devices', sub_kh: 'ការិយាល័យតូច', sub_en: 'Small' },
    { value: '10-30', label_kh: '10 - 30 គ្រឿង', label_en: '10 - 30 Devices', sub_kh: 'មធ្យម', sub_en: 'Mid-size' },
    { value: '30-100', label_kh: '30 - 100 គ្រឿង', label_en: '30 - 100 Devices', sub_kh: 'សហគ្រាស', sub_en: 'Enterprise' },
    { value: '100+', label_kh: '100+ គ្រឿង', label_en: '100+ Devices', sub_kh: 'អាគារ / សាខា', sub_en: 'Campus' },
    { value: 'other', label_kh: 'ផ្សេងៗ (Other)', label_en: 'Other / Custom', sub_kh: 'បញ្ជាក់តាមចិត្ត', sub_en: 'Custom' },
  ];

  const urgencyOptions = [
    { value: 'standard', label_kh: 'ធម្មតា (១-២ ថ្ងៃ)', label_en: 'Standard (1-2 Days)', color: 'border-slate-200 text-slate-700' },
    { value: 'urgent', label_kh: 'បន្ទាន់ (ក្នុង ៤ ម៉ោង)', label_en: 'Urgent (Within 4 hrs)', color: 'border-rose-300 text-rose-700 bg-rose-50/50' },
    { value: 'planned', label_kh: 'គម្រោងថ្មី / ខែក្រោយ', label_en: 'Planned / Future', color: 'border-indigo-200 text-indigo-700 bg-indigo-50/50' },
    { value: 'consult', label_kh: 'ប្រឹក្សាសិន (Consult)', label_en: 'Consultation First', color: 'border-emerald-200 text-emerald-700 bg-emerald-50/50' },
  ];

  const customTelegramLink = `${createServiceTelegramLink(
    activeServiceTitle,
    lang
  )}%0A%F0%9F%93%8C%20Client:%20${encodeURIComponent(formData.name || 'Client')}%0A%F0%9F%8F%A2%20Company:%20${encodeURIComponent(formData.company || 'N/A')}%0A%F0%9F%93%9E%20Phone:%20${encodeURIComponent(formData.phone || 'N/A')}%0A%F0%9F%93%8D%20Location:%20${encodeURIComponent(formData.address || 'Phnom Penh')}%0A%F0%9F%92%BB%20Devices:%20${encodeURIComponent(effectiveDeviceCount)}%0A%E2%8F%B0%20Urgency:%20${encodeURIComponent(formData.urgency)}${formData.notes ? `%0A%F0%9F%93%9D%20Notes:%20${encodeURIComponent(formData.notes)}` : ''}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm modal-backdrop-anim overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSolutionModal();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 text-slate-900 font-khmer modal-content-anim my-auto">
        
        {/* Top Decorative Header Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0187ca] via-cyan-400 to-sky-500"></div>

        {/* Close Button with Spin Transition */}
        <button
          onClick={closeSolutionModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition duration-200 hover:rotate-90 hover:scale-105 active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-5 animate-slide-up">
            <div className="relative w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner border border-emerald-200/60 animate-pop">
              <CheckCircle2 className="w-9 h-9" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {lang === 'kh' ? 'កត់ត្រាបានជោគជ័យ' : 'REQUEST CONFIRMED'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                {lang === 'kh' ? 'សំណើសេវាកម្មត្រូវបានកត់ត្រា!' : 'Solution Request Logged!'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mt-1.5">
                {lang === 'kh'
                  ? `អរគុណ ${formData.name || 'លោកអ្នក'}! វិស្វករប្រព័ន្ធ IT របស់ NV Technology នឹងទាក់ទងទៅលេខ ${formData.phone || 'ទូរស័ព្ទរបស់អ្នក'} ដើម្បីរៀបចំការចុះពិនិត្យទីតាំងជាក់ស្តែង (Site Survey) ដោយឥតគិតថ្លៃ។`
                  : `Thank you ${formData.name || 'Client'}! Our IT systems engineer will reach out to ${formData.phone || 'your number'} to coordinate a free on-site survey.`}
              </p>
            </div>

            {/* Request Summary Capsule */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">{lang === 'kh' ? 'សេវាកម្ម៖' : 'Service:'}</span>
                <span className="font-bold text-slate-900 truncate max-w-[220px]">
                  {activeServiceTitle}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">{lang === 'kh' ? 'ឧបករណ៍៖' : 'Devices:'}</span>
                <span className="font-semibold text-slate-800">{effectiveDeviceCount}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">{lang === 'kh' ? 'កម្រិតបន្ទាន់៖' : 'Urgency:'}</span>
                <span className="font-bold uppercase text-[#0187ca]">{formData.urgency}</span>
              </div>
              {formData.address && (
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-medium">{lang === 'kh' ? 'ទីតាំង៖' : 'Location:'}</span>
                  <span className="font-medium text-slate-800 truncate max-w-[220px]">{formData.address}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
              <a
                href={customTelegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs flex items-center justify-center transition shadow-md shadow-sky-500/20 btn-tactile group"
              >
                <Send className="w-4 h-4 mr-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                {lang === 'kh' ? 'ទាក់ទងវិស្វករតាម Telegram' : 'Chat with Engineer'}
              </a>
              <button
                onClick={closeSolutionModal}
                className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition btn-tactile"
              >
                {lang === 'kh' ? 'បិទផ្ទាំង' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-7 max-h-[85vh] overflow-y-auto">
            {/* Header Banner */}
            <div className="flex items-start space-x-3.5 mb-5 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-[#0187ca] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-500/20">
                <Wrench className="w-5 h-5 animate-pulse-glow" />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {lang === 'kh' ? 'ស្នើសុំដំណោះស្រាយ IT & Site Survey' : 'Request IT Solution & Site Survey'}
                  </h3>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                    FREE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                  {lang === 'kh' 
                    ? 'វិស្វករជំនាញចុះវាស់វែង គូរប្លង់ និងប្រឹក្សាបច្ចេកទេសឥតគិតថ្លៃ' 
                    : 'Professional deployment, RF Heatmap & corporate infrastructure survey'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Option 1: Service Required */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0187ca]" />
                  <span>{lang === 'kh' ? 'ជ្រើសរើសសេវាកម្មដែលអ្នកត្រូវការ' : 'Service Required'}</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition appearance-none cursor-pointer"
                  >
                    {itServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {lang === 'kh' ? s.title_kh : s.title_en}
                      </option>
                    ))}
                    <option value="other">
                      🛠️ {lang === 'kh' ? 'សេវាកម្ម ឬតម្រូវការផ្សេងទៀត (Other Custom Inquiries)' : 'Other Custom IT Inquiries & Troubleshooting'}
                    </option>
                  </select>
                  <span className="absolute right-3.5 top-3 pointer-events-none text-slate-400 text-xs">▼</span>
                </div>

                {/* Custom Service Input when "Other" is chosen */}
                {isOtherService && (
                  <div className="mt-2 animate-slide-down">
                    <input
                      type="text"
                      required
                      placeholder={lang === 'kh' ? 'សូមបញ្ជាក់សេវាកម្ម ឬបញ្ហា IT ដែលលោកអ្នកត្រូវការ...' : 'Specify your custom IT requirement or issue...'}
                      value={formData.customServiceTitle}
                      onChange={(e) => setFormData({ ...formData, customServiceTitle: e.target.value })}
                      className="w-full bg-sky-50/50 border border-sky-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none transition shadow-2xs"
                    />
                  </div>
                )}
              </div>

              {/* Contact Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'kh' ? 'ឈ្មោះអ្នកទាក់ទង *' : 'Contact Person *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="ឧ. ចាន់ សុភាព"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition pr-9"
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'kh' ? 'លេខទូរស័ព្ទ *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="012 888 999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition pr-9"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Organization & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'kh' ? 'ឈ្មោះស្ថាប័ន / ក្រុមហ៊ុន' : 'Organization Name'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ឧ. ធនាគារ ឬ ក្រុមហ៊ុន..."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition pr-9"
                    />
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'kh' ? 'ទីតាំងអាសយដ្ឋានក្រុមហ៊ុន' : 'Location / District'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={lang === 'kh' ? 'ឧ. ខណ្ឌទួលគោក ភ្នំពេញ' : 'e.g., Toul Kork, Phnom Penh'}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition pr-9"
                    />
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Option 2: Device Count Interactive Chips + Other */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'kh' ? 'ចំនួនឧបករណ៍ប៉ាន់ស្មាន' : 'Estimated Device Count'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {deviceOptions.map((opt) => {
                    const isSelected = formData.deviceCount === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setFormData({ ...formData, deviceCount: opt.value })}
                        className={`p-2 rounded-xl border text-left transition-all duration-150 btn-tactile ${
                          isSelected
                            ? 'border-[#0187ca] bg-sky-50/70 text-[#0187ca] ring-2 ring-[#0187ca]/20 font-bold shadow-2xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-[11px] font-bold flex items-center justify-between">
                          <span className="truncate">{lang === 'kh' ? opt.label_kh : opt.label_en}</span>
                          {isSelected && <Check className="w-3 h-3 text-[#0187ca] flex-shrink-0" />}
                        </div>
                        <span className="text-[9px] text-slate-400 font-normal block mt-0.5 truncate">
                          {lang === 'kh' ? opt.sub_kh : opt.sub_en}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Device Count input when "other" is selected */}
                {formData.deviceCount === 'other' && (
                  <div className="mt-2 animate-slide-down">
                    <input
                      type="text"
                      placeholder={lang === 'kh' ? 'ឧ. ៥០០ គ្រឿង ឬ មិនទាន់ដឹងច្បាស់...' : 'e.g., 500+ workstations, or to be surveyed...'}
                      value={formData.customDeviceCount}
                      onChange={(e) => setFormData({ ...formData, customDeviceCount: e.target.value })}
                      className="w-full bg-sky-50/50 border border-sky-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none transition shadow-2xs"
                    />
                  </div>
                )}
              </div>

              {/* Option 3: Urgency Level Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{lang === 'kh' ? 'កម្រិតបន្ទាន់នៃការចុះពិនិត្យ' : 'Project Urgency'}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {urgencyOptions.map((u) => {
                    const isSelected = formData.urgency === u.value;
                    return (
                      <button
                        type="button"
                        key={u.value}
                        onClick={() => setFormData({ ...formData, urgency: u.value })}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-all duration-150 text-[11px] btn-tactile ${
                          isSelected
                            ? 'border-[#0187ca] bg-[#0187ca] text-white font-bold shadow-sm shadow-sky-500/25'
                            : `${u.color} bg-white hover:bg-slate-50 font-medium`
                        }`}
                      >
                        {lang === 'kh' ? u.label_kh : u.label_en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scope Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {lang === 'kh' ? 'ព័ត៌មានលម្អិតអំពីតម្រូវការ ឬបញ្ហា' : 'Project Scope / Current Pain Points'}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'kh' ? 'ឧ. Wi-Fi ដើរទាក់ ត្រូវការដំឡើង Access Point បន្ថែម 5 គ្រាប់...' : 'e.g., Unstable Wi-Fi, need 5 APs and managed switch...'}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none transition"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs transition shadow-md shadow-sky-500/25 flex items-center justify-center space-x-2 btn-tactile disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>{lang === 'kh' ? 'ស្នើសុំការចុះពិនិត្យ (Request Survey)' : 'Request Site Survey'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                <a
                  href={customTelegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-[#0187ca] font-semibold text-xs flex items-center justify-center transition btn-tactile"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Telegram
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
