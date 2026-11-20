"use client";

import React from "react";
import Image from "next/image";

export default function ProductStorytelling() {
  const stories = [
    {
      title: "WHERE BOTANICAL CARE BEGINS",
      subtitle: "Hydration, Brightening & Smooth Complexion",
      image: "/images/instagram/DTzQd3pEfsT.jpg",
      span: "col-span-12 md:col-span-7",
      aspect: "aspect-[16/10]",
    },
    {
      title: "THE TEXTURE OF PURE HYDRATION",
      subtitle: "Weightless velvety emulsion, fast-absorbing",
      image: "/images/rugby-skin-revival.jpg",
      span: "col-span-12 md:col-span-5",
      aspect: "aspect-[4/5]",
    },
    {
      title: "NATURE'S CALM. SKIN'S CONFIDENCE",
      subtitle: "Pure Kasaragod botanical inspiration",
      image: "/images/instagram/DZSAtQIxL-y.jpg",
      span: "col-span-12 md:col-span-5",
      aspect: "aspect-[4/5]",
    },
    {
      title: "WHERE BEAUTY MEETS CONSISTENCY",
      subtitle: "Iconic 10 Days Challenge night cream",
      image: "/images/rugby-skin-revival.jpg",
      span: "col-span-12 md:col-span-7",
      aspect: "aspect-[16/10]",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FDEAF3]/40 text-[#2A1018] border-b border-[#FDEAF3] overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-[#F4CEDF] gap-6">
          <div className="space-y-3">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#581527] font-semibold">
              VISUAL POETRY &amp; BOTANICAL ART
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#581527] tracking-tight leading-none">
              THE TEXTURE OF CARE.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#2A1018]/70 font-light max-w-sm leading-relaxed">
            Every drop is crafted with intention. An intimate exploration of raw botanicals, silky formulations, and the quiet ritual of skin nourishment.
          </p>
        </div>

        {/* Asymmetrical Magazine-style Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-10">
          {stories.map((story, idx) => (
            <div
              key={story.title}
              className={`${story.span} group relative overflow-hidden rounded-none shadow-md hover:shadow-2xl transition-all duration-700 bg-[#3F0E1B]`}
            >
              <div className={`relative ${story.aspect} w-full overflow-hidden bg-[#3F0E1B]`}>
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Dark gradient base that guarantees 100% text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3F0E1B] via-[#3F0E1B]/40 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-[#FEF7FB] z-10">
                <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#AE3E64] block mb-1 font-semibold">
                  EDITION 0{idx + 1}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FEF7FB] font-normal tracking-wide">
                  {story.title}
                </h3>
                <p className="text-xs text-[#FDEAF3]/90 font-sans font-light mt-1 max-w-md leading-relaxed">
                  {story.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
