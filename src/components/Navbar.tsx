'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  Laptop, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Printer, 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  Send, 
  ChevronDown,
  FileText,
  Sparkles,
  ChevronRight,
  Layers,
  Heart
} from 'lucide-react';
import { categories } from '@/lib/data';

export default function Navbar() {
  const { lang, setLang, t, cartCount } = useStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string>('computers');

  const activeCategory = categories.find((c) => c.slug === hoveredCategory) || categories[0];

  const getCatIcon = (slug: string) => {
    switch (slug) {
      case 'computers': return <Laptop className="w-4 h-4 text-[#0187ca]" />;
      case 'components': return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 'networking': return <Network className="w-4 h-4 text-emerald-600" />;
      case 'security': return <ShieldCheck className="w-4 h-4 text-rose-600" />;
      case 'printers': return <Printer className="w-4 h-4 text-amber-600" />;
      default: return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* 1. TOP BAR (ICE STYLE: Clean light gray header with phone, social media, and language) */}
      <div className="bg-[#f1f5f9] border-b border-slate-200/80 px-4 py-1.5 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Hotline & Delivery */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:(+855)12345678" 
              className="flex items-center text-slate-800 hover:text-[#0187ca] font-medium transition"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-[#0187ca]" />
              <span>Hotline: (+855) 12 345 678 / 098 765 432</span>
            </a>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-500 font-khmer">
              {lang === 'kh' ? 'ដឹកជញ្ជូនរហ័ស ភ្នំពេញ & ២៥ ខេត្ត-ក្រុង' : 'Fast Delivery Across Phnom Penh & 25 Provinces'}
            </span>
          </div>

          {/* Social Media & Language */}
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-slate-500 text-[11px]">Social Media:</span>
            <div className="flex items-center space-x-2">
              <a 
                href="https://t.me/shinggg168" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Telegram (@shinggg168)"
                className="w-5 h-5 rounded-full bg-[#229ED9] text-white flex items-center justify-center hover:scale-110 transition"
              >
                <Send className="w-3 h-3" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Facebook"
                className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition font-bold text-[10px]"
              >
                f
              </a>
            </div>

            <span className="text-slate-300">|</span>

            {/* Language Switcher */}
            <div className="flex items-center bg-white rounded-md border border-slate-300 p-0.5 shadow-2xs">
              <button
                onClick={() => setLang('kh')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  lang === 'kh' 
                    ? 'bg-[#0187ca] text-white font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ខ្មែរ
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  lang === 'en' 
                    ? 'bg-[#0187ca] text-white font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Wide Centered Search, Action Buttons) */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#0187ca] flex items-center justify-center text-white font-black text-xl tracking-wider shadow-sm">
              NV
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  NV TECHNOLOGY
                </span>
                <span className="text-[10px] bg-sky-100 text-[#0187ca] font-bold px-1.5 py-0.5 rounded">
                  CAMBODIA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-khmer hidden sm:block">
                {lang === 'kh' ? 'កុំព្យូទ័រ • បណ្តាញ • សុវត្ថិភាព • IT Solutions' : 'Computer • Network • Security • IT Solutions'}
              </p>
            </div>
          </Link>

          {/* Prominent Wide Search Bar (ICE Style) */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative flex items-center group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search_placeholder}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-24 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-4 focus:ring-[#0187ca]/10 transition-all duration-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 group-focus-within:text-[#0187ca] transition-colors" />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-20 text-slate-400 hover:text-slate-600 p-1 rounded-full transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="submit"
                className="absolute right-1 px-4 py-1.5 bg-[#0187ca] hover:bg-[#0073ad] text-white font-semibold text-xs rounded-lg transition-all shadow-2xs btn-tactile"
              >
                {lang === 'kh' ? 'ស្វែងរក' : 'Search'}
              </button>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Custom PC Button */}
            <Link
              href="/custom-pc"
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 text-[#0187ca] hover:bg-sky-100 transition-all font-bold text-xs btn-tactile shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0187ca] animate-pulse" />
              <span className="font-khmer">{t.nav_custom_pc}</span>
            </Link>

            {/* RFQ Quote */}
            <Link
              href="/quotations"
              className="hidden xl:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 transition-all text-xs font-semibold font-khmer btn-tactile shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.request_quote}</span>
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl border border-slate-200 hover:border-[#0187ca] hover:text-[#0187ca] text-slate-700 bg-white transition-all flex items-center justify-center btn-tactile shadow-2xs"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#e11927] text-white text-[11px] font-black flex items-center justify-center shadow animate-pop">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 md:hidden text-slate-700 hover:bg-slate-100 btn-tactile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="mt-2.5 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-20 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca] focus:ring-2 focus:ring-[#0187ca]/10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 bg-[#0187ca] text-white font-bold text-xs rounded-lg btn-tactile"
            >
              {lang === 'kh' ? 'ស្វែងរក' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {/* 3. SUB-NAVIGATION BAR WITH "BROWSE CATEGORY" FLYOUT (ICE STYLE) */}
      <nav className="border-t border-slate-200 bg-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 py-1">
            {/* "Browse Category" Mega Menu with Subfolders */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold transition shadow-2xs font-khmer btn-tactile"
              >
                <Menu className="w-4 h-4" />
                <span>{lang === 'kh' ? 'គ្រប់ប្រភេទផលិតផល' : 'Browse Categories'}</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-[660px] bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 animate-slide-down flex overflow-hidden font-khmer ring-1 ring-black/5"
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                >
                  {/* Left Column: Categories List */}
                  <div className="w-60 border-r border-slate-100 p-2 space-y-0.5 bg-white">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {lang === 'kh' ? 'ផ្នែកផលិតផល' : 'Departments'}
                    </div>
                    {categories.map((cat) => {
                      const isHovered = hoveredCategory === cat.slug;
                      return (
                        <div
                          key={cat.id}
                          onMouseEnter={() => setHoveredCategory(cat.slug)}
                          onClick={() => {
                            router.push(`/products?category=${cat.slug}`);
                            setCategoriesDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition text-xs font-semibold ${
                            isHovered
                              ? 'bg-sky-50 text-[#0187ca] font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate">
                            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                              {getCatIcon(cat.slug)}
                            </span>
                            <span className="truncate">{lang === 'kh' ? cat.name_kh : cat.name_en}</span>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition ${isHovered ? 'text-[#0187ca] translate-x-0.5' : 'text-slate-300'}`} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Subfolders / Subcategories Grid */}
                  <div className="flex-1 p-5 bg-[#f8fafc]/70 flex flex-col justify-between">
                    <div>
                      {/* Active Category Header */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                            <span>{lang === 'kh' ? activeCategory.name_kh : activeCategory.name_en}</span>
                            <span className="text-[11px] text-slate-400 font-normal">
                              ({activeCategory.subcategories.length} {lang === 'kh' ? 'ប្រភេទរង' : 'subcategories'})
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {lang === 'kh' ? activeCategory.description_kh : activeCategory.description_en}
                          </p>
                        </div>
                        <Link
                          href={`/products?category=${activeCategory.slug}`}
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="text-xs font-bold text-[#0187ca] hover:text-[#0073ad] flex items-center space-x-0.5 whitespace-nowrap"
                        >
                          <span>{lang === 'kh' ? 'មើលទាំងអស់' : 'View All'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* Subcategories (Subfolders) Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {activeCategory.subcategories.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/products?category=${activeCategory.slug}&subcategory=${sub.slug}`}
                            onClick={() => setCategoriesDropdownOpen(false)}
                            className="p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-[#0187ca] hover:shadow-2xs hover:bg-sky-50/30 text-slate-700 hover:text-[#0187ca] transition group flex items-center justify-between"
                          >
                            <span className="text-xs font-medium group-hover:font-semibold truncate pr-1">
                              {lang === 'kh' ? sub.name_kh : sub.name_en}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0187ca] transition group-hover:translate-x-0.5 flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="pt-3 border-t border-slate-200/60 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{activeCategory.item_count || 0} products in this category</span>
                      <span className="text-[#0187ca] font-medium">Official authorized warranty 🇰🇭</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/" className="px-3 py-2 text-slate-700 hover:text-[#0187ca] font-medium font-khmer transition">
              {t.nav_home}
            </Link>
            <Link href="/products?category=computers" className="px-3 py-2 text-slate-700 hover:text-[#0187ca] font-medium font-khmer transition">
              {t.nav_computers}
            </Link>
            <Link href="/products?category=components" className="px-3 py-2 text-slate-700 hover:text-[#0187ca] font-medium font-khmer transition">
              {t.nav_components}
            </Link>
            <Link href="/products?category=networking" className="px-3 py-2 text-slate-700 hover:text-[#0187ca] font-medium font-khmer transition">
              {t.nav_networking}
            </Link>
            <Link href="/products?category=security" className="px-3 py-2 text-slate-700 hover:text-[#0187ca] font-medium font-khmer transition">
              {t.nav_security}
            </Link>
            <Link href="/products?category=printers" className="px-3 py-2 text-slate-700 hover:text-[#0187ca] font-medium font-khmer transition">
              {t.nav_printers}
            </Link>
            <Link href="/custom-pc" className="px-3 py-2 text-[#0187ca] hover:text-[#0073ad] font-bold font-khmer transition flex items-center space-x-1">
              <span>{t.nav_custom_pc}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0187ca] animate-pulse"></span>
            </Link>
            <Link href="/services" className="px-3 py-2 text-emerald-700 hover:text-emerald-800 font-bold font-khmer transition">
              {t.nav_services}
            </Link>
          </div>

          <div className="flex items-center space-x-3 py-1">
            <Link href="/admin" className="px-3 py-1.5 text-slate-500 hover:text-slate-800 font-mono text-[11px] bg-slate-100 border border-slate-200 rounded-md transition">
              ⚙️ Admin Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 font-khmer shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium"
            >
              🏠 {t.nav_home}
            </Link>
            <Link
              href="/custom-pc"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-[#0187ca] font-bold"
            >
              🛠️ {t.nav_custom_pc}
            </Link>
            <Link
              href="/products?category=computers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
            >
              💻 {t.nav_computers}
            </Link>
            <Link
              href="/products?category=components"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
            >
              🖥️ {t.nav_components}
            </Link>
            <Link
              href="/products?category=networking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
            >
              🌐 {t.nav_networking}
            </Link>
            <Link
              href="/products?category=security"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
            >
              🔥 {t.nav_security}
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold col-span-2"
            >
              🏢 {t.nav_services}
            </Link>
            <Link
              href="/quotations"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-semibold col-span-2"
            >
              📋 {t.request_quote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
