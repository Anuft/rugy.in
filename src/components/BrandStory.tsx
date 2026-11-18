import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandStory() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#09291C] text-[#F5F1E8] overflow-hidden">
      {/* Background Photography from Instagram with atmospheric dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/instagram/DZSAtQIxL-y.jpg"
          alt="Rugby White Skincare Sanctuary"
          fill
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09291C] via-[#09291C]/90 to-[#09291C]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-3">
            <span className="w-10 h-[1.5px] bg-[#C5A880]" />
            <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#E4D2B8] font-medium">
              OUR PHILOSOPHY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-[#F5F1E8]">
            BEAUTY IS PERSONAL.
            <span className="block italic text-[#E4D2B8] font-light mt-2 text-2xl sm:text-4xl">
              There is no need to follow every trend.
            </span>
          </h2>

          <div className="space-y-5 text-sm sm:text-base text-[#EAE3D6]/85 font-sans font-light leading-relaxed max-w-2xl">
            <p className="font-serif italic text-lg sm:text-xl text-[#F5F1E8]">
              &ldquo;No need to be anything other than yourself.&rdquo;
            </p>
            <p>
              Just thoughtful care, everyday rituals and confidence that feels entirely your own.
            </p>
            <p>
              At RUGBY WHITE, we believe that beauty lives in the details — in the rituals we create and the confidence we carry. Your skin deserves more than a routine. It deserves attention, intention and care.
            </p>
          </div>

          <div className="p-4 sm:p-6 bg-[#103B27]/80 border border-[#C5A880]/60 max-w-xl">
            <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-1">
              THE RUGBY WHITE PROMISE
            </span>
            <p className="font-serif text-lg text-[#F5F1E8] tracking-wide">
              CARE IN EVERY DETAIL. CONFIDENCE IN EVERY MOMENT.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/about"
              className="px-8 py-4 bg-[#F5F1E8] text-[#09291C] text-xs font-sans tracking-[0.25em] uppercase font-semibold hover:bg-[#C5A880] transition-colors shadow-lg inline-flex items-center gap-2"
            >
              <span>DISCOVER RUGBY WHITE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products/10-days-challenge"
              className="text-xs font-sans tracking-[0.2em] uppercase text-[#E4D2B8] hover:text-[#FFFFFF] border-b border-[#C5A880] pb-1 transition-colors"
            >
              EXPERIENCE THE 10 DAYS CHALLENGE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
