"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Leaf,
  Clock,
  Check,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { generateSingleProductWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "ritual" | "ingredients" | "reviews">("overview");

  const handleWhatsAppOrder = () => {
    const url = generateSingleProductWhatsAppUrl({
      productName: product.name,
      quantity,
      price: product.price * quantity,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-sans text-[#8A304C] mb-8">
          <Link href="/" className="hover:text-[#AE3E64] transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-[#AE3E64] transition-colors">
            SHOP
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#581527] font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main Product Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square sm:aspect-[4/5] w-full bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] overflow-hidden shadow-sm flex items-center justify-center p-6 sm:p-10 group">
              {product.badge && (
                <div
                  className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-white text-[11px] font-sans font-bold tracking-wider uppercase shadow-xs ${
                    product.badgeColor === "red"
                      ? "bg-[#E53935]"
                      : product.badgeColor === "green"
                      ? "bg-[#2E7D32]"
                      : "bg-[#AE3E64]"
                  }`}
                >
                  {product.badge}
                </div>
              )}

              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Thumbnail Selection Rail */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl flex-shrink-0 bg-[#FFFFFF] border-2 transition-all duration-200 overflow-hidden cursor-pointer ${
                    selectedImageIndex === idx
                      ? "border-[#AE3E64] shadow-xs"
                      : "border-[#F4CEDF] opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`Select product image view ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-1.5"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#AE3E64] font-bold block mb-1">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] tracking-tight leading-snug">
                {product.name}
              </h1>
              <p className="text-sm text-[#8A304C] font-sans italic mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Rating Stars & Stock */}
            <div className="flex items-center gap-3 text-xs font-sans">
              <div className="flex items-center text-[#AE3E64]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#1C1C1C]">{product.rating}</span>
              <span className="text-[#8A304C]">({product.reviewCount} verified reviews)</span>
              <span className="text-[#8A304C]">•</span>
              <span className="text-[#2E7D32] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                In Stock
              </span>
            </div>

            {/* Pricing Box */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#581527]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-[#7A7A7A] line-through font-sans">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <span className="px-2.5 py-1 text-xs font-sans font-bold bg-[#E53935] text-white rounded-full uppercase tracking-wider">
                  Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className="font-sans text-sm text-[#1C1C1C]/75 font-light leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quantity Selector & Dual CTAs (ALFA Beauty pattern) */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#F4CEDF] rounded-full bg-[#FFFFFF] px-3 py-1.5 w-32 justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-[#AE3E64] text-[#8A304C] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-sans text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-[#AE3E64] text-[#8A304C] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* WhatsApp 1-Click Order Button */}
              <div className="pt-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-[#FFFFFF] text-xs font-sans tracking-[0.18em] uppercase font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>ORDER ON WHATSAPP · ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                </button>
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="pt-4 border-t border-[#F4CEDF] space-y-2 text-xs text-[#1C1C1C]/80 font-sans">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#AE3E64]" />
                <span>Free Express Shipping across India (2–4 Business Days)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Cash On Delivery (COD) Available Nationwide</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Leaf className="w-4 h-4 text-[#581527]" />
                <span>100% Genuine Botanical Formula • Paraben &amp; Bleach Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs (Description, How to Use, Ingredients, Verified Reviews) */}
        <div className="mt-16 pt-10 border-t border-[#F4CEDF]">
          <div className="flex border-b border-[#F4CEDF] overflow-x-auto gap-6 sm:gap-8 text-xs font-sans tracking-[0.2em] uppercase">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "overview"
                  ? "border-b-2 border-[#AE3E64] text-[#AE3E64] font-bold"
                  : "text-[#8A304C] hover:text-[#1C1C1C]"
              }`}
            >
              Overview &amp; Actives
            </button>
            <button
              onClick={() => setActiveTab("benefits")}
              className={`pb-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "benefits"
                  ? "border-b-2 border-[#AE3E64] text-[#AE3E64] font-bold"
                  : "text-[#8A304C] hover:text-[#1C1C1C]"
              }`}
            >
              Key Benefits
            </button>
            <button
              onClick={() => setActiveTab("ritual")}
              className={`pb-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "ritual"
                  ? "border-b-2 border-[#AE3E64] text-[#AE3E64] font-bold"
                  : "text-[#8A304C] hover:text-[#1C1C1C]"
              }`}
            >
              How to Apply
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`pb-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "ingredients"
                  ? "border-b-2 border-[#AE3E64] text-[#AE3E64] font-bold"
                  : "text-[#8A304C] hover:text-[#1C1C1C]"
              }`}
            >
              Ingredients &amp; Safety
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "reviews"
                  ? "border-b-2 border-[#AE3E64] text-[#AE3E64] font-bold"
                  : "text-[#8A304C] hover:text-[#1C1C1C]"
              }`}
            >
              Verified Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab Contents */}
          <div className="py-8 max-w-4xl">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <p className="font-sans text-sm sm:text-base text-[#1C1C1C]/80 font-light leading-relaxed">
                  {product.fullDescription}
                </p>

                {product.keyActives && product.keyActives.length > 0 && (
                  <div className="pt-2 space-y-4">
                    <h4 className="font-serif text-xl text-[#581527] font-bold">
                      KEY ACTIVE BOTANICALS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.keyActives.map((active) => (
                        <div key={active.name} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF]">
                          <span className="font-serif text-base text-[#581527] block font-bold">
                            {active.name}
                          </span>
                          <span className="font-sans text-xs text-[#1C1C1C]/70 mt-1 block">
                            {active.purpose}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "benefits" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.benefits.map((b) => (
                  <div key={b.number} className="p-5 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] space-y-1">
                    <span className="text-xs font-sans text-[#AE3E64] tracking-widest uppercase font-bold">
                      {b.number}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#581527]">{b.title}</h4>
                    <p className="text-xs font-sans text-[#1C1C1C]/75 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "ritual" && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#AE3E64] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#AE3E64] font-bold">
                    <Clock className="w-4 h-4" />
                    <span>DAILY USAGE GUIDELINE</span>
                  </div>
                  <p className="font-sans text-sm text-[#1C1C1C]/80 leading-relaxed">
                    {product.howToUse}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {product.ritualSteps.map((s) => (
                    <div key={s.step} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] space-y-2">
                      <span className="text-[10px] tracking-widest uppercase font-sans text-[#AE3E64] font-bold">
                        {s.step}
                      </span>
                      <h5 className="font-serif text-base font-bold text-[#581527]">{s.title}</h5>
                      <p className="text-xs font-sans text-[#1C1C1C]/70 leading-relaxed">
                        {s.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {product.purityPillars.map((p) => (
                    <div key={p.title} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] text-center">
                      <span className="text-xs font-serif font-bold text-[#581527] block">
                        {p.title}
                      </span>
                      <span className="text-[10px] text-[#8A304C] font-sans mt-1 block">
                        {p.detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#581527]">FULL INGREDIENTS DECLARATION</h4>
                  <p className="font-mono text-xs text-[#1C1C1C]/70 leading-relaxed">
                    {product.ingredients}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Summary Score */}
                <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#F4CEDF] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <span className="text-4xl font-serif font-bold text-[#581527]">
                      {product.rating} / 5.0
                    </span>
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-[#AE3E64] my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-sans text-[#8A304C]">
                      Based on {product.reviewCount} customer assessments
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/91${siteConfig.whatsappNumber}?text=Hi%20Rugby%20White%2C%20I%20would%20like%20to%20submit%20my%20feedback%20for%20${encodeURIComponent(
                      product.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full border border-[#AE3E64] text-[#AE3E64] hover:bg-[#AE3E64] hover:text-white text-xs font-sans font-bold tracking-wider uppercase transition-colors"
                  >
                    SHARE YOUR FEEDBACK
                  </a>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs uppercase text-[#1C1C1C]">Reshma K.</span>
                        <span className="text-[10px] bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-0.5 rounded-full font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <div className="flex items-center text-[#AE3E64]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-sans text-[#1C1C1C]/75 leading-relaxed">
                      “Honestly surprised by how quickly it worked on my sun tan. Within 8 nights my face has its natural brightness back without any dryness or peeling. Will definitely reorder the 2-pack!”
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs uppercase text-[#1C1C1C]">Priya Nair</span>
                        <span className="text-[10px] bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-0.5 rounded-full font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <div className="flex items-center text-[#AE3E64]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-sans text-[#1C1C1C]/75 leading-relaxed">
                      “Acne spots on my cheeks have faded dramatically. The cream feels whipped and luxury, absorbs in a minute. Best night cream I have tried in years.”
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#F4CEDF]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#AE3E64] font-bold block mb-1">
                  YOU MAY ALSO LIKE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
                  Complementary Creations
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-sans tracking-wider uppercase text-[#AE3E64] hover:underline font-bold"
              >
                VIEW ALL →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-5 group flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <Link href={`/products/${rel.slug}`} className="block relative aspect-square bg-[#FEF7FB] rounded-xl overflow-hidden mb-3">
                    <Image
                      src={rel.images[0]}
                      alt={rel.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="space-y-2">
                    <span className="text-[10px] font-sans tracking-wider text-[#8A304C] uppercase block">
                      {rel.category}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#1C1C1C] group-hover:text-[#AE3E64] transition-colors line-clamp-1">
                      <Link href={`/products/${rel.slug}`}>{rel.name}</Link>
                    </h4>
                    <div className="flex items-baseline justify-between pt-2 border-t border-[#F4CEDF]/60">
                      <span className="font-serif font-bold text-lg text-[#581527]">
                        ₹{rel.price.toLocaleString("en-IN")}
                      </span>
                      <Link
                        href={`/products/${rel.slug}`}
                        className="text-xs font-sans tracking-wider uppercase text-[#AE3E64] hover:text-[#581527] font-bold cursor-pointer"
                      >
                        VIEW RITUAL
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
