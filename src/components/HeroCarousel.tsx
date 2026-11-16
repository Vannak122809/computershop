'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle,
  Send
} from 'lucide-react';

interface Slide {
  id: string;
  badge_kh: string;
  badge_en: string;
  title_kh: string;
  title_en: string;
  subtitle_kh: string;
  subtitle_en: string;
  features_kh: string[];
  features_en: string[];
  primary_btn_kh: string;
  primary_btn_en: string;
  primary_link: string;
  secondary_btn_kh: string;
  secondary_btn_en: string;
  secondary_link: string;
  gradient: string;
  accent_color: string;
  product_images: {
    src: string;
    alt: string;
    label: string;
    price?: string;
  }[];
}

const SLIDES: Slide[] = [
  {
    id: 'slide-laptops',
    badge_kh: 'ដៃគូចែកចាយផ្លូវការ • OFFICIAL AUTHORIZED PARTNER',
    badge_en: 'OFFICIAL AUTHORIZED PARTNER • 100% GENUINE',
    title_kh: 'កុំព្យូទ័រយួរដៃការិយាល័យ & Gaming ស៊េរីទំនើប',
    title_en: 'Next-Gen Business & Enterprise Laptops',
    subtitle_kh: 'Lenovo ThinkPad • Dell Vostro • MacBook Air M3 • ASUS ROG Strix — ការធានាផ្លូវការ ២៤ ខែ',
    subtitle_en: 'Lenovo ThinkPad, Dell Vostro, MacBook Air M3 & ROG Strix with official Cambodia authorized warranty',
    features_kh: ['ធានាផ្លូវការ ១២ ដល់ ២៤ ខែ', 'ដឹកជញ្ជូនរហ័ស ១-២ ម៉ោងនៅភ្នំពេញ', 'បង់តាម Bakong KHQR / COD'],
    features_en: ['12-24 Months Official Warranty', '1-2h Fast Phnom Penh Delivery', 'Bakong KHQR & COD Accepted'],
    primary_btn_kh: 'ទិញ Laptop ឥឡូវនេះ',
    primary_btn_en: 'Shop Laptops Now',
    primary_link: '/products?category=computers',
    secondary_btn_kh: 'សួរតម្លៃតាម Telegram',
    secondary_btn_en: 'Inquire on Telegram',
    secondary_link: 'https://t.me/shinggg168',
    gradient: 'from-slate-950 via-slate-900 to-sky-950',
    accent_color: '#0187ca',
    product_images: [
      {
        src: '/images/products/lenovo-thinkpad-e14-gen-5.jpg',
        alt: 'ThinkPad E14',
        label: 'ThinkPad E14 Gen 5',
        price: '$729'
      },
      {
        src: '/images/products/dell-vostro-3520.jpg',
        alt: 'Dell Vostro',
        label: 'Dell Vostro 3520',
        price: '$779'
      },
      {
        src: '/images/products/asus-rog-strix-g16-2024.jpg',
        alt: 'ROG Strix G16',
        label: 'ROG Strix G16',
        price: '$1,299'
      }
    ]
  },
  {
    id: 'slide-networking',
    badge_kh: 'ដំណោះស្រាយ NETWORK សហគ្រាស • ENTERPRISE INFRASTRUCTURE',
    badge_en: 'ENTERPRISE NETWORK INFRASTRUCTURE',
    title_kh: 'ប្រព័ន្ធបណ្តាញល្បឿនលឿន Gigabit & 10G SFP+',
    title_en: 'High-Speed Enterprise Networking & Wi-Fi 6',
    subtitle_kh: 'MikroTik RouterBOARD • Ubiquiti UniFi APs • Cisco Switches • Server Rack & ខ្សែកាប Cat6',
    subtitle_en: 'MikroTik Routers, Ubiquiti UniFi APs, Cisco Catalyst Switches & Structured CommScope Cabling',
    features_kh: ['គាំទ្រ User ច្រើន គ្មានទាក់ (Zero-Lag)', 'ចែក VLAN ការិយាល័យ & Guest Wi-Fi', 'ចុះវាស់វែងទីតាំងដោយឥតគិតថ្លៃ'],
    features_en: ['Zero-lag multi-gigabit throughput', 'VLAN segmentation for office & guests', 'Free onsite site survey & blueprint'],
    primary_btn_kh: 'មើលឧបករណ៍ Network',
    primary_btn_en: 'Explore Networking',
    primary_link: '/products?category=networking',
    secondary_btn_kh: 'សេវាកម្មតម្លើង Network',
    secondary_btn_en: 'Installation Services',
    secondary_link: '/services',
    gradient: 'from-slate-950 via-emerald-950 to-slate-900',
    accent_color: '#10b981',
    product_images: [
      {
        src: '/images/products/mikrotik-rb5009ug-s-in.jpg',
        alt: 'MikroTik RB5009',
        label: 'MikroTik RB5009 10G',
        price: '$219'
      },
      {
        src: '/images/products/ubiquiti-unifi-u6-pro.jpg',
        alt: 'UniFi U6 Pro',
        label: 'UniFi U6 Pro Wi-Fi 6',
        price: '$169'
      },
      {
        src: '/images/products/cisco-catalyst-c1000-24t-4g-l.jpg',
        alt: 'Cisco Catalyst',
        label: 'Cisco Catalyst 24-Port',
        price: 'RFQ'
      }
    ]
  },
  {
    id: 'slide-custom-pc',
    badge_kh: 'ម៉ាស៊ីន CUSTOM PC កម្ពុជា • AUTOMATIC COMPATIBILITY ENGINE',
    badge_en: 'CUSTOM PC SPECIALIST • 100% COMPATIBLE',
    title_kh: 'រៀបចំកុំព្យូទ័រ Custom PC តាមតម្រូវការ & ថវិកា',
    title_en: 'Build Your Custom PC With Real-time Compatibility',
    subtitle_kh: 'Intel 14th Gen / AMD Ryzen 7000 • RTX 4060 - 4080 • DDR5 • ពិនិត្យភ្លើង PSU និងទំហំ Case ស្វ័យប្រវត្តិ',
    subtitle_en: 'Intel 14th Gen, AMD AM5, RTX 4070 SUPER, DDR5 RAM with instant wattage and clearance validation',
    features_kh: ['ពិនិត្យ Socket & RAM ត្រឹមត្រូវ ១០០%', 'គណនាភ្លើង PSU ស្វ័យប្រវត្តិ', 'Export Quotation ទៅ Telegram ភ្លាមៗ'],
    features_en: ['100% Socket & RAM Type Verified', 'Real-time Wattage & Clearance Check', '1-Click Quotation Export to Telegram'],
    primary_btn_kh: 'ចាប់ផ្តើម Build PC',
    primary_btn_en: 'Start PC Builder',
    primary_link: '/custom-pc',
    secondary_btn_kh: 'មើលឈុត PC ស្រាប់',
    secondary_btn_en: 'View Prebuilts',
    secondary_link: '/custom-pc/prebuilt',
    gradient: 'from-slate-950 via-indigo-950 to-slate-900',
    accent_color: '#6366f1',
    product_images: [
      {
        src: '/images/products/intel-core-i5-14400f.jpg',
        alt: 'Core i5-14400F',
        label: 'Intel Core i5-14400F',
        price: '$199'
      },
      {
        src: '/images/products/asus-dual-rtx-4060-8gb.jpg',
        alt: 'RTX 4060',
        label: 'ASUS Dual RTX 4060',
        price: '$329'
      },
      {
        src: '/images/products/nzxt-h5-flow-rgb-black.jpg',
        alt: 'NZXT H5 Flow',
        label: 'NZXT H5 Flow RGB',
        price: '$99'
      }
    ]
  },
  {
    id: 'slide-security',
    badge_kh: 'ប្រព័ន្ធសុវត្ថិភាព NETWORK & FIREWALL • CYBER DEFENSE',
    badge_en: 'ENTERPRISE CYBER DEFENSE & FIREWALLS',
    title_kh: 'ការពារទិន្នន័យក្រុមហ៊ុនជាមួយ Next-Gen Firewall',
    title_en: 'Next-Generation Firewalls & VPN Gateways',
    subtitle_kh: 'Fortinet FortiGate 40F/60F/80F • Sophos XGS • ការពារ Ransomware & ភ្ជាប់ VPN សាខាសុវត្ថិភាព',
    subtitle_en: 'Fortinet FortiGate, Sophos UTM appliances, site-to-site VPN and intrusion prevention systems',
    features_kh: ['ការពារការវាយប្រហារ Cyber & មេរោគ', 'ភ្ជាប់ VPN ពីផ្ទះ ឬសាខាដោយសុវត្ថិភាព', 'កំណត់កម្រិតប្រើប្រាស់អ៊ីនធឺណិតបុគ្គលិក'],
    features_en: ['Real-time intrusion prevention', 'Secure Site-to-Site & Remote VPN', 'Employee bandwidth and policy control'],
    primary_btn_kh: 'មើលម៉ូឌែល Firewall',
    primary_btn_en: 'View Firewalls',
    primary_link: '/products?category=security',
    secondary_btn_kh: 'ប្រឹក្សាជាមួយវិស្វករ',
    secondary_btn_en: 'Talk to Security Engineer',
    secondary_link: 'https://t.me/shinggg168',
    gradient: 'from-slate-950 via-rose-950 to-slate-900',
    accent_color: '#f43f5e',
    product_images: [
      {
        src: '/images/products/fortinet-fortigate-40f.jpg',
        alt: 'FortiGate 40F',
        label: 'FortiGate 40F NGFW',
        price: '$450'
      },
      {
        src: '/images/products/fortinet-fortigate-60f.jpg',
        alt: 'FortiGate 60F',
        label: 'FortiGate 60F UTM',
        price: '$680'
      },
      {
        src: '/images/products/sophos-xgs-116.jpg',
        alt: 'Sophos XGS',
        label: 'Sophos XGS 116 Appliance',
        price: '$790'
      }
    ]
  }
];

export default function HeroCarousel() {
  const { lang } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-md group bg-slate-950 border border-slate-800/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Graphic with Subtle Radial Glow */}
      <div 
        key={slide.id}
        className={`w-full transition-all duration-700 bg-gradient-to-r ${slide.gradient} p-6 sm:p-10 lg:p-12 min-h-[390px] lg:min-h-[430px] flex items-center relative overflow-hidden`}
      >
        {/* Ambient background glow ring */}
        <div 
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: slide.accent_color }}
        ></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text Column (lg:col-span-7) with slide-up animation */}
          <div className="lg:col-span-7 space-y-4 text-white animate-slide-up">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold text-sky-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{lang === 'kh' ? slide.badge_kh : slide.badge_en}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
              {lang === 'kh' ? slide.title_kh : slide.title_en}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
              {lang === 'kh' ? slide.subtitle_kh : slide.subtitle_en}
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-200">
              {(lang === 'kh' ? slide.features_kh : slide.features_en).map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-1.5 bg-white/5 py-1 px-2 rounded-lg backdrop-blur-xs border border-white/5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="line-clamp-1">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link
                href={slide.primary_link}
                className="px-5 py-3 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition-all flex items-center space-x-2 group/btn btn-tactile"
              >
                <span>{lang === 'kh' ? slide.primary_btn_kh : slide.primary_btn_en}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition duration-200" />
              </Link>

              {slide.secondary_link.startsWith('http') ? (
                <a
                  href={slide.secondary_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all border border-white/20 flex items-center space-x-2 btn-tactile"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'kh' ? slide.secondary_btn_kh : slide.secondary_btn_en}</span>
                </a>
              ) : (
                <Link
                  href={slide.secondary_link}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all border border-white/20 flex items-center space-x-2 btn-tactile"
                >
                  <span>{lang === 'kh' ? slide.secondary_btn_kh : slide.secondary_btn_en}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Hardware Showcase Visuals (lg:col-span-5) */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-end space-x-3.5 animate-modal-in">
            {slide.product_images.map((item, idx) => (
              <div 
                key={idx}
                className={`relative rounded-2xl bg-white/95 p-3.5 shadow-2xl border border-white/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-between text-center ${
                  idx === 1 
                    ? 'w-44 h-56 scale-105 z-20 shadow-sky-500/25 ring-2 ring-white/60 animate-float' 
                    : 'w-36 h-48 opacity-90 hover:opacity-100 z-10'
                }`}
              >
                <div className="w-full flex-1 relative flex items-center justify-center overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-2 w-full">
                  <p className="text-[11px] font-bold text-slate-800 line-clamp-1">
                    {item.label}
                  </p>
                  {item.price && (
                    <p className="text-xs font-black text-[#0187ca]">
                      {item.price}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Navigation Left / Right Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 btn-tactile"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 btn-tactile"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Pagination Pill Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-30">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full h-2 btn-tactile ${
              idx === currentSlide 
                ? 'w-8 bg-[#0187ca] shadow-md shadow-sky-400' 
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
