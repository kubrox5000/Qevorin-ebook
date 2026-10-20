import React, { useState } from 'react';
import { BookOpen, Mail, ShieldCheck } from 'lucide-react';
import { PolicyType } from './PolicyModal';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onOpenPolicy: (type: PolicyType) => void;
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onOpenCheckout }) => {
  const currentYear = new Date().getFullYear();
  const { settings, setIsAdminOpen } = useStore();
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const next = clickCount + 1;
    if (next >= 3) {
      setClickCount(0);
      setIsAdminOpen(true);
    } else {
      setClickCount(next);
      setTimeout(() => setClickCount(0), 1800);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2A9D8F] flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white font-display">
                {settings.brand}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {settings.slogan}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              {settings.name}: {settings.subtitle}. An independent digital publication by {settings.brand}.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <a
                href={`mailto:${settings.supportEmail}`}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {settings.supportEmail}
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#problem-solution" className="hover:text-white transition-colors">
                  The Method
                </a>
              </li>
              <li>
                <a href="#whats-inside" className="hover:text-white transition-colors">
                  What's Inside
                </a>
              </li>
              <li>
                <a href="#offer" className="hover:text-white transition-colors">
                  Pricing & Offer
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Policies & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('disclaimer')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Digital Product Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Product Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Order
            </h4>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3 text-xs">
              <div className="font-semibold text-white">Smart Money PDF Bundle</div>
              <div className="text-slate-400">One-time payment of {settings.currencySymbol}{settings.price}</div>
              <button
                onClick={onOpenCheckout}
                className="w-full py-2 px-3 text-center text-xs font-bold text-slate-900 bg-[#E9C46A] hover:bg-[#F4D58D] rounded-lg transition-colors cursor-pointer"
              >
                Instant Download
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span
              onClick={handleSecretClick}
              className="cursor-default select-none"
              title=""
            >
              &copy; {currentYear} {settings.brand}. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
            <span>Digital Product · PDF Download · Customer Support: {settings.supportEmail}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
