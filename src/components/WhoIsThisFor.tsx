import React from 'react';
import { UserCheck, GraduationCap, Sparkles, Target, ArrowRight } from 'lucide-react';

interface WhoIsThisForProps {
  onOpenCheckout: () => void;
}

export const WhoIsThisFor: React.FC<WhoIsThisForProps> = ({ onOpenCheckout }) => {
  const audiences = [
    {
      icon: UserCheck,
      title: "Beginners Who Want to Learn Budgeting",
      description: "If you have never built a budget or previous attempts felt too rigid and punishing, this guide gives you a clean, simple roadmap you can master without intimidation."
    },
    {
      icon: Target,
      title: "People Who Want to Save More Consistently",
      description: "If your savings fluctuate unpredictably month to month, you will learn how to turn emergency cushion building into an effortless, automated background habit."
    },
    {
      icon: GraduationCap,
      title: "Students & Young Professionals",
      description: "Navigate your first salary, entry-level income, student commitments, or moving out on your own with clear rules for managing cash flow from day one."
    },
    {
      icon: Sparkles,
      title: "Anyone Seeking a Clearer Picture of Spending",
      description: "Whether you earn an entry wage or a strong salary, if you wonder where your hard-earned money quietly disappears, this gives you instant visual clarity."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
            Target Audience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] font-display text-balance">
            Who Is Smart Money Designed For?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Designed for real people managing everyday lives, bills, and aspirations—not hedge fund managers or financial theorists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {audiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#172B4D] border border-slate-200 flex items-center justify-center shadow-2xs">
                    <Icon className="w-6 h-6 text-[#2A9D8F]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Transparency callout */}
        <div className="mt-14 max-w-3xl mx-auto text-center space-y-3">
          <p className="text-xs text-slate-500">
            Smart Money is a practical self-guided education resource. No subscription traps, no surprise upsells, and no financial jargon.
          </p>
          <div>
            <button
              onClick={onOpenCheckout}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#172B4D] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              <span>See the complete product offer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
