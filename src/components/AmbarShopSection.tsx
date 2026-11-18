"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Star, Sparkles, Plus, Minus } from "lucide-react";
import { flagshipProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { generateSingleProductWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

export default function AmbarShopSection() {
  const [quantity, setQuantity] = useState(1);
  const [showAltImage, setShowAltImage] = useState(false);
  const { addToCart } = useCart();

  const product = flagshipProduct;

  const handleWhatsApp = () => {
    const url = generateSingleProductWhatsAppUrl({
      productName: product.name,
      quantity,
      price: product.price * quantity,
    });
    window.open(url, "_blank");
  };

  return (
    <section id="shop" className="relative z-20 py-28 sm:py-36 bg-[#F5F1E8] text-[#20251F] border-b border-[#D8CBB7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Ambar .pframe (Hoverable Dual Shot Image Frame) */}
          <div
            className="lg:col-span-6 relative aspect-[4/5] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#FFFFFF] shadow-[0_40px_80px_-40px_rgba(9,41,28,0.35)] border border-[#EAE3D6] p-8 flex items-center justify-center cursor-pointer group"
            onMouseEnter={() => setShowAltImage(true)}
            onMouseLeave={() => setShowAltImage(false)}
          >
            {/* Primary Image: Product Jar from Instagram */}
            <div
              className={`absolute inset-0 p-4 sm:p-6 flex items-center justify-center transition-all duration-700 ${
                showAltImage ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <Image
                src="/images/instagram/DYWq6HcIte1.jpg"
                alt={product.name}
                fill
                priority
                className="object-cover rounded-[20px]"
              />
            </div>

            {/* Alternate Image: Authentic Botanical Jar View on Hover */}
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                showAltImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            >
              <Image
                src="/images/instagram/DXqFYBckZEu.jpg"
                alt="Rugby White Skincare Botanical Presentation"
                fill
                className="object-cover rounded-[20px]"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#09291C]/90 backdrop-blur-md px-4 py-2 text-center text-xs text-[#F5F1E8] font-sans rounded-lg">
                Dermatologically Tested Botanical Formula · Fast Absorbing &amp; Non-Greasy
              </div>
            </div>

            {/* Top Corner Badge */}
            <div className="absolute top-6 left-6 z-10 bg-[#103B27] text-[#F5F1E8] px-3.5 py-1 text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
              SIGNATURE RITUAL
            </div>

            <div className="absolute bottom-6 right-6 z-10 text-[10px] tracking-widest uppercase font-sans text-[#87967E] bg-[#FFFFFF]/90 px-3 py-1 rounded-full shadow-sm">
              {showAltImage ? "VIEWING TEXTURE" : "HOVER FOR TEXTURE"}
            </div>
          </div>

          {/* Right Column: Ambar .pinfo (Editorial Product Details & Facts Table) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#103B27] font-semibold block">
                INTRODUCING
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#103B27] tracking-tight leading-[1.1]">
                THE 10 DAYS CHALLENGE.
              </h2>
              <p className="font-serif italic text-base sm:text-lg text-[#87967E]">
                A new chapter in your skincare ritual.
              </p>
              <p className="font-sans text-sm text-[#20251F]/80 font-light leading-relaxed pt-1">
                Make every day a moment of self-care. Embrace consistency, discover your routine and let your confidence take centre stage.
              </p>
              <div className="inline-block mt-2 px-3.5 py-1.5 bg-[#103B27] text-[#F5F1E8] text-[10px] font-sans tracking-[0.25em] uppercase font-semibold">
                YOUR SKIN. YOUR RITUAL. YOUR MOMENT.
              </div>
            </div>

            {/* Price & Weight */}
            <div className="flex items-baseline gap-4 pt-2 border-t border-[#EAE3D6]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#103B27]">
                ₹{product.price}
              </span>
              <span className="text-sm text-[#87967E] font-sans">
                65 g · about two months, daily routine
              </span>
              <span className="text-xs text-[#87967E] line-through font-sans">
                ₹{product.originalPrice}
              </span>
            </div>

            {/* Ambar-Style Structured Facts Table */}
            <ul className="divide-y divide-[#EAE3D6] border-y border-[#EAE3D6] text-xs font-sans">
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#103B27] tracking-wider uppercase min-w-[120px]">
                  Key Ingredients
                </b>
                <span className="text-[#20251F]/80 text-right">
                  Niacinamide, Green Tea &amp; Centella Asiatica
                </span>
              </li>
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#103B27] tracking-wider uppercase min-w-[120px]">
                  Texture
                </b>
                <span className="text-[#20251F]/80 text-right">
                  Light velvety emulsion, absorbs without sticky finish
                </span>
              </li>
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#103B27] tracking-wider uppercase min-w-[120px]">
                  Ritual Use
                </b>
                <span className="text-[#20251F]/80 text-right">
                  A small touch, morning &amp; night, on clean skin
                </span>
              </li>
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#103B27] tracking-wider uppercase min-w-[120px]">
                  Purity Standards
                </b>
                <span className="text-[#20251F]/80 text-right">
                  Paraben free · Sulphate free · Cruelty free
                </span>
              </li>
              <li className="py-3 flex justify-between gap-4">
                <b className="font-semibold text-[#103B27] tracking-wider uppercase min-w-[120px]">
                  Packaging
                </b>
                <span className="text-[#20251F]/80 text-right">
                  Heavy glass jar with protective screw lid, tamper-proof seal and RB monogram
                </span>
              </li>
            </ul>

            {/* Actions: Add to Bag & WhatsApp */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-[#D8CBB7] px-3 py-3 w-full sm:w-36 bg-[#FFFFFF]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-[#103B27] text-[#87967E]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-sans text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-[#103B27] text-[#87967E]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-4 px-6 bg-[#103B27] text-[#F5F1E8] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-[#09291C] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG · ₹{product.price * quantity}</span>
                </button>
              </div>

              {/* Direct WhatsApp Order */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-3.5 px-6 bg-[#25D366] text-[#FFFFFF] text-xs font-sans tracking-[0.15em] uppercase font-medium hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>ORDER ON WHATSAPP: 9562172556</span>
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/products/10-days-challenge"
                  className="text-xs font-sans tracking-[0.2em] uppercase text-[#103B27] hover:underline inline-flex items-center gap-1.5 font-medium"
                >
                  <span>SEE FULL INGREDIENTS &amp; RITUAL GUIDE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
