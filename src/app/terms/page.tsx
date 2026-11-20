import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Terms & Conditions | Rugby White",
  description: "Terms of service and purchasing conditions for Rugby White skincare.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            TERMS OF SERVICE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
            Terms &amp; Conditions.
          </h1>
          <p className="font-sans text-xs text-[#8A304C]">
            Effective Date: January 2026
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-8 sm:p-12 shadow-xs space-y-6 text-xs sm:text-sm font-sans text-[#1C1C1C]/80 leading-relaxed">
          <p>
            Welcome to Rugby White. By accessing this website or purchasing our products, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pt-4 border-t border-[#F4CEDF]">
            1. Authenticity &amp; Product Use
          </h2>
          <p>
            All products displayed on this site are genuine Rugby White skincare formulations. Always read the ingredient declaration and application directions prior to use. For hypersensitive skin, a 24-hour patch test behind the ear is recommended.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pt-4 border-t border-[#F4CEDF]">
            2. Orders, Pricing &amp; Cancellation
          </h2>
          <p>
            All prices are stated in Indian Rupees (₹ INR). We reserve the right to correct pricing errors and cancel orders if inventory discrepancies arise. You may request cancellation before an order is dispatched from our fulfillment hub.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pt-4 border-t border-[#F4CEDF]">
            3. Customer Support
          </h2>
          <p>
            For support inquiries or wholesale questions, connect directly with us at{" "}
            <strong className="text-[#581527]">{siteConfig.contactEmail}</strong> or call/WhatsApp{" "}
            <strong className="text-[#581527]">{siteConfig.whatsappFormatted}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
