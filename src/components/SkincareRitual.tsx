"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, Sparkles } from "lucide-react";
import { flagshipProduct } from "@/data/products";

export default function SkincareRitual() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = flagshipProduct.ritualSteps;

  return (
    <section id="ritual" className="py-24 sm:py-32 bg-[#FDEAF3] text-[#2A1018] border-b border-[#F4CEDF] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#581527]" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#581527] font-semibold">
              MINDFUL PRACTICE
            </span>
            <span className="w-8 h-[1px] bg-[#581527]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#581527] leading-[1.1]">
            A RITUAL,
            <span className="block italic font-light text-[#8A304C]">
              REDEFINED.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#2A1018]/75 font-light max-w-lg mx-auto leading-relaxed">
            Three simple steps for overnight skin renewal.
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
                className={`group cursor-pointer bg-[#FEF7FB] border transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                  isActive ? "border-[#581527] ring-1 ring-[#581527]" : "border-[#F4CEDF]"
                }`}
              >
                {/* Step Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4CEDF]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#3F0E1B]/80 backdrop-blur-md px-3 py-1 text-[11px] font-sans tracking-[0.25em] uppercase text-[#FEF7FB]">
                    {step.step}
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A304C] font-sans block">
                      STAGE 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl text-[#581527] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#2A1018]/80 font-light leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#FDEAF3] flex items-center justify-between text-[11px] font-sans text-[#8A304C]">
                    <span className="tracking-wider uppercase">MORNING &amp; EVENING</span>
                    <span className="font-serif italic text-sm text-[#581527]">0{idx + 1}/03</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Twice Daily Usage Note Callout */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto p-6 sm:p-8 bg-[#FEF7FB] border border-[#AE3E64]/60 text-center space-y-3 shadow-md">
          <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#581527] font-semibold">
            <Clock className="w-4 h-4 text-[#AE3E64]" />
            <span>CAMPAIGN USAGE RECOMMENDATION</span>
          </div>
          <p className="font-serif text-lg sm:text-xl text-[#581527] italic">
            &ldquo;For best ritual experience, apply twice daily — once upon waking, and once before evening rest. Consistency is the foundation of genuine glow.&rdquo;
          </p>
          <span className="text-[11px] text-[#8A304C] tracking-widest uppercase font-sans block">
            RUGBY WHITE 10 DAYS CHALLENGE GUIDELINES
          </span>
        </div>
      </div>
    </section>
  );
}
