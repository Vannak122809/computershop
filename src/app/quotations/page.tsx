'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { FileText, Plus, Trash2, CheckCircle2, Send, Building, Phone, Mail, User } from 'lucide-react';

interface RFQItem {
  id: string;
  name: string;
  quantity: number;
}

export default function QuotationsPage() {
  const { lang, t } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [items, setItems] = useState<RFQItem[]>([
    { id: '1', name: 'Lenovo ThinkPad E14 Gen 5', quantity: 5 },
    { id: '2', name: 'MikroTik RB5009 Enterprise Router', quantity: 2 },
  ]);

  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    telegram: '',
    notes: '',
  });

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), name: '', quantity: 1 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: 'name' | 'quantity', value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const existing = localStorage.getItem('nv_quotes');
      const list = existing ? JSON.parse(existing) : [];
      const newQuote = {
        id: `NVQ-${Date.now().toString().slice(-3)}`,
        company: clientInfo.company || clientInfo.name,
        contact: clientInfo.name,
        phone: clientInfo.phone,
        items: items.map((i) => `${i.quantity}x ${i.name}`).join(' + '),
        status: 'pending',
        total: items.reduce((acc, i) => acc + (i.quantity || 1) * 250, 0),
      };
      list.unshift(newQuote);
      localStorage.setItem('nv_quotes', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('nv_quotes_updated'));
    } catch (err) {
      console.error('Failed to save quote request:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10 space-y-8 font-khmer">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
          <FileText className="w-3.5 h-3.5" />
          <span>B2B RFQ & CORPORATE PROCUREMENT</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {lang === 'kh' ? 'ស្នើសុំសម្រង់តម្លៃផ្លូវការ (Official RFQ)' : 'Request Official Corporate Quotation'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {lang === 'kh'
            ? 'សម្រាប់ក្រុមហ៊ុន អង្គការ សាលារៀន ឬគម្រោងទិញជាកញ្ចប់ធំ។ ក្រុមការងារ B2B របស់ NV Technology នឹងចេញសម្រង់តម្លៃជាផ្លូវការ (PDF Quote) ក្នុងរយៈពេល 2 ម៉ោង។'
            : 'For enterprises, NGOs, and bulk corporate projects. Our sales team prepares formal PDF quotations with tax and payment terms within 2 hours.'}
        </p>
      </div>

      {submitted ? (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-xl animate-slide-up">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center shadow-inner border border-amber-200/60 animate-pop">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {lang === 'kh' ? 'សំណើសុំសម្រង់តម្លៃត្រូវបានកត់ត្រា!' : 'Quotation Request Received!'}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'kh'
              ? `អរគុណ ${clientInfo.name} មកពី ${clientInfo.company || 'ស្ថាប័នរបស់អ្នក'}។ វិស្វករផ្នែកលក់ B2B នឹងទាក់ទងមក ${clientInfo.phone} ជាមួយនឹងឯកសារសម្រង់តម្លៃជា PDF។`
              : `Thank you ${clientInfo.name} from ${clientInfo.company || 'your organization'}. Our B2B sales engineer will contact ${clientInfo.phone} with your official quotation PDF.`}
          </p>

          <a
            href="https://t.me/shinggg168"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs shadow-md shadow-sky-500/20 btn-tactile"
          >
            <Send className="w-4 h-4" />
            <span>{lang === 'kh' ? 'ផ្ញើសារតាម Telegram' : 'Contact Sales on Telegram'}</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Organization Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
              1. {lang === 'kh' ? 'ព័ត៌មានស្ថាប័ន / ក្រុមហ៊ុន' : 'Organization Information'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">{t.full_name} *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="ឧ. សុខ ពិសិដ្ឋ"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                  />
                  <User className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">{t.company_name}</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ឧ. Smart Axiata / Canadia..."
                    value={clientInfo.company}
                    onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                  />
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">{t.phone_number} *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="012 345 678"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="procurement@company.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Items requested */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. {lang === 'kh' ? 'បញ្ជីទំនិញត្រូវការស្នើសុំតម្លៃ' : 'Requested Items & Quantities'}
              </h3>
              <button
                type="button"
                onClick={addItem}
                className="text-xs text-[#0187ca] hover:text-[#0073ad] flex items-center space-x-1 font-semibold px-2.5 py-1 rounded-lg hover:bg-sky-50 transition btn-tactile"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'kh' ? 'បន្ថែមមុខទំនិញ' : 'Add Item'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-2 text-xs animate-slide-up">
                  <span className="w-5 text-slate-400 font-mono text-center font-bold">{index + 1}.</span>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'kh' ? 'ឈ្មោះ ឬម៉ូឌែលទំនិញ (ឧ. 24-Port PoE Switch)' : 'Product name or model'}
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                  />
                  <div className="w-20">
                    <input
                      type="number"
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-center text-slate-800 font-bold focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition btn-tactile"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs text-slate-700 font-medium">
              {lang === 'kh' ? 'លក្ខខណ្ឌពិសេស / ព័ត៌មានបន្ថែម' : 'Project Scope / Requirements'}
            </label>
            <textarea
              rows={2}
              placeholder={lang === 'kh' ? 'បញ្ជាក់ពីលក្ខខណ្ឌដឹកជញ្ជូន ឬតម្រូវការ Invoice ផ្លូវការ (VAT)...' : 'Mention delivery timeframe or tax invoice requirements...'}
              value={clientInfo.notes}
              onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
            ></textarea>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs transition shadow-md shadow-sky-500/20 btn-tactile"
            >
              {lang === 'kh' ? 'ផ្ញើសំណើសុំសម្រង់តម្លៃផ្លូវការ (Submit RFQ)' : 'Submit Official RFQ'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
