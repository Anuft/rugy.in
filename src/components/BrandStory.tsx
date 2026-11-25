import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandStory() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#3F0E1B] text-[#FEF7FB] overflow-hidden">
      {/* Background Photography from Instagram with atmospheric dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/instagram/DZSAtQIxL-y.jpg"
          alt="Rugby White Skincare Sanctuary"
          fill
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3F0E1B] via-[#3F0E1B]/90 to-[#3F0E1B]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-3">
            <span className="w-10 h-[1.5px] bg-[#AE3E64]" />
            <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#EA90B5] font-medium">
              OUR PHILOSOPHY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-[#FEF7FB]">
            BEAUTY IS PERSONAL.
            <span className="block italic text-[#EA90B5] font-light mt-2 text-2xl sm:text-4xl">
              There is no need to follow every trend.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#FDEAF3]/90 font-sans font-light leading-relaxed max-w-xl">
            Thoughtful care. Pure botanical consistency. Confidence that feels entirely your own.
          </p>

          <div className="p-4 sm:p-6 bg-[#581527]/80 border border-[#AE3E64]/60 max-w-xl">
            <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-semibold block mb-1">
              THE RUGBY WHITE PROMISE
            </span>
            <p className="font-serif text-lg text-[#FEF7FB] tracking-wide">
              CARE IN EVERY DETAIL. CONFIDENCE IN EVERY MOMENT.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/about"
              className="px-8 py-4 bg-[#FEF7FB] text-[#3F0E1B] text-xs font-sans tracking-[0.25em] uppercase font-semibold hover:bg-[#AE3E64] transition-colors shadow-lg inline-flex items-center gap-2"
            >
              <span>DISCOVER RUGBY WHITE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products/10-days-challenge"
              className="text-xs font-sans tracking-[0.2em] uppercase text-[#EA90B5] hover:text-[#FFFFFF] border-b border-[#AE3E64] pb-1 transition-colors"
            >
              EXPERIENCE RUGBY WHITE NIGHT CREAM
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
