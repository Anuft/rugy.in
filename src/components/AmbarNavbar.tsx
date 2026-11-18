"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X, Search, Truck } from "lucide-react";
import RugbyWhiteLogo from "@/components/RugbyWhiteLogo";
import { siteConfig } from "@/data/siteConfig";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon, InstagramIcon } from "@/components/Icons";

export default function AmbarNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

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
        <div className="bg-[#103B27] text-[#F5F1E8] text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase py-1.5 px-4 text-center border-b border-[#C5A880]/20 flex items-center justify-center gap-2">
          <span>COMPLIMENTARY PAN-INDIA AIR COURIER ON ALL ORDERS</span>
          <span className="hidden sm:inline text-[#C5A880]">•</span>
          <span className="hidden sm:inline text-[#C5A880]">10 DAYS CHALLENGE</span>
        </div>

        {/* Main Navigation Bar — Perfectly Centered 3-Column Luxury Architecture */}
        <div
          className={`w-full transition-all duration-300 ${
            scrolled
              ? "bg-[#FFF9F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFC9] py-3.5"
              : "bg-[#FFF9F2]/90 backdrop-blur-md border-b border-[#E8DFC9]/80 py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between min-h-[44px]">
              {/* Left Column: Navigation Links (Desktop) / Hamburger (Mobile) */}
              <div className="flex items-center justify-start z-10">
                {/* Mobile Hamburger Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-[#20251F] hover:text-[#103B27] transition-colors -ml-2"
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
                            ? "text-[#B28A58] font-bold"
                            : "text-[#20251F]/80 hover:text-[#B28A58]"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B28A58] rounded-full" />
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
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#103B27] flex items-center justify-center text-[#103B27] font-serif font-bold text-xs group-hover:border-[#B28A58] group-hover:text-[#B28A58] transition-colors">
                      B
                    </div>
                    {/* Wordmark */}
                    <span className="font-serif tracking-[0.24em] text-base sm:text-xl font-bold text-[#103B27] leading-none whitespace-nowrap group-hover:text-[#09291C] transition-colors">
                      RUGBY WHITE
                    </span>
                  </div>
                  <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.38em] uppercase text-[#87967E] mt-1 font-medium">
                    SKINCARE RITUALS
                  </span>
                </Link>
              </div>

              {/* Right Column: Track your order + Instagram + User + Cart Bag */}
              <div className="flex items-center justify-end space-x-4 sm:space-x-5 z-10">
                {/* 'Track your order' Text Link (ALFA Beauty style in gold/amber) */}
                <Link
                  href="/track-order"
                  className="hidden md:inline-block text-xs font-sans font-semibold tracking-wider text-[#B28A58] hover:text-[#9E7444] hover:underline whitespace-nowrap transition-colors"
                >
                  Track your order
                </Link>

                {/* Instagram Direct Link */}
                <a
                  href="https://www.instagram.com/rugbywhite.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex p-1.5 text-[#20251F]/80 hover:text-[#B28A58] transition-colors"
                  aria-label="Instagram @rugbywhite.in"
                  title="Follow @rugbywhite.in on Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                {/* Profile / Account / WhatsApp Concierge Icon */}
                <Link
                  href="/admin/orders"
                  className="p-1.5 text-[#20251F] hover:text-[#B28A58] transition-colors"
                  title="Fulfillment & Order Account"
                  aria-label="User Account"
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                </Link>

                {/* Cart Shopping Bag with Red Counter Badge */}
                <button
                  onClick={openCart}
                  className="relative p-1.5 text-[#20251F] hover:text-[#B28A58] transition-colors cursor-pointer group"
                  aria-label={`Shopping Bag with ${totalItems} items`}
                >
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                  {/* Badge Counter (like ALFA Beauty red badge) */}
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E53935] text-white text-[9px] font-bold font-sans flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {totalItems}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF9F2] border-b border-[#E8DFC9] shadow-lg animate-fade-in px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3.5 text-xs font-sans tracking-[0.2em] uppercase font-semibold">
              <Link
                href="/"
                className={`py-1.5 border-b border-[#E8DFC9]/60 ${
                  pathname === "/" ? "text-[#B28A58] font-bold" : "text-[#20251F]"
                }`}
              >
                HOME
              </Link>
              <Link
                href="/shop"
                className={`py-1.5 border-b border-[#E8DFC9]/60 ${
                  pathname === "/shop" ? "text-[#B28A58] font-bold" : "text-[#20251F]"
                }`}
              >
                SHOP ALL PRODUCTS
              </Link>
              <Link
                href="/products/10-days-challenge"
                className="py-1.5 border-b border-[#E8DFC9]/60 text-[#20251F]"
              >
                THE 10 DAYS CHALLENGE
              </Link>
              <Link
                href="/#face-reviews"
                className="py-1.5 border-b border-[#E8DFC9]/60 text-[#20251F]"
              >
                FACE REVIEWS
              </Link>
              <Link
                href="/track-order"
                className="py-1.5 border-b border-[#E8DFC9]/60 text-[#B28A58] font-bold flex items-center justify-between"
              >
                <span>TRACK YOUR ORDER</span>
                <Truck className="w-4 h-4 text-[#B28A58]" />
              </Link>
              <Link
                href="/about"
                className="py-1.5 border-b border-[#E8DFC9]/60 text-[#20251F]"
              >
                OUR STORY
              </Link>
              <Link
                href="/admin/orders"
                className="py-1.5 border-b border-[#E8DFC9]/60 text-[#103B27]"
              >
                FULFILLMENT BACKEND
              </Link>
            </nav>

            <div className="pt-2 flex items-center justify-between text-xs font-sans text-[#87967E]">
              <span>Concierge Help Desk:</span>
              <a
                href={`https://wa.me/91${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                <span>+91 95621 72556</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
