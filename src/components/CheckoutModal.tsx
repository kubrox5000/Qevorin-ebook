import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, CheckCircle2, Download, ArrowRight, Loader2, Mail, FileText, Smartphone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { downloadWorksheetsPack } from '../utils/generatePdf';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: 'checkout' | 'processing' | 'success';
  initialOrderId?: string;
  initialEmail?: string;
  paymentSource?: 'direct' | 'creem';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialStep = 'checkout',
  initialOrderId = '',
  initialEmail = '',
  paymentSource = 'direct'
}) => {
  const { settings, addOrder } = useStore();
  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>(initialStep);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [orderId, setOrderId] = useState(initialOrderId);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadedBook, setDownloadedBook] = useState(false);
  const [downloadedSheets, setDownloadedSheets] = useState(false);

  // Sync step if initialStep changes when opened
  React.useEffect(() => {
    if (isOpen) {
      if (initialStep === 'success') {
        setStep('success');
        if (initialOrderId) setOrderId(initialOrderId);
        if (initialEmail) setEmail(initialEmail);
        // Auto-download on success redirect
        setTimeout(() => {
          triggerPdfDownload();
        }, 500);
      } else {
        setStep('checkout');
      }
    }
  }, [isOpen, initialStep, initialOrderId, initialEmail]);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address for delivery.');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || cardNumber.length < 12)) {
      setErrorMsg('Please enter a valid card number.');
      return;
    }

    setErrorMsg('');
    setStep('processing');

    setTimeout(() => {
      // Record real order in StoreContext!
      const generatedOrderId = addOrder({
        customerName: name || 'Customer',
        customerEmail: email,
        amount: settings.price,
        currency: settings.currency,
        paymentMethod
      });

      setOrderId(generatedOrderId);
      setStep('success');
      
      // Auto-trigger download of the authentic QEVORIN Smart Money eBook PDF
      triggerPdfDownload();
    }, 1200);
  };

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = settings.ebookPdfPath;
    link.download = settings.ebookFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadedBook(true);
  };

  const handleDownloadBook = () => {
    triggerPdfDownload();
  };

  const handleDownloadSheets = () => {
    downloadWorksheetsPack();
    setDownloadedSheets(true);
  };

  const resetAndClose = () => {
    setStep('checkout');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#172B4D] text-[#E9C46A] flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              {step === 'success' ? 'Order Confirmed' : 'Secure Digital Checkout'}
            </span>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing State */}
        {step === 'processing' && (
          <div className="p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] flex items-center justify-center mx-auto">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Finalizing Your Digital Order...
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Generating your authorized PDF license and instant download link.
            </p>
          </div>
        )}

        {/* Success / Delivery State */}
        {step === 'success' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              {paymentSource === 'creem' || orderId.startsWith('CREEM-') ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <span>Verified Payment via Creem.io</span>
                </div>
              ) : null}
              <h3 className="text-2xl font-extrabold text-[#172B4D] font-display">
                Thank You for Your Order!
              </h3>
              <p className="text-xs text-slate-600">
                Order Reference: <strong className="font-mono text-slate-900">#{orderId}</strong>
              </p>
              {email ? (
                <p className="text-xs text-slate-500">
                  Receipt and backup access links sent to <span className="font-semibold text-slate-800">{email}</span>.
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  Your official licensed copy is ready for immediate download below.
                </p>
              )}
            </div>

            {/* Instant Delivery Downloads Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span>Instant Digital Downloads</span>
                <span className="text-[#2A9D8F]">Ready Now</span>
              </div>

              {/* Download Book Button */}
              <a
                href={settings.ebookPdfPath}
                download={settings.ebookFilename}
                onClick={() => setDownloadedBook(true)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[#172B4D] hover:bg-[#2A9D8F] transition-colors flex items-center justify-between shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-left text-xs sm:text-sm">
                  <Download className="w-4 h-4 text-[#E9C46A]" />
                  <div>
                    <div>Download Smart Money eBook</div>
                    <div className="text-[11px] font-normal text-slate-300">Official QEVORIN PDF Edition (2026)</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-white/20 font-mono">
                  {downloadedBook ? 'Saved ✓' : 'Download PDF'}
                </span>
              </a>

              {/* View Online Button */}
              <a
                href={settings.ebookPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 text-left">
                  <FileText className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Open & Read in Browser Immediately</span>
                </div>
                <span className="text-[11px] text-[#2A9D8F] font-bold">Open Reader →</span>
              </a>

              {/* Download Worksheets Button */}
              <button
                type="button"
                onClick={handleDownloadSheets}
                className="w-full py-3 px-4 rounded-xl font-bold text-[#172B4D] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-left text-xs">
                  <FileText className="w-4 h-4 text-[#172B4D]" />
                  <div>
                    <div>Download Printable Worksheets Pack</div>
                    <div className="text-[11px] font-normal text-slate-500">Monthly budget sheet & 30-day savings tracker</div>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-white font-medium">
                  {downloadedSheets ? 'Saved ✓' : 'Printable'}
                </span>
              </button>
            </div>

            {/* Need Help? */}
            <div className="text-center text-xs text-slate-500 space-y-1">
              <div>Need assistance with your files or have questions?</div>
              <div>
                Contact our customer support team directly at{' '}
                <a
                  href={`mailto:${settings.supportEmail}`}
                  className="font-semibold text-[#172B4D] underline hover:text-[#2A9D8F]"
                >
                  {settings.supportEmail}
                </a>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

        {/* Step 1: Checkout Form */}
        {step === 'checkout' && (
          <form onSubmit={handlePay} className="p-6 sm:p-7 space-y-5">
            {/* Order Item Recap */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-[#2A9D8F] uppercase tracking-wider">
                  {settings.brand}
                </div>
                <div className="text-sm font-bold text-slate-900">{settings.name} — Full Bundle</div>
                <div className="text-xs text-slate-500">{settings.format} (Digital Delivery)</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-display text-[#172B4D]">
                  {settings.currencySymbol}{settings.price}
                </div>
                <div className="text-[10px] text-slate-500">One-time payment</div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#172B4D] bg-[#172B4D] text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'apple'
                      ? 'border-[#172B4D] bg-[#172B4D] text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'border-[#172B4D] bg-[#172B4D] text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Email Address <span className="text-slate-400">(for instant file delivery)</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 focus:border-[#2A9D8F]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 focus:border-[#2A9D8F]"
                />
              </div>
            </div>

            {/* Card Inputs if Card chosen */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-1 border-t border-slate-100">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 focus:border-[#2A9D8F]"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 focus:border-[#2A9D8F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 focus:border-[#2A9D8F]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Digital Product Delivery Notice */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              <strong className="text-slate-700">Digital Product Delivery:</strong> Instant download access will be displayed immediately upon successful payment. No physical package is mailed.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[#172B4D] hover:bg-[#2A9D8F] active:scale-[0.99] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#E9C46A]" />
              <span>PAY {settings.currencySymbol}{settings.price}.00 {settings.currency} & DOWNLOAD</span>
            </button>

            {/* Security Seals */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F]" />
                256-Bit SSL Encryption
              </span>
              <span aria-hidden="true">·</span>
              <span>14-Day Delivery Guarantee</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
