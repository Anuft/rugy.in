"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, ShieldCheck, Check, Sparkles, ArrowRight, X, Lock } from "lucide-react";
import RugbyWhiteLogo from "@/components/RugbyWhiteLogo";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

export default function OtpLoginGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [generatedDemoOtp, setGeneratedDemoOtp] = useState("2026");

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Check login state on mount
  useEffect(() => {
    try {
      const session = localStorage.getItem("rw_customer_session");
      const guestDismissed = sessionStorage.getItem("rw_guest_dismissed");
      if (!session && !guestDismissed) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanNum = mobileNumber.replace(/\D/g, "");
    if (cleanNum.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsSubmitting(true);
    // Simulate SMS / WhatsApp OTP dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("otp");
      setResendTimer(30);
      setGeneratedDemoOtp("2026");
      setOtpDigits(["2", "0", "2", "6"]);
      // Focus first digit
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    }, 300);
  };

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    // Auto-advance to next input
    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    const enteredOtp = otpDigits.join("");
    if (enteredOtp.length !== 4) {
      setErrorMsg("Please enter a 4-digit code (e.g. 2026).");
      return;
    }

    setIsSubmitting(true);
    // Record login in backend
    fetch("/api/customer-logins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobileNumber: mobileNumber,
        method: "Mobile OTP Verified",
      }),
    }).catch((err) => console.error("Failed to record login:", err));

    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");

      const sessionData = {
        name: `Member (+91 ${mobileNumber.slice(-4)})`,
        contact: `+91 ${mobileNumber}`,
        loginTime: new Date().toISOString(),
      };

      try {
        localStorage.setItem("rw_customer_session", JSON.stringify(sessionData));
      } catch (err) {
        console.error("Storage error:", err);
      }

      // Smoothly dismiss modal after checkmark animation
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }, 400);
  };

  const handleDismissGuest = () => {
    try {
      sessionStorage.setItem("rw_guest_dismissed", "true");
    } catch {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1C1C1C]/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl border border-[#F4CEDF] shadow-2xl overflow-hidden relative">
        {/* Subtle top banner */}
        <div className="bg-[#581527] py-2 px-4 text-center text-[10px] font-sans font-bold tracking-[0.25em] text-[#FEF7FB] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#EA90B5]" />
          <span>CLIENT PRIVILEGE MEMBER SIGN IN</span>
        </div>

        {/* Close / Guest Browse Button */}
        <button
          onClick={handleDismissGuest}
          className="absolute top-3.5 right-4 text-[#FEF7FB]/80 hover:text-white transition-colors"
          title="Browse as Guest"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7 sm:p-9 space-y-6">
          {/* Brand Monogram */}
          <div className="text-center space-y-2">
            <div className="inline-block">
              <RugbyWhiteLogo variant="dark" size="sm" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#581527] tracking-tight">
              {step === "otp"
                ? "Verify Mobile OTP"
                : step === "success"
                ? "Welcome to Rugby White"
                : "Sign In to Your Ritual"}
            </h2>
            <p className="text-xs font-sans text-[#8A304C] max-w-xs mx-auto leading-relaxed">
              {step === "otp"
                ? `Enter the 4-digit code sent to +91 ${mobileNumber}`
                : step === "success"
                ? "Your member privilege session is verified."
                : "Enter your 10-digit mobile number to access member pricing and fast WhatsApp orders."}
            </p>
          </div>

          {/* STEP 1: MOBILE NUMBER INPUT */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#581527] mb-1.5">
                  Mobile Number (India)
                </label>
                <div className="flex rounded-xl border border-[#F4CEDF] bg-[#FEF7FB] overflow-hidden focus-within:border-[#581527] focus-within:bg-white transition-all shadow-xs">
                  <span className="inline-flex items-center px-4 font-sans font-bold text-xs text-[#581527] border-r border-[#F4CEDF] bg-[#FDEAF3]/50">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="92073 41674"
                    autoFocus
                    className="flex-1 px-4 py-3.5 text-sm font-sans tracking-widest text-[#2A1018] bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || mobileNumber.length < 10}
                className="w-full py-4 rounded-full bg-[#581527] hover:bg-[#3F0E1B] text-white text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "SENDING OTP..." : "GET LOGIN OTP"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Instant WhatsApp alternative */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#F4CEDF]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-sans tracking-widest">
                  <span className="bg-white px-3 text-[#8A304C]">or</span>
                </div>
              </div>

              <a
                href={`https://wa.me/91${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Rugby White! 🌿 I would like to sign in to my customer account using WhatsApp."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans font-bold tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>SIGN IN VIA WHATSAPP</span>
              </a>
            </form>
          )}

          {/* STEP 2: 4-DIGIT OTP VERIFICATION */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                  {errorMsg}
                </div>
              )}

              {/* Demo Helper Tag */}
              <div className="p-2.5 rounded-xl bg-[#FDEAF3] border border-[#F4CEDF] text-center text-[11px] font-sans text-[#581527]">
                <span>Demo Verification Code: </span>
                <button
                  type="button"
                  onClick={() => {
                    setOtpDigits(["2", "0", "2", "6"]);
                  }}
                  className="font-bold underline text-[#AE3E64] hover:text-[#581527] ml-1"
                >
                  Auto-fill 2026
                </button>
              </div>

              {/* 4 Digit Boxes */}
              <div className="flex items-center justify-center gap-3 py-2">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-center text-xl font-serif font-bold text-[#581527] bg-[#FEF7FB] border border-[#F4CEDF] rounded-2xl focus:outline-none focus:border-[#581527] focus:bg-white shadow-xs transition-all"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otpDigits.some((d) => !d)}
                className="w-full py-4 rounded-full bg-[#581527] hover:bg-[#3F0E1B] text-white text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "VERIFYING..." : "VERIFY & ENTER STORE"}</span>
                <Check className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs font-sans pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setErrorMsg(null);
                  }}
                  className="text-[#8A304C] hover:text-[#581527] underline"
                >
                  Change Number
                </button>

                {resendTimer > 0 ? (
                  <span className="text-gray-400">Resend code in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setResendTimer(30);
                      setErrorMsg(null);
                    }}
                    className="text-[#AE3E64] font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {step === "success" && (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <p className="font-serif text-xl font-bold text-[#581527]">
                Authenticated Successfully
              </p>
              <p className="text-xs font-sans text-gray-500">
                Opening Rugby White store...
              </p>
            </div>
          )}

          {/* Bottom Guest Option */}
          <div className="text-center pt-2 border-t border-[#F4CEDF]">
            <button
              type="button"
              onClick={handleDismissGuest}
              className="text-xs font-sans font-medium text-[#8A304C] hover:text-[#581527] transition-colors"
            >
              Skip &amp; Browse as Guest →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
