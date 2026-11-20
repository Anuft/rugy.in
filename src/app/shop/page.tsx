"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  ArrowRight,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Lock,
  Leaf,
  Clock,
} from "lucide-react";
import { flagshipProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/data/siteConfig";

function ShopContent() {
  const router = useRouter();
  const product = flagshipProduct;
  const { addToCart } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const savings = product.originalPrice - product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            OFFICIAL RUGBY WHITE BOUTIQUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#581527] tracking-tight">
            The Signature Night Cream.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#8A304C] font-light max-w-md mx-auto">
            Our sole, uncompromising formula. Handcrafted botanical night ritual for glass-skin radiance.
          </p>
        </div>

        {/* Single Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#F4CEDF] p-6 sm:p-10 lg:p-12 shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left 6 Columns: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl bg-[#FEF7FB] border border-[#F4CEDF] overflow-hidden p-6 flex items-center justify-center">
                <div className="absolute top-4 left-4 z-10 bg-[#581527] text-white px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase">
                  {product.badge}
                </div>
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-6 transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Thumbnails row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl bg-[#FEF7FB] border-2 p-1 flex-shrink-0 cursor-pointer transition-all ${
                      selectedImageIndex === idx
                        ? "border-[#581527] ring-1 ring-[#581527]"
                        : "border-[#F4CEDF] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right 6 Columns: Details & Purchasing */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#AE3E64]">
                    {product.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[11px] font-sans text-[#8A304C]">
                    {product.netWeight}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl text-[#581527] font-bold tracking-tight">
                  {product.name}
                </h2>
                <p className="font-sans text-xs italic text-[#8A304C] mt-1">
                  {product.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2.5 mt-3 text-xs font-sans">
                  <div className="flex items-center text-[#AE3E64]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#581527]">{product.rating}</span>
                  <span className="text-[#8A304C]">({product.reviewCount} Verified Reviews)</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-4 rounded-xl bg-[#FEF7FB] border border-[#F4CEDF] flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-serif font-bold text-[#581527]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-sans text-gray-400 line-through ml-2.5">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <span className="text-xs font-sans font-bold text-[#059669] bg-[#059669]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Save ₹{savings.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-[#555] leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Key Benefits Bullets */}
              <div className="space-y-1.5 text-xs font-sans text-[#581527] pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Visible morning radiance &amp; even skin tone in 10 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Clears stubborn sun tan, dark spots &amp; active blemishes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Weightless botanical barrier hydration with 0% greasy residue</span>
                </div>
              </div>

              {/* Quantity Stepper & CTAs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#F4CEDF] rounded-full bg-[#FEF7FB] px-2 py-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#581527] hover:bg-[#F4CEDF] disabled:opacity-30 cursor-pointer font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-sans font-bold text-xs text-[#581527]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#581527] hover:bg-[#F4CEDF] cursor-pointer font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-full text-xs font-sans font-bold tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                      added
                        ? "bg-[#059669] text-white"
                        : "bg-[#1C1C1C] hover:bg-[#581527] text-white"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#EA90B5]" />
                        <span>ADD TO CART · ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 px-6 rounded-full bg-[#581527] hover:bg-[#3F0E1B] text-white text-xs font-sans font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#EA90B5]" />
                  <span>INSTANT CHECKOUT · ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                  <ArrowRight className="w-4 h-4 text-[#EA90B5]" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-[#F4CEDF] grid grid-cols-2 gap-3 text-[11px] font-sans text-[#8A304C]">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Free Pan-India Air Courier</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Holographic Tamper Seal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-3.5 h-3.5 text-[#059669]" />
                  <span>0% Bleach, Steroids, Parabens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#059669]" />
                  <span>2–4 Days Express Delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FEF7FB] py-28 text-center text-xs font-serif text-[#581527]">
          Loading Rugby White Boutique...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
