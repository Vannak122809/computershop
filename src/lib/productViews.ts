import { Product, ProductSubView } from './types';

// Curated high-fidelity multi-angle assets for flagship hardware
const SPECIFIC_PRODUCT_VIEWS: Record<string, ProductSubView[]> = {
  // MikroTik RB5009UG+S+IN Heavy-Duty Enterprise Router
  'prod-mikrotik-rb5009': [
    {
      id: 'mkt-rb5009-ports',
      url: '/images/products/mikrotik-rb5009-ports.jpg',
      label_en: 'Front Port Array',
      label_kh: 'រន្ធខាងមុខ (8x GbE + 10G SFP+)',
      angle: 'front',
      badge: 'Port Array',
      description_en: '7x Gigabit Ethernet, 1x 2.5G port, 10G SFP+ cage, DC jack & status LEDs',
      description_kh: 'រន្ធ LAN 7x Gigabit, 1x 2.5G Ethernet, 10G SFP+ និងភ្លើង Signal',
    },
    {
      id: 'mkt-rb5009-angle',
      url: '/images/products/mikrotik-rb5009-angle.jpg',
      label_en: '3D Angled Profile',
      label_kh: 'ទិដ្ឋភាព 3D & ព្រុយត្រជាក់',
      angle: 'side',
      badge: 'Chassis 45°',
      description_en: 'Heavy-duty ribbed aluminum heatsink chassis with side rack-mount screw holes',
      description_kh: 'តួអាលុយមីញ៉ូមស្រូបកម្តៅកម្រិតធ្ងន់ និងប្រព័ន្ធខ្យល់អកម្ម (Passive Cooling)',
    },
    {
      id: 'mkt-rb5009-overview',
      url: '/images/products/mikrotik-rb5009ug-s-in.jpg',
      label_en: 'Top Overview',
      label_kh: 'ទិដ្ឋភាពពីលើតួម៉ាស៊ីន',
      angle: 'side',
      badge: 'Top View',
      description_en: 'Compact form-factor allowing 4 routers mounted in a single 1U rack space',
      description_kh: 'ទំហំតូចល្មម អាចចាប់ 4 គ្រឿងក្នុងកន្លែង Rack 1U តែមួយ',
    },
    {
      id: 'mkt-rb5009-board',
      url: '/images/products/mikrotik-rb5009-board.jpg',
      label_en: 'Internal RouterBOARD PCB',
      label_kh: 'បន្ទះ Mainboard ខាងក្នុង',
      angle: 'detail',
      badge: 'Hardware PCB',
      description_en: 'Marvell Armada quad-core CPU, DDR4 RAM module, SFP+ cage & magnetics',
      description_kh: 'បន្ទះសៀគ្វី RouterBOARD, បន្ទះឈីប Marvell Quad-Core និងរ៉េម DDR4',
    },
  ],

  // Lenovo ThinkPad E14 Gen 5
  'prod-thinkpad-e14': [
    {
      id: 'tp-e14-front',
      url: '/images/products/lenovo-thinkpad-e14-gen-5.jpg',
      label_en: 'Display & Chassis',
      label_kh: 'អេក្រង់ & តួម៉ាស៊ីន',
      angle: 'front',
      badge: 'Main View',
      description_en: '14" WUXGA Anti-glare IPS display with slim bezel and military durability',
      description_kh: 'អេក្រង់ 14" WUXGA IPS កាត់ចំណាំងផ្លាត និងកម្រាស់ស្ដើងស្អាត',
    },
    {
      id: 'tp-e14-ports',
      url: '/images/products/thinkpad-e14-ports.jpg',
      label_en: 'I/O Ports & Profile',
      label_kh: 'រន្ធតំណភ្ជាប់ចំហៀង',
      angle: 'side',
      badge: 'I/O Ports',
      description_en: 'Thunderbolt 4 / USB-C, USB 3.2 Gen 1, HDMI 2.1, RJ45 and 3.5mm combo audio',
      description_kh: 'រន្ធ Thunderbolt 4, Type-C, USB-A, HDMI 2.1 និងរន្ធដោតកាស',
    },
    {
      id: 'tp-e14-keyboard',
      url: '/images/products/thinkpad-e14-keyboard.jpg',
      label_en: 'TrackPoint Keyboard Deck',
      label_kh: 'ក្ដារចុច & TrackPoint ក្រហម',
      angle: 'detail',
      badge: 'Keyboard Deck',
      description_en: 'Iconic red TrackPoint, spill-resistant ergonomic keys, glass-feel touchpad',
      description_kh: 'គ្រាប់ TrackPoint ក្រហមល្បីល្បាញ, ក្តារចុចការពារជ្រាបទឹក និង Trackpad',
    },
    {
      id: 'tp-e14-display',
      url: '/images/products/test-thinkpad.jpg',
      label_en: 'Angle Perspective',
      label_kh: 'ទិដ្ឋភាពជ្រុង 3D',
      angle: 'side',
      badge: '3D Angle',
      description_en: '180-degree lay-flat zinc-alloy hinge design',
      description_kh: 'គន្លឹះត្រចៀកកាច់បាន 180 ដឺក្រេ ធន់មាំកម្រិត MIL-STD-810H',
    },
  ],

  // Dell OptiPlex 7010 Tower
  'prod-dell-optiplex-7010': [
    {
      id: 'dell-opt-front',
      url: '/images/products/dell-optiplex-7010-desktop.jpg',
      label_en: 'Front Bezel',
      label_kh: 'ផ្នែកខាងមុខ Tower',
      angle: 'front',
      badge: 'Front Bezel',
      description_en: 'Diamond-pattern mesh air intake, USB 3.2 Gen 2 ports, audio jack',
      description_kh: 'សំណាញ់បឺតខ្យល់ Diamond Mesh, រន្ធ USB-A ខាងមុខ និងប៊ូតុង Power',
    },
    {
      id: 'dell-opt-rear',
      url: '/images/products/dell-optiplex-rear.jpg',
      label_en: 'Rear I/O Panel',
      label_kh: 'រន្ធខាងក្រោយ (Rear I/O)',
      angle: 'rear',
      badge: 'Rear Panel',
      description_en: 'Dual DisplayPort, HDMI, 4x USB, Gigabit LAN, AC Power & PSU exhaust',
      description_kh: 'រន្ធ DisplayPort 2x, HDMI, LAN Gigabit, រន្ធ USB និងកង្ហារភ្លើង',
    },
    {
      id: 'dell-opt-inside',
      url: '/images/products/dell-optiplex-inside.jpg',
      label_en: 'Interior Chassis',
      label_kh: 'គ្រឿងក្នុងតួម៉ាស៊ីន',
      angle: 'detail',
      badge: 'Internal Hardware',
      description_en: 'Toolless chassis access, Intel LGA1700 cooler, DDR5 slots & NVMe SSD',
      description_kh: 'រចនាសម្ព័ន្ធខាងក្នុង, កង្ហារ Intel CPU Cooler, រ៉េម DDR5 និងរន្ធ PCIe',
    },
  ],

  // Apple MacBook Air 13.6" M3
  'prod-macbook-air-m3': [
    {
      id: 'mba-front',
      url: '/images/products/apple-macbook-air-13-m3.jpg',
      label_en: 'Display & Unibody',
      label_kh: 'អេក្រង់ & តួអាលុយមីញ៉ូម',
      angle: 'front',
      badge: 'Main View',
      description_en: 'Liquid Retina display with 500 nits brightness and 1080p FaceTime HD camera',
      description_kh: 'អេក្រង់ Liquid Retina កម្រិតពន្លឺ 500 nits និងកាមេរ៉ា 1080p FaceTime',
    },
    {
      id: 'mba-ports',
      url: '/images/products/macbook-air-side.jpg',
      label_en: 'MagSafe 3 & USB4 Profile',
      label_kh: 'រន្ធសាក MagSafe 3 & Type-C',
      angle: 'side',
      badge: 'Slim Profile',
      description_en: 'MagSafe 3 magnetic charging port and two Thunderbolt / USB 4 ports',
      description_kh: 'រន្ធសាក MagSafe 3 និងរន្ធ Thunderbolt / USB 4 ចំនួន 2',
    },
    {
      id: 'mba-keyboard',
      url: '/images/products/macbook-air-keyboard.jpg',
      label_en: 'Magic Keyboard Deck',
      label_kh: 'ក្ដារចុច Magic Keyboard & Touch ID',
      angle: 'detail',
      badge: 'Magic Keyboard',
      description_en: 'Full-height function row, Touch ID sensor and Force Touch trackpad',
      description_kh: 'ក្ដារចុច Magic Keyboard, ប៊ូតុងស្កេនមេដៃ Touch ID និង Force Touch Trackpad',
    },
  ],

  // ASUS TUF RTX 4070 Ti SUPER 16GB
  'prod-gpu-asus-4070ti': [
    {
      id: 'tuf-gpu-front',
      url: '/images/products/asus-tuf-rtx-4070ti-super-16gb.jpg',
      label_en: 'Triple Axial-Tech Fans',
      label_kh: 'កង្ហារត្រជាក់ 3 គ្រាប់',
      angle: 'front',
      badge: 'Cooler Shroud',
      description_en: 'Axial-tech fans scaled up for 21% more air with dual ball fan bearings',
      description_kh: 'កង្ហារ Axial-tech 3 គ្រាប់ បង្កើនកម្លាំងខ្យល់ 21% ស្ងាត់និងត្រជាក់',
    },
    {
      id: 'tuf-gpu-bracket',
      url: '/images/products/gpu-rtx4070ti-bracket.jpg',
      label_en: 'DisplayPort & HDMI Bracket',
      label_kh: 'រន្ធបញ្ចូនរូបភាព Display I/O',
      angle: 'rear',
      badge: 'I/O Bracket',
      description_en: '3x DisplayPort 1.4a and 2x HDMI 2.1a stainless steel vented bracket',
      description_kh: 'រន្ធ DisplayPort 1.4a ចំនួន 3 និង HDMI 2.1a ចំនួន 2 ដែកអ៊ីណុក',
    },
    {
      id: 'tuf-gpu-backplate',
      url: '/images/products/gpu-rtx4070ti-backplate.jpg',
      label_en: 'Metal Vented Backplate',
      label_kh: 'បន្ទះដែកខ្នង Backplate',
      angle: 'detail',
      badge: 'Backplate',
      description_en: 'Rigid metal exoskeleton with wide pass-through vent for thermal airflow',
      description_kh: 'បន្ទះដែកខ្នងរឹងមាំ មានប្រឡោះបញ្ចេញកម្តៅខ្យល់ចេញក្រៅ',
    },
  ],
};

export function getProductSubViews(product: Product): ProductSubView[] {
  // 1. Explicit sub_views defined on product (e.g. from admin updates / upload) have highest priority
  if (product.sub_views && product.sub_views.length > 0) {
    // Ensure the first view stays in sync if main image was updated
    const views = [...product.sub_views];
    if (product.image && views[0] && views[0].angle === 'front' && views[0].url !== product.image) {
      views[0] = { ...views[0], url: product.image };
    }
    return views;
  }

  // 2. Direct specific mapping by Product ID or slug (fallback high-res multi-angle sets)
  let staticSet: ProductSubView[] | null = null;
  if (SPECIFIC_PRODUCT_VIEWS[product.id]) {
    staticSet = SPECIFIC_PRODUCT_VIEWS[product.id];
  } else if (product.slug.includes('rb5009') && SPECIFIC_PRODUCT_VIEWS['prod-mikrotik-rb5009']) {
    staticSet = SPECIFIC_PRODUCT_VIEWS['prod-mikrotik-rb5009'];
  } else if (product.slug.includes('thinkpad-e14') && SPECIFIC_PRODUCT_VIEWS['prod-thinkpad-e14']) {
    staticSet = SPECIFIC_PRODUCT_VIEWS['prod-thinkpad-e14'];
  } else if (product.slug.includes('optiplex-7010') && SPECIFIC_PRODUCT_VIEWS['prod-dell-optiplex-7010']) {
    staticSet = SPECIFIC_PRODUCT_VIEWS['prod-dell-optiplex-7010'];
  } else if (product.slug.includes('macbook-air') && SPECIFIC_PRODUCT_VIEWS['prod-macbook-air-m3']) {
    staticSet = SPECIFIC_PRODUCT_VIEWS['prod-macbook-air-m3'];
  } else if (product.slug.includes('4070ti') && SPECIFIC_PRODUCT_VIEWS['prod-gpu-asus-4070ti']) {
    staticSet = SPECIFIC_PRODUCT_VIEWS['prod-gpu-asus-4070ti'];
  }

  if (staticSet && staticSet.length > 0) {
    const views = [...staticSet];
    // If the main product image was modified in admin, update the primary view url
    if (product.image && views[0].url !== product.image) {
      views[0] = { ...views[0], url: product.image };
    }
    return views;
  }

  // 4. If product has explicit gallery images, generate multi-angle entries
  if (product.gallery && product.gallery.length > 0) {
    const views: ProductSubView[] = [
      {
        id: `${product.id}-front`,
        url: product.image,
        label_en: 'Main View',
        label_kh: 'ទិដ្ឋភាពពីមុខ',
        angle: 'front',
        badge: 'Front',
        description_en: 'Primary front view of the hardware',
        description_kh: 'ទិដ្ឋភាពចំពីមុខនៃឧបករណ៍',
      }
    ];

    product.gallery.forEach((url, idx) => {
      const angles: Array<'side' | 'rear' | 'detail' | 'box'> = ['side', 'rear', 'detail', 'box'];
      const angle = angles[idx % angles.length];
      views.push({
        id: `${product.id}-gallery-${idx}`,
        url,
        label_en: angle === 'side' ? '3D Angle' : angle === 'rear' ? 'Rear / I/O' : angle === 'detail' ? 'Close-up Specs' : 'Packaging',
        label_kh: angle === 'side' ? 'ទិដ្ឋភាពចំហៀង 3D' : angle === 'rear' ? 'រន្ធតំណភ្ជាប់ Ports' : angle === 'detail' ? 'គ្រឿងលម្អិត' : 'ប្រអប់ទំនិញ',
        angle,
        badge: angle.toUpperCase(),
      });
    });
    return views;
  }

  // 5. Intelligent category-level alternate hardware assets (guaranteed distinct images!)
  const views: ProductSubView[] = [
    {
      id: `${product.id}-front`,
      url: product.image,
      label_en: 'Front View',
      label_kh: 'ទិដ្ឋភាពពីមុខ',
      angle: 'front',
      badge: 'Front View',
      description_en: 'Primary frontal view of the unit',
      description_kh: 'ទិដ្ឋភាពចំពីមុខនៃឧបករណ៍',
    },
  ];

  if (product.category_slug === 'computers') {
    views.push(
      {
        id: `${product.id}-ports`,
        url: '/images/products/thinkpad-e14-ports.jpg',
        label_en: 'Side I/O Ports',
        label_kh: 'រន្ធតំណភ្ជាប់ចំហៀង',
        angle: 'side',
        badge: 'I/O Ports',
        description_en: 'Thunderbolt, USB-C, HDMI and power delivery layout',
        description_kh: 'រន្ធដោត USB-C, HDMI, Type-A និងសាកថ្ម',
      },
      {
        id: `${product.id}-keyboard`,
        url: '/images/products/thinkpad-e14-keyboard.jpg',
        label_en: 'Keyboard & Input',
        label_kh: 'ក្ដារចុច & Trackpad',
        angle: 'detail',
        badge: 'Keyboard Deck',
        description_en: 'Ergonomic keys, precision glass trackpad, audio grills',
        description_kh: 'ផ្ទៃក្ដារចុច និងផ្ទៃបញ្ជា Precision Trackpad',
      }
    );
  } else if (product.category_slug === 'networking') {
    views.push(
      {
        id: `${product.id}-ports`,
        url: '/images/products/mikrotik-rb5009-ports.jpg',
        label_en: 'Gigabit & SFP+ Ports',
        label_kh: 'រន្ធ Gigabit & SFP+',
        angle: 'rear',
        badge: 'Port Array',
        description_en: 'High-density RJ45 Ethernet ports and 10G optical interface',
        description_kh: 'រន្ធបណ្តាញ RJ45 និងរន្ធដោត Fiber Optic SFP+',
      },
      {
        id: `${product.id}-angle`,
        url: '/images/products/mikrotik-rb5009-angle.jpg',
        label_en: 'Heatsink & Chassis',
        label_kh: 'តួអាលុយមីញ៉ូម & កម្តៅ',
        angle: 'side',
        badge: 'Chassis 45°',
        description_en: 'Passive thermal cooling fins and mounting rack brackets',
        description_kh: 'ព្រុយអាលុយមីញ៉ូមស្រូបកម្តៅ និងជើងទម្រចាប់ Rack',
      },
      {
        id: `${product.id}-board`,
        url: '/images/products/mikrotik-rb5009-board.jpg',
        label_en: 'Internal PCB Architecture',
        label_kh: 'បន្ទះ Mainboard ខាងក្នុង',
        angle: 'detail',
        badge: 'Hardware PCB',
        description_en: 'High-performance processor, DDR memory and networking silicon',
        description_kh: 'បន្ទះឈីបដំណើរការល្បឿនខ្ពស់ និងបន្ទះសៀគ្វីខាងក្នុង',
      }
    );
  } else if (product.category_slug === 'components') {
    views.push(
      {
        id: `${product.id}-bracket`,
        url: '/images/products/gpu-rtx4070ti-bracket.jpg',
        label_en: 'Interface & Bracket',
        label_kh: 'រន្ធដោត & កន្ទុយដែក Bracket',
        angle: 'rear',
        badge: 'I/O Bracket',
        description_en: 'Vented rear bracket with high-bandwidth display connectors',
        description_kh: 'រន្ធ DisplayPort និង HDMI ដែកអ៊ីណុកបញ្ចេញកម្តៅ',
      },
      {
        id: `${product.id}-backplate`,
        url: '/images/products/gpu-rtx4070ti-backplate.jpg',
        label_en: 'Reinforced Backplate',
        label_kh: 'បន្ទះដែកការពារខ្នង Backplate',
        angle: 'detail',
        badge: 'Backplate',
        description_en: 'Rigid metal structural armor with flow-through ventilation',
        description_kh: 'បន្ទះដែកការពារ និងជួយរំសាយកម្តៅ',
      }
    );
  }

  return views;
}
