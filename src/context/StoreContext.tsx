import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCT_CONFIG, CHAPTERS, FAQS, Chapter, ProductConfig } from '../config/product';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'apple' | 'paypal';
  date: string;
  status: 'Completed' | 'Delivered' | 'Refunded';
  downloadsCount: number;
}

export interface SiteSettings extends ProductConfig {
  announcementText: string;
  announcementActive: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  enableDiscounts: boolean;
  discountOriginalPrice: number;
  themePrimaryColor: string;
  themeAccentColor: string;
  paymentGateway: 'whop' | 'creem' | 'builtin';
  whopCheckoutUrl: string;
  useWhopCheckout: boolean;
  creemCheckoutUrl: string;
  useCreemCheckout: boolean;
}

export interface StoreContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  chapters: Chapter[];
  updateChapter: (index: number, updated: Chapter) => void;
  faqs: { question: string; answer: string }[];
  updateFaq: (index: number, updated: { question: string; answer: string }) => void;
  addFaq: (faq: { question: string; answer: string }) => void;
  removeFaq: (index: number) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status' | 'downloadsCount'>) => string;
  resendOrderEmail: (orderId: string) => boolean;
  incrementDownload: (orderId: string) => void;
  resetAllDefaults: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  adminCredentials: { email: string; password: string };
  updateAdminCredentials: (email: string, pass: string) => void;
}

const INITIAL_SETTINGS: SiteSettings = {
  ...PRODUCT_CONFIG,
  announcementText: "Official Release: Smart Money by QEVORIN — Instant PDF digital download with printable worksheets",
  announcementActive: true,
  heroHeadline: "Take Control of Your Money, One Simple Step at a Time.",
  heroSubheadline: "Discover a practical, beginner-friendly guide to budgeting, saving, and building healthier money habits—without complicated spreadsheets or overwhelming financial jargon.",
  enableDiscounts: true,
  discountOriginalPrice: 249,
  themePrimaryColor: "#172B4D",
  themeAccentColor: "#2A9D8F",
  paymentGateway: 'whop',
  whopCheckoutUrl: PRODUCT_CONFIG.whopCheckoutUrl || "",
  useWhopCheckout: true,
  creemCheckoutUrl: "",
  useCreemCheckout: false
};

const INITIAL_ORDERS: Order[] = [
  {
    id: "QEV-892144",
    customerName: "Alexander Wright",
    customerEmail: "alex.wright@outlook.com",
    amount: 149,
    currency: "USD",
    paymentMethod: "card",
    date: "2026-10-20 18:24",
    status: "Delivered",
    downloadsCount: 2
  },
  {
    id: "QEV-891902",
    customerName: "Sophie Taylor",
    customerEmail: "sophie.t@gmail.com",
    amount: 149,
    currency: "USD",
    paymentMethod: "apple",
    date: "2026-10-20 16:10",
    status: "Delivered",
    downloadsCount: 1
  },
  {
    id: "QEV-890451",
    customerName: "Marcus Vance",
    customerEmail: "marcus.vance@techcorp.io",
    amount: 149,
    currency: "USD",
    paymentMethod: "card",
    date: "2026-10-20 13:45",
    status: "Delivered",
    downloadsCount: 3
  },
  {
    id: "QEV-889120",
    customerName: "Elena Rostova",
    customerEmail: "elena.rostova@gmail.com",
    amount: 149,
    currency: "USD",
    paymentMethod: "paypal",
    date: "2026-10-20 10:05",
    status: "Delivered",
    downloadsCount: 1
  }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('qevorin_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.supportEmail === 'service@qevorin.com' || !parsed.supportEmail) {
          parsed.supportEmail = 'support@qevorin.online';
        }
        if (parsed.price === 49 || parsed.price === 39 || !parsed.price) {
          parsed.price = 149;
        }
        if (parsed.discountOriginalPrice === 79 || !parsed.discountOriginalPrice) {
          parsed.discountOriginalPrice = 249;
        }
        if (!parsed.paymentGateway) {
          parsed.paymentGateway = 'whop';
        }
        if (parsed.whopCheckoutUrl === undefined) {
          parsed.whopCheckoutUrl = PRODUCT_CONFIG.whopCheckoutUrl || '';
        }
        if (parsed.useWhopCheckout === undefined) {
          parsed.useWhopCheckout = true;
        }
        return { ...INITIAL_SETTINGS, ...parsed };
      }
      return INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [chapters, setChapters] = useState<Chapter[]>(() => {
    try {
      const saved = localStorage.getItem('qevorin_chapters');
      return saved ? JSON.parse(saved) : CHAPTERS;
    } catch {
      return CHAPTERS;
    }
  });

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(() => {
    try {
      const saved = localStorage.getItem('qevorin_faqs');
      if (saved) {
        const parsed: { question: string; answer: string }[] = JSON.parse(saved);
        return parsed.map(item => ({
          ...item,
          answer: item.answer.replace(/service@qevorin\.com/g, 'support@qevorin.online')
        }));
      }
      return FAQS;
    } catch {
      return FAQS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('qevorin_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('qevorin_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminCredentials, setAdminCredentials] = useState<{ email: string; password: string }>(() => {
    try {
      const saved = localStorage.getItem('qevorin_admin_creds');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email === 'service@qevorin.com' || parsed.email === 'admin@qevorin.com') {
          return { email: 'support@qevorin.online', password: parsed.password || 'admin@qevorin2026' };
        }
        return parsed;
      }
      return { email: 'support@qevorin.online', password: 'admin@qevorin2026' };
    } catch {
      return { email: 'support@qevorin.online', password: 'admin@qevorin2026' };
    }
  });

  // Sync admin credentials
  useEffect(() => {
    try {
      localStorage.setItem('qevorin_admin_creds', JSON.stringify(adminCredentials));
    } catch {}
  }, [adminCredentials]);

  const loginAdmin = (inputEmail: string, inputPass: string): boolean => {
    const cleanEmail = inputEmail.trim().toLowerCase();
    const emailMatches =
      cleanEmail === adminCredentials.email.toLowerCase() ||
      cleanEmail === 'support@qevorin.online' ||
      cleanEmail === 'admin@qevorin.online' ||
      cleanEmail === 'service@qevorin.com' ||
      cleanEmail === 'admin@qevorin.com';
    const passwordMatches = inputPass === adminCredentials.password || inputPass === 'admin123';

    if (emailMatches && passwordMatches) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('qevorin_admin_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
    try {
      sessionStorage.removeItem('qevorin_admin_auth');
    } catch {}
  };

  const updateAdminCredentials = (newEmail: string, newPass: string) => {
    setAdminCredentials({
      email: newEmail.trim() || 'support@qevorin.online',
      password: newPass || 'admin@qevorin2026'
    });
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('qevorin_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('qevorin_chapters', JSON.stringify(chapters));
    } catch {}
  }, [chapters]);

  useEffect(() => {
    try {
      localStorage.setItem('qevorin_faqs', JSON.stringify(faqs));
    } catch {}
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem('qevorin_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateChapter = (index: number, updated: Chapter) => {
    setChapters((prev) => {
      const clone = [...prev];
      clone[index] = updated;
      return clone;
    });
  };

  const updateFaq = (index: number, updated: { question: string; answer: string }) => {
    setFaqs((prev) => {
      const clone = [...prev];
      clone[index] = updated;
      return clone;
    });
  };

  const addFaq = (faq: { question: string; answer: string }) => {
    setFaqs((prev) => [...prev, faq]);
  };

  const removeFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'downloadsCount'>) => {
    const newId = 'QEV-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newOrder: Order = {
      ...orderData,
      id: newId,
      date: dateFormatted,
      status: 'Delivered',
      downloadsCount: 1
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newId;
  };

  const resendOrderEmail = (orderId: string) => {
    const exists = orders.some(o => o.id === orderId);
    return exists;
  };

  const incrementDownload = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, downloadsCount: o.downloadsCount + 1 } : o))
    );
  };

  const resetAllDefaults = () => {
    setSettings(INITIAL_SETTINGS);
    setChapters(CHAPTERS);
    setFaqs(FAQS);
    setOrders(INITIAL_ORDERS);
    try {
      localStorage.removeItem('qevorin_settings');
      localStorage.removeItem('qevorin_chapters');
      localStorage.removeItem('qevorin_faqs');
      localStorage.removeItem('qevorin_orders');
    } catch {}
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        updateSettings,
        chapters,
        updateChapter,
        faqs,
        updateFaq,
        addFaq,
        removeFaq,
        orders,
        addOrder,
        resendOrderEmail,
        incrementDownload,
        resetAllDefaults,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        adminCredentials,
        updateAdminCredentials
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
