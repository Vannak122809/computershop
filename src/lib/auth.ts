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
  // Level 1: Super Admin / Owner
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
    id: 'usr-test-lvl1',
    username: 'test_admin',
    password: 'test123',
    name: 'Test Super Admin (Level 1)',
    email: 'test_admin@nvtechnology.com.kh',
    role: 'super_admin',
    avatar: 'TA',
    last_login: 'Just now',
    status: 'active',
    created_at: '2026-01-10',
  },
  {
    id: 'usr-test-1',
    username: 'test1',
    password: 'test123',
    name: 'Test Admin L1 (Quick Test)',
    email: 'test1@nvtechnology.com.kh',
    role: 'super_admin',
    avatar: 'T1',
    last_login: 'Just now',
    status: 'active',
    created_at: '2026-01-10',
  },

  // Level 2: Inventory / Stock Manager
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
    id: 'usr-test-lvl2',
    username: 'test_inventory',
    password: 'test123',
    name: 'Test Stock Manager (Level 2)',
    email: 'test_inventory@nvtechnology.com.kh',
    role: 'inventory_manager',
    avatar: 'TI',
    last_login: '1 hour ago',
    status: 'active',
    created_at: '2026-02-15',
  },
  {
    id: 'usr-test-2',
    username: 'test2',
    password: 'test123',
    name: 'Test Inventory L2 (Quick Test)',
    email: 'test2@nvtechnology.com.kh',
    role: 'inventory_manager',
    avatar: 'T2',
    last_login: '1 hour ago',
    status: 'active',
    created_at: '2026-02-15',
  },

  // Level 3: Sales & Support Staff
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
    id: 'usr-test-lvl3',
    username: 'test_sales',
    password: 'test123',
    name: 'Test Sales Staff (Level 3)',
    email: 'test_sales@nvtechnology.com.kh',
    role: 'sales_staff',
    avatar: 'TS',
    last_login: 'Yesterday',
    status: 'active',
    created_at: '2026-03-01',
  },
  {
    id: 'usr-test-3',
    username: 'test3',
    password: 'test123',
    name: 'Test Sales L3 (Quick Test)',
    email: 'test3@nvtechnology.com.kh',
    role: 'sales_staff',
    avatar: 'T3',
    last_login: 'Yesterday',
    status: 'active',
    created_at: '2026-03-01',
  },

  // Level 4: Auditor / Viewer
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
  {
    id: 'usr-test-lvl4',
    username: 'test_viewer',
    password: 'test123',
    name: 'Test Auditor Viewer (Level 4)',
    email: 'test_viewer@nvtechnology.com.kh',
    role: 'viewer',
    avatar: 'TV',
    last_login: '3 days ago',
    status: 'active',
    created_at: '2026-03-20',
  },
  {
    id: 'usr-test-4',
    username: 'test4',
    password: 'test123',
    name: 'Test Viewer L4 (Quick Test)',
    email: 'test4@nvtechnology.com.kh',
    role: 'viewer',
    avatar: 'T4',
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

export function authenticateLocalAdmin(username: string, password: string): AdminUser | null {
  let userList = [...INITIAL_ADMIN_USERS];
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('nv_admin_users_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingUsernames = new Set(parsed.map((u: any) => u.username?.toLowerCase()));
          const missingInitials = INITIAL_ADMIN_USERS.filter(
            (u) => !existingUsernames.has(u.username.toLowerCase())
          );
          userList = [...parsed, ...missingInitials];
        }
      }
    } catch (e) {}
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  const found = userList.find(
    (u) => u.username.toLowerCase() === cleanUser && u.password === cleanPass
  );

  if (!found || found.status === 'suspended') return null;
  const { password: _, ...safeUser } = found;
  return safeUser as AdminUser;
}

