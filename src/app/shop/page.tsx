"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, ShoppingBag, ArrowRight, ArrowUpDown, Check, ShieldCheck } from "lucide-react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (initialCategory) {
      if (initialCategory.toLowerCase().includes("wholesale")) {
        setSelectedCategory("Wholesale & Bundles");
      }
    }
  }, [initialCategory]);

  const categories = [
    { label: "ALL PRODUCTS", value: "ALL" },
    { label: "10 DAYS NIGHT CREAM", value: "Night Cream" },
    { label: "VALUE COMBOS", value: "Value Combos" },
    { label: "WHOLESALE PACKS", value: "Wholesale & Bundles" },
    { label: "HAND & BODY CARE", value: "Hand & Body Care" },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "ALL") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortBy]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleBuyNow = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    router.push("/checkout");
  };

  return (
    <div className="bg-[#FCF8F3] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#B28A58] font-bold block">
            OFFICIAL RUGBY WHITE STORE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
            Shop Skincare Rituals &amp; Bundles.
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#1C1C1C]/70 font-light">
            Genuine 10 Days Challenge night creams, multi-jar savings bundles, and wholesale packs for salons with free pan-India express delivery.
          </p>
        </div>

        {/* Filter and Sorting Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-6 mb-10 border-b border-[#E8DFC9] gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase font-semibold transition-all border cursor-pointer ${
                  selectedCategory === cat.value
                    ? "bg-[#103B27] text-white border-[#103B27] shadow-xs"
                    : "bg-[#FFFFFF] text-[#1C1C1C]/80 border-[#E8DFC9] hover:border-[#B28A58] hover:text-[#B28A58]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <ArrowUpDown className="w-4 h-4 text-[#87967E]" />
            <span className="text-[#87967E] uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FFFFFF] border border-[#E8DFC9] rounded-lg px-3 py-2 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#B28A58] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const savings = product.originalPrice - product.price;
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group bg-[#FFFFFF] rounded-2xl border border-[#E8DFC9] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#B28A58]/60 relative"
              >
                <div>
                  {/* Badge & Rating Row */}
                  <div className="flex items-center justify-between mb-3">
                    {product.badge ? (
                      <span
                        className={`text-[10px] font-sans font-bold tracking-wider px-2.5 py-1 rounded-full text-white uppercase ${
                          product.badgeColor === "red"
                            ? "bg-[#E53935]"
                            : product.badgeColor === "green"
                            ? "bg-[#2E7D32]"
                            : "bg-[#B28A58]"
                        }`}
                      >
                        {product.badge}
                      </span>
                    ) : (
                      <span />
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-[#1C1C1C]/80 font-sans">
                      <div className="flex items-center text-[#B28A58]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold">({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Image Stage */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="block relative aspect-square w-full rounded-xl bg-[#F7F2EC] overflow-hidden mb-4 group-hover:bg-[#FCF8F3] transition-colors"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-[#FFFFFF]/90 backdrop-blur-sm text-[#1C1C1C] text-xs font-sans tracking-widest uppercase font-semibold px-4 py-2 rounded-full shadow-md">
                        VIEW DETAILS
                      </span>
                    </div>
                  </Link>

                  {/* Category & Weight */}
                  <div className="flex items-center justify-between text-xs text-[#87967E] font-sans uppercase tracking-wider mb-1">
                    <span>{product.category}</span>
                    <span>{product.netWeight}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C] group-hover:text-[#B28A58] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Short Description */}
                  <p className="font-sans text-xs text-[#1C1C1C]/65 font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Pricing & Actions Box */}
                <div className="pt-5 mt-4 border-t border-[#E8DFC9]/60 space-y-3">
                  {/* Pricing Row */}
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-[#103B27]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs font-sans text-[#7A7A7A] line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    {savings > 0 && (
                      <span className="text-[11px] font-sans font-semibold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-sm">
                        Save ₹{savings.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Dual Action Buttons (Black + Gold like ALFA Beauty) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`w-full py-3 px-3 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? "bg-[#2E7D32] text-white"
                          : "bg-[#1C1C1C] hover:bg-[#103B27] text-[#FCF8F3]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>ADD TO CART</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => handleBuyNow(product, e)}
                      className="w-full py-3 px-3 rounded-full text-xs font-sans font-bold tracking-wider uppercase bg-[#B28A58] hover:bg-[#9E7444] text-[#FFFFFF] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>BUY NOW</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* WhatsApp Quick Order Link */}
                  <a
                    href={`https://wa.me/91${siteConfig.whatsappNumber}?text=Hi%20Rugby%20White%2C%20I%20want%20to%20order%20${encodeURIComponent(
                      product.name
                    )}%20(Price%20%E2%82%B9${product.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 text-[11px] font-sans font-medium text-[#103B27] hover:text-[#25D366] transition-colors pt-1"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                    <span>Order via WhatsApp (Instant Reply)</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCF8F3] py-20 text-center text-xs">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
