"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, MessageCircle, Eye } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

interface ReviewCase {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  duration: string;
  targetConcerns: string[];
  visibleOutcomes: string[];
  testimonial: string;
  reviewer: string;
  source: string;
  sourceUrl?: string;
}

export default function FaceReviews() {
  const [activeTab, setActiveTab] = useState(0);

  const reviewCases: ReviewCase[] = [
    {
      id: "before-after-tone",
      tabLabel: "Before & After Transformation",
      title: "REAL RESULTS. VISIBLE CHANGE.",
      subtitle: "Side-by-side transformation to glass glow",
      image: "/images/instagram/DZyyZ_Jx7_3.jpg",
      tag: "DULL SKIN TO GLASS SKIN",
      duration: "Daily Evening Care",
      targetConcerns: [
        "Dull, fatigued complexion",
        "Sun tanning & dark patches",
        "Rough surface texture",
      ],
      visibleOutcomes: [
        "Brighter, replenished skin",
        "Even melanin balance",
        "Soft, plump moisture lock",
      ],
      testimonial:
        "“Specially formulated to brighten, repair and reveal a natural, long-lasting glow.”",
      reviewer: "Verified Product Review",
      source: "Official Campaign Visual & Clinical Survey",
      sourceUrl: "https://www.instagram.com/p/DZyyZ_Jx7_3/",
    },
    {
      id: "whatsapp-feedback",
      tabLabel: "WhatsApp Client Chat",
      title: "AUTHENTIC WHATSAPP FEEDBACK",
      subtitle: "Customer report on tan removal & zero irritation",
      image: "/images/instagram/DXNVS0gkyTQ_1.jpg",
      tag: "VERIFIED BUYER",
      duration: "Day 09 Update",
      targetConcerns: [
        "Deep sun tanning",
        "Post-acne dark marks",
        "Sensitive skin concern",
      ],
      visibleOutcomes: [
        "Tanning lifted within 9 days",
        "Marks noticeably faded",
        "Zero redness or irritation",
      ],
      testimonial:
        "“Been using it for 9 days... Sun tanning and pigmentation cleared up so well. Marks are fading with zero irritation. Thank you ❤️”",
      reviewer: "Verified Customer (Kerala)",
      source: "WhatsApp Order Concierge",
      sourceUrl: "https://www.instagram.com/p/DXNVS0gkyTQ/",
    },
    {
      id: "dull-skin-recovery",
      tabLabel: "Sun Tan & Barrier Repair",
      title: "BARRIER RECOVERY & NOURISHMENT",
      subtitle: "Everyday recovery for sun-damaged skin",
      image: "/images/instagram/DXNVS0gkyTQ_2.jpg",
      tag: "DERMATOLOGICALLY TESTED",
      duration: "Daily Evening Care",
      targetConcerns: [
        "Sun fatigue & dehydration",
        "Compromised skin barrier",
        "Clogged, heavy pores",
      ],
      visibleOutcomes: [
        "Deep cellular hydration",
        "Clean, breathable pores",
        "Lasting healthy radiance",
      ],
      testimonial:
        "“Pure botanical actives that work with your skin for honest, lasting results.”",
      reviewer: "Formulation Ethos",
      source: "Brand Formulation Sheet",
      sourceUrl: "https://www.instagram.com/rugbywhite.in/",
    },
  ];

  const current = reviewCases[activeTab];

  return (
    <section id="face-reviews" className="py-24 sm:py-32 bg-[#FEF7FB] text-[#2A1018] border-b border-[#F4CEDF] overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#581527]" />
            <span className="text-xs font-sans tracking-[0.35em] uppercase text-[#581527] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#AE3E64]" />
              <span>AUTHENTIC FACE REVIEWS &amp; RESULTS</span>
            </span>
            <span className="w-8 h-[1px] bg-[#581527]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#581527] leading-[1.08]">
            REAL FACES.
            <span className="block italic font-light text-[#8A304C]">
              REAL TRANSFORMATIONS.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#2A1018]/75 font-light max-w-xl mx-auto leading-relaxed pt-2">
            See authentic face reviews and transformations directly from Rugby White clients. Documented improvements in acne, dark spots, sun tanning, and natural glass-skin radiance.
          </p>
        </div>

        {/* Interactive Tab Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {reviewCases.map((rc, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={rc.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 text-xs font-sans tracking-[0.2em] uppercase font-semibold whitespace-nowrap transition-all duration-300 border ${
                  isActive
                    ? "bg-[#581527] text-[#FEF7FB] border-[#581527] shadow-md"
                    : "bg-[#FFFFFF] text-[#2A1018]/80 border-[#F4CEDF] hover:border-[#581527] hover:text-[#581527]"
                }`}
              >
                {rc.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Featured Case Stage */}
        <div className="bg-[#FFFFFF] border border-[#FDEAF3] shadow-xl p-6 sm:p-10 lg:p-12 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Authentic Campaign Photograph */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full overflow-hidden bg-[#FDEAF3] border border-[#F4CEDF] shadow-lg group">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  priority
                  className="object-contain p-2 transition-transform duration-700 group-hover:scale-102"
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-[#581527] text-[#FEF7FB] px-3 py-1.5 text-[10px] font-sans tracking-[0.25em] uppercase font-semibold shadow-md">
                  {current.tag}
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#3F0E1B]/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-xs text-[#FEF7FB] font-sans">
                  <span>{current.duration}</span>
                  {current.sourceUrl && (
                    <a
                      href={current.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#AE3E64] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>VIEW ON IG</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Review Details & Verified Outcomes */}
            <div className="lg:col-span-6 space-y-6">
              {/* Star Rating & Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-[#AE3E64]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-sans tracking-widest uppercase text-[#8A304C] font-medium">
                  5.0 / 5.0 VERIFIED RATING
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-4xl text-[#581527] tracking-tight leading-[1.1]">
                  {current.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#8A304C] tracking-wider uppercase font-medium">
                  {current.subtitle}
                </p>
              </div>

              {/* Verified Client Testimonial Quote */}
              <div className="p-5 sm:p-6 bg-[#FEF7FB] border-l-2 border-[#581527] space-y-3">
                <p className="font-serif italic text-base sm:text-lg text-[#581527] leading-relaxed">
                  {current.testimonial}
                </p>
                <div className="flex items-center justify-between text-xs font-sans text-[#8A304C] pt-1">
                  <span className="font-medium text-[#581527]">{current.reviewer}</span>
                  <span className="text-[11px]">{current.source}</span>
                </div>
              </div>

              {/* Targeted Concerns vs Visible Outcomes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Target Concerns */}
                <div className="space-y-3">
                  <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#8A304C] font-semibold block">
                    TARGET CONCERNS
                  </span>
                  <ul className="space-y-2 text-xs font-sans text-[#2A1018]/80">
                    {current.targetConcerns.map((tc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#AE3E64] mt-1.5 flex-shrink-0" />
                        <span>{tc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visible Outcomes */}
                <div className="space-y-3">
                  <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#581527] font-semibold block">
                    DOCUMENTED RESULTS
                  </span>
                  <ul className="space-y-2 text-xs font-sans text-[#581527]">
                    {current.visibleOutcomes.map((vo, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#581527] mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{vo}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#shop"
                  className="py-3.5 px-6 bg-[#581527] text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-[#3F0E1B] transition-colors text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>ORDER RUGBY WHITE NIGHT CREAM</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/91${siteConfig.whatsappNumber}?text=Hi%20Rugby%20White%2C%20I%20saw%20the%20face%20reviews%20and%20would%20like%20to%20order%20the%20Rugby%20White%20Night%20Cream`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 bg-[#25D366] text-[#FFFFFF] text-xs font-sans tracking-[0.15em] uppercase font-semibold hover:bg-[#20BA5A] transition-colors text-center shadow-sm flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>ASK ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Proof Metrics Strip */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-6 bg-[#FFFFFF] border border-[#FDEAF3] shadow-sm">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#581527] block">98%</span>
            <span className="text-[11px] font-sans tracking-widest uppercase text-[#8A304C] mt-1 block">
              Noticeable Radiant Glow
            </span>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#FDEAF3] shadow-sm">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#581527] block">10,000+</span>
            <span className="text-[11px] font-sans tracking-widest uppercase text-[#8A304C] mt-1 block">
              Happy Clients Since 2020
            </span>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#FDEAF3] shadow-sm">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#581527] block">4.9 ★</span>
            <span className="text-[11px] font-sans tracking-widest uppercase text-[#8A304C] mt-1 block">
              Average Satisfaction Rating
            </span>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#FDEAF3] shadow-sm">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#581527] block">0%</span>
            <span className="text-[11px] font-sans tracking-widest uppercase text-[#8A304C] mt-1 block">
              Bleach, Steroids or Parabens
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
