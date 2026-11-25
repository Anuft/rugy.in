"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, Truck } from "lucide-react";
import RugbyWhiteLogo from "@/components/RugbyWhiteLogo";
import { siteConfig } from "@/data/siteConfig";
import { WhatsAppIcon, InstagramIcon } from "@/components/Icons";

export default function AmbarNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const leftNavLinks = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "TRACK ORDER", href: "/track-order" },
    { label: "OUR STORY", href: "/about" },
    { label: "REVIEWS", href: "/#face-reviews" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Minimal Announcement Bar */}
        <div className="bg-[#581527] text-[#FEF7FB] text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase py-1.5 px-4 text-center border-b border-[#AE3E64]/20 flex items-center justify-center gap-2">
          <span>COMPLIMENTARY PAN-INDIA AIR COURIER ON ALL ORDERS</span>
          <span className="hidden sm:inline text-[#AE3E64]">•</span>
          <span className="hidden sm:inline text-[#AE3E64]">SIGNATURE NIGHT CREAM</span>
        </div>

        {/* Main Navigation Bar — Perfectly Centered 3-Column Luxury Architecture */}
        <div
          className={`w-full transition-all duration-300 ${
            scrolled
              ? "bg-[#FEF7FB]/95 backdrop-blur-md shadow-sm border-b border-[#F4CEDF] py-3.5"
              : "bg-[#FEF7FB]/90 backdrop-blur-md border-b border-[#F4CEDF]/80 py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between min-h-[44px]">
              {/* Left Column: Navigation Links (Desktop) / Hamburger (Mobile) */}
              <div className="flex items-center justify-start z-10">
                {/* Mobile Hamburger Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-[#2A1018] hover:text-[#581527] transition-colors -ml-2"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Desktop Left Nav Links */}
                <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-xs font-sans tracking-[0.2em] uppercase font-semibold">
                  {leftNavLinks.map((link) => {
                    const isHome = link.href === "/";
                    const isActive = isHome ? pathname === "/" : pathname.startsWith(link.href);
                    const isReviews = link.label === "REVIEWS";

                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={`transition-colors whitespace-nowrap py-1 relative ${
                          isReviews ? "hidden xl:inline-block" : ""
                        } ${
                          isActive
                            ? "text-[#AE3E64] font-bold"
                            : "text-[#2A1018]/80 hover:text-[#AE3E64]"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#AE3E64] rounded-full" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Center Column: ABSOLUTELY CENTERED Brand Logo (Always perfectly centered regardless of left/right widths) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20">
                <Link
                  href="/"
                  className="flex flex-col items-center text-center group transition-transform duration-300 hover:scale-102"
                  aria-label="Rugby White Home"
                >
                  <div className="flex items-center gap-2">
                    {/* Stylized Monogram Circle (from Image 1 & 2) */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#581527] flex items-center justify-center text-[#581527] font-serif font-bold text-xs group-hover:border-[#AE3E64] group-hover:text-[#AE3E64] transition-colors">
                      B
                    </div>
                    {/* Wordmark */}
                    <span className="font-serif tracking-[0.24em] text-base sm:text-xl font-bold text-[#581527] leading-none whitespace-nowrap group-hover:text-[#3F0E1B] transition-colors">
                      RUGBY WHITE
                    </span>
                  </div>
                  <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.38em] uppercase text-[#8A304C] mt-1 font-medium">
                    SKINCARE RITUALS
                  </span>
                </Link>
              </div>

              {/* Right Column: Track your order + Instagram + User + Cart Bag */}
              <div className="flex items-center justify-end space-x-4 sm:space-x-5 z-10">
                {/* 'Track your order' Text Link (ALFA Beauty style in gold/amber) */}
                <Link
                  href="/track-order"
                  className="hidden xl:inline-block text-xs font-sans font-semibold tracking-wider text-[#AE3E64] hover:text-[#8A304C] hover:underline whitespace-nowrap transition-colors"
                >
                  Track your order
                </Link>

                {/* Instagram Direct Link */}
                <a
                  href="https://www.instagram.com/rugbywhite.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex p-1.5 text-[#2A1018]/80 hover:text-[#AE3E64] transition-colors"
                  aria-label="Instagram @rugbywhite.in"
                  title="Follow @rugbywhite.in on Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                {/* Profile / Account / WhatsApp Concierge Icon */}
                <Link
                  href="/admin/orders"
                  className="p-1.5 text-[#2A1018] hover:text-[#AE3E64] transition-colors"
                  title="Fulfillment & Order Account"
                  aria-label="User Account"
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                </Link>

                {/* WhatsApp Direct Order Button */}
                <a
                  href={`https://wa.me/919207341674?text=${encodeURIComponent(
                    "Hello Rugby White! 🌿 I would like to order the Rugby White Night Cream 35g (₹599). Please confirm details!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-[11px] font-sans font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm hover:scale-105"
                  aria-label="Order on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span className="hidden sm:inline">ORDER ON WHATSAPP</span>
                  <span className="sm:hidden">ORDER</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FEF7FB] border-b border-[#F4CEDF] shadow-lg animate-fade-in px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3.5 text-xs font-sans tracking-[0.2em] uppercase font-semibold">
              <Link
                href="/"
                className={`py-1.5 border-b border-[#F4CEDF]/60 ${
                  pathname === "/" ? "text-[#AE3E64] font-bold" : "text-[#2A1018]"
                }`}
              >
                HOME
              </Link>
              <Link
                href="/shop"
                className={`py-1.5 border-b border-[#F4CEDF]/60 ${
                  pathname === "/shop" ? "text-[#AE3E64] font-bold" : "text-[#2A1018]"
                }`}
              >
                SHOP ALL PRODUCTS
              </Link>
              <Link
                href="/products/rugby-white-night-cream"
                className="py-1.5 border-b border-[#F4CEDF]/60 text-[#2A1018]"
              >
                NIGHT CREAM
              </Link>
              <Link
                href="/#face-reviews"
                className="py-1.5 border-b border-[#F4CEDF]/60 text-[#2A1018]"
              >
                FACE REVIEWS
              </Link>
              <Link
                href="/track-order"
                className="py-1.5 border-b border-[#F4CEDF]/60 text-[#AE3E64] font-bold flex items-center justify-between"
              >
                <span>TRACK YOUR ORDER</span>
                <Truck className="w-4 h-4 text-[#AE3E64]" />
              </Link>
              <Link
                href="/about"
                className="py-1.5 border-b border-[#F4CEDF]/60 text-[#2A1018]"
              >
                OUR STORY
              </Link>
              <Link
                href="/admin/orders"
                className="py-1.5 border-b border-[#F4CEDF]/60 text-[#581527]"
              >
                FULFILLMENT BACKEND
              </Link>
            </nav>

            <div className="pt-2 flex items-center justify-between text-xs font-sans text-[#8A304C]">
              <span>Concierge Help Desk:</span>
              <a
                href={`https://wa.me/91${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                <span>{siteConfig.whatsappFormatted}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
