import React, { useState } from 'react';

interface BrandLogoProps {
  brand: string;
  className?: string;
}

const BRAND_SVGS: Record<string, string> = {
  lenovo: '/images/brands/lenovo.svg',
  dell: '/images/brands/dell.svg',
  hp: '/images/brands/hp.svg',
  asus: '/images/brands/asus.svg',
  mikrotik: '/images/brands/mikrotik.svg',
  tplink: '/images/brands/tplink.svg',
  'tp-link': '/images/brands/tplink.svg',
  ubiquiti: '/images/brands/ubiquiti.svg',
  cisco: '/images/brands/cisco.svg',
  ruijie: '/images/brands/ruijie.svg',
  'ruijie/reyee': '/images/brands/ruijie.svg',
  'ruijiereyee': '/images/brands/ruijie.svg',
  fortinet: '/images/brands/fortinet.svg',
  canon: '/images/brands/canon.svg',
  epson: '/images/brands/epson.svg',
  kingston: '/images/brands/kingston.svg',
  hikvision: '/images/brands/hikvision.svg',
  logitech: '/images/brands/logitechg.svg',
  logitechg: '/images/brands/logitechg.svg',
  apple: '/images/brands/apple.svg',
  samsung: '/images/brands/samsung.svg',
  intel: '/images/brands/intel.svg',
  amd: '/images/brands/amd.svg',
  nvidia: '/images/brands/nvidia.svg',
};

export default function BrandLogo({ brand, className = 'max-h-full max-w-full object-contain' }: BrandLogoProps) {
  const [error, setError] = useState(false);
  const key = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  const src = BRAND_SVGS[key] || BRAND_SVGS[brand.toLowerCase()] || `/images/brands/${key}.svg`;

  if (error) {
    return (
      <span className="text-[11px] font-black text-slate-700 tracking-wider uppercase select-none">
        {brand.slice(0, 4)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${brand} official logo`}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
