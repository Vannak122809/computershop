import { AdminUser, UserRole } from './types';

export interface RolePermissions {
  name_en: string;
  name_kh: string;
  badge: string;
  level: number;
  color: string;
  canManageStock: boolean;
  canEditProducts: boolean;
  canUploadImages: boolean;
  canDeleteProducts: boolean;
  canManageUsers: boolean;
  canManageOrders: boolean;
  canManageQuotes: boolean;
  canViewFinance: boolean;
}

export const ROLE_CONFIG: Record<UserRole, RolePermissions> = {
  super_admin: {
    name_en: 'Super Admin / Owner',
    name_kh: 'អ្នកគ្រប់គ្រងជាន់ខ្ពស់ (Super Admin)',
    badge: 'Level 1: Full Control',
    level: 1,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    canManageStock: true,
    canEditProducts: true,
    canUploadImages: true,
    canDeleteProducts: true,
    canManageUsers: true,
    canManageOrders: true,
    canManageQuotes: true,
    canViewFinance: true,
  },
  inventory_manager: {
    name_en: 'Inventory / Stock Manager',
    name_kh: 'អ្នកគ្រប់គ្រងស្តុកទំនិញ (Stock Manager)',
    badge: 'Level 2: Warehouse',
    level: 2,
    color: 'bg-sky-100 text-sky-700 border-sky-200',
    canManageStock: true,
    canEditProducts: true,
    canUploadImages: true,
    canDeleteProducts: false,
    canManageUsers: false,
    canManageOrders: false,
    canManageQuotes: false,
    canViewFinance: false,
  },
  sales_staff: {
    name_en: 'Sales & Support Staff',
    name_kh: 'បុគ្គលិកផ្នែកលក់ (Sales Staff)',
    badge: 'Level 3: Sales Orders',
    level: 3,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    canManageStock: false, // read only stock
    canEditProducts: false,
    canUploadImages: false,
    canDeleteProducts: false,
    canManageUsers: false,
    canManageOrders: true,
    canManageQuotes: true,
    canViewFinance: false,
  },
  viewer: {
    name_en: 'Auditor / Viewer',
    name_kh: 'អ្នកមើលត្រួតពិនិត្យ (Auditor / Read-Only)',
    badge: 'Level 4: Read Only',
    level: 4,
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    canManageStock: false,
    canEditProducts: false,
    canUploadImages: false,
    canDeleteProducts: false,
    canManageUsers: false,
    canManageOrders: false,
    canManageQuotes: false,
    canViewFinance: false,
  },
};

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-admin-01',
    username: 'admin',
    password: 'admin123',
    name: 'ចាន់ សុវណ្ណារិទ្ធ (Sovannarith Chan)',
    email: 'admin@nvtechnology.com.kh',
    role: 'super_admin',
    avatar: 'SC',
    last_login: 'Just now',
    status: 'active',
    created_at: '2026-01-10',
  },
  {
    id: 'usr-inv-02',
    username: 'inventory',
    password: 'manager123',
    name: 'ហេង សុខា (Sokha Heng - Stock)',
    email: 'stock@nvtechnology.com.kh',
    role: 'inventory_manager',
    avatar: 'SH',
    last_login: '2 hours ago',
    status: 'active',
    created_at: '2026-02-15',
  },
  {
    id: 'usr-sales-03',
    username: 'sales',
    password: 'sales123',
    name: 'វង្ស ដារ៉ា (Dara Vong - B2B Sales)',
    email: 'sales@nvtechnology.com.kh',
    role: 'sales_staff',
    avatar: 'DV',
    last_login: 'Yesterday',
    status: 'active',
    created_at: '2026-03-01',
  },
  {
    id: 'usr-audit-04',
    username: 'auditor',
    password: 'audit123',
    name: 'មាស បុប្ផា (Bopha Meas - Auditor)',
    email: 'audit@nvtechnology.com.kh',
    role: 'viewer',
    avatar: 'BM',
    last_login: '3 days ago',
    status: 'active',
    created_at: '2026-03-20',
  },
];

export function hasPermission(role: UserRole, permission: keyof RolePermissions): boolean {
  const config = ROLE_CONFIG[role];
  if (!config) return false;
  return !!config[permission];
}
