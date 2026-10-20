import React from 'react';
import { X, ShieldAlert, FileText, RefreshCw, Lock } from 'lucide-react';
import { PRODUCT_CONFIG } from '../config/product';

export type PolicyType = 'privacy' | 'terms' | 'refund' | 'disclaimer';

interface PolicyModalProps {
  policy: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  if (!policy) return null;

  const contentMap: Record<PolicyType, { title: string; icon: any; content: React.ReactNode }> = {
    privacy: {
      title: "Privacy Policy",
      icon: Lock,
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">Effective Date: 2026</p>
          <p>
            At <strong>{PRODUCT_CONFIG.brand}</strong>, we respect your privacy and are committed to protecting any personal information you share with us.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">1. Information We Collect</h4>
          <p>
            When you purchase <em>{PRODUCT_CONFIG.name}</em>, we collect basic transaction details necessary to process your payment and deliver your digital files, including your email address and billing name. We do not store complete payment card numbers; payment processing is handled through secure, PCI-compliant third-party payment gateways.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">2. How We Use Your Information</h4>
          <p>
            Your information is used solely to fulfill your order, deliver download links, send receipt confirmations, and provide customer support. We do not sell, rent, or trade your personal information to third parties.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">3. Customer Support Contact</h4>
          <p>
            If you have any questions regarding your personal data or wish to request data deletion, please contact us at <strong>{PRODUCT_CONFIG.supportEmail}</strong>.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms and Conditions",
      icon: FileText,
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">Last Updated: 2026</p>
          <p>
            Welcome to <strong>{PRODUCT_CONFIG.brand}</strong>. By purchasing or accessing <em>{PRODUCT_CONFIG.name}</em>, you agree to these Terms and Conditions.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">1. License and Permitted Use</h4>
          <p>
            Upon purchase, {PRODUCT_CONFIG.brand} grants you a non-exclusive, non-transferable, single-user license to download, read, and print the eBook and accompanying worksheets for personal, non-commercial use only.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">2. Intellectual Property</h4>
          <p>
            All content, layout, graphics, worksheets, and written materials within <em>{PRODUCT_CONFIG.name}</em> are the intellectual property of {PRODUCT_CONFIG.brand}. Reselling, redistributing, publicly sharing, modifying, or uploading the PDF to public file-sharing networks without express written permission is strictly prohibited.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">3. Digital Product Delivery</h4>
          <p>
            {PRODUCT_CONFIG.name} is delivered digitally in PDF format. Immediate access is granted upon successful payment confirmation.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">4. Contact Information</h4>
          <p>
            For inquiries regarding terms or licensing, contact <strong>{PRODUCT_CONFIG.supportEmail}</strong>.
          </p>
        </div>
      )
    },
    refund: {
      title: "Refund Policy",
      icon: RefreshCw,
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">Digital Goods Refund Policy</p>
          <p>
            Because <em>{PRODUCT_CONFIG.name}</em> is an intangible digital product delivered instantly upon purchase, we encourage customers to review the sample excerpts and table of contents before ordering.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">1. Delivery or Technical Issues</h4>
          <p>
            If you experience any technical difficulties accessing or downloading your files, our customer support team is available at <strong>{PRODUCT_CONFIG.supportEmail}</strong> to re-send your download link or provide direct file transfer immediately.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">2. Refund Requests</h4>
          <p>
            If the digital files are corrupted, defective, or fundamentally different from the stated product description and our support team is unable to resolve the issue, you may request a refund within 14 days of purchase by emailing <strong>{PRODUCT_CONFIG.supportEmail}</strong> with your order receipt details.
          </p>
        </div>
      )
    },
    disclaimer: {
      title: "Digital Product Disclaimer",
      icon: ShieldAlert,
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">Educational Resource Notice</p>
          <p>
            The content provided in <em>{PRODUCT_CONFIG.name}</em> by <strong>{PRODUCT_CONFIG.brand}</strong> is created solely for general educational, organizational, and informational purposes.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">1. Not Financial or Investment Advice</h4>
          <p>
            Neither {PRODUCT_CONFIG.brand} nor its authors are licensed financial advisors, certified public accountants (CPAs), or registered investment advisors. Nothing contained in this eBook, worksheets, or website should be construed as individualized investment, financial, legal, or tax advice.
          </p>
          <h4 className="font-bold text-slate-900 mt-3">2. Personal Responsibility & Results</h4>
          <p>
            Financial decisions, budgeting outcomes, and savings results depend on your individual situation, effort, and decisions. We do not make guarantees or promises of specific monetary results. For tailored financial advice, consult a qualified, licensed professional.
          </p>
        </div>
      )
    }
  };

  const activePolicy = contentMap[policy];
  const Icon = activePolicy.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#172B4D]/10 text-[#172B4D] flex items-center justify-center">
              <Icon className="w-4 h-4 text-[#2A9D8F]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {activePolicy.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activePolicy.content}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{PRODUCT_CONFIG.brand} · {PRODUCT_CONFIG.supportEmail}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-white bg-[#172B4D] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
