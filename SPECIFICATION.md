# NV Technology — Master Engineering & System Specification
**Enterprise E-Commerce, Custom PC Engine, Network/Security Infrastructure & IT Solutions Platform**
*Target Market: Kingdom of Cambodia (🇰🇭) | Languages: Khmer (Primary) / English*

---

## 1. Executive Architecture & Tech Stack

```
                          ┌────────────────────────┐
                          │    Cloudflare Edge     │
                          │   (SSL, WAF, R2 CDN)   │
                          └───────────┬────────────┘
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
┌─────────────────────────────┐               ┌─────────────────────────────┐
│      Frontend Web App       │               │      Backend API Service    │
│  Next.js 14+ (App Router)   │  REST / JSON  │      Laravel 11 / PHP 8.3   │
│  TypeScript, Tailwind CSS   ├──────────────►│   Redis Queue + Cache       │
│  Khmer Google Fonts         │               │   Telegram Bot Service      │
└─────────────────────────────┘               └──────────────┬──────────────┘
                                                             │
                                              ┌──────────────┴──────────────┐
                                              ▼                             ▼
                               ┌─────────────────────────────┐ ┌─────────────────────────────┐
                               │       MySQL 8.0 InnoDB      │ │     External Gateways       │
                               │ utf8mb4_unicode_ci (Khmer)  │ │ Telegram API, KHQR/Bakong │
                               └─────────────────────────────┘ └─────────────────────────────┘
```

### Technology Matrix
* **Frontend**: Next.js 14+ (App Router), React 18/19, TypeScript, Tailwind CSS, Lucide Icons, Headless UI / Radix primitives.
* **Khmer Typography**: Google Fonts (`Kantumruy Pro` for UI/Headings, `Battambang` for body text, `Inter` for English/numbers).
* **Backend API**: Laravel 11 / PHP 8.3 strict types, Laravel Sanctum (Admin Auth), Spatie Query Builder, Intervention Image.
* **Database**: MySQL 8.0+ / InnoDB with `utf8mb4_unicode_520_ci` (full Khmer Unicode collation and accent sorting).
* **Cache & Async Queue**: Redis (Session handling, product listing cache, Telegram notification worker).
* **Media Storage**: Cloudflare R2 (S3-compatible API) + Cloudflare Images / WebP auto-conversion.
* **External Integrations**:
  * **Telegram**: Telegram Bot API for sales alerts and deep-link click-to-chat prefilled messages.
  * **Cambodia Payments**: Bakong KHQR dynamic QR payload generator / ABA PayWay checkout integration.

---

## 2. Bilingual Sitemap, Route Map & UI Language System

### 2.1 Route Map

| Route Path | Language | Purpose | Key Functionality |
|---|---|---|---|
| `/[lang]` | `kh` / `en` | Homepage | Hero banner, category grid, top deals, custom PC teaser, IT solutions showcase, brands carousel |
| `/[lang]/products` | `kh` / `en` | Product Catalog | Multi-facet filtering (Brand, Price, Specs, Stock), Sorting, Instant Search |
| `/[lang]/categories/[slug]` | `kh` / `en` | Category Page | Subcategory chips, breadcrumbs, category-specific spec filters |
| `/[lang]/products/[slug]` | `kh` / `en` | Product Detail (PDP) | Multi-image gallery, spec table, 3-tier CTA (Buy Now / Quote / Telegram), stock status |
| `/[lang]/custom-pc` | `kh` / `en` | Custom PC Builder | 8-step interactive builder, real-time compatibility validation, wattage calculator, Telegram export |
| `/[lang]/custom-pc/prebuilt` | `kh` / `en` | Pre-built PC Packages | Office, Gaming, Creator, Business enterprise bundles with 1-click order/quote |
| `/[lang]/services` | `kh` / `en` | IT Services Overview | Grid of 7 core IT services with SLA and solution request forms |
| `/[lang]/services/[slug]` | `kh` / `en` | Service Detail | Scope of work, deliverables, network diagrams, consultation booking form |
| `/[lang]/brands` | `kh` / `en` | Brands Directory | Alphabetical & featured brand directory (Lenovo, MikroTik, Fortinet, etc.) |
| `/[lang]/brands/[slug]` | `kh` / `en` | Brand Catalog | Brand biography, authorized partner badges, filtered products |
| `/[lang]/quotations/new` | `kh` / `en` | RFQ Form | Multi-item corporate quotation request with PDF generation & Telegram dispatcher |
| `/[lang]/cart` | `kh` / `en` | Shopping Cart | Line items, delivery calculation for Phnom Penh & provinces, coupon input |
| `/[lang]/checkout` | `kh` / `en` | Checkout | Customer shipping info, Bakong KHQR scan modal, Cash on Delivery option |
| `/[lang]/contact` | `kh` / `en` | Contact & Map | Google Map embed, direct phone lines, store address in Khmer/English, Telegram sales lines |
| `/admin/*` | English/Khmer | Backoffice | Products, Inventory, Orders, Quotations, PC Builds, Services, Banners, Audit logs |

---

### 2.2 Bilingual UI Translation Dictionary (Core System Keys)

```json
{
  "navigation": {
    "home": { "kh": "ទំព័រដើម", "en": "Home" },
    "products": { "kh": "ផលិតផល", "en": "Products" },
    "computers": { "kh": "កុំព្យូទ័រ", "en": "Computers" },
    "components": { "kh": "គ្រឿងបន្លាស់", "en": "PC Parts" },
    "networking": { "kh": "បណ្តាញ", "en": "Networking" },
    "security": { "kh": "សុវត្ថិភាព", "en": "Security" },
    "printers": { "kh": "ម៉ាស៊ីនបោះពុម្ព", "en": "Printers" },
    "custom_pc": { "kh": "បង្កើតកុំព្យូទ័រ", "en": "Custom PC" },
    "it_services": { "kh": "សេវាកម្ម IT", "en": "IT Services" },
    "brands": { "kh": "ម៉ាកផលិតផល", "en": "Brands" },
    "promotions": { "kh": "ប្រូម៉ូសិន", "en": "Promotions" },
    "about_us": { "kh": "អំពីយើង", "en": "About Us" },
    "contact": { "kh": "ទំនាក់ទំនង", "en": "Contact" }
  },
  "actions": {
    "buy_now": { "kh": "ទិញឥឡូវ", "en": "Buy Now" },
    "add_to_cart": { "kh": "ដាក់ក្នុងកន្ត្រក", "en": "Add to Cart" },
    "request_quote": { "kh": "ស្នើសុំតម្លៃ", "en": "Request Quote" },
    "request_solution": { "kh": "ស្នើសុំដំណោះស្រាយ", "en": "Request Solution" },
    "ask_telegram": { "kh": "សួរតម្លៃតាម Telegram", "en": "Ask via Telegram" },
    "start_build": { "kh": "ចាប់ផ្តើម Build", "en": "Start Building" },
    "save_build": { "kh": "រក្សាទុក Build", "en": "Save Build" },
    "submit": { "kh": "ផ្ញើសំណើ", "en": "Submit Request" },
    "filter": { "kh": "ចម្រាញ់", "en": "Filter" },
    "search_placeholder": { "kh": "ស្វែងរក Laptop, Router, Switch, RAM...", "en": "Search Laptop, Router, Switch, RAM..." }
  },
  "status": {
    "in_stock": { "kh": "មានក្នុងស្តុក", "en": "In Stock" },
    "low_stock": { "kh": "ជិតអស់ពីស្តុក", "en": "Low Stock" },
    "out_of_stock": { "kh": "អស់ពីស្តុក", "en": "Out of Stock" },
    "call_for_price": { "kh": "សូមទាក់ទងសួរតម្លៃ", "en": "Contact for Price" }
  }
}
```

---

## 3. Complete Database Schema (MySQL 8.0 DDL)

```sql
-- Character set and collation specifically tailored for Khmer text indexing and search
CREATE DATABASE IF NOT EXISTS `nv_technology`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_520_ci;

USE `nv_technology`;

-- 1. Admins & Roles
CREATE TABLE `admins` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('superadmin', 'sales', 'technician', 'inventory') DEFAULT 'sales',
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Brands
CREATE TABLE `brands` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `logo_url` VARCHAR(255) NULL,
  `website` VARCHAR(255) NULL,
  `is_featured` BOOLEAN DEFAULT FALSE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_brands_slug` (`slug`),
  INDEX `idx_brands_featured` (`is_featured`)
) ENGINE=InnoDB;

-- 3. Categories (Hierarchy with parent_id)
CREATE TABLE `categories` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `parent_id` BIGINT UNSIGNED NULL,
  `name_kh` VARCHAR(150) NOT NULL,
  `name_en` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `icon` VARCHAR(50) NULL,
  `image_url` VARCHAR(255) NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL,
  INDEX `idx_categories_slug` (`slug`),
  INDEX `idx_categories_parent` (`parent_id`)
) ENGINE=InnoDB;

-- 4. Products Table (Hybrid pricing mode: fixed retail, quote, solution)
CREATE TABLE `products` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `brand_id` BIGINT UNSIGNED NULL,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `sku` VARCHAR(60) NOT NULL UNIQUE,
  `name_kh` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `pricing_type` ENUM('buy_now', 'request_quote', 'request_solution') NOT NULL DEFAULT 'buy_now',
  `price_usd` DECIMAL(10, 2) NULL,
  `sale_price_usd` DECIMAL(10, 2) NULL,
  `cost_usd` DECIMAL(10, 2) NULL,
  `stock_quantity` INT NOT NULL DEFAULT 0,
  `low_stock_threshold` INT NOT NULL DEFAULT 5,
  `warranty_period_months` INT DEFAULT 12,
  `is_featured` BOOLEAN DEFAULT FALSE,
  `is_active` BOOLEAN DEFAULT TRUE,
  `custom_pc_part_type` ENUM(
    'none', 'cpu', 'motherboard', 'ram', 'storage_ssd', 
    'storage_hdd', 'gpu', 'psu', 'case', 'cooler'
  ) DEFAULT 'none',
  `short_desc_kh` TEXT NULL,
  `short_desc_en` TEXT NULL,
  `desc_kh` LONGTEXT NULL,
  `desc_en` LONGTEXT NULL,
  `meta_title` VARCHAR(255) NULL,
  `meta_desc` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE,
  INDEX `idx_products_slug` (`slug`),
  INDEX `idx_products_part_type` (`custom_pc_part_type`),
  INDEX `idx_products_pricing_type` (`pricing_type`),
  FULLTEXT `idx_products_search` (`name_kh`, `name_en`, `short_desc_kh`, `short_desc_en`)
) ENGINE=InnoDB;

-- 5. Product Images
CREATE TABLE `product_images` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `alt_text` VARCHAR(150) NULL,
  `is_primary` BOOLEAN DEFAULT FALSE,
  `sort_order` INT DEFAULT 0,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Product Technical Specifications (EAV Structure for dynamic filtering)
CREATE TABLE `product_specifications` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `spec_group` VARCHAR(50) DEFAULT 'General',
  `spec_key_en` VARCHAR(100) NOT NULL,
  `spec_key_kh` VARCHAR(100) NOT NULL,
  `spec_value` VARCHAR(255) NOT NULL,
  `sort_order` INT DEFAULT 0,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  INDEX `idx_spec_product` (`product_id`),
  INDEX `idx_spec_key` (`spec_key_en`, `spec_value`)
) ENGINE=InnoDB;

-- 7. PC Hardware Compatibility Registry (Powering Custom PC Rules Engine)
CREATE TABLE `pc_part_specifications` (
  `product_id` BIGINT UNSIGNED PRIMARY KEY,
  `socket` VARCHAR(50) NULL, -- 'AM4', 'AM5', 'LGA1700', 'LGA1851'
  `form_factor` VARCHAR(50) NULL, -- 'ATX', 'Micro-ATX', 'Mini-ITX'
  `ram_type` VARCHAR(20) NULL, -- 'DDR4', 'DDR5'
  `ram_slots` INT DEFAULT 0,
  `chipset` VARCHAR(50) NULL, -- 'B650', 'Z790', 'B760'
  `pcie_gen` VARCHAR(20) NULL, -- 'Gen4', 'Gen5'
  `tdp_watts` INT DEFAULT 0, -- CPU/GPU power draw in Watts
  `psu_recommended_watts` INT DEFAULT 0,
  `psu_form_factor` VARCHAR(20) NULL, -- 'ATX', 'SFX'
  `cooler_height_mm` INT DEFAULT 0,
  `case_max_cooler_height_mm` INT DEFAULT 0,
  `gpu_length_mm` INT DEFAULT 0,
  `case_max_gpu_length_mm` INT DEFAULT 0,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. Custom PC Pre-Configured Packages
CREATE TABLE `custom_pc_packages` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name_kh` VARCHAR(150) NOT NULL,
  `name_en` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `tier` ENUM('office', 'gaming', 'creator', 'business') NOT NULL,
  `price_usd` DECIMAL(10, 2) NOT NULL,
  `summary_kh` TEXT NOT NULL,
  `summary_en` TEXT NOT NULL,
  `image_url` VARCHAR(255) NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 9. Custom PC Build Sessions / Submissions
CREATE TABLE `custom_pc_builds` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `telegram_username` VARCHAR(60) NULL,
  `status` ENUM('pending', 'contacted', 'approved', 'built', 'cancelled') DEFAULT 'pending',
  `total_price_usd` DECIMAL(10, 2) NOT NULL,
  `estimated_wattage` INT NOT NULL,
  `notes` TEXT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE `custom_pc_build_items` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `build_id` BIGINT UNSIGNED NOT NULL,
  `part_type` VARCHAR(30) NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `unit_price_usd` DECIMAL(10, 2) NOT NULL,
  `quantity` INT DEFAULT 1,
  FOREIGN KEY (`build_id`) REFERENCES `custom_pc_builds`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB;

-- 10. IT Services
CREATE TABLE `services` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title_kh` VARCHAR(150) NOT NULL,
  `title_en` VARCHAR(150) NOT NULL,
  `icon` VARCHAR(50) NOT NULL,
  `short_desc_kh` TEXT NOT NULL,
  `short_desc_en` TEXT NOT NULL,
  `content_kh` LONGTEXT NOT NULL,
  `content_en` LONGTEXT NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 11. Service Quote / Consultation Requests
CREATE TABLE `service_requests` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `service_id` BIGINT UNSIGNED NULL,
  `company_name` VARCHAR(150) NULL,
  `contact_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `telegram` VARCHAR(60) NULL,
  `location_address` VARCHAR(255) NULL,
  `device_count` INT DEFAULT 0,
  `urgency` ENUM('standard', 'urgent', 'emergency') DEFAULT 'standard',
  `scope_notes` TEXT NOT NULL,
  `status` ENUM('new', 'contacted', 'site_survey', 'quoted', 'completed', 'closed') DEFAULT 'new',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 12. Corporate Quotations (RFQ System)
CREATE TABLE `quotations` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `quote_code` VARCHAR(30) NOT NULL UNIQUE, -- e.g. NVQ-2026-0001
  `client_name` VARCHAR(100) NOT NULL,
  `company_name` VARCHAR(150) NULL,
  `phone` VARCHAR(30) NOT NULL,
  `telegram` VARCHAR(60) NULL,
  `email` VARCHAR(100) NULL,
  `status` ENUM('pending', 'reviewing', 'sent_to_customer', 'accepted', 'declined') DEFAULT 'pending',
  `subtotal_usd` DECIMAL(10, 2) DEFAULT 0.00,
  `tax_usd` DECIMAL(10, 2) DEFAULT 0.00,
  `total_usd` DECIMAL(10, 2) DEFAULT 0.00,
  `valid_until` DATE NULL,
  `notes` TEXT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE `quotation_items` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `quotation_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NULL,
  `custom_item_name` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price_usd` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `total_price_usd` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  FOREIGN KEY (`quotation_id`) REFERENCES `quotations`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 13. Direct Orders (For Fixed-Price Retail Products)
CREATE TABLE `orders` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(30) NOT NULL UNIQUE, -- e.g. NVO-2026-0001
  `customer_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `telegram` VARCHAR(60) NULL,
  `delivery_province` VARCHAR(50) NOT NULL, -- 'Phnom Penh', 'Siem Reap', etc.
  `delivery_address` TEXT NOT NULL,
  `payment_method` ENUM('khqr', 'cod', 'transfer') NOT NULL DEFAULT 'khqr',
  `payment_status` ENUM('unpaid', 'paid', 'verified', 'refunded') DEFAULT 'unpaid',
  `order_status` ENUM('pending', 'processing', 'shipping', 'delivered', 'cancelled') DEFAULT 'pending',
  `total_usd` DECIMAL(10, 2) NOT NULL,
  `telegram_message_id` VARCHAR(50) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE `order_items` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price_usd` DECIMAL(10, 2) NOT NULL,
  `line_total_usd` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB;
```

---

## 4. Product Tiering & Action Engine

Every item in the catalog is categorized into one of three strict interaction models to eliminate checkout friction:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        3-Tier Action Engine                            │
└────────────────────────────────────────────────────────────────────────┘
          │                               │                           │
          ▼                               ▼                           ▼
 🛒 [BUY_NOW]                   📞 [REQUEST_QUOTE]          🛠️ [REQUEST_SOLUTION]
 (Direct E-Commerce)            (Variable B2B Price)        (Enterprise Services)
  - Accessories (Mice, Keyboards)- Enterprise Routers/Switches- Network Cabling & Racks
  - RAM & NVMe SSDs              - Next-Gen Firewalls       - Wi-Fi Site Survey & APs
  - Standard Monitors            - Heavy Servers & SANs     - Biometric Access Control
  - Power Strips & Adapters      - High-end Workstations    - Maintenance Contracts
          │                               │                           │
          ▼                               ▼                           ▼
 Add to Cart -> Checkout        One-Click Telegram Modal    Scope Form -> Site Visit
 (KHQR / COD / Direct Delivery) or Web RFQ -> Sales Queue   -> Custom Proposal
```

### Action Logic Schema
1. **Tier 1: `buy_now`**
   * Instant online cart addition.
   * Auto stock decrementation upon order placement.
   * Supports immediate Bakong KHQR instant scan or Cash on Delivery (Phnom Penh delivery 1-2 hours via Grab/Deliver; provinces via Virak Buntham/J&T).
2. **Tier 2: `request_quote`**
   * Displays "Contact for Pricing" / "សូមទាក់ទងសួរតម្លៃ".
   * Primary Action: Opens Telegram deep-link with pre-formatted product message and SKU.
   * Secondary Action: "Add to Quote Basket" allowing multi-item enterprise RFQ generation.
3. **Tier 3: `request_solution`**
   * Solution consultation modal collects: Facility Type (Office/Warehouse/School), Target Device Count, Urgency level, Address.
   * Dispatches instant alert to Sales Engineers via Telegram webhook.

---

## 5. Custom PC Compatibility Engine

The Custom PC Engine enforces hardware logic directly in the browser and confirms validation server-side.

```
       [ 1. Select CPU ]
              │ (Socket: AM5, TDP: 120W)
              ▼
    [ 2. Filter Motherboard ] ◄── Only display boards with matching Socket (AM5)
              │ (Form Factor: ATX, RAM: DDR5, Slots: 4)
              ▼
       [ 3. Filter RAM ]      ◄── Only display DDR5 kits
              │ (2x 16GB = 32GB)
              ▼
     [ 4. Filter Storage ]    ◄── M.2 NVMe Gen 4/5 options
              │ (1TB NVMe)
              ▼
       [ 5. Filter GPU ]      ◄── (Length: 310mm, Power: 250W)
              │
              ▼
       [ 6. Filter Case ]     ◄── Clearance Check: Motherboard (ATX) & GPU (310mm <= max)
              │ (Max Cooler: 165mm)
              ▼
      [ 7. Filter Cooler ]    ◄── Height check (<= 165mm) & Socket bracket check
              │
              ▼
       [ 8. Select PSU ]      ◄── Calculated Minimum Wattage = (CPU + GPU + 100W) * 1.25
                                   Only show PSUs >= Recommended Wattage
```

### Compatibility Engine Rules (TypeScript Logic)

```typescript
export interface PartSpec {
  socket?: string;              // 'AM4' | 'AM5' | 'LGA1700'
  formFactor?: string;          // 'ATX' | 'Micro-ATX' | 'Mini-ITX'
  ramType?: string;             // 'DDR4' | 'DDR5'
  ramSlots?: number;
  tdpWatts?: number;
  gpuLengthMm?: number;
  caseMaxGpuMm?: number;
  coolerHeightMm?: number;
  caseMaxCoolerMm?: number;
}

export function validatePcBuild(parts: Record<string, PartSpec>): {
  isValid: boolean;
  errorsKh: string[];
  errorsEn: string[];
  recommendedPsuWatts: number;
} {
  const errorsKh: string[] = [];
  const errorsEn: string[] = [];

  const { cpu, motherboard, ram, gpu, casePart, cooler } = parts;

  // 1. Socket Check
  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    errorsKh.push(`CPU (${cpu.socket}) មិនត្រូវគ្នាជាមួយ Motherboard (${motherboard.socket}) ទេ។`);
    errorsEn.push(`CPU socket (${cpu.socket}) does not match Motherboard (${motherboard.socket}).`);
  }

  // 2. RAM Type Check
  if (motherboard && ram && motherboard.ramType !== ram.ramType) {
    errorsKh.push(`Motherboard ត្រូវការ ${motherboard.ramType} ប៉ុន្តែអ្នកបានជ្រើសរើស ${ram.ramType}។`);
    errorsEn.push(`Motherboard requires ${motherboard.ramType} but selected RAM is ${ram.ramType}.`);
  }

  // 3. GPU Length vs Case Clearance
  if (gpu && casePart && gpu.gpuLengthMm && casePart.caseMaxGpuMm) {
    if (gpu.gpuLengthMm > casePart.caseMaxGpuMm) {
      errorsKh.push(`ប្រវែង GPU (${gpu.gpuLengthMm}mm) វែងជាងទំហំ Case ដែលអាចដាក់បាន (${casePart.caseMaxGpuMm}mm)។`);
      errorsEn.push(`GPU length (${gpu.gpuLengthMm}mm) exceeds Case maximum capacity (${casePart.caseMaxGpuMm}mm).`);
    }
  }

  // 4. CPU Cooler vs Case Height
  if (cooler && casePart && cooler.coolerHeightMm && casePart.caseMaxCoolerMm) {
    if (cooler.coolerHeightMm > casePart.caseMaxCoolerMm) {
      errorsKh.push(`កម្ពស់ Cooler (${cooler.coolerHeightMm}mm) ខ្ពស់ជាង Case (${casePart.caseMaxCoolerMm}mm)។`);
      errorsEn.push(`Cooler height (${cooler.coolerHeightMm}mm) exceeds Case maximum clearance (${casePart.caseMaxCoolerMm}mm).`);
    }
  }

  // 5. Total Wattage Calculation with safety margin
  const baseTdp = (cpu?.tdpWatts || 65) + (gpu?.tdpWatts || 75) + 100; // 100W for motherboard, RAM, fans, SSDs
  const recommendedPsuWatts = Math.ceil((baseTdp * 1.25) / 50) * 50; // Rounded up to nearest 50W

  return {
    isValid: errorsKh.length === 0,
    errorsKh,
    errorsEn,
    recommendedPsuWatts
  };
}
```

---

## 6. Telegram Deep Linking & Webhook Notification Engine

Cambodian customers conduct transactions heavily on Telegram. The platform embeds two Telegram mechanics:

### 6.1 Direct Client-to-Sales Pre-filled Deep Links
Clicking **[សួរតម្លៃតាម Telegram]** generates a URI encoding the product details directly into the Telegram app:

```text
https://t.me/nvtechnology_kh?text=សួស្តី%20NV%20Technology%20ខ្ញុំចាប់អារម្មណ៍លើទំនិញនេះ៖%0A%0A📦%20ផលិតផល៖%20Lenovo%20ThinkPad%20E14%0A🔖%20SKU៖%20LNV-TP-E14-G5%0A💰%20តម្លៃ៖%20$789.00%0A🔗%20តំណភ្ជាប់៖%20https://nvtechnology.com.kh/products/lenovo-thinkpad-e14
```

### 6.2 Custom PC Build Telegram Export
The user builds a PC and clicks **[ផ្ញើ Build នេះទៅ Telegram]**:

```text
https://t.me/nvtechnology_kh?text=🖥️%20សំណើ%20Custom%20PC%20Build%20-%20NV%20Technology%0A━━━━━━━━━━━━━━━━━━━━%0A•%20CPU:%20Intel%20Core%20i5-14400F%0A•%20Motherboard:%20MSI%20B760M-A%20WIFI%0A•%20RAM:%20Corsair%20Vengeance%2032GB%20DDR5%0A•%20SSD:%20Samsung%20990%20EVO%201TB%20NVMe%0A•%20GPU:%20ASUS%20Dual%20RTX%204060%208GB%0A•%20PSU:%20Cooler%20Master%20650W%2080%2B%20Bronze%0A•%20Case:%20Montech%20Air%20100%20ARGB%0A━━━━━━━━━━━━━━━━━━━━%0A💵%20តម្លៃសរុបប្រហែល៖%20$945.00%0A⚡%20ថាមពលប៉ាន់ស្មាន៖%20450W%0A%0Aសូមជួយពិនិត្យស្តុក%20និងផ្តល់ការបញ្ជាក់តម្លៃ%20សូមអរគុណ!
```

### 6.3 Automated Backend Bot Dispatcher
When an order or RFQ is submitted through the web form, the backend dispatches an asynchronous Telegram alert to the internal sales channel:

```php
// app/Jobs/SendTelegramNotification.php
public function handle(): void
{
    $token = config('services.telegram.bot_token');
    $chatId = config('services.telegram.sales_chat_id');
    
    $message = "🚨 *ការបញ្ជាទិញថ្មី (New Web Order)* 🚨\n"
             . "លេខកូដ: `{$this->order->order_number}`\n"
             . "អតិថិជន: {$this->order->customer_name}\n"
             . "លេខទូរស័ព្ទ: `{$this->order->phone}`\n"
             . "ទីតាំង: {$this->order->delivery_province}\n"
             . "តម្លៃសរុប: *$" . number_format($this->order->total_usd, 2) . "*\n"
             . "ការទូទាត់: " . strtoupper($this->order->payment_method) . "\n\n"
             . "👉 [បើកមើលក្នុង Admin](" . config('app.url') . "/admin/orders/{$this->order->id})";

    Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'Markdown',
        'disable_web_page_preview' => true,
    ]);
}
```

---

## 7. REST API Endpoint Specification

### Public Endpoints (`/api/v1`)

| Method | Endpoint | Description | Query / Body Params |
|---|---|---|---|
| `GET` | `/categories` | List hierarchical categories | `lang=kh\|en`, `featured=1` |
| `GET` | `/products` | Filtered product catalog | `category_id`, `brand_id`, `part_type`, `pricing_type`, `min_price`, `max_price`, `sort`, `page` |
| `GET` | `/products/{slug}` | Product details & specs | `lang=kh\|en` |
| `GET` | `/products/search` | Bilingual search | `q=រ៉ោតទ័រ` (Resolves router, mikrotik, etc.) |
| `GET` | `/custom-pc/parts` | Fetch parts by category | `part_type=cpu\|motherboard\|...`, `socket=AM5`, `ram_type=DDR5` |
| `POST` | `/custom-pc/validate` | Validate full build | JSON body with `{ cpu_id, mb_id, ram_id, gpu_id, ... }` |
| `POST` | `/custom-pc/submit` | Save build & alert sales | JSON body with items, customer name, phone, telegram |
| `GET` | `/services` | List all IT services | `lang=kh\|en` |
| `POST` | `/services/request` | Submit solution request | `{ service_id, company, name, phone, scope_notes }` |
| `POST` | `/quotations` | Submit corporate RFQ | `{ client_name, company, phone, items: [{ product_id, qty }] }` |
| `POST` | `/orders` | Submit direct order | `{ customer_name, phone, address, items, payment_method }` |
| `GET` | `/orders/{order_number}/khqr` | Generate Bakong QR | Returns dynamic KHQR string & deep-link |

### Admin Endpoints (`/api/v1/admin` - Protected via Sanctum)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Admin credentials authentication |
| `GET` | `/dashboard/metrics` | Total products, low stock, today orders, pending quotes |
| `GET/POST` | `/products` | CRUD products with bilingual fields & specs |
| `PUT` | `/products/{id}/stock` | Quick stock adjustment |
| `GET/PUT` | `/orders/{id}` | Manage status (shipping, delivered, paid) |
| `GET/PUT` | `/quotations/{id}` | Review quote, adjust pricing, export PDF |
| `GET/PUT` | `/service-requests/{id}` | Triage corporate IT solution leads |

---

## 8. Admin Dashboard Layout & Features

### Dashboard Layout Structure (Bilingual Khmer/English)
```
┌────────────────────────────────────────────────────────────────────────┐
│  NV TECHNOLOGY BACKOFFICE           [ ភាសាខ្មែរ | English ]  Admin (Sok)│
├──────────────┬─────────────────────────────────────────────────────────┤
│ • ផ្ទាំងគ្រប់គ្រង   │  [ ផលិតផលសរុប: 1,250 ]   [ ជិតអស់ស្តុក: 25 ]           │
│   (Dashboard)│  [ ការបញ្ជាទិញថ្ងៃនេះ: 14 ]   [ សំណើសុំតម្លៃ (RFQ): 8 ]       │
│ • ផលិតផល       ├─────────────────────────────────────────────────────────┤
│   (Products) │  📦 ការបញ្ជាទិញថ្មីៗ (Recent Orders)                     │
│ • ប្រភេទ       │  - NVO-0104 | លោក ចាន់រិទ្ធ | $120.00 | KHQR [រួចរាល់]   │
│   (Categories│  - NVO-0105 | គង់ ពិសិដ្ឋ  | $850.00 | COD  [រង់ចាំពិនិត្យ]│
│ • ម៉ាក         ├─────────────────────────────────────────────────────────┤
│   (Brands)   │  🛠️ សំណើសុំតម្លៃ & IT Solutions (Pending Quotes)         │
│ • ស្តុកទំនិញ   │  - NVQ-0042 | Canadia Bank Br. | 24x PoE Switch + AP   │
│   (Inventory)│  - NVQ-0043 | CamTech School   | 15x Desktop + Printer  │
│ • RFQ / Quote│  - PC-0089  | Sothea Gaming    | Custom Build $1,420    │
│ • IT Services│                                                         │
│ • ការកំណត់    │                                                         │
└──────────────┴─────────────────────────────────────────────────────────┘
```

### Key Admin Modules
1. **Bilingual Content Editor**: Every product, category, and service has side-by-side Khmer and English input fields with rich WYSIWYG support.
2. **Instant Stock In/Out**: Barcode-friendly stock modifier allowing quick scanning of incoming inventory.
3. **RFQ-to-PDF Generator**: 1-click generation of professional Cambodian tax-compliant Quotations with NV Technology header, stamp area, bank account details (ABA / Wing), and terms.
4. **Custom PC Lead Triager**: Displays user-selected parts list, runs automated margin calculations, and generates an approved quote sent to the customer via Telegram.

---

## 9. Search Engine Optimization (SEO) for Cambodia

### URL & Canonical Architecture
* Primary Khmer canonicals: `https://nvtechnology.com.kh/kh/products/lenovo-thinkpad-e14`
* English alternate: `https://nvtechnology.com.kh/en/products/lenovo-thinkpad-e14`
* `<link rel="alternate" hreflang="km-KH" href="..." />`
* `<link rel="alternate" hreflang="en" href="..." />`

### High-Value Cambodian Search Clusters
```text
1. Laptop & PC Buying Intent:
   - "ទិញ Laptop នៅភ្នំពេញ" / "Laptop Cambodia"
   - "កុំព្យូទ័រ Desktop សម្រាប់ធ្វើការ" / "Office PC Cambodia"
   - "Custom PC Cambodia" / "តម្លើងកុំព្យូទ័រ Gaming"

2. Networking & Infrastructure:
   - "MikroTik Router Cambodia" / "រ៉ោតទ័រ MikroTik តម្លៃ"
   - "Cisco Switch Phnom Penh" / "Ruijie Wi-Fi Cambodia"
   - "ដំឡើងប្រព័ន្ធ Network ការិយាល័យ" / "Office Network Setup Cambodia"

3. Security & Corporate Solutions:
   - "Fortinet Firewall Cambodia" / "Sophos Firewall Phnom Penh"
   - "ម៉ាស៊ីនស្កេនមេដៃវត្តមានបុគ្គលិក" / "Fingerprint Attendance System Cambodia"
   - "ម៉ាស៊ីនព្រីន Canon Epson" / "Printer Inkjet Laser Cambodia"
```

### Schema.org JSON-LD Configuration
Embedded on every page:
* `LocalBusiness` (IT Solution & Computer Hardware Store in Phnom Penh, Cambodia with geo-coordinates, telephone, and opening hours).
* `Product` schema with USD price currency, stock availability, and brand entity links.

---

## 10. Step-by-Step Engineering Roadmap (Step 1 → Finished Site)

### Phase 1: Foundation & Scaffold (Days 1–3)
- [ ] Initialize Next.js 14 project with TypeScript, Tailwind CSS, and Lucide icons.
- [ ] Configure fonts: Google Fonts `Kantumruy Pro` (Khmer Headings), `Battambang` (Khmer Body), `Inter` (English/Numbers).
- [ ] Set up i18n routing wrapper (`/kh` and `/en`) with locale context and switcher.
- [ ] Setup Laravel 11 API with MySQL 8.0 `utf8mb4_unicode_520_ci`.
- [ ] Run migration scripts for all 13 database tables specified in Section 3.

### Phase 2: Catalog & Bilingual Search Engine (Days 4–7)
- [ ] Seed database with initial categories (Computers, PC Parts, Gaming, Network, Firewall, Printers, Attendance, Accessories) and top brands.
- [ ] Build product repository and API endpoints with fulltext search resolving both Khmer script and English equivalents (e.g. `រ៉ោតទ័រ` ↔ `Router`).
- [ ] Construct Product Catalog UI with dynamic facet filters (Brand, Specs, Price range, Stock status).
- [ ] Construct Product Detail Page (PDP) supporting the 3-Tier CTAs (`buy_now`, `request_quote`, `request_solution`).

### Phase 3: Custom PC Compatibility Engine (Days 8–11)
- [ ] Implement `pc_part_specifications` schema and seed CPU, Motherboard, RAM, GPU, Case, Cooler, PSU metadata.
- [ ] Develop the 8-step interactive builder UI in React.
- [ ] Implement live client-side validation engine (Socket pairing, DDR type check, GPU length vs Case clearance, Cooler height check).
- [ ] Build real-time wattage calculator and PSU recommendation formula.
- [ ] Implement "Export to Telegram" deep-link builder and "Submit Build Request" API.

### Phase 4: IT Services & Corporate Quotation (RFQ) System (Days 12–14)
- [ ] Develop IT Services directory showcasing the 7 core services with scope and SLA details.
- [ ] Implement Service Consultation request modal with automated Telegram alert.
- [ ] Build the Multi-Item Corporate RFQ Basket: allows corporate procurement officers to select items and request an official PDF quote.
- [ ] Build backend PDF generation service with NV Technology letterhead, bank details, and formal quotation terms.

### Phase 5: Retail Cart, KHQR & Telegram Alerts (Days 15–17)
- [ ] Implement retail shopping cart for Tier 1 accessories and components.
- [ ] Integrate Bakong KHQR generator for real-time mobile banking payment in USD.
- [ ] Implement Telegram Bot async worker to dispatch instant formatted order and quote alerts to internal sales channels.

### Phase 6: Admin Backoffice (Days 18–21)
- [ ] Develop bilingual Admin Dashboard (Next.js Admin or Laravel Filament).
- [ ] Implement Product/Category/Brand CRUD with bilingual inputs and image uploader to Cloudflare R2.
- [ ] Build RFQ management kanban board (Pending -> Reviewing -> Sent -> Won).
- [ ] Build Custom PC build manager and Stock adjustment table.

### Phase 7: Optimization, SEO & Production Deployment (Days 22–25)
- [ ] Implement LocalBusiness and Product JSON-LD structured schema.
- [ ] Configure Cloudflare edge caching, SSL, and asset minification.
- [ ] Conduct load testing and end-to-end user verification across mobile devices (Telegram in-app browser, Safari iOS, Chrome Android).
- [ ] Handover to NV Technology sales & inventory operations team.
