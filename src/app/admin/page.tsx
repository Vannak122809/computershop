'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Product, ProductSubView, AdminUser, UserRole } from '@/lib/types';
import { categories } from '@/lib/data';
import { ROLE_CONFIG, hasPermission, INITIAL_ADMIN_USERS } from '@/lib/auth';
import AdminLoginModal from '@/components/AdminLoginModal';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  Cpu, 
  Search, 
  Plus,
  Edit3,
  Trash2,
  Copy,
  ExternalLink,
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
  Save,
  ArrowUpDown,
  DollarSign,
  Boxes,
  Users,
  ShieldCheck,
  LogOut,
  UserCheck,
  UserX,
  Lock,
  UserPlus,
  KeyRound,
  ShieldAlert,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Printer as PrintIcon,
  FileSpreadsheet,
  PieChart,
  Sparkles,
  RefreshCw,
  Percent,
  ClipboardList
} from 'lucide-react';

const COMMON_BRANDS = [
  'Lenovo', 'Dell', 'HP', 'ASUS', 'Apple', 'MikroTik', 
  'Ubiquiti', 'Cisco', 'Ruijie', 'Fortinet', 'Canon', 
  'Epson', 'Intel', 'AMD', 'Gigabyte', 'MSI', 'Corsair', 
  'Kingston', 'Samsung', 'DeepCool', 'Thermalright'
];

export default function AdminPage() {
  const { 
    lang, 
    setLang, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateProductStock 
  } = useStore();

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Admin Users List State (for Super Admin management)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'sales_staff' as UserRole,
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'quotes' | 'custom_pc' | 'users' | 'reports'>('products');
  
  // Reports & Analytics Sub-View State
  const [reportType, setReportType] = useState<'stock_health' | 'category_breakdown' | 'financial_valuation' | 'sales_pipeline'>('stock_health');
  const [reportCategoryFilter, setReportCategoryFilter] = useState<string>('all');
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState<'all' | 'in_stock' | 'low' | 'out'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'sku'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modal State for Products
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [activeModalTab, setActiveModalTab] = useState<'general' | 'pricing' | 'images' | 'specs'>('general');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Product Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name_en: '',
    name_kh: '',
    sku: '',
    slug: '',
    brand: 'Lenovo',
    category: 'Computers',
    category_slug: 'computers',
    subcategory: 'Laptop',
    subcategory_slug: 'laptop',
    pricing_type: 'buy_now',
    price_usd: 0,
    sale_price_usd: undefined,
    stock_count: 10,
    warranty_months: 12,
    image: '/images/products/lenovo-thinkpad-e14-gen-5.jpg',
    short_desc_en: '',
    short_desc_kh: '',
    is_deal: false,
    is_featured: false,
    part_type: 'none',
    specs: [],
    sub_views: []
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const subViewFileInputRef = useRef<HTMLInputElement>(null);
  const [targetSubViewIndex, setTargetSubViewIndex] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check persisted auth session, orders, quotes, and custom PC inquiries
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('nv_admin_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      const savedAdminUsers = localStorage.getItem('nv_admin_users_list');
      if (savedAdminUsers) {
        setAdminUsers(JSON.parse(savedAdminUsers));
      }

      const loadLiveStorefrontData = () => {
        try {
          const savedOrders = localStorage.getItem('nv_orders');
          if (savedOrders) {
            const parsed = JSON.parse(savedOrders);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setOrders((prev) => [...parsed, ...prev.filter((p) => !parsed.some((x: any) => x.id === p.id))]);
            }
          }

          const savedQuotes = localStorage.getItem('nv_quotes');
          if (savedQuotes) {
            const parsed = JSON.parse(savedQuotes);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setQuotes((prev) => [...parsed, ...prev.filter((p) => !parsed.some((x: any) => x.id === p.id))]);
            }
          }

          const savedPcReqs = localStorage.getItem('nv_custom_pc_requests');
          if (savedPcReqs) {
            const parsed = JSON.parse(savedPcReqs);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCustomPcRequests((prev) => [...parsed, ...prev.filter((p) => !parsed.some((x: any) => x.id === p.id))]);
            }
          }
        } catch (e) {}
      };

      loadLiveStorefrontData();

      window.addEventListener('nv_orders_updated', loadLiveStorefrontData);
      window.addEventListener('nv_quotes_updated', loadLiveStorefrontData);
      window.addEventListener('nv_pc_requests_updated', loadLiveStorefrontData);

      return () => {
        window.removeEventListener('nv_orders_updated', loadLiveStorefrontData);
        window.removeEventListener('nv_quotes_updated', loadLiveStorefrontData);
        window.removeEventListener('nv_pc_requests_updated', loadLiveStorefrontData);
      };
    } catch (e) {
      console.error('Session load error:', e);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('nv_admin_user', JSON.stringify(user));
    } catch (e) {}
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
    } catch (e) {}
    setCurrentUser(null);
    try {
      localStorage.removeItem('nv_admin_user');
    } catch (e) {}
    showToast('Logged out of admin session');
  };

  // User Management Handlers (Super Admin)
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.username || !newUserForm.password || !newUserForm.name) {
      alert('Please fill out all required fields');
      return;
    }

    if (adminUsers.some((u) => u.username.toLowerCase() === newUserForm.username.toLowerCase())) {
      alert('Username already exists');
      return;
    }

    const created: AdminUser = {
      id: `usr-${Date.now()}`,
      username: newUserForm.username.toLowerCase().trim(),
      password: newUserForm.password,
      name: newUserForm.name,
      email: newUserForm.email || `${newUserForm.username}@nvtechnology.com.kh`,
      role: newUserForm.role,
      avatar: newUserForm.name.slice(0, 2).toUpperCase(),
      status: 'active',
      last_login: 'Never',
      created_at: new Date().toISOString().split('T')[0],
    };

    const updated = [...adminUsers, created];
    setAdminUsers(updated);
    try {
      localStorage.setItem('nv_admin_users_list', JSON.stringify(updated));
    } catch (e) {}

    showToast(`Created user @${created.username} as ${ROLE_CONFIG[created.role].name_en}`);
    setIsAddUserModalOpen(false);
    setNewUserForm({
      username: '',
      password: '',
      name: '',
      email: '',
      role: 'sales_staff',
    });
  };

  const handleToggleUserStatus = (id: string) => {
    if (id === currentUser?.id) {
      alert('You cannot suspend your own active account!');
      return;
    }
    const updated = adminUsers.map((u) =>
      u.id === id ? { ...u, status: u.status === 'active' ? ('suspended' as const) : ('active' as const) } : u
    );
    setAdminUsers(updated);
    try {
      localStorage.setItem('nv_admin_users_list', JSON.stringify(updated));
    } catch (e) {}
    showToast('User status updated');
  };

  const handleChangeUserRole = (id: string, newRole: UserRole) => {
    const updated = adminUsers.map((u) => (u.id === id ? { ...u, role: newRole } : u));
    setAdminUsers(updated);
    try {
      localStorage.setItem('nv_admin_users_list', JSON.stringify(updated));
    } catch (e) {}
    showToast(`Role updated to ${ROLE_CONFIG[newRole].name_en}`);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (id === currentUser?.id) {
      alert('You cannot delete your own account!');
      return;
    }
    if (confirm(`Are you sure you want to delete user ${name}?`)) {
      const updated = adminUsers.filter((u) => u.id !== id);
      setAdminUsers(updated);
      try {
        localStorage.setItem('nv_admin_users_list', JSON.stringify(updated));
      } catch (e) {}
      showToast(`Deleted user ${name}`);
    }
  };

  // Orders State
  const [orders, setOrders] = useState([
    { id: 'NVO-1042', customer: 'ចាន់ សុវណ្ណារិទ្ធ', phone: '012 888 777', province: 'Phnom Penh', total: 729, status: 'paid', method: 'KHQR', date: 'Today 08:30' },
    { id: 'NVO-1043', customer: 'ម៉េង ពិសិដ្ឋ', phone: '098 123 456', province: 'Siem Reap', total: 115, status: 'processing', method: 'COD', date: 'Today 09:12' },
    { id: 'NVO-1044', customer: 'កែវ មុន្នី', phone: '088 555 444', province: 'Battambang', total: 145, status: 'pending', method: 'KHQR', date: 'Today 09:45' },
    { id: 'NVO-1045', customer: 'ហុង សុផាត', phone: '010 999 111', province: 'Phnom Penh', total: 1240, status: 'shipped', method: 'KHQR', date: 'Yesterday 16:20' },
  ]);

  // Quotes State
  const [quotes, setQuotes] = useState([
    { id: 'NVQ-041', company: 'Canadia Bank Plc (Head Office)', contact: 'លោក វុទ្ធី (IT Director)', phone: '012 334 455', items: '24x PoE Switch + 15x U6-Pro AP', status: 'reviewing', total: 4850 },
    { id: 'NVQ-042', company: 'CamTech University', contact: 'កញ្ញា សុភា (Procurement)', phone: '097 889 900', items: '30x Lenovo ThinkPad E14', status: 'sent', total: 21870 },
    { id: 'NVQ-043', company: 'Borey Peng Huoth Office', contact: 'លោក ពិសាល (Admin)', phone: '010 445 566', items: 'Fortinet FortiGate 60F + 10x AP', status: 'pending', total: 2890 },
  ]);

  // Custom PC State
  const [customPcRequests, setCustomPcRequests] = useState([
    { id: 'PC-089', customer: 'Sothea Gaming Studio', phone: '015 678 901', telegram: '@sothea_gamer', build: 'Core i5-14400F + RTX 4060 + 32GB DDR5', total: 899, wattage: 450, status: 'approved' },
    { id: 'PC-090', customer: 'Vannak 3D Render', phone: '098 765 432', telegram: '@vannak_cad', build: 'Ryzen 7 7800X3D + RTX 4070 SUPER + 32GB DDR5', total: 1650, wattage: 550, status: 'pending' },
  ]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = 
        p.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.name_kh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory = selectedCategory === 'all' || p.category_slug === selectedCategory;
      const matchBrand = selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase();

      let matchStock = true;
      if (selectedStockStatus === 'in_stock') matchStock = p.stock_count > 5;
      else if (selectedStockStatus === 'low') matchStock = p.stock_count > 0 && p.stock_count <= 5;
      else if (selectedStockStatus === 'out') matchStock = p.stock_count === 0;

      return matchSearch && matchCategory && matchBrand && matchStock;
    }).sort((a, b) => {
      let comp = 0;
      if (sortBy === 'name') comp = a.name_en.localeCompare(b.name_en);
      else if (sortBy === 'price') comp = (a.sale_price_usd ?? a.price_usd ?? 0) - (b.sale_price_usd ?? b.price_usd ?? 0);
      else if (sortBy === 'stock') comp = a.stock_count - b.stock_count;
      else if (sortBy === 'sku') comp = a.sku.localeCompare(b.sku);
      return sortOrder === 'asc' ? comp : -comp;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedStockStatus, sortBy, sortOrder]);

  // Inventory KPI calculations
  const totalStockCount = useMemo(() => products.reduce((acc, p) => acc + p.stock_count, 0), [products]);
  const lowStockCount = useMemo(() => products.filter((p) => p.stock_count > 0 && p.stock_count <= 5).length, [products]);
  const outOfStockCount = useMemo(() => products.filter((p) => p.stock_count === 0).length, [products]);
  const inventoryValuation = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.price_usd || 0) * p.stock_count, 0);
  }, [products]);

  // Detailed Report Statistics
  const categoryStats = useMemo(() => {
    const map: Record<string, { name: string; skuCount: number; units: number; valuation: number }> = {};
    products.forEach((p) => {
      const cat = p.category || 'Other';
      if (!map[cat]) {
        map[cat] = { name: cat, skuCount: 0, units: 0, valuation: 0 };
      }
      map[cat].skuCount += 1;
      map[cat].units += p.stock_count;
      map[cat].valuation += (p.sale_price_usd || p.price_usd || 0) * p.stock_count;
    });
    return Object.values(map).sort((a, b) => b.valuation - a.valuation);
  }, [products]);

  const brandStats = useMemo(() => {
    const map: Record<string, { brand: string; count: number; units: number; valuation: number }> = {};
    products.forEach((p) => {
      const b = p.brand || 'Other';
      if (!map[b]) {
        map[b] = { brand: b, count: 0, units: 0, valuation: 0 };
      }
      map[b].count += 1;
      map[b].units += p.stock_count;
      map[b].valuation += (p.sale_price_usd || p.price_usd || 0) * p.stock_count;
    });
    return Object.values(map).sort((a, b) => b.units - a.units);
  }, [products]);

  const topValuedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => ((b.sale_price_usd || b.price_usd || 0) * b.stock_count) - ((a.sale_price_usd || a.price_usd || 0) * a.stock_count))
      .slice(0, 5);
  }, [products]);

  const urgentReorderProducts = useMemo(() => {
    return products.filter((p) => p.stock_count <= 5);
  }, [products]);

  const activeDealsList = useMemo(() => {
    return products.filter((p) => p.is_deal || (p.sale_price_usd && p.price_usd && p.sale_price_usd < p.price_usd));
  }, [products]);

  const totalDiscountSavings = useMemo(() => {
    return activeDealsList.reduce((acc, p) => {
      const diff = (p.price_usd || 0) - (p.sale_price_usd || p.price_usd || 0);
      return acc + (diff > 0 ? diff * p.stock_count : 0);
    }, 0);
  }, [activeDealsList]);

  // Export CSV Function
  const handleExportCSV = () => {
    const headers = [
      'SKU',
      'Product Name (EN)',
      'Product Name (KH)',
      'Brand',
      'Category',
      'Subcategory',
      'Price USD',
      'Sale Price USD',
      'Stock Units',
      'Valuation USD',
      'Status'
    ];

    const rows = products.map((p) => {
      const val = ((p.sale_price_usd || p.price_usd || 0) * p.stock_count).toFixed(2);
      const status = p.stock_count === 0 ? 'Out of Stock' : p.stock_count <= 5 ? 'Low Stock' : 'In Stock';
      return [
        `"${p.sku}"`,
        `"${(p.name_en || '').replace(/"/g, '""')}"`,
        `"${(p.name_kh || '').replace(/"/g, '""')}"`,
        `"${p.brand}"`,
        `"${p.category}"`,
        `"${p.subcategory || ''}"`,
        p.price_usd || 0,
        p.sale_price_usd || '',
        p.stock_count,
        val,
        status
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NV_Technology_Inventory_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(lang === 'kh' ? 'បានទាញយកឯកសារ CSV រួចរាល់!' : 'Product CSV report downloaded successfully!');
  };

  const handlePrintReport = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Image Upload handler (with instant FileReader fallback for static hosting)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isSubView = false, subViewIndex?: number) => {
    if (!currentUser || !hasPermission(currentUser.role, 'canUploadImages')) {
      alert('Your user level does not have permission to upload files.');
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    const applyImage = (url: string) => {
      if (isSubView && typeof subViewIndex === 'number') {
        setFormData((prev) => {
          const nextSubViews = [...(prev.sub_views || [])];
          if (nextSubViews[subViewIndex]) {
            nextSubViews[subViewIndex] = { ...nextSubViews[subViewIndex], url };
          }
          return { ...prev, sub_views: nextSubViews };
        });
        showToast('Uploaded sub-view angle image successfully!');
      } else {
        setFormData((prev) => ({ ...prev, image: url }));
        showToast('Uploaded primary image successfully!');
      }
      setUploadingImage(false);
      if (e.target) e.target.value = '';
    };

    // Client-side fallback using Data URL
    const fallbackFileReader = () => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const resultUrl = loadEvent.target?.result as string;
        if (resultUrl) {
          applyImage(resultUrl);
        } else {
          setUploadingImage(false);
        }
      };
      reader.onerror = () => {
        alert('Failed to read image file');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    };

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!res.ok) {
        fallbackFileReader();
        return;
      }

      const data = await res.json();
      if (data.success && data.url) {
        applyImage(data.url);
      } else {
        fallbackFileReader();
      }
    } catch (err: any) {
      fallbackFileReader();
    }
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    if (!currentUser || !hasPermission(currentUser.role, 'canEditProducts')) {
      alert('Your user level does not have permission to add new products.');
      return;
    }

    setModalMode('create');
    setEditingId(null);
    setFormData({
      id: `prod-${Date.now()}`,
      name_en: '',
      name_kh: '',
      sku: `NV-${Math.floor(1000 + Math.random() * 9000)}`,
      slug: '',
      brand: 'Lenovo',
      category: 'Computers',
      category_slug: 'computers',
      subcategory: 'Laptop',
      subcategory_slug: 'laptop',
      pricing_type: 'buy_now',
      price_usd: 199,
      sale_price_usd: undefined,
      stock_count: 10,
      warranty_months: 12,
      image: '/images/products/lenovo-thinkpad-e14-gen-5.jpg',
      short_desc_en: '',
      short_desc_kh: '',
      is_deal: false,
      is_featured: false,
      part_type: 'none',
      specs: [
        { key_en: 'Processor', key_kh: 'ស៊ីភីយូ (CPU)', value: 'Intel Core i5' },
        { key_en: 'Memory', key_kh: 'រ៉េម (RAM)', value: '16GB DDR5' },
        { key_en: 'Storage', key_kh: 'អង្គផ្ទុកទិន្នន័យ (SSD)', value: '512GB PCIe NVMe' },
      ],
      sub_views: [
        { id: 'v1', url: '/images/products/lenovo-thinkpad-e14-gen-5.jpg', label_en: 'Front View', label_kh: 'ទិដ្ឋភាពពីមុខ', angle: 'front', badge: 'Front' },
        { id: 'v2', url: '/images/products/thinkpad-e14-ports.jpg', label_en: 'Side I/O Ports', label_kh: 'រន្ធតំណភ្ជាប់ចំហៀង', angle: 'side', badge: 'I/O Ports' },
        { id: 'v3', url: '/images/products/thinkpad-e14-keyboard.jpg', label_en: 'Keyboard Deck', label_kh: 'ក្ដារចុច & Trackpad', angle: 'detail', badge: 'Keyboard' },
      ]
    });
    setActiveModalTab('general');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (product: Product) => {
    if (!currentUser || !hasPermission(currentUser.role, 'canEditProducts')) {
      alert('Your user level has read-only access and cannot edit product details.');
      return;
    }

    setModalMode('edit');
    setEditingId(product.id);
    setFormData({
      ...product,
      specs: product.specs && product.specs.length > 0 ? [...product.specs] : [
        { key_en: 'Processor', key_kh: 'ស៊ីភីយូ (CPU)', value: '' },
      ],
      sub_views: product.sub_views && product.sub_views.length > 0 ? [...product.sub_views] : [
        { id: `${product.id}-v1`, url: product.image, label_en: 'Front View', label_kh: 'ទិដ្ឋភាពពីមុខ', angle: 'front', badge: 'Front' }
      ]
    });
    setActiveModalTab('general');
    setIsModalOpen(true);
  };

  // Duplicate Product
  const handleDuplicateProduct = (product: Product) => {
    if (!currentUser || !hasPermission(currentUser.role, 'canEditProducts')) {
      alert('Your user level cannot duplicate products.');
      return;
    }

    const cloned: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      sku: `${product.sku}-COPY`,
      slug: `${product.slug}-copy-${Math.floor(100 + Math.random() * 900)}`,
      name_en: `${product.name_en} (Copy)`,
      name_kh: `${product.name_kh} (ចម្លង)`,
      stock_count: 5,
    };
    addProduct(cloned);
    showToast(`Duplicated ${product.sku} successfully!`);
  };

  // Delete Product
  const handleDeleteProduct = (id: string, name: string) => {
    if (!currentUser || !hasPermission(currentUser.role, 'canDeleteProducts')) {
      alert('Only Level 1 (Super Admin) has authorization to delete products.');
      return;
    }

    if (confirm(`Are you sure you want to delete "${name}" from stock?`)) {
      deleteProduct(id);
      showToast(`Deleted "${name}"`);
    }
  };

  // Save Form (Create or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name_en || !formData.name_kh || !formData.sku) {
      alert('Please fill out Product Name (EN & KH) and SKU');
      return;
    }

    const slug = formData.slug || formData.name_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const finalProduct: Product = {
      id: editingId || formData.id || `prod-${Date.now()}`,
      sku: formData.sku,
      name_en: formData.name_en,
      name_kh: formData.name_kh,
      slug,
      brand: formData.brand || 'Other',
      category: formData.category || 'Computers',
      category_slug: formData.category_slug || 'computers',
      subcategory: formData.subcategory || 'Laptop',
      subcategory_slug: formData.subcategory_slug || 'laptop',
      pricing_type: formData.pricing_type || 'buy_now',
      price_usd: Number(formData.price_usd) || 0,
      sale_price_usd: formData.sale_price_usd ? Number(formData.sale_price_usd) : undefined,
      in_stock: Number(formData.stock_count) > 0,
      stock_count: Number(formData.stock_count) || 0,
      warranty_months: Number(formData.warranty_months) || 12,
      image: formData.image || '/images/products/lenovo-thinkpad-e14-gen-5.jpg',
      short_desc_en: formData.short_desc_en || '',
      short_desc_kh: formData.short_desc_kh || '',
      specs: formData.specs || [],
      sub_views: formData.sub_views || [],
      is_deal: !!formData.is_deal,
      is_featured: !!formData.is_featured,
      part_type: formData.part_type || 'none',
    };

    if (modalMode === 'create') {
      addProduct(finalProduct);
      showToast(`Added new product "${finalProduct.name_en}"!`);
    } else if (editingId) {
      updateProduct(editingId, finalProduct);
      showToast(`Updated product "${finalProduct.name_en}"!`);
    }

    setIsModalOpen(false);
  };

  // Specs Rows helper
  const handleAddSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...(prev.specs || []), { key_en: '', key_kh: '', value: '' }]
    }));
  };

  const handleRemoveSpecRow = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: (prev.specs || []).filter((_, i) => i !== idx)
    }));
  };

  const handleUpdateSpecRow = (idx: number, field: 'key_en' | 'key_kh' | 'value', val: string) => {
    setFormData((prev) => {
      const nextSpecs = [...(prev.specs || [])];
      nextSpecs[idx] = { ...nextSpecs[idx], [field]: val };
      return { ...prev, specs: nextSpecs };
    });
  };

  // Sub-views Rows helper
  const handleAddSubView = () => {
    setFormData((prev) => ({
      ...prev,
      sub_views: [
        ...(prev.sub_views || []),
        {
          id: `view-${Date.now()}`,
          url: prev.image || '',
          label_en: 'Additional Angle',
          label_kh: 'ទិដ្ឋភាពបន្ថែម',
          angle: 'side',
          badge: 'Angle',
        }
      ]
    }));
  };

  const handleRemoveSubView = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      sub_views: (prev.sub_views || []).filter((_, i) => i !== idx)
    }));
  };

  const handleUpdateSubView = (idx: number, field: keyof ProductSubView, val: any) => {
    setFormData((prev) => {
      const nextViews = [...(prev.sub_views || [])];
      nextViews[idx] = { ...nextViews[idx], [field]: val };
      return { ...prev, sub_views: nextViews };
    });
  };

  // If session not yet verified or user is not logged in -> Show Security Gateway Login
  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 animate-spin text-[#0187ca]" />
          <span>Verifying security clearance...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <AdminLoginModal onSuccess={handleLoginSuccess} lang={lang} />;
  }

  const userRoleConfig = ROLE_CONFIG[currentUser.role];
  const canStockEdit = hasPermission(currentUser.role, 'canManageStock');
  const canProductEdit = hasPermission(currentUser.role, 'canEditProducts');
  const canProductDelete = hasPermission(currentUser.role, 'canDeleteProducts');
  const canUserManage = hasPermission(currentUser.role, 'canManageUsers');
  const canFinanceView = hasPermission(currentUser.role, 'canViewFinance');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 font-khmer">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-sky-500/40 flex items-center space-x-3 modal-content-anim">
          <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Inputs for Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => handleFileUpload(e, false)} 
        accept="image/*" 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={subViewFileInputRef} 
        onChange={(e) => handleFileUpload(e, true, targetSubViewIndex ?? undefined)} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Admin Top Header with Logged-in User Profile & Level Badge */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0187ca] to-sky-600 text-white flex items-center justify-center font-black text-xl shadow-sm shrink-0">
            NV
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-800">
                {lang === 'kh' ? 'ផ្ទាំងគ្រប់គ្រង NV TECHNOLOGY' : 'NV Technology Admin Portal'}
              </h1>
              {/* User Level Badge */}
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-mono ${userRoleConfig.color}`}>
                {userRoleConfig.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Logged in as <strong className="text-slate-800 font-semibold">{currentUser.name}</strong> (@{currentUser.username})
              {' • '}
              <span className="text-[#0187ca] font-semibold">{lang === 'kh' ? userRoleConfig.name_kh : userRoleConfig.name_en}</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Session Management */}
        <div className="flex flex-wrap items-center gap-2.5">
          {canProductEdit && (
            <button
              onClick={handleOpenCreateModal}
              className="btn-tactile bg-[#0187ca] hover:bg-[#0073ad] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 flex items-center space-x-1.5 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'kh' ? '+ បន្ថែមទំនិញថ្មី' : '+ Add Product'}</span>
            </button>
          )}

          {/* User Logout Button */}
          <button
            onClick={handleLogout}
            className="btn-tactile bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 flex items-center space-x-1.5 transition"
            title="Log out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'kh' ? 'ចាកចេញ' : 'Logout'}</span>
          </button>

          {/* Language Switch */}
          <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setLang('kh')}
              className={`px-2 py-1 rounded-lg transition-all btn-tactile ${lang === 'kh' ? 'bg-[#0187ca] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🇰🇭 ខ្មែរ
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-lg transition-all btn-tactile ${lang === 'en' ? 'bg-[#0187ca] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Dashboard Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
            <span>{lang === 'kh' ? 'ទំនិញសរុប' : 'Total Catalog'}</span>
            <Boxes className="w-3.5 h-3.5 text-slate-400" />
          </span>
          <div className="text-2xl font-black text-slate-900">{products.length}</div>
          <span className="text-[10px] text-sky-600 font-semibold">{COMMON_BRANDS.length} Brands</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
            <span>{lang === 'kh' ? 'ចំនួនស្តុកសរុប' : 'Total Units'}</span>
            <Package className="w-3.5 h-3.5 text-emerald-500" />
          </span>
          <div className="text-2xl font-black text-emerald-600">{totalStockCount}</div>
          <span className="text-[10px] text-slate-500">In Warehouse</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
            <span>{lang === 'kh' ? 'ជិតអស់ស្តុក' : 'Low Stock (≤5)'}</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </span>
          <div className="text-2xl font-black text-amber-500">{lowStockCount}</div>
          <span className="text-[10px] text-amber-600 font-medium">Re-order required</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
            <span>{lang === 'kh' ? 'ដាច់ស្តុក' : 'Out of Stock'}</span>
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
          </span>
          <div className="text-2xl font-black text-rose-600">{outOfStockCount}</div>
          <span className="text-[10px] text-rose-600 font-medium">Needs replenish</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
            <span>{lang === 'kh' ? 'ការបញ្ជាទិញ' : 'Live Orders'}</span>
            <ShoppingCart className="w-3.5 h-3.5 text-[#0187ca]" />
          </span>
          <div className="text-2xl font-black text-[#0187ca]">{orders.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Active queue</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
            <span>{lang === 'kh' ? 'តម្លៃស្តុកសរុប' : 'Inventory Value'}</span>
            <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
          </span>
          <div className="text-2xl font-black text-indigo-700">
            {currentUser.role === 'super_admin' ? `$${inventoryValuation.toLocaleString()}` : '•••••••'}
          </div>
          <span className="text-[10px] text-indigo-600 font-medium">
            {currentUser.role === 'super_admin' ? 'Retail Valuation' : 'Level 1 Only'}
          </span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 space-x-2 overflow-x-auto pb-1 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 ${
            activeTab === 'products'
              ? 'bg-[#0187ca] text-white shadow-xs font-bold'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{lang === 'kh' ? 'គ្រប់គ្រងស្តុក & ទំនិញ (Products & Stock)' : 'Products & Stock'}</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 ${
            activeTab === 'overview'
              ? 'bg-[#0187ca] text-white shadow-xs font-bold'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>{lang === 'kh' ? 'សេចក្ដីសង្ខេប (Overview)' : 'Overview'}</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 ${
            activeTab === 'orders'
              ? 'bg-[#0187ca] text-white shadow-xs font-bold'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{lang === 'kh' ? 'ការបញ្ជាទិញ (Orders)' : 'Orders'}</span>
        </button>

        <button
          onClick={() => setActiveTab('quotes')}
          className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 ${
            activeTab === 'quotes'
              ? 'bg-[#0187ca] text-white shadow-xs font-bold'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{lang === 'kh' ? 'សម្រង់តម្លៃ B2B (RFQs)' : 'Quotes & RFQs'}</span>
        </button>

        <button
          onClick={() => setActiveTab('custom_pc')}
          className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 ${
            activeTab === 'custom_pc'
              ? 'bg-[#0187ca] text-white shadow-xs font-bold'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>{lang === 'kh' ? 'សំណើ Custom PC' : 'PC Builds'}</span>
        </button>

        {/* Reports & Analytics Tab */}
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 ${
            activeTab === 'reports'
              ? 'bg-emerald-600 text-white shadow-xs font-bold'
              : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{lang === 'kh' ? 'របាយការណ៍ & ស្ថិតិ (Reports)' : 'Reports & Analytics'}</span>
        </button>

        {/* User Management Tab (Super Admin Only) */}
        {canUserManage && (
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 ${
              activeTab === 'users'
                ? 'bg-purple-600 text-white shadow-xs font-bold'
                : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{lang === 'kh' ? 'គណនីបុគ្គលិក & កម្រិតសិទ្ធិ (Users & Roles)' : 'Staff & Roles'}</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* TAB: PRODUCTS & STOCK MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === 'products' && (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6 space-y-5 animate-slide-up">
          {/* Permission Alert for Lower Levels */}
          {!canStockEdit && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {lang === 'kh'
                  ? `កម្រិតគណនីរបស់អ្នក (${userRoleConfig.name_kh}) អាចត្រឹមតែពិនិត្យមើលចំនួនស្តុក (Read-Only) ប៉ុណ្ណោះ មិនអាចកែប្រែចំនួនស្តុក ឬលុបទំនិញបានទេ។`
                  : `Your role level (${userRoleConfig.name_en}) has Read-Only catalog access. Stock adjustment steppers and product deletion are restricted to Super Admin and Stock Managers.`
                }
              </span>
            </div>
          )}

          {/* Controls Bar: Search + Filters */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'kh' ? 'ស្វែងរកតាម SKU, ឈ្មោះ ឬម៉ាក (Brand)...' : 'Search by SKU, Product Name, or Brand...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0187ca] focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0187ca]"
              >
                <option value="all">{lang === 'kh' ? 'គ្រប់ប្រភេទ (All Categories)' : 'All Categories'}</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {lang === 'kh' ? c.name_kh : c.name_en}
                  </option>
                ))}
              </select>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0187ca]"
              >
                <option value="all">{lang === 'kh' ? 'គ្រប់ម៉ាក (All Brands)' : 'All Brands'}</option>
                {COMMON_BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              {/* Stock Status Filter */}
              <select
                value={selectedStockStatus}
                onChange={(e) => setSelectedStockStatus(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0187ca]"
              >
                <option value="all">{lang === 'kh' ? 'គ្រប់ស្ថានភាពស្តុក (All Stock)' : 'All Stock Status'}</option>
                <option value="in_stock">{lang === 'kh' ? 'មានក្នុងស្តុក (>5)' : 'In Stock (>5)'}</option>
                <option value="low">{lang === 'kh' ? 'ជិតអស់ស្តុក (1-5)' : 'Low Stock (1-5)'}</option>
                <option value="out">{lang === 'kh' ? 'អស់ពីស្តុក (0)' : 'Out of Stock (0)'}</option>
              </select>

              {/* Sort By */}
              <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <span className="text-[10px] text-slate-400 font-semibold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-slate-700 font-medium focus:outline-none text-xs"
                >
                  <option value="name">Name</option>
                  <option value="stock">Stock</option>
                  <option value="price">Price</option>
                  <option value="sku">SKU</option>
                </select>
                <button
                  type="button"
                  onClick={() => setSortOrder((prev) => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-1 text-slate-500 hover:text-slate-900 rounded"
                  title="Toggle order"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Counter Badge */}
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 font-mono text-[11px] font-bold">
                {filteredProducts.length} items
              </span>
            </div>
          </div>

          {/* Products Table with Quick Stock Adjustments & Full Action Tools */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                <tr>
                  <th className="py-3 px-3 w-14 text-center">Photo</th>
                  <th className="py-3 px-4">SKU / {lang === 'kh' ? 'ឈ្មោះផលិតផល' : 'Product Name'}</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price USD</th>
                  <th className="py-3 px-4 text-center">
                    {lang === 'kh' ? 'កែប្រែចំនួនស្តុក (Live Stock)' : 'Live Stock Count'}
                  </th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-2.5 px-3 text-center">
                      <div className="w-11 h-11 rounded-lg border border-slate-200 bg-white p-1 mx-auto flex items-center justify-center overflow-hidden">
                        <img 
                          src={p.image} 
                          alt={p.name_en} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                    </td>

                    {/* Name & SKU */}
                    <td className="py-2.5 px-4 max-w-xs sm:max-w-sm">
                      <div className="font-bold text-slate-900 line-clamp-1">
                        {lang === 'kh' ? p.name_kh : p.name_en}
                      </div>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="text-[10px] font-mono font-bold text-[#0187ca] bg-sky-50 px-1.5 py-0.2 rounded border border-sky-100">
                          {p.sku}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {p.brand}
                        </span>
                        {p.is_deal && (
                          <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                            DEAL
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-2.5 px-3 text-slate-500 capitalize">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60">
                        {p.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-2.5 px-3 font-mono font-black text-slate-900">
                      {p.pricing_type === 'buy_now' ? (
                        <div>
                          <span className="text-sm text-[#0187ca]">${p.sale_price_usd ?? p.price_usd}</span>
                          {p.sale_price_usd && (
                            <span className="text-[10px] text-slate-400 line-through block font-normal">
                              ${p.price_usd}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-amber-600 font-bold text-[11px]">RFQ Official</span>
                      )}
                    </td>

                    {/* Live Stock Stepper & Quick Adjustment */}
                    <td className="py-2.5 px-4 text-center">
                      <div className="inline-flex items-center space-x-1.5 border border-slate-200 bg-white rounded-lg p-1 shadow-2xs">
                        <button
                          type="button"
                          disabled={!canStockEdit || p.stock_count <= 0}
                          onClick={() => updateProductStock(p.id, -1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Decrease 1"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          disabled={!canStockEdit}
                          value={p.stock_count}
                          onChange={(e) => updateProductStock(p.id, parseInt(e.target.value) || 0, true)}
                          className="w-12 text-center font-mono font-black text-slate-900 text-xs focus:outline-none focus:bg-sky-50 rounded disabled:bg-slate-50 disabled:cursor-not-allowed"
                        />
                        <button
                          type="button"
                          disabled={!canStockEdit}
                          onClick={() => updateProductStock(p.id, 1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Increase 1"
                        >
                          +
                        </button>
                      </div>

                      {/* Quick stock shortcuts */}
                      {canStockEdit && (
                        <div className="flex items-center justify-center space-x-1 mt-1 text-[9px] font-mono text-slate-400">
                          <button 
                            onClick={() => updateProductStock(p.id, 0, true)} 
                            className="hover:text-rose-600 px-1 hover:underline"
                          >
                            0
                          </button>
                          <span>•</span>
                          <button 
                            onClick={() => updateProductStock(p.id, 10, true)} 
                            className="hover:text-[#0187ca] px-1 hover:underline"
                          >
                            10
                          </button>
                          <span>•</span>
                          <button 
                            onClick={() => updateProductStock(p.id, 25, true)} 
                            className="hover:text-[#0187ca] px-1 hover:underline"
                          >
                            25
                          </button>
                          <span>•</span>
                          <button 
                            onClick={() => updateProductStock(p.id, 50, true)} 
                            className="hover:text-[#0187ca] px-1 hover:underline"
                          >
                            50
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Stock Status Badge */}
                    <td className="py-2.5 px-3 text-center">
                      {p.stock_count > 5 ? (
                        <span className="inline-flex items-center text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          ● In Stock
                        </span>
                      ) : p.stock_count > 0 ? (
                        <span className="inline-flex items-center text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          ▲ Low ({p.stock_count})
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          ✕ Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Action Buttons: Edit, View, Duplicate, Delete */}
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {canProductEdit && (
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0187ca] hover:text-white text-slate-600 transition btn-tactile"
                            title="Edit Product Details & Sub-views"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {canProductEdit && (
                          <button
                            type="button"
                            onClick={() => handleDuplicateProduct(p)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition btn-tactile"
                            title="Duplicate Product"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition btn-tactile"
                          title="View on Store"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {canProductDelete && (
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id, p.name_en)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition btn-tactile"
                            title="Delete Product (Super Admin)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: USER MANAGEMENT & ACCESS LEVELS (SUPER ADMIN ONLY) */}
      {/* ========================================================================= */}
      {activeTab === 'users' && canUserManage && (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6 space-y-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>{lang === 'kh' ? 'គ្រប់គ្រងគណនីបុគ្គលិក & កម្រិតសិទ្ធិ (Staff & User Levels)' : 'Staff Accounts & Role Levels'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Configure user roles, permission clearances, and access levels for shop managers.
              </p>
            </div>

            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="btn-tactile bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{lang === 'kh' ? '+ បន្ថែមគណនីថ្មី' : '+ Add Staff Account'}</span>
            </button>
          </div>

          {/* User Levels Explanatory Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {Object.entries(ROLE_CONFIG).map(([roleKey, cfg]) => (
              <div key={roleKey} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${cfg.color}`}>
                    {cfg.badge}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">Tier {cfg.level}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-xs">{cfg.name_en}</h4>
                <ul className="text-[10px] text-slate-500 space-y-0.5 pt-1">
                  <li>• Stock Edit: {cfg.canManageStock ? '✅ Allowed' : '❌ Restricted'}</li>
                  <li>• Product Edit: {cfg.canEditProducts ? '✅ Allowed' : '❌ Restricted'}</li>
                  <li>• Product Delete: {cfg.canDeleteProducts ? '✅ Allowed' : '❌ Restricted'}</li>
                  <li>• Manage Staff: {cfg.canManageUsers ? '✅ Allowed' : '❌ Restricted'}</li>
                </ul>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Username / Email</th>
                  <th className="py-3 px-4">Role Clearance Level</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminUsers.map((u) => {
                  const rConfig = ROLE_CONFIG[u.role];
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                            {u.avatar || u.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{u.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {u.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-slate-800">@{u.username}</div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleChangeUserRole(u.id, e.target.value as UserRole)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${rConfig.color}`}
                        >
                          <option value="super_admin">Level 1: Super Admin</option>
                          <option value="inventory_manager">Level 2: Inventory Manager</option>
                          <option value="sales_staff">Level 3: Sales Staff</option>
                          <option value="viewer">Level 4: Auditor (Read-Only)</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                        {u.last_login || 'Never'}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleUserStatus(u.id)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition ${
                            u.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-rose-50 hover:text-rose-700'
                              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                          title="Click to toggle status"
                        >
                          {u.status === 'active' ? '● Active' : '✕ Suspended'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          disabled={u.id === currentUser.id}
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition disabled:opacity-20 disabled:cursor-not-allowed"
                          title={u.id === currentUser.id ? 'Cannot delete yourself' : 'Delete user'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: DASHBOARD OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          {/* Recent Orders Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4 text-[#0187ca]" />
                <span>{lang === 'kh' ? 'ការបញ្ជាទិញថ្មីៗ (Recent Direct Orders)' : 'Recent Customer Orders'}</span>
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-[#0187ca] font-semibold hover:underline"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {orders.map((ord) => (
                <div key={ord.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 flex items-center space-x-2">
                      <span>{ord.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {ord.method}
                      </span>
                    </div>
                    <div className="text-slate-500 mt-0.5">{ord.customer} • {ord.province}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-[#0187ca] text-sm">${ord.total}</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 border ${
                      ord.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {ord.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending RFQ & Corporate Leads Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>{lang === 'kh' ? 'សំណើសុំសម្រង់តម្លៃ B2B (Pending RFQs)' : 'Pending Corporate Quotes'}</span>
              </h3>
              <button
                onClick={() => setActiveTab('quotes')}
                className="text-xs text-amber-600 font-semibold hover:underline"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {quotes.map((q) => (
                <div key={q.id} className="py-3 flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <div className="font-bold text-slate-900 truncate">{q.company}</div>
                    <div className="text-slate-500 truncate mt-0.5">{q.contact} • {q.items}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-black text-slate-900 text-sm">${q.total.toLocaleString()}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono inline-block mt-0.5 border border-slate-200">
                      {q.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: ORDERS */}
      {/* ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              {lang === 'kh' ? 'បញ្ជីការបញ្ជាទិញអតិថិជន (Direct Customer Orders)' : 'Customer Orders'}
            </h3>
            <span className="text-xs text-slate-500">{orders.length} total orders</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {orders.map((ord) => (
              <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{ord.id}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{ord.date}</span>
                    <span className="px-2 py-0.5 rounded bg-sky-50 text-[#0187ca] text-[10px] font-mono font-bold border border-sky-100">
                      {ord.method}
                    </span>
                  </div>
                  <div className="text-slate-600 mt-1">
                    Customer: <strong className="text-slate-900">{ord.customer}</strong> • Tel: {ord.phone} • {ord.province}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-base font-black text-[#0187ca]">${ord.total}</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block border ${
                      ord.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {ord.status.toUpperCase()}
                    </span>
                  </div>

                  <select
                    disabled={!hasPermission(currentUser.role, 'canManageOrders')}
                    value={ord.status}
                    onChange={(e) => {
                      setOrders((prev) =>
                        prev.map((o) => (o.id === ord.id ? { ...o, status: e.target.value } : o))
                      );
                      showToast(`Order ${ord.id} status updated to ${e.target.value}`);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium disabled:opacity-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: RFQ QUOTATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'quotes' && (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              {lang === 'kh' ? 'សំណើសុំសម្រង់តម្លៃផ្លូវការ B2B (Corporate RFQs)' : 'Corporate Quotations'}
            </h3>
            <span className="text-xs text-slate-500">{quotes.length} total RFQs</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {quotes.map((q) => (
              <div key={q.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{q.id}</span>
                    <span className="text-slate-600 font-bold">{q.company}</span>
                  </div>
                  <div className="text-slate-500 mt-1">
                    Contact: {q.contact} • Tel: {q.phone}
                  </div>
                  <div className="text-slate-700 bg-slate-50 border border-slate-100 px-2 py-1 rounded mt-1 font-mono text-[11px]">
                    Requested: {q.items}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-base font-black text-slate-900">${q.total.toLocaleString()}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono inline-block border">
                      {q.status}
                    </span>
                  </div>

                  <button
                    onClick={() => showToast(`Generated official PDF quotation for ${q.company}`)}
                    className="btn-tactile bg-slate-100 hover:bg-[#0187ca] hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: CUSTOM PC BUILDS */}
      {/* ========================================================================= */}
      {activeTab === 'custom_pc' && (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              {lang === 'kh' ? 'សំណើ PC Build តាមតម្រូវការ (Custom PC Builds)' : 'Custom PC Build Inquiries'}
            </h3>
            <span className="text-xs text-slate-500">{customPcRequests.length} build inquiries</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {customPcRequests.map((req) => (
              <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{req.id}</span>
                    <span className="text-[#0187ca] font-mono">{req.telegram}</span>
                  </div>
                  <div className="text-slate-600 mt-1 font-semibold">
                    Client: {req.customer} • Tel: {req.phone}
                  </div>
                  <div className="text-slate-800 bg-sky-50/60 border border-sky-100 px-3 py-1.5 rounded-lg mt-1 font-mono text-[11px]">
                    Specs: {req.build} (Est. {req.wattage}W)
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-base font-black text-[#0187ca]">${req.total}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={() => showToast(`Replied to ${req.telegram} via Telegram direct`)}
                    className="btn-tactile bg-[#0187ca] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                  >
                    Reply Telegram
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: REPORTS & ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === 'reports' && (
        <div className="space-y-6 animate-slide-up">
          {/* Top Header Card */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                    {lang === 'kh' ? 'របាយការណ៍ & ការវិភាគទិន្នន័យ (Reports & Analytics)' : 'Product & Inventory Reports'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'kh'
                      ? 'ទិន្នន័យស្តុកទំនិញជាក់ស្តែង ដើមទុន តម្លៃសរុប ការវិភាគម៉ាកទំនិញ និងទិន្នន័យលក់ដូរប្រចាំហាង'
                      : 'Live warehouse valuation, stock health diagnostics, brand performance, and catalog distribution analytics.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions: Export CSV & Print */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="btn-tactile bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-2 transition cursor-pointer"
                title="Download full catalog CSV"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{lang === 'kh' ? 'ទាញយក CSV' : 'Export CSV'}</span>
              </button>

              <button
                onClick={handlePrintReport}
                className="btn-tactile bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 flex items-center space-x-2 transition cursor-pointer"
                title="Print or save as PDF"
              >
                <PrintIcon className="w-4 h-4" />
                <span>{lang === 'kh' ? 'បោះពុម្ពរបាយការណ៍' : 'Print Report'}</span>
              </button>
            </div>
          </div>

          {/* Analytical Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Portfolio Valuation */}
            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">{lang === 'kh' ? 'តម្លៃស្តុកសរុប (Valuation)' : 'Catalog Valuation'}</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {canFinanceView ? `$${inventoryValuation.toLocaleString()}` : '••••••••'}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{canFinanceView ? 'Active Retail Capital' : 'Level 1 Clearance Required'}</span>
              </div>
            </div>

            {/* Units on Hand */}
            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">{lang === 'kh' ? 'ចំនួនគ្រឿងក្នុងស្តុក' : 'Total Units on Hand'}</span>
                <Package className="w-4 h-4 text-sky-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-sky-600">
                {totalStockCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500">
                Across {products.length} active SKUs
              </div>
            </div>

            {/* In-Stock Rate / Health Score */}
            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">{lang === 'kh' ? 'អត្រាស្តុកល្អ (Health)' : 'Stock Health Rate'}</span>
                <Percent className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-purple-600">
                {products.length > 0 ? (((products.length - lowStockCount - outOfStockCount) / products.length) * 100).toFixed(1) : 0}%
              </div>
              <div className="text-[11px] text-purple-700 font-medium">
                {products.length - lowStockCount - outOfStockCount} Optimal SKUs
              </div>
            </div>

            {/* Action Needed: Low Stock Alerts */}
            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">{lang === 'kh' ? 'ទំនិញត្រូវការកុម្ម៉ង់ថែម' : 'Replenish Attention'}</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-600">
                {lowStockCount + outOfStockCount}
              </div>
              <div className="text-[11px] text-amber-700 font-medium">
                {outOfStockCount} Out of Stock • {lowStockCount} Low Stock
              </div>
            </div>
          </div>

          {/* Sub-Report Navigation Tabs */}
          <div className="flex border-b border-slate-200 space-x-2 overflow-x-auto pb-1 text-xs font-bold">
            <button
              onClick={() => setReportType('stock_health')}
              className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 cursor-pointer ${
                reportType === 'stock_health'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'kh' ? '១. សុខភាពស្តុក & ការកុម្ម៉ង់ថែម' : '1. Stock Health & Replenishment'}</span>
            </button>

            <button
              onClick={() => setReportType('category_breakdown')}
              className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 cursor-pointer ${
                reportType === 'category_breakdown'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <PieChart className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'kh' ? '២. ការវិភាគតាមប្រភេទ & ម៉ាក' : '2. Category & Brand Distribution'}</span>
            </button>

            <button
              onClick={() => setReportType('financial_valuation')}
              className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 cursor-pointer ${
                reportType === 'financial_valuation'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'kh' ? '៣. ដើមទុន & ទំនិញតម្លៃខ្ពស់' : '3. Valuation & Capital Assets'}</span>
            </button>

            <button
              onClick={() => setReportType('sales_pipeline')}
              className={`px-4 py-2.5 rounded-xl transition-all btn-tactile flex items-center space-x-2 cursor-pointer ${
                reportType === 'sales_pipeline'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'kh' ? '៤. ការលក់ & B2B Pipeline' : '4. Sales & B2B Pipeline'}</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* SUB-REPORT 1: STOCK HEALTH & REPLENISHMENT */}
          {/* ========================================================================= */}
          {reportType === 'stock_health' && (
            <div className="space-y-6">
              {/* Visual Stock Health Bar */}
              <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {lang === 'kh' ? 'ស្ថានភាពតុល្យភាពស្តុកទំនិញ (Warehouse Inventory Health)' : 'Warehouse Inventory Health Proportion'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Distribution of optimal, low stock, and depleted SKUs
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-xs font-semibold">
                    <span className="flex items-center space-x-1.5 text-emerald-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      <span>In Stock ({products.length - lowStockCount - outOfStockCount})</span>
                    </span>
                    <span className="flex items-center space-x-1.5 text-amber-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      <span>Low Stock ({lowStockCount})</span>
                    </span>
                    <span className="flex items-center space-x-1.5 text-rose-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      <span>Out of Stock ({outOfStockCount})</span>
                    </span>
                  </div>
                </div>

                {/* Multi-segment Progress Bar */}
                <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden">
                  <div 
                    style={{ width: `${products.length > 0 ? (((products.length - lowStockCount - outOfStockCount) / products.length) * 100) : 0}%` }}
                    className="bg-emerald-500 transition-all duration-500" 
                    title="In Stock"
                  />
                  <div 
                    style={{ width: `${products.length > 0 ? ((lowStockCount / products.length) * 100) : 0}%` }}
                    className="bg-amber-500 transition-all duration-500" 
                    title="Low Stock"
                  />
                  <div 
                    style={{ width: `${products.length > 0 ? ((outOfStockCount / products.length) * 100) : 0}%` }}
                    className="bg-rose-500 transition-all duration-500" 
                    title="Out of Stock"
                  />
                </div>
              </div>

              {/* Replenishment Alert Action Table */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>{lang === 'kh' ? 'តារាងទំនិញត្រូវការកុម្ម៉ង់ថែមបន្ទាន់ (Urgent Replenishment List)' : 'Urgent Replenishment Attention List'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Products with 5 units or fewer remaining. Fast replenishment recommended.
                    </p>
                  </div>
                  
                  {/* Category Filter */}
                  <select
                    value={reportCategoryFilter}
                    onChange={(e) => setReportCategoryFilter(e.target.value)}
                    className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 font-semibold focus:outline-none focus:border-[#0187ca]"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name_en}</option>
                    ))}
                  </select>
                </div>

                {urgentReorderProducts.filter((p) => reportCategoryFilter === 'all' || p.category_slug === reportCategoryFilter).length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-800">
                      {lang === 'kh' ? 'ស្តុកទាំងអស់មានតុល្យភាពល្អ!' : 'All Catalog Stock Levels Are Optimal!'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      No products currently meet the urgent low-stock or out-of-stock threshold.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-semibold border-y border-slate-200 uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-2.5 px-3">Product</th>
                          <th className="py-2.5 px-3">SKU / Brand</th>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Current Stock</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Suggested Re-Order</th>
                          <th className="py-2.5 px-3 text-right">Quick Restock</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {urgentReorderProducts
                          .filter((p) => reportCategoryFilter === 'all' || p.category_slug === reportCategoryFilter)
                          .map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50/80 transition">
                              <td className="py-3 px-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                                    <img src={p.image} alt={p.name_en} className="w-full h-full object-contain" />
                                  </div>
                                  <div className="min-w-0 max-w-xs">
                                    <span className="font-bold text-slate-900 truncate block">
                                      {lang === 'kh' ? p.name_kh : p.name_en}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <div className="font-mono text-[11px] font-semibold text-slate-700">{p.sku}</div>
                                <div className="text-[10px] text-slate-500">{p.brand}</div>
                              </td>
                              <td className="py-3 px-3 text-slate-600 font-medium">
                                {p.category}
                              </td>
                              <td className="py-3 px-3">
                                <span className={`text-sm font-black ${p.stock_count === 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                                  {p.stock_count} units
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  p.stock_count === 0
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                  {p.stock_count === 0 ? 'OUT OF STOCK' : 'LOW STOCK'}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="text-slate-600 font-mono text-[11px] font-semibold">
                                  +{p.stock_count === 0 ? 25 : 10} Units Recommended
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right">
                                {canStockEdit ? (
                                  <button
                                    onClick={() => {
                                      updateProductStock(p.id, 10);
                                      showToast(`Restocked +10 units for ${p.name_en}`);
                                    }}
                                    className="btn-tactile bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-xs transition"
                                  >
                                    +10 Restock
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-slate-400 italic">Read-Only</span>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-REPORT 2: CATEGORY & BRAND DISTRIBUTION */}
          {/* ========================================================================= */}
          {reportType === 'category_breakdown' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Category Breakdown Table (8 cols) */}
              <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {lang === 'kh' ? 'ការវិភាគតាមប្រភេទផលិតផល (Category Breakdown)' : 'Category Volume & Valuation'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Detailed unit count, SKU diversity, and retail valuation per category.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-y border-slate-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3 text-center">SKUs</th>
                        <th className="py-2.5 px-3 text-center">Units on Hand</th>
                        <th className="py-2.5 px-3">Valuation</th>
                        <th className="py-2.5 px-3">Catalog Share</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {categoryStats.map((c) => {
                        const sharePercent = totalStockCount > 0 ? ((c.units / totalStockCount) * 100).toFixed(1) : 0;
                        return (
                          <tr key={c.name} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 px-3 font-bold text-slate-800">
                              {c.name}
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-slate-600 font-semibold">
                              {c.skuCount}
                            </td>
                            <td className="py-3 px-3 text-center font-black text-sky-600">
                              {c.units}
                            </td>
                            <td className="py-3 px-3 font-bold text-emerald-700 font-mono">
                              {canFinanceView ? `$${Math.round(c.valuation).toLocaleString()}` : '••••••••'}
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    style={{ width: `${sharePercent}%` }}
                                    className="h-full bg-[#0187ca] rounded-full"
                                  />
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">{sharePercent}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Brand Share Card (4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'kh' ? 'ម៉ាកទំនិញលេចធ្លោ (Top Brands)' : 'Top Brands by Volume'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Brand representation across warehouse
                  </p>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {brandStats.slice(0, 8).map((b, idx) => (
                    <div key={b.brand} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 text-[11px] font-mono font-bold text-slate-400">#{idx + 1}</span>
                        <div>
                          <div className="font-bold text-slate-800">{b.brand}</div>
                          <div className="text-[10px] text-slate-500">{b.count} SKUs</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-slate-900">{b.units} units</div>
                        <span className="text-[10px] text-emerald-600 font-semibold font-mono">
                          {canFinanceView ? `$${Math.round(b.valuation).toLocaleString()}` : '••••••'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-REPORT 3: FINANCIAL VALUATION & CAPITAL ASSETS */}
          {/* ========================================================================= */}
          {reportType === 'financial_valuation' && (
            <div className="space-y-6">
              {!canFinanceView ? (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-2">
                  <Lock className="w-8 h-8 text-amber-600 mx-auto" />
                  <h3 className="text-sm font-bold text-amber-900">
                    {lang === 'kh' ? 'សិទ្ធិមើលទិន្នន័យហិរញ្ញវត្ថុត្រូវបានកំណត់' : 'Financial Valuation Restricted'}
                  </h3>
                  <p className="text-xs text-amber-700 max-w-md mx-auto">
                    Full catalog monetary figures and capital asset breakdowns require Level 1 (Super Admin) security clearance.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Top 5 Capital Heavyweights Table */}
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
                    <div className="pb-3 border-b border-slate-100">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'kh' ? 'ទំនិញមានតម្លៃទុនស្តុកខ្ពស់បំផុត Top 5 (Capital Heavyweights)' : 'Top 5 Capital-Intensive Inventory Drivers'}</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Products holding the highest accumulated dollar value in current warehouse stock.
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-y border-slate-200 uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="py-2.5 px-3 text-center">Rank</th>
                            <th className="py-2.5 px-3">Product Name</th>
                            <th className="py-2.5 px-3">SKU</th>
                            <th className="py-2.5 px-3 text-center">Unit Price</th>
                            <th className="py-2.5 px-3 text-center">Stock Units</th>
                            <th className="py-2.5 px-3 text-right">Total Tied Capital</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {topValuedProducts.map((p, idx) => {
                            const unitPrice = p.sale_price_usd || p.price_usd || 0;
                            const totalVal = unitPrice * p.stock_count;
                            return (
                              <tr key={p.id} className="hover:bg-slate-50/80 transition">
                                <td className="py-3 px-3 text-center font-bold text-slate-400 font-mono">
                                  #{idx + 1}
                                </td>
                                <td className="py-3 px-3 font-bold text-slate-900">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                                      <img src={p.image} alt={p.name_en} className="w-full h-full object-contain" />
                                    </div>
                                    <span>{lang === 'kh' ? p.name_kh : p.name_en}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 font-mono text-slate-600 font-semibold">{p.sku}</td>
                                <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">${unitPrice}</td>
                                <td className="py-3 px-3 text-center font-black text-sky-600">{p.stock_count}</td>
                                <td className="py-3 px-3 text-right font-black text-emerald-600 font-mono text-sm">
                                  ${Math.round(totalVal).toLocaleString()}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Deals & Discount Margin Analytics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-1">
                      <span className="text-xs text-slate-500 font-semibold">Active Promo SKUs</span>
                      <div className="text-2xl font-black text-rose-600">{activeDealsList.length} Items</div>
                      <span className="text-[11px] text-rose-700">Currently offering sale prices</span>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-1">
                      <span className="text-xs text-slate-500 font-semibold">Total Discount Savings</span>
                      <div className="text-2xl font-black text-emerald-600">${Math.round(totalDiscountSavings).toLocaleString()}</div>
                      <span className="text-[11px] text-emerald-700">Accumulated client markdown value</span>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-1">
                      <span className="text-xs text-slate-500 font-semibold">Average Unit Valuation</span>
                      <div className="text-2xl font-black text-[#0187ca]">
                        ${totalStockCount > 0 ? (inventoryValuation / totalStockCount).toFixed(0) : 0}
                      </div>
                      <span className="text-[11px] text-slate-500">Average capital tied per physical unit</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-REPORT 4: SALES & B2B PIPELINE */}
          {/* ========================================================================= */}
          {reportType === 'sales_pipeline' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Direct Customer Orders Overview */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4 text-[#0187ca]" />
                    <span>{lang === 'kh' ? 'សេចក្តីសង្ខេបការបញ្ជាទិញ (Orders Overview)' : 'Direct Customer Orders Overview'}</span>
                  </h3>
                  <span className="text-xs text-[#0187ca] font-mono font-bold">{orders.length} active orders</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium">Direct Order Volume</span>
                    <div className="text-xl font-black text-slate-900 mt-1">
                      ${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400">Total transaction value</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium">Payment Fulfillment</span>
                    <div className="text-xl font-black text-emerald-600 mt-1">
                      {orders.filter((o) => o.status === 'paid').length} Paid
                    </div>
                    <span className="text-[10px] text-amber-600">{orders.filter((o) => o.status === 'pending').length} Pending Payment</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {orders.map((ord) => (
                    <div key={ord.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800">{ord.id}</span>
                        <span className="text-slate-500 ml-2">({ord.customer})</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-[#0187ca] mr-2">${ord.total}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          ord.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {ord.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* B2B RFQs & Custom PC Pipeline */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>{lang === 'kh' ? 'បំពង់សម្រង់តម្លៃ B2B (Corporate RFQ Pipeline)' : 'Corporate RFQ Pipeline'}</span>
                  </h3>
                  <span className="text-xs text-purple-600 font-mono font-bold">{quotes.length} RFQs</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                    <span className="text-[11px] text-purple-700 font-medium">RFQ Pipeline Value</span>
                    <div className="text-xl font-black text-purple-900 mt-1">
                      ${quotes.reduce((acc, q) => acc + q.total, 0).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-purple-600">Pending B2B contracts</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium">Custom PC Builds</span>
                    <div className="text-xl font-black text-sky-700 mt-1">
                      ${customPcRequests.reduce((acc, r) => acc + r.total, 0).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-sky-600">{customPcRequests.length} Custom Build Inquiries</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {quotes.map((q) => (
                    <div key={q.id} className="py-2.5 flex items-center justify-between">
                      <div className="min-w-0 pr-2 truncate">
                        <span className="font-bold text-slate-800">{q.company}</span>
                        <div className="text-[10px] text-slate-500 truncate">{q.items}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-black text-slate-900 mr-2">${q.total.toLocaleString()}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                          {q.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD ADMIN USER (SUPER ADMIN ONLY) */}
      {/* ========================================================================= */}
      {isAddUserModalOpen && canUserManage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs modal-backdrop-anim"
          onClick={() => setIsAddUserModalOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl modal-content-anim space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Add Staff Account</h3>
              </div>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Username *</label>
                <input
                  type="text"
                  required
                  value={newUserForm.username}
                  onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                  placeholder="e.g. sokha_stock"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Initial Password *</label>
                <input
                  type="password"
                  required
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="e.g. Sokha Heng"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="sokha@nvtechnology.com.kh"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Clearance Level *</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as UserRole })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                >
                  <option value="super_admin">👑 Level 1: Super Admin (Full Control)</option>
                  <option value="inventory_manager">📦 Level 2: Inventory Manager (Stock & Edits)</option>
                  <option value="sales_staff">💼 Level 3: Sales Staff (Orders & RFQs)</option>
                  <option value="viewer">👁️ Level 4: Auditor (Read-Only)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg font-bold"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL PRODUCT CREATE / EDIT MODAL WITH IMAGE UPLOAD & MULTI-ANGLE VIEWS */}
      {/* ========================================================================= */}
      {isModalOpen && canProductEdit && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs modal-backdrop-anim overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl modal-content-anim my-8 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0187ca] flex items-center justify-center">
                  {modalMode === 'create' ? <Plus className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {modalMode === 'create' 
                      ? (lang === 'kh' ? 'បន្ថែមទំនិញថ្មីទៅក្នុងស្តុក (Add Product)' : 'Add New Product to Catalog')
                      : (lang === 'kh' ? 'កែប្រែទំនិញ (Edit Product)' : 'Edit Product Details')
                    }
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {formData.sku || 'SKU will be generated'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex border-b border-slate-200 px-6 space-x-4 text-xs font-semibold shrink-0 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setActiveModalTab('general')}
                className={`py-3 border-b-2 transition ${
                  activeModalTab === 'general' ? 'border-[#0187ca] text-[#0187ca] font-bold' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                General Info
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('pricing')}
                className={`py-3 border-b-2 transition ${
                  activeModalTab === 'pricing' ? 'border-[#0187ca] text-[#0187ca] font-bold' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Pricing & Stock
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('images')}
                className={`py-3 border-b-2 transition ${
                  activeModalTab === 'images' ? 'border-[#0187ca] text-[#0187ca] font-bold' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Uploads & Sub-Views
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('specs')}
                className={`py-3 border-b-2 transition ${
                  activeModalTab === 'specs' ? 'border-[#0187ca] text-[#0187ca] font-bold' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Specifications ({formData.specs?.length || 0})
              </button>
            </div>

            {/* Form Content Body (Scrollable) */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              
              {/* TAB: GENERAL */}
              {activeModalTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Product Name (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name_en || ''}
                        onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                        placeholder="e.g. Lenovo ThinkPad E14 Gen 5"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        ឈ្មោះផលិតផល (Khmer) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name_kh || ''}
                        onChange={(e) => setFormData({ ...formData, name_kh: e.target.value })}
                        placeholder="e.g. កុំព្យូទ័រយួរដៃ Lenovo ThinkPad E14"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white font-khmer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">SKU Code *</label>
                      <input
                        type="text"
                        required
                        value={formData.sku || ''}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="e.g. LNV-TP-E14-G5"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono font-bold focus:outline-none focus:border-[#0187ca] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Brand</label>
                      <select
                        value={formData.brand || 'Lenovo'}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white"
                      >
                        {COMMON_BRANDS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Category</label>
                      <select
                        value={formData.category_slug || 'computers'}
                        onChange={(e) => {
                          const cat = categories.find((c) => c.slug === e.target.value);
                          setFormData({ 
                            ...formData, 
                            category_slug: e.target.value,
                            category: cat?.name_en || 'Computers',
                          });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.name_en}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Short Description (English)</label>
                    <textarea
                      rows={2}
                      value={formData.short_desc_en || ''}
                      onChange={(e) => setFormData({ ...formData, short_desc_en: e.target.value })}
                      placeholder="Brief highlight description for product card..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">ការពិពណ៌នាសង្ខេប (Khmer)</label>
                    <textarea
                      rows={2}
                      value={formData.short_desc_kh || ''}
                      onChange={(e) => setFormData({ ...formData, short_desc_kh: e.target.value })}
                      placeholder="ការរៀបរាប់សង្ខេបជាភាសាខ្មែរ..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0187ca] focus:bg-white font-khmer"
                    />
                  </div>
                </div>
              )}

              {/* TAB: PRICING & STOCK */}
              {activeModalTab === 'pricing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Pricing Type</label>
                      <select
                        value={formData.pricing_type || 'buy_now'}
                        onChange={(e) => setFormData({ ...formData, pricing_type: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0187ca]"
                      >
                        <option value="buy_now">Buy Now (Standard Retail)</option>
                        <option value="rfq">RFQ Only (Official Quotation)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Regular Price (USD) *</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={formData.price_usd || 0}
                        onChange={(e) => setFormData({ ...formData, price_usd: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0187ca]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Sale / Deal Price (USD)</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={formData.sale_price_usd ?? ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          sale_price_usd: e.target.value ? parseFloat(e.target.value) : undefined 
                        })}
                        placeholder="Leave blank if not on sale"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-[#0187ca] focus:outline-none focus:border-[#0187ca]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Stock Quantity (In Warehouse) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        required
                        value={formData.stock_count || 0}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          stock_count: parseInt(e.target.value) || 0,
                          in_stock: (parseInt(e.target.value) || 0) > 0,
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-black text-slate-900 text-sm focus:outline-none focus:border-[#0187ca]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Official Warranty (Months)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.warranty_months || 12}
                        onChange={(e) => setFormData({ ...formData, warranty_months: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-800 focus:outline-none focus:border-[#0187ca]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-6 border-t border-slate-100">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formData.is_deal}
                        onChange={(e) => setFormData({ ...formData, is_deal: e.target.checked })}
                        className="rounded text-[#0187ca] focus:ring-sky-500 w-4 h-4"
                      />
                      <span className="font-semibold text-slate-700">Tag as Flash Deal / Hot Deal</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="rounded text-[#0187ca] focus:ring-sky-500 w-4 h-4"
                      />
                      <span className="font-semibold text-slate-700">Feature on Homepage</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB: UPLOAD IMAGES & MULTI-ANGLE SUB-VIEWS */}
              {activeModalTab === 'images' && (
                <div className="space-y-6">
                  {/* Primary Photo Uploader */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="font-bold text-slate-800 text-xs block">
                      Primary Display Image (Main Catalog Photo) *
                    </span>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Image Preview Box */}
                      <div className="w-24 h-24 rounded-xl border border-slate-200 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-xs">
                        <img 
                          src={formData.image || '/images/products/lenovo-thinkpad-e14-gen-5.jpg'} 
                          alt="Main Preview" 
                          className="w-full h-full object-contain" 
                        />
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="btn-tactile bg-slate-900 hover:bg-[#0187ca] text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition disabled:opacity-50"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                          </button>
                          <span className="text-[11px] text-slate-400">or enter image path / URL below</span>
                        </div>
                        <input
                          type="text"
                          value={formData.image || ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="/images/products/..."
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono text-[11px] text-slate-800 focus:outline-none focus:border-[#0187ca]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multi-Angle Sub-Views List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">
                          Multi-Angle Product Sub-Views (Gallery & Perspective Angles)
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          Configure distinct photos for front, 3D angle profile, I/O ports, and internal board.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSubView}
                        className="btn-tactile bg-sky-50 text-[#0187ca] hover:bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Angle View</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {formData.sub_views?.map((view, idx) => (
                        <div key={view.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                          {/* Mini Preview */}
                          <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                            <img src={view.url || formData.image} alt={view.label_en} className="w-full h-full object-contain" />
                          </div>

                          {/* Angle & Labels Inputs */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1 text-[11px]">
                            <select
                              value={view.angle}
                              onChange={(e) => handleUpdateSubView(idx, 'angle', e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1 font-semibold text-slate-700"
                            >
                              <option value="front">Front View</option>
                              <option value="side">Side / 3D Angle</option>
                              <option value="rear">Rear / Ports</option>
                              <option value="detail">Detail / PCB</option>
                            </select>

                            <input
                              type="text"
                              value={view.label_en}
                              onChange={(e) => handleUpdateSubView(idx, 'label_en', e.target.value)}
                              placeholder="Label (EN)"
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800"
                            />

                            <input
                              type="text"
                              value={view.label_kh}
                              onChange={(e) => handleUpdateSubView(idx, 'label_kh', e.target.value)}
                              placeholder="Label (KH)"
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-khmer"
                            />

                            <div className="flex items-center space-x-1">
                              <input
                                type="text"
                                value={view.url}
                                onChange={(e) => handleUpdateSubView(idx, 'url', e.target.value)}
                                placeholder="Image URL..."
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-mono text-[10px] flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setTargetSubViewIndex(idx);
                                  subViewFileInputRef.current?.click();
                                }}
                                className="p-1 rounded bg-slate-200 hover:bg-[#0187ca] hover:text-white"
                                title="Upload file for this angle"
                              >
                                <Upload className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Delete angle */}
                          <button
                            type="button"
                            onClick={() => handleRemoveSubView(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition"
                            title="Remove angle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SPECIFICATIONS */}
              {activeModalTab === 'specs' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">Technical Specifications Table</h4>
                      <p className="text-[10px] text-slate-400">Add technical key-values shown on the product detail page.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSpecRow}
                      className="btn-tactile bg-sky-50 text-[#0187ca] hover:bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Spec Row</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.specs?.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                        <input
                          type="text"
                          value={spec.key_en}
                          onChange={(e) => handleUpdateSpecRow(idx, 'key_en', e.target.value)}
                          placeholder="Spec Name (EN) e.g. RAM"
                          className="w-1/4 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                        />
                        <input
                          type="text"
                          value={spec.key_kh || ''}
                          onChange={(e) => handleUpdateSpecRow(idx, 'key_kh', e.target.value)}
                          placeholder="ឈ្មោះ Spec (KH)"
                          className="w-1/4 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-khmer"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleUpdateSpecRow(idx, 'value', e.target.value)}
                          placeholder="Value e.g. 16GB DDR5 4800MHz"
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecRow(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile bg-[#0187ca] hover:bg-[#0073ad] text-white px-5 py-2 rounded-xl font-bold text-xs shadow-md shadow-sky-500/20 flex items-center space-x-1.5 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{modalMode === 'create' ? 'Create Product' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
