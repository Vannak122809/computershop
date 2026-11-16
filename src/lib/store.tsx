'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Product, CartItem, CustomPCSelection, ITService, SelectedProductOptions } from './types';
import { translations } from './translations';
import { products as defaultProducts } from './data';

interface StoreContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['kh'];
  
  // Products Management
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, deltaOrExact: number, isExact?: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: SelectedProductOptions) => void;
  removeFromCart: (cartItemIdOrProductId: string) => void;
  updateCartQuantity: (cartItemIdOrProductId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Custom PC Builder
  customPC: CustomPCSelection;
  setCustomPCPart: (partType: keyof CustomPCSelection, product: Product) => void;
  removeCustomPCPart: (partType: keyof CustomPCSelection) => void;
  clearCustomPC: () => void;
  loadPrebuilt: (prebuilt: any) => void;

  // Modals
  khqrModal: { isOpen: boolean; orderData?: any };
  openKhqrModal: (orderData: any) => void;
  closeKhqrModal: () => void;

  quoteModal: { isOpen: boolean; product?: Product };
  openQuoteModal: (product?: Product) => void;
  closeQuoteModal: () => void;

  solutionModal: { isOpen: boolean; service?: ITService };
  openSolutionModal: (service?: ITService) => void;
  closeSolutionModal: () => void;

  quickViewModal: { isOpen: boolean; product?: Product };
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('kh');

  // Products State with localStorage persistence
  const [productsList, setProductsList] = useState<Product[]>(defaultProducts);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Custom PC State
  const [customPC, setCustomPC] = useState<CustomPCSelection>({});

  // Modals
  const [khqrModal, setKhqrModal] = useState<{ isOpen: boolean; orderData?: any }>({ isOpen: false });
  const [quoteModal, setQuoteModal] = useState<{ isOpen: boolean; product?: Product }>({ isOpen: false });
  const [solutionModal, setSolutionModal] = useState<{ isOpen: boolean; service?: ITService }>({ isOpen: false });
  const [quickViewModal, setQuickViewModal] = useState<{ isOpen: boolean; product?: Product }>({ isOpen: false });

  // Load from local storage & sync with server API
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('nv_lang') as Language;
      if (savedLang && (savedLang === 'kh' || savedLang === 'en')) {
        setLangState(savedLang);
      }

      const savedProducts = localStorage.getItem('nv_admin_products');
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProductsList(parsed);
        }
      }

      const savedCart = localStorage.getItem('nv_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedPC = localStorage.getItem('nv_custom_pc');
      if (savedPC) {
        setCustomPC(JSON.parse(savedPC));
      }
    } catch (e) {
      console.error('Storage load error:', e);
    }

    // Always fetch latest products from server backend API
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          setProductsList(data.data);
          try {
            localStorage.setItem('nv_admin_products', JSON.stringify(data.data));
          } catch (e) {}
        }
      })
      .catch((err) => {
        console.warn('Could not sync with /api/products:', err);
      });

    // Cross-tab and window synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nv_admin_products' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setProductsList(parsed);
          }
        } catch (err) {}
      }
    };

    const handleCustomSync = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setProductsList(e.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('nv_products_updated', handleCustomSync as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('nv_products_updated', handleCustomSync as EventListener);
    };
  }, []);

  const saveProducts = (updated: Product[]) => {
    setProductsList(updated);
    try {
      localStorage.setItem('nv_admin_products', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('nv_products_updated', { detail: updated }));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  };

  const addProduct = (product: Product) => {
    const updated = [product, ...productsList.filter((p) => p.id !== product.id)];
    saveProducts(updated);
    // Send to backend API
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success' && data.data) {
          setProductsList((prev) => [data.data, ...prev.filter((p) => p.id !== data.data.id && p.id !== product.id)]);
        }
      })
      .catch((err) => console.error('Failed to persist product to API:', err));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = productsList.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveProducts(updated);
    // Send to backend API
    fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success' && data.data) {
          setProductsList((prev) =>
            prev.map((item) => (item.id === id ? data.data : item))
          );
        }
      })
      .catch((err) => console.error('Failed to update product via API:', err));
  };

  const deleteProduct = (id: string) => {
    const updated = productsList.filter((p) => p.id !== id);
    saveProducts(updated);
    // Send to backend API
    fetch(`/api/products?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }).catch((err) => console.error('Failed to delete product via API:', err));
  };

  const updateProductStock = (id: string, deltaOrExact: number, isExact = false) => {
    const updated = productsList.map((p) => {
      if (p.id !== id) return p;
      const newStock = isExact ? Math.max(0, deltaOrExact) : Math.max(0, p.stock_count + deltaOrExact);
      return {
        ...p,
        stock_count: newStock,
        in_stock: newStock > 0,
      };
    });
    saveProducts(updated);
    fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        ...(isExact ? { stock_count: Math.max(0, deltaOrExact) } : { delta: deltaOrExact }),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success' && data.data) {
          setProductsList((prev) =>
            prev.map((item) => (item.id === id ? data.data : item))
          );
        }
      })
      .catch((err) => console.error('Failed to update stock via API:', err));
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('nv_lang', newLang);
    } catch (e) {}
  };

  const getCartItemId = (product: Product, options?: SelectedProductOptions) => {
    if (!options) return product.id;
    return `${product.id}-${options.ram || ''}-${options.storage || ''}-${options.color || ''}-${options.warranty || ''}-${options.accessory || ''}`;
  };

  const addToCart = (product: Product, quantity = 1, options?: SelectedProductOptions) => {
    const itemId = getCartItemId(product, options);
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => (item.id || item.product.id) === itemId);
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { id: itemId, product, quantity, options }];
      }
      try {
        localStorage.setItem('nv_cart', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const removeFromCart = (cartItemIdOrProductId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => (item.id || item.product.id) !== cartItemIdOrProductId);
      try {
        localStorage.setItem('nv_cart', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateCartQuantity = (cartItemIdOrProductId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemIdOrProductId);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) =>
        (item.id || item.product.id) === cartItemIdOrProductId ? { ...item, quantity } : item
      );
      try {
        localStorage.setItem('nv_cart', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('nv_cart');
    } catch (e) {}
  };

  const cartTotal = cart.reduce((sum, item) => {
    const basePrice = item.product.sale_price_usd ?? item.product.price_usd ?? 0;
    const unitPrice = basePrice + (item.options?.extraPriceUsd || 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Custom PC Helpers
  const setCustomPCPart = (partType: keyof CustomPCSelection, product: Product) => {
    setCustomPC((prev) => {
      const updated = { ...prev, [partType]: product };
      try {
        localStorage.setItem('nv_custom_pc', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const removeCustomPCPart = (partType: keyof CustomPCSelection) => {
    setCustomPC((prev) => {
      const updated = { ...prev };
      delete updated[partType];
      try {
        localStorage.setItem('nv_custom_pc', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearCustomPC = () => {
    setCustomPC({});
    try {
      localStorage.removeItem('nv_custom_pc');
    } catch (e) {}
  };

  const loadPrebuilt = (prebuiltParts: CustomPCSelection) => {
    setCustomPC(prebuiltParts);
    try {
      localStorage.setItem('nv_custom_pc', JSON.stringify(prebuiltParts));
    } catch (e) {}
  };

  const openKhqrModal = (orderData: any) => setKhqrModal({ isOpen: true, orderData });
  const closeKhqrModal = () => setKhqrModal({ isOpen: false });

  const openQuoteModal = (product?: Product) => setQuoteModal({ isOpen: true, product });
  const closeQuoteModal = () => setQuoteModal({ isOpen: false });

  const openSolutionModal = (service?: ITService) => setSolutionModal({ isOpen: true, service });
  const closeSolutionModal = () => setSolutionModal({ isOpen: false });

  const openQuickView = (product: Product) => setQuickViewModal({ isOpen: true, product });
  const closeQuickView = () => setQuickViewModal({ isOpen: false });

  const t = translations[lang];

  return (
    <StoreContext.Provider
      value={{
        lang,
        setLang,
        t,
        products: productsList,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        customPC,
        setCustomPCPart,
        removeCustomPCPart,
        clearCustomPC,
        loadPrebuilt,
        khqrModal,
        openKhqrModal,
        closeKhqrModal,
        quoteModal,
        openQuoteModal,
        closeQuoteModal,
        solutionModal,
        openSolutionModal,
        closeSolutionModal,
        quickViewModal,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
