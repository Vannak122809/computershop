export type Language = 'kh' | 'en';

export type PricingType = 'buy_now' | 'request_quote' | 'request_solution';

export type CustomPCPartType = 
  | 'none'
  | 'cpu'
  | 'motherboard'
  | 'ram'
  | 'storage_ssd'
  | 'storage_hdd'
  | 'gpu'
  | 'psu'
  | 'case'
  | 'cooler';

export interface ProductSpec {
  group?: string;
  key_kh: string;
  key_en: string;
  value: string;
}

export interface PartCompatibilitySpec {
  socket?: string; // e.g. 'AM5', 'LGA1700', 'AM4'
  formFactor?: string; // 'ATX', 'Micro-ATX', 'Mini-ITX'
  ramType?: string; // 'DDR4', 'DDR5'
  ramSlots?: number;
  chipset?: string; // 'B650', 'Z790', 'B760'
  pcieGen?: string;
  tdpWatts?: number;
  psuRecommendedWatts?: number;
  coolerHeightMm?: number;
  caseMaxCoolerMm?: number;
  gpuLengthMm?: number;
  caseMaxGpuMm?: number;
}

export interface ProductSubView {
  id: string;
  url: string;
  label_kh: string;
  label_en: string;
  angle: 'front' | 'side' | 'rear' | 'detail' | 'box';
  badge?: string;
  description_kh?: string;
  description_en?: string;
}

export interface Product {
  id: string;
  sku: string;
  name_kh: string;
  name_en: string;
  slug: string;
  brand: string;
  category: string;
  category_slug: string;
  subcategory?: string;
  subcategory_slug?: string;
  pricing_type: PricingType;
  price_usd: number | null;
  sale_price_usd?: number | null;
  in_stock: boolean;
  stock_count: number;
  warranty_months: number;
  is_featured: boolean;
  is_deal?: boolean;
  part_type: CustomPCPartType;
  part_spec?: PartCompatibilitySpec;
  image: string;
  gallery?: string[];
  sub_views?: ProductSubView[];
  short_desc_kh: string;
  short_desc_en: string;
  specs: ProductSpec[];
}

export interface Category {
  id: string;
  slug: string;
  name_kh: string;
  name_en: string;
  icon: string;
  item_count: number;
  description_kh: string;
  description_en: string;
  subcategories: {
    name_kh: string;
    name_en: string;
    slug: string;
  }[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  featured: boolean;
  origin?: string;
}

export interface ITService {
  id: string;
  slug: string;
  title_kh: string;
  title_en: string;
  icon: string;
  short_desc_kh: string;
  short_desc_en: string;
  description_kh: string;
  description_en: string;
  deliverables_kh: string[];
  deliverables_en: string[];
  sla_kh: string;
  sla_en: string;
  suitable_for_kh: string;
  suitable_for_en: string;
}

export interface PrebuiltPC {
  id: string;
  slug: string;
  name_kh: string;
  name_en: string;
  tier: 'office' | 'gaming' | 'creator' | 'business';
  price_usd: number;
  summary_kh: string;
  summary_en: string;
  specs: {
    cpu: string;
    motherboard: string;
    ram: string;
    storage: string;
    gpu: string;
    psu: string;
    case: string;
    cooler: string;
  };
  recommended_for_kh: string;
  recommended_for_en: string;
  image: string;
}

export interface CustomPCSelection {
  cpu?: Product;
  motherboard?: Product;
  ram?: Product;
  storage_ssd?: Product;
  gpu?: Product;
  case?: Product;
  cooler?: Product;
  psu?: Product;
  storage_hdd?: Product;
  monitor?: Product;
  peripherals?: Product;
}

export interface SelectedProductOptions {
  ram?: string;
  storage?: string;
  color?: string;
  warranty?: string;
  accessory?: string;
  extraPriceUsd?: number;
}

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  options?: SelectedProductOptions;
}

export interface QuotationRequest {
  id: string;
  quote_code: string;
  client_name: string;
  company_name?: string;
  phone: string;
  telegram?: string;
  status: 'pending' | 'reviewing' | 'sent_to_customer' | 'accepted' | 'declined';
  items: {
    product_name: string;
    sku: string;
    quantity: number;
    estimated_price_usd: number | null;
  }[];
  notes?: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  telegram?: string;
  province: string;
  address: string;
  items: {
    product_name: string;
    sku: string;
    unit_price: number;
    quantity: number;
  }[];
  total_usd: number;
  payment_method: 'khqr' | 'cod' | 'transfer';
  status: 'pending' | 'processing' | 'delivered';
  created_at: string;
}

export type UserRole = 'super_admin' | 'inventory_manager' | 'sales_staff' | 'viewer';

export interface AdminUser {
  id: string;
  username: string;
  password?: string; // used internally for seed/auth
  name: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  last_login?: string;
  status: 'active' | 'suspended';
  created_at: string;
}
