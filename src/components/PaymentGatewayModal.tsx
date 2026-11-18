"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  QrCode,
  CreditCard,
  Building2,
  Copy,
  Check,
  Loader2,
  ArrowRight,
  Smartphone,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderAmount: number;
  orderData: {
    items: any[];
    customer: any;
    subtotal: number;
    shipping: number;
    total: number;
  };
  onPaymentSuccess: (confirmedOrder: any) => void;
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  orderAmount,
  orderData,
  onPaymentSuccess,
}: PaymentGatewayModalProps) {
  const [activeTab, setActiveTab] = useState<"upi" | "card" | "netbanking">("upi");
  const [isLoadingIntent, setIsLoadingIntent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [intentData, setIntentData] = useState<any>(null);
  const [copiedVpa, setCopiedVpa] = useState(false);

  // Card form state
  const [cardForm, setCardForm] = useState({
    number: "4532 •••• •••• 8821",
    name: orderData.customer.fullName || "Ahamed Adnan",
    expiry: "09/28",
    cvv: "824",
  });

  // Selected Bank for Netbanking
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Fetch payment intent and dynamic QR when modal opens
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoadingIntent(true);

    fetch("/api/payment/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: orderAmount,
        customerName: orderData.customer.fullName,
        customerMobile: orderData.customer.mobile,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setIntentData(data.data);
        }
      })
      .catch((err) => console.error("Error creating payment intent:", err))
      .finally(() => {
        if (isMounted) setIsLoadingIntent(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, orderAmount, orderData]);

  if (!isOpen) return null;

  const handleCopyVpa = () => {
    if (intentData?.upiVpa) {
      navigator.clipboard.writeText(intentData.upiVpa);
      setCopiedVpa(true);
      setTimeout(() => setCopiedVpa(false), 2500);
    }
  };

  const handleConfirmPayment = async (provider: "upi" | "card" | "netbanking") => {
    setIsVerifying(true);

    try {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: intentData?.orderId,
          transactionId: intentData?.transactionId || "TXN-" + Date.now(),
          provider,
          upiId: provider === "upi" ? "customer@okaxis" : undefined,
          amount: orderAmount,
          orderData,
        }),
      });

      const result = await response.json();

      if (result.success && result.order) {
        // Fire celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#103B27", "#C5A880", "#E4D2B8"],
          });
        } catch {}

        setIsVerifying(false);
        onPaymentSuccess(result.order);
      } else {
        alert(result.error || "Payment verification failed. Please try again.");
        setIsVerifying(false);
      }
    } catch (err) {
      console.error("Payment verify failed:", err);
      alert("Failed to communicate with payment backend. Please try again.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#D8CBB7] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#09291C] text-[#F5F1E8] px-6 py-4 flex items-center justify-between border-b border-[#C5A880]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#103B27] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] text-xs font-serif font-bold">
              RB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif tracking-widest text-sm font-semibold text-[#F5F1E8]">
                  RUGBY WHITE
                </span>
                <span className="text-[10px] uppercase font-sans tracking-widest px-2 py-0.5 rounded bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30">
                  SECURE GATEWAY
                </span>
              </div>
              <p className="text-[11px] font-sans text-[#EAE3D6]/70">
                100% Encrypted UPI, Cards &amp; NetBanking
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#EAE3D6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Bar */}
        <div className="bg-[#F5F1E8] px-6 py-3 flex items-center justify-between border-b border-[#D8CBB7]">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#87967E] block">
              TOTAL PAYABLE
            </span>
            <span className="font-serif text-2xl font-bold text-[#103B27]">
              ₹{orderAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#87967E] block">
              ORDER REF
            </span>
            <span className="font-mono text-xs font-bold text-[#103B27]">
              {intentData?.orderId || "GENERATING..."}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 border-b border-[#EAE3D6] bg-[#FCF8F3] text-xs font-sans">
          <button
            onClick={() => setActiveTab("upi")}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === "upi"
                ? "border-[#103B27] text-[#103B27] bg-[#FFFFFF] font-bold"
                : "border-transparent text-[#87967E] hover:text-[#103B27]"
            }`}
          >
            <QrCode className="w-4 h-4 text-[#103B27]" />
            <span>UPI / QR</span>
          </button>

          <button
            onClick={() => setActiveTab("card")}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === "card"
                ? "border-[#103B27] text-[#103B27] bg-[#FFFFFF] font-bold"
                : "border-transparent text-[#87967E] hover:text-[#103B27]"
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#103B27]" />
            <span>Debit / Credit</span>
          </button>

          <button
            onClick={() => setActiveTab("netbanking")}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === "netbanking"
                ? "border-[#103B27] text-[#103B27] bg-[#FFFFFF] font-bold"
                : "border-transparent text-[#87967E] hover:text-[#103B27]"
            }`}
          >
            <Building2 className="w-4 h-4 text-[#103B27]" />
            <span>Net Banking</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isLoadingIntent ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#103B27] animate-spin" />
              <p className="text-xs font-sans text-[#87967E]">
                Generating instant NPCI UPI QR code and payment session...
              </p>
            </div>
          ) : activeTab === "upi" ? (
            /* UPI Tab */
            <div className="space-y-5 text-center">
              <div className="p-4 bg-[#F5F1E8] rounded-xl border border-[#D8CBB7] inline-block mx-auto shadow-sm">
                {intentData?.qrCodeDataUrl ? (
                  <div className="relative w-48 h-48 mx-auto bg-white p-2 rounded-lg border border-[#D8CBB7]/60">
                    <Image
                      src={intentData.qrCodeDataUrl}
                      alt="UPI Payment QR Code"
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center bg-white rounded-lg">
                    <Loader2 className="w-6 h-6 animate-spin text-[#103B27]" />
                  </div>
                )}
                <p className="text-[11px] font-sans text-[#103B27] font-semibold mt-2">
                  Scan with GPay, PhonePe, Paytm or any UPI App
                </p>
              </div>

              {/* UPI ID Copy */}
              <div className="max-w-xs mx-auto">
                <span className="text-[10px] font-sans text-[#87967E] uppercase tracking-wider block mb-1">
                  OFFICIAL UPI ID / VPA
                </span>
                <div className="flex items-center justify-between px-3 py-2 bg-[#FCF8F3] border border-[#D8CBB7] rounded-lg">
                  <span className="font-mono text-xs font-bold text-[#103B27]">
                    {intentData?.upiVpa || "rugbywhite@icici"}
                  </span>
                  <button
                    onClick={handleCopyVpa}
                    className="flex items-center gap-1 text-[11px] font-sans font-semibold text-[#103B27] hover:underline cursor-pointer"
                  >
                    {copiedVpa ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                        <span className="text-[#2E7D32]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instant App Deep Links for Mobile */}
              <div className="pt-2">
                <span className="text-[10px] font-sans text-[#87967E] uppercase tracking-wider block mb-2">
                  OR PAY DIRECTLY VIA APP
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={intentData?.deepLinks?.gpay || "#"}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#D8CBB7] hover:border-[#103B27] text-xs font-sans font-medium text-[#1C1C1C] flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#4285F4]" />
                    <span>Google Pay</span>
                  </a>
                  <a
                    href={intentData?.deepLinks?.phonepe || "#"}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#D8CBB7] hover:border-[#103B27] text-xs font-sans font-medium text-[#1C1C1C] flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#5f259f]" />
                    <span>PhonePe</span>
                  </a>
                  <a
                    href={intentData?.deepLinks?.paytm || "#"}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#D8CBB7] hover:border-[#103B27] text-xs font-sans font-medium text-[#1C1C1C] flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#00b9f5]" />
                    <span>Paytm</span>
                  </a>
                </div>
              </div>

              {/* Verify Button */}
              <div className="pt-3">
                <button
                  onClick={() => handleConfirmPayment("upi")}
                  disabled={isVerifying}
                  className="w-full py-3.5 px-6 rounded-full bg-[#103B27] hover:bg-[#09291C] text-[#F5F1E8] text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-75"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                      <span>VERIFYING PAYMENT WITH NPCI...</span>
                    </>
                  ) : (
                    <>
                      <span>I HAVE COMPLETED PAYMENT</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : activeTab === "card" ? (
            /* Card Tab */
            <div className="space-y-4">
              {/* Virtual Card Graphic */}
              <div className="bg-gradient-to-tr from-[#09291C] via-[#103B27] to-[#1c5539] text-[#F5F1E8] p-5 rounded-xl shadow-lg relative overflow-hidden border border-[#C5A880]/30 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-serif tracking-widest text-xs font-bold text-[#C5A880]">
                    RUGBY WHITE LUXURY PAY
                  </span>
                  <span className="text-xs font-mono font-bold">VISA / MASTERCARD</span>
                </div>
                <div className="font-mono text-lg tracking-widest pt-2">
                  {cardForm.number}
                </div>
                <div className="flex justify-between items-end text-xs font-sans text-[#EAE3D6]">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block text-[#87967E]">
                      CARD HOLDER
                    </span>
                    <span className="font-medium uppercase">{cardForm.name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block text-[#87967E]">
                      EXPIRES
                    </span>
                    <span className="font-mono">{cardForm.expiry}</span>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 pt-2 text-xs font-sans">
                <div>
                  <label className="text-[11px] font-semibold text-[#1C1C1C] uppercase tracking-wider block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardForm.number}
                    onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FCF8F3] border border-[#D8CBB7] rounded-lg focus:outline-none focus:border-[#103B27] font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#1C1C1C] uppercase tracking-wider block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardForm.expiry}
                      onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 bg-[#FCF8F3] border border-[#D8CBB7] rounded-lg focus:outline-none focus:border-[#103B27] font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#1C1C1C] uppercase tracking-wider block mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FCF8F3] border border-[#D8CBB7] rounded-lg focus:outline-none focus:border-[#103B27] font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={() => handleConfirmPayment("card")}
                disabled={isVerifying}
                className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#103B27] hover:bg-[#09291C] text-[#F5F1E8] text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-75"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                    <span>AUTHORIZING ₹{orderAmount.toLocaleString("en-IN")} WITH BANK...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>PAY ₹{orderAmount.toLocaleString("en-IN")} SECURELY</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Netbanking Tab */
            <div className="space-y-4">
              <span className="text-xs font-sans text-[#87967E] block">
                Select your bank to redirect to secure NetBanking portal:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra", "Federal Bank"].map(
                  (bank) => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedBank === bank
                          ? "border-[#103B27] bg-[#FCF8F3] font-bold text-[#103B27] ring-1 ring-[#103B27]"
                          : "border-[#D8CBB7] hover:border-[#103B27] text-[#1C1C1C]"
                      }`}
                    >
                      {bank}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handleConfirmPayment("netbanking")}
                disabled={isVerifying}
                className="w-full mt-4 py-3.5 px-6 rounded-full bg-[#103B27] hover:bg-[#09291C] text-[#F5F1E8] text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-75"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                    <span>CONNECTING TO {selectedBank.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <span>PROCEED WITH {selectedBank.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer Security Badges */}
        <div className="bg-[#FCF8F3] px-6 py-3 border-t border-[#D8CBB7] flex flex-wrap items-center justify-between text-[11px] font-sans text-[#87967E]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>256-Bit Bank-Grade SSL</span>
          </div>
          <div className="flex items-center gap-3">
            <span>PCI-DSS Certified</span>
            <span>•</span>
            <span>NPCI Regulated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
