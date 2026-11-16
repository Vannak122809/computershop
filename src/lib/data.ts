import { Product, Category, Brand, ITService, PrebuiltPC } from './types';

export const categories: Category[] = [
  {
    "id": "cat-computers",
    "slug": "computers",
    "name_kh": "កុំព្យូទ័រ",
    "name_en": "Computers",
    "icon": "Laptop",
    "item_count": 13,
    "description_kh": "Laptop, Desktop, Gaming PC, All-in-One និង Workstation គុណភាពខ្ពស់",
    "description_en": "High performance Laptops, Desktops, Gaming PCs and Workstations",
    "subcategories": [
      {
        "name_kh": "Laptop",
        "name_en": "Laptop",
        "slug": "laptop"
      },
      {
        "name_kh": "Desktop",
        "name_en": "Desktop",
        "slug": "desktop"
      },
      {
        "name_kh": "Gaming PC",
        "name_en": "Gaming PC",
        "slug": "gaming-pc"
      },
      {
        "name_kh": "All-in-One",
        "name_en": "All-in-One",
        "slug": "all-in-one"
      },
      {
        "name_kh": "Mini PC",
        "name_en": "Mini PC",
        "slug": "mini-pc"
      },
      {
        "name_kh": "Workstation",
        "name_en": "Workstation",
        "slug": "workstation"
      },
      {
        "name_kh": "MacBook",
        "name_en": "MacBook",
        "slug": "macbook"
      }
    ]
  },
  {
    "id": "cat-components",
    "slug": "components",
    "name_kh": "គ្រឿងបន្លាស់កុំព្យូទ័រ",
    "name_en": "PC Components",
    "icon": "Cpu",
    "item_count": 21,
    "description_kh": "CPU, Motherboard, RAM, SSD, GPU, Power Supply, Case និង Cooler",
    "description_en": "Processors, Motherboards, RAM, SSDs, GPUs, PSUs and Cooling",
    "subcategories": [
      {
        "name_kh": "CPU / ម៉ាស៊ីនដំណើរការ",
        "name_en": "CPU",
        "slug": "cpu"
      },
      {
        "name_kh": "Motherboard / មេប័រ",
        "name_en": "Motherboard",
        "slug": "motherboard"
      },
      {
        "name_kh": "RAM / រ៉េម",
        "name_en": "RAM",
        "slug": "ram"
      },
      {
        "name_kh": "SSD / Storage",
        "name_en": "SSD",
        "slug": "ssd"
      },
      {
        "name_kh": "Graphics Card (GPU)",
        "name_en": "Graphics Card",
        "slug": "gpu"
      },
      {
        "name_kh": "Power Supply (PSU)",
        "name_en": "Power Supply",
        "slug": "psu"
      },
      {
        "name_kh": "PC Case",
        "name_en": "PC Case",
        "slug": "case"
      },
      {
        "name_kh": "CPU Cooler",
        "name_en": "CPU Cooler",
        "slug": "cooler"
      }
    ]
  },
  {
    "id": "cat-networking",
    "slug": "networking",
    "name_kh": "ប្រព័ន្ធ Network",
    "name_en": "Networking",
    "icon": "Network",
    "item_count": 12,
    "description_kh": "Switch, Router, Access Point (Wi-Fi), Server Rack និង ខ្សែកាប Cat6",
    "description_en": "Managed Switches, Enterprise Routers, Access Points, Server Racks and Structured Cabling",
    "subcategories": [
      {
        "name_kh": "Network Switch",
        "name_en": "Network Switch",
        "slug": "switch"
      },
      {
        "name_kh": "Router / Gateway",
        "name_en": "Router / Gateway",
        "slug": "router"
      },
      {
        "name_kh": "Access Point (Wi-Fi)",
        "name_en": "Access Point",
        "slug": "access-point"
      },
      {
        "name_kh": "Server Rack / Cabinet",
        "name_en": "Server Rack",
        "slug": "server-rack"
      },
      {
        "name_kh": "Network Cable & Patch Panel",
        "name_en": "Cables & Patching",
        "slug": "cabling"
      }
    ]
  },
  {
    "id": "cat-security",
    "slug": "security",
    "name_kh": "ប្រព័ន្ធសុវត្ថិភាព Network (Firewall)",
    "name_en": "Network Security",
    "icon": "ShieldAlert",
    "item_count": 4,
    "description_kh": "Next-Generation Firewall (NGFW), VPN Gateway និងប្រព័ន្ធការពារ Cyber Attack",
    "description_en": "Hardware Firewalls, UTM Appliances, Branch Gateways and Secure SD-WAN",
    "subcategories": [
      {
        "name_kh": "Hardware Firewall",
        "name_en": "Hardware Firewall",
        "slug": "firewall"
      },
      {
        "name_kh": "VPN Gateway",
        "name_en": "VPN Gateway",
        "slug": "vpn-gateway"
      },
      {
        "name_kh": "UTM Security Appliance",
        "name_en": "UTM Appliance",
        "slug": "utm-appliance"
      }
    ]
  },
  {
    "id": "cat-printers",
    "slug": "printers",
    "name_kh": "ម៉ាស៊ីនព្រីន & ស្កេន & POS",
    "name_en": "Printers & Scanners",
    "icon": "Printer",
    "item_count": 6,
    "description_kh": "ម៉ាស៊ីនព្រីនពណ៌ Ink Tank, ឡាស៊ែរ Laser, Barcode និង Handheld POS",
    "description_en": "All-in-One Ink Tank, Laser Mono/Color, Barcode Label Printers and Mobile POS",
    "subcategories": [
      {
        "name_kh": "Ink Tank Printer",
        "name_en": "Ink Tank Printer",
        "slug": "ink-tank"
      },
      {
        "name_kh": "Laser Printer",
        "name_en": "Laser Printer",
        "slug": "laser-printer"
      },
      {
        "name_kh": "Barcode / Thermal Printer",
        "name_en": "Barcode Printer",
        "slug": "barcode-printer"
      },
      {
        "name_kh": "Handheld POS Terminal",
        "name_en": "POS Terminal",
        "slug": "pos-terminal"
      }
    ]
  },
  {
    "id": "cat-attendance",
    "slug": "attendance",
    "name_kh": "ម៉ាស៊ីនស្កេនវត្តមាន & កាមេរ៉ា",
    "name_en": "Security & Attendance",
    "icon": "Camera",
    "item_count": 3,
    "description_kh": "ម៉ាស៊ីនស្កេនមុខ ក្រយៅដៃ និងប្រព័ន្ធគ្រប់គ្រងវត្តមានបុគ្គលិក",
    "description_en": "Time Attendance, Facial Recognition Terminals, Biometric Access Control",
    "subcategories": [
      {
        "name_kh": "Time Attendance / ស្កេនវត្តមាន",
        "name_en": "Time Attendance",
        "slug": "time-attendance"
      },
      {
        "name_kh": "Biometric Access Control",
        "name_en": "Access Control",
        "slug": "access-control"
      }
    ]
  },
  {
    "id": "cat-gaming",
    "slug": "gaming",
    "name_kh": "Gaming & អេក្រង់ Monitor",
    "name_en": "Gaming Gear & Monitors",
    "icon": "Gamepad2",
    "item_count": 7,
    "description_kh": "Gaming Monitor, Office Monitor, ក្តារចុច Keyboard, Mouse និងកាសស្តាប់",
    "description_en": "High-refresh Monitors, Ergonomic Displays, Mechanical Keyboards and Mice",
    "subcategories": [
      {
        "name_kh": "Gaming Monitor",
        "name_en": "Gaming Monitor",
        "slug": "gaming-monitor"
      },
      {
        "name_kh": "Office / 4K Monitor",
        "name_en": "Office Monitor",
        "slug": "office-monitor"
      },
      {
        "name_kh": "Gaming Mouse & Keyboard",
        "name_en": "Gaming Peripherals",
        "slug": "gaming-peripherals"
      }
    ]
  },
  {
    "id": "cat-accessories",
    "slug": "accessories",
    "name_kh": "គ្រឿងបន្ទាប់បន្សំ & UPS",
    "name_en": "Accessories & Cables",
    "icon": "Layers",
    "item_count": 2,
    "description_kh": "ឧបករណ៍រក្សាភ្លើង UPS, ខ្សែតំណ និងសម្ភារការិយាល័យ",
    "description_en": "Uninterruptible Power Supplies (UPS), Cables, Adapters and Peripherals",
    "subcategories": [
      {
        "name_kh": "UPS / ឧបករណ៍រក្សាភ្លើង",
        "name_en": "UPS Power Backup",
        "slug": "ups"
      },
      {
        "name_kh": "Keyboard & Mouse",
        "name_en": "Keyboards & Mice",
        "slug": "peripherals"
      }
    ]
  }
];

export const brands: Brand[] = [
  { id: 'b-lenovo', name: 'Lenovo', slug: 'lenovo', logo: '/images/brands/lenovo.svg', featured: true, origin: 'Global' },
  { id: 'b-dell', name: 'Dell', slug: 'dell', logo: '/images/brands/dell.svg', featured: true, origin: 'USA' },
  { id: 'b-hp', name: 'HP', slug: 'hp', logo: '/images/brands/hp.svg', featured: true, origin: 'USA' },
  { id: 'b-asus', name: 'ASUS', slug: 'asus', logo: '/images/brands/asus.svg', featured: true, origin: 'Taiwan' },
  { id: 'b-mikrotik', name: 'MikroTik', slug: 'mikrotik', logo: '/images/brands/mikrotik.svg', featured: true, origin: 'Latvia' },
  { id: 'b-tplink', name: 'TP-Link', slug: 'tp-link', logo: '/images/brands/tplink.svg', featured: true, origin: 'Global' },
  { id: 'b-ubiquiti', name: 'Ubiquiti', slug: 'ubiquiti', logo: '/images/brands/ubiquiti.svg', featured: true, origin: 'USA' },
  { id: 'b-cisco', name: 'Cisco', slug: 'cisco', logo: '/images/brands/cisco.svg', featured: true, origin: 'USA' },
  { id: 'b-ruijie', name: 'Ruijie / Reyee', slug: 'ruijie', logo: '/images/brands/ruijie.svg', featured: true, origin: 'Global' },
  { id: 'b-fortinet', name: 'Fortinet', slug: 'fortinet', logo: '/images/brands/fortinet.svg', featured: true, origin: 'USA' },
  { id: 'b-canon', name: 'Canon', slug: 'canon', logo: '/images/brands/canon.svg', featured: true, origin: 'Japan' },
  { id: 'b-epson', name: 'Epson', slug: 'epson', logo: '/images/brands/epson.svg', featured: true, origin: 'Japan' },
  { id: 'b-kingston', name: 'Kingston', slug: 'kingston', logo: '/images/brands/kingston.svg', featured: true, origin: 'USA' },
  { id: 'b-hikvision', name: 'Hikvision', slug: 'hikvision', logo: '/images/brands/hikvision.svg', featured: true, origin: 'Global' },
  { id: 'b-logitech', name: 'Logitech', slug: 'logitech', logo: '/images/brands/logitechg.svg', featured: true, origin: 'Switzerland' },
  { id: 'b-apple', name: 'Apple', slug: 'apple', logo: '/images/brands/apple.svg', featured: true, origin: 'USA' },
  { id: 'b-samsung', name: 'Samsung', slug: 'samsung', logo: '/images/brands/samsung.svg', featured: true, origin: 'Korea' },
];

export const products: Product[] = [
{
  "id": "prod-dell-optiplex-7010",
  "sku": "DELL-OPT-7010-I5",
  "name_kh": "Dell OptiPlex 7010 Tower (Core i5-13500 / 16GB RAM / 512GB SSD / Win 11 Pro)",
  "name_en": "Dell OptiPlex 7010 Tower (Intel Core i5-13500, 16GB DDR5, 512GB SSD, Win 11 Pro)",
  "slug": "dell-optiplex-7010-tower",
  "brand": "Dell",
  "category": "Computers",
  "category_slug": "computers",
  "subcategory": "Desktop",
  "subcategory_slug": "desktop",
  "pricing_type": "buy_now",
  "price_usd": 689,
  "sale_price_usd": 649,
  "in_stock": true,
  "stock_count": 12,
  "warranty_months": 36,
  "is_featured": true,
  "is_deal": true,
  "part_type": "none",
  "image": "/images/products/dell-optiplex-7010-desktop.jpg",
  "short_desc_kh": "កុំព្យូទ័រ Desktop Tower ការិយាល័យកម្រិតសហគ្រាស Core i5 ជំនាន់ទី 13 ធន់មាំ និងដំណើរការរលូន",
  "short_desc_en": "Commercial enterprise desktop tower with 13th Gen Intel Core i5 and 3-Year ProSupport",
  "specs": [
    {
      "key_kh": "CPU",
      "key_en": "Processor",
      "value": "Intel Core i5-13500 (14 Cores, up to 4.8GHz)"
    },
    {
      "key_kh": "RAM",
      "key_en": "Memory",
      "value": "16GB DDR5 4800MHz"
    },
    {
      "key_kh": "SSD",
      "key_en": "Storage",
      "value": "512GB PCIe NVMe SSD"
    },
    {
      "key_kh": "OS",
      "key_en": "Operating System",
      "value": "Windows 11 Pro 64-bit"
    },
    {
      "key_kh": "ការធានា",
      "key_en": "Warranty",
      "value": "3 Years Official Dell Warranty"
    }
  ]
},
{
  "id": "prod-lenovo-thinkcentre-m70s",
  "sku": "LNV-TC-M70S-G4",
  "name_kh": "Lenovo ThinkCentre M70s Gen 4 (Core i5-13400 / 16GB / 512GB SSD)",
  "name_en": "Lenovo ThinkCentre M70s Gen 4 SFF (Intel Core i5-13400, 16GB, 512GB SSD)",
  "slug": "lenovo-thinkcentre-m70s-gen4",
  "brand": "Lenovo",
  "category": "Computers",
  "category_slug": "computers",
  "subcategory": "Desktop",
  "subcategory_slug": "desktop",
  "pricing_type": "buy_now",
  "price_usd": 659,
  "sale_price_usd": 619,
  "in_stock": true,
  "stock_count": 8,
  "warranty_months": 36,
  "is_featured": true,
  "is_deal": false,
  "part_type": "none",
  "image": "https://p2-ofp.static.pub//fes/cms/2024/04/29/wp6n5muf8l50ez5n1ytzgsd67bvkdz787637.png?width=584&height=584",
  "short_desc_kh": "កុំព្យូទ័រលើតុខ្នាតតូច Small Form Factor សន្សំសំចៃកន្លែង និងមានសុវត្ថិភាពខ្ពស់ ThinkShield",
  "short_desc_en": "Compact Small Form Factor commercial desktop with robust ThinkShield data protection",
  "specs": [
    {
      "key_kh": "CPU",
      "key_en": "Processor",
      "value": "Intel Core i5-13400 (10 Cores, up to 4.6GHz)"
    },
    {
      "key_kh": "RAM",
      "key_en": "Memory",
      "value": "16GB DDR4 3200MHz"
    },
    {
      "key_kh": "SSD",
      "key_en": "Storage",
      "value": "512GB M.2 NVMe SSD"
    },
    {
      "key_kh": "ការធានា",
      "key_en": "Warranty",
      "value": "3 Years Premier Support"
    }
  ],
  "sub_views": [
    {
      "id": "prod-lenovo-thinkcentre-m70s-v1",
      "url": "https://p3-ofp.static.pub//fes/cms/2024/04/29/75sqnrcyu4gcqeqoyhbkbkfuf81plp944825.png?width=584&height=584",
      "label_en": "Front View",
      "label_kh": "ទិដ្ឋភាពពីមុខ",
      "angle": "front",
      "badge": "Front"
    },
    {
      "id": "view-1790826413353",
      "url": "https://p1-ofp.static.pub//fes/cms/2024/04/29/vf5agosc9jogsc693bfyfzy5bmzr71876318.png?width=584&height=584",
      "label_en": "Additional Angle",
      "label_kh": "ទិដ្ឋភាពបន្ថែម",
      "angle": "side",
      "badge": "Angle"
    },
    {
      "id": "view-1790826430421",
      "url": "https://p2-ofp.static.pub//fes/cms/2024/04/29/wp6n5muf8l50ez5n1ytzgsd67bvkdz787637.png?width=584&height=584",
      "label_en": "Additional Angle",
      "label_kh": "ទិដ្ឋភាពបន្ថែម",
      "angle": "side",
      "badge": "Angle"
    },
    {
      "id": "view-1790826443037",
      "url": "https://p1-ofp.static.pub//fes/cms/2024/04/29/1vgs6xv5rjvap4qkom70xsol6iqge9376788.png?width=584&height=584",
      "label_en": "Additional Angle",
      "label_kh": "ទិដ្ឋភាពបន្ថែម",
      "angle": "side",
      "badge": "Angle"
    },
    {
      "id": "view-1790826458803",
      "url": "https://p2-ofp.static.pub//fes/cms/2024/04/29/clukjzo3kwyuztkfzxcv9ru7s66ayq861237.png?width=584&height=584",
      "label_en": "Additional Angle",
      "label_kh": "ទិដ្ឋភាពបន្ថែម",
      "angle": "side",
      "badge": "Angle"
    }
  ]
},
{
  "id": "prod-hp-24-all-in-one",
  "sku": "HP-AIO-24-CR000",
  "name_kh": "HP 24 All-in-One PC (23.8\" FHD IPS / Core i5-1335U / 16GB / 512GB SSD / Mouse+KB)",
  "name_en": "HP 24 All-in-One PC (23.8\" FHD IPS, Core i5-1335U, 16GB RAM, 512GB SSD, Mouse + KB)",
  "slug": "hp-24-all-in-one-pc",
  "brand": "HP",
  "category": "Computers",
  "category_slug": "computers",
  "subcategory": "All-in-One",
  "subcategory_slug": "all-in-one",
  "pricing_type": "buy_now",
  "price_usd": 749,
  "sale_price_usd": 699,
  "in_stock": true,
  "stock_count": 10,
  "warranty_months": 24,
  "is_featured": true,
  "is_deal": true,
  "part_type": "none",
  "image": "/images/products/hp-24-all-in-one.jpg",
  "short_desc_kh": "កុំព្យូទ័រ All-in-One អេក្រង់ 23.8\" ស្តើងស្អាត គ្មានខ្សែរញ៉េរញ៉ៃ សាកសមសម្រាប់តុទទួលភ្ញៀវ និងការិយាល័យទំនើប",
  "short_desc_en": "23.8-inch modern All-in-One desktop PC with slim micro-edge display and wireless peripherals",
  "specs": [
    {
      "key_kh": "CPU",
      "key_en": "Processor",
      "value": "Intel Core i5-1335U (10 Cores, up to 4.6GHz)"
    },
    {
      "key_kh": "Display",
      "key_en": "Screen",
      "value": "23.8\" Full HD (1920x1080) IPS Anti-glare"
    },
    {
      "key_kh": "RAM",
      "key_en": "Memory",
      "value": "16GB DDR4"
    },
    {
      "key_kh": "SSD",
      "key_en": "Storage",
      "value": "512GB PCIe NVMe M.2 SSD"
    },
    {
      "key_kh": "ការធានា",
      "key_en": "Warranty",
      "value": "2 Years Official Warranty"
    }
  ]
},

  {
    "id": "prod-thinkpad-e14",
    "subcategory": "Laptop",
    "subcategory_slug": "laptop",
    "sku": "LNV-TP-E14-G5",
    "name_kh": "Lenovo ThinkPad E14 Gen 5 (Core i5 / 16GB / 512GB SSD)",
    "name_en": "Lenovo ThinkPad E14 Gen 5 (Intel Core i5-1335U, 16GB RAM, 512GB SSD)",
    "slug": "lenovo-thinkpad-e14-gen-5",
    "brand": "Lenovo",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 769,
    "sale_price_usd": 729,
    "in_stock": true,
    "stock_count": 14,
    "warranty_months": 24,
    "is_featured": true,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/lenovo-thinkpad-e14-gen-5.jpg",
    "short_desc_kh": "កុំព្យូទ័រយួរដៃការិយាល័យធន់មាំ កម្រិតយោធា MIL-STD-810H សាកសមបំផុតសម្រាប់ក្រុមហ៊ុន និងសហគ្រាស",
    "short_desc_en": "Durable business ultrabook engineered for enterprise productivity and all-day battery life",
    "specs": [
      {
        "key_kh": "ស៊ីភីយូ (CPU)",
        "key_en": "Processor",
        "value": "Intel Core i5-1335U (10 Cores, up to 4.6GHz)"
      },
      {
        "key_kh": "រ៉េម (RAM)",
        "key_en": "Memory",
        "value": "16GB DDR4 3200MHz"
      },
      {
        "key_kh": "អង្គផ្ទុកទិន្នន័យ",
        "key_en": "Storage",
        "value": "512GB M.2 PCIe 4.0 NVMe SSD"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "14.0\" WUXGA (1920x1200) IPS Anti-glare"
      },
      {
        "key_kh": "ទម្ងន់",
        "key_en": "Weight",
        "value": "1.43 kg"
      },
      {
        "key_kh": "ការធានា",
        "key_en": "Warranty",
        "value": "2 Years Authorized Warranty"
      }
    ]
  },
  {
    "id": "prod-dell-vostro-3520",
    "subcategory": "Laptop",
    "subcategory_slug": "laptop",
    "sku": "DELL-VOSTRO-3520-I7",
    "name_kh": "Dell Vostro 3520 (Core i7 / 16GB / 512GB SSD / 15.6\" 120Hz)",
    "name_en": "Dell Vostro 3520 (Intel Core i7-1255U, 16GB, 512GB SSD, 15.6\" 120Hz)",
    "slug": "dell-vostro-3520",
    "brand": "Dell",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 819,
    "sale_price_usd": 779,
    "in_stock": true,
    "stock_count": 9,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/dell-vostro-3520.jpg",
    "short_desc_kh": "Laptop អេក្រង់ធំ 15.6\" 120Hz មានបន្ទះលេខ Numpad ងាយស្រួលធ្វើការងារគណនេយ្យ និងរដ្ឋបាល",
    "short_desc_en": "15.6-inch business workhorse with 120Hz smooth panel and full numeric keypad",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "Processor",
        "value": "Intel Core i7-1255U (10 Cores, 12 Threads, 4.7GHz)"
      },
      {
        "key_kh": "RAM",
        "key_en": "Memory",
        "value": "16GB DDR4 3200MHz (Upgradable to 32GB)"
      },
      {
        "key_kh": "SSD",
        "key_en": "Storage",
        "value": "512GB M.2 PCIe NVMe"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "15.6\" FHD (1920x1080) 120Hz 250 nits WVA"
      }
    ]
  },
  {
    "id": "prod-macbook-air-m3",
    "subcategory": "MacBook",
    "subcategory_slug": "macbook",
    "sku": "APL-MBA13-M3-8-256",
    "name_kh": "Apple MacBook Air 13.6\" M3 (8-Core CPU / 8-Core GPU / 8GB / 256GB)",
    "name_en": "Apple MacBook Air 13.6\" M3 Chip (8-Core CPU, 8-Core GPU, 8GB, 256GB)",
    "slug": "apple-macbook-air-13-m3",
    "brand": "Apple",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 1099,
    "sale_price_usd": 1049,
    "in_stock": true,
    "stock_count": 8,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/apple-macbook-air-13-m3.jpg",
    "short_desc_kh": "ស្ដើង បំផុត ថ្មកាន់បានរហូតដល់ ១៨ ម៉ោង កម្លាំងបន្ទះឈីប Apple M3 ជំនាន់ចុងក្រោយ",
    "short_desc_en": "Incredibly thin and fast MacBook Air powered by the latest Apple Silicon M3",
    "specs": [
      {
        "key_kh": "បន្ទះឈីប",
        "key_en": "Chip",
        "value": "Apple M3 chip with 8-core CPU, 8-core GPU"
      },
      {
        "key_kh": "អង្គចងចាំ",
        "key_en": "Memory",
        "value": "8GB Unified Memory"
      },
      {
        "key_kh": "អង្គផ្ទុកទិន្នន័យ",
        "key_en": "Storage",
        "value": "256GB Fast SSD"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "13.6\" Liquid Retina with True Tone"
      }
    ]
  },
  {
    "id": "prod-asus-rog-strix-g16",
    "subcategory": "Gaming PC",
    "subcategory_slug": "gaming-pc",
    "sku": "ASUS-ROG-G16-4060",
    "name_kh": "ASUS ROG Strix G16 (Core i7-14650HX / 16GB DDR5 / 1TB SSD / RTX 4060 8GB)",
    "name_en": "ASUS ROG Strix G16 (Core i7-14650HX, 16GB DDR5, 1TB SSD, RTX 4060 8GB)",
    "slug": "asus-rog-strix-g16-2024",
    "brand": "ASUS",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 1399,
    "sale_price_usd": 1299,
    "in_stock": true,
    "stock_count": 6,
    "warranty_months": 24,
    "is_featured": true,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/asus-rog-strix-g16-2024.jpg",
    "short_desc_kh": "Gaming Laptop កម្លាំងខ្លាំង ROG Strix 16\" 165Hz ROG Intelligent Cooling និង RTX 4060",
    "short_desc_en": "Elite esports gaming notebook with 165Hz ROG Nebula display and thermal liquid metal",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "Processor",
        "value": "Intel Core i7-14650HX (16 Cores, 24 Threads, 5.2GHz)"
      },
      {
        "key_kh": "GPU",
        "key_en": "Graphics",
        "value": "NVIDIA GeForce RTX 4060 8GB GDDR6 (140W TGP)"
      },
      {
        "key_kh": "RAM",
        "key_en": "Memory",
        "value": "16GB DDR5 5600MHz"
      },
      {
        "key_kh": "SSD",
        "key_en": "Storage",
        "value": "1TB PCIe 4.0 NVMe M.2 SSD"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "16.0\" FHD+ 16:10 (1920x1200) 165Hz 100% sRGB"
      }
    ]
  },
  {
    "id": "prod-asus-tuf-a15",
    "subcategory": "Gaming PC",
    "subcategory_slug": "gaming-pc",
    "sku": "ASUS-TUF-A15-4050",
    "name_kh": "ASUS TUF Gaming A15 (Ryzen 7 7735HS / 16GB / 512GB / RTX 4050)",
    "name_en": "ASUS TUF Gaming A15 (AMD Ryzen 7 7735HS, 16GB DDR5, 512GB SSD, RTX 4050)",
    "slug": "asus-tuf-gaming-a15",
    "brand": "ASUS",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 949,
    "sale_price_usd": 899,
    "in_stock": true,
    "stock_count": 10,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/asus-tuf-gaming-a15.jpg",
    "short_desc_kh": "TUF Gaming ធន់មាំកម្រិតស្តង់ដារយោធា ថ្មធំ 90Wh ជាមួយ GPU RTX 4050 លេងហ្គេមរលូន",
    "short_desc_en": "Military-grade tough gaming notebook with 90Wh battery and RTX 4050 graphics",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "Processor",
        "value": "AMD Ryzen 7 7735HS (8 Cores, 16 Threads, 4.75GHz)"
      },
      {
        "key_kh": "GPU",
        "key_en": "Graphics",
        "value": "NVIDIA GeForce RTX 4050 6GB GDDR6 (140W)"
      },
      {
        "key_kh": "RAM",
        "key_en": "Memory",
        "value": "16GB DDR5 4800MHz"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "15.6\" FHD 144Hz G-Sync"
      }
    ]
  },
  {
    "id": "prod-acer-nitro-v15",
    "subcategory": "Gaming PC",
    "subcategory_slug": "gaming-pc",
    "sku": "ACR-NITRO-V15-3050",
    "name_kh": "Acer Nitro V 15 (Core i5-13420H / 16GB / 512GB SSD / RTX 3050 6GB)",
    "name_en": "Acer Nitro V 15 (Core i5-13420H, 16GB DDR5, 512GB SSD, RTX 3050 6GB)",
    "slug": "acer-nitro-v-15",
    "brand": "Acer",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 779,
    "sale_price_usd": 729,
    "in_stock": true,
    "stock_count": 7,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/acer-nitro-v-15.jpg",
    "short_desc_kh": "តម្លៃសមរម្យបំផុតសម្រាប់សិស្ស និស្សិត ឌីហ្សាញ និងលេងហ្គេម Esports",
    "short_desc_en": "Best value entry gaming and content creation laptop with DDR5 and 144Hz screen",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "Processor",
        "value": "Intel Core i5-13420H (8 Cores, 12 Threads)"
      },
      {
        "key_kh": "GPU",
        "key_en": "Graphics",
        "value": "NVIDIA GeForce RTX 3050 6GB GDDR6"
      },
      {
        "key_kh": "RAM",
        "key_en": "Memory",
        "value": "16GB DDR5 5200MHz"
      },
      {
        "key_kh": "SSD",
        "key_en": "Storage",
        "value": "512GB PCIe Gen4 SSD"
      }
    ]
  },
  {
    "id": "prod-lenovo-legion-pro-5",
    "subcategory": "Gaming PC",
    "subcategory_slug": "gaming-pc",
    "sku": "LNV-LEGION-PRO5-4070",
    "name_kh": "Lenovo Legion Pro 5 (Core i7-14700HX / 32GB DDR5 / 1TB / RTX 4070 8GB)",
    "name_en": "Lenovo Legion Pro 5 (Core i7-14700HX, 32GB DDR5, 1TB SSD, RTX 4070 8GB)",
    "slug": "lenovo-legion-pro-5",
    "brand": "Lenovo",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 1799,
    "sale_price_usd": 1699,
    "in_stock": true,
    "stock_count": 5,
    "warranty_months": 24,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/lenovo-legion-pro-5.jpg",
    "short_desc_kh": "Legion Pro 5 ជំនាន់ថ្មី អេក្រង់ 240Hz 2.5K WQXGA កម្លាំងកប់ RTX 4070 140W",
    "short_desc_en": "Top tier 240Hz 2.5K gaming beast with Legion Coldfront 5.0 and RTX 4070",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "Processor",
        "value": "Intel Core i7-14700HX (20 Cores, 28 Threads, 5.5GHz)"
      },
      {
        "key_kh": "GPU",
        "key_en": "Graphics",
        "value": "NVIDIA GeForce RTX 4070 8GB GDDR6 (140W)"
      },
      {
        "key_kh": "RAM",
        "key_en": "Memory",
        "value": "32GB (2x16GB) DDR5 5600MHz"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "16\" WQXGA (2560x1600) 240Hz 500 nits 100% sRGB"
      }
    ]
  },
  {
    "id": "prod-macbook-pro-14-m3",
    "subcategory": "MacBook",
    "subcategory_slug": "macbook",
    "sku": "APL-MBP14-M3PRO-18-512",
    "name_kh": "Apple MacBook Pro 14\" M3 Pro (18GB Unified RAM / 512GB SSD / Space Black)",
    "name_en": "Apple MacBook Pro 14\" M3 Pro (18GB Unified RAM, 512GB SSD, Space Black)",
    "slug": "apple-macbook-pro-14-m3",
    "brand": "Apple",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 2099,
    "sale_price_usd": 1999,
    "in_stock": true,
    "stock_count": 4,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/apple-macbook-pro-14-m3.jpg",
    "short_desc_kh": "ពណ៌ថ្មី Space Black ដ៏ប្រណីត អេក្រង់ Liquid Retina XDR 120Hz ProMotion សម្រាប់ Video Editor & Developer",
    "short_desc_en": "Pro workflow powerhouse in Space Black with Liquid Retina XDR 120Hz and M3 Pro",
    "specs": [
      {
        "key_kh": "Chip",
        "key_en": "Chip",
        "value": "Apple M3 Pro (11-core CPU, 14-core GPU, 16-core NE)"
      },
      {
        "key_kh": "RAM",
        "key_en": "Memory",
        "value": "18GB Unified Memory"
      },
      {
        "key_kh": "SSD",
        "key_en": "Storage",
        "value": "512GB High Speed SSD"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "14.2\" Liquid Retina XDR 120Hz ProMotion"
      }
    ]
  },
  {
    "id": "prod-dell-xps-15",
    "subcategory": "Laptop",
    "subcategory_slug": "laptop",
    "sku": "DELL-XPS15-9530",
    "name_kh": "Dell XPS 15 9530 (Core i7-13700H / 32GB / 1TB / RTX 4060 / 3.5K OLED Touch)",
    "name_en": "Dell XPS 15 9530 (Core i7-13700H, 32GB, 1TB, RTX 4060, 3.5K OLED Touch)",
    "slug": "dell-xps-15-9530",
    "brand": "Dell",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 2299,
    "sale_price_usd": 2199,
    "in_stock": true,
    "stock_count": 3,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/dell-xps-15-9530.jpg",
    "short_desc_kh": "Laptop កំពូលស្ដើងទំនើប អេក្រង់ 3.5K OLED Touch 100% DCI-P3 សម្រាប់អ្នកអាជីព",
    "short_desc_en": "Flagship creator laptop with stunning 3.5K OLED touch panel and CNC aluminum chassis",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "Processor",
        "value": "Intel Core i7-13700H (14 Cores, 5.0GHz)"
      },
      {
        "key_kh": "GPU",
        "key_en": "Graphics",
        "value": "NVIDIA GeForce RTX 4060 8GB GDDR6"
      },
      {
        "key_kh": "RAM",
        "key_en": "Memory",
        "value": "32GB DDR5 4800MHz"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "15.6\" 3.5K (3456x2160) OLED Touch 400 nits"
      }
    ]
  },
  {
    "id": "prod-hp-pavilion-15",
    "subcategory": "Laptop",
    "subcategory_slug": "laptop",
    "sku": "HP-PAV-15-EG3000",
    "name_kh": "HP Pavilion 15 (Core i5-1335U / 16GB / 512GB SSD / 15.6\" FHD IPS Silver)",
    "name_en": "HP Pavilion 15 (Core i5-1335U, 16GB, 512GB SSD, 15.6\" FHD IPS, Silver)",
    "slug": "hp-pavilion-15-eg3000",
    "brand": "HP",
    "category": "Computers",
    "category_slug": "computers",
    "pricing_type": "buy_now",
    "price_usd": 689,
    "sale_price_usd": 649,
    "in_stock": true,
    "stock_count": 15,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/hp-pavilion-15-eg3000.jpg",
    "short_desc_kh": "Laptop ការងារប្រចាំថ្ងៃ រចនាបថប្រាក់ភ្លឺចែងចាំង អេក្រង់ច្បាស់ B&O Audio",
    "short_desc_en": "Reliable all-around family and office laptop with B&O tuned sound and fast charge",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "Processor",
        "value": "Intel Core i5-1335U (10 Cores, 12 Threads)"
      },
      {
        "key_kh": "RAM",
        "key_en": "Memory",
        "value": "16GB DDR4 3200MHz"
      },
      {
        "key_kh": "SSD",
        "key_en": "Storage",
        "value": "512GB PCIe NVMe"
      },
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "15.6\" FHD (1920x1080) IPS Anti-glare"
      }
    ]
  },
  {
    "id": "prod-dell-u2723qe",
    "sku": "DELL-MON-U2723QE-4K",
    "name_kh": "Dell UltraSharp 27\" 4K USB-C Hub Monitor (U2723QE IPS Black)",
    "name_en": "Dell UltraSharp 27\" 4K USB-C Hub Monitor (IPS Black, 98% DCI-P3, HDR400)",
    "slug": "dell-ultrasharp-u2723qe",
    "brand": "Dell",
    "category": "Gaming Gear",
    "category_slug": "gaming",
    "subcategory": "Office / 4K Monitor",
    "subcategory_slug": "office-monitor",
    "pricing_type": "buy_now",
    "price_usd": 620,
    "sale_price_usd": 580,
    "in_stock": true,
    "stock_count": 8,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/dell-ultrasharp-u2723qe.jpg",
    "short_desc_kh": "អេក្រង់កម្រិតពិភពលោក 4K IPS Black កម្រិតពណ៌ច្បាស់ 98% DCI-P3 សាកសមសម្រាប់ Design & Mac",
    "short_desc_en": "Premier 4K IPS Black monitor with 90W USB-C charging, RJ45 and factory color calibration",
    "specs": [
      {
        "key_kh": "ទំហំ និងកម្រិតភាពច្បាស់",
        "key_en": "Resolution",
        "value": "27\" 4K UHD (3840 x 2160) at 60Hz"
      },
      {
        "key_kh": "ប្រភេទបន្ទះ (Panel)",
        "key_en": "Panel Type",
        "value": "IPS Black Technology, Contrast 2000:1"
      },
      {
        "key_kh": "Color Gamut",
        "key_en": "Color Gamut",
        "value": "100% sRGB, 98% DCI-P3, VESA DisplayHDR 400"
      },
      {
        "key_kh": "Port តភ្ជាប់",
        "key_en": "Connectivity",
        "value": "HDMI 2.0, DP 1.4, USB-C (90W PD), RJ45 Ethernet"
      }
    ]
  },
  {
    "id": "prod-samsung-odyssey-g5",
    "sku": "SAM-ODYSSEY-G5-27",
    "name_kh": "Samsung Odyssey G5 27\" QHD 165Hz Curved Gaming Monitor (1000R)",
    "name_en": "Samsung Odyssey G5 27\" QHD 165Hz 1ms 1000R Curved Gaming Monitor",
    "slug": "samsung-odyssey-g5-27",
    "brand": "Samsung",
    "category": "Gaming Gear",
    "category_slug": "gaming",
    "subcategory": "Gaming Monitor",
    "subcategory_slug": "gaming-monitor",
    "pricing_type": "buy_now",
    "price_usd": 319,
    "sale_price_usd": 289,
    "in_stock": true,
    "stock_count": 11,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/samsung-odyssey-g5-27.jpg",
    "short_desc_kh": "អេក្រង់កោង 1000R ស្របនឹងគ្រាប់ភ្នែកមនុស្ស កម្រិត 2K 165Hz 1ms លេងហ្គេមបាញ់ប្រហារឥតទាក់",
    "short_desc_en": "Immersive 1000R curvature matching human eye with 165Hz refresh rate and FreeSync",
    "specs": [
      {
        "key_kh": "កម្រិតភាពច្បាស់",
        "key_en": "Resolution",
        "value": "27\" QHD (2560 x 1440) 1000R Curved"
      },
      {
        "key_kh": "Refresh Rate",
        "key_en": "Refresh Rate",
        "value": "165Hz, 1ms Response Time (MPRT)"
      },
      {
        "key_kh": "បច្ចេកវិទ្យា",
        "key_en": "Technology",
        "value": "AMD FreeSync Premium, HDR10"
      }
    ]
  },
  {
    "id": "prod-lg-ultragear-27",
    "sku": "LG-27GR75Q-QHD",
    "name_kh": "LG UltraGear 27\" QHD IPS 165Hz 1ms Gaming Monitor (HDR10, G-Sync)",
    "name_en": "LG UltraGear 27\" QHD IPS 165Hz 1ms Gaming Monitor (HDR10, G-Sync Comp)",
    "slug": "lg-ultragear-27gr75q",
    "brand": "LG",
    "category": "Gaming Gear",
    "category_slug": "gaming",
    "subcategory": "Gaming Monitor",
    "subcategory_slug": "gaming-monitor",
    "pricing_type": "buy_now",
    "price_usd": 289,
    "sale_price_usd": 265,
    "in_stock": true,
    "stock_count": 9,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/lg-ultragear-27gr75q.jpg",
    "short_desc_kh": "IPS ពណ៌ធម្មជាតិច្បាស់ត្រជាក់ភ្នែក កម្រិត 2K 165Hz ឆ្លើយតបលឿន 1ms (GtG)",
    "short_desc_en": "Fast IPS panel with vibrant colors, 1ms GtG response and NVIDIA G-Sync compatible",
    "specs": [
      {
        "key_kh": "កម្រិតភាពច្បាស់",
        "key_en": "Resolution",
        "value": "27\" QHD (2560 x 1440) Flat IPS"
      },
      {
        "key_kh": "Refresh Rate",
        "key_en": "Refresh Rate",
        "value": "165Hz, 1ms (GtG at Faster)"
      },
      {
        "key_kh": "ពណ៌",
        "key_en": "Color Gamut",
        "value": "sRGB 99%, HDR10"
      }
    ]
  },
  {
    "id": "prod-asus-tuf-vg249q1a",
    "sku": "ASUS-TUF-VG249Q1A",
    "name_kh": "ASUS TUF Gaming 23.8\" FHD IPS 165Hz 1ms FreeSync Premium",
    "name_en": "ASUS TUF Gaming 23.8\" FHD IPS 165Hz 1ms FreeSync Premium",
    "slug": "asus-tuf-gaming-vg249q1a",
    "brand": "ASUS",
    "category": "Gaming Gear",
    "category_slug": "gaming",
    "subcategory": "Gaming Monitor",
    "subcategory_slug": "gaming-monitor",
    "pricing_type": "buy_now",
    "price_usd": 185,
    "sale_price_usd": 169,
    "in_stock": true,
    "stock_count": 16,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/asus-tuf-gaming-vg249q1a.jpg",
    "short_desc_kh": "Monitor Gaming 24 អ៊ីញដែលលក់ដាច់បំផុតនៅកម្ពុជា IPS 165Hz តម្លៃសមរម្យធានា ៣ ឆ្នាំពេញ",
    "short_desc_en": "Cambodia best-selling 24\" esports IPS monitor with 165Hz and Extreme Low Motion Blur",
    "specs": [
      {
        "key_kh": "កម្រិតភាពច្បាស់",
        "key_en": "Resolution",
        "value": "23.8\" FHD (1920x1080) IPS"
      },
      {
        "key_kh": "Refresh Rate",
        "key_en": "Refresh Rate",
        "value": "165Hz (Overclocked), 1ms MPRT"
      }
    ]
  },
  {
    "id": "prod-msi-modern-md241p",
    "sku": "MSI-MD241P-BIZ",
    "name_kh": "MSI Modern MD241P 23.8\" FHD IPS 75Hz Ergonomic Business Monitor",
    "name_en": "MSI Modern MD241P 23.8\" FHD IPS 75Hz Ergonomic Business Monitor",
    "slug": "msi-modern-md241p",
    "brand": "MSI",
    "category": "Gaming Gear",
    "category_slug": "gaming",
    "subcategory": "Office / 4K Monitor",
    "subcategory_slug": "office-monitor",
    "pricing_type": "buy_now",
    "price_usd": 155,
    "sale_price_usd": 139,
    "in_stock": true,
    "stock_count": 12,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/msi-modern-md241p.jpg",
    "short_desc_kh": "អេក្រង់ការិយាល័យអាចបង្វិលបញ្ឈរ 90 ដឺក្រេ លើកចុះឡើង ការពារភ្នែក Less Blue Light",
    "short_desc_en": "Ergonomic office display with 4-way adjustable stand, USB-C and built-in speakers",
    "specs": [
      {
        "key_kh": "អេក្រង់",
        "key_en": "Display",
        "value": "23.8\" FHD IPS Anti-Flicker"
      },
      {
        "key_kh": "ជើងទម្រ",
        "key_en": "Stand",
        "value": "Height, Pivot (90° vertical), Swivel, Tilt"
      }
    ]
  },
  {
    "id": "cpu-i5-14400f",
    "sku": "INTEL-I5-14400F",
    "name_kh": "Intel Core i5-14400F Desktop Processor (10 Cores, LGA1700)",
    "name_en": "Intel Core i5-14400F Desktop Processor (10 Cores, LGA1700)",
    "slug": "intel-core-i5-14400f",
    "brand": "Intel",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "CPU",
    "subcategory_slug": "cpu",
    "pricing_type": "buy_now",
    "price_usd": 215,
    "sale_price_usd": 199,
    "in_stock": true,
    "stock_count": 20,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": false,
    "part_type": "cpu",
    "part_spec": {
      "socket": "LGA1700",
      "tdpWatts": 65,
      "ramType": "DDR5"
    },
    "image": "/images/products/intel-core-i5-14400f.jpg",
    "short_desc_kh": "Best Value CPU ជំនាន់ទី 14 សម្រាប់ Gaming និងការងារទូទៅ 10 Cores 16 Threads",
    "short_desc_en": "Best value 14th gen processor with 10 cores and 16 threads for gaming and work",
    "specs": [
      {
        "key_kh": "Socket",
        "key_en": "Socket",
        "value": "LGA1700"
      },
      {
        "key_kh": "Cores / Threads",
        "key_en": "Cores",
        "value": "10 Cores (6P + 4E) / 16 Threads"
      },
      {
        "key_kh": "Base / Boost",
        "key_en": "Frequency",
        "value": "2.5GHz Base / up to 4.7GHz Boost"
      },
      {
        "key_kh": "TDP",
        "key_en": "Power Draw",
        "value": "65W Base / 148W Turbo"
      }
    ]
  },
  {
    "id": "prod-cpu-i7-14700k",
    "sku": "INTEL-I7-14700K",
    "name_kh": "Intel Core i7-14700K Desktop Processor (20 Cores, up to 5.6GHz, LGA1700)",
    "name_en": "Intel Core i7-14700K Desktop Processor (20 Cores, up to 5.6GHz, LGA1700)",
    "slug": "intel-core-i7-14700k",
    "brand": "Intel",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "CPU",
    "subcategory_slug": "cpu",
    "pricing_type": "buy_now",
    "price_usd": 449,
    "sale_price_usd": 419,
    "in_stock": true,
    "stock_count": 10,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": true,
    "part_type": "cpu",
    "part_spec": {
      "socket": "LGA1700",
      "tdpWatts": 125,
      "ramType": "DDR5"
    },
    "image": "/images/products/intel-core-i7-14700k.jpg",
    "short_desc_kh": "កម្លាំងខ្លាំង 20 Cores 28 Threads ល្បឿនរហូតដល់ 5.6GHz សម្រាប់ 3D Render & High-end Gaming",
    "short_desc_en": "High-end productivity powerhouse with 20 cores, 28 threads and 5.6GHz turbo frequency",
    "specs": [
      {
        "key_kh": "Socket",
        "key_en": "Socket",
        "value": "LGA1700"
      },
      {
        "key_kh": "Cores",
        "key_en": "Cores",
        "value": "20 Cores (8P + 12E), 28 Threads"
      },
      {
        "key_kh": "Max Boost",
        "key_en": "Max Boost",
        "value": "5.6 GHz"
      }
    ]
  },
  {
    "id": "prod-cpu-i9-14900k",
    "sku": "INTEL-I9-14900K",
    "name_kh": "Intel Core i9-14900K Flagship Desktop Processor (24 Cores, 6.0GHz, LGA1700)",
    "name_en": "Intel Core i9-14900K Flagship Desktop Processor (24 Cores, 6.0GHz, LGA1700)",
    "slug": "intel-core-i9-14900k",
    "brand": "Intel",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "CPU",
    "subcategory_slug": "cpu",
    "pricing_type": "buy_now",
    "price_usd": 620,
    "sale_price_usd": 589,
    "in_stock": true,
    "stock_count": 6,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": false,
    "part_type": "cpu",
    "part_spec": {
      "socket": "LGA1700",
      "tdpWatts": 253,
      "ramType": "DDR5"
    },
    "image": "/images/products/intel-core-i9-14900k.jpg",
    "short_desc_kh": "កំពូល CPU លឿនបំផុតក្នុងលោក 6.0 GHz Thermal Velocity Boost 24 Cores 32 Threads",
    "short_desc_en": "Flagship Intel processor breaking the 6.0GHz threshold for absolute enthusiast performance",
    "specs": [
      {
        "key_kh": "Cores",
        "key_en": "Cores",
        "value": "24 Cores (8P + 16E) / 32 Threads"
      },
      {
        "key_kh": "Speed",
        "key_en": "Speed",
        "value": "Up to 6.0GHz"
      }
    ]
  },
  {
    "id": "cpu-ryzen-7-7800x3d",
    "sku": "AMD-R7-7800X3D",
    "name_kh": "AMD Ryzen 7 7800X3D Desktop Processor (8 Cores, 16 Threads, AM5)",
    "name_en": "AMD Ryzen 7 7800X3D Desktop Processor (8 Cores, 16 Threads, AM5)",
    "slug": "amd-ryzen-7-7800x3d",
    "brand": "AMD",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "CPU",
    "subcategory_slug": "cpu",
    "pricing_type": "buy_now",
    "price_usd": 440,
    "sale_price_usd": 410,
    "in_stock": true,
    "stock_count": 8,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": false,
    "part_type": "cpu",
    "part_spec": {
      "socket": "AM5",
      "tdpWatts": 120,
      "ramType": "DDR5"
    },
    "image": "/images/products/amd-ryzen-7-7800x3d.jpg",
    "short_desc_kh": "ស្ដេច CPU Gaming ក្នុងលោក ជាមួយបច្ចេកវិទ្យា 3D V-Cache 96MB L3 Cache",
    "short_desc_en": "The undisputed fastest gaming processor in the world with 3D V-Cache technology",
    "specs": [
      {
        "key_kh": "Socket",
        "key_en": "Socket",
        "value": "AM5 (LGA1718)"
      },
      {
        "key_kh": "Cores",
        "key_en": "Cores",
        "value": "8 Cores / 16 Threads"
      },
      {
        "key_kh": "L3 Cache",
        "key_en": "Cache",
        "value": "96MB 3D V-Cache"
      }
    ]
  },
  {
    "id": "prod-cpu-r5-7600x",
    "sku": "AMD-R5-7600X",
    "name_kh": "AMD Ryzen 5 7600X Processor (6 Cores, 12 Threads, 5.3GHz, AM5)",
    "name_en": "AMD Ryzen 5 7600X Processor (6 Cores, 12 Threads, 5.3GHz, AM5)",
    "slug": "amd-ryzen-5-7600x",
    "brand": "AMD",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "CPU",
    "subcategory_slug": "cpu",
    "pricing_type": "buy_now",
    "price_usd": 235,
    "sale_price_usd": 215,
    "in_stock": true,
    "stock_count": 14,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": false,
    "part_type": "cpu",
    "part_spec": {
      "socket": "AM5",
      "tdpWatts": 105,
      "ramType": "DDR5"
    },
    "image": "/images/products/amd-ryzen-5-7600x.jpg",
    "short_desc_kh": "ជម្រើសដ៏ល្អសម្រាប់អ្នកចាប់ផ្តើមជាមួយ Socket AM5 ជំនាន់ថ្មី និង DDR5",
    "short_desc_en": "Great value AM5 entry processor with high single-core performance up to 5.3GHz",
    "specs": [
      {
        "key_kh": "Socket",
        "key_en": "Socket",
        "value": "AM5"
      },
      {
        "key_kh": "Cores",
        "key_en": "Cores",
        "value": "6 Cores / 12 Threads"
      }
    ]
  },
  {
    "id": "mb-msi-b760m-wifi",
    "sku": "MSI-B760M-A-WIFI",
    "name_kh": "MSI PRO B760M-A WIFI DDR5 Motherboard (LGA1700, mATX)",
    "name_en": "MSI PRO B760M-A WIFI DDR5 Motherboard (LGA1700, mATX)",
    "slug": "msi-b760m-a-wifi-ddr5",
    "brand": "MSI",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "Motherboard",
    "subcategory_slug": "motherboard",
    "pricing_type": "buy_now",
    "price_usd": 175,
    "sale_price_usd": 165,
    "in_stock": true,
    "stock_count": 12,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": false,
    "part_type": "motherboard",
    "part_spec": {
      "socket": "LGA1700",
      "formFactor": "Micro-ATX",
      "ramType": "DDR5",
      "ramSlots": 4,
      "chipset": "B760"
    },
    "image": "/images/products/msi-b760m-a-wifi-ddr5.jpg",
    "short_desc_kh": "Motherboard B760 DDR5 គុណភាពខ្ពស់ មាន Wi-Fi 6E និង Bluetooth 5.3 ស្រាប់",
    "short_desc_en": "Solid B760 board with dual M.2 Gen4 slots, 2.5G LAN and Wi-Fi 6E onboard",
    "specs": [
      {
        "key_kh": "Socket",
        "key_en": "Socket",
        "value": "LGA1700 (Intel 12th/13th/14th Gen)"
      },
      {
        "key_kh": "RAM",
        "key_en": "RAM Slots",
        "value": "4x DDR5 Slots up to 7200+ MHz (OC)"
      }
    ]
  },
  {
    "id": "mb-rog-b650e",
    "sku": "ASUS-ROG-B650E-F",
    "name_kh": "ASUS ROG Strix B650E-F Gaming WiFi Motherboard (AM5, ATX, PCIe 5.0)",
    "name_en": "ASUS ROG Strix B650E-F Gaming WiFi Motherboard (AM5, ATX, PCIe 5.0)",
    "slug": "asus-rog-strix-b650e-f",
    "brand": "ASUS",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "Motherboard",
    "subcategory_slug": "motherboard",
    "pricing_type": "buy_now",
    "price_usd": 310,
    "sale_price_usd": 289,
    "in_stock": true,
    "stock_count": 7,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": false,
    "part_type": "motherboard",
    "part_spec": {
      "socket": "AM5",
      "formFactor": "ATX",
      "ramType": "DDR5",
      "ramSlots": 4,
      "chipset": "B650E"
    },
    "image": "/images/products/asus-rog-strix-b650e-f.jpg",
    "short_desc_kh": "ROG Strix AM5 លំដាប់ខ្ពស់ PCIe 5.0 x16 ត្រៀមសម្រាប់ GPU ជំនាន់អនាគត និង VRM 12+2 Phases",
    "short_desc_en": "Premium enthusiast AM5 platform with PCIe 5.0 graphics slot and robust 12+2 power stages",
    "specs": [
      {
        "key_kh": "Socket",
        "key_en": "Socket",
        "value": "AM5 for AMD Ryzen 7000/8000/9000"
      },
      {
        "key_kh": "Form Factor",
        "key_en": "Form Factor",
        "value": "ATX"
      }
    ]
  },
  {
    "id": "prod-mb-gb-b760",
    "sku": "GB-B760-GAMING-X",
    "name_kh": "Gigabyte B760 Gaming X AX DDR5 Motherboard (Intel LGA1700, ATX)",
    "name_en": "Gigabyte B760 Gaming X AX DDR5 Motherboard (Intel LGA1700, ATX)",
    "slug": "gigabyte-b760-gaming-x",
    "brand": "Gigabyte",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "Motherboard",
    "subcategory_slug": "motherboard",
    "pricing_type": "buy_now",
    "price_usd": 195,
    "sale_price_usd": 185,
    "in_stock": true,
    "stock_count": 10,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": false,
    "part_type": "motherboard",
    "part_spec": {
      "socket": "LGA1700",
      "formFactor": "ATX",
      "ramType": "DDR5",
      "ramSlots": 4,
      "chipset": "B760"
    },
    "image": "/images/products/gigabyte-b760-gaming-x.jpg",
    "short_desc_kh": "ទំហំ ATX ពេញលេញ បំពាក់ Heatsink ក្រាស់ត្រជាក់ 3x M.2 Slots និង Wi-Fi 6E",
    "short_desc_en": "Full ATX board with heavy thermal armor, 3x M.2 PCIe 4.0 slots and 2.5GbE",
    "specs": [
      {
        "key_kh": "Socket",
        "key_en": "Socket",
        "value": "LGA1700"
      },
      {
        "key_kh": "Form Factor",
        "key_en": "Form Factor",
        "value": "ATX"
      }
    ]
  },
  {
    "id": "ram-corsair-ddr5-32gb",
    "sku": "CORSAIR-VEN-32G-D5",
    "name_kh": "Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz CL36 Black",
    "name_en": "Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz CL36 Black",
    "slug": "corsair-vengeance-32gb-ddr5",
    "brand": "Corsair",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "RAM",
    "subcategory_slug": "ram",
    "pricing_type": "buy_now",
    "price_usd": 125,
    "sale_price_usd": 115,
    "in_stock": true,
    "stock_count": 18,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": false,
    "part_type": "ram",
    "part_spec": {
      "ramType": "DDR5"
    },
    "image": "/images/products/corsair-vengeance-32gb-ddr5.jpg",
    "short_desc_kh": "រ៉េម DDR5 6000MHz កម្រិតខ្ពស់គាំទ្រទាំង Intel XMP 3.0 និង AMD EXPO",
    "short_desc_en": "Ultra-fast low-profile DDR5 dual kit with Intel XMP 3.0 and AMD EXPO dual profile",
    "specs": [
      {
        "key_kh": "ទំហំ",
        "key_en": "Capacity",
        "value": "32GB Kit (2 x 16GB)"
      },
      {
        "key_kh": "ល្បឿន",
        "key_en": "Speed",
        "value": "DDR5 6000 MT/s (CL36)"
      }
    ]
  },
  {
    "id": "prod-ram-kingston-16gb",
    "sku": "KNG-FURY-16G-D5",
    "name_kh": "Kingston Fury Beast 16GB (2x8GB) DDR5 5600MHz CL40",
    "name_en": "Kingston Fury Beast 16GB (2x8GB) DDR5 5600MHz CL40",
    "slug": "kingston-fury-beast-16gb-ddr5",
    "brand": "Kingston",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "RAM",
    "subcategory_slug": "ram",
    "pricing_type": "buy_now",
    "price_usd": 75,
    "sale_price_usd": 69,
    "in_stock": true,
    "stock_count": 22,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": true,
    "part_type": "ram",
    "part_spec": {
      "ramType": "DDR5"
    },
    "image": "/images/products/kingston-fury-beast-16gb-ddr5.jpg",
    "short_desc_kh": "ឈុត RAM DDR5 16GB តម្លៃសន្សំសំចៃ ធន់មាំ និងសក្តិសមសម្រាប់ Gaming Budget",
    "short_desc_en": "Affordable dual-channel 16GB DDR5 memory kit with plug and play auto-overclocking",
    "specs": [
      {
        "key_kh": "ទំហំ",
        "key_en": "Capacity",
        "value": "16GB (2 x 8GB)"
      },
      {
        "key_kh": "ល្បឿន",
        "key_en": "Speed",
        "value": "DDR5 5600MHz"
      }
    ]
  },
  {
    "id": "ssd-samsung-990pro",
    "sku": "SAM-990PRO-2TB",
    "name_kh": "Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD (7450 MB/s)",
    "name_en": "Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD (7450 MB/s Read)",
    "slug": "samsung-990-pro-2tb-nvme",
    "brand": "Samsung",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "SSD",
    "subcategory_slug": "ssd",
    "pricing_type": "buy_now",
    "price_usd": 199,
    "sale_price_usd": 185,
    "in_stock": true,
    "stock_count": 14,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": false,
    "part_type": "storage_ssd",
    "image": "/images/products/samsung-990-pro-2tb-nvme.jpg",
    "short_desc_kh": "ស្តេច SSD PCIe 4.0 ល្បឿនអានដល់ទៅ 7,450 MB/s សម្រាប់ Video 4K/8K និង PS5",
    "short_desc_en": "The pinnacle of PCIe 4.0 NVMe performance reaching 7,450 MB/s sequential read speed",
    "specs": [
      {
        "key_kh": "ទំហំ",
        "key_en": "Capacity",
        "value": "2,000 GB (2TB)"
      },
      {
        "key_kh": "ល្បឿនអាន/សរសេរ",
        "key_en": "Speed",
        "value": "Read: 7450 MB/s | Write: 6900 MB/s"
      }
    ],
    "part_spec": {
      "formFactor": "M.2 NVMe"
    }
  },
  {
    "id": "ssd-kingston-nv2-1tb",
    "sku": "KNG-NV2-1TB-GEN4",
    "name_kh": "Kingston NV2 1TB PCIe 4.0 x4 NVMe M.2 2280 SSD",
    "name_en": "Kingston NV2 1TB PCIe 4.0 x4 NVMe M.2 2280 Internal SSD",
    "slug": "kingston-nv2-1tb-nvme",
    "brand": "Kingston",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "SSD",
    "subcategory_slug": "ssd",
    "pricing_type": "buy_now",
    "price_usd": 72,
    "sale_price_usd": 65,
    "in_stock": true,
    "stock_count": 28,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": true,
    "part_type": "storage_ssd",
    "image": "/images/products/kingston-nv2-1tb-nvme.jpg",
    "short_desc_kh": "SSD M.2 NVMe 1TB លក់ដាច់បំផុតនៅកម្ពុជា ល្បឿនលឿន 3500MB/s ធានា ៣ ឆ្នាំ",
    "short_desc_en": "Budget-friendly 1TB Gen4 drive offering 3500MB/s read speeds for PC upgrades",
    "specs": [
      {
        "key_kh": "ទំហំ",
        "key_en": "Capacity",
        "value": "1TB (1000GB)"
      },
      {
        "key_kh": "ល្បឿនអាន",
        "key_en": "Read Speed",
        "value": "Up to 3,500 MB/s"
      }
    ],
    "part_spec": {
      "formFactor": "M.2 NVMe"
    }
  },
  {
    "id": "gpu-asus-rtx-4060",
    "sku": "ASUS-DUAL-RTX4060-O8G",
    "name_kh": "ASUS Dual GeForce RTX 4060 OC Edition 8GB GDDR6",
    "name_en": "ASUS Dual GeForce RTX 4060 OC Edition 8GB GDDR6 Graphics Card",
    "slug": "asus-dual-rtx-4060-8gb",
    "brand": "ASUS",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "Graphics Card",
    "subcategory_slug": "gpu",
    "pricing_type": "buy_now",
    "price_usd": 349,
    "sale_price_usd": 329,
    "in_stock": true,
    "stock_count": 11,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": false,
    "part_type": "gpu",
    "part_spec": {
      "tdpWatts": 115,
      "psuRecommendedWatts": 550,
      "gpuLengthMm": 227
    },
    "image": "/images/products/asus-dual-rtx-4060-8gb.jpg",
    "short_desc_kh": "Graphic Card RTX 40-Series ជំនាន់ថ្មី DLSS 3.5 Frame Generation ស៊ីភ្លើងតិចត្រឹម 115W",
    "short_desc_en": "Energy efficient Ada Lovelace architecture with DLSS 3.5 AI upscaling and dual axial fans",
    "specs": [
      {
        "key_kh": "VRAM",
        "key_en": "VRAM",
        "value": "8GB GDDR6 (128-bit)"
      },
      {
        "key_kh": "ប្រវែង GPU",
        "key_en": "Length",
        "value": "227 mm"
      },
      {
        "key_kh": "PSU ណែនាំ",
        "key_en": "Rec PSU",
        "value": "550 Watts"
      }
    ]
  },
  {
    "id": "gpu-gigabyte-rtx-4070-super",
    "sku": "GB-RTX4070S-WF3OC",
    "name_kh": "Gigabyte GeForce RTX 4070 SUPER Windforce OC 12GB GDDR6X",
    "name_en": "Gigabyte GeForce RTX 4070 SUPER Windforce OC 12GB GDDR6X",
    "slug": "gigabyte-rtx-4070-super-windforce",
    "brand": "Gigabyte",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "Graphics Card",
    "subcategory_slug": "gpu",
    "pricing_type": "buy_now",
    "price_usd": 689,
    "sale_price_usd": 659,
    "in_stock": true,
    "stock_count": 7,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": true,
    "part_type": "gpu",
    "part_spec": {
      "tdpWatts": 220,
      "psuRecommendedWatts": 650,
      "gpuLengthMm": 261
    },
    "image": "/images/products/gigabyte-rtx-4070-super-windforce.jpg",
    "short_desc_kh": "RTX 4070 SUPER កង្ហារ 3 Windforce ត្រជាក់ខ្លាំង លេងហ្គេម 2K Max Settings គ្រប់ហ្គេម",
    "short_desc_en": "Triple fan cooling with 12GB fast GDDR6X memory for flawless 1440p ultra gaming",
    "specs": [
      {
        "key_kh": "VRAM",
        "key_en": "VRAM",
        "value": "12GB GDDR6X (192-bit)"
      },
      {
        "key_kh": "កង្ហារ",
        "key_en": "Cooling",
        "value": "WINDFORCE 3x 90mm Fans"
      },
      {
        "key_kh": "PSU ណែនាំ",
        "key_en": "Rec PSU",
        "value": "650 Watts"
      }
    ]
  },
  {
    "id": "prod-gpu-rtx4070ti-super",
    "sku": "ASUS-TUF-4070TIS-16G",
    "name_kh": "ASUS TUF Gaming GeForce RTX 4070 Ti SUPER 16GB GDDR6X",
    "name_en": "ASUS TUF Gaming GeForce RTX 4070 Ti SUPER 16GB GDDR6X",
    "slug": "asus-tuf-rtx-4070ti-super-16gb",
    "brand": "ASUS",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "Graphics Card",
    "subcategory_slug": "gpu",
    "pricing_type": "buy_now",
    "price_usd": 949,
    "sale_price_usd": 899,
    "in_stock": true,
    "stock_count": 4,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": false,
    "part_type": "gpu",
    "part_spec": {
      "tdpWatts": 285,
      "psuRecommendedWatts": 750,
      "gpuLengthMm": 305
    },
    "image": "/images/products/asus-tuf-rtx-4070ti-super-16gb.jpg",
    "short_desc_kh": "VRAM ធំដល់ 16GB 256-bit សម្រាប់ 4K Gaming និង AI Large Language Models Local Inference",
    "short_desc_en": "16GB 256-bit VRAM powerhouse built with military-grade TUF chokes and dual ball bearings",
    "specs": [
      {
        "key_kh": "VRAM",
        "key_en": "VRAM",
        "value": "16GB GDDR6X (256-bit)"
      },
      {
        "key_kh": "ប្រវែង GPU",
        "key_en": "Length",
        "value": "305 mm"
      },
      {
        "key_kh": "PSU ណែនាំ",
        "key_en": "Rec PSU",
        "value": "750 Watts"
      }
    ]
  },
  {
    "id": "case-montech-air-100",
    "sku": "MONTECH-AIR100-BLK",
    "name_kh": "Montech AIR 100 ARGB Micro-ATX Mini-Tower PC Case (4x ARGB Fans)",
    "name_en": "Montech AIR 100 ARGB Micro-ATX Mini-Tower PC Case (4x ARGB Fans included)",
    "slug": "montech-air-100-argb-black",
    "brand": "Montech",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "PC Case",
    "subcategory_slug": "case",
    "pricing_type": "buy_now",
    "price_usd": 59,
    "sale_price_usd": 54,
    "in_stock": true,
    "stock_count": 15,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "case",
    "part_spec": {
      "formFactor": "Micro-ATX",
      "caseMaxCoolerMm": 161,
      "caseMaxGpuMm": 330
    },
    "image": "/images/products/montech-air-100-argb-black.jpg",
    "short_desc_kh": "Case ខ្យល់ចេញចូលល្អ Mesh Front Panel ភ្ជាប់មកជាមួយកង្ហារ ARGB ចំនួន ៤ គ្រាប់ស្រាប់",
    "short_desc_en": "High airflow mesh case featuring 4 pre-installed ARGB fans and magnetic swing door",
    "specs": [
      {
        "key_kh": "ទំហំ Motherboard",
        "key_en": "Motherboard",
        "value": "Micro-ATX, Mini-ITX"
      },
      {
        "key_kh": "គាំទ្រ GPU",
        "key_en": "Max GPU",
        "value": "330 mm"
      }
    ]
  },
  {
    "id": "case-nzxt-h5-flow",
    "sku": "NZXT-H5-FLOW-RGB-BK",
    "name_kh": "NZXT H5 Flow RGB Compact ATX Mid-Tower Case with Dual 140mm RGB",
    "name_en": "NZXT H5 Flow RGB Compact ATX Mid-Tower Case with Dual 140mm RGB Fans",
    "slug": "nzxt-h5-flow-rgb-black",
    "brand": "NZXT",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "PC Case",
    "subcategory_slug": "case",
    "pricing_type": "buy_now",
    "price_usd": 109,
    "sale_price_usd": 98,
    "in_stock": true,
    "stock_count": 8,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "case",
    "part_spec": {
      "formFactor": "ATX",
      "caseMaxCoolerMm": 165,
      "caseMaxGpuMm": 365
    },
    "image": "/images/products/nzxt-h5-flow-rgb-black.jpg",
    "short_desc_kh": "រចនាបថ Minimalist ស្អាតឥតខ្ចោះ កង្ហារបាញ់ខ្យល់ត្រជាក់ចំ GPU ផ្ទាល់",
    "short_desc_en": "Clean aesthetic case with dedicated bottom GPU intake fan and front perforated mesh",
    "specs": [
      {
        "key_kh": "Motherboard",
        "key_en": "Motherboard",
        "value": "ATX, Micro-ATX, Mini-ITX"
      },
      {
        "key_kh": "Max GPU",
        "key_en": "Max GPU",
        "value": "365 mm"
      }
    ]
  },
  {
    "id": "psu-coolermaster-mwe-650w",
    "sku": "CM-MWE-650-BRONZE",
    "name_kh": "Cooler Master MWE Bronze 650 V2 230V 80 Plus Bronze Power Supply",
    "name_en": "Cooler Master MWE Bronze 650 V2 230V 80 Plus Bronze Power Supply",
    "slug": "cooler-master-mwe-650w-bronze",
    "brand": "Cooler Master",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "Power Supply",
    "subcategory_slug": "psu",
    "pricing_type": "buy_now",
    "price_usd": 65,
    "sale_price_usd": 58,
    "in_stock": true,
    "stock_count": 20,
    "warranty_months": 60,
    "is_featured": false,
    "is_deal": false,
    "part_type": "psu",
    "part_spec": {
      "tdpWatts": 650,
      "psuRecommendedWatts": 650
    },
    "image": "/images/products/cooler-master-mwe-650w-bronze.jpg",
    "short_desc_kh": "ប្រភពថាមពល 650W 80 Plus Bronze កង្ហារស្ងាត់ HDB Fan ធានារយៈពេល ៥ ឆ្នាំពេញ",
    "short_desc_en": "Reliable 650W power supply with 80+ Bronze efficiency and flat black cables",
    "specs": [
      {
        "key_kh": "កម្លាំងវ៉ាត់",
        "key_en": "Wattage",
        "value": "650 Watts (80 PLUS Bronze)"
      },
      {
        "key_kh": "ការធានា",
        "key_en": "Warranty",
        "value": "5 Years Manufacturer Warranty"
      }
    ]
  },
  {
    "id": "psu-corsair-rm850e",
    "sku": "CORSAIR-RM850E-ATX3",
    "name_kh": "Corsair RM850e Fully Modular Low-Noise ATX 3.0 80+ Gold Power Supply",
    "name_en": "Corsair RM850e Fully Modular Low-Noise ATX 3.0 80+ Gold Power Supply",
    "slug": "corsair-rm850e-850w-gold-atx3",
    "brand": "Corsair",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "Power Supply",
    "subcategory_slug": "psu",
    "pricing_type": "buy_now",
    "price_usd": 149,
    "sale_price_usd": 135,
    "in_stock": true,
    "stock_count": 9,
    "warranty_months": 84,
    "is_featured": true,
    "is_deal": false,
    "part_type": "psu",
    "part_spec": {
      "tdpWatts": 850,
      "psuRecommendedWatts": 850
    },
    "image": "/images/products/corsair-rm850e-850w-gold-atx3.jpg",
    "short_desc_kh": "ស្តង់ដារ ATX 3.0 & PCIe 5.0 មានខ្សែ 12VHPWR សម្រាប់ RTX 4070/4080/4090 ធានា ៧ ឆ្នាំ",
    "short_desc_en": "Cybenetics Platinum quiet 850W PSU with native 12V-2x6 cable and Japanese capacitors",
    "specs": [
      {
        "key_kh": "កម្លាំង",
        "key_en": "Wattage",
        "value": "850 Watts (80 PLUS Gold)"
      },
      {
        "key_kh": "ស្តង់ដារ",
        "key_en": "Standard",
        "value": "ATX 3.0 / PCIe 5.0 Ready"
      }
    ]
  },
  {
    "id": "cooler-thermalright-peerless",
    "sku": "TR-PA120-SE-BK",
    "name_kh": "Thermalright Peerless Assassin 120 SE CPU Air Cooler (6 Heatpipes)",
    "name_en": "Thermalright Peerless Assassin 120 SE CPU Air Cooler (6 Heatpipes)",
    "slug": "thermalright-peerless-assassin-120-se",
    "brand": "Thermalright",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "CPU Cooler",
    "subcategory_slug": "cooler",
    "pricing_type": "buy_now",
    "price_usd": 45,
    "sale_price_usd": 39,
    "in_stock": true,
    "stock_count": 14,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "cooler",
    "part_spec": {
      "socket": "LGA1700,AM5",
      "coolerHeightMm": 155,
      "tdpWatts": 245
    },
    "image": "/images/products/thermalright-peerless-assassin-120-se.jpg",
    "short_desc_kh": "ស្តេច Cooler ខ្យល់លំដាប់ពិភពលោក កង្ហារពីរ 120mm និង 6 Heatpipes ទប់កម្តៅបានដល់ 245W TDP",
    "short_desc_en": "Legendary dual-tower 6-heatpipe CPU air cooler outperforming coolers twice its price",
    "specs": [
      {
        "key_kh": "កម្ពស់",
        "key_en": "Height",
        "value": "155 mm"
      },
      {
        "key_kh": "គាំទ្រ Socket",
        "key_en": "Sockets",
        "value": "Intel LGA1700/1200, AMD AM5/AM4"
      }
    ]
  },
  {
    "id": "cooler-deepcool-ls720",
    "sku": "DEEPCOOL-LS720-360",
    "name_kh": "DeepCool LS720 360mm High-Performance A-RGB Liquid CPU Cooler",
    "name_en": "DeepCool LS720 360mm High-Performance A-RGB Liquid CPU Cooler",
    "slug": "deepcool-ls720-360mm-liquid-cooler",
    "brand": "DeepCool",
    "category": "PC Components",
    "category_slug": "components",
    "subcategory": "CPU Cooler",
    "subcategory_slug": "cooler",
    "pricing_type": "buy_now",
    "price_usd": 129,
    "sale_price_usd": 119,
    "in_stock": true,
    "stock_count": 8,
    "warranty_months": 60,
    "is_featured": false,
    "is_deal": true,
    "part_type": "cooler",
    "part_spec": {
      "socket": "LGA1700,AM5",
      "coolerHeightMm": 52,
      "tdpWatts": 300
    },
    "image": "/images/products/deepcool-ls720-360mm-liquid-cooler.jpg",
    "short_desc_kh": "កង្ហារទឹក 360mm 3 កង្ហារ A-RGB ម៉ូទ័រជំនាន់ទី 4 ត្រជាក់ខ្លាំងសម្រាប់ Core i7/i9 និង Ryzen 9",
    "short_desc_en": "4th gen high-efficiency pump with Anti-Leak technology and customizable infinity mirror cap",
    "specs": [
      {
        "key_kh": "ទំហំ Radiator",
        "key_en": "Radiator",
        "value": "360 mm (3 x 120mm FC120 Fans)"
      },
      {
        "key_kh": "បច្ចេកវិទ្យា",
        "key_en": "Feature",
        "value": "Anti-Leak Tech, 3100 RPM Pump"
      }
    ]
  },
  {
    "id": "prod-mikrotik-hex-s",
    "sku": "MKT-RB760IGS",
    "name_kh": "MikroTik hEX S (RB760iGS) Gigabit Router 5-Port with SFP Port",
    "name_en": "MikroTik hEX S (RB760iGS) 5x Gigabit Ethernet Router with SFP Cage",
    "slug": "mikrotik-rb760igs-hex-s",
    "brand": "MikroTik",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Router / Gateway",
    "subcategory_slug": "router",
    "pricing_type": "buy_now",
    "price_usd": 75,
    "sale_price_usd": 69,
    "in_stock": true,
    "stock_count": 25,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/mikrotik-rb760igs-hex-s.jpg",
    "short_desc_kh": "Router ពេញនិយមបំផុតនៅកម្ពុជាសម្រាប់ហាងកាហ្វេ ផ្ទះ និងការិយាល័យតូច គ្រប់គ្រង Bandwidth & Hotspot",
    "short_desc_en": "Best-selling 5-port Gigabit Router with hardware IPsec encryption, microSD slot and SFP cage",
    "specs": [
      {
        "key_kh": "ស៊ីភីយូ (CPU)",
        "key_en": "CPU",
        "value": "Dual Core MT7621A 880MHz"
      },
      {
        "key_kh": "រ៉េម (RAM)",
        "key_en": "RAM",
        "value": "256 MB"
      },
      {
        "key_kh": "ច្រកតភ្ជាប់",
        "key_en": "Interfaces",
        "value": "5x Gigabit Ethernet, 1x SFP Port, 1x USB"
      },
      {
        "key_kh": "ប្រព័ន្ធប្រតិបត្តិការ",
        "key_en": "OS",
        "value": "RouterOS v7 Level 4 License"
      }
    ]
  },
  {
    "id": "prod-mikrotik-rb5009",
    "sku": "MKT-RB5009UG-S-IN",
    "name_kh": "MikroTik RB5009UG+S+IN Heavy-Duty Home/Office Enterprise Router",
    "name_en": "MikroTik RB5009UG+S+IN Heavy-Duty Enterprise Router (2.5G + 10G SFP+)",
    "slug": "mikrotik-rb5009ug-s-in",
    "brand": "MikroTik",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Router / Gateway",
    "subcategory_slug": "router",
    "pricing_type": "buy_now",
    "price_usd": 235,
    "sale_price_usd": 219,
    "in_stock": true,
    "stock_count": 14,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/mikrotik-rb5009ug-s-in.jpg",
    "short_desc_kh": "កម្លាំងខ្លាំង Quad-Core 1.4GHz មាន 1x 2.5G Port និង 1x 10G SFP+ Port ទ្រទ្រង់ User 200+ នាក់",
    "short_desc_en": "Ultimate lab and SMB router featuring 1GB DDR4 RAM, 2.5G port and 10G SFP+ interface",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "CPU",
        "value": "Marvell Armada Quad-core 1.4GHz"
      },
      {
        "key_kh": "RAM / Storage",
        "key_en": "Memory",
        "value": "1GB DDR4 RAM, 1GB NAND"
      },
      {
        "key_kh": "Ports",
        "key_en": "Ports",
        "value": "7x Gigabit, 1x 2.5G Ethernet, 1x 10G SFP+"
      }
    ]
  },
  {
    "id": "prod-mikrotik-ccr2004",
    "sku": "MKT-CCR2004-16G-2S",
    "name_kh": "MikroTik CCR2004-16G-2S+PC Cloud Core Router (16x Gigabit, 2x 10G SFP+)",
    "name_en": "MikroTik CCR2004-16G-2S+PC Cloud Core Router (16x Gigabit, 2x 10G SFP+)",
    "slug": "mikrotik-ccr2004-16g-2s-plus",
    "brand": "MikroTik",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Router / Gateway",
    "subcategory_slug": "router",
    "pricing_type": "request_quote",
    "price_usd": 520,
    "sale_price_usd": 485,
    "in_stock": true,
    "stock_count": 5,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/mikrotik-ccr2004-16g-2s-plus.jpg",
    "short_desc_kh": "Router សម្រាប់សាលារៀន សណ្ឋាគារ និងអគារពាណិជ្ជកម្ម 16x Gigabit Ports និង 2x 10G SFP+ គ្មានកង្ហារស្ងាត់ល្អ",
    "short_desc_en": "Passive cooled 16-port Gigabit and dual 10G SFP+ core router powered by Annapurna Labs CPU",
    "specs": [
      {
        "key_kh": "CPU",
        "key_en": "CPU",
        "value": "AL32400 4 Cores 1.7GHz"
      },
      {
        "key_kh": "RAM",
        "key_en": "RAM",
        "value": "4GB DDR4"
      },
      {
        "key_kh": "Routing Capacity",
        "key_en": "Throughput",
        "value": "Up to 3.4 Gbps Full BGP"
      }
    ]
  },
  {
    "id": "prod-unifi-u6-pro",
    "sku": "UBNT-U6-PRO",
    "name_kh": "Ubiquiti UniFi U6 Pro Wi-Fi 6 Dual-Band Ceiling Access Point",
    "name_en": "Ubiquiti UniFi U6 Pro High-Performance Wi-Fi 6 Access Point",
    "slug": "ubiquiti-unifi-u6-pro",
    "brand": "Ubiquiti",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Access Point",
    "subcategory_slug": "access-point",
    "pricing_type": "buy_now",
    "price_usd": 175,
    "sale_price_usd": 165,
    "in_stock": true,
    "stock_count": 18,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/ubiquiti-unifi-u6-pro.jpg",
    "short_desc_kh": "Access Point Wi-Fi 6 លំដាប់ Enterprise គាំទ្រ 300+ Devices ដំណាលគ្នា ជាមួយល្បឿន 5.3 Gbps",
    "short_desc_en": "High-density indoor Wi-Fi 6 AP reaching up to 5.3 Gbps aggregate throughput",
    "specs": [
      {
        "key_kh": "ស្តង់ដារ Wi-Fi",
        "key_en": "Standard",
        "value": "Wi-Fi 6 (802.11ax), 4x4 MU-MIMO"
      },
      {
        "key_kh": "ល្បឿន Throughput",
        "key_en": "Speed",
        "value": "4.8 Gbps (5GHz) + 573.5 Mbps (2.4GHz)"
      },
      {
        "key_kh": "Power Option",
        "key_en": "Power",
        "value": "802.3at PoE+ Powered"
      }
    ]
  },
  {
    "id": "prod-unifi-u6-plus",
    "sku": "UBNT-U6-PLUS",
    "name_kh": "Ubiquiti UniFi U6+ Compact Dual-Band Wi-Fi 6 Access Point",
    "name_en": "Ubiquiti UniFi U6+ Compact Dual-Band Wi-Fi 6 Access Point",
    "slug": "ubiquiti-unifi-u6-plus",
    "brand": "Ubiquiti",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Access Point",
    "subcategory_slug": "access-point",
    "pricing_type": "buy_now",
    "price_usd": 155,
    "sale_price_usd": 145,
    "in_stock": true,
    "stock_count": 20,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/ubiquiti-unifi-u6-plus.jpg",
    "short_desc_kh": "UniFi U6+ ទំហំតូចល្មម សាកសមសម្រាប់ផ្ទះវីឡា ខុនដូ និងការិយាល័យបន្ទប់ប្រជុំ",
    "short_desc_en": "Compact 2x2 MIMO Wi-Fi 6 access point delivering up to 3.0 Gbps aggregate throughput",
    "specs": [
      {
        "key_kh": "Wi-Fi Speed",
        "key_en": "Throughput",
        "value": "2402 Mbps (5GHz) + 574 Mbps (2.4GHz)"
      },
      {
        "key_kh": "PoE",
        "key_en": "Power",
        "value": "Standard 802.3af PoE"
      }
    ]
  },
  {
    "id": "prod-tplink-ax73",
    "sku": "TPL-ARCHER-AX73",
    "name_kh": "TP-Link Archer AX73 AX5400 Dual-Band Gigabit Wi-Fi 6 Router",
    "name_en": "TP-Link Archer AX73 AX5400 Dual-Band Gigabit Wi-Fi 6 Router",
    "slug": "tp-link-archer-ax73",
    "brand": "TP-Link",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Router / Gateway",
    "subcategory_slug": "router",
    "pricing_type": "buy_now",
    "price_usd": 125,
    "sale_price_usd": 115,
    "in_stock": true,
    "stock_count": 15,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/tp-link-archer-ax73.jpg",
    "short_desc_kh": "Router កង្ហារ 6 អង់តែន ល្បឿនលឿន 5400 Mbps គ្របដណ្តប់ផ្ទះ 3 ទៅ 4 បន្ទប់គេងបានយ៉ាងល្អ",
    "short_desc_en": "6-stream dual band router with 6 high-gain antennas and OneMesh compatibility",
    "specs": [
      {
        "key_kh": "ល្បឿន",
        "key_en": "Speed",
        "value": "4804 Mbps (5 GHz) + 574 Mbps (2.4 GHz)"
      },
      {
        "key_kh": "Ports",
        "key_en": "Ports",
        "value": "1x Gigabit WAN, 4x Gigabit LAN, 1x USB 3.0"
      }
    ]
  },
  {
    "id": "prod-tplink-sg1024d",
    "sku": "TPL-TL-SG1024D",
    "name_kh": "TP-Link TL-SG1024D 24-Port Gigabit Unmanaged Rackmount Switch",
    "name_en": "TP-Link TL-SG1024D 24-Port Gigabit Unmanaged Rackmount Switch",
    "slug": "tp-link-tl-sg1024d",
    "brand": "TP-Link",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Network Switch",
    "subcategory_slug": "switch",
    "pricing_type": "buy_now",
    "price_usd": 89,
    "sale_price_usd": 79,
    "in_stock": true,
    "stock_count": 16,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/tp-link-tl-sg1024d.jpg",
    "short_desc_kh": "Switch 24-Port Gigabit តម្លៃល្អបំផុតសម្រាប់តភ្ជាប់កុំព្យូទ័រ និង Printer ក្នុងក្រុមហ៊ុន",
    "short_desc_en": "Plug and play 24-port 10/100/1000Mbps steel case switch for enterprise rackmounting",
    "specs": [
      {
        "key_kh": "Ports",
        "key_en": "Ports",
        "value": "24x 10/100/1000Mbps RJ45"
      },
      {
        "key_kh": "Switching Capacity",
        "key_en": "Capacity",
        "value": "48 Gbps"
      }
    ]
  },
  {
    "id": "prod-ruijie-rap2260e",
    "sku": "RUJ-RG-RAP2260E",
    "name_kh": "Ruijie Reyee RG-RAP2260(E) Wi-Fi 6 AX3000 Ceiling Mount AP (2.5G Port)",
    "name_en": "Ruijie Reyee RG-RAP2260(E) Wi-Fi 6 AX3000 Ceiling Mount AP with 2.5G Port",
    "slug": "ruijie-reyee-rg-rap2260e",
    "brand": "Ruijie",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Access Point",
    "subcategory_slug": "access-point",
    "pricing_type": "buy_now",
    "price_usd": 139,
    "sale_price_usd": 125,
    "in_stock": true,
    "stock_count": 22,
    "warranty_months": 36,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/ruijie-reyee-rg-rap2260e.jpg",
    "short_desc_kh": "Access Point គ្រប់គ្រងតាម Cloud ដោយឥតគិតថ្លៃ Free Cloud Lifetime មាន 2.5G Uplink Port",
    "short_desc_en": "High performance AX3000 ceiling AP with 2.5GbE uplink and free lifetime Reyee Cloud app",
    "specs": [
      {
        "key_kh": "Wi-Fi Speed",
        "key_en": "Speed",
        "value": "2976 Mbps (AX3000)"
      },
      {
        "key_kh": "Ports",
        "key_en": "Uplink",
        "value": "1x 2.5GE PoE, 1x 1GE"
      },
      {
        "key_kh": "ការគ្រប់គ្រង",
        "key_en": "Management",
        "value": "Ruijie Cloud Lifetime Free"
      }
    ]
  },
  {
    "id": "prod-cisco-c1000",
    "sku": "CSCO-C1000-24T-4G",
    "name_kh": "Cisco Catalyst 1000 Series 24-Port Gigabit Managed Switch (4x SFP)",
    "name_en": "Cisco Catalyst 1000 Series 24-Port Gigabit Managed Switch (4x 1G SFP)",
    "slug": "cisco-catalyst-c1000-24t-4g-l",
    "brand": "Cisco",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Network Switch",
    "subcategory_slug": "switch",
    "pricing_type": "request_quote",
    "price_usd": 620,
    "sale_price_usd": 580,
    "in_stock": true,
    "stock_count": 6,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/cisco-catalyst-c1000-24t-4g-l.jpg",
    "short_desc_kh": "Switch ស្ដង់ដារធនាគារ Cisco Catalyst 24 Ports Gigabit ជាមួយ 4x SFP Uplinks ធន់មាំបំផុត",
    "short_desc_en": "Enterprise-grade Layer 2 switch engineered for branch offices, financial institutions and hospitality",
    "specs": [
      {
        "key_kh": "Ports",
        "key_en": "Ports",
        "value": "24x Gigabit RJ45, 4x 1G SFP Uplinks"
      },
      {
        "key_kh": "Features",
        "key_en": "Features",
        "value": "VLAN, QoS, 802.1x, STP, Loop Guard"
      }
    ]
  },
  {
    "id": "prod-cisco-cbs350",
    "sku": "CSCO-CBS350-24P-4G",
    "name_kh": "Cisco Business CBS350-24P-4G Managed 24-Port Gigabit PoE+ Switch (195W)",
    "name_en": "Cisco Business CBS350-24P-4G Managed 24-Port Gigabit PoE+ Switch (195W)",
    "slug": "cisco-cbs350-24p-4g",
    "brand": "Cisco",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Network Switch",
    "subcategory_slug": "switch",
    "pricing_type": "request_quote",
    "price_usd": 720,
    "sale_price_usd": 680,
    "in_stock": true,
    "stock_count": 5,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/cisco-cbs350-24p-4g.jpg",
    "short_desc_kh": "Switch PoE+ 195W កម្លាំងខ្ពស់សម្រាប់បញ្ជូនភ្លើងទៅ IP Camera និង Access Points",
    "short_desc_en": "Managed Layer 3 capabilities with 195W PoE+ power budget across 24 gigabit ports",
    "specs": [
      {
        "key_kh": "PoE Power",
        "key_en": "PoE Budget",
        "value": "195 Watts (802.3af / 802.3at PoE+)"
      },
      {
        "key_kh": "Uplink",
        "key_en": "Uplinks",
        "value": "4x Gigabit SFP"
      }
    ]
  },
  {
    "id": "prod-cable-cat6-commscope",
    "sku": "COMM-CAT6-UTP-305M",
    "name_kh": "CommScope AMP Netconnect Cat6 UTP 23AWG Solid Copper Network Cable (305m)",
    "name_en": "CommScope AMP Netconnect Cat6 UTP 23AWG Solid Copper Cable (305m Box)",
    "slug": "commscope-amp-cat6-utp-cable-305m",
    "brand": "CommScope",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Cables & Patching",
    "subcategory_slug": "cabling",
    "pricing_type": "buy_now",
    "price_usd": 155,
    "sale_price_usd": 145,
    "in_stock": true,
    "stock_count": 35,
    "warranty_months": 120,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/commscope-amp-cat6-utp-cable-305m.jpg",
    "short_desc_kh": "ខ្សែបណ្តាញ Cat6 សុទ្ធ 100% ស្ពាន់សុទ្ធ 23AWG ស្តង់ដារអាមេរិក 1 ប្រអប់ប្រវែង 305 ម៉ែត្រ",
    "short_desc_en": "Original CommScope AMP 100% bare copper Cat6 cable tested up to 250MHz for Gigabit LAN",
    "specs": [
      {
        "key_kh": "ប្រវែង",
        "key_en": "Length",
        "value": "305 Meters (1,000 ft) Pull Box"
      },
      {
        "key_kh": "Gauge",
        "key_en": "Gauge",
        "value": "23 AWG Solid Bare Copper"
      }
    ]
  },
  {
    "id": "prod-rack-toten-9u",
    "sku": "TOTEN-9U-600",
    "name_kh": "TOTEN 9U 600x600mm Wall Mount Network Rack Cabinet with Glass Door",
    "name_en": "TOTEN 9U 600x600mm Wall Mount Network Rack Cabinet with Glass Door",
    "slug": "toten-server-rack-9u-wallmount",
    "brand": "TOTEN",
    "category": "Networking",
    "category_slug": "networking",
    "subcategory": "Server Rack",
    "subcategory_slug": "server-rack",
    "pricing_type": "request_solution",
    "price_usd": 125,
    "sale_price_usd": 115,
    "in_stock": true,
    "stock_count": 10,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/toten-server-rack-9u-wallmount.jpg",
    "short_desc_kh": "ទូ Server Rack 9U ដែកស្វិតស្រោបម្សៅការពារច្រែះ ទ្វារកញ្ចក់ tempered glass រៀបចំបណ្តាញយ៉ាងស្អាត",
    "short_desc_en": "Sturdy 9U wall-mounted rack enclosure with tempered glass front door and cable entries",
    "specs": [
      {
        "key_kh": "ទំហំ",
        "key_en": "Dimensions",
        "value": "600mm (W) x 600mm (D) x 505mm (H)"
      },
      {
        "key_kh": "គ្រឿងបន្លាស់",
        "key_en": "Included",
        "value": "1x Tray Shelf, 1x Cooling Fan, 1x PDU, Screws"
      }
    ]
  },
  {
    "id": "prod-fortigate-40f",
    "sku": "FTNT-FG-40F-BDL",
    "name_kh": "Fortinet FortiGate 40F Next-Generation Firewall (5Gbps Firewall / 1Gbps IPS)",
    "name_en": "Fortinet FortiGate 40F Next-Generation Firewall (5Gbps Firewall, 1Gbps IPS)",
    "slug": "fortinet-fortigate-40f",
    "brand": "Fortinet",
    "category": "Network Security",
    "category_slug": "security",
    "subcategory": "Hardware Firewall",
    "subcategory_slug": "firewall",
    "pricing_type": "request_quote",
    "price_usd": 520,
    "sale_price_usd": 490,
    "in_stock": true,
    "stock_count": 6,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/fortinet-fortigate-40f.jpg",
    "short_desc_kh": "Firewall កម្រិត Enterprise តម្លៃសមរម្យសម្រាប់សាខាក្រុមហ៊ុន ការពារមេរោគ Ransomware និងត្រួតពិនិត្យគេហទំព័រ",
    "short_desc_en": "High performance desktop NGFW powered by SOC4 processor for enterprise branch offices",
    "specs": [
      {
        "key_kh": "Firewall Throughput",
        "key_en": "Firewall Throughput",
        "value": "5 Gbps"
      },
      {
        "key_kh": "IPS Throughput",
        "key_en": "IPS Throughput",
        "value": "1 Gbps"
      },
      {
        "key_kh": "Threat Protection",
        "key_en": "Threat Protection",
        "value": "600 Mbps"
      }
    ]
  },
  {
    "id": "prod-fortigate-60f",
    "sku": "FTNT-FG-60F-BDL",
    "name_kh": "Fortinet FortiGate 60F Next-Generation Firewall Appliance",
    "name_en": "Fortinet FortiGate 60F Next-Generation Firewall Appliance",
    "slug": "fortinet-fortigate-60f",
    "brand": "Fortinet",
    "category": "Network Security",
    "category_slug": "security",
    "subcategory": "Hardware Firewall",
    "subcategory_slug": "firewall",
    "pricing_type": "request_quote",
    "price_usd": 890,
    "sale_price_usd": 820,
    "in_stock": true,
    "stock_count": 8,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/fortinet-fortigate-60f.jpg",
    "short_desc_kh": "Firewall ពេញនិយមបំផុតនៅកម្ពុជា ការពារប្រព័ន្ធ IT ទប់ស្កាត់ការវាយប្រហារតាមអ៊ីនធឺណិត និងគ្រប់គ្រង VPN សាខា",
    "short_desc_en": "Cambodia most trusted branch firewall with 10 Gbps firewall throughput and SOC4 acceleration",
    "specs": [
      {
        "key_kh": "Firewall Throughput",
        "key_en": "Firewall Throughput",
        "value": "10 Gbps"
      },
      {
        "key_kh": "IPS Throughput",
        "key_en": "IPS Throughput",
        "value": "1.4 Gbps"
      },
      {
        "key_kh": "SSL-VPN Throughput",
        "key_en": "SSL-VPN",
        "value": "900 Mbps"
      }
    ]
  },
  {
    "id": "prod-fortigate-80f",
    "sku": "FTNT-FG-80F-BDL",
    "name_kh": "Fortinet FortiGate 80F High-Performance Enterprise Firewall",
    "name_en": "Fortinet FortiGate 80F High-Performance Enterprise Firewall",
    "slug": "fortinet-fortigate-80f",
    "brand": "Fortinet",
    "category": "Network Security",
    "category_slug": "security",
    "subcategory": "Hardware Firewall",
    "subcategory_slug": "firewall",
    "pricing_type": "request_quote",
    "price_usd": 1550,
    "sale_price_usd": 1450,
    "in_stock": true,
    "stock_count": 4,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/fortinet-fortigate-80f.jpg",
    "short_desc_kh": "Firewall កម្លាំងធំសម្រាប់ទីស្នាក់ការកណ្តាលក្រុមហ៊ុន (Headquarters) មាន Dual SFP Ports និង Bypass Ports",
    "short_desc_en": "High throughput enterprise firewall for mid-sized organizations with redundant power and dual SFP",
    "specs": [
      {
        "key_kh": "Firewall Throughput",
        "key_en": "Firewall",
        "value": "10 Gbps"
      },
      {
        "key_kh": "Threat Protection",
        "key_en": "Threat Protection",
        "value": "900 Mbps"
      },
      {
        "key_kh": "Concurrent Sessions",
        "key_en": "Sessions",
        "value": "1,500,000"
      }
    ]
  },
  {
    "id": "prod-sophos-xgs116",
    "sku": "SPH-XGS-116-HW",
    "name_kh": "Sophos XGS 116 Desktop Next-Gen Firewall with Xstream Flow Processor",
    "name_en": "Sophos XGS 116 Desktop Next-Gen Firewall with Xstream Flow Processor",
    "slug": "sophos-xgs-116",
    "brand": "Sophos",
    "category": "Network Security",
    "category_slug": "security",
    "subcategory": "UTM Appliance",
    "subcategory_slug": "utm-appliance",
    "pricing_type": "request_quote",
    "price_usd": 950,
    "sale_price_usd": 890,
    "in_stock": true,
    "stock_count": 3,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/sophos-xgs-116.jpg",
    "short_desc_kh": "ស្ថាបត្យកម្ម Dual-Processor Xstream ដោះកូដ SSL/TLS ល្បឿនលឿនដោយមិនធ្វើឱ្យអ៊ីនធឺណិតដើរយឺត",
    "short_desc_en": "Dual-engine architecture with dedicated Xstream Flow processors for full TLS inspection",
    "specs": [
      {
        "key_kh": "Firewall Throughput",
        "key_en": "Firewall",
        "value": "7,700 Mbps"
      },
      {
        "key_kh": "Ports",
        "key_en": "Ports",
        "value": "8x GbE copper, 1x GbE SFP"
      }
    ]
  },
  {
    "id": "prod-epson-l3250",
    "sku": "EPSON-ECOTANK-L3250",
    "name_kh": "Epson EcoTank L3250 Wi-Fi All-in-One Ink Tank Printer",
    "name_en": "Epson EcoTank L3250 Wi-Fi All-in-One Ink Tank Printer",
    "slug": "epson-ecotank-l3250-wifi",
    "brand": "Epson",
    "category": "Printers & Scanners",
    "category_slug": "printers",
    "subcategory": "Ink Tank Printer",
    "subcategory_slug": "ink-tank",
    "pricing_type": "buy_now",
    "price_usd": 175,
    "sale_price_usd": 159,
    "in_stock": true,
    "stock_count": 24,
    "warranty_months": 24,
    "is_featured": true,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/epson-ecotank-l3250-wifi.jpg",
    "short_desc_kh": "ម៉ាស៊ីនព្រីនពណ៌សន្សំសំចៃទឹកថ្នាំបំផុត Print, Scan, Copy បញ្ជាព្រីនតាមទូរស័ព្ទដៃ Wi-Fi Direct",
    "short_desc_en": "Multifunction wireless ink tank printer delivering ultra-low running cost and mobile printing",
    "specs": [
      {
        "key_kh": "មុខងារ",
        "key_en": "Functions",
        "value": "Print, Scan, Copy"
      },
      {
        "key_kh": "ចំណុះទឹកថ្នាំ",
        "key_en": "Page Yield",
        "value": "Up to 4,500 pages (Black) / 7,500 pages (Color)"
      },
      {
        "key_kh": "ការតភ្ជាប់",
        "key_en": "Connectivity",
        "value": "Wi-Fi, Wi-Fi Direct, USB 2.0"
      }
    ]
  },
  {
    "id": "prod-canon-g3010",
    "sku": "CANON-PIXMA-G3010",
    "name_kh": "Canon PIXMA G3010 All-in-One Ink Tank Wireless Printer",
    "name_en": "Canon PIXMA G3010 All-in-One Ink Tank Wireless Printer",
    "slug": "canon-pixma-g3010-ink-tank",
    "brand": "Canon",
    "category": "Printers & Scanners",
    "category_slug": "printers",
    "subcategory": "Ink Tank Printer",
    "subcategory_slug": "ink-tank",
    "pricing_type": "buy_now",
    "price_usd": 155,
    "sale_price_usd": 145,
    "in_stock": true,
    "stock_count": 18,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/canon-pixma-g3010-ink-tank.jpg",
    "short_desc_kh": "ព្រីនរូបថតពណ៌ច្បាស់ ធុងទឹកថ្នាំជាប់ម៉ាស៊ីនស្រួលបញ្ចូលទឹកថ្នាំ ព្រីនឯកសារបានច្រើនសន្លឹក",
    "short_desc_en": "High volume printing wireless all-in-one with integrated ink tanks and borderless photo prints",
    "specs": [
      {
        "key_kh": "Functions",
        "key_en": "Functions",
        "value": "Print, Scan, Copy"
      },
      {
        "key_kh": "Yield",
        "key_en": "Page Yield",
        "value": "6,000 pages black / 7,000 pages color"
      }
    ]
  },
  {
    "id": "prod-hp-m404dn",
    "sku": "HP-LASERJET-M404DN",
    "name_kh": "HP LaserJet Pro M404dn Monochrome Duplex Laser Printer",
    "name_en": "HP LaserJet Pro M404dn Monochrome Duplex Laser Printer",
    "slug": "hp-laserjet-pro-m404dn",
    "brand": "HP",
    "category": "Printers & Scanners",
    "category_slug": "printers",
    "subcategory": "Laser Printer",
    "subcategory_slug": "laser-printer",
    "pricing_type": "buy_now",
    "price_usd": 310,
    "sale_price_usd": 289,
    "in_stock": true,
    "stock_count": 12,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/hp-laserjet-pro-m404dn.jpg",
    "short_desc_kh": "ម៉ាស៊ីនព្រីន Laser ស-ខ្មៅ ល្បឿនលឿន 38 ទំព័រ/នាទី ត្រឡប់សងខាងស្វ័យប្រវត្ត (Auto Duplex)",
    "short_desc_en": "Heavy-duty monochrome business laser printer printing up to 38 ppm with auto 2-sided printing",
    "specs": [
      {
        "key_kh": "ល្បឿនព្រីន",
        "key_en": "Print Speed",
        "value": "Up to 38 pages per minute (ppm)"
      },
      {
        "key_kh": "Duplex",
        "key_en": "Duplex",
        "value": "Automatic two-sided printing"
      },
      {
        "key_kh": "បណ្តាញ",
        "key_en": "Network",
        "value": "Gigabit Ethernet, High-Speed USB 2.0"
      }
    ]
  },
  {
    "id": "prod-brother-l2375dw",
    "sku": "BROTHER-HL-L2375DW",
    "name_kh": "Brother HL-L2375DW Compact Wireless Monochrome Laser Printer",
    "name_en": "Brother HL-L2375DW Compact Wireless Monochrome Laser Printer with Duplex",
    "slug": "brother-hl-l2375dw-duplex",
    "brand": "Brother",
    "category": "Printers & Scanners",
    "category_slug": "printers",
    "subcategory": "Laser Printer",
    "subcategory_slug": "laser-printer",
    "pricing_type": "buy_now",
    "price_usd": 179,
    "sale_price_usd": 165,
    "in_stock": true,
    "stock_count": 14,
    "warranty_months": 36,
    "is_featured": false,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/brother-hl-l2375dw-duplex.jpg",
    "short_desc_kh": "ម៉ាស៊ីន Laser Brother ធានា ៣ ឆ្នាំ មាន Wi-Fi, Ethernet និងព្រីនសងខាងស្វ័យប្រវត្ត",
    "short_desc_en": "Fast 34ppm compact laser printer with wireless, network and automatic 2-sided printing",
    "specs": [
      {
        "key_kh": "ល្បឿន",
        "key_en": "Print Speed",
        "value": "34 ppm"
      },
      {
        "key_kh": "Network",
        "key_en": "Connectivity",
        "value": "Wi-Fi, Ethernet, USB"
      }
    ]
  },
  {
    "id": "prod-xprinter-xp420b",
    "sku": "XPR-XP-420B-USB",
    "name_kh": "Xprinter XP-420B 4-Inch Direct Thermal Barcode Label Shipping Printer",
    "name_en": "Xprinter XP-420B 4-Inch Direct Thermal Barcode Label Shipping Printer",
    "slug": "xprinter-xp-420b-thermal-barcode",
    "brand": "Xprinter",
    "category": "Printers & Scanners",
    "category_slug": "printers",
    "subcategory": "Barcode Printer",
    "subcategory_slug": "barcode-printer",
    "pricing_type": "buy_now",
    "price_usd": 85,
    "sale_price_usd": 75,
    "in_stock": true,
    "stock_count": 30,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/xprinter-xp-420b-thermal-barcode.jpg",
    "short_desc_kh": "ព្រីនវិក្កយបត្របញ្ញើដឹកជញ្ជូន ព្រីន Barcode & QR Code មិនបាច់ប្រើទឹកថ្នាំ ងាយស្រួលលក់អនឡាញ",
    "short_desc_en": "Thermal barcode and waybill shipping label printer for e-commerce and logistics",
    "specs": [
      {
        "key_kh": "ទទឹងក្រដាស",
        "key_en": "Label Width",
        "value": "20mm - 108mm (4-inch)"
      },
      {
        "key_kh": "ល្បឿន",
        "key_en": "Speed",
        "value": "152 mm/s"
      }
    ]
  },
  {
    "id": "prod-sunmi-v2-pro",
    "sku": "SUNMI-V2-PRO-4G",
    "name_kh": "Sunmi V2 Pro Android Mobile Smart POS Terminal with 58mm Thermal Printer",
    "name_en": "Sunmi V2 Pro Android Mobile Smart POS Terminal with 58mm Thermal Receipt Printer",
    "slug": "sunmi-v2-pro-handheld-pos",
    "brand": "Sunmi",
    "category": "Printers & Scanners",
    "category_slug": "printers",
    "subcategory": "POS Terminal",
    "subcategory_slug": "pos-terminal",
    "pricing_type": "buy_now",
    "price_usd": 240,
    "sale_price_usd": 220,
    "in_stock": true,
    "stock_count": 8,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/sunmi-v2-pro-handheld-pos.jpg",
    "short_desc_kh": "ម៉ាស៊ីន POS ចល័តមានកាមេរ៉ាស្កេន KHQR ព្រីនវិក្កយបត្រ 58mm ដាក់ស៊ីមកាត 4G បានគ្រប់ទីកន្លែង",
    "short_desc_en": "Handheld Android smart POS device with built-in Seiko receipt printer and 2D scanner",
    "specs": [
      {
        "key_kh": "OS / អេក្រង់",
        "key_en": "Screen",
        "value": "Android 7.1, 5.99\" HD+ IPS Touch"
      },
      {
        "key_kh": "Printer",
        "key_en": "Printer",
        "value": "58mm thermal receipt printer (70mm/s)"
      }
    ]
  },
  {
    "id": "prod-zkteco-k40",
    "sku": "ZKT-K40-BATTERY",
    "name_kh": "ZKTeco K40 Biometric Fingerprint & RFID Card Time Attendance with Battery",
    "name_en": "ZKTeco K40 Biometric Fingerprint & RFID Card Time Attendance Machine with Backup Battery",
    "slug": "zkteco-k40-fingerprint-attendance",
    "brand": "ZKTeco",
    "category": "Security & Attendance",
    "category_slug": "attendance",
    "subcategory": "Time Attendance",
    "subcategory_slug": "time-attendance",
    "pricing_type": "buy_now",
    "price_usd": 75,
    "sale_price_usd": 65,
    "in_stock": true,
    "stock_count": 18,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/zkteco-k40-fingerprint-attendance.jpg",
    "short_desc_kh": "ម៉ាស៊ីនស្កេនក្រយៅដៃវត្តមានបុគ្គលិក មានអាគុយជំនួយខាងក្នុងដាច់ភ្លើងនៅតែស្កេនបាន ទាញទិន្នន័យតាម LAN/USB",
    "short_desc_en": "Time attendance terminal with built-in backup battery, TCP/IP network and Excel report export",
    "specs": [
      {
        "key_kh": "សមត្ថភាពស្កេន",
        "key_en": "Capacity",
        "value": "1,000 Fingerprints, 1,000 RFID Cards"
      },
      {
        "key_kh": "អង្គចងចាំទិន្នន័យ",
        "key_en": "Log Capacity",
        "value": "80,000 Records"
      }
    ]
  },
  {
    "id": "prod-zkteco-mb20",
    "sku": "ZKT-MB20-FACE-FP",
    "name_kh": "ZKTeco MB20 Face & Fingerprint Time Attendance and Access Control",
    "name_en": "ZKTeco MB20 Face & Fingerprint Time Attendance and Access Control Terminal",
    "slug": "zkteco-mb20-face-fingerprint",
    "brand": "ZKTeco",
    "category": "Security & Attendance",
    "category_slug": "attendance",
    "subcategory": "Access Control",
    "subcategory_slug": "access-control",
    "pricing_type": "buy_now",
    "price_usd": 129,
    "sale_price_usd": 115,
    "in_stock": true,
    "stock_count": 12,
    "warranty_months": 12,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/zkteco-mb20-face-fingerprint.jpg",
    "short_desc_kh": "ស្កេនមុខស្វ័យប្រវត្ត លឿនត្រឹម ០.៥ វិនាទី និងស្កេនក្រយៅដៃ អាចបញ្ជាបើកទ្វារ Access Control បាន",
    "short_desc_en": "Multi-biometric identification terminal supporting facial verification and access control lock interface",
    "specs": [
      {
        "key_kh": "សមត្ថភាព",
        "key_en": "Capacity",
        "value": "200 Faces, 500 Fingerprints, 50,000 Logs"
      },
      {
        "key_kh": "Interface",
        "key_en": "Interface",
        "value": "TCP/IP, USB-Host, Electric Lock, Exit Button"
      }
    ]
  },
  {
    "id": "prod-hikvision-k1t804",
    "sku": "HIK-DS-K1T804AMF",
    "name_kh": "Hikvision DS-K1T804AMF Optical Fingerprint & Mifare Card Terminal",
    "name_en": "Hikvision DS-K1T804AMF Optical Fingerprint & Mifare Card Access Control Terminal",
    "slug": "hikvision-ds-k1t804amf-terminal",
    "brand": "Hikvision",
    "category": "Security & Attendance",
    "category_slug": "attendance",
    "subcategory": "Access Control",
    "subcategory_slug": "access-control",
    "pricing_type": "buy_now",
    "price_usd": 120,
    "sale_price_usd": 110,
    "in_stock": true,
    "stock_count": 10,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/hikvision-ds-k1t804amf-terminal.jpg",
    "short_desc_kh": "ម៉ាស៊ីនស្កេន Hikvision មាន Wi-Fi ស្រាប់ គ្រប់គ្រងតាមទូរស័ព្ទដៃ Hik-Connect App និងកុំព្យូទ័រ iVMS-4200",
    "short_desc_en": "Integrated Wi-Fi biometric terminal managing access and time attendance via Hik-Connect mobile app",
    "specs": [
      {
        "key_kh": "សមត្ថភាព",
        "key_en": "Capacity",
        "value": "3,000 Fingerprints, 3,000 Cards, 100,000 Events"
      },
      {
        "key_kh": "Wireless",
        "key_en": "Wireless",
        "value": "Wi-Fi 2.4GHz + RJ45 Ethernet"
      }
    ]
  },
  {
    "id": "prod-logitech-mx-master-3s",
    "sku": "LOGI-MX-MASTER-3S",
    "name_kh": "Logitech MX Master 3S Wireless Performance Mouse (8K DPI Quiet Clicks)",
    "name_en": "Logitech MX Master 3S Wireless Performance Mouse (8K DPI, Quiet Clicks, Darkfield)",
    "slug": "logitech-mx-master-3s-mouse",
    "brand": "Logitech",
    "category": "Accessories & Cables",
    "category_slug": "accessories",
    "subcategory": "Keyboards & Mice",
    "subcategory_slug": "peripherals",
    "pricing_type": "buy_now",
    "price_usd": 109,
    "sale_price_usd": 99,
    "in_stock": true,
    "stock_count": 20,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/logitech-mx-master-3s-mouse.jpg",
    "short_desc_kh": "ស្ដេច Mouse ការងារលំដាប់ពិភពលោក ចុចស្ងាត់ល្អ កង់រំកិល MagSpeed អូសលើកញ្ចក់បាន និង Bluetooth 3 Devices",
    "short_desc_en": "Iconic ergonomic productivity mouse with 8K DPI sensor, quiet clicks and MagSpeed scrolling",
    "specs": [
      {
        "key_kh": "Sensor",
        "key_en": "Sensor",
        "value": "Darkfield high precision (8000 DPI)"
      },
      {
        "key_kh": "ថ្ម",
        "key_en": "Battery",
        "value": "Up to 70 days on full charge (USB-C)"
      },
      {
        "key_kh": "តភ្ជាប់",
        "key_en": "Connectivity",
        "value": "Bluetooth Low Energy & Logi Bolt USB"
      }
    ]
  },
  {
    "id": "prod-logitech-g502-hero",
    "sku": "LOGI-G502-HERO",
    "name_kh": "Logitech G502 HERO High Performance Gaming Mouse (HERO 25K Sensor)",
    "name_en": "Logitech G502 HERO High Performance Gaming Mouse (HERO 25K Sensor, 11 Buttons)",
    "slug": "logitech-g502-hero-gaming-mouse",
    "brand": "Logitech",
    "category": "Gaming Gear",
    "category_slug": "gaming",
    "subcategory": "Gaming Mouse & Keyboard",
    "subcategory_slug": "gaming-peripherals",
    "pricing_type": "buy_now",
    "price_usd": 55,
    "sale_price_usd": 49,
    "in_stock": true,
    "stock_count": 22,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": true,
    "part_type": "none",
    "image": "/images/products/logitech-g502-hero-gaming-mouse.jpg",
    "short_desc_kh": "Gaming Mouse លក់ដាច់បំផុតទូទាំងពិភពលោក 11 ប៊ូតុងអាចកំណត់បាន ទម្ងន់អាចដោះដូរបាន និង RGB LIGHTSYNC",
    "short_desc_en": "World most popular gaming mouse equipped with HERO 25K sensor and tunable weight system",
    "specs": [
      {
        "key_kh": "Sensor",
        "key_en": "Sensor",
        "value": "HERO 25K (100 - 25,600 DPI)"
      },
      {
        "key_kh": "ប៊ូតុង",
        "key_en": "Buttons",
        "value": "11 Programmable buttons"
      }
    ]
  },
  {
    "id": "prod-keychron-k2",
    "sku": "KEYCHRON-K2-V2-RGB",
    "name_kh": "Keychron K2 Version 2 Wireless Mechanical Keyboard (75% Compact, RGB)",
    "name_en": "Keychron K2 Version 2 Wireless Mechanical Keyboard (75% Compact, Gateron G Pro Brown, RGB)",
    "slug": "keychron-k2-wireless-keyboard",
    "brand": "Keychron",
    "category": "Gaming Gear",
    "category_slug": "gaming",
    "subcategory": "Gaming Mouse & Keyboard",
    "subcategory_slug": "gaming-peripherals",
    "pricing_type": "buy_now",
    "price_usd": 95,
    "sale_price_usd": 85,
    "in_stock": true,
    "stock_count": 14,
    "warranty_months": 12,
    "is_featured": true,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/keychron-k2-wireless-keyboard.jpg",
    "short_desc_kh": "ក្តារចុច Mechanical ពេញនិយមបំផុតសម្រាប់អ្នកប្រើ Mac & Windows ថ្មធំ 4000mAh វាយស្រួលដៃ",
    "short_desc_en": "75% compact mechanical keyboard with Mac & Windows layout, Bluetooth 5.1 and 4000mAh battery",
    "specs": [
      {
        "key_kh": "Switch",
        "key_en": "Switch",
        "value": "Gateron G Pro Brown (Tactile)"
      },
      {
        "key_kh": "Layout",
        "key_en": "Layout",
        "value": "75% Layout (84 Keys) with Mac Function Keys"
      }
    ]
  },
  {
    "id": "prod-apc-ups-1500va",
    "sku": "APC-BR1500G-IN",
    "name_kh": "APC Back-UPS Pro BR1500G-IN 1500VA / 865W Line-Interactive UPS with LCD Display",
    "name_en": "APC Back-UPS Pro BR1500G-IN 1500VA / 865W Line-Interactive UPS with LCD Display",
    "slug": "apc-back-ups-pro-1500va-ups",
    "brand": "APC",
    "category": "Accessories & Cables",
    "category_slug": "accessories",
    "subcategory": "UPS Power Backup",
    "subcategory_slug": "ups",
    "pricing_type": "buy_now",
    "price_usd": 269,
    "sale_price_usd": 245,
    "in_stock": true,
    "stock_count": 9,
    "warranty_months": 24,
    "is_featured": false,
    "is_deal": false,
    "part_type": "none",
    "image": "/images/products/apc-back-ups-pro-1500va-ups.jpg",
    "short_desc_kh": "អាគុយជំនួយ UPS ការពារកុំព្យូទ័រ និង Server កុំឱ្យរលត់ភ្លាមៗពេលដាច់ភ្លើង មានអេក្រង់ LCD បង្ហាញស្ថានភាព",
    "short_desc_en": "Premium battery backup and surge protection for high performance computers, routers and NAS storage",
    "specs": [
      {
        "key_kh": "កម្លាំង",
        "key_en": "Output Capacity",
        "value": "1500VA / 865 Watts"
      },
      {
        "key_kh": "បច្ចេកវិទ្យា",
        "key_en": "Topology",
        "value": "Line Interactive with Automatic Voltage Regulation (AVR)"
      }
    ]
  }
];

export const prebuiltPCs: PrebuiltPC[] = [
  {
    "id": "prebuilt-office-pro",
    "slug": "nv-office-pro-pc",
    "tier": "office",
    "name_kh": "NV Office PC — សម្រាប់ការងាររដ្ឋបាល និងគណនេយ្យ",
    "name_en": "NV Office Pro PC (Core i3-14100 / 16GB RAM / 512GB SSD)",
    "price_usd": 389,
    "summary_kh": "ម៉ាស៊ីនកុំព្យូទ័ររៀបចំយ៉ាងស្អាត ស្ងាត់ ដំណើរការ MS Office, Excel, QuickBooks, Canva រលូន",
    "summary_en": "Quiet, compact and fast workstation ideal for daily business administration, billing, and web browsing",
    "specs": {
      "cpu": "Intel Core i3-14100 (4 Cores / 8 Threads)",
      "motherboard": "H610M Ultra Motherboard",
      "ram": "16GB DDR4 3200MHz",
      "storage": "512GB M.2 NVMe SSD",
      "gpu": "Intel UHD Graphics 730",
      "psu": "500W Standard Power Supply",
      "case": "NV Compact Office Micro-ATX Case",
      "cooler": "Intel Original Stock Cooler"
    },
    "recommended_for_kh": "ការិយាល័យក្រុមហ៊ុន ហាងលក់ទំនិញ សាលារៀន និងនិស្សិត",
    "recommended_for_en": "Corporate offices, retail cashier desks, schools and students",
    "image": "/images/products/montech-air-100-argb-black.jpg"
  },
  {
    "id": "prebuilt-gaming-elite",
    "slug": "nv-gaming-elite-rtx4060",
    "tier": "gaming",
    "name_kh": "NV Gaming Elite — Core i5 + RTX 4060 8GB",
    "name_en": "NV Gaming Elite PC (Core i5-14400F / RTX 4060 8GB / 32GB DDR5 / 1TB SSD)",
    "price_usd": 899,
    "summary_kh": "លេងហ្គេមពេញនិយមទាំងអស់បានយ៉ាងរលូន Valorant, PUBG, GTA V, Black Myth: Wukong, Dota 2 និង Live Stream",
    "summary_en": "Powerhouse 1080p/1440p gaming and streaming PC engineered with DDR5 and RTX 4060 GPU",
    "specs": {
      "cpu": "Intel Core i5-14400F (10 Cores / 16 Threads)",
      "motherboard": "MSI PRO B760M-A WIFI DDR5",
      "ram": "32GB (2x16GB) Corsair DDR5 6000MHz",
      "storage": "1TB Kingston NV2 PCIe 4.0 M.2 SSD",
      "gpu": "ASUS Dual GeForce RTX 4060 8GB GDDR6",
      "psu": "Cooler Master MWE 650W 80+ Bronze",
      "case": "Montech AIR 100 ARGB Swivel Glass",
      "cooler": "Thermalright Peerless Assassin 120 SE"
    },
    "recommended_for_kh": "Gamers, Streamers, ហ្គេម eSports និងកាត់តវីដេអូ TikTok/YouTube",
    "recommended_for_en": "Gamers, Content Creators, eSports players and streamers",
    "image": "/images/products/nzxt-h5-flow-rgb-black.jpg"
  },
  {
    "id": "prebuilt-creator-ultra",
    "slug": "nv-creator-ultra-4070s",
    "tier": "creator",
    "name_kh": "NV Creator PC — Ryzen 7 7800X3D + RTX 4070 SUPER",
    "name_en": "NV Creator Ultra Workstation (Ryzen 7 7800X3D / RTX 4070 SUPER / 32GB / 1TB 990 Pro)",
    "price_usd": 1650,
    "summary_kh": "កម្លាំងម៉ាស៊ីនកំពូលសម្រាប់ 3D Rendering, AutoCAD, Premiere Pro 4K, After Effects និង Animation",
    "summary_en": "Heavyweight creative workstation with AMD 3D V-Cache and RTX 4070 SUPER 12GB for zero-bottleneck rendering",
    "specs": {
      "cpu": "AMD Ryzen 7 7800X3D (8 Cores / 16 Threads)",
      "motherboard": "ASUS ROG Strix B650E-F Gaming WiFi",
      "ram": "32GB Corsair Vengeance DDR5 6000MHz",
      "storage": "2TB Samsung 990 PRO Gen4 (7450 MB/s)",
      "gpu": "Gigabyte GeForce RTX 4070 SUPER 12GB",
      "psu": "Corsair RM850e 850W 80+ Gold Modular",
      "case": "NZXT H5 Flow RGB Tempered Glass",
      "cooler": "DeepCool LS720 360mm Liquid Cooler"
    },
    "recommended_for_kh": "វិស្វករស្ថាបត្យកម្ម ស្ទូឌីយោវីដេអូ អ្នករចនា 3D និង Gamer កម្រិតខ្ពស់",
    "recommended_for_en": "Architects, 3D animators, film studios and competitive gamers",
    "image": "/images/products/asus-tuf-gaming-vg249q1a.jpg"
  },
  {
    "id": "prebuilt-business-server",
    "slug": "nv-business-server-storage",
    "tier": "business",
    "name_kh": "NV Business PC / Local File Server",
    "name_en": "NV Business Workstation & Local File Server (Core i7 / 32GB / 2TB NVMe + 4TB HDD)",
    "price_usd": 980,
    "summary_kh": "រៀបចំសម្រាប់ក្រុមហ៊ុន និងសហគ្រាស ទុកចែករំលែកឯកសារ File Sharing, Quickbooks Multi-user និង Backup",
    "summary_en": "High-availability business tower for file server, accounting database, and secure automated backup",
    "specs": {
      "cpu": "Intel Core i7-14700K (20 Cores / 28 Threads)",
      "motherboard": "Gigabyte B760 Gaming X AX DDR5",
      "ram": "32GB DDR5 5600MHz",
      "storage": "2TB NVMe SSD + 4TB Enterprise Storage",
      "gpu": "Intel UHD 770 Multi-Display Ready",
      "psu": "650W 80+ Bronze Continuous Duty",
      "case": "Heavy Duty Silent Steel Chassis with Dust Filters",
      "cooler": "High-Efficiency Air Cooler"
    },
    "recommended_for_kh": "ក្រុមហ៊ុនធុនតូច និងមធ្យម ឃ្លាំងទំនិញ និងការិយាល័យមេធាវី/គណនេយ្យ",
    "recommended_for_en": "SMEs, logistics hubs, legal and accounting firms requiring local central data sharing",
    "image": "/images/products/toten-server-rack-9u-wallmount.jpg"
  }
];

export const itServices: ITService[] = [
  {
    id: 'srv-network',
    slug: 'network-installation',
    title_kh: 'ដំឡើង និងរៀបចំប្រព័ន្ធ Network (Network Installation)',
    title_en: 'Enterprise Network Cabling & Installation',
    icon: 'Network',
    short_desc_kh: 'រៀបចំ និងដំឡើងប្រព័ន្ធ Network ខ្សែកាប Cat6/Fiber សម្រាប់ផ្ទះ ការិយាល័យ ហាង សាលារៀន និងអាជីវកម្ម។',
    short_desc_en: 'Structured Cat6/Cat6A cabling, Server Rack organization, Patch Panels and Managed Switch configurations for corporate facilities.',
    description_kh: 'ក្រុមការងារបច្ចេកទេសជំនាញរបស់ NV Technology ផ្តល់សេវារៀបចំប្រព័ន្ធបណ្តាញខ្សែកាបតាមស្តង់ដារអន្តរជាតិ។ យើងរៀបចំទូ Rack ឱ្យមានសណ្តាប់ធ្នាប់ បែងចែក VLAN ការពារការកកស្ទះ និងធានាថាប្រព័ន្ធ Network ដំណើរការបានល្បឿនលឿន 1000Mbps ពេញលេញ។',
    description_en: 'NV Technology provides end-to-end network deployment including structured copper and optical cabling, neat rack cable management, patch panel punch-downs, VLAN segmentation, and enterprise throughput testing.',
    deliverables_kh: [
      'ចុះវាស់វែង និងធ្វើប្លង់ Network ទីតាំងជាក់ស្តែង (Site Survey & Blueprint)',
      'តំណខ្សែ Cat6/Fiber ម៉ាក Ugreen/Commscope ស្តង់ដារខ្ពស់',
      'រៀបចំទូ Rack, Patch Panel និងធ្វើស្លាកសម្គាល់ខ្សែ (Cable Labeling)',
      'Config VLAN បែងចែកបណ្តាញការិយាល័យ គណនេយ្យ និង Guest Wi-Fi',
      'របាយការណ៍តេស្តល្បឿន និងការធានាលើការដំឡើង 1 ឆ្នាំពេញ',
    ],
    deliverables_en: [
      'Comprehensive on-site survey and network topology blueprinting',
      'High-grade Commscope/UGREEN Cat6/Fiber optic cable pulling',
      'Server rack assembly, patch panel dressing and color-coded labeling',
      'Managed VLAN segmentation (Corporate, POS, CCTV, Guest)',
      'Certified cable speed testing report and 1-year installation warranty',
    ],
    sla_kh: 'ឆ្លើយតបបន្ទាន់ក្នុងរយៈពេល 2 ម៉ោង | ដំឡើងរួចរាល់តាមកាលវិភាគ',
    sla_en: '2-hour emergency response SLA | Dedicated project lead engineer',
    suitable_for_kh: 'ការិយាល័យក្រុមហ៊ុន, អគារពាណិជ្ជកម្ម, សាលារៀន, ឃ្លាំងស្តុកទំនិញ, ហាងកាហ្វេ',
    suitable_for_en: 'Corporate offices, commercial buildings, schools, warehouses, retail chains',
  },
  {
    id: 'srv-wifi',
    slug: 'wifi-solutions',
    title_kh: 'ដំណោះស្រាយ Wi-Fi គ្របដណ្តប់ទូលាយ (Wi-Fi Solutions)',
    title_en: 'Seamless High-Density Wi-Fi Solutions',
    icon: 'Wifi',
    short_desc_kh: 'រៀបចំប្រព័ន្ធ Wi-Fi និង Access Point (Ubiquiti / Ruijie) ដើម្បីផ្តល់សេវា Wi-Fi មានស្ថេរភាព ដើរមិនដាច់ (Roaming)។',
    short_desc_en: 'Zero-handoff Wi-Fi 6 wireless roaming for high-density environments using Ubiquiti UniFi and Ruijie Reyee cloud access points.',
    description_kh: 'លែងបារម្ភរឿងដើរពីជាន់មួយទៅជាន់មួយហើយដាច់ Wi-Fi! យើងដំឡើងប្រព័ន្ធ Mesh & Seamless Roaming ជាមួយ Captive Portal (ទំព័រស្វាគមន៍អតិថិជន) កំណត់ល្បឿន Speed Limit និងការពារការលួចប្រើប្រាស់ដោយគ្មានការអនុញ្ញាត។',
    description_en: 'Eliminate dead zones with our high-density Wi-Fi engineering. We implement 802.11k/v/r seamless roaming, customized captive portals, bandwidth rate-limiting, and 24/7 cloud health telemetry.',
    deliverables_kh: [
      'វាស់កម្លាំងសញ្ញា RF Heatmap ដើម្បីកំណត់ទីតាំង Access Point ឱ្យត្រូវចំចំណុច',
      'ដំឡើង Wi-Fi 6 APs ភ្ជាប់ PoE Switch កាត់បន្ថយការតខ្សែភ្លើងរញ៉េរញ៉ៃ',
      'រៀបចំប្រព័ន្ធ Roaming ដើរគ្រប់កន្លែងដោយប្រើឈ្មោះ Wi-Fi តែមួយ (SSID តែមួយ)',
      'បង្កើតទំព័រ Login ស្វាគមន៍សម្រាប់ភ្ញៀវ (Guest Captive Portal)',
    ],
    deliverables_en: [
      'RF signal heatmapping and optimal AP placement engineering',
      'Wi-Fi 6 ceiling AP installations powered via centralized PoE',
      'Unified single-SSID architecture with automatic fast roaming',
      'Custom branded guest captive portal with voucher or social check-in',
    ],
    sla_kh: 'ធានាសេវា Wi-Fi ពេញលេញ គ្មានកន្លែងស្លាប់សញ្ញា (No Dead Zones)',
    sla_en: 'Full coverage guarantee with 99.9% uptime SLA',
    suitable_for_kh: 'សណ្ឋាគារ, ភោជនីយដ្ឋាន, ខុនដូ, ការិយាល័យ Co-Working Space, ផ្ទះវីឡាធំៗ',
    suitable_for_en: 'Hotels, resorts, restaurants, condominiums, co-working spaces, luxury villas',
  },
  {
    id: 'srv-firewall',
    slug: 'firewall-vpn',
    title_kh: 'Firewall, VPN & សុវត្ថិភាពបណ្តាញ (Network Security)',
    title_en: 'Next-Gen Firewall & Enterprise VPN Security',
    icon: 'ShieldAlert',
    short_desc_kh: 'ដំឡើង និងកំណត់ Firewall (Fortinet / MikroTik), បង្កើត VPN ភ្ជាប់ពីផ្ទះ ឬសាខា និងទប់ស្កាត់ការវាយប្រហារ។',
    short_desc_en: 'Fortinet FortiGate deployment, Site-to-Site IPsec VPN, SSL-VPN remote work access, intrusion prevention (IPS) and URL web filtering.',
    description_kh: 'ការពារទិន្នន័យសម្ងាត់របស់ក្រុមហ៊ុនពីការលួច Hack និង Ransomware។ យើងជួយដំឡើង Firewall កម្រិតស្តង់ដារ កំណត់ច្បាប់បិទគេហទំព័រមិនសមរម្យ (Facebook/TikTok/Gambling) ក្នុងម៉ោងធ្វើការ និងបង្កើតប្រព័ន្ធ VPN ឱ្យបុគ្គលិកអាចចូលធ្វើការពីផ្ទះបានដោយសុវត្ថិភាព 100%។',
    description_en: 'Shield your mission-critical company database and ERP from ransomware and zero-day threats. We engineer Fortinet and MikroTik security appliances with automated threat blocking, corporate content filtering, and secure encrypted VPN tunnels.',
    deliverables_kh: [
      'ដំឡើង និង Hardening ប្រព័ន្ធ Firewall តាមស្តង់ដារ Cybersecurity',
      'បង្កើត Site-to-Site VPN ភ្ជាប់ការិយាល័យកណ្តាល ទៅកាន់បណ្តាសាខាខេត្ត',
      'បង្កើត SSL-VPN Client ឱ្យថ្នាក់ដឹកនាំ និងបុគ្គលិកចូលធ្វើការពីក្រៅការិយាល័យ',
      'កំណត់ Web & Application Filtering បិទគេហទំព័រមេរោគ និងល្បែងស៊ីសង',
      'ប្រព័ន្ធជូនដំណឹងបន្ទាន់ពេលមានការវាយប្រហារ (Intrusion Alerts)',
    ],
    deliverables_en: [
      'Appliance deployment & hardened security policies configuration',
      'Encrypted IPsec Site-to-Site VPN linking headquarters with provincial branches',
      'Secure remote-work SSL-VPN tunnels for remote executives & staff',
      'Granular Application & Web URL filtering to maximize workplace productivity',
      'Automated intrusion alerts and weekly security telemetry reports',
    ],
    sla_kh: 'ត្រួតពិនិត្យសុវត្ថិភាព 24/7 | ឆ្លើយតបបន្ទាន់ករណីជាប់ Hack',
    sla_en: '24/7 critical incident response and proactive vulnerability patching',
    suitable_for_kh: 'ធនាគារ, ស្ថាប័នមីក្រូហិរញ្ញវត្ថុ, ក្រុមហ៊ុននាំចេញ-ចូល, មន្ទីរពេទ្យ, សហគ្រាសធំៗ',
    suitable_for_en: 'Financial institutions, MFIs, logistics, healthcare facilities, enterprises',
  },
  {
    id: 'srv-server',
    slug: 'server-setup',
    title_kh: 'ដំឡើង និងរៀបចំ Server & Backup (Server Setup)',
    title_en: 'On-Premise Server, Active Directory & Backup Setup',
    icon: 'Server',
    short_desc_kh: 'ដំឡើង Server, File Server ចែករំលែកឯកសារ, Domain Controller, QuickBooks Server និងប្រព័ន្ធ Auto-Backup។',
    short_desc_en: 'Windows Server, Active Directory, Centralized NAS/SAN File Storage, Automated Cloud Backup and Virtualization (VMware/Proxmox).',
    description_kh: 'ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យកណ្តាល៖ បុគ្គលិកម្នាក់ៗមានគណនីសម្ងាត់ផ្ទាល់ខ្លួន អាចចូលបើកឯកសារការងារតាមសិទ្ធិ (Permission)។ រួមបញ្ចូលប្រព័ន្ធ Backup ស្វ័យប្រវត្តិជារៀងរាល់យប់ មិនខ្លាចខូច Hard Disk ឬបាត់បង់ទិន្នន័យឡើយ។',
    description_en: 'Centralize company intelligence. We deploy dedicated Windows/Linux servers with Active Directory user rights management, shared network drives with granular permissions, and automated snapshot backups to prevent catastrophic data loss.',
    deliverables_kh: [
      'ដំឡើង Windows Server 2022 / 2025 ឬ Linux Enterprise Server',
      'កំណត់សិទ្ធិបុគ្គលិកចូលមើល Folder (HR, Finance, Sales, Management)',
      'ដំឡើងប្រព័ន្ធ File Server ជាមួយ Shadow Copy (អាចទាញឯកសារដែលលុបច្រឡំមកវិញបាន)',
      'រៀបចំប្រព័ន្ធ 3-2-1 Backup (Local NAS + External Drive + Cloud Storage)',
    ],
    deliverables_en: [
      'Turnkey installation of Windows Server 2022/2025 or Enterprise Linux',
      'Active Directory Domain Services with Role-Based Access Control (RBAC)',
      'Network File Sharing with automated VSS snapshot recovery for accidental deletes',
      'Robust 3-2-1 backup topology (Local RAID + Secondary NAS + Cloud R2/S3)',
    ],
    sla_kh: 'សង្គ្រោះទិន្នន័យបន្ទាន់ (Disaster Recovery) ក្នុងរយៈពេលតិចជាង 4 ម៉ោង',
    sla_en: 'Sub-4-hour Disaster Recovery (RTO) guarantee',
    suitable_for_kh: 'ក្រុមហ៊ុនគណនេយ្យ, ក្រុមហ៊ុនសំណង់, ភ្នាក់ងារផ្សាយពាណិជ្ជកម្ម, ស្ថាប័នរដ្ឋ',
    suitable_for_en: 'Accounting firms, architecture consultancies, media agencies, corporations',
  },
  {
    id: 'srv-attendance',
    slug: 'attendance-systems',
    title_kh: 'ប្រព័ន្ធស្កេនវត្តមាន & ទ្វារសុវត្ថិភាព (Attendance & Access)',
    title_en: 'Biometric Time Attendance & Access Control',
    icon: 'Fingerprint',
    short_desc_kh: 'ដំឡើងប្រព័ន្ធ Fingerprint / Face Recognition និងប្រព័ន្ធចាក់សោទ្វារកញ្ចក់អេឡិចត្រូនិកសម្រាប់គ្រប់គ្រងបុគ្គលិក។',
    short_desc_en: 'Facial recognition terminals, fingerprint time attendance, electronic magnetic glass door locks and automated payroll export.',
    description_kh: 'គ្រប់គ្រងម៉ោងចូល និងចេញធ្វើការរបស់បុគ្គលិកបានយ៉ាងសុក្រឹត មិនបាច់កត់លើសៀវភៅ។ ទាញយករបាយការណ៍ទៅជា Excel ត្រឹមតែ 1 នាទី ដើម្បីគណនាប្រាក់បៀវត្សរ៍ (Payroll) បានយ៉ាងរហ័ស។ អាចភ្ជាប់ជាមួយទ្វារកញ្ចក់ បើកទ្វារដោយស្កេនមុខ ឬមេដៃ។',
    description_en: 'Eliminate buddy punching and manual paperwork. Our biometric setups provide accurate time-stamped attendance logging with instant Excel report exports for payroll, seamlessly integrated with electromagnetic door locking.',
    deliverables_kh: [
      'ដំឡើងម៉ាស៊ីនស្កេនមុខ/មេដៃ ZKTeco ឬ Hikvision ម៉ូឌែលចុងក្រោយ',
      'ដំឡើងសោទ្វារម៉ាញេទិកកម្លាំង 600lbs សម្រាប់ទ្វារកញ្ចក់ ឬទ្វារឈើ',
      'ដំឡើងកម្មវិធីគ្រប់គ្រងវត្តមានលើកុំព្យូទ័រ និងបង្រៀនផ្នែកធនធានមនុស្ស (HR)',
      'រៀបចំប្រព័ន្ធទាញទិន្នន័យស្វ័យប្រវត្តិតាមបណ្តាញ LAN / Wi-Fi',
    ],
    deliverables_en: [
      'Deployment of modern ZKTeco / Hikvision facial recognition terminals',
      '600lbs electromagnetic lock, push-to-exit buttons and emergency break-glass',
      'Comprehensive software installation & complete training for HR department',
      'Automated LAN-based log synchronization and payroll data formatting',
    ],
    sla_kh: 'បង្រៀនបុគ្គលិកប្រើប្រាស់រហូតដល់ចេះ 100% | ជួសជុលបន្ទាន់',
    sla_en: 'Complete on-site HR staff onboarding & warranty maintenance support',
    suitable_for_kh: 'ការិយាល័យគ្រប់ប្រភេទ, រោងចក្រ, សាលារៀន, គ្លីនិក, ហាងលក់ទំនិញ',
    suitable_for_en: 'Offices, manufacturing plants, schools, clinics, retail stores',
  },
  {
    id: 'srv-printer',
    slug: 'printer-solutions',
    title_kh: 'ដំណោះស្រាយ Printer & Scanner (Printer Setup & Fix)',
    title_en: 'Network Printer Deployment & Fleet Management',
    icon: 'Printer',
    short_desc_kh: 'ដំឡើង Printer, Network Printer ចែករំលែកក្នុង LAN, ម៉ាស៊ីនព្រីនវិក្កយបត្រ POS និងជួសជុលបញ្ហា Printer។',
    short_desc_en: 'Shared network printing, wireless print servers, POS receipt/barcode printer integration and toner supply agreements.',
    description_kh: 'ជួយឱ្យកុំព្យូទ័រគ្រប់គ្រឿងក្នុងក្រុមហ៊ុនអាចបញ្ជាព្រីនទៅម៉ាស៊ីនព្រីនតែមួយបានដោយមិនបាច់ដោតខ្សែដោះចុះដោះឡើង។ ដោះស្រាយបញ្ហាកកស្ទះក្រដាស ព្រីនចេញឆ្នូត ឬកុំព្យូទ័ររក Printer មិនឃើញ។',
    description_en: 'Configure centralized print servers where every desktop, laptop, and mobile phone can print effortlessly without cable swapping. Rapid troubleshooting for paper jams, streak lines, and network offline errors.',
    deliverables_kh: [
      'ដំឡើង Network IP Printer សម្រាប់ Canon, Epson, HP, Brother',
      'Share Printer ឱ្យបុគ្គលិកទាំងអស់ប្រើប្រាស់ដោយមានសុវត្ថិភាព',
      'ដំឡើងម៉ាស៊ីនព្រីនវិក្កយបត្រកន្ទុយសំបុត្រ (POS Receipt) សម្រាប់ហាង និងភោជនីយដ្ឋាន',
      'សេវាកម្មថែទាំ ផ្លាស់ប្តូរទឹកថ្នាំ និងជួសជុលដល់ទីកន្លែង',
    ],
    deliverables_en: [
      'Static IP configuration and driver deployment for multi-brand fleets',
      'Secure print sharing across Windows and macOS environments',
      'Thermal receipt and barcode printer calibration for POS retail software',
      'On-demand ink/toner refills and preventive maintenance servicing',
    ],
    sla_kh: 'ចុះជួសជុលដល់ការិយាល័យក្នុងថ្ងៃតែមួយ (Same Day Onsite)',
    sla_en: 'Same-day on-site troubleshooting in Phnom Penh',
    suitable_for_kh: 'ការិយាល័យមេធាវី, គណនេយ្យ, ភោជនីយដ្ឋាន, ឱសថស្ថាន, ហាងលក់រាយ',
    suitable_for_en: 'Law firms, financial services, restaurants, pharmacies, retail outlets',
  },
  {
    id: 'srv-repair',
    slug: 'computer-repair-maintenance',
    title_kh: 'ជួសជុល & ថែទាំកុំព្យូទ័រប្រចាំខែ (IT Maintenance)',
    title_en: 'Computer Maintenance & Monthly IT Support Contract',
    icon: 'Wrench',
    short_desc_kh: 'ត្រួតពិនិត្យ ជួសជុល Laptop, Desktop, តម្លើង Windows/Software សម្អាតធូលី ប្តូរស៊ីលីខនកម្តៅ និងកិច្ចសន្យាថែទាំ IT ប្រចាំខែ។',
    short_desc_en: 'On-demand hardware repair, SSD/RAM upgrades, thermal paste replacement and monthly corporate SLA IT outsourcing retainers.',
    description_kh: 'ក្រុមហ៊ុនលោកអ្នកមិនចាំបាច់ជួលបុគ្គលិក IT ពេញម៉ោងដែលចំណាយខ្ពស់នោះទេ។ សេវាកម្ម IT Support ប្រចាំខែរបស់ NV Technology នឹងជួយមើលថែប្រព័ន្ធកុំព្យូទ័រទាំងអស់ឱ្យដំណើរការរលូន ជួយដោះស្រាយបញ្ហាពីចម្ងាយ (Remote Support) ភ្លាមៗ និងចុះមកដល់ទីកន្លែងរៀងរាល់ខែ។',
    description_en: 'Save on full-time IT payroll. NV Technology acts as your dedicated IT department via monthly maintenance retainers. Includes instant remote helpdesk, monthly preventative physical servicing, and priority on-site dispatch.',
    deliverables_kh: [
      'ជួយដោះស្រាយបញ្ហាបន្ទាន់ពីចម្ងាយ (AnyDesk / TeamViewer) ក្នុងរយៈពេល 15 នាទី',
      'ចុះសម្អាតធូលីកុំព្យូទ័រ និងប្តូរស៊ីលីខនកម្តៅ (Thermal Paste) រៀងរាល់ខែ',
      'ពិនិត្យសុខភាព Hard Disk, RAM និងលុបមេរោគកុំព្យូទ័រ',
      'តម្លើងកុំព្យូទ័រឡើងស៊េរី (Upgrade RAM / SSD) ឱ្យលឿនជាងមុន 5 ដង',
    ],
    deliverables_en: [
      'Sub-15-minute remote helpdesk assistance via AnyDesk / TeamViewer',
      'Monthly on-site preventive dusting, fan inspection and thermal paste re-application',
      'Hardware diagnostics, proactive failure alerts and malware remediation',
      'Fast turnaround for SSD/RAM upgrades multiplying workstation speed',
    ],
    sla_kh: 'Remote Support ក្នុងរយៈពេល 15 នាទី | ចុះដល់កន្លែងក្នុង 1-2 ម៉ោង',
    sla_en: '15-minute remote support SLA | 1-2 hour on-site dispatch in Phnom Penh',
    suitable_for_kh: 'ក្រុមហ៊ុនទើបបង្កើតថ្មី (Startups), ក្រុមហ៊ុនទំហំ 5-100 នាក់, ហាងអាជីវកម្ម',
    suitable_for_en: 'Startups, SMEs with 5-100 staff, distributed retail branches',
  }
];
