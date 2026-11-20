"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { generateConciergeWhatsAppUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    window.open(generateConciergeWhatsAppUrl(), "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#3F0E1B] text-[#FEF7FB] px-4 py-2.5 rounded-sm shadow-xl border border-[#8A304C] text-xs font-sans animate-fade-in">
          <span>Need ritual advice? Chat directly with our concierge</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#8A304C] hover:text-[#FFFFFF]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#20BA5A] transition-all duration-300 group"
        aria-label="Order or Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      </button>
    </div>
  );
}
