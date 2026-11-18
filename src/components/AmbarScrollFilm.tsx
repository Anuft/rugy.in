"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ShoppingBag, Sparkles, Check } from "lucide-react";
import { flagshipProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function AmbarScrollFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScroll = rect.height - window.innerHeight;
          const currentScroll = -rect.top;

          if (totalScroll > 0) {
            const rawProgress = currentScroll / totalScroll;
            const clamped = Math.max(0, Math.min(1, rawProgress));
            setProgress(clamped);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Precise, non-overlapping opacity curves for each beat
  const getBeatOpacity = (p: number, inStart: number, inEnd: number, outStart: number, outEnd: number) => {
    if (p < inStart || p > outEnd) return 0;
    if (p >= inEnd && p <= outStart) return 1;
    if (p < inEnd) return (p - inStart) / (inEnd - inStart);
    return 1 - (p - outStart) / (outEnd - outStart);
  };

  const beat1Opacity = getBeatOpacity(progress, 0.00, 0.02, 0.14, 0.17);
  const beat2Opacity = getBeatOpacity(progress, 0.19, 0.22, 0.34, 0.37);
  const beat3Opacity = getBeatOpacity(progress, 0.39, 0.42, 0.54, 0.57);
  const beat4Opacity = getBeatOpacity(progress, 0.59, 0.62, 0.74, 0.77);
  const beat5Opacity = getBeatOpacity(progress, 0.79, 0.82, 0.95, 0.98);

  // Compute jar position & transformations based on scroll progress
  let jarX = 0; // percentage offset
  let jarY = 0; // pixel offset
  let jarScale = 1;
  let jarRotate = 0;
  let jarOpacity = 1;

  if (isMobile) {
    // On mobile screens, keep jar centrally anchored without crashing into text
    jarX = 0;
    jarY = progress < 0.2 ? -40 : progress < 0.5 ? -20 : -30;
    jarScale = 0.85 + progress * 0.1;
    jarRotate = progress * 6;
    jarOpacity = progress > 0.96 ? Math.max(0, 1 - (progress - 0.96) / 0.03) : 0.85;
  } else {
    // Desktop Choreography (Ambar Studio reference)
    if (progress < 0.18) {
      jarX = 22;
      jarY = 0;
      jarScale = 1 + progress * 0.2;
      jarRotate = progress * 4;
    } else if (progress < 0.38) {
      const p = (progress - 0.18) / 0.2;
      jarX = 22 + p * 12; // 22% to 34%
      jarY = p * 10;
      jarScale = 1.05 + p * 0.08;
      jarRotate = 4 + p * 4;
    } else if (progress < 0.58) {
      const p = (progress - 0.38) / 0.2;
      jarX = 34 - p * 60; // moves to -26% (left)
      jarY = 10 - p * 20;
      jarScale = 1.13 - p * 0.05;
      jarRotate = 8 - p * 14;
    } else if (progress < 0.78) {
      const p = (progress - 0.58) / 0.2;
      jarX = -26 + p * 50; // moves to +24%
      jarY = -10 + p * 20;
      jarScale = 1.08 + p * 0.15;
      jarRotate = -6 + p * 8;
    } else if (progress <= 0.97) {
      const p = (progress - 0.78) / 0.19;
      jarX = 24 - p * 24; // recenters to 0
      jarY = 10 - p * 10;
      jarScale = 1.23 - p * 0.05;
      jarRotate = 2 - p * 2;
    } else {
      const p = (progress - 0.97) / 0.03;
      jarOpacity = Math.max(0, 1 - p * 2);
    }
  }

  // Is film sticky active?
  const isFilmVisible = progress < 0.985;

  return (
    <div ref={containerRef} className="relative z-10 w-full">
      {/* Top progress bar (Ambar .prog) */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#C5A880] z-50 transition-transform duration-75 origin-left pointer-events-none"
        style={{ transform: `scaleX(${progress})`, width: "100%" }}
      />

      {/* FIXED CONTINUOUS SCROLL-FILM CANVAS & STAGE (Ambar #film) */}
      <div
        className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-500 overflow-hidden ${
          isFilmVisible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ zIndex: 1 }}
      >
        {/* Background Film Tone: Deep Forest Green (#09291C) with Emerald Water Light */}
        <div className="absolute inset-0 bg-[#09291C]">
          {/* Subtle water caustics and atmospheric light */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(16,59,39,0.7)_0%,rgba(9,41,28,0.95)_70%,rgba(5,20,13,1)_100%)]" />

          {/* Golden Specular Ambient Glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#C5A880]/10 blur-[140px] transition-transform duration-1000"
            style={{
              transform: `translate(-50%, -50%) scale(${1 + progress * 0.4})`,
            }}
          />
        </div>

        {/* GIANT EDITORIAL BRAND WORDMARK BEHIND THE JAR */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
          <div
            className="font-serif text-[18vw] sm:text-[20vw] lg:text-[22vw] font-normal tracking-[0.08em] text-[#F5F1E8]/[0.04] whitespace-nowrap leading-none transition-transform duration-500 will-change-transform"
            style={{
              transform: `scale(${1 + progress * 0.15}) translateY(${progress * -30}px)`,
            }}
          >
            RUGBY WHITE
          </div>
        </div>

        {/* THE PRODUCT JAR STAGE */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${jarX}%, ${jarY}px, 0) scale(${jarScale}) rotate(${jarRotate}deg)`,
            opacity: jarOpacity,
          }}
        >
          {/* Water reflection ring below jar */}
          <div className="absolute bottom-[20%] w-[280px] sm:w-[420px] h-[30px] rounded-full bg-[#030d08]/90 blur-lg -z-10" />

          {/* Real Cutout Jar Presentation */}
          <div className="relative w-[260px] h-[340px] sm:w-[380px] sm:h-[480px] md:w-[460px] md:h-[560px] flex items-center justify-center">
            <Image
              src="/images/rugby-white-jar-hero.png"
              alt="Rugby White 10 Days Challenge Skincare Jar"
              fill
              priority
              className="object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.85)]"
            />
          </div>
        </div>

        {/* Animated Scroll Hint */}
        <div
          className={`absolute left-8 sm:left-14 bottom-10 z-30 flex items-center gap-3 text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-[#F5F1E8]/80 transition-opacity duration-500 ${
            progress > 0.08 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span>SCROLL</span>
          <div className="w-[1.5px] h-7 bg-gradient-to-b from-[#C5A880] to-transparent animate-bounce" />
        </div>
      </div>

      {/* THE BEATS (Narrative Text Overlays in Clean Air with Guaranteed Zero Overlap) */}
      <div className="relative z-20 pointer-events-none">
        {/* BEAT 1: HERO OPENING */}
        <div
          className="fixed inset-0 flex items-center z-20 px-6 sm:px-12 lg:px-20 transition-transform duration-500"
          style={{
            opacity: beat1Opacity,
            pointerEvents: beat1Opacity > 0.5 ? "auto" : "none",
            transform: `translateY(${(1 - beat1Opacity) * 16}px)`,
          }}
        >
          <div className="max-w-xl text-left space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#C5A880]" />
              <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#E4D2B8] font-semibold">
                RUGBY WHITE · THE ART OF SKINCARE
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7xl tracking-tight text-[#F5F1E8] leading-[1.05]">
              GLOW IS NOT A TREND.
              <span className="block italic text-[#E4D2B8] font-light mt-1">
                IT&apos;S A FEELING.
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#EAE3D6]/85 font-light leading-relaxed max-w-lg">
              Discover the beauty of thoughtful skincare. A refined daily ritual designed to bring care, confidence and simplicity into every moment.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => addToCart(flagshipProduct, 1)}
                className="px-8 py-4 bg-[#F5F1E8] text-[#103B27] text-xs font-sans tracking-[0.25em] uppercase font-semibold hover:bg-[#C5A880] hover:text-[#09291C] transition-all shadow-xl cursor-pointer"
              >
                ADD TO BAG · ₹{flagshipProduct.price}
              </button>
              <a
                href="#formula"
                className="text-xs font-sans tracking-[0.25em] uppercase text-[#E4D2B8] hover:text-[#FFFFFF] border-b border-[#C5A880]/60 pb-1 transition-colors"
              >
                DISCOVER THE RITUAL ↓
              </a>
            </div>
          </div>
        </div>

        {/* BEAT 2: BEYOND THE ORDINARY */}
        <div
          id="b-formula"
          className="fixed inset-0 flex items-center z-20 px-6 sm:px-12 lg:px-20 transition-transform duration-500"
          style={{
            opacity: beat2Opacity,
            pointerEvents: beat2Opacity > 0.5 ? "auto" : "none",
            transform: `translateY(${(1 - beat2Opacity) * 16}px)`,
          }}
        >
          <div className="max-w-xl text-left space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#C5A880]" />
              <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#E4D2B8] font-semibold">
                OUR PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#F5F1E8] leading-[1.05]">
              Beyond the
              <span className="block italic text-[#E4D2B8] font-light mt-1">
                ordinary.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#EAE3D6]/85 font-light leading-relaxed max-w-lg">
              Your skin deserves more than a routine. It deserves attention, intention and care. At RUGBY WHITE, we believe that beauty lives in the details — in the rituals we create and the confidence we carry.
            </p>

            <div className="flex items-center gap-6 text-xs font-sans text-[#87967E] tracking-widest uppercase pt-2">
              <span>LESS NOISE</span>
              <span>•</span>
              <span>MORE CARE</span>
              <span>•</span>
              <span>PARABEN FREE</span>
            </div>
          </div>
        </div>

        {/* BEAT 3: INTRODUCING THE 10 DAYS CHALLENGE */}
        <div
          id="b-concern"
          className="fixed inset-0 flex items-center justify-end z-20 px-6 sm:px-12 lg:px-20 transition-transform duration-500"
          style={{
            opacity: beat3Opacity,
            pointerEvents: beat3Opacity > 0.5 ? "auto" : "none",
            transform: `translateY(${(1 - beat3Opacity) * 16}px)`,
          }}
        >
          <div className="max-w-xl text-left sm:text-right space-y-6">
            <div className="flex items-center justify-start sm:justify-end gap-3">
              <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#E4D2B8] font-semibold">
                INTRODUCING
              </span>
              <span className="w-8 h-[2px] bg-[#C5A880]" />
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#F5F1E8] leading-[1.05]">
              The 10 Days
              <span className="block italic text-[#E4D2B8] font-light mt-1">
                Challenge.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#EAE3D6]/85 font-light leading-relaxed max-w-lg sm:ml-auto">
              A new chapter in your skincare ritual. Make every day a moment of self-care. Embrace consistency, discover your routine and let your confidence take centre stage.
            </p>

            <div className="inline-block px-4 py-2 bg-[#103B27]/80 border border-[#C5A880]/50 text-xs font-sans text-[#E4D2B8] tracking-[0.25em] uppercase font-medium">
              YOUR SKIN. YOUR RITUAL. YOUR MOMENT.
            </div>
          </div>
        </div>

        {/* BEAT 4: A RITUAL, REDEFINED */}
        <div
          id="b-use"
          className="fixed inset-0 flex items-center z-20 px-6 sm:px-12 lg:px-20 transition-transform duration-500"
          style={{
            opacity: beat4Opacity,
            pointerEvents: beat4Opacity > 0.5 ? "auto" : "none",
            transform: `translateY(${(1 - beat4Opacity) * 16}px)`,
          }}
        >
          <div className="max-w-xl text-left space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#C5A880]" />
              <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#E4D2B8] font-semibold">
                A RITUAL, REDEFINED
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#F5F1E8] leading-[1.05]">
              Prepare. Apply.
              <span className="block italic text-[#E4D2B8] font-light mt-1">
                Embrace.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#EAE3D6]/85 font-light leading-relaxed max-w-lg">
              Begin with clean, refreshed skin. Introduce Rugby White into your skincare routine, massage gently and make every application a moment of care.
            </p>

            <div className="p-4 bg-[#103B27]/60 border border-[#C5A880]/40 max-w-md">
              <span className="font-serif italic text-sm text-[#E4D2B8] block">
                &ldquo;Thoughtful choices. A considered skincare experience.&rdquo;
              </span>
            </div>
          </div>
        </div>

        {/* BEAT 5: BEAUTY IS PERSONAL */}
        <div
          id="b-result"
          className="fixed inset-0 flex items-center justify-end z-20 px-6 sm:px-12 lg:px-20 transition-transform duration-500"
          style={{
            opacity: beat5Opacity,
            pointerEvents: beat5Opacity > 0.5 ? "auto" : "none",
            transform: `translateY(${(1 - beat5Opacity) * 16}px)`,
          }}
        >
          <div className="max-w-xl text-left sm:text-right space-y-6">
            <div className="flex items-center justify-start sm:justify-end gap-3">
              <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#E4D2B8] font-semibold">
                BEAUTY IS PERSONAL
              </span>
              <span className="w-8 h-[2px] bg-[#C5A880]" />
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#F5F1E8] leading-[1.05]">
              Care in every detail.
              <span className="block italic text-[#E4D2B8] font-light mt-1">
                Confidence in every moment.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#EAE3D6]/85 font-light leading-relaxed max-w-lg sm:ml-auto">
              There is no need to follow every trend. No need to be anything other than yourself. Just thoughtful care, everyday rituals and confidence that feels entirely your own.
            </p>

            <div className="pt-2 flex justify-start sm:justify-end">
              <a
                href="#shop"
                className="px-8 py-4 bg-[#C5A880] text-[#09291C] text-xs font-sans tracking-[0.25em] uppercase font-bold hover:bg-[#E4D2B8] transition-colors shadow-2xl flex items-center gap-2"
              >
                <span>DISCOVER RUGBY WHITE</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* TALL SCROLL TRACK */}
      <div className="relative w-full h-[400vh] pointer-events-none">
        {/* Anchors for direct jumping with comfortable scroll padding */}
        <div id="top" className="absolute top-0" />
        <div id="formula" className="absolute top-[22%]" />
        <div id="spots" className="absolute top-[44%]" />
        <div id="ritual-step" className="absolute top-[66%]" />
        <div id="result" className="absolute top-[86%]" />
      </div>
    </div>
  );
}
