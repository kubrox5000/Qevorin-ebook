import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FinalCTAProps {
  onOpenCheckout: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenCheckout }) => {
  const { settings } = useStore();

  return (
    <section className="py-20 lg:py-28 bg-[#172B4D] text-white relative overflow-hidden">
      {/* Decorative background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2A9D8F]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-[#E9C46A]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E9C46A] tracking-wider uppercase border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F]" />
          <span>{settings.brand} · Digital Guide & Worksheets</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight text-balance">
          Your Next Money Goal Starts With a Simple Plan.
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
          Take the first step toward a clearer, more intentional approach to managing your money.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenCheckout}
            className="w-full sm:w-auto px-8 py-4 text-base font-extrabold text-slate-900 bg-[#E9C46A] hover:bg-[#F4D58D] active:scale-[0.98] rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>GET SMART MONEY</span>
            <span className="font-mono">· {settings.currencySymbol}{settings.price}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span>Instant PDF Download</span>
          <span aria-hidden="true">·</span>
          <span>Printable Worksheets Included</span>
          <span aria-hidden="true">·</span>
          <span>Zero Subscription Fees</span>
          <span aria-hidden="true">·</span>
          <span>Support: {settings.supportEmail}</span>
        </div>
      </div>
    </section>
  );
};
