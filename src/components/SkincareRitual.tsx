"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, Sparkles } from "lucide-react";
import { flagshipProduct } from "@/data/products";

export default function SkincareRitual() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = flagshipProduct.ritualSteps;

  return (
    <section id="ritual" className="py-24 sm:py-32 bg-[#EAE3D6] text-[#20251F] border-b border-[#D8CBB7] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#103B27]" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#103B27] font-semibold">
              MINDFUL PRACTICE
            </span>
            <span className="w-8 h-[1px] bg-[#103B27]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#103B27] leading-[1.1]">
            A RITUAL,
            <span className="block italic font-light text-[#87967E]">
              REDEFINED.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#20251F]/75 font-light max-w-lg mx-auto leading-relaxed">
            Three simple, intentional steps designed to bring care, confidence and simplicity into every moment.
          </p>
        </div>

        {/* 3-Step Horizontal Editorial Grid on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`group cursor-pointer bg-[#F5F1E8] border transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                  isActive ? "border-[#103B27] ring-1 ring-[#103B27]" : "border-[#D8CBB7]"
                }`}
              >
                {/* Step Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#D8CBB7]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#09291C]/80 backdrop-blur-md px-3 py-1 text-[11px] font-sans tracking-[0.25em] uppercase text-[#F5F1E8]">
                    {step.step}
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#87967E] font-sans block">
                      STAGE 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl text-[#103B27] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#20251F]/80 font-light leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between text-[11px] font-sans text-[#87967E]">
                    <span className="tracking-wider uppercase">MORNING &amp; EVENING</span>
                    <span className="font-serif italic text-sm text-[#103B27]">0{idx + 1}/03</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Twice Daily Usage Note Callout */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto p-6 sm:p-8 bg-[#F5F1E8] border border-[#C5A880]/60 text-center space-y-3 shadow-md">
          <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#103B27] font-semibold">
            <Clock className="w-4 h-4 text-[#C5A880]" />
            <span>CAMPAIGN USAGE RECOMMENDATION</span>
          </div>
          <p className="font-serif text-lg sm:text-xl text-[#103B27] italic">
            &ldquo;For best ritual experience, apply twice daily — once upon waking, and once before evening rest. Consistency is the foundation of genuine glow.&rdquo;
          </p>
          <span className="text-[11px] text-[#87967E] tracking-widest uppercase font-sans block">
            RUGBY WHITE 10 DAYS CHALLENGE GUIDELINES
          </span>
        </div>
      </div>
    </section>
  );
}
