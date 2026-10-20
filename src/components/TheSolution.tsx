import React from 'react';
import { Compass, Wallet, LineChart, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface TheSolutionProps {
  onOpenCheckout: () => void;
}

export const TheSolution: React.FC<TheSolutionProps> = ({ onOpenCheckout }) => {
  const { settings } = useStore();
  const solutions = [
    {
      icon: Compass,
      title: "Understand Your True Cash Flow",
      description: "Gain 100% clarity on income versus essential commitments so you always know exactly where your baseline sits before spending a dollar."
    },
    {
      icon: Wallet,
      title: "Create a Realistic, Livable Budget",
      description: "Design a plan that accounts for joy, social outings, and your personal priorities—no guilt, no severe deprivation, and no unrealistic cuts."
    },
    {
      icon: LineChart,
      title: "Track Spending Without Spreadsheet Fatigue",
      description: "Adopt frictionless weekly check-ins that take under 5 minutes, replacing tedious receipt hoarding with effortless situational awareness."
    },
    {
      icon: Sparkles,
      title: "Develop Automatic Savings Habits",
      description: "Put your emergency cushion and future goals on quiet autopilot, letting small weekly deposits accumulate into significant peace of mind."
    },
    {
      icon: ShieldCheck,
      title: "Prepare Confidently for Irregular Costs",
      description: "Turn surprise annual bills, insurance premiums, and holiday spending into planned, stress-free routine line items."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A9D8F]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E9C46A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#2A9D8F]">
            The Sustainable Solution
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold font-display text-white tracking-tight text-balance">
            Meet Smart Money by {settings.brand}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            A step-by-step digital guide designed to bring calm, structure, and lasting confidence to your personal finances—without changing who you are.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-[#2A9D8F]/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2A9D8F]/20 text-[#2A9D8F] flex items-center justify-center border border-[#2A9D8F]/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Direct Action Block */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-[#172B4D] to-[#0F1D33] border border-[#2A9D8F]/40 flex flex-col justify-between text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E9C46A]">
                Instant PDF Delivery
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Ready to Start Your 30-Day Money Reset?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Download the complete eBook and printable worksheet bundle right now.
              </p>
            </div>
            <button
              onClick={onOpenCheckout}
              className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 px-5 text-sm font-bold text-slate-900 bg-[#E9C46A] hover:bg-[#F4D58D] rounded-xl transition-colors cursor-pointer"
            >
              <span>Get Instant Access</span>
              <span className="font-mono">· {settings.currencySymbol}{settings.price}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
