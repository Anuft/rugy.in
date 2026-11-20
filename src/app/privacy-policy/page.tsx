import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Privacy Policy | Rugby White",
  description: "Privacy commitments and customer data protection principles for Rugby White skincare.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            LEGAL COMMITMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
            Privacy Policy.
          </h1>
          <p className="font-sans text-xs text-[#8A304C]">
            Effective Date: January 2026
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-8 sm:p-12 shadow-xs space-y-6 text-xs sm:text-sm font-sans text-[#1C1C1C]/80 leading-relaxed">
          <p>
            At Rugby White, we recognize that privacy is an essential component of customer respect and trust. This Privacy Policy details how we collect, store, and utilize information when you browse our website or acquire our skincare products.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pt-4 border-t border-[#F4CEDF]">
            1. Information We Collect
          </h2>
          <p>
            When you place an order via our online checkout or WhatsApp concierge, we collect necessary transactional information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#1C1C1C]/70">
            <li>Contact details: Name, mobile number, and email address.</li>
            <li>Delivery details: Physical street address, city, state, and PIN code.</li>
            <li>Order specifications: Products chosen, quantities, and delivery notes.</li>
          </ul>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pt-4 border-t border-[#F4CEDF]">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is utilized solely to fulfill orders, transmit real-time delivery tracking updates, answer customer support inquiries, and facilitate seamless doorstep deliveries.
          </p>
          <p>
            We strictly never sell, rent, or trade your personal data to external advertisers or brokers.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pt-4 border-t border-[#F4CEDF]">
            3. Contact &amp; Queries
          </h2>
          <p>
            For any inquiries regarding data protection, please reach our customer team at{" "}
            <strong className="text-[#581527]">{siteConfig.contactEmail}</strong> or via WhatsApp at{" "}
            <strong className="text-[#581527]">{siteConfig.whatsappFormatted}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
