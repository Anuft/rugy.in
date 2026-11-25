"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Phone, Mail, Lock, ArrowRight, ShieldCheck, Check, Sparkles, MessageCircle, LogOut } from "lucide-react";
import RugbyWhiteLogo from "@/components/RugbyWhiteLogo";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

export default function CustomerLoginPage() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");

  // Form Fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Authenticated Member State (simulated client session)
  const [loggedInUser, setLoggedInUser] = useState<{
    name: string;
    contact: string;
  } | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rw_customer_session");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (loginMethod === "phone") {
        if (!phoneNumber || phoneNumber.length < 10) {
          setErrorMsg("Please enter a valid 10-digit mobile number.");
          return;
        }
        const user = {
          name: fullName || "Valued Client",
          contact: `+91 ${phoneNumber.replace(/\D/g, "")}`,
        };
        setLoggedInUser(user);
        if (typeof window !== "undefined") {
          localStorage.setItem("rw_customer_session", JSON.stringify(user));
        }
      } else {
        if (!email || !password) {
          setErrorMsg("Please enter your email and password.");
          return;
        }
        const user = {
          name: fullName || email.split("@")[0],
          contact: email,
        };
        setLoggedInUser(user);
        if (typeof window !== "undefined") {
          localStorage.setItem("rw_customer_session", JSON.stringify(user));
        }
      }
    }, 400);
  };

  const handleSignOut = () => {
    setLoggedInUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("rw_customer_session");
    }
  };

  const whatsappDirectLoginUrl = `https://wa.me/91${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hello Rugby White! 🌿 I would like to sign in to my customer member account."
  )}`;

  return (
    <div className="min-h-screen bg-[#FEF7FB] text-[#2A1018] pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        {/* Brand Monogram */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-block">
            <RugbyWhiteLogo variant="dark" size="md" />
          </div>
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            CLIENT PRIVILEGE PORTAL
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#F4CEDF] shadow-xl p-7 sm:p-9">
          {loggedInUser ? (
            /* ------------------------------------------------------------- */
            /* LOGGED IN MEMBER DASHBOARD */
            /* ------------------------------------------------------------- */
            <div className="space-y-6">
              <div className="text-center space-y-1 pb-4 border-b border-[#F4CEDF]">
                <div className="w-16 h-16 rounded-full bg-[#581527] text-[#FEF7FB] mx-auto flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                  {loggedInUser.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#581527] pt-2">
                  Welcome, {loggedInUser.name}
                </h2>
                <p className="text-xs font-sans text-[#8A304C]">
                  {loggedInUser.contact} · Privilege Member
                </p>
              </div>

              {/* Ritual Card */}
              <div className="p-4 rounded-2xl bg-[#FEF7FB] border border-[#F4CEDF] space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-bold text-[#581527] uppercase tracking-wider">
                    CURRENT RITUAL
                  </span>
                  <span className="text-[10px] text-[#059669] bg-[#059669]/10 font-bold px-2 py-0.5 rounded-full uppercase">
                    Active Routine
                  </span>
                </div>
                <p className="font-serif text-lg font-bold text-[#581527]">
                  Rugby White Night Cream (35g)
                </p>
                <p className="text-xs font-sans text-[#8A304C]">
                  Complimentary Pan-India Air Express Delivery on all refills.
                </p>
              </div>

              {/* Member Perks */}
              <div className="space-y-2 text-xs font-sans text-[#581527]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#AE3E64]" />
                  <span>1-on-1 Skin Concierge Advice via WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                  <span>Priority batch allocation for fresh nightly jars</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/91${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Rugby White! 🌿 I am signed in as ${loggedInUser.name}. I would like to place an order for the Rugby White Night Cream 35g (₹599).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans font-bold tracking-[0.18em] uppercase transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>ORDER REFILL ON WHATSAPP</span>
                </a>

                <button
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-full border border-[#F4CEDF] hover:bg-[#FEF7FB] text-[#8A304C] text-xs font-sans font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* ------------------------------------------------------------- */
            /* SIGN IN / CREATE ACCOUNT FORM */
            /* ------------------------------------------------------------- */
            <div className="space-y-6">
              {/* Tab Selector: Sign In / Create Account */}
              <div className="flex border-b border-[#F4CEDF]">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signin");
                    setErrorMsg(null);
                  }}
                  className={`flex-1 pb-3 text-xs font-sans font-bold uppercase tracking-wider text-center cursor-pointer border-b-2 transition-all ${
                    authMode === "signin"
                      ? "border-[#581527] text-[#581527]"
                      : "border-transparent text-[#8A304C] hover:text-[#581527]"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setErrorMsg(null);
                  }}
                  className={`flex-1 pb-3 text-xs font-sans font-bold uppercase tracking-wider text-center cursor-pointer border-b-2 transition-all ${
                    authMode === "signup"
                      ? "border-[#581527] text-[#581527]"
                      : "border-transparent text-[#8A304C] hover:text-[#581527]"
                  }`}
                >
                  New Account
                </button>
              </div>

              {/* Method Switcher */}
              <div className="flex p-1 rounded-xl bg-[#FEF7FB] border border-[#F4CEDF]">
                <button
                  type="button"
                  onClick={() => setLoginMethod("phone")}
                  className={`flex-1 py-2 text-xs font-sans font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginMethod === "phone"
                      ? "bg-[#581527] text-white shadow-xs"
                      : "text-[#8A304C] hover:text-[#581527]"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Mobile OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 py-2 text-xs font-sans font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginMethod === "email"
                      ? "bg-[#581527] text-white shadow-xs"
                      : "text-[#8A304C] hover:text-[#581527]"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === "signup" && (
                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#581527] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Anjali Nair"
                      className="w-full px-4 py-3 rounded-xl border border-[#F4CEDF] bg-[#FEF7FB] text-xs font-sans focus:outline-none focus:border-[#581527] focus:bg-white transition-colors"
                    />
                  </div>
                )}

                {loginMethod === "phone" ? (
                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#581527] mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#F4CEDF] bg-[#FEF7FB] text-xs font-sans font-semibold text-[#8A304C]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="98765 43210"
                        className="w-full px-4 py-3 rounded-r-xl border border-[#F4CEDF] bg-[#FEF7FB] text-xs font-sans tracking-widest focus:outline-none focus:border-[#581527] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#581527] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#F4CEDF] bg-[#FEF7FB] text-xs font-sans focus:outline-none focus:border-[#581527] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#581527] mb-1.5">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-[#F4CEDF] bg-[#FEF7FB] text-xs font-sans focus:outline-none focus:border-[#581527] focus:bg-white transition-colors"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#581527] hover:bg-[#3F0E1B] text-white text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Authenticating..."
                    : authMode === "signin"
                    ? "Sign In to Ritual"
                    : "Create Privilege Account"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#F4CEDF]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-sans tracking-widest">
                  <span className="bg-white px-3 text-[#8A304C]">or instant sign in</span>
                </div>
              </div>

              {/* 1-Click WhatsApp Login Button */}
              <a
                href={whatsappDirectLoginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans font-bold tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Sign In via WhatsApp</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-sans text-[#8A304C] hover:text-[#581527] transition-colors"
          >
            ← Return to Rugby White Store
          </Link>
        </div>
      </div>
    </div>
  );
}
