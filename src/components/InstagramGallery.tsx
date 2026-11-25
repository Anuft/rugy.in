"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useLivePrice } from "@/hooks/useLivePrice";

export default function InstagramGallery() {
  const { price } = useLivePrice();
  const productShots = [
    {
      image: "/images/rugby-skin-revival.jpg",
      title: "Signature Jar",
      caption: "Pure botanical night cream formula",
    },
    {
      image: "/images/rugby-skin-revival-jar.png",
      title: "Clean Formulation",
      caption: "35g daily evening skin ritual",
    },
    {
      image: "/images/rugby-skin-revival.jpg",
      title: "Luxury Finish",
      caption: "Fast-absorbing, non-sticky texture",
    },
    {
      image: "/images/rugby-skin-revival-jar.png",
      title: "Overnight Care",
      caption: "Wake up with natural morning glow",
    },
    {
      image: "/images/rugby-skin-revival.jpg",
      title: "Dermatologically Tested",
      caption: "Gentle on all skin types",
    },
    {
      image: "/images/rugby-skin-revival-jar.png",
      title: "Authentic Quality",
      caption: "Direct order via WhatsApp",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FEF7FB] text-[#1C1C1C] border-b border-[#F4CEDF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#AE3E64]" />
              <span>PRODUCT SHOWCASE</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
              Rugby White Night Cream
            </h2>
          </div>

          <a
            href={`https://wa.me/91${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              `Hello Rugby White! 🌿 I would like to order the Rugby White Night Cream 35g (₹${price}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#581527] text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#FFFFFF] hover:bg-[#3F0E1B] transition-all duration-300 group shadow-xs cursor-pointer"
          >
            <span>ORDER ON WHATSAPP · ₹{price}</span>
          </a>
        </div>

        {/* 6-Grid Pure Product Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {productShots.map((shot, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#F4CEDF] shadow-xs hover:shadow-lg transition-all duration-300 p-4 flex items-center justify-center"
            >
              <Image
                src={shot.image}
                alt={shot.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-108"
              />

              {/* Clean Subtle Footer Caption on Hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3F0E1B]/90 via-[#3F0E1B]/60 to-transparent p-3 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#FEF7FB] block">
                  {shot.title}
                </span>
                <span className="text-[9px] font-sans text-[#F4CEDF]/80 block pt-0.5">
                  {shot.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
