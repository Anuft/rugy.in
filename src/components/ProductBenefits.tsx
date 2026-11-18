"use client";

import React from "react";
import { Sparkles, Scale, Droplets, HeartHandshake, Smile } from "lucide-react";
import { flagshipProduct } from "@/data/products";

export default function ProductBenefits() {
  const iconMap: Record<string, React.ReactNode> = {
    "01": <Sparkles className="w-5 h-5 stroke-[1.25]" />,
    "02": <Scale className="w-5 h-5 stroke-[1.25]" />,
    "03": <Droplets className="w-5 h-5 stroke-[1.25]" />,
    "04": <HeartHandshake className="w-5 h-5 stroke-[1.25]" />,
    "05": <Smile className="w-5 h-5 stroke-[1.25]" />,
  };

  return (
    <section id="benefits" className="py-24 sm:py-32 bg-[#F5F1E8] text-[#20251F] border-b border-[#EAE3D6] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#103B27]" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#103B27] font-semibold">
              OUR INTENTION
            </span>
            <span className="w-8 h-[1px] bg-[#103B27]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#103B27] leading-[1.1]">
            THE BEAUTY OF
            <span className="block italic font-light text-[#87967E]">
              THOUGHTFUL CARE.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#20251F]/70 font-light max-w-xl mx-auto leading-relaxed pt-2">
            A skincare experience centred around five mindful pillars of radiance, comfort and natural confidence.
          </p>
        </div>

        {/* 5-Item Editorial Benefit Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {flagshipProduct.benefits.map((benefit, idx) => {
            const isWide = idx >= 3; // Items 4 and 5 on large screens
            return (
              <div
                key={benefit.number}
                className={`relative p-8 sm:p-10 bg-[#FFFFFF] border border-[#EAE3D6] rounded-none transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-[#103B27] group flex flex-col justify-between ${
                  isWide ? "lg:col-span-1 xl:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#EAE3D6] group-hover:border-[#103B27]/20 transition-colors">
                    <span className="font-serif text-2xl font-light text-[#87967E] group-hover:text-[#103B27] transition-colors">
                      {benefit.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#F5F1E8] text-[#103B27] flex items-center justify-center group-hover:bg-[#103B27] group-hover:text-[#F5F1E8] transition-colors duration-300">
                      {iconMap[benefit.number] || <Sparkles className="w-5 h-5 stroke-[1.25]" />}
                    </div>
                  </div>

                  {/* Benefit Title */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#103B27] tracking-tight mb-3">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#20251F]/75 font-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom decorative accent */}
                <div className="mt-8 pt-4 border-t border-transparent group-hover:border-[#EAE3D6] transition-colors flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-[#87967E]">
                  <span className="w-2 h-[1px] bg-[#C5A880]" />
                  <span>THE ART OF SKINCARE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
