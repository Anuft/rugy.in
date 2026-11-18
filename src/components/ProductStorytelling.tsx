"use client";

import React from "react";
import Image from "next/image";

export default function ProductStorytelling() {
  const stories = [
    {
      title: "WHERE BOTANICAL CARE BEGINS",
      subtitle: "Hydration, Brightening, and Smooth Skin · Pure Botanical Actives",
      image: "/images/instagram/DYHfshgkR3Y.jpg",
      span: "col-span-12 md:col-span-7",
      aspect: "aspect-[16/10]",
    },
    {
      title: "THE TEXTURE OF PURE HYDRATION",
      subtitle: "Dermatologically tested formula that nourishes, brightens & protects",
      image: "/images/instagram/DXqFYBckZEu.jpg",
      span: "col-span-12 md:col-span-5",
      aspect: "aspect-[4/5]",
    },
    {
      title: "NATURE'S CALM. SKIN'S CONFIDENCE",
      subtitle: "Pure Kasaragod Kerala botanical inspiration captured for everyday care",
      image: "/images/instagram/DZSAtQIxL-y.jpg",
      span: "col-span-12 md:col-span-5",
      aspect: "aspect-[4/5]",
    },
    {
      title: "WHERE BEAUTY MEETS CONSISTENCY",
      subtitle: "The signature 10 Days Challenge jar on natural river stone",
      image: "/images/instagram/DYWq6HcIte1.jpg",
      span: "col-span-12 md:col-span-7",
      aspect: "aspect-[16/10]",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#EAE3D6]/40 text-[#20251F] border-b border-[#EAE3D6] overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-[#D8CBB7] gap-6">
          <div className="space-y-3">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#103B27] font-semibold">
              VISUAL POETRY &amp; BOTANICAL ART
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#103B27] tracking-tight leading-none">
              THE TEXTURE OF CARE.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#20251F]/70 font-light max-w-sm leading-relaxed">
            Every drop is crafted with intention. An intimate exploration of raw botanicals, silky formulations, and the quiet ritual of skin nourishment.
          </p>
        </div>

        {/* Asymmetrical Magazine-style Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-10">
          {stories.map((story, idx) => (
            <div
              key={story.title}
              className={`${story.span} group relative overflow-hidden rounded-none shadow-md hover:shadow-2xl transition-all duration-700 bg-[#09291C]`}
            >
              <div className={`relative ${story.aspect} w-full overflow-hidden bg-[#09291C]`}>
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Dark gradient base that guarantees 100% text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09291C] via-[#09291C]/40 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-[#F5F1E8] z-10">
                <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#C5A880] block mb-1 font-semibold">
                  EDITION 0{idx + 1}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1E8] font-normal tracking-wide">
                  {story.title}
                </h3>
                <p className="text-xs text-[#EAE3D6]/90 font-sans font-light mt-1 max-w-md leading-relaxed">
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
