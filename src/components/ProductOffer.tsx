import React from 'react';
import { Check, ShieldCheck, Mail, ArrowRight, Download, Laptop, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import coverPath from '../assets/images/smart_money_ebook_cover_1792524558772.jpg';

interface ProductOfferProps {
  onOpenCheckout: () => void;
  onOpenPreview: () => void;
}

export const ProductOffer: React.FC<ProductOfferProps> = ({ onOpenCheckout, onOpenPreview }) => {
  const { settings } = useStore();

  const includedItems = [
    `Full '${settings.name}' Official Workbook (Complete PDF edition)`,
    "Printable Monthly Budget Worksheet (Letter & A4 ready)",
    "30-Day Money Reset Checklist & Step-by-Step Action Plan",
    "Weekly Check-In & Savings Goal Tracker printable templates",
    "Mobile & Tablet optimized layout (iPhone, iPad, Android, e-readers)",
    "Lifetime digital access to updates and revised editions",
    "Direct priority email support at " + settings.supportEmail
  ];

  return (
    <section id="offer" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
            The Complete Digital Package
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] font-display text-balance">
            Start Building Better Money Habits Today.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Get instant digital access to the complete Smart Money guide and printable worksheets.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Visual & Product Spec */}
            <div className="lg:col-span-5 bg-[#172B4D] p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E9C46A] uppercase tracking-wider">
                  <span>{settings.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>Digital Edition</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    {settings.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {settings.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex justify-center">
                  <img
                    src={coverPath}
                    alt="Smart Money eBook Cover Mockup"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/smart_money_ebook_cover_1792524558772.jpg';
                    }}
                    className="w-44 h-auto aspect-[3/4] object-cover rounded-lg shadow-lg border border-white/10"
                  />
                </div>

                {/* Important Digital Disclaimer Notice */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-xs text-slate-200 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#E9C46A]" />
                    <span>Digital Product Notice:</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    This is an instant digital download ({settings.format}). No physical book will be shipped.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>Support: {settings.supportEmail}</span>
              </div>
            </div>

            {/* Right Column: Inclusions, Pricing, & Buy CTA */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      One-time payment
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#172B4D] font-display">
                        {settings.currencySymbol}{settings.price}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        {settings.currency} · No recurring charges
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full border border-[#2A9D8F]/20">
                    Full Bundle
                  </span>
                </div>

                {/* Included Checklist */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Everything Included:
                  </div>
                  <ul className="space-y-2.5">
                    {includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 space-y-3">
                <button
                  onClick={onOpenCheckout}
                  className="w-full py-4 px-6 text-base font-extrabold text-white bg-[#172B4D] hover:bg-[#2A9D8F] active:scale-[0.99] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>BUY NOW — INSTANT DIGITAL ACCESS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
                    <span>Secure 256-Bit SSL Checkout</span>
                  </span>
                  <button
                    onClick={onOpenPreview}
                    className="text-slate-600 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
                  >
                    Preview first 2 chapters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Target Markets note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Available worldwide with instant currency checkout support. Customers in US, UK, Canada, Australia & internationally.</span>
        </div>
      </div>
    </section>
  );
};
