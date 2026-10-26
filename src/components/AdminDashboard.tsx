import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  ShoppingBag,
  Tag,
  FileEdit,
  Settings,
  DollarSign,
  TrendingUp,
  Download,
  Mail,
  RefreshCw,
  Plus,
  Trash2,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Eye,
  FileText,
  LogOut,
  KeyRound,
  CreditCard,
  Copy,
  CheckCircle2,
  Globe,
  Sparkles
} from 'lucide-react';
import { useStore, Order } from '../context/StoreContext';
import { Chapter } from '../config/product';
import { AdminLoginModal } from './AdminLoginModal';

type Tab = 'overview' | 'orders' | 'product' | 'payment' | 'content' | 'settings';

export const AdminDashboard: React.FC = () => {
  const {
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
    resetAllDefaults,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    logoutAdmin,
    adminCredentials,
    updateAdminCredentials
  } = useStore();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New FAQ Form State
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // Editing Chapter modal/state
  const [editingChapterIdx, setEditingChapterIdx] = useState<number | null>(null);

  // Admin Security Form State
  const [adminEmailInput, setAdminEmailInput] = useState(adminCredentials.email);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [copiedSuccessUrl, setCopiedSuccessUrl] = useState(false);

  if (!isAdminOpen) return null;

  // Gate with Login Modal if not authenticated!
  if (!isAdminAuthenticated) {
    return (
      <AdminLoginModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    );
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.amount, 0);
  const totalOrders = orders.length;
  const totalDownloads = orders.reduce((sum, ord) => sum + ord.downloadsCount, 0);
  const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : settings.price.toFixed(2);

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSimulateSale = () => {
    const sampleNames = ['Emma Watson', 'David Miller', 'Sarah Jenkins', 'Lucas Vance', 'Nadia Chen'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomEmail = randomName.toLowerCase().replace(' ', '.') + '@example.com';
    const methods: ('card' | 'apple' | 'paypal')[] = ['card', 'apple', 'paypal'];
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];

    const id = addOrder({
      customerName: randomName,
      customerEmail: randomEmail,
      amount: settings.price,
      currency: settings.currency,
      paymentMethod: randomMethod
    });

    showToast(`Order #${id} created successfully!`);
  };

  const handleExportCSV = () => {
    const header = 'Order ID,Customer Name,Email,Amount,Currency,Payment Method,Date,Status,Downloads\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.customerName}","${o.customerEmail}",${o.amount},"${o.currency}","${o.paymentMethod}","${o.date}","${o.status}",${o.downloadsCount}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qevorin_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Orders exported to CSV!');
  };

  const handleExportJSON = () => {
    const data = {
      settings,
      chapters,
      faqs,
      orders,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qevorin_store_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Store backup JSON downloaded!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-60 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-slide-in">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-slate-900 text-slate-100 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col border border-slate-800 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2A9D8F] text-white flex items-center justify-center font-bold font-display shadow-sm">
              Q
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-display">
                  QEVORIN Control Center
                </h2>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Store
                </span>
              </div>
              <div className="text-xs text-slate-400">
                لوحة التحكم الإدارية وإدارة المتجر الرقمي
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 text-xs font-semibold text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="تسجيل الخروج / Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-slate-900 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#2A9D8F] text-[#2A9D8F]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#2A9D8F] text-[#2A9D8F]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Deliveries ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('product')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'product'
                ? 'border-[#2A9D8F] text-[#2A9D8F]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Product & Pricing (${settings.price})</span>
          </button>

          <button
            onClick={() => setActiveTab('payment')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'payment'
                ? 'border-[#2A9D8F] text-[#2A9D8F]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payment & Creem.io</span>
            {settings.useCreemCheckout && settings.creemCheckoutUrl ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'content'
                ? 'border-[#2A9D8F] text-[#2A9D8F]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>Content & Curriculum</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#2A9D8F] text-[#2A9D8F]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Gross Revenue</span>
                    <DollarSign className="w-4 h-4 text-[#E9C46A]" />
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Real-time processed funds</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#2A9D8F]" />
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {totalOrders}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Average: ${averageOrderValue} / order
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>PDF Deliveries</span>
                    <Download className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {totalDownloads}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    100% instant fulfillment rate
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Current Unit Price</span>
                    <Tag className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    ${settings.price}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Currency: {settings.currency}
                  </div>
                </div>
              </div>

              {/* Quick Actions & Live Simulator */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-850 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-sm font-bold text-white">
                    Simulate Live Checkout Purchase
                  </h3>
                  <p className="text-xs text-slate-400">
                    Test the checkout pipeline and add a test transaction to verify instant PDF fulfillment.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSimulateSale}
                    className="px-4 py-2 text-xs font-bold text-slate-900 bg-[#E9C46A] hover:bg-[#F4D58D] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Generate Test Sale (+${settings.price})</span>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Regional Breakdown & Product State */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                  <h4 className="text-sm font-bold text-white">
                    Target Geographic Reach
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">United States</span>
                        <span className="font-mono text-slate-400">42%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-[#2A9D8F] h-2 rounded-full w-[42%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">United Kingdom</span>
                        <span className="font-mono text-slate-400">28%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-[#2A9D8F] h-2 rounded-full w-[28%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Canada</span>
                        <span className="font-mono text-slate-400">14%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-[#2A9D8F] h-2 rounded-full w-[14%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">Australia & Worldwide</span>
                        <span className="font-mono text-slate-400">16%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-[#2A9D8F] h-2 rounded-full w-[16%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                  <h4 className="text-sm font-bold text-white">
                    Current Active Product Details
                  </h4>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between py-1.5 border-b border-slate-700">
                      <span className="text-slate-400">Brand Name:</span>
                      <span className="font-bold text-white">{settings.brand}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-700">
                      <span className="text-slate-400">Product Title:</span>
                      <span className="font-semibold text-white">{settings.name}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-700">
                      <span className="text-slate-400">Support Email:</span>
                      <span className="font-mono text-[#2A9D8F]">{settings.supportEmail}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-700">
                      <span className="text-slate-400">Active PDF File:</span>
                      <a
                        href={settings.ebookPdfPath}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-sky-400 underline truncate max-w-[200px]"
                      >
                        {settings.ebookFilename}
                      </a>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Printable Worksheets:</span>
                      <span className="text-emerald-400 font-semibold">Enabled (Included)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by order ID, name, or email..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateSale}
                    className="px-3 py-2 text-xs font-semibold bg-[#2A9D8F] hover:bg-[#218376] text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Order</span>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              </div>

              {/* Orders Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-850 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Method</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                            No orders found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3 font-mono font-bold text-white">
                              {ord.id}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-200">
                              {ord.customerName}
                            </td>
                            <td className="px-4 py-3 text-slate-400 font-mono">
                              {ord.customerEmail}
                            </td>
                            <td className="px-4 py-3 font-mono font-bold text-[#E9C46A]">
                              ${ord.amount}
                            </td>
                            <td className="px-4 py-3 uppercase text-[10px] text-slate-400">
                              {ord.paymentMethod}
                            </td>
                            <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                              {ord.date}
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                {ord.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => {
                                  resendOrderEmail(ord.id);
                                  showToast(`Download link resent to ${ord.customerEmail}`);
                                }}
                                className="p-1.5 text-slate-400 hover:text-[#2A9D8F] hover:bg-slate-750 rounded-lg transition-colors cursor-pointer"
                                title="Resend download link"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCT & PRICING */}
          {activeTab === 'product' && (
            <div className="max-w-3xl space-y-6">
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Pricing & Product Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Selling Price (Current: ${settings.price})
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={settings.price}
                        onChange={(e) => updateSettings({ price: Number(e.target.value) || 0 })}
                        className="w-full pl-8 pr-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#2A9D8F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Currency Code
                    </label>
                    <input
                      type="text"
                      value={settings.currency}
                      onChange={(e) => updateSettings({ currency: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#2A9D8F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => updateSettings({ name: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={settings.brand}
                      onChange={(e) => updateSettings({ brand: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Product Subtitle
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle}
                    onChange={(e) => updateSettings({ subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Brand Slogan
                  </label>
                  <input
                    type="text"
                    value={settings.slogan}
                    onChange={(e) => updateSettings({ slogan: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Customer Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => updateSettings({ supportEmail: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Official eBook PDF File Link / Path
                  </label>
                  <input
                    type="text"
                    value={settings.ebookPdfPath}
                    onChange={(e) => updateSettings({ ebookPdfPath: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#2A9D8F]"
                  />
                  <div className="mt-1 text-[11px] text-slate-400">
                    File will be downloaded as: <strong className="text-white">{settings.ebookFilename}</strong>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => showToast('Product and pricing settings saved successfully!')}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#2A9D8F] hover:bg-[#218376] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save All Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENT & CREEM.IO GATEWAY */}
          {activeTab === 'payment' && (
            <div className="max-w-3xl space-y-6">
              {/* Status & Toggle Card */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#2A9D8F]" />
                      <h3 className="text-base font-bold text-white font-display">
                        Creem.io Payment Gateway / بوابة دفع Creem
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400">
                      Enable real global payments via Card, Apple Pay, Google Pay & local methods through Creem.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-300">
                      Creem Mode:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const nextState = !settings.useCreemCheckout;
                        updateSettings({ useCreemCheckout: nextState });
                        showToast(nextState ? 'Creem checkout enabled!' : 'Creem checkout disabled (built-in modal active).');
                      }}
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors cursor-pointer ${
                        settings.useCreemCheckout ? 'bg-[#2A9D8F]' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.useCreemCheckout ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        settings.useCreemCheckout
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {settings.useCreemCheckout ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>

                {/* Status Notice */}
                {settings.useCreemCheckout ? (
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <strong className="text-white">Creem Checkout is Active:</strong> When customers click any "Get Smart Money" or "Buy Now" CTA on the landing page, they will be redirected to your official Creem checkout page for secure payment.
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-400 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#E9C46A] shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <strong className="text-slate-300">Built-in Checkout Modal is Active:</strong> Customers currently complete their order and receive instant downloads via the high-converting simulated storefront modal. Enable the switch above once you have created your product on Creem.io.
                    </div>
                  </div>
                )}

                {/* Creem Checkout URL Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200 block">
                    Creem Product Checkout Link / رابط الدفع من Creem.io
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Paste the Checkout Link or Payment Link generated by your Creem.io product dashboard (e.g., <code className="text-slate-300 font-mono">https://checkout.creem.io/...</code> or <code className="text-slate-300 font-mono">https://creem.io/...</code>).
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      placeholder="https://checkout.creem.io/p/prod_xxxx..."
                      value={settings.creemCheckoutUrl || ''}
                      onChange={(e) => updateSettings({ creemCheckoutUrl: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#2A9D8F]"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          showToast('Creem settings saved successfully!');
                        }}
                        className="px-4 py-2.5 text-xs font-bold text-white bg-[#2A9D8F] hover:bg-[#218376] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Link</span>
                      </button>

                      {settings.creemCheckoutUrl && (
                        <a
                          href={settings.creemCheckoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Test Link</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Return / Success URL for Creem Dashboard */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#E9C46A]" />
                      <span>Return / Success URL (لإعدادها داخل منصة Creem):</span>
                    </label>
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/?success=true`;
                        navigator.clipboard.writeText(url);
                        setCopiedSuccessUrl(true);
                        showToast('Success URL copied to clipboard!');
                        setTimeout(() => setCopiedSuccessUrl(false), 2500);
                      }}
                      className="text-xs text-[#2A9D8F] hover:text-[#218376] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSuccessUrl ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 break-all select-all">
                    {typeof window !== 'undefined' ? `${window.location.origin}/?success=true` : 'https://your-domain.netlify.app/?success=true'}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    ضع هذا الرابط في خانة <strong>Success / Redirect URL</strong> في إعدادات المنتج داخل Creem.io. بعد أن يُتم العميل الدفع في Creem، سيتم تحويله تلقائياً لهذا الرابط ويبدأ تحميل كتاب PDF فوراً وبشكل تلقائي!
                  </p>
                </div>
              </div>

              {/* Step-by-Step Connection Guide */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 font-display">
                  <span>دليل ربط Creem.io خطوة بخطوة / Step-by-Step Setup Guide</span>
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#172B4D] text-[#E9C46A] font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">إنشاء حساب على Creem.io</strong>
                      <span className="text-slate-400">
                        توجه إلى <a href="https://www.creem.io" target="_blank" rel="noopener noreferrer" className="text-[#2A9D8F] underline">creem.io</a> وسجل حسابك، وقم بربط بيانات استلام الأموال (Bank Account / Stripe Connect).
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#172B4D] text-[#E9C46A] font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">إنشاء المنتج (Create Product)</strong>
                      <span className="text-slate-400">
                        من القائمة اضغط على <strong>Products</strong> ثم <strong>New Product</strong>:
                      </span>
                      <ul className="list-disc list-inside mt-1.5 space-y-0.5 text-slate-300">
                        <li>اسم المنتج: <strong className="text-white">Smart Money eBook by QEVORIN</strong></li>
                        <li>السعر: <strong className="text-white">$149.00 USD</strong> (One-time payment)</li>
                        <li>نوع المنتج: <strong className="text-white">Digital Product / File</strong></li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#172B4D] text-[#E9C46A] font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">ضبط رابط التحويل بعد الدفع (Success Redirect URL)</strong>
                      <span className="text-slate-400">
                        في إعدادات المنتج داخل Creem، ابحث عن <strong>Redirect URL</strong> أو <strong>Success URL</strong> والصق الرابط المنسوخ أعلاه:
                        <code className="block mt-1 text-emerald-400 font-mono text-[11px] bg-slate-950 p-1.5 rounded">
                          {typeof window !== 'undefined' ? `${window.location.origin}/?success=true` : 'https://your-domain.netlify.app/?success=true'}
                        </code>
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#172B4D] text-[#E9C46A] font-bold flex items-center justify-center shrink-0 text-xs">
                      4
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">نسخ رابط الدفع وتفعيله في موقعك</strong>
                      <span className="text-slate-400">
                        انسخ <strong>Checkout Link</strong> من صفحة المنتج في Creem، والصقه في خانة <strong>رابط الدفع من Creem.io</strong> أعلاه، وفعّل زر <strong>Active</strong> ثم اضغط <strong>Save Link</strong>.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">
                      ✓
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">تجربة تجربة العميل (End-to-End Test)</strong>
                      <span className="text-slate-400">
                        عندما يضغط أي زائر على زر الشراء، سيُنقل لبوابة Creem الآمنة، وبمجرد إتمام الدفع سيعود لموقعك وستظهر له رسالة شكر فورية ويبدأ تنزيل كتاب Smart Money PDF مباشرة على جهازه!
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Simulation Button */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-700/60 text-xs">
                  <span className="text-slate-400">
                    اختبار شاشة تسليم الكتاب كما يراها العميل بعد الدفع:
                  </span>
                  <button
                    onClick={() => {
                      setIsAdminOpen(false);
                      window.location.href = `${window.location.origin}/?success=true&payment_success=true`;
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#E9C46A]" />
                    <span>Test Customer Success Screen</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTENT & COPY */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Announcement Bar & Hero Texts */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Hero & Announcement Banner
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-300">
                      Top Announcement Banner Message
                    </label>
                    <button
                      type="button"
                      onClick={() => updateSettings({ announcementActive: !settings.announcementActive })}
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold transition-colors ${
                        settings.announcementActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {settings.announcementActive ? 'Banner Enabled' : 'Banner Disabled'}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => updateSettings({ announcementText: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-medium text-slate-300 block">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={settings.heroHeadline}
                    onChange={(e) => updateSettings({ heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-medium text-slate-300 block">
                    Hero Subheadline
                  </label>
                  <textarea
                    rows={2}
                    value={settings.heroSubheadline}
                    onChange={(e) => updateSettings({ heroSubheadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>
              </div>

              {/* Chapters & Curriculum */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Curriculum & Chapters ({chapters.length} Modules)
                </h3>
                <div className="space-y-3">
                  {chapters.map((ch, idx) => (
                    <div
                      key={ch.number}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          0{ch.number}
                        </span>
                        <div className="space-y-0.5 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">
                            {ch.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {ch.summary}
                          </p>
                          <p className="text-[11px] text-[#2A9D8F]">
                            Key takeaway: {ch.takeaway}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setEditingChapterIdx(idx)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        Edit Chapter
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Manager */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Frequently Asked Questions Manager
                </h3>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">
                          Q{idx + 1}: {faq.question}
                        </span>
                        <button
                          onClick={() => {
                            removeFaq(idx);
                            showToast('Question removed');
                          }}
                          className="p-1 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Add New FAQ */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-dashed border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-[#2A9D8F]">
                    Add New FAQ Question
                  </h4>
                  <input
                    type="text"
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    placeholder="e.g. Can I print the worksheets multiple times?"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                  />
                  <textarea
                    rows={2}
                    value={newFaqA}
                    onChange={(e) => setNewFaqA(e.target.value)}
                    placeholder="Enter helpful answer..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#2A9D8F]"
                  />
                  <button
                    onClick={() => {
                      if (!newFaqQ || !newFaqA) {
                        showToast('Please provide both question and answer.');
                        return;
                      }
                      addFaq({ question: newFaqQ, answer: newFaqA });
                      setNewFaqQ('');
                      setNewFaqA('');
                      showToast('FAQ added to landing page!');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#2A9D8F] hover:bg-[#218376] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Live FAQ Section</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Backup & Data Management
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export complete configuration, custom texts, and sales records as a portable JSON file.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="px-4 py-2.5 text-xs font-bold text-white bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Backup JSON</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2.5 text-xs font-bold text-slate-200 bg-slate-750 hover:bg-slate-700 border border-slate-600 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export Orders to CSV</span>
                  </button>
                </div>
              </div>

              {/* Admin Security Card */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <KeyRound className="w-4 h-4 text-[#2A9D8F]" />
                  <h3 className="text-sm font-bold font-display">
                    Admin Account & Security / أمان وحساب الدخول
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Update the login email and password used to access this administrative control panel.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1 font-medium">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={adminEmailInput}
                      onChange={(e) => setAdminEmailInput(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#2A9D8F]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 font-medium">
                      New Password (leave blank to keep current)
                    </label>
                    <input
                      type="password"
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#2A9D8F]"
                    />
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Current login email: <strong className="text-slate-200">{adminCredentials.email}</strong>
                  </span>
                  <button
                    onClick={() => {
                      updateAdminCredentials(
                        adminEmailInput,
                        adminPasswordInput || adminCredentials.password
                      );
                      setAdminPasswordInput('');
                      showToast('Admin credentials updated successfully!');
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-[#2A9D8F] hover:bg-[#218376] text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Save Login Details
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-3">
                <h3 className="text-sm font-bold text-red-400">
                  Reset Store to Initial Defaults
                </h3>
                <p className="text-xs text-slate-400">
                  This will restore the original pricing ($149), chapters, and initial FAQs from factory settings.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to restore factory default settings?')) {
                      resetAllDefaults();
                      showToast('Store reset to defaults successfully.');
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold text-red-200 bg-red-900/40 hover:bg-red-900/60 border border-red-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>QEVORIN Smart Money Digital Platform · Version 2026.1</span>
          <span>Customer Support: {settings.supportEmail}</span>
        </div>
      </div>

      {/* Edit Chapter Modal */}
      {editingChapterIdx !== null && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h4 className="text-sm font-bold">
              Edit Chapter 0{chapters[editingChapterIdx].number}
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={chapters[editingChapterIdx].title}
                  onChange={(e) =>
                    updateChapter(editingChapterIdx, {
                      ...chapters[editingChapterIdx],
                      title: e.target.value
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Summary</label>
                <textarea
                  rows={2}
                  value={chapters[editingChapterIdx].summary}
                  onChange={(e) =>
                    updateChapter(editingChapterIdx, {
                      ...chapters[editingChapterIdx],
                      summary: e.target.value
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Key Takeaway</label>
                <input
                  type="text"
                  value={chapters[editingChapterIdx].takeaway}
                  onChange={(e) =>
                    updateChapter(editingChapterIdx, {
                      ...chapters[editingChapterIdx],
                      takeaway: e.target.value
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setEditingChapterIdx(null)}
                className="px-4 py-2 text-xs font-semibold bg-[#2A9D8F] text-white rounded-lg hover:bg-[#218376]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
