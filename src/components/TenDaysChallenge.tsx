"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function TenDaysChallenge() {
  const [selectedDay, setSelectedDay] = useState(0);

  const timelineDays = [
    {
      day: "DAY 01",
      title: "BEGIN YOUR RITUAL",
      description:
        "Take your first step. Cleanse mindfully, apply your cream in upward gentle strokes, and notice the immediate sensory comfort of deeply hydrated skin.",
      focus: "Intention & Hydration Awakening",
      image: "/images/instagram/DTzQd3pEfsT.jpg",
    },
    {
      day: "DAY 03",
      title: "STAY CONSISTENT",
      description:
        "Consistency begins to take shape. Your skin adapts to the morning and evening rhythm, locking in essential barrier nutrients through daily repetition.",
      focus: "Moisture Balance & Absorption",
      image: "/images/instagram/DYHfshgkR3Y.jpg",
    },
    {
      day: "DAY 05",
      title: "KEEP CARING",
      description:
        "Midway through the challenge. Mindful application becomes second nature. A peaceful restorative ritual to look forward to each morning and night.",
      focus: "Texture Smoothing & Barrier Support",
      image: "/images/instagram/DXqFYBckZEu.jpg",
    },
    {
      day: "DAY 07",
      title: "YOUR DAILY MOMENT",
      description:
        "One full week of dedicated self-care. Your skin feels noticeably soft, supple, and refreshed as botanical extracts nourish deep beneath the surface.",
      focus: "Radiance Continuity & Calm Balance",
      image: "/images/instagram/DYWq6HcIte1.jpg",
    },
    {
      day: "DAY 10",
      title: "CELEBRATE YOUR ROUTINE",
      description:
        "10 days of honoring your skin. A completed ritual that celebrates your natural glow and the confidence that comes with daily mindful nourishment.",
      focus: "Radiant Confidence & Lifelong Ritual",
      image: "/images/instagram/DZyyZ_Jx7_3.jpg",
    },
  ];

  return (
    <section id="challenge" className="py-24 sm:py-32 bg-[#F5F1E8] text-[#20251F] border-b border-[#EAE3D6] overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#103B27]" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#103B27] font-semibold">
              THE CAMPAIGN JOURNEY
            </span>
            <span className="w-8 h-[1px] bg-[#103B27]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#103B27] leading-[1.1]">
            INTRODUCING
            <span className="block italic font-light text-[#87967E]">
              THE 10 DAYS CHALLENGE.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#20251F]/70 font-light max-w-xl mx-auto leading-relaxed pt-2">
            A new chapter in your skincare ritual. Make every day a moment of self-care. Embrace consistency, discover your routine and let your confidence take centre stage.
          </p>
        </div>

        {/* Timeline Navigation Tabs */}
        <div className="relative mb-12 sm:mb-16">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1.5px] bg-[#D8CBB7] -translate-y-1/2 -z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {timelineDays.map((item, idx) => {
              const isSelected = selectedDay === idx;
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(idx)}
                  className={`p-4 sm:p-5 text-left border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "bg-[#103B27] text-[#F5F1E8] border-[#103B27] shadow-lg"
                      : "bg-[#FFFFFF] text-[#20251F] border-[#D8CBB7] hover:border-[#103B27]"
                  }`}
                >
                  <span
                    className={`font-serif text-lg sm:text-xl font-medium ${
                      isSelected ? "text-[#C5A880]" : "text-[#103B27]"
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="text-[11px] font-sans font-light tracking-wider uppercase mt-1 truncate">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Showcase Card */}
        <div className="bg-[#FFFFFF] border border-[#EAE3D6] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left: Visual Photography */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[16/11] bg-[#EAE3D6] overflow-hidden">
            <Image
              src={timelineDays[selectedDay].image}
              alt={timelineDays[selectedDay].title}
              fill
              className="object-cover object-center transition-all duration-700 hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-[#09291C]/85 text-[#F5F1E8] px-3.5 py-1 text-xs font-sans tracking-[0.25em] uppercase font-semibold">
              {timelineDays[selectedDay].day}
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#87967E]">
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              <span>{timelineDays[selectedDay].focus}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl text-[#103B27] tracking-tight">
              {timelineDays[selectedDay].title}
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#20251F]/80 font-light leading-relaxed">
              {timelineDays[selectedDay].description}
            </p>

            <div className="pt-4 border-t border-[#EAE3D6] flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/products/10-days-challenge"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#103B27] text-[#F5F1E8] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#09291C] transition-colors shadow-sm"
              >
                <span>DISCOVER THE CHALLENGE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="text-right">
                <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#103B27] font-semibold block">
                  YOUR SKIN. YOUR RITUAL. YOUR MOMENT.
                </span>
                <span className="text-xs text-[#87967E] font-sans">
                  {timelineDays[selectedDay].day} of the 10 Days Challenge
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
