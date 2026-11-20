"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { generateCartWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const orderUrl = generateCartWhatsAppUrl({
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      shipping: 0,
      total,
    });
    window.open(orderUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FEF7FB] text-[#1C1C1C] shadow-2xl flex flex-col justify-between border-l border-[#F4CEDF]">
          {/* Header */}
          <div className="p-5 border-b border-[#F4CEDF] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#AE3E64]" />
              <h2 className="font-serif text-xl font-bold text-[#1C1C1C]">
                Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#8A304C] hover:text-[#1C1C1C] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Strip */}
          <div className="px-5 py-2.5 bg-[#2E7D32]/10 border-b border-[#2E7D32]/20 text-xs font-sans flex items-center gap-2 text-[#2E7D32] font-semibold">
            <Truck className="w-4 h-4 flex-shrink-0" />
            <span>Complimentary Pan-India Express Shipping on your order!</span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#F4CEDF] flex items-center justify-center text-[#AE3E64]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-xl font-bold text-[#1C1C1C]">Your cart is empty</p>
                  <p className="text-xs text-[#8A304C] max-w-xs font-sans">
                    Begin your 10-day radiance transformation with Rugby White.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-3 px-6 py-3 rounded-full bg-[#AE3E64] hover:bg-[#8A304C] text-[#FFFFFF] text-xs font-sans tracking-wider uppercase font-bold transition-all shadow-xs"
                >
                  DISCOVER THE COLLECTION
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] flex gap-4"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-[#FEF7FB] rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center p-1.5 border border-[#F4CEDF]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-serif text-base font-bold text-[#1C1C1C] hover:text-[#AE3E64] leading-tight line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-[11px] text-[#8A304C] font-sans mt-0.5">
                          {item.product.netWeight}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#8A304C] hover:text-[#E53935] p-1 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#F4CEDF] rounded-full bg-[#FEF7FB] px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-[#AE3E64] text-[#8A304C] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-sans font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-[#AE3E64] text-[#8A304C] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-serif font-bold text-base text-[#581527]">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-[#FFFFFF] border-t border-[#F4CEDF] space-y-4 shadow-sm">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#1C1C1C]/80">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#1C1C1C]/80">
                  <span>Pan-India Delivery</span>
                  <span className="text-[#2E7D32] font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-serif font-bold text-[#581527] pt-2 border-t border-[#F4CEDF]">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 px-6 rounded-full bg-[#AE3E64] hover:bg-[#8A304C] text-[#FFFFFF] text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans tracking-wider uppercase font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>ORDER ON WHATSAPP</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-1 flex items-center justify-center gap-3 text-[11px] text-[#8A304C] font-sans">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Cash on Delivery</span>
                </div>
                <span>•</span>
                <div>100% Genuine Botanical</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
