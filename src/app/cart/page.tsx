'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  CheckCircle2, 
  QrCode, 
  Truck, 
  Tag, 
  ShieldCheck, 
  Building, 
  CreditCard,
  Sparkles,
  Check
} from 'lucide-react';

const CAMBODIA_PROVINCES = [
  'រាជធានីភ្នំពេញ (Phnom Penh)',
  'ខេត្តកណ្តាល (Kandal)',
  'ខេត្តសៀមរាប (Siem Reap)',
  'ខេត្តបាត់ដំបង (Battambang)',
  'ខេត្តព្រះសីហនុ (Preah Sihanouk)',
  'ខេត្តកំពង់ចាម (Kampong Cham)',
  'ខេត្តកំពត (Kampot)',
  'ខេត្តតាកែវ (Takeo)',
  'ខេត្តបន្ទាយមានជ័យ (Banteay Meanchey)',
  'ខេត្តកំពង់ធំ (Kampong Thom)',
  'ខេត្តស្វាយរៀង (Svay Rieng)',
  'ខេត្តព្រៃវែង (Prey Veng)',
  'ខេត្តពោធិ៍សាត់ (Pursat)',
  'ខេត្តកំពង់ឆ្នាំង (Kampong Chhnang)',
  'ខេត្តកំពង់ស្ពឺ (Kampong Speu)',
  'ខេត្តកោះកុង (Koh Kong)',
  'ខេត្តកែប (Kep)',
  'ខេត្តប៉ៃលិន (Pailin)',
  'ខេត្តព្រះវិហារ (Preah Vihear)',
  'ខេត្តស្ទឹងត្រែង (Stung Treng)',
  'ខេត្តរតនគិរី (Ratanakiri)',
  'ខេត្តមណ្ឌលគិរី (Mondulkiri)',
  'ខេត្តក្រចេះ (Kratie)',
  'ខេត្តឧត្តរមានជ័យ (Oddar Meanchey)',
  'ខេត្តត្បូងឃ្មុំ (Tboung Khmum)',
];

export default function CartPage() {
  const { lang, t, cart, updateCartQuantity, removeFromCart, clearCart, cartTotal, openKhqrModal } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    province: CAMBODIA_PROVINCES[0],
    address: '',
    deliveryMethod: 'express', // 'express' | 'province'
    paymentMethod: 'khqr', // 'khqr' | 'cod' | 'transfer'
    orderNotes: '',
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');

  // Shipping cost calculation
  const shippingFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (formData.deliveryMethod === 'express') {
      return cartTotal >= 50 ? 0 : 1.5;
    }
    return 2.5; // Provincial Logistics
  }, [formData.deliveryMethod, cartTotal, cart.length]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return appliedPromo.discount;
  }, [appliedPromo]);

  const finalTotal = Math.max(0, cartTotal + shippingFee - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'NVTECH' || clean === 'NV10') {
      setAppliedPromo({ code: clean, discount: 10 });
    } else if (clean === 'NV5') {
      setAppliedPromo({ code: clean, discount: Math.round(cartTotal * 0.05) });
    } else {
      setPromoError(lang === 'kh' ? 'កូដមិនត្រឹមត្រូវ។ សាកល្បង NVTECH ឬ NV5' : 'Invalid promo code. Try NVTECH or NV5');
    }
  };

  const saveOrderToStorage = (orderNumber: string, method: string) => {
    try {
      const existing = localStorage.getItem('nv_orders');
      const orderList = existing ? JSON.parse(existing) : [];
      const newOrder = {
        id: orderNumber,
        customer: formData.name,
        phone: formData.phone,
        telegram: formData.telegram,
        province: formData.province,
        address: formData.address,
        total: Math.round(finalTotal),
        status: method === 'khqr' ? 'paid' : 'pending',
        method: method === 'khqr' ? 'KHQR' : method === 'cod' ? 'COD' : 'Bank Transfer',
        items: cart.map((i) => `${i.product.name_en} x${i.quantity}`).join(', '),
        date: 'Just now',
      };
      orderList.unshift(newOrder);
      localStorage.setItem('nv_orders', JSON.stringify(orderList));
      window.dispatchEvent(new CustomEvent('nv_orders_updated'));
    } catch (e) {
      console.error('Failed to save order to localStorage:', e);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `NVO-${Date.now().toString().slice(-4)}`;
    setConfirmedOrderNumber(orderNumber);

    saveOrderToStorage(orderNumber, formData.paymentMethod);

    if (formData.paymentMethod === 'khqr') {
      openKhqrModal({
        order_number: orderNumber,
        total_usd: finalTotal,
        customer_name: formData.name,
      });
    } else {
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-khmer">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 mx-auto flex items-center justify-center shadow-inner">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">{t.cart_empty}</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {lang === 'kh'
            ? 'មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយទេ។ សូមជ្រើសរើសទំនិញដែលអ្នកពេញចិត្ត។'
            : 'Explore our catalog for genuine computer hardware, networking gear, and accessories.'}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'kh' ? 'ទៅកាន់ទំព័រផលិតផល' : 'Continue Shopping'}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 font-khmer">
      <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {t.cart_title}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'kh' ? `មានទំនិញ ${cart.length} មុខក្នុងកន្ត្រក` : `${cart.length} unique items in your basket`}
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center space-x-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{lang === 'kh' ? 'សម្អាតកន្ត្រក' : 'Clear Basket'}</span>
          </button>
        )}
      </div>

      {orderPlaced ? (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-xl animate-slide-up">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 animate-pop">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">{t.order_success}</h2>
          <div className="text-xs text-slate-600 leading-relaxed space-y-1">
            <p className="font-semibold text-slate-800">
              {lang === 'kh' ? `លេខកូដបញ្ជាទិញ៖ #${confirmedOrderNumber}` : `Order Code: #${confirmedOrderNumber}`}
            </p>
            <p>
              {lang === 'kh'
                ? `អរគុណ ${formData.name}។ ការបញ្ជាទិញត្រូវបានកត់ត្រាក្នុងប្រព័ន្ធ។ ក្រុមការងារដឹកជញ្ជូននឹងទូរស័ព្ទទៅ ${formData.phone} មុនពេលដឹកជញ្ជូន។`
                : `Thank you ${formData.name}. Your order has been placed successfully. Logistics will contact ${formData.phone} before delivery.`}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block px-6 py-2.5 rounded-xl bg-[#0187ca] text-white font-bold text-xs shadow-md shadow-sky-500/20 btn-tactile"
            >
              {lang === 'kh' ? 'ត្រឡប់ទៅទំព័រដើម' : 'Back to Home'}
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cart Items List (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="space-y-2.5">
              {cart.map((item) => {
                const itemId = item.id || item.product.id;
                const basePrice = item.product.sale_price_usd ?? item.product.price_usd ?? 0;
                const unitPrice = basePrice + (item.options?.extraPriceUsd || 0);
                const lineTotal = unitPrice * item.quantity;

                return (
                  <div
                    key={itemId}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#0187ca] hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs animate-slide-up"
                  >
                    <div className="flex items-start space-x-3.5 min-w-0">
                      <div className="w-16 h-16 rounded-xl bg-slate-50 p-1.5 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name_en}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-[#0187ca] font-bold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                          {item.product.brand}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 truncate mt-1">
                          {lang === 'kh' ? item.product.name_kh : item.product.name_en}
                        </h3>

                        {/* Selected Options Badges */}
                        {item.options && (
                          <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-500">
                            {item.options.ram && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono">
                                RAM: {item.options.ram}
                              </span>
                            )}
                            {item.options.storage && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono">
                                SSD: {item.options.storage}
                              </span>
                            )}
                            {item.options.color && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-100">
                                {item.options.color}
                              </span>
                            )}
                            {item.options.warranty && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                                {item.options.warranty}
                              </span>
                            )}
                            {item.options.accessory && (
                              <span className="px-1.5 py-0.5 rounded bg-sky-50 text-[#0187ca] border border-sky-100">
                                {item.options.accessory}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-baseline space-x-2 mt-1">
                          <span className="text-xs font-black text-[#0187ca]">${unitPrice.toFixed(0)}</span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              (${lineTotal.toFixed(0)} total)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5 text-xs">
                        <button
                          onClick={() => updateCartQuantity(itemId, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition btn-tactile flex items-center justify-center font-bold"
                          title="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-mono font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(itemId, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition btn-tactile flex items-center justify-center font-bold"
                          title="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition btn-tactile"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-[#0187ca]" />
                <span>{lang === 'kh' ? 'កូដបញ្ចុះតម្លៃ (Promo Code):' : 'Promo / Discount Code:'}</span>
              </label>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. NVTECH or NV5"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs uppercase font-mono text-slate-800 focus:outline-none focus:border-[#0187ca]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition"
                >
                  {lang === 'kh' ? 'ប្រើកូដ' : 'Apply'}
                </button>
              </form>

              {appliedPromo && (
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'kh' ? `បានបញ្ចុះតម្លៃ $${appliedPromo.discount} ដោយជោគជ័យ!` : `Promo code ${appliedPromo.code} applied (-$${appliedPromo.discount})`}
                  </span>
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-rose-600 font-semibold">
                  {promoError}
                </div>
              )}
            </div>

            {/* Subtotal & Summary card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs shadow-2xs">
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'kh' ? 'តម្លៃទំនិញសរុប (Subtotal):' : 'Cart Subtotal:'}</span>
                <span className="font-mono font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'kh' ? 'សេវាដឹកជញ្ជូន (Delivery):' : 'Shipping Fee:'}</span>
                <span className="font-mono font-bold text-slate-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">{lang === 'kh' ? 'ឥតគិតថ្លៃ (Free)' : 'FREE'}</span>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>{lang === 'kh' ? 'បញ្ចុះតម្លៃ (Discount):' : 'Promo Discount:'}</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-slate-900 font-black">
                <span className="text-sm">{lang === 'kh' ? 'ទឹកប្រាក់ត្រូវទូទាត់សរុប:' : 'Grand Total:'}</span>
                <span className="text-xl text-[#0187ca] font-mono">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout & Delivery Form (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center justify-between">
              <span>{lang === 'kh' ? 'ព័ត៌មានដឹកជញ្ជូន និងការទូទាត់' : 'Delivery & Payment Information'}</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL Encrypted</span>
              </span>
            </h3>

            <form onSubmit={handleCheckout} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.full_name} *</label>
                <input
                  type="text"
                  required
                  placeholder="ឧ. ហេង វណ្ណា"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.phone_number} *</label>
                  <input
                    type="tel"
                    required
                    placeholder="012 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.telegram_username}</label>
                  <input
                    type="text"
                    placeholder="@username"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                  />
                </div>
              </div>

              {/* Delivery Options */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  {lang === 'kh' ? 'ជម្រើសដឹកជញ្ជូន (Delivery Options)' : 'Delivery Options'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`p-2.5 rounded-xl border cursor-pointer transition text-left ${
                    formData.deliveryMethod === 'express'
                      ? 'bg-sky-50 border-[#0187ca] ring-2 ring-[#0187ca]/20 font-bold text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                      className="sr-only"
                    />
                    <div className="text-[11px]">ភ្នំពេញ Express (2 ម៉ោង)</div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      {cartTotal >= 50 ? 'ឥតគិតថ្លៃ (Free)' : '$1.50'}
                    </div>
                  </label>

                  <label className={`p-2.5 rounded-xl border cursor-pointer transition text-left ${
                    formData.deliveryMethod === 'province'
                      ? 'bg-sky-50 border-[#0187ca] ring-2 ring-[#0187ca]/20 font-bold text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="province"
                      checked={formData.deliveryMethod === 'province'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'province' })}
                      className="sr-only"
                    />
                    <div className="text-[11px]">ផ្ញើតាមខេត្ត (VET / J&T)</div>
                    <div className="text-[10px] text-slate-500 font-normal">$2.50 Doorstep</div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.delivery_province}</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition cursor-pointer"
                >
                  {CAMBODIA_PROVINCES.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.delivery_address} *</label>
                <textarea
                  rows={2}
                  required
                  placeholder={lang === 'kh' ? 'ផ្ទះលេខ ផ្លូវ សង្កាត់ ខណ្ឌ ឬចំណុចសម្គាល់...' : 'House number, street, landmark...'}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white focus:ring-2 focus:ring-[#0187ca]/15 transition"
                ></textarea>
              </div>

              {/* Order Notes Option */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {lang === 'kh' ? 'កំណត់ចំណាំបន្ថែម (Order Notes)' : 'Order Notes (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'kh' ? 'ឧ. សូមទូរស័ព្ទមុនដឹក ឬដឹកនៅពេលរសៀល...' : 'e.g. Call before delivery, afternoon delivery preferred...'}
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white transition"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">{t.payment_method}</label>
                <div className="space-y-2">
                  <label className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all duration-150 btn-tactile ${
                    formData.paymentMethod === 'khqr'
                      ? 'bg-rose-50/80 border-[#E11927] text-slate-900 ring-2 ring-[#E11927]/15 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="khqr"
                      checked={formData.paymentMethod === 'khqr'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'khqr' })}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div className="flex-1">
                      <div className="font-black flex items-center space-x-1.5 text-xs text-rose-700">
                        <QrCode className="w-4 h-4 text-rose-600" />
                        <span>Bakong KHQR (ទូទាត់ភ្លាមៗ)</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Scan via ABA, Wing, Acleda, Canadia, Bakong...</div>
                    </div>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all duration-150 btn-tactile ${
                    formData.paymentMethod === 'cod'
                      ? 'bg-sky-50/80 border-[#0187ca] text-slate-900 ring-2 ring-[#0187ca]/15 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="text-[#0187ca] focus:ring-[#0187ca]"
                    />
                    <div className="flex-1">
                      <div className="font-bold flex items-center space-x-1.5 text-xs text-slate-800">
                        <Truck className="w-4 h-4 text-[#0187ca]" />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                      <div className="text-[10px] text-slate-500">ទូទាត់ប្រាក់នៅពេលទំនិញមកដល់ដៃ</div>
                    </div>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all duration-150 btn-tactile ${
                    formData.paymentMethod === 'transfer'
                      ? 'bg-emerald-50/80 border-emerald-600 text-slate-900 ring-2 ring-emerald-500/15 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="font-bold flex items-center space-x-1.5 text-xs text-emerald-800">
                        <CreditCard className="w-4 h-4 text-emerald-600" />
                        <span>ABA / Wing Bank Direct Transfer</span>
                      </div>
                      <div className="text-[10px] text-slate-500">ផ្ទេរប្រាក់ដោយផ្ទាល់ទៅគណនីធនាគាររបស់ NV Technology</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">{lang === 'kh' ? 'ទឹកប្រាក់ត្រូវទូទាត់សរុប' : 'Total Payable'}</span>
                  <span className="text-2xl font-black text-[#0187ca] font-mono">${finalTotal.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs transition shadow-md shadow-sky-500/20 btn-tactile"
                >
                  {formData.paymentMethod === 'khqr'
                    ? (lang === 'kh' ? 'បង្ហាញ Bakong KHQR ដើម្បីទូទាត់' : 'Generate Bakong KHQR')
                    : formData.paymentMethod === 'cod'
                    ? (lang === 'kh' ? 'បញ្ជាក់ការបញ្ជាទិញ (COD)' : 'Confirm Order (COD)')
                    : (lang === 'kh' ? 'បញ្ជាក់ការផ្ទេរប្រាក់តាមធនាគារ' : 'Confirm Bank Transfer Order')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
