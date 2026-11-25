"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

export default function InstagramGallery() {
  const posts = [
    {
      image: "/images/instagram/DXmmECOk9kS.jpg",
      postUrl: "https://www.instagram.com/rugbywhite.in/",
      tag: "#RugbyWhite",
      caption: "Glow that feels fresh, clean & confident. Experience the signature night ritual with Rugby Beauty Cream.",
    },
    {
      image: "/images/instagram/DXNVS0gkyTQ_1.jpg",
      postUrl: "https://www.instagram.com/p/DXNVS0gkyTQ/",
      tag: "#CustomerReview",
      caption: "Real WhatsApp review: 'Ente Tanning, pigmentation okke nalla pole remove aayi... Acne mark dull aayi varunnund...' (Verified Client)",
    },
    {
      image: "/images/instagram/DZSAtQIxL-y.jpg",
      postUrl: "https://www.instagram.com/rugbywhite.in/",
      tag: "#PureBotanicals",
      caption: "Discover the pure night ritual 🌿 Safe botanical formula that nourishes, brightens & protects.",
    },
    {
      image: "/images/instagram/DX1j8ajEbuB.jpg",
      postUrl: "https://www.instagram.com/rugbywhite.in/",
      tag: "#GlassSkin",
      caption: "Glow that speaks before you do ✨ Pure botanical night moisturizer for clear, illuminated skin.",
    },
    {
      image: "/images/instagram/DX3VxQQkYnm.jpg",
      postUrl: "https://www.instagram.com/rugbywhite.in/",
      tag: "#NightRitual",
      caption: "Gentle overnight radiance care. Let botanical actives restore and soothe your skin while you rest.",
    },
    {
      image: "/images/instagram/DX6C8-Skat0.jpg",
      postUrl: "https://www.instagram.com/rugbywhite.in/",
      tag: "#ClearSkin",
      caption: "Natural glow & barrier support. Dermatologically tested Rugby White Night Cream.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FEF7FB] text-[#1C1C1C] border-b border-[#F4CEDF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
              COMMUNITY &amp; STORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
              Follow Us @rugbywhite.in
            </h2>
          </div>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1C1C1C] text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FFFFFF] transition-all duration-300 group shadow-xs"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>JOIN OUR INSTAGRAM</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 6-Grid Instagram Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.postUrl || siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#F4CEDF] shadow-xs hover:shadow-lg transition-all duration-300 block"
              aria-label={`View Instagram post: ${post.caption}`}
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
              />

              {/* Hover Dark Overlay with Details */}
              <div className="absolute inset-0 bg-[#581527]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3.5 flex flex-col justify-between text-[#FEF7FB]">
                <div className="flex justify-between items-start">
                  <InstagramIcon className="w-4 h-4 text-[#AE3E64]" />
                  <span className="text-[9px] font-sans tracking-widest text-[#F4CEDF] uppercase font-bold">
                    {post.tag}
                  </span>
                </div>
                <p className="text-[10px] font-sans font-light line-clamp-3 leading-relaxed text-[#F4CEDF]">
                  {post.caption}
                </p>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#AE3E64] font-bold">
                  VIEW POST ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
