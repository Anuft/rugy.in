import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Shipping & Returns Policy | Rugby White",
  description: "Pan-India delivery guidelines, transit times, and return policies for Rugby White skincare.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="bg-[#FCF8F3] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#B28A58] font-bold block">
            DELIVERY &amp; RETURNS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
            Shipping &amp; Returns.
          </h1>
          <p className="font-sans text-xs text-[#87967E]">
            Complimentary Pan-India Express Delivery
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC9] p-8 sm:p-12 shadow-xs space-y-6 text-xs sm:text-sm font-sans text-[#1C1C1C]/80 leading-relaxed">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103B27]">
            1. Dispatch &amp; Transit Timelines
          </h2>
          <p>
            All confirmed orders are processed and handed to our air express logistics partners (BlueDart, Delhivery, Xpressbees) within 24 hours of confirmation.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#1C1C1C]/70">
            <li>Metro Cities: 2–3 Business Days</li>
            <li>Tier 2 &amp; Tier 3 Cities: 3–5 Business Days</li>
            <li>Regional &amp; North East Zones: 4–6 Business Days</li>
          </ul>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103B27] pt-4 border-t border-[#E8DFC9]">
            2. Cash On Delivery (COD)
          </h2>
          <p>
            We offer Cash on Delivery across all serviceable Indian pincodes. You can pay via cash or UPI directly to the courier executive upon parcel handover.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103B27] pt-4 border-t border-[#E8DFC9]">
            3. Damaged or Defective Deliveries
          </h2>
          <p>
            Every Rugby White jar is packaged in tamper-evident protective outer boxing. If your parcel arrives damaged or with broken seals, notify our concierge on WhatsApp at{" "}
            <strong className="text-[#103B27]">{siteConfig.whatsappFormatted}</strong> within 48 hours with a photo of the package, and we will dispatch an immediate priority replacement with zero hassle.
          </p>
        </div>
      </div>
    </div>
  );
}
