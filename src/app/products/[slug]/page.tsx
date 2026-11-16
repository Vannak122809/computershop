'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { createProductTelegramLink } from '@/lib/telegram';
import { getProductOptions } from '@/lib/productOptions';
import { SelectedProductOptions } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import ProductSubViewsGallery from '@/components/ProductSubViewsGallery';
import { 
  Check, 
  Shield, 
  Truck, 
  ShoppingCart, 
  Send, 
  ArrowLeft, 
  FileText, 
  PhoneCall, 
  Share2,
  Sliders,
  Sparkles,
  Zap
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang, t, products, addToCart, openQuoteModal, openSolutionModal, openKhqrModal } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return notFound();
  }

  // Configurable Options
  const configOptions = useMemo(() => getProductOptions(product), [product]);
  const [selectedRam, setSelectedRam] = useState(configOptions.ram?.[0]?.id || '');
  const [selectedStorage, setSelectedStorage] = useState(configOptions.storage?.[0]?.id || '');
  const [selectedColor, setSelectedColor] = useState(configOptions.color?.[0]?.id || '');
  const [selectedWarranty, setSelectedWarranty] = useState(configOptions.warranty?.[0]?.id || '');
  const [selectedAddon, setSelectedAddon] = useState(configOptions.addon?.[0]?.id || '');

  // Calculate extra price from selected options
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
    if (configOptions.color) {
      const c = configOptions.color.find((o) => o.id === selectedColor);
      if (c) extra += c.priceDelta;
    }
    if (configOptions.warranty) {
      const w = configOptions.warranty.find((o) => o.id === selectedWarranty);
      if (w) extra += w.priceDelta;
    }
    if (configOptions.addon) {
      const a = configOptions.addon.find((o) => o.id === selectedAddon);
      if (a) extra += a.priceDelta;
    }
    return extra;
  }, [configOptions, selectedRam, selectedStorage, selectedColor, selectedWarranty, selectedAddon]);

  const basePrice = product.sale_price_usd ?? product.price_usd ?? 0;
  const finalUnitPrice = basePrice + extraPriceUsd;

  const currentOptionsPayload: SelectedProductOptions = {
    ram: configOptions.ram?.find((r) => r.id === selectedRam)?.[lang === 'kh' ? 'name_kh' : 'name_en'],
    storage: configOptions.storage?.find((s) => s.id === selectedStorage)?.[lang === 'kh' ? 'name_kh' : 'name_en'],
    color: configOptions.color?.find((c) => c.id === selectedColor)?.[lang === 'kh' ? 'name_kh' : 'name_en'],
    warranty: configOptions.warranty?.find((w) => w.id === selectedWarranty)?.[lang === 'kh' ? 'name_kh' : 'name_en'],
    accessory: configOptions.addon?.find((a) => a.id === selectedAddon)?.[lang === 'kh' ? 'name_kh' : 'name_en'],
    extraPriceUsd,
  };

  const telegramLink = createProductTelegramLink(product, lang);
  const relatedProducts = products
    .filter((p) => p.category_slug === product.category_slug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentOptionsPayload);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNowInstant = () => {
    addToCart(product, quantity, currentOptionsPayload);
    openKhqrModal({
      order_number: `NVO-${Date.now().toString().slice(-4)}`,
      total_usd: finalUnitPrice * quantity,
      customer_name: 'Customer',
    });
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-10 font-khmer">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#0187ca] transition">{t.nav_home}</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#0187ca] transition">{t.nav_products}</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category_slug}`} className="hover:text-[#0187ca] transition">{product.category}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{lang === 'kh' ? product.name_kh : product.name_en}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Images with Multi-Angle Sub-Views (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-3">
          <ProductSubViewsGallery product={product} lang={lang} />

          <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
            <span className="font-mono">SKU: {product.sku}</span>
            <button
              onClick={handleShare}
              className="btn-tactile flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#0187ca] hover:text-[#0187ca] transition-all bg-white"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? (lang === 'kh' ? 'បាន Copy Link! ✓' : 'Copied! ✓') : (lang === 'kh' ? 'ចែករំលែក' : 'Share')}</span>
            </button>
          </div>
        </div>

        {/* Right: Product Details & Options & 3-Tier CTAs (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-mono font-semibold text-[#0187ca] bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{product.category}</span>
            </div>

            <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
              {lang === 'kh' ? product.name_kh : product.name_en}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              {lang === 'kh' ? product.short_desc_kh : product.short_desc_en}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            {product.pricing_type === 'buy_now' ? (
              <div>
                <span className="text-[11px] text-slate-500 block">
                  {lang === 'kh' ? 'តម្លៃទំនិញសរុប (USD)' : 'Configured Price'}
                </span>
                <div className="flex items-baseline space-x-2.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#0187ca]">
                    ${finalUnitPrice.toFixed(0)}
                  </span>
                  {product.sale_price_usd && (
                    <span className="text-xs text-slate-400 line-through">
                      ${(product.price_usd! + extraPriceUsd).toFixed(0)}
                    </span>
                  )}
                  {extraPriceUsd > 0 && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      +${extraPriceUsd} {lang === 'kh' ? 'គ្រឿងបន្ថែម' : 'options'}
                    </span>
                  )}
                </div>
              </div>
            ) : product.pricing_type === 'request_quote' ? (
              <div>
                <span className="text-[11px] text-slate-500 block">{lang === 'kh' ? 'តម្លៃតាមតម្រូវការ' : 'Pricing Mode'}</span>
                <span className="text-xl font-black text-amber-800">{t.contact_for_price}</span>
                <span className="text-[10px] text-slate-400 font-mono block">B2B RFQ / Wholesale</span>
              </div>
            ) : (
              <div>
                <span className="text-[11px] text-slate-500 block">{lang === 'kh' ? 'សេវាកម្មដំឡើង' : 'Solution Service'}</span>
                <span className="text-xl font-black text-emerald-800">{t.request_solution}</span>
                <span className="text-[10px] text-slate-400 font-mono block">Onsite Survey & SLA</span>
              </div>
            )}

            {/* Stock Badge */}
            <div>
              {product.in_stock ? (
                <div className="text-right">
                  <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    {t.in_stock}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">({product.stock_count} units ready)</span>
                </div>
              ) : (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                  {t.out_of_stock}
                </span>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* INTERACTIVE PRODUCT CONFIGURABLE OPTIONS SECTION */}
          {/* ================================================================= */}
          <div className="space-y-4 pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wide">
                <Sliders className="w-3.5 h-3.5 text-[#0187ca]" />
                <span>{lang === 'kh' ? 'ជម្រើសបន្ថែម និងការកែប្រែ (Custom Options)' : 'Customizable Options'}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Genuine NV Config</span>
            </div>

            {/* 1. RAM Upgrade Options (if applicable) */}
            {configOptions.ram && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {lang === 'kh' ? 'ទំហំរ៉េម (RAM Capacity):' : 'RAM Capacity:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {configOptions.ram.map((r) => {
                    const isSelected = selectedRam === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRam(r.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all btn-tactile ${
                          isSelected
                            ? 'bg-sky-50 border-[#0187ca] ring-2 ring-[#0187ca]/20 text-slate-900 shadow-2xs font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-[11px] leading-snug">{lang === 'kh' ? r.name_kh : r.name_en}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Storage SSD Options (if applicable) */}
            {configOptions.storage && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {lang === 'kh' ? 'ទំហំផ្ទុក (NVMe Storage):' : 'NVMe Storage:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {configOptions.storage.map((s) => {
                    const isSelected = selectedStorage === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedStorage(s.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all btn-tactile ${
                          isSelected
                            ? 'bg-sky-50 border-[#0187ca] ring-2 ring-[#0187ca]/20 text-slate-900 shadow-2xs font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-[11px] leading-snug">{lang === 'kh' ? s.name_kh : s.name_en}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Color / Chassis finish (if applicable) */}
            {configOptions.color && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {lang === 'kh' ? 'ពណ៌ (Color Finish):' : 'Color Finish:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {configOptions.color.map((c) => {
                    const isSelected = selectedColor === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColor(c.id)}
                        className={`p-2 rounded-xl border text-left transition-all btn-tactile ${
                          isSelected
                            ? 'bg-sky-50 border-[#0187ca] ring-2 ring-[#0187ca]/20 text-slate-900 shadow-2xs font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-[11px] leading-snug">{lang === 'kh' ? c.name_kh : c.name_en}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Warranty Extension Selector */}
            {configOptions.warranty && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                  <span>{lang === 'kh' ? 'កញ្ចប់ធានា (Warranty Package):' : 'Warranty Package:'}</span>
                  <span className="text-emerald-700 font-semibold">{product.warranty_months} {lang === 'kh' ? 'ខែ' : 'months'} included</span>
                </label>
                <select
                  value={selectedWarranty}
                  onChange={(e) => setSelectedWarranty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0187ca] focus:bg-white transition cursor-pointer"
                >
                  {configOptions.warranty.map((w) => (
                    <option key={w.id} value={w.id}>
                      {lang === 'kh' ? w.name_kh : w.name_en} {w.priceDelta > 0 ? `(+$${w.priceDelta})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 5. Accessories & Add-on Bundles */}
            {configOptions.addon && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {lang === 'kh' ? 'កញ្ចប់បន្ថែម & សេវាកម្ម (Add-ons):' : 'Add-on Bundles & Setup:'}
                </label>
                <select
                  value={selectedAddon}
                  onChange={(e) => setSelectedAddon(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0187ca] focus:bg-white transition cursor-pointer"
                >
                  {configOptions.addon.map((a) => (
                    <option key={a.id} value={a.id}>
                      {lang === 'kh' ? a.name_kh : a.name_en} {a.priceDelta > 0 ? `(+$${a.priceDelta})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* 3-TIER ACTION BUTTONS */}
          <div className="space-y-3 pt-2">
            {product.pricing_type === 'buy_now' ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white text-xs overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="btn-tactile px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold transition"
                    >
                      -
                    </button>
                    <span className="px-3.5 py-2 font-bold text-slate-900 font-mono text-center min-w-[32px]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="btn-tactile px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="btn-tactile flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-800 font-bold text-xs transition-all flex items-center justify-center space-x-2 border border-slate-300"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#0187ca]" />
                    <span>{justAdded ? (lang === 'kh' ? 'បានបន្ថែមចូលកន្ត្រក! ✓' : 'Added to Cart! ✓') : t.add_to_cart}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleBuyNowInstant}
                    className="btn-tactile py-3 px-4 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-glow-primary active:scale-[0.98]"
                  >
                    <span>{lang === 'kh' ? 'ទិញភ្លាមៗតាម Bakong KHQR' : 'Buy Now with KHQR'}</span>
                  </button>

                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.ask_telegram}</span>
                  </a>
                </div>
              </div>
            ) : product.pricing_type === 'request_quote' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => openQuoteModal(product)}
                  className="btn-tactile py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs active:scale-[0.98]"
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'kh' ? 'ស្នើសុំតម្លៃជាផ្លូវការ (RFQ)' : 'Request Official Quote'}</span>
                </button>

                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.ask_telegram}</span>
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => openSolutionModal()}
                  className="btn-tactile py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-glow-emerald active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{lang === 'kh' ? 'ស្នើសុំការពិគ្រោះយោបល់ & ដំឡើង' : 'Request Consultation & Survey'}</span>
                </button>

                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.ask_telegram}</span>
                </a>
              </div>
            )}
          </div>

          {/* Delivery & Warranty info */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#0187ca] flex-shrink-0" />
              <span>
                {t.warranty_text}៖ <strong className="text-slate-800">{product.warranty_months} {lang === 'kh' ? 'ខែ' : 'months'}</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{t.phnom_penh} | {t.provinces}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table Section (CLEAN WHITE CARD WITH HIGH CONTRAST) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <span>{lang === 'kh' ? 'លក្ខណៈបច្ចេកទេសលម្អិត (Specifications)' : 'Technical Specifications'}</span>
        </h3>

        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-xs">
          {product.specs.map((spec, idx) => (
            <div
              key={idx}
              className={`py-3 px-4 grid grid-cols-1 sm:grid-cols-3 gap-2 transition-colors duration-150 hover:bg-sky-50/70 ${
                idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
              }`}
            >
              <span className="font-semibold text-slate-700">
                {lang === 'kh' ? spec.key_kh : spec.key_en}
              </span>
              <span className="sm:col-span-2 text-slate-900 font-mono">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'kh' ? 'ផលិតផលពាក់ព័ន្ធ' : 'Related Products'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
