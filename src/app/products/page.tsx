'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { categories, brands } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, RotateCcw, ChevronDown, Check, Layers, Tag, X, Flame, DollarSign } from 'lucide-react';

function ProductsCatalogContent() {
  const { lang, t, products } = useStore();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get('category') || '';
  const urlSubcategory = searchParams.get('subcategory') || '';
  const urlBrand = searchParams.get('brand') || '';
  const urlQuery = searchParams.get('q') || '';
  const urlSort = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(urlSubcategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(urlBrand);
  const [searchQuery, setSearchQuery] = useState<string>(urlQuery);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [dealsOnly, setDealsOnly] = useState<boolean>(false);
  const [pricePreset, setPricePreset] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [pricingTypeFilter, setPricingTypeFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>(urlSort === 'newest' ? 'newest' : 'featured');

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);

  const normalizeKhmerSearch = (term: string): string[] => {
    const lower = term.toLowerCase().trim();
    const map: Record<string, string[]> = {
      'រ៉ោតទ័រ': ['router', 'mikrotik', 'ruijie', 'wifi', 'switch'],
      'រ៉ោតទ័រ ': ['router'],
      'បណ្តាញ': ['network', 'switch', 'router', 'poe', 'lan'],
      'កុំព្យូទ័រ': ['computer', 'laptop', 'desktop', 'thinkpad', 'dell', 'macbook'],
      'កុំព្យូទ័រយួរដៃ': ['laptop', 'thinkpad', 'dell', 'macbook'],
      'រ៉េម': ['ram', 'memory', 'corsair', 'kingston', 'ddr4', 'ddr5'],
      'ម៉ាស៊ីនព្រីន': ['printer', 'canon', 'epson', 'laser', 'inkjet'],
      'សុវត្ថិភាព': ['security', 'firewall', 'fortinet', 'vpn'],
      'ស្កេនមេដៃ': ['fingerprint', 'attendance', 'zkteco'],
      'ស្កេនមុខ': ['face', 'hikvision', 'attendance'],
    };

    if (map[lower]) {
      return [lower, ...map[lower]];
    }
    return [lower];
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchQuery.trim()) {
        const terms = normalizeKhmerSearch(searchQuery);
        const match = terms.some((term) => {
          return (
            p.name_en.toLowerCase().includes(term) ||
            p.name_kh.toLowerCase().includes(term) ||
            p.sku.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            (p.subcategory && p.subcategory.toLowerCase().includes(term)) ||
            p.short_desc_en.toLowerCase().includes(term) ||
            p.short_desc_kh.toLowerCase().includes(term)
          );
        });
        if (!match) return false;
      }

      if (selectedCategory && selectedCategory !== 'all') {
        if (p.category_slug !== selectedCategory) return false;
      }

      if (selectedSubcategory && selectedSubcategory !== 'all') {
        if (p.subcategory_slug !== selectedSubcategory) return false;
      }

      if (selectedBrand && selectedBrand !== 'all') {
        if (p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      if (inStockOnly && !p.in_stock) return false;

      if (dealsOnly && !p.is_deal && (!p.sale_price_usd || !p.price_usd || p.sale_price_usd >= p.price_usd)) {
        return false;
      }

      if (pricingTypeFilter !== 'all' && p.pricing_type !== pricingTypeFilter) {
        return false;
      }

      // Price filtering
      const itemPrice = p.sale_price_usd ?? p.price_usd ?? 0;
      if (pricePreset === 'under-100' && itemPrice >= 100) return false;
      if (pricePreset === '100-500' && (itemPrice < 100 || itemPrice > 500)) return false;
      if (pricePreset === '500-1000' && (itemPrice < 500 || itemPrice > 1000)) return false;
      if (pricePreset === 'over-1000' && itemPrice < 1000) return false;

      if (minPrice && !isNaN(Number(minPrice)) && itemPrice < Number(minPrice)) {
        return false;
      }
      if (maxPrice && !isNaN(Number(maxPrice)) && itemPrice > Number(maxPrice)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') {
        return (a.sale_price_usd ?? a.price_usd ?? 9999) - (b.sale_price_usd ?? b.price_usd ?? 9999);
      }
      if (sortOption === 'price-high') {
        return (b.sale_price_usd ?? b.price_usd ?? 0) - (a.sale_price_usd ?? a.price_usd ?? 0);
      }
      if (sortOption === 'newest') {
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      }
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedSubcategory, selectedBrand, inStockOnly, dealsOnly, pricePreset, minPrice, maxPrice, pricingTypeFilter, sortOption]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedBrand('');
    setSearchQuery('');
    setInStockOnly(false);
    setDealsOnly(false);
    setPricePreset('all');
    setMinPrice('');
    setMaxPrice('');
    setPricingTypeFilter('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 font-khmer">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900">
            {lang === 'kh' ? 'កាតាឡុកផលិតផលទាំងអស់' : 'Product Catalog'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'kh'
              ? `បង្ហាញចំនួន ${filteredProducts.length} ផលិតផលដែលឆ្លើយតបនឹងការស្វែងរក`
              : `Showing ${filteredProducts.length} items available`}
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:border-[#0187ca]"
          >
            <option value="featured">{lang === 'kh' ? 'ផលិតផលពេញនិយម' : 'Featured Products'}</option>
            <option value="price-low">{lang === 'kh' ? 'តម្លៃ៖ ទាបទៅខ្ពស់' : 'Price: Low to High'}</option>
            <option value="price-high">{lang === 'kh' ? 'តម្លៃ៖ ខ្ពស់ទៅទាប' : 'Price: High to Low'}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar Filters (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase">
              <Filter className="w-4 h-4 text-[#0187ca]" />
              <span>{t.filter}</span>
            </div>
            <button
              onClick={resetFilters}
              className="group text-[11px] text-slate-500 hover:text-[#0187ca] flex items-center space-x-1.5 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3 transition-transform duration-500 group-hover:-rotate-180" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {lang === 'kh' ? 'ស្វែងរកឈ្មោះ ឬម៉ូឌែល' : 'Search Keywords'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Desktop, ThinkPad, AIO, Switch..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 pl-8 pr-7 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca] focus:ring-2 focus:ring-[#0187ca]/20 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
                >
                  <span className="text-xs font-bold leading-none block px-1">×</span>
                </button>
              )}
            </div>
          </div>

          {/* Categories & Subfolders Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              {t.filter_by_category}
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedSubcategory('');
                }}
                className={`btn-tactile w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                  selectedCategory === '' 
                    ? 'bg-[#0187ca] text-white font-bold shadow-sm shadow-[#0187ca]/30' 
                    : 'text-slate-600 hover:bg-slate-100/80 active:scale-[0.99]'
                }`}
              >
                <span>{lang === 'kh' ? 'ទាំងអស់ (All Categories)' : 'All Categories'}</span>
                {selectedCategory === '' && <Check className="w-3.5 h-3.5" />}
              </button>
              {categories.map((c) => {
                const isCatSelected = selectedCategory === c.slug;
                return (
                  <div key={c.id} className="space-y-0.5">
                    <button
                      onClick={() => {
                        setSelectedCategory(c.slug);
                        setSelectedSubcategory('');
                      }}
                      className={`btn-tactile w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                        isCatSelected
                          ? 'bg-[#0187ca] text-white font-bold shadow-sm shadow-[#0187ca]/30'
                          : 'text-slate-700 hover:bg-slate-100/80 active:scale-[0.99]'
                      }`}
                    >
                      <span className="truncate">{lang === 'kh' ? c.name_kh : c.name_en}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                        isCatSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {c.item_count}
                      </span>
                    </button>

                    {/* Subcategories (Subfolders) */}
                    {isCatSelected && c.subcategories.length > 0 && (
                      <div className="pl-3 py-1 space-y-1 border-l-2 border-sky-300 ml-3 my-1 animate-slide-down">
                        <button
                          onClick={() => setSelectedSubcategory('')}
                          className={`btn-tactile w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all flex items-center justify-between ${
                            selectedSubcategory === ''
                              ? 'text-[#0187ca] font-bold bg-sky-50 shadow-2xs border border-sky-200'
                              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                          }`}
                        >
                          <span>• {lang === 'kh' ? `ទាំងអស់ក្នុង ${c.name_kh}` : `All in ${c.name_en}`}</span>
                          {selectedSubcategory === '' && <span className="w-1.5 h-1.5 rounded-full bg-[#0187ca]" />}
                        </button>
                        {c.subcategories.map((sub) => (
                          <button
                            key={sub.slug}
                            onClick={() => setSelectedSubcategory(sub.slug)}
                            className={`btn-tactile w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all flex items-center justify-between ${
                              selectedSubcategory === sub.slug
                                ? 'text-[#0187ca] font-bold bg-sky-50 shadow-2xs border border-sky-200'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                            }`}
                          >
                            <span>• {lang === 'kh' ? sub.name_kh : sub.name_en}</span>
                            {selectedSubcategory === sub.slug && <span className="w-1.5 h-1.5 rounded-full bg-[#0187ca]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              {t.filter_by_brand}
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca] focus:ring-2 focus:ring-[#0187ca]/20 transition-all cursor-pointer"
            >
              <option value="">{lang === 'kh' ? 'គ្រប់ម៉ាកទាំងអស់ (All Brands)' : 'All Brands'}</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Pricing Model Filter - Interactive Option Cards */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              {lang === 'kh' ? 'ទម្រង់ការទិញ' : 'Purchasing Mode'}
            </label>
            <div className="space-y-1.5 text-xs">
              <button
                type="button"
                onClick={() => setPricingTypeFilter('all')}
                className={`btn-tactile w-full text-left px-3 py-2 rounded-xl border transition-all flex items-center justify-between ${
                  pricingTypeFilter === 'all'
                    ? 'border-[#0187ca] bg-sky-50/70 text-[#0187ca] font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{lang === 'kh' ? 'ទាំងអស់ (All)' : 'All Products'}</span>
                {pricingTypeFilter === 'all' && <Check className="w-3.5 h-3.5 text-[#0187ca]" />}
              </button>

              <button
                type="button"
                onClick={() => setPricingTypeFilter('buy_now')}
                className={`btn-tactile w-full text-left px-3 py-2 rounded-xl border transition-all flex items-center justify-between ${
                  pricingTypeFilter === 'buy_now'
                    ? 'border-[#0187ca] bg-sky-50 text-[#0187ca] font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>🛒 {lang === 'kh' ? 'ទិញភ្លាម (Buy Now)' : 'Buy Now'}</span>
                {pricingTypeFilter === 'buy_now' && <Check className="w-3.5 h-3.5 text-[#0187ca]" />}
              </button>

              <button
                type="button"
                onClick={() => setPricingTypeFilter('request_quote')}
                className={`btn-tactile w-full text-left px-3 py-2 rounded-xl border transition-all flex items-center justify-between ${
                  pricingTypeFilter === 'request_quote'
                    ? 'border-amber-500 bg-amber-50 text-amber-800 font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>📞 {lang === 'kh' ? 'សួរតម្លៃ (RFQ)' : 'Request Quote'}</span>
                {pricingTypeFilter === 'request_quote' && <Check className="w-3.5 h-3.5 text-amber-700" />}
              </button>

              <button
                type="button"
                onClick={() => setPricingTypeFilter('request_solution')}
                className={`btn-tactile w-full text-left px-3 py-2 rounded-xl border transition-all flex items-center justify-between ${
                  pricingTypeFilter === 'request_solution'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>🛠️ {lang === 'kh' ? 'សេវាកម្ម (Solutions)' : 'Request Solution'}</span>
                {pricingTypeFilter === 'request_solution' && <Check className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center space-x-1">
              <DollarSign className="w-3.5 h-3.5 text-[#0187ca]" />
              <span>{lang === 'kh' ? 'កម្រិតតម្លៃ (USD)' : 'Price Range'}</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => setPricePreset('all')}
                className={`py-1.5 px-2 rounded-lg border text-center transition btn-tactile ${
                  pricePreset === 'all'
                    ? 'bg-sky-50 border-[#0187ca] text-[#0187ca] font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {lang === 'kh' ? 'គ្រប់តម្លៃ' : 'All Prices'}
              </button>
              <button
                type="button"
                onClick={() => setPricePreset('under-100')}
                className={`py-1.5 px-2 rounded-lg border text-center transition btn-tactile ${
                  pricePreset === 'under-100'
                    ? 'bg-sky-50 border-[#0187ca] text-[#0187ca] font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                &lt; $100
              </button>
              <button
                type="button"
                onClick={() => setPricePreset('100-500')}
                className={`py-1.5 px-2 rounded-lg border text-center transition btn-tactile ${
                  pricePreset === '100-500'
                    ? 'bg-sky-50 border-[#0187ca] text-[#0187ca] font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                $100 - $500
              </button>
              <button
                type="button"
                onClick={() => setPricePreset('500-1000')}
                className={`py-1.5 px-2 rounded-lg border text-center transition btn-tactile ${
                  pricePreset === '500-1000'
                    ? 'bg-sky-50 border-[#0187ca] text-[#0187ca] font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                $500 - $1K
              </button>
            </div>

            {/* Custom Min/Max Inputs */}
            <div className="flex items-center space-x-2 pt-1 text-xs">
              <input
                type="number"
                placeholder="Min $"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPricePreset('custom');
                }}
                className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca]"
              />
              <span className="text-slate-400">-</span>
              <input
                type="number"
                placeholder="Max $"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPricePreset('custom');
                }}
                className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0187ca]"
              />
            </div>
          </div>

          {/* Deals & Stock Filter */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => setDealsOnly(!dealsOnly)}
              className={`btn-tactile w-full text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                dealsOnly
                  ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>{lang === 'kh' ? 'តែទំនិញបញ្ចុះតម្លៃ (Deals Only)' : 'Flash Deals Only'}</span>
              </span>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                dealsOnly ? 'bg-rose-600 text-white' : 'border border-slate-300'
              }`}>
                {dealsOnly ? '✓' : ''}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`btn-tactile w-full text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                inStockOnly
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>{lang === 'kh' ? 'តែទំនិញមានក្នុងស្តុក' : 'In Stock Only'}</span>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                inStockOnly ? 'bg-emerald-600 text-white' : 'border border-slate-300'
              }`}>
                {inStockOnly ? '✓' : ''}
              </span>
            </button>
          </div>
        </div>

        {/* Right Catalog Grid (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          {/* Active Filters Dismissible Badges */}
          {(selectedCategory || selectedSubcategory || selectedBrand || searchQuery || inStockOnly || dealsOnly || pricePreset !== 'all' || minPrice || maxPrice || pricingTypeFilter !== 'all') && (
            <div className="p-3 bg-white border border-slate-200/90 rounded-2xl shadow-2xs flex flex-wrap items-center gap-1.5 text-xs animate-slide-down">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Active:</span>

              {selectedCategory && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sky-50 text-[#0187ca] font-medium border border-sky-200 text-[11px]">
                  <span>Cat: {categories.find((c) => c.slug === selectedCategory)?.name_en || selectedCategory}</span>
                  <button onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); }}>
                    <X className="w-3 h-3 hover:text-slate-900" />
                  </button>
                </span>
              )}

              {selectedSubcategory && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sky-50 text-[#0187ca] font-medium border border-sky-200 text-[11px]">
                  <span>Sub: {selectedSubcategory}</span>
                  <button onClick={() => setSelectedSubcategory('')}>
                    <X className="w-3 h-3 hover:text-slate-900" />
                  </button>
                </span>
              )}

              {selectedBrand && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-medium border border-purple-200 text-[11px]">
                  <span>Brand: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand('')}>
                    <X className="w-3 h-3 hover:text-slate-900" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-medium border border-amber-200 text-[11px]">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 hover:text-slate-900" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium border border-emerald-200 text-[11px]">
                  <span>In Stock</span>
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3 h-3 hover:text-slate-900" />
                  </button>
                </span>
              )}

              {dealsOnly && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-medium border border-rose-200 text-[11px]">
                  <span>Deals Only</span>
                  <button onClick={() => setDealsOnly(false)}>
                    <X className="w-3 h-3 hover:text-slate-900" />
                  </button>
                </span>
              )}

              {pricePreset !== 'all' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200 text-[11px]">
                  <span>Price: {pricePreset}</span>
                  <button onClick={() => { setPricePreset('all'); setMinPrice(''); setMaxPrice(''); }}>
                    <X className="w-3 h-3 hover:text-slate-900" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-[11px] text-[#0187ca] hover:underline font-bold ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Subfolders Pills Bar (When a category is active) */}
          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="p-3 bg-white border border-slate-200/90 rounded-2xl shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none no-scrollbar">
              <div className="text-xs font-bold text-slate-400 flex items-center space-x-1 pl-1 pr-2 border-r border-slate-200 flex-shrink-0">
                <Layers className="w-3.5 h-3.5 text-[#0187ca]" />
                <span>{lang === 'kh' ? 'ប្រភេទរង' : 'Subcategory'}:</span>
              </div>
              <button
                onClick={() => setSelectedSubcategory('')}
                className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedSubcategory === ''
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'kh' ? 'ទាំងអស់' : 'All'}
              </button>
              {activeCategoryObj.subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() => setSelectedSubcategory(sub.slug)}
                  className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedSubcategory === sub.slug
                      ? 'bg-[#0187ca] text-white shadow-sm shadow-[#0187ca]/30'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-[#0187ca] hover:text-[#0187ca]'
                  }`}
                >
                  {lang === 'kh' ? sub.name_kh : sub.name_en}
                </button>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3 animate-slide-up">
              <Layers className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {t.no_products_found}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {lang === 'kh'
                  ? 'សូមសាកល្បងស្វែងរកដោយពាក្យគន្លឹះផ្សេង ឬកំណត់តម្រងចម្រាញ់ឡើងវិញ។'
                  : 'Try searching with different terms or resetting your category/brand filters.'}
              </p>
              <button
                onClick={resetFilters}
                className="btn-tactile px-4 py-2 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs shadow-xs transition"
              >
                {lang === 'kh' ? 'សម្អាតតម្រងទាំងអស់' : 'Clear Filters'}
              </button>
            </div>
          ) : (
            <div
              key={`${selectedCategory}-${selectedSubcategory}-${selectedBrand}-${pricingTypeFilter}-${sortOption}-${searchQuery}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 animate-slide-up"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">Loading Products...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
