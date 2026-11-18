import React from "react";
import AmbarScrollFilm from "@/components/AmbarScrollFilm";
import BrandIntro from "@/components/BrandIntro";
import AmbarShopSection from "@/components/AmbarShopSection";
import FaceReviews from "@/components/FaceReviews";
import ProductBenefits from "@/components/ProductBenefits";
import PurityPhilosophy from "@/components/PurityPhilosophy";
import TenDaysChallenge from "@/components/TenDaysChallenge";
import ProductStorytelling from "@/components/ProductStorytelling";
import SkincareRitual from "@/components/SkincareRitual";
import BrandStory from "@/components/BrandStory";
import InstagramGallery from "@/components/InstagramGallery";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      {/* ═══ CONTINUOUS SCROLL-FILM STORYTELLING ENGINE (AMBAR BY ASCENTA STUDIO REFERENCE) ═══ */}
      {/* Film Canvas + 5 Narrative Beats: Hero, Beyond Ordinary, 10 Days Challenge, Ritual, Personal Beauty */}
      <AmbarScrollFilm />

      {/* ═══ SECTION: BEYOND THE ORDINARY (BRAND PHILOSOPHY) ═══ */}
      <BrandIntro />

      {/* ═══ AMBAR SIGNATURE PDP SHOPPING SECTION ═══ */}
      {/* Dual Hover Frame + Editorial Facts Table + Instant WhatsApp Order */}
      <AmbarShopSection />

      {/* ═══ SECTION: REAL FACE REVIEWS & TRANSFORMATIONS (INSTAGRAM CLIENT PROOF) ═══ */}
      {/* 10-Day Clear Skin Challenge, Before & After Tone Comparison & WhatsApp Chat Reviews */}
      <FaceReviews />

      {/* ═══ SECTION: THE BEAUTY OF THOUGHTFUL CARE (5 CORE ACTIONS) ═══ */}
      <ProductBenefits />

      {/* ═══ SECTION: LESS NOISE. MORE CARE. (PURITY PHILOSOPHY) ═══ */}
      <PurityPhilosophy />

      {/* ═══ SECTION: 10 DAYS. A NEW SKINCARE RITUAL (CAMPAIGN TIMELINE) ═══ */}
      <TenDaysChallenge />

      {/* ═══ SECTION: THE TEXTURE OF CARE (EDITORIAL ASYMMETRICAL STORYTELLING) ═══ */}
      <ProductStorytelling />

      {/* ═══ SECTION: A RITUAL, REDEFINED (PREPARE, APPLY, EMBRACE) ═══ */}
      <SkincareRitual />

      {/* ═══ SECTION: BEAUTY IS PERSONAL (BRAND STORY) ═══ */}
      <BrandStory />

      {/* ═══ SECTION: YOUR SKINCARE STORY STARTS HERE (COMMUNITY GALLERY) ═══ */}
      <InstagramGallery />

      {/* ═══ SECTION: LET GOOD SKINCARE BECOME YOUR RITUAL (NEWSLETTER) ═══ */}
      <Newsletter />
    </>
  );
}
