'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { createProductTelegramLink } from '@/lib/telegram';
import { ShoppingCart, Send, Shield, Sparkles, Check, PhoneCall, Layers, CheckCircle2, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { lang, t, addToCart, openQuoteModal, openSolutionModal, openQuickView } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const telegramLink = createProductTelegramLink(product, lang);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.pricing_type === 'buy_now') {
      addToCart(product, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1400);
    } else if (product.pricing_type === 'request_quote') {
      openQuoteModal(product);
    } else {
      openSolutionModal();
    }
  };

  if (compact) {
    return (
      <div className="group relative bg-white border border-slate-200/90 hover:border-[#0187ca] rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between h-full">
        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10 pointer-events-none">
          {product.is_deal ? (
            <span className="shimmer-badge bg-[#e11927] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-2xs flex items-center">
              <Sparkles className="w-2.5 h-2.5 mr-0.5" />
              HOT DEAL
            </span>
          ) : (
            <span className="bg-white/95 text-slate-700 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              {product.brand}
            </span>
          )}

          {product.warranty_months > 0 && (
            <span className="bg-sky-50 text-[#0187ca] text-[9px] px-1.5 py-0.5 rounded-full border border-sky-100 flex items-center font-medium">
              <Shield className="w-2.5 h-2.5 mr-0.5" />
              {product.warranty_months}m
            </span>
          )}
        </div>

        {/* Square Image Box */}
        <div className="relative aspect-square bg-[#f8fafc] rounded-xl overflow-hidden mb-2 p-2 flex items-center justify-center group-hover:bg-slate-50 transition">
          <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
            <img
              src={product.image}
              alt={lang === 'kh' ? product.name_kh : product.name_en}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
              loading="lazy"
            />
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            title={lang === 'kh' ? 'មើលលម្អិតរហ័ស (Quick View)' : 'Quick View'}
            className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-lg bg-slate-900/80 hover:bg-[#0187ca] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10 btn-tactile"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block truncate mb-0.5">
              {product.category}
            </span>

            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="text-xs font-semibold text-slate-800 group-hover:text-[#0187ca] transition-colors line-clamp-2 leading-tight">
                {lang === 'kh' ? product.name_kh : product.name_en}
              </h3>
            </Link>
          </div>

          <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between">
            <div>
              {product.pricing_type === 'buy_now' ? (
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-black text-slate-900 group-hover:text-[#0187ca] transition-colors">
                    ${product.sale_price_usd ?? product.price_usd}
                  </span>
                  {product.sale_price_usd && (
                    <span className="text-[10px] text-slate-400 line-through">
                      ${product.price_usd}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-[11px] font-bold text-amber-700">
                  {lang === 'kh' ? 'សួរតម្លៃ' : 'Quote'}
                </span>
              )}
            </div>

            <button
              onClick={handleAction}
              title={product.pricing_type === 'buy_now' ? 'Add to Cart' : 'Request Quote'}
              className={`w-7 h-7 rounded-lg transition-all duration-200 flex items-center justify-center shadow-2xs btn-tactile ${
                justAdded
                  ? 'bg-emerald-600 text-white animate-pop'
                  : 'bg-sky-50 text-[#0187ca] hover:bg-[#0187ca] hover:text-white'
              }`}
            >
              {justAdded ? (
                <Check className="w-3.5 h-3.5" />
              ) : product.pricing_type === 'buy_now' ? (
                <ShoppingCart className="w-3.5 h-3.5" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-[#0187ca] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-250 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-10 pointer-events-none">
        {product.is_deal ? (
          <span className="shimmer-badge bg-[#e11927] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center">
            <Sparkles className="w-2.5 h-2.5 mr-1" />
            {lang === 'kh' ? 'ប្រូម៉ូសិន' : 'HOT DEAL'}
          </span>
        ) : (
          <span className="bg-slate-100/90 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-slate-200">
            {product.brand}
          </span>
        )}

        {product.warranty_months > 0 && (
          <span className="bg-sky-50 text-[#0187ca] text-[10px] px-2 py-0.5 rounded-full font-khmer border border-sky-100 flex items-center font-medium">
            <Shield className="w-2.5 h-2.5 mr-1" />
            {product.warranty_months} {lang === 'kh' ? 'ខែ' : 'mo'}
          </span>
        )}
      </div>

      {/* Product Image on Clean Light Background */}
      <div className="relative pt-[72%] bg-slate-50/80 overflow-hidden border-b border-slate-100 group-hover:bg-slate-50 transition">
        <Link 
          href={`/products/${product.slug}`} 
          className="absolute inset-0 block"
        >
          <img
            src={product.image}
            alt={lang === 'kh' ? product.name_kh : product.name_en}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Quick View Sub-view overlay button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-900/85 hover:bg-[#0187ca] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-sm flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 btn-tactile hover:scale-105 whitespace-nowrap"
          title={lang === 'kh' ? 'មើលលម្អិតរហ័ស & មុំមើល (Quick View)' : 'Quick View & Sub-views'}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{lang === 'kh' ? 'មើលរហ័ស' : 'Quick View'}</span>
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Stock */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-400 font-medium">{product.category}</span>
            {product.in_stock ? (
              <span className="text-emerald-600 flex items-center font-khmer font-medium text-[11px]">
                <Check className="w-3 h-3 mr-0.5" />
                {t.in_stock}
              </span>
            ) : (
              <span className="text-rose-500 font-khmer text-[11px]">{t.out_of_stock}</span>
            )}
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0187ca] transition-colors line-clamp-2 font-khmer leading-snug">
              {lang === 'kh' ? product.name_kh : product.name_en}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-[11px] text-slate-500 font-khmer line-clamp-2 mt-1">
            {lang === 'kh' ? product.short_desc_kh : product.short_desc_en}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            {product.pricing_type === 'buy_now' ? (
              <div className="flex items-baseline space-x-2">
                <span className="text-base sm:text-lg font-black text-[#0187ca]">
                  ${product.sale_price_usd ?? product.price_usd}
                </span>
                {product.sale_price_usd && (
                  <span className="text-xs text-slate-400 line-through">
                    ${product.price_usd}
                  </span>
                )}
              </div>
            ) : product.pricing_type === 'request_quote' ? (
              <div>
                <span className="text-xs font-bold text-amber-700 font-khmer flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  {t.contact_for_price}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">B2B Wholesale / RFQ</span>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold text-emerald-700 font-khmer flex items-center">
                  <PhoneCall className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  {lang === 'kh' ? 'ស្នើសុំដំណោះស្រាយ' : 'Custom Solution'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">Onsite Survey</span>
              </div>
            )}

            {/* Quick Telegram Button */}
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              title="សួរតាម Telegram"
              className="p-1.5 rounded-lg bg-sky-50 text-[#0187ca] hover:bg-[#0187ca] hover:text-white transition-all btn-tactile group/tg"
            >
              <Send className="w-3.5 h-3.5 group-hover/tg:rotate-12 transition-transform" />
            </a>
          </div>

          {/* 3-Tier Main CTA Button */}
          {product.pricing_type === 'buy_now' ? (
            <button
              onClick={handleAction}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-2xs btn-tactile ${
                justAdded
                  ? 'bg-emerald-600 text-white animate-pop'
                  : 'bg-[#0187ca] hover:bg-[#0073ad] text-white shadow-sky-500/20'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="font-khmer">{lang === 'kh' ? 'បានបញ្ចូលក្នុងកន្ត្រក ✓' : 'Added to Cart ✓'}</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span className="font-khmer">{t.add_to_cart}</span>
                </>
              )}
            </button>
          ) : product.pricing_type === 'request_quote' ? (
            <button
              onClick={handleAction}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 btn-tactile"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-khmer">{t.request_quote}</span>
            </button>
          ) : (
            <button
              onClick={handleAction}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 btn-tactile"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-khmer">{t.request_solution}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
