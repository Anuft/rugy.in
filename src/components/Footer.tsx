import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";
import RugbyWhiteLogo from "@/components/RugbyWhiteLogo";
import { navLinks, legalLinks, siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-[#FEF7FB] border-t border-[#333333] pt-16 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#333333]">
          {/* Brand Identity Column */}
          <div className="lg:col-span-5 space-y-5">
            <RugbyWhiteLogo variant="light" size="md" />

            <p className="font-serif italic text-base sm:text-lg text-[#F4CEDF] max-w-sm">
              Care in every detail. Confidence in every moment.
            </p>

            <p className="font-sans text-xs text-[#8A304C] font-light max-w-sm leading-relaxed">
              Pure botanical skincare for healthy, radiant glass skin. Crafted in India.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#444444] flex items-center justify-center text-[#F4CEDF] hover:bg-[#AE3E64] hover:border-[#AE3E64] hover:text-[#FFFFFF] transition-all"
                aria-label="Rugby White Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/91${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#444444] flex items-center justify-center text-[#F4CEDF] hover:bg-[#25D366] hover:border-[#25D366] hover:text-[#FFFFFF] transition-all"
                aria-label="Rugby White WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#AE3E64] font-bold">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-sans text-xs tracking-wider">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F4CEDF]/80 hover:text-[#AE3E64] hover:translate-x-1 inline-block transition-transform duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Concierge */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#AE3E64] font-bold">
              CUSTOMER CARE &amp; CONCIERGE
            </h4>
            <div className="space-y-2 text-xs font-sans text-[#8A304C] leading-relaxed">
              <p>
                WhatsApp Order &amp; Tracking:{" "}
                <a
                  href={`https://wa.me/91${siteConfig.whatsappNumber}`}
                  className="text-white font-semibold hover:underline block mt-0.5"
                >
                  {siteConfig.whatsappFormatted}
                </a>
              </p>
              <p>
                Email Support:{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-white font-medium hover:underline block mt-0.5"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p>Support Hours: {siteConfig.supportHours}</p>
              <p className="pt-2 text-[11px] text-[#AE3E64] font-semibold">
                Complimentary Express Shipping across India on all orders.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#8A304C] font-sans gap-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="text-center md:text-right">
            <span>© 2026 RUGBY WHITE · THE ART OF EVERYDAY SKINCARE. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
