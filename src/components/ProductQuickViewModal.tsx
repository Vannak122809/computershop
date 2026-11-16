'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { createProductTelegramLink } from '@/lib/telegram';
import { getProductOptions } from '@/lib/productOptions';
import { SelectedProductOptions } from '@/lib/types';
import ProductSubViewsGallery from './ProductSubViewsGallery';
import { 
  X, 
  ShoppingCart, 
  Send, 
  Check, 
  Shield, 
  Truck, 
  ArrowRight, 
  FileText, 
  PhoneCall, 
  Sparkles,
  Sliders
} from 'lucide-react';

export default function ProductQuickViewModal() {
  const { 
    quickViewModal, 
    closeQuickView, 
    lang, 
    t, 
    addToCart, 
    openQuoteModal, 
    openSolutionModal, 
    openKhqrModal 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const { isOpen, product } = quickViewModal;

  const configOptions = useMemo(() => {
    return product ? getProductOptions(product) : {};
  }, [product]);

  const [selectedRam, setSelectedRam] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedWarranty, setSelectedWarranty] = useState('');

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setJustAdded(false);
      setSelectedRam(configOptions.ram?.[0]?.id || '');
      setSelectedStorage(configOptions.storage?.[0]?.id || '');
      setSelectedWarranty(configOptions.warranty?.[0]?.id || '');
    }
  }, [isOpen, product, configOptions]);

  const extraPriceUsd = useMemo(() => {
    let extra = 0;
    if (configOptions.ram) {
      const r = configOptions.ram.find((o) => o.id === selectedRam);
      if (r) extra += r.priceDelta;
    }
    if (configOptions.storage) {
      const s = configOptions.storage.find((o) => o.id === selectedStorage);
      if (s) extra += s.priceDelta;
    }
    if (configOptions.warranty) {
      const w = configOptions.warranty.find((o) => o.id === selectedWarranty);
      if (w) extra += w.priceDelta;
    }
    return extra;
  }, [configOptions, selectedRam, selectedStorage, selectedWarranty]);

  // Keyboard Escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickView();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeQuickView]);

  if (!isOpen || !product) return null;

  const basePrice = product.sale_price_usd ?? product.price_usd ?? 0;
  const finalUnitPrice = basePrice + extraPriceUsd;

  const currentOptionsPayload: SelectedProductOptions = {
    ram: configOptions.ram?.find((r) => r.id === selectedRam)?.[lang === 'kh' ? 'name_kh' : 'name_en'],
    storage: configOptions.storage?.find((s) => s.id === selectedStorage)?.[lang === 'kh' ? 'name_kh' : 'name_en'],
    warranty: configOptions.warranty?.find((w) => w.id === selectedWarranty)?.[lang === 'kh' ? 'name_kh' : 'name_en'],
    extraPriceUsd,
  };

  const telegramLink = createProductTelegramLink(product, lang);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentOptionsPayload);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuyNowInstant = () => {
    addToCart(product, quantity, currentOptionsPayload);
    closeQuickView();
    openKhqrModal({
      order_number: `NVO-${Date.now().toString().slice(-4)}`,
      total_usd: finalUnitPrice * quantity,
      customer_name: 'Customer',
    });
  };

  const handleRequestQuote = () => {
    closeQuickView();
    openQuoteModal(product);
  };

  const handleRequestSolution = () => {
    closeQuickView();
    openSolutionModal();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm modal-backdrop-anim overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeQuickView();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 text-slate-900 font-khmer modal-content-anim my-auto max-h-[90vh] flex flex-col">
        
        {/* Top Gradient Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0187ca] via-cyan-400 to-sky-500"></div>

        {/* Close Button with Spin Animation */}
        <button
          onClick={closeQuickView}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition duration-200 hover:rotate-90 hover:scale-105 active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Sub-Views Multi-Angle Gallery (md:col-span-6) */}
            <div className="md:col-span-6 space-y-3">
              <ProductSubViewsGallery product={product} lang={lang} compact={true} />
            </div>

            {/* Right Column: Key Details & Purchasing CTAs (md:col-span-6) */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#0187ca] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-[11px] text-slate-500">{product.category}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {lang === 'kh' ? product.name_kh : product.name_en}
                </h2>

                <span className="text-[10px] text-slate-400 font-mono block mt-1">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Price & Stock Badge */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  {product.pricing_type === 'buy_now' ? (
                    <div>
                      <span className="text-[10px] text-slate-500 block">
                        {lang === 'kh' ? 'តម្លៃទំនិញសរុប (USD)' : 'Configured Price'}
                      </span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black text-[#0187ca] font-mono">
                          ${finalUnitPrice.toFixed(0)}
                        </span>
                        {product.sale_price_usd && (
                          <span className="text-xs text-slate-400 line-through">
                            ${(product.price_usd! + extraPriceUsd).toFixed(0)}
                          </span>
                        )}
                        {extraPriceUsd > 0 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            +${extraPriceUsd}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : product.pricing_type === 'request_quote' ? (
                    <div>
                      <span className="text-[10px] text-slate-500 block">
                        {lang === 'kh' ? 'តម្លៃតាមតម្រូវការ' : 'Pricing Mode'}
                      </span>
                      <span className="text-lg font-black text-amber-700">{t.contact_for_price}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] text-slate-500 block">
                        {lang === 'kh' ? 'សេវាកម្មដំឡើង' : 'Solution Service'}
                      </span>
                      <span className="text-lg font-black text-emerald-700">{t.request_solution}</span>
                    </div>
                  )}
                </div>

                <div>
                  {product.in_stock ? (
                    <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      {t.in_stock}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                      {t.out_of_stock}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Configurable Options */}
              {(configOptions.ram || configOptions.storage || configOptions.warranty) && (
                <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span className="flex items-center space-x-1">
                      <Sliders className="w-3 h-3 text-[#0187ca]" />
                      <span>{lang === 'kh' ? 'ជម្រើសកែប្រែ (Options):' : 'Options:'}</span>
                    </span>
                  </div>

                  {configOptions.ram && (
                    <div>
                      <select
                        value={selectedRam}
                        onChange={(e) => setSelectedRam(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:border-[#0187ca]"
                      >
                        {configOptions.ram.map((r) => (
                          <option key={r.id} value={r.id}>
                            RAM: {lang === 'kh' ? r.name_kh : r.name_en} {r.priceDelta > 0 ? `(+$${r.priceDelta})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {configOptions.storage && (
                    <div>
                      <select
                        value={selectedStorage}
                        onChange={(e) => setSelectedStorage(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:border-[#0187ca]"
                      >
                        {configOptions.storage.map((s) => (
                          <option key={s.id} value={s.id}>
                            SSD: {lang === 'kh' ? s.name_kh : s.name_en} {s.priceDelta > 0 ? `(+$${s.priceDelta})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {configOptions.warranty && (
                    <div>
                      <select
                        value={selectedWarranty}
                        onChange={(e) => setSelectedWarranty(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:border-[#0187ca]"
                      >
                        {configOptions.warranty.map((w) => (
                          <option key={w.id} value={w.id}>
                            Warranty: {lang === 'kh' ? w.name_kh : w.name_en} {w.priceDelta > 0 ? `(+$${w.priceDelta})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Key Highlights / Specs */}
              {product.specs && product.specs.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    {lang === 'kh' ? 'លក្ខណៈពិសេសចម្បង' : 'Key Specifications'}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    {product.specs.slice(0, 4).map((spec, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex flex-col">
                        <span className="text-slate-500 text-[10px] truncate">
                          {lang === 'kh' ? spec.key_kh : spec.key_en}
                        </span>
                        <span className="font-semibold text-slate-800 truncate font-mono">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                {product.pricing_type === 'buy_now' ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-2.5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-300 rounded-xl bg-white text-xs overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="btn-tactile px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold transition"
                        >
                          -
                        </button>
                        <span className="px-3 py-2 font-bold text-slate-900 font-mono text-center min-w-[28px]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="btn-tactile px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className={`btn-tactile flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 border ${
                          justAdded
                            ? 'bg-emerald-600 text-white border-emerald-600 animate-pop'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        }`}
                      >
                        {justAdded ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>{lang === 'kh' ? 'បានបញ្ចូល! ✓' : 'Added! ✓'}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 text-[#0187ca]" />
                            <span>{t.add_to_cart}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleBuyNowInstant}
                        className="btn-tactile py-2.5 px-3 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs transition-all flex items-center justify-center space-x-1 shadow-glow-primary active:scale-95"
                      >
                        <span>{lang === 'kh' ? 'ទិញតាម Bakong' : 'Buy Now (KHQR)'}</span>
                      </button>

                      <a
                        href={telegramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile py-2.5 px-3 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs transition-all flex items-center justify-center space-x-1 shadow-xs active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Telegram</span>
                      </a>
                    </div>
                  </div>
                ) : product.pricing_type === 'request_quote' ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleRequestQuote}
                      className="btn-tactile py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-xs active:scale-95"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{lang === 'kh' ? 'ស្នើសុំតម្លៃ (RFQ)' : 'Request Quote'}</span>
                    </button>

                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-tactile py-2.5 px-3 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs transition-all flex items-center justify-center space-x-1 shadow-xs active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </a>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleRequestSolution}
                      className="btn-tactile py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-glow-emerald active:scale-95"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{lang === 'kh' ? 'ប្រឹក្សាសេវាកម្ម' : 'Request Survey'}</span>
                    </button>

                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-tactile py-2.5 px-3 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs transition-all flex items-center justify-center space-x-1 shadow-xs active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </a>
                  </div>
                )}

                {/* View Full Product Page Link */}
                <div className="pt-2 text-center">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={closeQuickView}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#0187ca] hover:underline transition"
                  >
                    <span>{lang === 'kh' ? 'មើលព័ត៌មានលម្អិតពេញលេញ (Full Specs) →' : 'View Full Product Details →'}</span>
                  </Link>
                </div>
              </div>

              {/* Warranty & PP Delivery note */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#0187ca]" />
                  <span>{product.warranty_months} {lang === 'kh' ? 'ខែធានា' : 'mo warranty'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'kh' ? 'ដឹកជញ្ជូនរហ័ស' : 'Fast Delivery'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
