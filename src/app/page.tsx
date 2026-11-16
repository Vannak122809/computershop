'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { categories, brands } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/HeroCarousel';
import BrandLogo from '@/components/BrandLogo';
import { 
  Laptop, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Printer, 
  Fingerprint, 
  Gamepad2, 
  ChevronRight,
  Shield,
  Truck,
  Headphones,
  Flame,
  Clock,
  Layers,
  Zap
} from 'lucide-react';

export default function HomePage() {
  const { lang, products } = useStore();

  // Deal countdown timer state (mock persistent 5-hour countdown)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 48, seconds: 22 });
  const [compSubFilter, setCompSubFilter] = useState<string>('all');
  const [netSubFilter, setNetSubFilter] = useState<string>('all');
  const [printerSubFilter, setPrinterSubFilter] = useState<string>('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Curated product slices dynamically deriving from live store products
  const flashDeals = useMemo(() => {
    return products
      .filter((p) => p.is_deal || (p.sale_price_usd && p.price_usd && p.sale_price_usd < p.price_usd))
      .slice(0, 6);
  }, [products]);

  const newArrivals = useMemo(() => {
    return products
      .filter((p) => p.is_featured)
      .slice(0, 6);
  }, [products]);

  const filteredComputerProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.category_slug !== 'computers') return false;
        if (compSubFilter !== 'all' && p.subcategory_slug !== compSubFilter) return false;
        return true;
      })
      .slice(0, 6);
  }, [products, compSubFilter]);

  const filteredNetworkProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.category_slug !== 'networking' && p.category_slug !== 'security') return false;
        if (netSubFilter === 'all') return true;
        if (netSubFilter === 'router') return p.subcategory_slug === 'router';
        if (netSubFilter === 'switch') return p.subcategory_slug === 'switch';
        if (netSubFilter === 'access-point') return p.subcategory_slug === 'access-point';
        if (netSubFilter === 'firewall') return p.subcategory_slug === 'firewall' || p.category_slug === 'security';
        return true;
      })
      .slice(0, 6);
  }, [products, netSubFilter]);

  const filteredPrinterProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.category_slug !== 'printers' && p.category_slug !== 'attendance') return false;
        if (printerSubFilter === 'all') return true;
        if (printerSubFilter === 'ink-tank') return p.subcategory_slug === 'ink-tank';
        if (printerSubFilter === 'laser-printer') return p.subcategory_slug === 'laser-printer';
        if (printerSubFilter === 'barcode-pos') return p.subcategory_slug === 'barcode-printer' || p.subcategory_slug === 'pos-terminal';
        if (printerSubFilter === 'attendance') return p.category_slug === 'attendance' || p.subcategory_slug === 'time-attendance' || p.subcategory_slug === 'access-control';
        return true;
      })
      .slice(0, 6);
  }, [products, printerSubFilter]);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'computers': return <Laptop className="w-4 h-4 text-[#0187ca]" />;
      case 'components': return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 'networking': return <Network className="w-4 h-4 text-emerald-600" />;
      case 'security': return <ShieldCheck className="w-4 h-4 text-rose-600" />;
      case 'printers': return <Printer className="w-4 h-4 text-amber-600" />;
      case 'attendance': return <Fingerprint className="w-4 h-4 text-purple-600" />;
      case 'gaming': return <Gamepad2 className="w-4 h-4 text-pink-600" />;
      default: return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-16 font-khmer bg-[#f8fafc]/50">
      
      {/* 1. PANORAMIC HERO CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 pt-3 sm:pt-4">
        <HeroCarousel />
      </section>

      {/* 2. HORIZONTAL CATEGORY PILLS BAR */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 hover:border-[#0187ca] hover:bg-sky-50/50 text-slate-700 hover:text-[#0187ca] text-xs font-semibold whitespace-nowrap transition duration-150 flex items-center space-x-2 shadow-2xs group flex-shrink-0"
            >
              <span className="w-6 h-6 rounded-lg bg-slate-50 group-hover:bg-white flex items-center justify-center transition">
                {getCategoryIcon(cat.slug)}
              </span>
              <span>{lang === 'kh' ? cat.name_kh : cat.name_en}</span>
            </Link>
          ))}

          <Link
            href="/products"
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold whitespace-nowrap transition flex items-center space-x-1.5 flex-shrink-0"
          >
            <span>{lang === 'kh' ? 'គ្រប់ប្រភេទទាំងអស់' : 'All Categories'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 3. OFFICIAL BRANDS RAIL (EXACT ICEKH STYLE CIRCULAR LOGOS) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {lang === 'kh' ? 'ម៉ាកផលិតផលល្បីៗ (Brands)' : 'Brands'}
            </h2>
            <Link 
              href="/products" 
              className="text-xs sm:text-sm font-semibold text-[#0187ca] hover:text-[#0073ad] flex items-center space-x-0.5"
            >
              <span>{lang === 'kh' ? 'មើលទាំងអស់' : 'See All'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-3.5 sm:gap-6 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {brands.map((b) => (
              <Link
                key={b.id}
                href={`/products?brand=${encodeURIComponent(b.name)}`}
                className="group flex flex-col items-center justify-center flex-shrink-0 py-1 btn-tactile"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-slate-200/90 bg-white group-hover:border-[#0187ca] shadow-2xs group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 flex items-center justify-center p-3 sm:p-3.5">
                  <BrandLogo brand={b.name} className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition" />
                </div>
                <span className="text-xs font-medium text-slate-700 group-hover:text-[#0187ca] group-hover:font-semibold transition mt-2 truncate max-w-[85px] text-center">
                  {b.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FLASH DEALS / SPECIAL OFFERS (6-COLUMN GRID WITH LIVE TIMER) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center animate-pulse">
                <Flame className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {lang === 'kh' ? 'ប្រូម៉ូសិនពិសេសប្រចាំថ្ងៃ (Flash Deals)' : 'Hot Deals & Promotions'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {lang === 'kh' ? 'ទំនិញបញ្ចុះតម្លៃពិសេស មានចំនួនកំណត់' : 'Limited time discounts on genuine hardware'}
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-slate-500 text-xs font-semibold mr-1">
                <Clock className="w-3.5 h-3.5 text-rose-500 animate-spinSlow" />
                <span>{lang === 'kh' ? 'ផុតកំណត់ក្នុង៖' : 'Ends in:'}</span>
              </div>
              <div className="flex items-center space-x-1 font-mono text-xs font-black">
                <span className="px-2 py-1 bg-slate-900 text-white rounded-md shadow-2xs">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-slate-400 animate-pulse">:</span>
                <span className="px-2 py-1 bg-slate-900 text-white rounded-md shadow-2xs">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-slate-400 animate-pulse">:</span>
                <span className="px-2 py-1 bg-rose-600 text-white rounded-md shadow-2xs animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* 6-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} compact={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS (6-COLUMN GRID) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0187ca] animate-ping"></span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === 'kh' ? 'ទំនិញទើបមកដល់ថ្មីៗ (New Arrivals)' : 'New Arrivals'}
              </h2>
            </div>
            <Link
              href="/products?sort=newest"
              className="text-xs font-bold text-[#0187ca] hover:text-[#0073ad] flex items-center space-x-0.5 btn-tactile"
            >
              <span>{lang === 'kh' ? 'មើលទាំងអស់' : 'See All'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} compact={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPUTERS, LAPTOPS & DESKTOPS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0187ca] flex items-center justify-center">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'kh' ? 'កុំព្យូទ័រ (Computers, Laptops & Desktops)' : 'Computers, Desktops & Laptops'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {lang === 'kh' ? 'Desktop ការិយាល័យ, Laptop ធន់មាំ, All-in-One និង Gaming' : 'Enterprise desktops, sleek ultrabooks, all-in-one & gaming towers'}
                </p>
              </div>
            </div>

            {/* Interactive Subfolder Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              <button
                onClick={() => setCompSubFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  compSubFilter === 'all'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'kh' ? 'ទាំងអស់ (13)' : 'All (13)'}
              </button>
              <button
                onClick={() => setCompSubFilter('desktop')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  compSubFilter === 'desktop'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🖥️ {lang === 'kh' ? 'Desktop លើតុ' : 'Desktop'}
              </button>
              <button
                onClick={() => setCompSubFilter('laptop')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  compSubFilter === 'laptop'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                💻 {lang === 'kh' ? 'Laptop យួរដៃ' : 'Laptop'}
              </button>
              <button
                onClick={() => setCompSubFilter('all-in-one')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  compSubFilter === 'all-in-one'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🖥️ {lang === 'kh' ? 'All-in-One' : 'All-in-One'}
              </button>
              <button
                onClick={() => setCompSubFilter('gaming-pc')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  compSubFilter === 'gaming-pc'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🎮 {lang === 'kh' ? 'Gaming PC' : 'Gaming PC'}
              </button>

              <Link
                href={`/products?category=computers${compSubFilter !== 'all' ? `&subcategory=${compSubFilter}` : ''}`}
                className="text-xs font-bold text-[#0187ca] hover:text-[#0073ad] flex items-center space-x-0.5 ml-2 whitespace-nowrap btn-tactile"
              >
                <span>{lang === 'kh' ? 'មើលទាំងអស់' : 'See All'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div key={compSubFilter} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 animate-slide-up">
            {filteredComputerProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. ENTERPRISE NETWORKING & SECURITY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'kh' ? 'ឧបករណ៍ Network & Firewall សហគ្រាស' : 'Enterprise Networking & Security'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {lang === 'kh' ? 'Router, Switch, Wi-Fi 6 AP និង Next-Gen Firewall សម្រាប់ក្រុមហ៊ុន' : 'Enterprise routers, PoE switches, Wi-Fi 6 access points & firewalls'}
                </p>
              </div>
            </div>

            {/* Interactive Subfolder Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              <button
                onClick={() => setNetSubFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  netSubFilter === 'all'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'kh' ? 'ទាំងអស់' : 'All'}
              </button>
              <button
                onClick={() => setNetSubFilter('router')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  netSubFilter === 'router'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🌐 {lang === 'kh' ? 'Router' : 'Routers'}
              </button>
              <button
                onClick={() => setNetSubFilter('switch')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  netSubFilter === 'switch'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🔌 {lang === 'kh' ? 'Switch' : 'Switches'}
              </button>
              <button
                onClick={() => setNetSubFilter('access-point')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  netSubFilter === 'access-point'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                📡 {lang === 'kh' ? 'Wi-Fi AP' : 'Access Points'}
              </button>
              <button
                onClick={() => setNetSubFilter('firewall')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  netSubFilter === 'firewall'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🛡️ {lang === 'kh' ? 'Firewall' : 'Firewalls'}
              </button>

              <Link
                href={`/products?category=networking${netSubFilter !== 'all' ? `&subcategory=${netSubFilter}` : ''}`}
                className="text-xs font-bold text-[#0187ca] hover:text-[#0073ad] flex items-center space-x-0.5 ml-2 whitespace-nowrap btn-tactile"
              >
                <span>{lang === 'kh' ? 'មើលទាំងអស់' : 'See All'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div key={netSubFilter} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 animate-slide-up">
            {filteredNetworkProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRINTERS & OFFICE EQUIPMENT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'kh' ? 'ម៉ាស៊ីនព្រីន POS & ស្កេនវត្តមាន' : 'Printers, POS & Attendance'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {lang === 'kh' ? 'ម៉ាស៊ីនព្រីនពណ៌ Ink Tank, Laser, Barcode ដឹកទំនិញ និង Fingerprint' : 'High-volume ink tanks, mono lasers, barcode printers & biometric terminals'}
                </p>
              </div>
            </div>

            {/* Interactive Subfolder Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              <button
                onClick={() => setPrinterSubFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  printerSubFilter === 'all'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'kh' ? 'ទាំងអស់' : 'All'}
              </button>
              <button
                onClick={() => setPrinterSubFilter('ink-tank')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  printerSubFilter === 'ink-tank'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🖨️ {lang === 'kh' ? 'Ink Tank' : 'Ink Tank'}
              </button>
              <button
                onClick={() => setPrinterSubFilter('laser-printer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  printerSubFilter === 'laser-printer'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ⚡ {lang === 'kh' ? 'Laser' : 'Laser'}
              </button>
              <button
                onClick={() => setPrinterSubFilter('barcode-pos')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  printerSubFilter === 'barcode-pos'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🏷️ {lang === 'kh' ? 'Barcode & POS' : 'Barcode & POS'}
              </button>
              <button
                onClick={() => setPrinterSubFilter('attendance')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-tactile ${
                  printerSubFilter === 'attendance'
                    ? 'bg-[#0187ca] text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🕒 {lang === 'kh' ? 'ស្កេនវត្តមាន' : 'Attendance'}
              </button>

              <Link
                href={`/products?category=printers${printerSubFilter !== 'all' ? `&subcategory=${printerSubFilter}` : ''}`}
                className="text-xs font-bold text-[#0187ca] hover:text-[#0073ad] flex items-center space-x-0.5 ml-2 whitespace-nowrap btn-tactile"
              >
                <span>{lang === 'kh' ? 'មើលទាំងអស់' : 'See All'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div key={printerSubFilter} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 animate-slide-up">
            {filteredPrinterProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. TRUST BADGES & SERVICE GUARANTEES BAR */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0187ca] flex items-center space-x-3.5 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0187ca] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0187ca] transition-colors">
                {lang === 'kh' ? 'ទំនិញសុទ្ធ ១០០% ធានាផ្លូវការ' : '100% Genuine Products'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {lang === 'kh' ? 'ការធានាផ្លូវការ ១២-៦០ ខែ' : 'Official authorized warranty'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500 flex items-center space-x-3.5 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {lang === 'kh' ? 'ដឹកជញ្ជូនរហ័ស ២៥ ខេត្ត-ក្រុង' : 'Fast Delivery Across Cambodia'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {lang === 'kh' ? 'ភ្នំពេញ ១-២ ម៉ោង | ខេត្តតាមឡាន' : 'Phnom Penh 1-2h express'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-500 flex items-center space-x-3.5 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {lang === 'kh' ? 'ប្រឹក្សាបច្ចេកទេសឥតគិតថ្លៃ' : 'Free Technical Consulting'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {lang === 'kh' ? 'វិស្វករ IT ឆ្លើយតបរហ័ស' : 'Engineers ready on Telegram'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-500 flex items-center space-x-3.5 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {lang === 'kh' ? 'ទូទាត់ងាយស្រួល Bakong KHQR' : 'Easy Payment & KHQR'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {lang === 'kh' ? 'Scan KHQR, ABA Pay & COD' : 'Bakong KHQR, ABA Pay, COD'}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
