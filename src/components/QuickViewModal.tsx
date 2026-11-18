"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { generateSingleProductWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden bg-[#F5F1E8] text-left shadow-2xl transition-all sm:my-8 w-full max-w-2xl border border-[#D8CBB7]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-[#20251F]/70 hover:text-[#103B27]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image Stage */}
            <div className="relative aspect-square sm:aspect-auto bg-[#FFFFFF] p-8 flex items-center justify-center">
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#103B27] text-[#F5F1E8] px-2.5 py-0.5 text-[10px] font-sans tracking-widest uppercase">
                  {product.badge}
                </div>
              )}
              <div className="relative w-full h-full min-h-[220px]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#87967E] block">
                  {product.category}
                </span>
                <h3 className="font-serif text-2xl text-[#103B27] leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 text-xs font-sans">
                  <div className="flex items-center text-[#C5A880]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#103B27]">{product.rating}</span>
                </div>

                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-serif text-2xl font-bold text-[#103B27]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#87967E] line-through font-sans">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                <p className="font-sans text-xs text-[#20251F]/80 leading-relaxed pt-1 line-clamp-3">
                  {product.shortDescription}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#D8CBB7] px-2 py-1.5 bg-[#FFFFFF]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:text-[#103B27] text-[#87967E]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:text-[#103B27] text-[#87967E]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-2.5 px-4 bg-[#103B27] text-[#F5F1E8] text-xs font-sans tracking-[0.18em] uppercase font-medium hover:bg-[#09291C] flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 px-4 bg-[#25D366] text-[#FFFFFF] text-xs font-sans tracking-[0.15em] uppercase font-medium hover:bg-[#20BA5A] flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>ORDER VIA WHATSAPP</span>
                </button>

                <div className="text-center pt-2">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="text-xs font-sans text-[#103B27] hover:underline tracking-wider uppercase inline-flex items-center gap-1"
                  >
                    <span>View full product details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
