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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewInitialChapter, setPreviewInitialChapter] = useState(0);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  const { settings, setIsAdminOpen } = useStore();

  // Secret admin listener: URL hash (#admin or ?admin=true) and Keyboard shortcut (Ctrl/Cmd + Shift + A)
  useEffect(() => {
    const checkUrlForAdmin = () => {
      if (
        window.location.hash.toLowerCase() === '#admin' ||
        window.location.search.toLowerCase().includes('admin=true')
      ) {
        setIsAdminOpen(true);
      }
    };

    checkUrlForAdmin();
    window.addEventListener('hashchange', checkUrlForAdmin);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkUrlForAdmin);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsAdminOpen]);

  const handleOpenPreview = (initialChapterIndex: number = 0) => {
    setPreviewInitialChapter(initialChapterIndex);
    setIsPreviewOpen(true);
  };

  const handleOpenCheckout = () => {
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
        onClose={() => setIsCheckoutOpen(false)}
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
