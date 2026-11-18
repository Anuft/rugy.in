"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("loading");

    // Client-side simulation of newsletter subscription
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#EAE3D6] text-[#20251F] border-b border-[#D8CBB7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-[#103B27]" />
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#103B27] font-semibold">
            THE INNER SANCTUARY
          </span>
          <span className="w-8 h-[1px] bg-[#103B27]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#103B27] tracking-tight leading-[1.1]">
          THE ART OF
          <span className="block italic font-light text-[#87967E]">
            EVERYDAY SKINCARE.
          </span>
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#20251F]/75 font-light max-w-xl mx-auto leading-relaxed">
          Glow is not a trend. It&apos;s a feeling. Join our inner sanctuary for thoughtful skincare guidance and mindful rituals.
        </p>

        {status === "success" ? (
          <div className="p-6 bg-[#FFFFFF] border border-[#103B27] max-w-md mx-auto shadow-md space-y-2 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-[#103B27]/10 text-[#103B27] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#103B27]">Welcome to Rugby White</h3>
            <p className="text-xs text-[#20251F]/75 font-sans leading-relaxed">
              Thank you for subscribing. You will receive our seasonal skincare journal and ritual invitations directly in your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2 shadow-md">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3.5 bg-[#FFFFFF] border border-[#D8CBB7] text-xs font-sans text-[#20251F] placeholder-[#87967E] focus:outline-none focus:border-[#103B27] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3.5 bg-[#103B27] text-[#F5F1E8] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#09291C] transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-75"
              >
                <span>{status === "loading" ? "JOINING..." : "JOIN THE COMMUNITY"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {status === "error" && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-red-700 font-sans pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-[10px] text-[#87967E] font-sans tracking-wide pt-1">
              We respect your inbox. Unsubscribe at any time with one click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
