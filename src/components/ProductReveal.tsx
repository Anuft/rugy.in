"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { flagshipProduct } from "@/data/products";

export default function ProductReveal() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="product-reveal"
      className="relative min-h-[95vh] py-28 sm:py-36 bg-[#09291C] text-[#F5F1E8] overflow-hidden flex items-center justify-center"
    >
      {/* Background: Natural Deep Emerald Water Surface with Reflections */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/instagram/DYWq6HcIte1.jpg"
          alt="Natural Water Ripples and Botanicals"
          fill
          className="object-cover object-center opacity-25 mix-blend-luminosity scale-110"
        />
        {/* Deep Green Luxury Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09291C] via-[#09291C]/80 to-[#09291C]" />

        {/* Ambient Botanical Shadows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#103B27]/40 blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-[120px]" />
      </div>

      {/* Floating Water Droplets (CSS animated) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-[15%] w-3 h-3 rounded-full bg-white/40 blur-[0.5px] animate-bounce duration-1000" />
        <div className="absolute top-1/3 right-[18%] w-2.5 h-2.5 rounded-full bg-white/50 blur-[0.5px] animate-pulse" />
        <div className="absolute bottom-1/3 left-[22%] w-4 h-4 rounded-full bg-white/30 blur-[1px] animate-bounce duration-700" />
        <div className="absolute bottom-1/4 right-[25%] w-2 h-2 rounded-full bg-white/60 blur-[0.5px] animate-pulse" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#C5A880]" />
          <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#E4D2B8] font-medium">
            THE SIGNATURE CREATION
          </span>
          <span className="w-8 h-[1px] bg-[#C5A880]" />
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-[#F5F1E8] max-w-4xl mx-auto">
          MEET YOUR NEW
          <span className="block italic text-[#E4D2B8] font-light mt-1 sm:mt-2">
            SKINCARE RITUAL.
          </span>
        </h2>

        {/* Central Product Jar Presentation */}
        <div
          className="relative my-8 sm:my-14 flex flex-col items-center justify-center cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Circular Water Ripple Glow behind jar */}
          <div className="absolute w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full border border-[#C5A880]/20 animate-ping opacity-20 pointer-events-none" />
          <div className="absolute w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#164E34]/80 to-[#C5A880]/20 blur-3xl -z-10" />

          {/* Water reflection ring below */}
          <div className="absolute bottom-4 w-[280px] sm:w-[400px] h-[35px] rounded-full bg-[#05160E]/90 blur-md -z-10" />

          {/* Jar Image */}
          <div
            className={`relative w-[280px] h-[350px] sm:w-[380px] sm:h-[480px] md:w-[440px] md:h-[540px] transition-all duration-700 ease-out ${
              isHovered ? "scale-105 -translate-y-2" : "scale-100"
            }`}
          >
            <Image
              src="/images/rugby-white-jar.png"
              alt="Rugby White 10 Days Challenge Skincare Jar"
              fill
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
            />
          </div>

          {/* Spec details underneath jar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#87967E] font-sans tracking-widest uppercase">
            <span>65G / 2.29 OZ</span>
            <span>•</span>
            <span>10 DAYS RITUAL FORMULA</span>
            <span>•</span>
            <span>PAN-INDIA DISPATCH</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#EAE3D6]/85 font-light max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
          Discover the Rugby White 10 Days Challenge and experience a thoughtful daily skincare routine crafted to celebrate your authentic, healthy complexion.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products/10-days-challenge"
            className="w-full sm:w-auto px-10 py-4 bg-[#C5A880] text-[#09291C] text-xs font-sans tracking-[0.25em] uppercase font-semibold hover:bg-[#E4D2B8] transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-3 group"
          >
            <span>EXPLORE THE PRODUCT</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 border border-[#F5F1E8]/30 text-[#F5F1E8] text-xs font-sans tracking-[0.25em] uppercase font-medium hover:border-[#F5F1E8] transition-colors"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
