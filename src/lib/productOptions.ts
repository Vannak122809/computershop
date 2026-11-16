import { Product } from './types';

export interface ProductOptionItem {
  id: string;
  name_kh: string;
  name_en: string;
  priceDelta: number;
}

export interface ProductConfigurableOptions {
  ram?: ProductOptionItem[];
  storage?: ProductOptionItem[];
  color?: ProductOptionItem[];
  warranty?: ProductOptionItem[];
  addon?: ProductOptionItem[];
}

export function getProductOptions(product: Product): ProductConfigurableOptions {
  const isComputer = product.category_slug === 'computers';
  const isNetworking = product.category_slug === 'networking' || product.category_slug === 'security';
  const isComponent = product.category_slug === 'components';
  const isPrinter = product.category_slug === 'printers';
  const isAttendance = product.category_slug === 'attendance';

  const warrantyOptions: ProductOptionItem[] = [
    {
      id: 'w-std',
      name_kh: `ការធានាស្តង់ដារ ${product.warranty_months} ខែ (ឥតគិតថ្លៃ)`,
      name_en: `Standard ${product.warranty_months}-Month Warranty (Included)`,
      priceDelta: 0,
    },
    {
      id: 'w-2yr',
      name_kh: 'ពន្យារការធានា +1 ឆ្នាំបន្ថែម (Extended Care)',
      name_en: 'Extended Warranty (+1 Year Extended Care)',
      priceDelta: 29,
    },
    {
      id: 'w-vip',
      name_kh: 'សេវាកម្ម VIP Onsite SLA + ការពាររហ័ស (24/7 Priority)',
      name_en: 'VIP Onsite SLA + Priority Replacement',
      priceDelta: 59,
    },
  ];

  if (isComputer) {
    return {
      ram: [
        { id: 'ram-base', name_kh: 'រ៉េមស្តង់ដារពី فរោងចក្រ (Included)', name_en: 'Factory Standard RAM (Included)', priceDelta: 0 },
        { id: 'ram-32', name_kh: 'តម្លើងទៅ 32GB Dual-Channel High-Speed (+ $55)', name_en: 'Upgrade to 32GB Dual-Channel (+ $55)', priceDelta: 55 },
        { id: 'ram-64', name_kh: 'តម្លើងទៅ 64GB Extreme Pro Capacity (+ $135)', name_en: 'Upgrade to 64GB Extreme Pro (+ $135)', priceDelta: 135 },
      ],
      storage: [
        { id: 'ssd-base', name_kh: 'ទំហំផ្ទុកស្តង់ដារ 512GB NVMe (Included)', name_en: 'Factory Standard 512GB NVMe (Included)', priceDelta: 0 },
        { id: 'ssd-1tb', name_kh: 'តម្លើងទៅ 1TB Gen4 NVMe (7,000MB/s) (+ $45)', name_en: 'Upgrade to 1TB Gen4 Ultra NVMe (+ $45)', priceDelta: 45 },
        { id: 'ssd-2tb', name_kh: 'តម្លើងទៅ 2TB Gen4 Enterprise NVMe (+ $115)', name_en: 'Upgrade to 2TB Gen4 Enterprise NVMe (+ $115)', priceDelta: 115 },
      ],
      color: [
        { id: 'col-black', name_kh: 'ពណ៌ខ្មៅ Matte Black (ស្តង់ដារ)', name_en: 'Matte Black / Charcoal (Default)', priceDelta: 0 },
        { id: 'col-silver', name_kh: 'ពណ៌ប្រាក់ Space Silver / Gray', name_en: 'Space Silver / Gray', priceDelta: 0 },
      ],
      warranty: warrantyOptions,
      addon: [
        { id: 'opt-os-free', name_kh: 'ដំឡើង Windows 11 Pro + Drivers ឥតគិតថ្លៃ', name_en: 'Free Windows 11 Pro + Driver Setup', priceDelta: 0 },
        { id: 'opt-bundle-office', name_kh: 'កញ្ចប់កណ្ដុរឥតខ្សែ + កម្រាល Mousepad + $15', name_en: 'Wireless Mouse + Desk Mat Bundle (+ $15)', priceDelta: 15 },
        { id: 'opt-bag', name_kh: 'កាតាបស្ពាយការពារទឹក Lenovo/Dell Original (+ $25)', name_en: 'Waterproof Laptop Backpack (+ $25)', priceDelta: 25 },
      ],
    };
  }

  if (isNetworking) {
    return {
      warranty: warrantyOptions,
      addon: [
        { id: 'net-default', name_kh: 'Firmware ដើមពីរោងចក្រ (Default)', name_en: 'Factory Default Setup', priceDelta: 0 },
        { id: 'net-vlan', name_kh: 'សេវាដំឡើង Hotspot, VLAN, Bandwidth Limit (+ $25)', name_en: 'Pre-configure Hotspot, VLAN & QoS (+ $25)', priceDelta: 25 },
        { id: 'net-rack', name_kh: 'ស្លាប Rackmount 19\" 1U អម (+ $12)', name_en: '19-Inch 1U Rackmount Ears Kit (+ $12)', priceDelta: 12 },
        { id: 'net-sfp', name_kh: '10G SFP+ DAC Copper Cable 1m (+ $18)', name_en: '10G SFP+ DAC High-Speed Cable 1m (+ $18)', priceDelta: 18 },
      ],
    };
  }

  if (isComponent) {
    return {
      warranty: warrantyOptions,
      addon: [
        { id: 'comp-std', name_kh: 'គ្រឿងបន្លាស់សុទ្ធ 100% ក្នុងប្រអប់', name_en: 'Genuine Factory Sealed Box', priceDelta: 0 },
        { id: 'comp-paste', name_kh: 'បន្ថែម Arctic MX-6 Thermal Paste 4g (+ $9)', name_en: 'Add Arctic MX-6 Thermal Compound 4g (+ $9)', priceDelta: 9 },
        { id: 'comp-bracket', name_kh: 'ជើងទ្រកាតក្រាហ្វិក ARGB Anti-Sag Bracket (+ $15)', name_en: 'ARGB GPU Anti-Sag Support Bracket (+ $15)', priceDelta: 15 },
      ],
    };
  }

  if (isPrinter) {
    return {
      warranty: warrantyOptions,
      addon: [
        { id: 'prt-std', name_kh: 'ទឹកថ្នាំ ឬទឹកថ្នាំដើមក្នុងប្រអប់ (Included)', name_en: 'Standard Starter Ink / Toner Included', priceDelta: 0 },
        { id: 'prt-inks', name_kh: 'ថែមទឹកថ្នាំសុទ្ធ 1 ឈុតពេញ (4 ពណ៌ CMYK) (+ $32)', name_en: 'Extra Full 4-Color Genuine Ink Set (+ $32)', priceDelta: 32 },
        { id: 'prt-black', name_kh: 'ថែមទឹកថ្នាំខ្មៅ Extra 2 ដប (+ $18)', name_en: 'Extra 2x High-Yield Black Inks (+ $18)', priceDelta: 18 },
      ],
    };
  }

  if (isAttendance) {
    return {
      warranty: warrantyOptions,
      addon: [
        { id: 'att-std', name_kh: 'Export ទិន្នន័យតាម Flash USB (Default)', name_en: 'USB Flash Drive Export (Default)', priceDelta: 0 },
        { id: 'att-lan', name_kh: 'ដំឡើង Software គ្រប់គ្រងវត្តមានតាម LAN (+ $35)', name_en: 'Network Attendance Software Setup (+ $35)', priceDelta: 35 },
        { id: 'att-lock', name_kh: 'កញ្ចប់សោទ្វារម៉ាញេទិក Electronic Door Lock (+ $85)', name_en: 'Magnetic Door Lock Hardware Bundle (+ $85)', priceDelta: 85 },
      ],
    };
  }

  // Generic fallback
  return {
    warranty: warrantyOptions,
    addon: [
      { id: 'gen-std', name_kh: 'កញ្ចប់ស្តង់ដារពេញលេញពី NV Technology', name_en: 'Complete NV Technology Standard Box', priceDelta: 0 },
      { id: 'gen-delivery', name_kh: 'ដឹកជញ្ជូនរហ័សទាន់ចិត្តដល់គេហដ្ឋាន', name_en: 'Priority Express Doorstep Delivery', priceDelta: 0 },
    ],
  };
}
