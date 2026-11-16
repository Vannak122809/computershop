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

export default function ProductDetailClient() {
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
      const opt = configOptions.ram.find((r) => r.id === selectedRam);
      if (opt) extra += opt.priceDelta;
    }
    if (configOptions.storage) {
      const opt = configOptions.storage.find((s) => s.id === selectedStorage);
      if (opt) extra += opt.priceDelta;
    }
    if (configOptions.warranty) {
      const opt = configOptions.warranty.find((w) => w.id === selectedWarranty);
      if (opt) extra += opt.priceDelta;
    }
    if (configOptions.addon) {
      const opt = configOptions.addon.find((a) => a.id === selectedAddon);
      if (opt) extra += opt.priceDelta;
    }
    return extra;
  }, [configOptions, selectedRam, selectedStorage, selectedWarranty, selectedAddon]);

  const effectivePriceUsd = (product.price_usd || 0) + extraPriceUsd;
  const effectivePriceKhr = effectivePriceUsd * 4100;

  const currentOptions: SelectedProductOptions = {
    ram: selectedRam || undefined,
    storage: selectedStorage || undefined,
    color: selectedColor || undefined,
    warranty: selectedWarranty || undefined,
    accessory: selectedAddon || undefined,
    extraPriceUsd,
  };

  const relatedProducts = products
    .filter((p) => p.category_slug === product.category_slug && p.id !== product.id)
    .slice(0, 4);

  const telegramLink = createProductTelegramLink(product);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentOptions);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors">
      {/* Breadcrumb Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category_slug}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 font-medium capitalize"
            >
              {product.category_slug.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-md">
              {lang === 'kh' ? product.name_kh : product.name_en}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          {lang === 'kh' ? 'ត្រឡប់ទៅកាន់ទំនិញទាំងអស់' : 'Back to All Products'}
        </Link>

        {/* Product Overview Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 mb-10 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Gallery Column */}
            <div className="lg:col-span-6">
              <ProductSubViewsGallery
                product={product}
                lang={lang}
              />
            </div>

            {/* Details Column */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {product.brand}
                </span>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-full transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1.5" />
                  {copiedLink ? (lang === 'kh' ? 'បានចម្លង!' : 'Copied!') : (lang === 'kh' ? 'ចែករំលែក' : 'Share')}
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                {lang === 'kh' ? product.name_kh : product.name_en}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {lang === 'kh' ? product.short_desc_kh : product.short_desc_en}
              </p>

              {/* Price Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-800/80 dark:to-blue-950/20 border border-slate-200/80 dark:border-slate-800 mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                    ${effectivePriceUsd.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    ≈ ៛{effectivePriceKhr.toLocaleString()}
                  </span>
                </div>
                {extraPriceUsd > 0 && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    Includes +${extraPriceUsd} from customized upgrade options
                  </p>
                )}
              </div>

              {/* Configurable Option Selectors */}
              {(configOptions.ram || configOptions.storage || configOptions.color || configOptions.warranty || configOptions.addon) && (
                <div className="space-y-4 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    <Sliders className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                    {lang === 'kh' ? 'ជម្រើសបន្ថែម និងការកែប្រែ' : 'Custom Options & Upgrades'}
                  </div>

                  {/* RAM Options */}
                  {configOptions.ram && (
                    <div>
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                        RAM Memory:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {configOptions.ram.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setSelectedRam(r.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              selectedRam === r.id
                                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                            }`}
                          >
                            {lang === 'kh' ? r.name_kh : r.name_en} {r.priceDelta > 0 ? `(+${r.priceDelta})` : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Storage Options */}
                  {configOptions.storage && (
                    <div>
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                        Internal Storage (SSD):
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {configOptions.storage.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedStorage(s.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              selectedStorage === s.id
                                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                            }`}
                          >
                            {lang === 'kh' ? s.name_kh : s.name_en} {s.priceDelta > 0 ? `(+${s.priceDelta})` : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Options */}
                  {configOptions.color && (
                    <div>
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                        Color / Finish:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {configOptions.color.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedColor(c.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              selectedColor === c.id
                                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                            }`}
                          >
                            {lang === 'kh' ? c.name_kh : c.name_en}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warranty Options */}
                  {configOptions.warranty && (
                    <div>
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                        Warranty Protection:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {configOptions.warranty.map((w) => (
                          <button
                            key={w.id}
                            type="button"
                            onClick={() => setSelectedWarranty(w.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              selectedWarranty === w.id
                                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                            }`}
                          >
                            {lang === 'kh' ? w.name_kh : w.name_en} {w.priceDelta > 0 ? `(+${w.priceDelta})` : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add-ons */}
                  {configOptions.addon && (
                    <div>
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                        Bundle Add-on:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {configOptions.addon.map((a) => (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => setSelectedAddon(a.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              selectedAddon === a.id
                                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                            }`}
                          >
                            {lang === 'kh' ? a.name_kh : a.name_en} {a.priceDelta > 0 ? `(+${a.priceDelta})` : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {lang === 'kh' ? 'ចំនួន:' : 'Quantity:'}
                  </span>
                  <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-bold text-sm text-slate-900 dark:text-white min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className={`flex items-center justify-center space-x-2 w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md transition-all ${
                      justAdded
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-500'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:shadow-blue-500/30'
                    }`}
                  >
                    {justAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                    <span>{justAdded ? (lang === 'kh' ? 'បានបន្ថែម!' : 'Added!') : (lang === 'kh' ? 'បញ្ចូលក្នុងកន្ត្រក' : 'Add to Cart')}</span>
                  </button>

                  <button
                    onClick={() =>
                      openKhqrModal({
                        productName: lang === 'kh' ? product.name_kh : product.name_en,
                        priceUsd: effectivePriceUsd * quantity,
                        priceKhr: effectivePriceKhr * quantity,
                      })
                    }
                    className="flex items-center justify-center space-x-2 w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-md shadow-red-500/20 transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    <span>{lang === 'kh' ? 'ទិញភ្លាមៗ (KHQR)' : 'Buy Now with KHQR'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl font-semibold text-xs bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'kh' ? 'សាកសួរតាម Telegram' : 'Ask on Telegram'}</span>
                  </a>

                  <button
                    onClick={() => openQuoteModal(product)}
                    className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl font-semibold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{lang === 'kh' ? 'ស្នើសុំសម្រង់តម្លៃផ្លូវការ' : 'Request Official Quote'}</span>
                  </button>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="mt-auto grid grid-cols-3 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">100% Genuine</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Official Warranty</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Fast Delivery</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">All 25 Provinces</span>
                </div>
                <div className="flex flex-col items-center">
                  <PhoneCall className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tech Support</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Free Setup Advice</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {product.specs && product.specs.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 mb-12 transition-colors">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
              {lang === 'kh' ? 'លក្ខណៈបច្ចេកទេសលម្អិត' : 'Technical Specifications'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {product.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/80 text-sm"
                >
                  <span className="font-medium text-slate-500 dark:text-slate-400 capitalize">
                    {lang === 'kh' ? spec.key_kh : spec.key_en}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 text-right max-w-[60%]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                {lang === 'kh' ? 'ទំនិញដែលទាក់ទង' : 'Related Products'}
              </h2>
              <Link
                href={`/products?category=${product.category_slug}`}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {lang === 'kh' ? 'មើលទាំងអស់' : 'View All'}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
