"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Sparkles } from "lucide-react";
import { flagshipProduct } from "@/data/products";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#3F0E1B] text-[#FEF7FB] pt-24 pb-16">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/instagram/DZSAtQIxL-y.jpg"
          alt="Rugby White Skincare Campaign"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        {/* Deep emerald luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3F0E1B]/80 via-[#3F0E1B]/70 to-[#3F0E1B]" />
        {/* Soft radial warm glow for sunlight effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#AE3E64]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-160px)]">
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Monogram / Eyebrow */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-3">
              <span className="w-8 h-[1px] bg-[#AE3E64]" />
              <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] uppercase text-[#EA90B5] font-medium">
                SIGNATURE NIGHT RITUAL
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-[-0.02em] font-normal leading-[1.05] text-[#FEF7FB]">
              GLOW THAT SPEAKS
              <span className="block italic font-light text-[#EA90B5] mt-1 sm:mt-2">
                BEFORE YOU DO.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#FDEAF3]/80 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed tracking-wide">
              Botanical hydration and barrier care for clear, glowing, radiant skin.
            </p>

            {/* CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5">
              <a
                href="#shop"
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-[#FFFFFF] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 text-center shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                <span>ORDER ON WHATSAPP · ₹599</span>
              </a>
              <a
                href="#face-reviews"
                className="w-full sm:w-auto px-8 py-4 border border-[#FEF7FB]/40 text-[#FEF7FB] text-xs font-medium tracking-[0.25em] uppercase hover:border-[#AE3E64] hover:text-[#AE3E64] transition-all duration-300 text-center"
              >
                VIEW CLIENT REVIEWS
              </a>
            </div>

            {/* Campaign Attributes pills */}
            <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] text-[#8A304C] tracking-wider uppercase font-sans">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AE3E64]" />
                <span>PARABEN FREE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AE3E64]" />
                <span>SULPHATE FREE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AE3E64]" />
                <span>CRUELTY FREE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Jar Presentation */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6 lg:py-0">
            {/* Ambient Backlight Halo */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#8A304C]/60 to-[#AE3E64]/20 blur-3xl -z-10" />

            {/* Central Product Jar Container with smooth float effect */}
            <div className="relative group transition-transform duration-700 hover:scale-105">
              <div className="relative w-[280px] h-[350px] sm:w-[360px] sm:h-[450px] flex items-center justify-center">
                <Image
                  src="/images/rugby-skin-revival-jar.png"
                  alt="Rugby White Skin Revival Skincare Jar"
                  width={420}
                  height={500}
                  priority
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating Badge Tag */}
              <div className="absolute -bottom-2 -left-2 sm:-left-6 bg-[#3F0E1B]/90 backdrop-blur-md border border-[#AE3E64]/30 px-4 py-2.5 rounded-none shadow-xl flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#AE3E64]" />
                <div className="text-left font-sans">
                  <span className="block text-[10px] text-[#8A304C] uppercase tracking-widest">
                    FLAGSHIP RITUAL
                  </span>
                  <span className="text-xs text-[#FEF7FB] font-medium">
                    Night Cream • ₹599
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8A304C] hover:text-[#FEF7FB] transition-colors cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans">
          SCROLL TO DISCOVER
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce stroke-[1.5]" />
      </div>
    </section>
  );
}
