"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { flagshipProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { generateSingleProductWhatsAppUrl } from "@/lib/whatsapp";

export default function FeaturedShopping() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "usage" | "ingredients" | "shipping">("overview");
  const { addToCart } = useCart();
  const router = useRouter();

  const product = flagshipProduct;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleWhatsAppOrder = () => {
    const url = generateSingleProductWhatsAppUrl({
      productName: product.name,
      quantity,
      price: product.price * quantity,
    });
    window.open(url, "_blank");
  };

  return (
    <section id="featured-product" className="py-24 sm:py-32 bg-[#FEF7FB] text-[#2A1018] border-b border-[#FDEAF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#581527] font-semibold">
            THE SIGNATURE RITUAL
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#581527] tracking-tight">
            COMMENCE YOUR 10 DAYS CHALLENGE.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#2A1018]/70 font-light max-w-md mx-auto">
            Experience the transformative daily nourishment formulated to awaken natural radiance.
          </p>
        </div>

        {/* Product Shopping Card */}
        <div className="bg-[#FFFFFF] border border-[#FDEAF3] shadow-xl p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Product Image Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center bg-[#FDEAF3]/30 p-8 rounded-none border border-[#FDEAF3]">
            {/* Badge */}
            <div className="absolute top-4 left-4 bg-[#581527] text-[#FEF7FB] px-3.5 py-1 text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
              {product.badge}
            </div>

            <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="mt-4 flex items-center gap-6 text-[11px] font-sans text-[#8A304C] tracking-widest uppercase">
              <span>{product.netWeight}</span>
              <span>•</span>
              <span>PARABEN &amp; SULPHATE FREE</span>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#8A304C] block mb-1">
                {product.category}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#581527] tracking-tight">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#8A304C] font-sans italic mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 text-xs font-sans">
              <div className="flex items-center text-[#AE3E64]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-[#581527]">{product.rating}</span>
              <span className="text-[#8A304C]">({product.reviewCount} Verified Ritual Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 pt-2 border-t border-[#FDEAF3]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#581527]">
                ₹{product.price}
              </span>
              <span className="text-base text-[#8A304C] line-through font-sans">
                ₹{product.originalPrice}
              </span>
              <span className="px-2.5 py-0.5 text-[11px] font-sans font-semibold bg-[#581527]/10 text-[#581527] tracking-wider uppercase">
                Save 32%
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#2A1018]/80 font-light leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quantity and Primary Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Quantity Controller */}
                <div className="flex items-center justify-between border border-[#F4CEDF] px-3 py-3 w-full sm:w-36 bg-[#FFFFFF]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-[#581527] text-[#8A304C] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-sans text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-[#581527] text-[#8A304C] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3.5 px-6 bg-[#581527] text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#3F0E1B] transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG • ₹{product.price * quantity}</span>
                </button>
              </div>

              {/* Direct Buy Now & WhatsApp Ordering */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-4 bg-[#AE3E64] text-[#3F0E1B] text-xs font-sans tracking-[0.18em] uppercase font-semibold hover:bg-[#EA90B5] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>BUY NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-4 bg-[#25D366] text-[#FFFFFF] text-xs font-sans tracking-[0.15em] uppercase font-medium hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current stroke-none" />
                  <span>BUY ON WHATSAPP</span>
                </button>
              </div>
            </div>

            {/* Product Tabs / Information Accordion */}
            <div className="pt-4 border-t border-[#FDEAF3] space-y-3">
              <div className="flex border-b border-[#FDEAF3] gap-4 sm:gap-6 text-xs font-sans tracking-wider uppercase">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-2 transition-colors ${
                    activeTab === "overview"
                      ? "border-b-2 border-[#581527] text-[#581527] font-semibold"
                      : "text-[#8A304C] hover:text-[#2A1018]"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("usage")}
                  className={`pb-2 transition-colors ${
                    activeTab === "usage"
                      ? "border-b-2 border-[#581527] text-[#581527] font-semibold"
                      : "text-[#8A304C] hover:text-[#2A1018]"
                  }`}
                >
                  Ritual Instructions
                </button>
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`pb-2 transition-colors ${
                    activeTab === "ingredients"
                      ? "border-b-2 border-[#581527] text-[#581527] font-semibold"
                      : "text-[#8A304C] hover:text-[#2A1018]"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2 transition-colors ${
                    activeTab === "shipping"
                      ? "border-b-2 border-[#581527] text-[#581527] font-semibold"
                      : "text-[#8A304C] hover:text-[#2A1018]"
                  }`}
                >
                  Shipping
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs text-[#2A1018]/75 font-sans leading-relaxed pt-2 min-h-[90px]">
                {activeTab === "overview" && (
                  <p>{product.fullDescription}</p>
                )}
                {activeTab === "usage" && (
                  <p>{product.howToUse}</p>
                )}
                {activeTab === "ingredients" && (
                  <p className="font-mono text-[11px] leading-relaxed text-[#2A1018]/70">
                    {product.ingredients}
                  </p>
                )}
                {activeTab === "shipping" && (
                  <p>{product.shippingInfo}</p>
                )}
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 border-t border-[#FDEAF3] grid grid-cols-3 gap-2 text-center text-[10px] text-[#8A304C] font-sans">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#581527]" />
                <span>Pan-India Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#581527]" />
                <span>100% Genuine</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-[#581527]" />
                <span>Easy Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
