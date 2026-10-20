import React, { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, FileSpreadsheet, PiggyBank, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroProps {
  onOpenCheckout: () => void;
  onOpenPreview: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout, onOpenPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const coverPath = "/src/assets/images/smart_money_ebook_cover_1792524558772.jpg";
  const { settings } = useStore();

  return (
    <section id="overview" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-10 pb-18 lg:pt-16 lg:pb-24 border-b border-slate-200">
      {/* Background subtle geometric glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#2A9D8F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 left-10 -z-10 w-80 h-80 bg-[#172B4D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2A9D8F] uppercase">
              <span>{settings.brand} Digital Editions</span>
              <span aria-hidden="true">·</span>
              <span>Instant PDF Download</span>
              <span aria-hidden="true">·</span>
              <span>{settings.slogan}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#172B4D] font-display leading-[1.15] text-balance">
              {settings.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-balance">
              {settings.heroSubheadline}
            </p>

            {/* Concise Benefits */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-md bg-[#2A9D8F]/10 text-[#2A9D8F] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  Simple Budgeting System
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-md bg-[#E9C46A]/20 text-[#D4AF4D] flex items-center justify-center shrink-0">
                  <PiggyBank className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  Practical Savings Strategies
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-md bg-[#172B4D]/10 text-[#172B4D] flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  Printable Money Worksheets
                </div>
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenCheckout}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-[#172B4D] hover:bg-[#2A9D8F] active:scale-[0.98] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                <span>GET THE EBOOK NOW</span>
                <span className="text-[#E9C46A]">·</span>
                <span className="font-mono">{settings.currencySymbol}{settings.price}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="#whats-inside"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#172B4D] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors duration-200 cursor-pointer text-center"
              >
                <BookOpen className="w-4 h-4 text-[#2A9D8F]" />
                <span>DISCOVER WHAT’S INSIDE</span>
              </a>
            </div>

            {/* Trust and Delivery Note */}
            <div className="pt-1 flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F]" />
                Direct PDF Delivery
              </span>
              <span aria-hidden="true">·</span>
              <span>Complete Workbook + Printable Worksheets</span>
              <span aria-hidden="true">·</span>
              <span>Works on Phone, Tablet & Print</span>
            </div>
          </div>

          {/* Right Column: High-Impact 3D eBook Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Soft decorative shadow pedestal */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-slate-900/15 rounded-full blur-xl -z-10" />

              {/* Card Container with subtle 3D tilt */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200/80 shadow-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                {/* Fallback container while loading */}
                {!imageLoaded && (
                  <div className="w-full aspect-[3/4] bg-[#172B4D] rounded-xl flex flex-col items-center justify-center p-6 text-center text-white">
                    <BookOpen className="w-12 h-12 text-[#E9C46A] mb-3 animate-pulse" />
                    <span className="text-xl font-bold font-display tracking-wide uppercase">{settings.name}</span>
                    <span className="text-xs text-slate-300 mt-1 max-w-xs">{settings.subtitle}</span>
                    <span className="text-xs font-semibold tracking-widest text-[#E9C46A] mt-4 uppercase">{settings.brand}</span>
                  </div>
                )}

                <img
                  src={coverPath}
                  alt="Smart Money eBook 3D Cover Mockup by QEVORIN"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-auto aspect-[3/4] object-cover rounded-xl shadow-inner ${imageLoaded ? 'block' : 'hidden'}`}
                />

                {/* Interactive Preview Overlay Button */}
                <div className="p-3 bg-white/95 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#2A9D8F]" />
                    <span>Official 2026 Edition</span>
                  </div>
                  <button
                    onClick={onOpenPreview}
                    className="font-semibold text-[#172B4D] hover:text-[#2A9D8F] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Look Inside Excerpt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
