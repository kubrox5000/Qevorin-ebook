import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Check, Download } from 'lucide-react';
import { CHAPTERS, PRODUCT_CONFIG } from '../config/product';
import coverPath from '../assets/images/smart_money_ebook_cover_1792524558772.jpg';
import worksheetsPath from '../assets/images/smart_money_worksheets_preview_1792524559257.jpg';

interface LookInsideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  onOpenCheckout: () => void;
}

export const LookInsideModal: React.FC<LookInsideModalProps> = ({
  isOpen,
  onClose,
  initialIndex = 0,
  onOpenCheckout
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const currentChapter = CHAPTERS[currentIndex];

  const excerpts: Record<number, { subtitle: string; body: string[] }> = {
    1: {
      subtitle: "The Zero-Shame Financial Baseline",
      body: [
        "Before setting any new financial goals or attempting to restrict your habits, we have to start with reality. Most personal finance advice fails immediately because it begins with guilt: counting up how much you spent on takeout or berating yourself for past mistakes.",
        "In Smart Money, we start with a clean Money Snapshot. Over the next twenty minutes, you will gather three numbers: your reliable net monthly income, your fixed essential commitments (rent, utilities, debt minimums), and your average discretionary baseline.",
        "When these numbers are out in the daylight, anxiety drops. You stop guessing, stop dreading your banking app, and gain an objective compass to make every following decision effortlessly."
      ]
    },
    2: {
      subtitle: "The Three-Bucket Flow (Needs, Cushion, Joy)",
      body: [
        "Rigid budgeting systems with 45 granular categories do not fail because you lack discipline—they fail because life is dynamic and unpredictable.",
        "Instead, Smart Money introduces the Three-Bucket Flow. Bucket 1 covers your Non-Negotiable Essentials. Bucket 2 builds your Savings & Emergency Cushion. Bucket 3 is your Guilt-Free Joy Allocation.",
        "As long as Bucket 1 and Bucket 2 are funded automatically on payday, whatever remains in Bucket 3 is yours to spend freely—without tracking every single cup of coffee or second-guessing dinner with friends."
      ]
    },
    3: {
      subtitle: "The 5-Minute Weekly Pulse",
      body: [
        "Forget spending Sunday afternoons reconciling spreadsheets. Tracking spending should take less time than brewing a cup of tea.",
        "By setting up a weekly 5-minute pulse check, you scan your recent transactions for recurring duplicates, confirm Bucket 3 balance, and immediately recalibrate if you had a higher-spending week."
      ]
    },
    4: {
      subtitle: "Automating the Quiet Cushion",
      body: [
        "Willpower is a finite resource. If you wait until the 30th of the month to 'save whatever is left,' the answer is almost always zero.",
        "We set up split direct deposits and automated calendar transfers timed with your paycheck. Your savings cushion grows quietly before you even log in to check your account."
      ]
    },
    5: {
      subtitle: "Taming Irregular & Annual Costs",
      body: [
        "Annual car registrations, holiday gifts, and biannual insurance premiums are not surprises—they are predictable expenses with irregular timing.",
        "Learn how sinking funds turn these stressful shocks into calm, pre-funded routine transfers."
      ]
    },
    6: {
      subtitle: "Strategic Trimming Without Deprivation",
      body: [
        "Frugality does not mean suffering. We focus on high-impact recurring leaks: unused subscriptions, overpriced insurance rates, and hidden account maintenance fees.",
        "Trimming recurring waste by $150/month provides more breathing room than skipping the things that actually bring you genuine daily happiness."
      ]
    },
    7: {
      subtitle: "Your 30-Day Money Reset Calendar",
      body: [
        "A structured, day-by-day roadmap with bite-sized tasks: Day 1 audit, Day 5 automation setup, Day 12 bill renegotiation script, and Day 30 celebration.",
        "Transforming knowledge into lifelong confidence."
      ]
    },
    8: {
      subtitle: "Monthly Budget Worksheet (Printable PDF)",
      body: [
        "High-contrast, clean printable worksheet designed for home printing (US Letter & A4).",
        "Includes dedicated sections for Fixed Essentials, Variable Living Costs, Debt Acceleration, and Sinking Funds."
      ]
    },
    9: {
      subtitle: "Weekly Check-In & Savings Goal Planner",
      body: [
        "Visual progress trackers, milestone badges, and reflection questions to maintain healthy momentum month after month."
      ]
    }
  };

  const chapterExcerpt = excerpts[currentChapter.number] || {
    subtitle: currentChapter.title,
    body: [currentChapter.summary]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#172B4D] text-[#E9C46A] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
                {PRODUCT_CONFIG.name} · Preview Excerpt
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Chapter 0{currentChapter.number}: {currentChapter.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Viewer */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Chapter badge */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <span className="font-mono uppercase font-semibold text-[#172B4D]">
              Part {currentChapter.number} of {CHAPTERS.length}
            </span>
            <span>{currentChapter.isWorksheet ? 'Printable Template' : 'Reader Chapter'}</span>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              {chapterExcerpt.subtitle}
            </h4>

            {currentChapter.isWorksheet ? (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src={worksheetsPath}
                    alt="Sample worksheet preview"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/smart_money_worksheets_preview_1792524559257.jpg';
                    }}
                    className="w-full h-auto aspect-[16/9] object-cover"
                  />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Included in your purchase: ready-to-print PDF worksheets formatted for both standard 8.5x11" US Letter and international A4 paper sizes. You can print them or open them directly in tablet note-taking applications (GoodNotes, Notability, etc.).
                </p>
              </div>
            ) : (
              <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                {chapterExcerpt.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Check className="w-4 h-4 text-[#2A9D8F]" />
              <span>Key takeaway: {currentChapter.takeaway}</span>
            </div>
          </div>
        </div>

        {/* Navigation & CTA Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Chapter Prev / Next */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="text-xs font-mono text-slate-500">
              {currentIndex + 1} / {CHAPTERS.length}
            </span>
            <button
              disabled={currentIndex === CHAPTERS.length - 1}
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-white bg-[#172B4D] hover:bg-[#2A9D8F] rounded-lg transition-colors cursor-pointer text-center"
            >
              Get Full eBook · {PRODUCT_CONFIG.currencySymbol}{PRODUCT_CONFIG.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
