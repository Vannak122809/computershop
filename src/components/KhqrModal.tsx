'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  ShieldCheck, 
  Download, 
  Sparkles, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function KhqrModal() {
  const { khqrModal, closeKhqrModal, lang, clearCart } = useStore();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [paidSuccess, setPaidSuccess] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes timer
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { isOpen, orderData } = khqrModal;

  useEffect(() => {
    if (isOpen && orderData) {
      setPaidSuccess(false);
      setIsVerifying(false);
      setTimeLeft(300);

      // Generate a mock Bakong KHQR payload format
      const finalTotal = Number(orderData.total_usd ?? orderData.priceUsd ?? orderData.total ?? 0);
      const amountStr = finalTotal.toFixed(2);
      const orderRef = orderData.order_number || orderData.orderNumber || `NVO-${Date.now().toString().slice(-4)}`;
      const khqrPayload = `00020101021229380016bakong@nbc.org.kh0108NVTECH02100000000000520459995303840540${amountStr.length}${amountStr}5802KH5913NV_TECHNOLOGY6010PHNOM_PENH62${(orderRef.length + 4).toString().padStart(2, '0')}01${orderRef.length.toString().padStart(2, '0')}${orderRef}6304ABCD`;

      import('qrcode').then((QRCodeModule) => {
        const QRCode = QRCodeModule.default || QRCodeModule;
        QRCode.toDataURL(khqrPayload, {
          width: 320,
          margin: 1,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        })
          .then((url: string) => setQrDataUrl(url))
          .catch((err: any) => console.error(err));
      }).catch(err => console.error('Failed to load qrcode:', err));
    }
  }, [isOpen, orderData]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || paidSuccess || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, paidSuccess, timeLeft]);

  if (!isOpen || !orderData) return null;

  const displayTotal = Number(orderData.total_usd ?? orderData.priceUsd ?? orderData.total ?? 0);
  const orderNum = orderData.order_number || orderData.orderNumber || 'NV-ORDER';

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isExpiringSoon = timeLeft < 60;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setPaidSuccess(true);
      clearCart();
    }, 800);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `KHQR_${orderNum}.png`;
    link.click();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm modal-backdrop-anim overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeKhqrModal();
      }}
    >
      <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 text-slate-900 font-khmer modal-content-anim my-auto">
        
        {/* Close Button with Spin Animation */}
        <button
          onClick={closeKhqrModal}
          aria-label="Close KHQR modal"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition duration-200 hover:rotate-90 hover:scale-105 active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {paidSuccess ? (
          <div className="p-8 text-center space-y-5 animate-slide-up">
            <div className="relative w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner border border-emerald-200 animate-pop">
              <CheckCircle2 className="w-10 h-10" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {lang === 'kh' ? 'ការទូទាត់ជោគជ័យ' : 'PAYMENT VERIFIED'}
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                {lang === 'kh' ? 'ការទូទាត់ទទួលបានជោគជ័យ!' : 'Payment Verified!'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto mt-1">
                {lang === 'kh'
                  ? `អរគុណសម្រាប់ការបញ្ជាទិញ #${orderData.order_number}។ ក្រុមការងារ NV Technology នឹងរៀបចំដឹកជញ្ជូនជូនលោកអ្នកភ្លាមៗ។`
                  : `Thank you for your order #${orderData.order_number}. Our logistics team is now preparing your items for delivery.`}
              </p>
            </div>

            {/* Receipt Summary Pill */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'kh' ? 'វិក្កយបត្រ៖' : 'Invoice:'}</span>
                <span className="font-mono font-bold text-slate-900">#{orderData.order_number}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'kh' ? 'ទឹកប្រាក់សរុប៖' : 'Paid Amount:'}</span>
                <span className="font-black text-emerald-600">${(orderData.total_usd || 0).toFixed(2)} USD</span>
              </div>
            </div>

            <button
              onClick={closeKhqrModal}
              className="w-full py-3 rounded-xl bg-[#0187ca] hover:bg-[#0073ad] text-white font-bold text-xs transition shadow-md shadow-sky-500/20 btn-tactile"
            >
              {lang === 'kh' ? 'បិទផ្ទាំងនេះ' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            {/* Bakong KHQR Header Banner */}
            <div className="relative bg-gradient-to-r from-[#E11927] to-[#b30e1b] px-6 py-4 text-white text-center shadow-sm">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl font-black tracking-widest uppercase">KHQR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              </div>
              <p className="text-[11px] opacity-90 font-medium">National Bank of Cambodia • Bakong</p>
            </div>

            {/* Merchant Details & Amount */}
            <div className="p-5 sm:p-6 text-center space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="text-left">
                  <h4 className="font-black text-slate-900 text-xs tracking-tight">NV TECHNOLOGY CO., LTD.</h4>
                  <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span>#{orderNum}</span>
                    <button
                      onClick={() => copyToClipboard(orderNum, 'order')}
                      title="Copy Invoice Number"
                      className="text-[#0187ca] hover:text-[#0073ad] transition"
                    >
                      {copiedField === 'order' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Amount Display with Tactile Copy */}
              <div className="py-2.5 px-4 bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-2xl border border-slate-200/90 relative group">
                <span className="text-[11px] text-slate-500 font-medium block">
                  {lang === 'kh' ? 'ចំនួនទឹកប្រាក់ទូទាត់' : 'Amount to Pay'}
                </span>
                <div className="flex items-baseline justify-center space-x-1 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    ${displayTotal.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-500">USD</span>
                </div>
                <button
                  onClick={() => copyToClipboard(displayTotal.toFixed(2), 'amount')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0187ca] p-1 rounded transition"
                  title="Copy Amount"
                >
                  {copiedField === 'amount' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* QR Image with Animated Laser Scanline */}
              <div className="relative p-3 bg-white rounded-2xl border-2 border-slate-200/90 inline-block shadow-sm overflow-hidden group">
                {/* Laser Scanning Animation */}
                <div className="laser-scanline"></div>

                {qrDataUrl ? (
                  <img 
                    src={qrDataUrl} 
                    alt="Bakong KHQR" 
                    className="w-52 h-52 sm:w-56 sm:h-56 mx-auto object-contain transition duration-200" 
                  />
                ) : (
                  <div className="w-52 h-52 sm:w-56 sm:h-56 flex flex-col items-center justify-center text-xs text-slate-400 space-y-2">
                    <span className="w-6 h-6 border-2 border-[#0187ca] border-t-transparent rounded-full animate-spin"></span>
                    <span>Generating KHQR...</span>
                  </div>
                )}

                {/* Central KHQR Logo Emblem */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-[#E11927] text-white flex items-center justify-center font-black text-[10px] border-2 border-white shadow-md">
                    KHQR
                  </div>
                </div>
              </div>

              {/* Timer & Expiry Alert */}
              <div className={`flex items-center justify-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
                isExpiringSoon 
                  ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}>
                <Clock className={`w-3.5 h-3.5 ${isExpiringSoon ? 'text-rose-600' : 'text-amber-500'}`} />
                <span>
                  {lang === 'kh' ? 'ផុតកំណត់ក្នុងរយៈពេល៖' : 'Expires in:'}{' '}
                  <strong className={isExpiringSoon ? 'text-rose-700 font-mono' : 'text-slate-900 font-mono'}>
                    {minutes}:{seconds.toString().padStart(2, '0')}
                  </strong>
                </span>
              </div>

              <p className="text-[11px] text-slate-500 font-khmer leading-snug">
                {lang === 'kh'
                  ? 'បើក App ធនាគារណាមួយ (ABA, Wing, ACLEDA, Bakong...) រួច Scan ទូទាត់'
                  : 'Scan with any mobile banking app supporting Bakong KHQR'}
              </p>

              {/* Actions: Confirm Payment & Save QR */}
              <div className="pt-1 space-y-2">
                <button
                  onClick={handleConfirmPayment}
                  disabled={isVerifying}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition font-khmer shadow-md shadow-emerald-600/20 btn-tactile flex items-center justify-center space-x-2 disabled:opacity-75"
                >
                  {isVerifying ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>{lang === 'kh' ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'Verifying Payment...'}</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{lang === 'kh' ? 'ខ្ញុំបានស្កេនទូទាត់រួចរាល់' : 'I Have Completed Payment'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-[11px] transition flex items-center justify-center space-x-1.5 btn-tactile"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'kh' ? 'ទាញយក QR ទុកក្នុងទូរស័ព្ទ' : 'Save QR to Photos'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
