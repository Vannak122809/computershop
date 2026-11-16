'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { createProductTelegramLink } from '@/lib/telegram';
import { 
  X, 
  CheckCircle2, 
  Send, 
  FileText, 
  Building, 
  Phone, 
  User, 
  Plus, 
  Minus, 
  Truck, 
  Briefcase, 
  Shield, 
  ArrowRight,
  Check
} from 'lucide-react';

export default function QuoteModal() {
  const { quoteModal, closeQuoteModal, lang } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    telegram: '',
    quantity: 1,
    clientType: 'corporate',
    deliveryType: 'standard',
    notes: '',
  });

  const { isOpen, product } = quoteModal;

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setFormData((prev) => ({
        ...prev,
        quantity: 1,
      }));
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const existing = localStorage.getItem('nv_quotes');
      const list = existing ? JSON.parse(existing) : [];
      const newQuote = {
        id: `NVQ-${Date.now().toString().slice(-3)}`,
        company: formData.company || formData.name,
        contact: formData.name,
        phone: formData.phone,
        items: `${formData.quantity}x ${product ? (lang === 'kh' ? product.name_kh : product.name_en) : 'General Hardware Inquiry'}`,
        status: 'pending',
        total: (product?.price_usd || 180) * formData.quantity,
      };
      list.unshift(newQuote);
      localStorage.setItem('nv_quotes', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('nv_quotes_updated'));
    } catch (err) {}
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const clientTypes = [
    { value: 'corporate', label_kh: 'ក្រុមហ៊ុន / Office', label_en: 'Corporate / Office' },
    { value: 'reseller', label_kh: 'ដេប៉ូ / លក់បន្ត', label_en: 'Reseller / Wholesale' },
    { value: 'ngo_school', label_kh: 'សាលារៀន / NGO', label_en: 'School / NGO' },
    { value: 'personal', label_kh: 'បុគ្គល / Freelance', label_en: 'Personal' },
    { value: 'other', label_kh: 'ផ្សេងៗ (Other)', label_en: 'Other / Custom' },
  ];

  const deliveryOptions = [
    { value: 'urgent', label_kh: 'បន្ទាន់ (ភ្នំពេញ ១-២ ម៉ោង)', label_en: 'Express PP (1-2h)' },
    { value: 'standard', label_kh: 'ស្តង់ដារ (២៤ ម៉ោង)', label_en: 'Standard (24h)' },
    { value: 'province', label_kh: 'ផ្ញើតាមខេត្ត (ឡានឈ្នួល)', label_en: 'Provincial Shipping' },
    { value: 'pickup', label_kh: 'មកយកផ្ទាល់ (Self Pickup)', label_en: 'Self Pickup' },
  ];

  const quantityPresets = [1, 5, 10, 20, 50];

  const baseTelegram = product ? createProductTelegramLink(product, lang) : 'https://t.me/shinggg168';
  const customTelegramLink = `${baseTelegram}%0A%F0%9F%93%8B%20RFQ%20Qty:%20${formData.quantity}%20units%0A%F0%9F%8F%A2%20Org:%20${encodeURIComponent(formData.company || 'N/A')}%0A%F0%9F%91%A4%20Contact:%20${encodeURIComponent(formData.name || 'Client')}%0A%F0%9F%93%9E%20Phone:%20${encodeURIComponent(formData.phone || 'N/A')}%0A%F0%9F%9A%9A%20Delivery:%20${encodeURIComponent(formData.deliveryType)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm modal-backdrop-anim overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeQuoteModal();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 text-slate-900 font-khmer modal-content-anim my-auto">
        
        {/* Top Amber Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600"></div>

        {/* Close Button with Spin Animation */}
        <button
          onClick={closeQuoteModal}
          aria-label="Close quote modal"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition duration-200 hover:rotate-90 hover:scale-105 active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-5 animate-slide-up">
            <div className="relative w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center shadow-inner border border-amber-200/60 animate-pop">
              <CheckCircle2 className="w-9 h-9" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {lang === 'kh' ? 'សំណើសម្រង់តម្លៃផ្លូវការ' : 'RFQ DISPATCHED'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                {lang === 'kh' ? 'សំណើសុំសម្រង់តម្លៃត្រូវបានកត់ត្រា!' : 'Quotation Request Sent!'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mt-1.5">
                {lang === 'kh'
                  ? `អរគុណ ${formData.name || 'លោកអ្នក'}! ក្រុមការងារផ្នែកលក់ B2B របស់ NV Technology នឹងចេញឯកសារសម្រង់តម្លៃជាផ្លូវការ (PDF Quotation) ផ្ញើជូនទៅលេខ ${formData.phone || 'ទូរស័ព្ទរបស់អ្នក'} ក្នុងរយៈពេល 2 ម៉ោង។`
                  : `Thank you ${formData.name || 'Client'}! NV Technology B2B team is generating your official PDF quotation and will deliver it to ${formData.phone || 'your phone'} within 2 hours.`}
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
              {product && (
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-medium">{lang === 'kh' ? 'ទំនិញ៖' : 'Item:'}</span>
                  <span className="font-bold text-slate-900 truncate max-w-[210px]">
                    {lang === 'kh' ? product.name_kh : product.name_en}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">{lang === 'kh' ? 'បរិមាណស្នើសុំ៖' : 'Quantity:'}</span>
                <span className="font-black text-amber-600">{formData.quantity} {lang === 'kh' ? 'គ្រឿង' : 'units'}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">{lang === 'kh' ? 'ស្ថាប័ន៖' : 'Company:'}</span>
                <span className="font-semibold text-slate-800">{formData.company || 'Direct Client'}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
              <a
                href={customTelegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-center transition shadow-md shadow-orange-500/20 btn-tactile group"
              >
                <Send className="w-4 h-4 mr-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                {lang === 'kh' ? 'ផ្ញើសារតាម Telegram បន្ថែម' : 'Chat via Telegram'}
              </a>
              <button
                onClick={closeQuoteModal}
                className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition btn-tactile"
              >
                {lang === 'kh' ? 'បិទផ្ទាំង' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-7 max-h-[85vh] overflow-y-auto">
            {/* Header Banner */}
            <div className="flex items-start space-x-3.5 mb-4 pb-3.5 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20">
                <FileText className="w-5 h-5 animate-pulse-glow" />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {lang === 'kh' ? 'ស្នើសុំសម្រង់តម្លៃផ្លូវការ (Official RFQ)' : 'Request Official Corporate Quotation'}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {lang === 'kh' 
                    ? 'សម្រាប់ក្រុមហ៊ុន អង្គការ សាលារៀន និងការបញ្ជាទិញជាកញ្ចប់ (មានបោះត្រា & Tax Invoice)' 
                    : 'Formal PDF Quotation with corporate tax terms within 2 hours'}
                </p>
              </div>
            </div>

            {/* Targeted Product Display Card */}
            {product && (
              <div className="mb-4 p-3 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-2xl border border-slate-200 flex items-center space-x-3 group transition">
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <img src={product.image} alt={product.name_en} className="max-h-full max-w-full object-contain group-hover:scale-105 transition" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono font-bold bg-white text-slate-700 px-1.5 py-0.2 rounded border border-slate-200">
                      {product.brand}
                    </span>
                    {product.warranty_months > 0 && (
                      <span className="text-[9px] text-[#0187ca] font-medium flex items-center">
                        <Shield className="w-2.5 h-2.5 mr-0.5" />
                        {product.warranty_months} mo
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                    {lang === 'kh' ? product.name_kh : product.name_en}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono block">SKU: {product.sku}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Option 1: Quantity with Tactile Stepper + Quick Presets */}
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'kh' ? 'បរិមាណត្រូវការ (គ្រឿង) *' : 'Target Quantity (Units) *'}
                  </label>
                  <div className="flex items-center space-x-1.5 bg-white border border-slate-300 rounded-xl p-0.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition btn-tactile"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-14 text-center font-black text-sm text-slate-900 focus:outline-none bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                      aria-label="Increase quantity"
                      className="w-7 h-7 rounded-lg bg-[#0187ca] hover:bg-[#0073ad] text-white flex items-center justify-center transition btn-tactile"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-medium mr-1">
                    {lang === 'kh' ? 'កម្រិតរហ័ស៖' : 'Quick select:'}
                  </span>
                  {quantityPresets.map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setFormData({ ...formData, quantity: qty })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition btn-tactile ${
                        formData.quantity === qty
                          ? 'bg-[#0187ca] text-white shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {qty} {lang === 'kh' ? 'គ្រឿង' : 'pcs'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'kh' ? 'ឈ្មោះអ្នកស្នើសុំ *' : 'Contact Person *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="ឧ. សុខ វិសាល"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition pr-9"
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'kh' ? 'ឈ្មោះស្ថាប័ន / ក្រុមហ៊ុន' : 'Organization Name'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ឧ. Canadia Bank..."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition pr-9"
                    />
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'kh' ? 'លេខទូរស័ព្ទ *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="012 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition pr-9"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'kh' ? 'Telegram (Username/Phone)' : 'Telegram'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none transition pr-9"
                    />
                    <Send className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Option 2: Organization / Client Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'kh' ? 'ប្រភេទស្ថាប័នស្នើសុំ' : 'Organization Sector'}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {clientTypes.map((type) => {
                    const isSelected = formData.clientType === type.value;
                    return (
                      <button
                        type="button"
                        key={type.value}
                        onClick={() => setFormData({ ...formData, clientType: type.value })}
                        className={`p-2 rounded-xl border text-center transition-all duration-150 text-[11px] btn-tactile truncate ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 text-amber-900 font-bold ring-2 ring-amber-500/20 shadow-2xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {lang === 'kh' ? type.label_kh : type.label_en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 3: Delivery Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'kh' ? 'ជម្រើសដឹកជញ្ជូនរំពឹងទុក' : 'Delivery Preference'}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {deliveryOptions.map((del) => {
                    const isSelected = formData.deliveryType === del.value;
                    return (
                      <button
                        type="button"
                        key={del.value}
                        onClick={() => setFormData({ ...formData, deliveryType: del.value })}
                        className={`p-2 rounded-xl border text-center transition-all duration-150 text-[10px] btn-tactile ${
                          isSelected
                            ? 'border-[#0187ca] bg-sky-50 text-[#0187ca] font-bold ring-2 ring-[#0187ca]/20 shadow-2xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {lang === 'kh' ? del.label_kh : del.label_en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {lang === 'kh' ? 'ចំណាំបន្ថែម / លក្ខខណ្ឌបច្ចេកទេស' : 'Additional Notes / Specifications'}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'kh' ? 'បញ្ជាក់ពីតម្រូវការពិសេស ឬកាលបរិច្ឆេទត្រូវការ...' : 'Specify requirements or delivery deadline...'}
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
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-bold text-xs transition shadow-md shadow-orange-500/20 flex items-center justify-center space-x-2 btn-tactile disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>{lang === 'kh' ? 'ផ្ញើសំណើសុំតម្លៃ (Submit RFQ)' : 'Submit RFQ'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                <a
                  href={customTelegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-[#0187ca] font-semibold text-xs flex items-center justify-center transition btn-tactile"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  {lang === 'kh' ? 'សួរតាម Telegram' : 'Instant Telegram'}
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
