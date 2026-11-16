'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Product, ProductSubView } from '@/lib/types';
import { getProductSubViews } from '@/lib/productViews';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Camera, 
  Cpu, 
  Plug, 
  Layers
} from 'lucide-react';

interface ProductSubViewsGalleryProps {
  product: Product;
  lang?: 'kh' | 'en';
  compact?: boolean;
}

export default function ProductSubViewsGallery({
  product,
  lang = 'kh',
  compact = false,
}: ProductSubViewsGalleryProps) {
  const subViews = getProductSubViews(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Keep index in bounds if product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  const activeView: ProductSubView = subViews[activeIndex] || subViews[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? subViews.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === subViews.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for power users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === 0 ? subViews.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === subViews.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [subViews.length]);

  const getAngleIcon = (angle: string) => {
    switch (angle) {
      case 'front': return <Camera className="w-3.5 h-3.5 shrink-0" />;
      case 'side': return <Layers className="w-3.5 h-3.5 shrink-0" />;
      case 'rear': return <Plug className="w-3.5 h-3.5 shrink-0" />;
      default: return <Cpu className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  const [startIndex, setStartIndex] = useState(0);
  const prevActiveIndexRef = useRef(activeIndex);
  const maxStartIndex = Math.max(0, subViews.length - 4);

  // Reset startIndex when product changes
  useEffect(() => {
    setStartIndex(0);
    prevActiveIndexRef.current = 0;
  }, [product.id]);

  // Keep active thumbnail visible in the 4-display window when activeIndex changes
  useEffect(() => {
    if (prevActiveIndexRef.current !== activeIndex) {
      prevActiveIndexRef.current = activeIndex;
      if (subViews.length > 4) {
        if (activeIndex < startIndex) {
          setStartIndex(activeIndex);
        } else if (activeIndex >= startIndex + 4) {
          setStartIndex(Math.min(maxStartIndex, activeIndex - 3));
        }
      }
    }
  }, [activeIndex, startIndex, maxStartIndex, subViews.length]);

  const handleSlidePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSlideNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 35 && startIndex < maxStartIndex) {
      setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
    } else if (diff < -35 && startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
    setTouchStartX(null);
  };

  return (
    <div className="space-y-3 font-khmer">
      {/* 1. Main High-Res Image Viewport */}
      <div 
        className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs cursor-zoom-in"
        onClick={() => {
          setZoomLevel(1);
          setIsLightboxOpen(true);
        }}
      >
        <div className={compact ? "pt-[75%]" : "pt-[80%]"}>
          <img
            key={activeView.id}
            src={activeView.url}
            alt={lang === 'kh' ? activeView.label_kh : activeView.label_en}
            className="absolute inset-0 w-full h-full object-contain p-6 transition-all duration-300 ease-out group-hover:scale-105 animate-slide-up"
          />
        </div>

        {/* Hot Deal Shimmer Badge */}
        {product.is_deal && (
          <span className="shimmer-badge absolute top-3.5 left-3.5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs z-10 flex items-center">
            <Sparkles className="w-3 h-3 mr-1" />
            {lang === 'kh' ? 'ប្រូម៉ូសិន' : 'HOT DEAL'}
          </span>
        )}

        {/* Perspective Indicator Pill & Counter */}
        <div className="absolute top-3.5 right-3.5 flex items-center space-x-1.5 z-10">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium flex items-center space-x-1.5 shadow-sm">
            {getAngleIcon(activeView.angle)}
            <span className="font-semibold">{lang === 'kh' ? activeView.label_kh : activeView.label_en}</span>
          </span>
          <span className="px-2 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-mono font-bold border border-slate-200 shadow-2xs">
            {activeIndex + 1}/{subViews.length}
          </span>
        </div>

        {/* Active Angle Description Overlay (on hover) */}
        {(activeView.description_kh || activeView.description_en) && (
          <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] px-3.5 py-2 rounded-xl border border-white/10 shadow-lg flex items-center justify-between">
              <span className="truncate pr-2">
                {lang === 'kh' ? activeView.description_kh : activeView.description_en}
              </span>
              <span className="text-[10px] text-sky-400 font-mono shrink-0 font-bold bg-sky-950/60 px-2 py-0.5 rounded">
                {activeView.badge}
              </span>
            </div>
          </div>
        )}

        {/* Prev / Next Arrows */}
        {subViews.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous view"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#0187ca] shadow-md border border-slate-200/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 btn-tactile z-10 hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next view"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#0187ca] shadow-md border border-slate-200/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 btn-tactile z-10 hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Maximize Lightbox Prompt */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setZoomLevel(1);
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-3 right-3 w-7 h-7 rounded-lg bg-white/90 hover:bg-[#0187ca] text-slate-600 hover:text-white border border-slate-200 shadow-sm flex items-center justify-center transition-colors btn-tactile z-10"
          title="Zoom image view"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. Compact 4-Display Sub-View Thumbnails & Slider */}
      {subViews.length > 1 && (
        <div className="relative pt-0.5">
          {subViews.length > 4 ? (
            <div className="flex items-center gap-1.5">
              {/* Prev Slide Arrow */}
              <button
                type="button"
                onClick={handleSlidePrev}
                disabled={startIndex === 0}
                aria-label="Previous thumbnails"
                title="Previous options"
                className={`w-7 h-16 sm:h-[72px] shrink-0 rounded-xl border flex items-center justify-center transition-all ${
                  startIndex === 0
                    ? 'border-slate-200/60 bg-slate-50/80 text-slate-300 cursor-not-allowed opacity-40'
                    : 'border-slate-200 bg-white hover:bg-sky-50 hover:border-[#0187ca] text-slate-600 hover:text-[#0187ca] shadow-2xs hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* 4-Item Sliding Viewport */}
              <div
                className="overflow-hidden flex-1 rounded-xl"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 ease-out -mx-1"
                  style={{
                    width: `${(subViews.length / 4) * 100}%`,
                    transform: `translateX(-${(startIndex / subViews.length) * 100}%)`,
                  }}
                >
                  {subViews.map((view, idx) => {
                    const isSelected = activeIndex === idx;
                    return (
                      <div
                        key={view.id}
                        style={{ width: `${100 / subViews.length}%` }}
                        className="px-1 shrink-0"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          title={`${lang === 'kh' ? view.label_kh : view.label_en} • ${view.badge || view.label_en}`}
                          className={`group/thumb w-full h-16 sm:h-[72px] p-1 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-between cursor-pointer btn-tactile ${
                            isSelected
                              ? 'border-[#0187ca] ring-2 ring-[#0187ca]/20 bg-sky-50/30 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white opacity-75 hover:opacity-100 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="h-9 sm:h-10 w-full flex items-center justify-center overflow-hidden rounded-md bg-slate-50/50">
                            <img
                              src={view.url}
                              alt={view.label_en}
                              className="max-h-full max-w-full object-contain p-0.5 transition-transform duration-200 group-hover/thumb:scale-110"
                            />
                          </div>
                          <span className="text-[9px] font-mono font-bold text-slate-500 truncate block w-full text-center leading-none pb-0.5">
                            {view.badge || (lang === 'kh' ? view.label_kh : view.label_en)}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Slide Arrow */}
              <button
                type="button"
                onClick={handleSlideNext}
                disabled={startIndex >= maxStartIndex}
                aria-label="Next thumbnails"
                title="Next options"
                className={`w-7 h-16 sm:h-[72px] shrink-0 rounded-xl border flex items-center justify-center transition-all ${
                  startIndex >= maxStartIndex
                    ? 'border-slate-200/60 bg-slate-50/80 text-slate-300 cursor-not-allowed opacity-40'
                    : 'border-slate-200 bg-white hover:bg-sky-50 hover:border-[#0187ca] text-slate-600 hover:text-[#0187ca] shadow-2xs hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* <= 4 items: Neat static 4-slot grid, compact height */
            <div className="grid grid-cols-4 gap-2">
              {subViews.map((view, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    type="button"
                    key={view.id}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    title={`${lang === 'kh' ? view.label_kh : view.label_en} • ${view.badge || view.label_en}`}
                    className={`group/thumb w-full h-16 sm:h-[72px] p-1 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-between cursor-pointer btn-tactile ${
                      isSelected
                        ? 'border-[#0187ca] ring-2 ring-[#0187ca]/20 bg-sky-50/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white opacity-75 hover:opacity-100 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="h-9 sm:h-10 w-full flex items-center justify-center overflow-hidden rounded-md bg-slate-50/50">
                      <img
                        src={view.url}
                        alt={view.label_en}
                        className="max-h-full max-w-full object-contain p-0.5 transition-transform duration-200 group-hover/thumb:scale-110"
                      />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-500 truncate block w-full text-center leading-none pb-0.5">
                      {view.badge || (lang === 'kh' ? view.label_kh : view.label_en)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Fullscreen Sub-View Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md modal-backdrop-anim"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl modal-content-anim space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-1 rounded-md bg-[#0187ca]/20 border border-[#0187ca]/40 text-sky-400 font-mono text-xs font-bold">
                  {activeView.badge}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'kh' ? product.name_kh : product.name_en}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {lang === 'kh' ? activeView.label_kh : activeView.label_en} • View {activeIndex + 1} of {subViews.length}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center btn-tactile"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center btn-tactile"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center btn-tactile"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Image Canvas */}
            <div className="relative h-[55vh] sm:h-[65vh] w-full bg-slate-950/80 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-800/80">
              <img
                src={activeView.url}
                alt={activeView.label_en}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-full max-w-full object-contain transition-transform duration-200 select-none"
              />

              {/* Nav Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-[#0187ca] text-white flex items-center justify-center border border-slate-700 shadow-lg btn-tactile"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-[#0187ca] text-white flex items-center justify-center border border-slate-700 shadow-lg btn-tactile"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-view thumbnails inside lightbox */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
              {subViews.map((view, idx) => (
                <button
                  key={view.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`relative w-16 h-16 rounded-xl bg-slate-800 border p-1 flex-shrink-0 transition-all btn-tactile ${
                    activeIndex === idx
                      ? 'border-[#0187ca] ring-2 ring-[#0187ca]'
                      : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={view.url} alt={view.label_en} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
