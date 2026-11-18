import React from "react";
import { Check, ShieldCheck, Heart, Sparkles, Leaf } from "lucide-react";
import { flagshipProduct } from "@/data/products";

export default function PurityPhilosophy() {
  const pillars = [
    {
      title: "PARABEN FREE",
      detail: "Clean formulation crafted without synthetic parabens.",
      icon: <Leaf className="w-6 h-6 stroke-[1.25]" />,
    },
    {
      title: "SULPHATE FREE",
      detail: "Non-stripping ingredients that protect natural lipid moisture.",
      icon: <Sparkles className="w-6 h-6 stroke-[1.25]" />,
    },
    {
      title: "CRUELTY FREE",
      detail: "Never tested on animals. Ethically and mindfully developed.",
      icon: <Heart className="w-6 h-6 stroke-[1.25]" />,
    },
    {
      title: "NO HARSH CHEMICALS",
      detail: "Pure skin respect with no artificial heavy coloring dyes.",
      icon: <ShieldCheck className="w-6 h-6 stroke-[1.25]" />,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#103B27] text-[#F5F1E8] border-b border-[#164E34] overflow-hidden relative">
      {/* Subtle background ambient halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#09291C] rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#E4D2B8] font-medium">
              PURITY PHILOSOPHY
            </span>
            <span className="w-8 h-[1px] bg-[#C5A880]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-[#F5F1E8]">
            LESS NOISE.
            <span className="block italic text-[#E4D2B8] font-light mt-1">
              MORE CARE.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#EAE3D6]/80 font-light max-w-lg mx-auto leading-relaxed pt-2">
            Thoughtful choices. A considered skincare experience.
          </p>
        </div>

        {/* 4 Circular Visual Elements with Delicate Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="flex flex-col items-center text-center p-8 bg-[#09291C]/70 border border-[#C5A880]/30 hover:border-[#C5A880] transition-all duration-500 group shadow-lg"
            >
              {/* Circular Emblem */}
              <div className="relative w-24 h-24 mb-6 rounded-full flex items-center justify-center border border-[#C5A880]/40 group-hover:border-[#E4D2B8] transition-colors duration-500">
                {/* Outer spinning ring on hover */}
                <div className="absolute inset-1 rounded-full border border-dashed border-[#87967E]/40 group-hover:border-[#C5A880] transition-all duration-700" />
                <div className="text-[#C5A880] group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl text-[#F5F1E8] tracking-wider mb-2">
                {pillar.title}
              </h3>

              {/* Detail */}
              <p className="text-xs text-[#EAE3D6]/75 font-sans font-light leading-relaxed max-w-[220px]">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Ingredient Transparency Note */}
        <div className="mt-16 pt-8 border-t border-[#164E34] text-center">
          <p className="font-serif italic text-sm text-[#E4D2B8] max-w-xl mx-auto">
            &ldquo;We formulate with honesty: clear declarations, no artificial claims, and genuine respect for all skin textures.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
