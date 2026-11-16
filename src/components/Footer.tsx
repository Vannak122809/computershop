'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { MapPin, Phone, Mail, Send, Facebook, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export default function Footer() {
  const { lang } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      {/* 4 Feature Badges */}
      <div className="border-b border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="group flex items-center space-x-3 transition-transform duration-300 hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold font-khmer group-hover:text-sky-300 transition-colors">
                {lang === 'kh' ? 'ទំនិញសុទ្ធ ១០០% ធានាផ្លូវការ' : '100% Genuine Products'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'kh' ? 'នាំចូលផ្ទាល់ពីក្រុមហ៊ុនធំៗ' : 'Official brand authorized warranty'}
              </p>
            </div>
          </div>

          <div className="group flex items-center space-x-3 transition-transform duration-300 hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold font-khmer group-hover:text-emerald-300 transition-colors">
                {lang === 'kh' ? 'ដឹកជញ្ជូនរហ័ស ២៥ ខេត្ត-ក្រុង' : 'Fast Delivery Cambodia'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'kh' ? 'ភ្នំពេញ ១-២ ម៉ោង | ខេត្តតាមរថយន្តឈ្នួល' : 'Phnom Penh 1-2h fast express'}
              </p>
            </div>
          </div>

          <div className="group flex items-center space-x-3 transition-transform duration-300 hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold font-khmer group-hover:text-cyan-300 transition-colors">
                {lang === 'kh' ? 'ប្រឹក្សាយោបល់ឥតគិតថ្លៃ' : 'Free Technical Consulting'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'kh' ? 'ឆ្លើយតប ២៤/៧ តាម Telegram' : 'Engineers ready to assist'}
              </p>
            </div>
          </div>

          <div className="group flex items-center space-x-3 transition-transform duration-300 hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <RotateCcw className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-90" />
            </div>
            <div>
              <h4 className="text-white font-bold font-khmer group-hover:text-amber-300 transition-colors">
                {lang === 'kh' ? 'សេវាកម្មជួសជុល & ថែទាំ' : 'Repair & Maintenance SLA'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'kh' ? 'Onsite Support ដល់ក្រុមហ៊ុន' : 'Onsite corporate maintenance'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Branches */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0187ca] text-white flex items-center justify-center font-black text-sm">
              NV
            </div>
            <span className="text-base font-extrabold text-white">NV TECHNOLOGY CAMBODIA</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-khmer max-w-sm">
            {lang === 'kh'
              ? 'NV Technology — គ្រប់ដំណោះស្រាយបច្ចេកវិទ្យានៅកន្លែងតែមួយ។ ផ្គត់ផ្គង់កុំព្យូទ័រ គ្រឿងបន្លាស់ ឧបករណ៍បណ្តាញ Network, Security Firewall, ម៉ាស៊ីនព្រីន និង IT Solutions ឈានមុខគេនៅកម្ពុជា។'
              : 'NV Technology — Leading supplier of enterprise networking, computers, components, firewalls, and business IT solutions across Cambodia.'}
          </p>

          <div className="space-y-1.5 text-[11px] pt-1 text-slate-300">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-[#0187ca] flex-shrink-0 mt-0.5" />
              <span>
                {lang === 'kh' 
                  ? 'សាខាទី១ (Olympia City)៖ Unit S5-12, Street 161, Sangkat Veal Vong, Khan 7 Makara, Phnom Penh'
                  : 'Branch 1: Olympia City Branch, Street 161, Phnom Penh, Cambodia'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#0187ca] flex-shrink-0" />
              <span>(+855) 12 345 678 / 098 765 432</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#0187ca] flex-shrink-0" />
              <span>sales@nvtechnology.com.kh</span>
            </div>
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4 text-[#0187ca] flex-shrink-0" />
              <a href="https://t.me/shinggg168" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition font-medium">
                Telegram: @shinggg168
              </a>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2.5 font-khmer">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
            {lang === 'kh' ? 'ផ្នែកផលិតផល' : 'Categories'}
          </h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li><Link href="/products?category=computers" className="hover:text-[#0187ca] transition">Laptop & Desktop</Link></li>
            <li><Link href="/products?category=components" className="hover:text-[#0187ca] transition">CPU, RAM, SSD, GPU</Link></li>
            <li><Link href="/products?category=networking" className="hover:text-[#0187ca] transition">MikroTik Router & Switch</Link></li>
            <li><Link href="/products?category=security" className="hover:text-[#0187ca] transition">Fortinet Firewall & VPN</Link></li>
            <li><Link href="/products?category=printers" className="hover:text-[#0187ca] transition">Epson & Canon Printers</Link></li>
            <li><Link href="/products?category=attendance" className="hover:text-[#0187ca] transition">Fingerprint Attendance</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-2.5 font-khmer">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
            {lang === 'kh' ? 'សេវាកម្ម IT' : 'IT Services'}
          </h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li><Link href="/services#network-installation" className="hover:text-[#0187ca] transition">Network Installation</Link></li>
            <li><Link href="/services#wifi-solutions" className="hover:text-[#0187ca] transition">Enterprise Wi-Fi Roaming</Link></li>
            <li><Link href="/services#firewall-vpn" className="hover:text-[#0187ca] transition">Firewall & VPN Security</Link></li>
            <li><Link href="/services#server-setup" className="hover:text-[#0187ca] transition">Server & Auto Backup</Link></li>
            <li><Link href="/services#attendance-systems" className="hover:text-[#0187ca] transition">Door Access Control</Link></li>
            <li><Link href="/services#computer-repair-maintenance" className="hover:text-[#0187ca] transition">Monthly IT Maintenance</Link></li>
          </ul>
        </div>

        {/* Quick Links & Payment */}
        <div className="space-y-2.5 font-khmer">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
            {lang === 'kh' ? 'តំណភ្ជាប់រហ័ស' : 'Quick Access'}
          </h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li><Link href="/custom-pc" className="text-[#0187ca] hover:underline font-bold">Custom PC Builder</Link></li>
            <li><Link href="/custom-pc/prebuilt" className="hover:text-white transition">Prebuilt PC Packages</Link></li>
            <li><Link href="/quotations" className="hover:text-white transition">Request Official Quote</Link></li>
            <li><Link href="/cart" className="hover:text-white transition">Shopping Cart</Link></li>
            <li><Link href="/admin" className="text-slate-500 hover:text-slate-300 font-mono">Admin Portal</Link></li>
          </ul>

          <div className="pt-2">
            <span className="text-[10px] text-slate-400 block mb-1.5 font-medium">Payment Accepted:</span>
            <div className="flex flex-wrap gap-1 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold border border-red-800">Bakong KHQR</span>
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800">ABA Pay</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">COD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950 py-3.5 text-center text-[11px] text-slate-500">
        © 2026 NV Technology Co., Ltd. All rights reserved. Clean UI for Cambodia 🇰🇭
      </div>
    </footer>
  );
}
