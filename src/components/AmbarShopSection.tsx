"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Star, Sparkles, Plus, Minus, Lock } from "lucide-react";
import { flagshipProduct } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";
import { useCart } from "@/context/CartContext";
import { generateSingleProductWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

export default function AmbarShopSection() {
  const [quantity, setQuantity] = useState(1);
  const [showAltImage, setShowAltImage] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const product = flagshipProduct;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleWhatsApp = () => {
    const url = generateSingleProductWhatsAppUrl({
      productName: product.name,
      quantity,
      price: product.price * quantity,
    });
    window.open(url, "_blank");
  };

  return (
    <section id="shop" className="relative z-20 py-16 sm:py-24 bg-[#FEF7FB] text-[#2A1018] border-b border-[#F4CEDF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Ambar .pframe (Hoverable Dual Shot Image Frame) */}
          <div
            className="lg:col-span-6 relative aspect-[4/5] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#FFFFFF] shadow-[0_40px_80px_-40px_rgba(9,41,28,0.35)] border border-[#FDEAF3] p-8 flex items-center justify-center cursor-pointer group"
            onMouseEnter={() => setShowAltImage(true)}
            onMouseLeave={() => setShowAltImage(false)}
          >
            {/* Primary Image: New Rugby White Skin Revival Jar */}
            <div
              className={`absolute inset-0 p-4 sm:p-6 flex items-center justify-center transition-all duration-700 ${
                showAltImage ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <Image
                src="/images/rugby-skin-revival.jpg"
                alt={product.name}
                fill
                priority
                className="object-contain rounded-[20px]"
              />
            </div>

            {/* Alternate Image: Authentic Botanical Jar View on Hover */}
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                showAltImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            >
              <Image
                src="/images/instagram/DX6C8-Skat0.jpg"
                alt="Rugby White Skincare Botanical Presentation"
                fill
                className="object-cover rounded-[20px]"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#3F0E1B]/90 backdrop-blur-md px-4 py-2 text-center text-xs text-[#FEF7FB] font-sans rounded-lg">
                Dermatologically Tested Botanical Formula · Fast Absorbing &amp; Non-Greasy
              </div>
            </div>

            {/* Top Corner Badge */}
            <div className="absolute top-6 left-6 z-10 bg-[#581527] text-[#FEF7FB] px-3.5 py-1 text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
              SIGNATURE RITUAL
            </div>

            <div className="absolute bottom-6 right-6 z-10 text-[10px] tracking-widest uppercase font-sans text-[#8A304C] bg-[#FFFFFF]/90 px-3 py-1 rounded-full shadow-sm">
              {showAltImage ? "VIEWING TEXTURE" : "HOVER FOR TEXTURE"}
            </div>
          </div>

          {/* Right Column: Ambar .pinfo (Editorial Product Details & Facts Table) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#581527] font-semibold block">
                INTRODUCING
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#581527] tracking-tight leading-[1.1]">
                RUGBY WHITE NIGHT CREAM.
              </h2>
              <p className="font-serif italic text-base sm:text-lg text-[#8A304C]">
                Radiance Nourishing Night Cream
              </p>
              <p className="font-sans text-sm text-[#2A1018]/80 font-light leading-relaxed pt-1">
                Visibly clear, glowing skin with nightly care.
              </p>
            </div>

            {/* Price & Weight */}
            <div className="flex items-baseline gap-4 pt-2 border-t border-[#FDEAF3]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#581527]">
                ₹{product.price}
              </span>
              <span className="text-sm text-[#8A304C] font-sans">
                35g · Daily Night Care
              </span>
              <span className="text-xs text-[#8A304C] line-through font-sans">
                ₹{product.originalPrice}
              </span>
            </div>

            {/* Ambar-Style Structured Facts Table */}
            <ul className="divide-y divide-[#FDEAF3] border-y border-[#FDEAF3] text-xs font-sans">
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#581527] tracking-wider uppercase min-w-[120px]">
                  Key Actives
                </b>
                <span className="text-[#2A1018]/80 text-right">
                  Niacinamide, Green Tea &amp; Centella
                </span>
              </li>
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#581527] tracking-wider uppercase min-w-[120px]">
                  Texture
                </b>
                <span className="text-[#2A1018]/80 text-right">
                  Light emulsion, absorbs non-sticky
                </span>
              </li>
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#581527] tracking-wider uppercase min-w-[120px]">
                  How to Use
                </b>
                <span className="text-[#2A1018]/80 text-right">
                  Apply nightly on clean face
                </span>
              </li>
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#581527] tracking-wider uppercase min-w-[120px]">
                  Purity
                </b>
                <span className="text-[#2A1018]/80 text-right">
                  100% Clean · 0% Parabens
                </span>
              </li>
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#581527] tracking-wider uppercase min-w-[120px]">
                  Packaging
                </b>
                <span className="text-[#2A1018]/80 text-right">
                  Premium 35g glass jar
                </span>
              </li>
            </ul>

            {/* Actions: Direct WhatsApp Order */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-[#F4CEDF] px-4 py-3.5 w-full sm:w-36 bg-[#FFFFFF]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-[#581527] text-[#8A304C]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-sans text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-[#581527] text-[#8A304C]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct Order on WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-[#FFFFFF] text-xs font-sans tracking-[0.18em] uppercase font-bold transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>ORDER ON WHATSAPP · ₹{product.price * quantity}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#8A304C] pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#581527]" />
                  100% Original Formula
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#581527]" />
                  Free Express Shipping
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#581527]" />
                  Instant WhatsApp Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
