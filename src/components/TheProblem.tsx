import React from 'react';
import { HelpCircle, TrendingDown, Layers, AlertTriangle } from 'lucide-react';

export const TheProblem: React.FC = () => {
  const challenges = [
    {
      icon: HelpCircle,
      title: "Not knowing where your monthly income actually goes",
      description: "Payday arrives, regular bills get paid, but by the third week of the month, the balance is quietly drained without any major luxury purchase to account for it."
    },
    {
      icon: TrendingDown,
      title: "Struggling to save on a consistent monthly rhythm",
      description: "You intend to put money away, but whatever is left at the end of the month gets absorbed by everyday friction, turning your savings goal into an afterthought."
    },
    {
      icon: Layers,
      title: "Feeling overwhelmed by rigid, complex budgeting systems",
      description: "You've tried 50-category spreadsheets, micro-budgeting apps, or extreme frugal challenges—only to abandon them after two weeks because they don't match real life."
    },
    {
      icon: AlertTriangle,
      title: "Being caught unprepared by irregular or sudden expenses",
      description: "Car maintenance, annual subscriptions, dental appointments, or gifts feel like emergencies simply because there was no calm, structured cushion built ahead of time."
    }
  ];

  return (
    <section id="problem-solution" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
            The Everyday Reality
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172B4D] font-display text-balance">
            Does Managing Money Feel Harder Than It Should?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            If budgeting has ever left you frustrated, stressed, or discouraged, you are not alone. Most personal finance advice is built for spreadsheets, not real human lives.
          </p>
        </div>

        {/* Relatable Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {challenges.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 transition-all duration-200 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#172B4D] border border-slate-200/70 flex items-center justify-center shadow-2xs">
                  <Icon className="w-5 h-5 text-[#2A9D8F]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Relatable Summary quote callout */}
        <div className="mt-12 max-w-3xl mx-auto p-6 rounded-2xl bg-slate-100/70 border border-slate-200 text-center">
          <p className="text-sm sm:text-base font-medium text-slate-700 italic">
            "You don’t need an accounting degree or hours of manual data entry. What you need is a realistic, low-friction framework that works quietly in the background."
          </p>
        </div>
      </div>
    </section>
  );
};
