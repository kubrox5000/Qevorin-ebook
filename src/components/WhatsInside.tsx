import React, { useState, useEffect } from 'react';
import { BookOpen, FileSpreadsheet, Eye, Check, ChevronRight } from 'lucide-react';
import { Chapter } from '../config/product';
import { useStore } from '../context/StoreContext';

interface WhatsInsideProps {
  onOpenPreview: (initialChapterIndex?: number) => void;
}

export const WhatsInside: React.FC<WhatsInsideProps> = ({ onOpenPreview }) => {
  const { chapters } = useStore();
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0] || {} as Chapter);
  const [activeTab, setActiveTab] = useState<'all' | 'guide' | 'worksheets'>('all');

  useEffect(() => {
    if (chapters.length > 0 && (!selectedChapter || !chapters.some(c => c.number === selectedChapter.number))) {
      setSelectedChapter(chapters[0]);
    }
  }, [chapters]);

  const filteredChapters = chapters.filter(ch => {
    if (activeTab === 'guide') return !ch.isWorksheet;
    if (activeTab === 'worksheets') return ch.isWorksheet;
    return true;
  });

  const worksheetsImg = "/src/assets/images/smart_money_worksheets_preview_1792524559257.jpg";
  const bundleImg = "/src/assets/images/smart_money_bundle_spread_1792524560278.jpg";

  return (
    <section id="whats-inside" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
            Curriculum & Materials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] font-display text-balance">
            What’s Inside Smart Money
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Structured into 7 actionable core chapters followed by high-resolution printable worksheets and milestone trackers.
          </p>

          {/* Segmented filter controls */}
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#172B4D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Modules ({chapters.length})
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-[#172B4D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Core Guide (7 Chapters)
            </button>
            <button
              onClick={() => setActiveTab('worksheets')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'worksheets'
                  ? 'bg-[#172B4D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Printable Worksheets (2 Modules)
            </button>
          </div>
        </div>

        {/* 2-Column Showcase: Interactive Topic List + Visual Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered Chapter List */}
          <div className="lg:col-span-7 space-y-3">
            {filteredChapters.map((chapter) => {
              const isSelected = selectedChapter.number === chapter.number;
              return (
                <div
                  key={chapter.number}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white border-[#2A9D8F] shadow-sm ring-1 ring-[#2A9D8F]/20'
                      : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-mono shrink-0 ${
                      isSelected
                        ? 'bg-[#172B4D] text-white'
                        : chapter.isWorksheet
                        ? 'bg-[#2A9D8F]/15 text-[#2A9D8F]'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    0{chapter.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {chapter.title}
                      </h3>
                      {chapter.isWorksheet && (
                        <span className="text-[11px] font-semibold text-[#2A9D8F] uppercase tracking-wider shrink-0">
                          · Printable PDF
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                      {chapter.summary}
                    </p>
                    <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />
                      <span className="font-medium text-slate-700">{chapter.takeaway}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPreview(chapter.number - 1);
                    }}
                    className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#172B4D] hover:text-[#2A9D8F] p-1 shrink-0"
                    title="Preview excerpt"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Worksheet & Bundle Presentation */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="relative group">
                <img
                  src={worksheetsImg}
                  alt="Smart Money Printable Financial Worksheets and Planners"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white space-y-1">
                    <span className="text-xs font-semibold text-[#E9C46A] uppercase tracking-wider">
                      Included with eBook
                    </span>
                    <h4 className="text-lg font-bold">Printable Money Worksheets & Tracker</h4>
                    <p className="text-xs text-slate-200">
                      Standard Letter & A4 ready. Print at home or annotate digitally.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                  <span>Selected Module Focus:</span>
                  <span className="font-semibold text-slate-800">
                    Chapter 0{selectedChapter.number}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900">{selectedChapter.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedChapter.summary}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onOpenPreview(selectedChapter.number - 1)}
                    className="flex-1 py-2.5 px-4 text-xs font-bold text-[#172B4D] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#2A9D8F]" />
                    <span>Look Inside Chapter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Second Visual Snippet: Multi-device & Bundle view */}
            <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex items-center gap-4">
              <img
                src={bundleImg}
                alt="Multi-device eBook display"
                referrerPolicy="no-referrer"
                className="w-20 h-16 object-cover rounded-lg shrink-0 border border-slate-200 shadow-2xs"
              />
              <div className="text-xs space-y-1">
                <div className="font-bold text-slate-900">Universal Digital Compatibility</div>
                <div className="text-slate-600 leading-normal">
                  Read smoothly on iOS Books, Kindle (PDF), Adobe Acrobat, Android, and web.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
