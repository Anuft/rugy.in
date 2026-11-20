import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandIntro() {
  return (
    <section className="py-24 sm:py-32 bg-[#FEF7FB] text-[#2A1018] border-b border-[#FDEAF3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Headline & Brand Description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3">
              <span className="w-10 h-[1.5px] bg-[#581527]" />
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#581527] font-semibold">
                OUR PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[#581527]">
              BEYOND THE ORDINARY.
              <span className="block mt-3 italic font-light text-[#8A304C] text-2xl sm:text-3xl md:text-4xl">
                Your skin deserves attention, intention and care.
              </span>
            </h2>

            {/* Animated decorative dividing line */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-[#581527] via-[#AE3E64] to-transparent" />

            <p className="text-base sm:text-lg text-[#2A1018]/80 font-sans font-light leading-relaxed max-w-xl">
              Thoughtful botanical skincare formulated to protect your skin barrier and restore natural radiance — with zero harsh chemicals.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase font-medium text-[#581527] hover:text-[#3F0E1B] group"
              >
                <span className="border-b border-[#581527] pb-1 group-hover:border-[#AE3E64] transition-colors">
                  READ OUR FULL STORY
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Natural Skincare Lifestyle Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Back decorative frame */}
              <div className="absolute -inset-4 border border-[#F4CEDF] pointer-events-none -z-0 translate-x-3 translate-y-3" />

              <div className="relative z-10 aspect-[4/5] overflow-hidden bg-[#FFFFFF] shadow-xl border border-[#F4CEDF] p-6 flex items-center justify-center">
                <Image
                  src="/images/rugby-skin-revival.jpg"
                  alt="Rugby White Skin Revival Botanical Night Cream"
                  fill
                  className="object-contain p-6 transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Editorial Caption */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#FFFFFF] p-5 shadow-xl max-w-[240px] z-20 border-l-2 border-[#581527]">
                <p className="font-serif italic text-base text-[#581527]">
                  &ldquo;A moment of stillness in your everyday routine.&rdquo;
                </p>
                <span className="block mt-2 text-[10px] tracking-[0.25em] uppercase text-[#8A304C] font-sans">
                  RUGBY WHITE RITUAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
