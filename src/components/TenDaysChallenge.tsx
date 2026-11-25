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
      description: "Cleanse, apply, and feel instant botanical hydration.",
      focus: "Hydration Awakening",
      image: "/images/instagram/DTzQd3pEfsT.jpg",
    },
    {
      day: "DAY 03",
      title: "STAY CONSISTENT",
      description: "Skin texture softens as moisture locks into deeper layers.",
      focus: "Moisture Balance",
      image: "/images/instagram/DTzQd3pEfsT.jpg",
    },
    {
      day: "DAY 05",
      title: "KEEP CARING",
      description: "Noticeable reduction in dullness and active skin redness.",
      focus: "Texture Smoothing",
      image: "/images/rugby-skin-revival.jpg",
    },
    {
      day: "DAY 07",
      title: "YOUR DAILY MOMENT",
      description: "Dark marks and uneven tone begin to visibly fade.",
      focus: "Radiance & Tone",
      image: "/images/instagram/DTzQd3pEfsT.jpg",
    },
    {
      day: "DAY 10",
      title: "CELEBRATE YOUR ROUTINE",
      description: "Luminous, unified skin with a lasting natural glow.",
      focus: "Radiant Glass Skin",
      image: "/images/instagram/DZyyZ_Jx7_3.jpg",
    },
  ];

  return (
    <section id="challenge" className="py-24 sm:py-32 bg-[#FEF7FB] text-[#2A1018] border-b border-[#FDEAF3] overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#581527]" />
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#581527] font-semibold">
              THE CAMPAIGN JOURNEY
            </span>
            <span className="w-8 h-[1px] bg-[#581527]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#581527] leading-[1.1]">
            INTRODUCING
            <span className="block italic font-light text-[#8A304C]">
              THE NIGHT RITUAL.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#2A1018]/70 font-light max-w-xl mx-auto leading-relaxed pt-2">
            A new chapter in your skincare ritual. Make every day a moment of self-care. Embrace consistency, discover your routine and let your confidence take centre stage.
          </p>
        </div>

        {/* Timeline Navigation Tabs */}
        <div className="relative mb-12 sm:mb-16">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1.5px] bg-[#F4CEDF] -translate-y-1/2 -z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {timelineDays.map((item, idx) => {
              const isSelected = selectedDay === idx;
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(idx)}
                  className={`p-4 sm:p-5 text-left border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "bg-[#581527] text-[#FEF7FB] border-[#581527] shadow-lg"
                      : "bg-[#FFFFFF] text-[#2A1018] border-[#F4CEDF] hover:border-[#581527]"
                  }`}
                >
                  <span
                    className={`font-serif text-lg sm:text-xl font-medium ${
                      isSelected ? "text-[#AE3E64]" : "text-[#581527]"
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
        <div className="bg-[#FFFFFF] border border-[#FDEAF3] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left: Visual Photography */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[16/11] bg-[#FDEAF3] overflow-hidden">
            <Image
              src={timelineDays[selectedDay].image}
              alt={timelineDays[selectedDay].title}
              fill
              className="object-cover object-center transition-all duration-700 hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-[#3F0E1B]/85 text-[#FEF7FB] px-3.5 py-1 text-xs font-sans tracking-[0.25em] uppercase font-semibold">
              {timelineDays[selectedDay].day}
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#8A304C]">
              <Calendar className="w-4 h-4 text-[#AE3E64]" />
              <span>{timelineDays[selectedDay].focus}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl text-[#581527] tracking-tight">
              {timelineDays[selectedDay].title}
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#2A1018]/80 font-light leading-relaxed">
              {timelineDays[selectedDay].description}
            </p>

            <div className="pt-4 border-t border-[#FDEAF3] flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/products/rugby-white-night-cream"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#581527] text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#3F0E1B] transition-colors shadow-sm"
              >
                <span>DISCOVER THE RITUAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="text-right">
                <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#581527] font-semibold block">
                  YOUR SKIN. YOUR RITUAL. YOUR MOMENT.
                </span>
                <span className="text-xs text-[#8A304C] font-sans">
                  {timelineDays[selectedDay].day} of the Night Ritual
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
