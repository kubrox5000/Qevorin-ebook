import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  onOpenCheckout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCheckout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl font-bold tracking-wider text-[#172B4D] font-display whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#172B4D] flex items-center justify-center text-[#E9C46A] group-hover:bg-[#2A9D8F] transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
            <span>{settings.brand}</span>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#overview" className="hover:text-[#172B4D] transition-colors whitespace-nowrap shrink-0">
              Overview
            </a>
            <a href="#problem-solution" className="hover:text-[#172B4D] transition-colors whitespace-nowrap shrink-0">
              The Method
            </a>
            <a href="#whats-inside" className="hover:text-[#172B4D] transition-colors whitespace-nowrap shrink-0">
              What's Inside
            </a>
            <a href="#offer" className="hover:text-[#172B4D] transition-colors whitespace-nowrap shrink-0">
              Get the Guide
            </a>
            <a href="#faq" className="hover:text-[#172B4D] transition-colors whitespace-nowrap shrink-0">
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenCheckout}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#172B4D] hover:bg-[#2A9D8F] active:scale-[0.98] rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Get Smart Money · {settings.currencySymbol}{settings.price}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
            >
              Overview
            </a>
            <a
              href="#problem-solution"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
            >
              The Method
            </a>
            <a
              href="#whats-inside"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
            >
              What's Inside
            </a>
            <a
              href="#offer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
            >
              Get the Guide
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
            >
              FAQ
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-[#172B4D] hover:bg-[#2A9D8F] rounded-lg transition-colors shadow-sm"
            >
              Get Smart Money · {settings.currencySymbol}{settings.price}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
