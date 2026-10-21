import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TheProblem } from './components/TheProblem';
import { TheSolution } from './components/TheSolution';
import { WhatsInside } from './components/WhatsInside';
import { WhoIsThisFor } from './components/WhoIsThisFor';
import { ProductOffer } from './components/ProductOffer';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { LookInsideModal } from './components/LookInsideModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { StoreProvider, useStore } from './context/StoreContext';
import { Sparkles, ArrowRight } from 'lucide-react';

function LandingPageContent() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutInitialStep, setCheckoutInitialStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [checkoutOrderId, setCheckoutOrderId] = useState<string>('');
  const [checkoutEmail, setCheckoutEmail] = useState<string>('');
  const [checkoutSource, setCheckoutSource] = useState<'direct' | 'creem'>('direct');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewInitialChapter, setPreviewInitialChapter] = useState(0);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  const { settings, setIsAdminOpen, addOrder } = useStore();

  // Secret admin listener and Creem payment success return handler
  useEffect(() => {
    const checkUrl = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const params = new URLSearchParams(window.location.search);

      // Admin Panel trigger
      if (hash === '#admin' || search.includes('admin=true')) {
        setIsAdminOpen(true);
      }

      // Creem payment success redirect trigger
      const isSuccess =
        params.get('success') === 'true' ||
        params.get('payment_success') === 'true' ||
        params.get('status') === 'success' ||
        hash === '#success' ||
        hash === '#download';

      if (isSuccess) {
        const customerEmail = params.get('customer_email') || params.get('email') || '';
        const customerName = params.get('customer_name') || 'Customer';
        const orderRef = params.get('order_id') || `CREEM-${Math.floor(100000 + Math.random() * 900000)}`;

        // Record in store
        const newId = addOrder({
          customerName: customerName,
          customerEmail: customerEmail || 'customer@creem-checkout.com',
          amount: settings.price,
          currency: settings.currency,
          paymentMethod: 'card'
        });

        setCheckoutOrderId(newId || orderRef);
        setCheckoutEmail(customerEmail);
        setCheckoutSource('creem');
        setCheckoutInitialStep('success');
        setIsCheckoutOpen(true);

        // Clean up URL without reload so refresh doesn't re-trigger
        try {
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        } catch {
          // ignore
        }
      }
    };

    checkUrl();
    window.addEventListener('hashchange', checkUrl);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkUrl);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsAdminOpen, addOrder, settings.price, settings.currency]);

  const handleOpenPreview = (initialChapterIndex: number = 0) => {
    setPreviewInitialChapter(initialChapterIndex);
    setIsPreviewOpen(true);
  };

  const handleOpenCheckout = () => {
    if (settings.useCreemCheckout && settings.creemCheckoutUrl && settings.creemCheckoutUrl.trim()) {
      window.location.href = settings.creemCheckoutUrl.trim();
      return;
    }
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#2A9D8F]/20 selection:text-[#172B4D] font-sans antialiased relative">
      {/* Dynamic Announcement Bar */}
      {settings.announcementActive && (
        <div className="bg-[#172B4D] text-white py-2 px-4 text-center text-xs border-b border-slate-800 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 text-[#E9C46A] font-semibold shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              Notice:
            </span>
            <span className="text-slate-200 truncate">
              {settings.announcementText}
            </span>
            <button
              onClick={handleOpenCheckout}
              className="hidden sm:inline-flex items-center gap-1 font-bold text-[#E9C46A] hover:text-white transition-colors underline underline-offset-4 ml-2 cursor-pointer shrink-0"
            >
              <span>Order for {settings.currencySymbol}{settings.price}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Header onOpenCheckout={handleOpenCheckout} />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero
          onOpenCheckout={handleOpenCheckout}
          onOpenPreview={() => handleOpenPreview(0)}
        />

        {/* Section 2: The Problem */}
        <TheProblem />

        {/* Section 3: The Solution */}
        <TheSolution onOpenCheckout={handleOpenCheckout} />

        {/* Section 4: What's Inside */}
        <WhatsInside onOpenPreview={handleOpenPreview} />

        {/* Section 5: Who Is This For? */}
        <WhoIsThisFor onOpenCheckout={handleOpenCheckout} />

        {/* Section 6: Product Offer */}
        <ProductOffer
          onOpenCheckout={handleOpenCheckout}
          onOpenPreview={() => handleOpenPreview(0)}
        />

        {/* Section 7: FAQ Accordion */}
        <FAQ />

        {/* Section 8: Final CTA */}
        <FinalCTA onOpenCheckout={handleOpenCheckout} />
      </main>

      {/* Section 9: Footer */}
      <Footer
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onOpenCheckout={handleOpenCheckout}
      />



      {/* Admin Dashboard Control Center */}
      <AdminDashboard />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCheckoutInitialStep('checkout');
        }}
        initialStep={checkoutInitialStep}
        initialOrderId={checkoutOrderId}
        initialEmail={checkoutEmail}
        paymentSource={checkoutSource}
      />

      {/* Look Inside Preview Modal */}
      <LookInsideModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        initialIndex={previewInitialChapter}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Policy and Legal Modals */}
      <PolicyModal
        policy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <LandingPageContent />
    </StoreProvider>
  );
}
