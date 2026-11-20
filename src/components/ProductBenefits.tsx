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
    <section id="benefits" className="py-24 sm:py-32 bg-[#FEF7FB] text-[#2A1018] border-b border-[#FDEAF3] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#581527]" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#581527] font-semibold">
              OUR INTENTION
            </span>
            <span className="w-8 h-[1px] bg-[#581527]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#581527] leading-[1.1]">
            THE BEAUTY OF
            <span className="block italic font-light text-[#8A304C]">
              THOUGHTFUL CARE.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#2A1018]/70 font-light max-w-xl mx-auto leading-relaxed pt-2">
            Five core actions for radiance, barrier health, and confidence.
          </p>
        </div>

        {/* 5-Item Editorial Benefit Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {flagshipProduct.benefits.map((benefit, idx) => {
            const isWide = idx >= 3; // Items 4 and 5 on large screens
            return (
              <div
                key={benefit.number}
                className={`relative p-8 sm:p-10 bg-[#FFFFFF] border border-[#FDEAF3] rounded-none transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-[#581527] group flex flex-col justify-between ${
                  isWide ? "lg:col-span-1 xl:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#FDEAF3] group-hover:border-[#581527]/20 transition-colors">
                    <span className="font-serif text-2xl font-light text-[#8A304C] group-hover:text-[#581527] transition-colors">
                      {benefit.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FEF7FB] text-[#581527] flex items-center justify-center group-hover:bg-[#581527] group-hover:text-[#FEF7FB] transition-colors duration-300">
                      {iconMap[benefit.number] || <Sparkles className="w-5 h-5 stroke-[1.25]" />}
                    </div>
                  </div>

                  {/* Benefit Title */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#581527] tracking-tight mb-3">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#2A1018]/75 font-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom decorative accent */}
                <div className="mt-8 pt-4 border-t border-transparent group-hover:border-[#FDEAF3] transition-colors flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-[#8A304C]">
                  <span className="w-2 h-[1px] bg-[#AE3E64]" />
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
