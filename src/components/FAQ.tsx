import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FAQ: React.FC = () => {
  const { faqs, settings } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] font-display text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-balance">
            Clear, honest answers about format, delivery, compatibility, and support.
          </p>
        </div>

        {/* Interactive Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#2A9D8F] bg-slate-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#172B4D] text-white rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#172B4D] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#2A9D8F]" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Have a specific question?</div>
              <div className="text-xs text-slate-500">Our customer support team is happy to help anytime.</div>
            </div>
          </div>
          <a
            href={`mailto:${settings.supportEmail}`}
            className="px-5 py-2.5 text-xs font-bold text-[#172B4D] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
          >
            Email {settings.supportEmail}
          </a>
        </div>
      </div>
    </section>
  );
};
