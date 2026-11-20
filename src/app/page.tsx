import React from "react";
import Hero from "@/components/Hero";
import AmbarShopSection from "@/components/AmbarShopSection";
import ProductBenefits from "@/components/ProductBenefits";
import FaceReviews from "@/components/FaceReviews";
import SkincareRitual from "@/components/SkincareRitual";
import InstagramGallery from "@/components/InstagramGallery";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO SPOTLIGHT */}
      <Hero />

      {/* 2. INSTANT ORDER & BUY BOX */}
      <AmbarShopSection />

      {/* 3. 5 CORE PRODUCT BENEFITS */}
      <ProductBenefits />

      {/* 4. REAL CUSTOMER REVIEWS & RESULTS */}
      <FaceReviews />

      {/* 5. 3-STEP EVENING RITUAL */}
      <SkincareRitual />

      {/* 6. INSTAGRAM COMMUNITY SOCIAL PROOF */}
      <InstagramGallery />
    </>
  );
}
