"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const router = useRouter();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "RUGBY10") {
      setDiscountPercent(10);
      setCouponMessage("Success: 10% Welcome Discount Applied!");
    } else {
      setDiscountPercent(0);
      setCouponMessage("Invalid code. Use 'RUGBY10' for 10% off.");
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = total - discountAmount;

  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            YOUR SELECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#581527] tracking-tight">
            Shopping Cart.
          </h1>
          <p className="font-sans text-sm text-[#8A304C] font-light">
            Review your skincare items before proceeding to secure checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-8 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FEF7FB] border border-[#F4CEDF] flex items-center justify-center text-[#AE3E64] mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#581527]">Your cart is empty</h2>
            <p className="font-sans text-xs text-[#8A304C] leading-relaxed">
              Explore the Rugby White Skin Revival ritual and begin your glowing journey.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-[#581527] hover:bg-[#3F0E1B] text-[#FFFFFF] text-xs font-sans tracking-[0.2em] uppercase font-bold inline-block rounded-full transition-all shadow-sm"
              >
                DISCOVER THE COLLECTION
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 shadow-xs divide-y divide-[#F4CEDF]">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 bg-[#FEF7FB] rounded-xl overflow-hidden flex-shrink-0 border border-[#F4CEDF] p-2">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-serif text-lg font-bold text-[#581527] hover:text-[#AE3E64] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-[#8A304C] font-sans">
                          Net Wt: {item.product.netWeight} • Luxury Formula
                        </p>
                        <span className="font-sans font-bold text-sm text-[#581527] sm:hidden block">
                          ₹{item.product.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Price Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#F4CEDF] rounded-lg bg-[#FEF7FB]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 text-[#581527] hover:text-[#AE3E64] disabled:opacity-30 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-sans font-bold text-[#581527]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 text-[#581527] hover:text-[#AE3E64] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Line Price */}
                      <div className="text-right min-w-[80px]">
                        <span className="font-sans font-bold text-base text-[#581527]">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-[#8A304C] hover:text-[#581527] transition-colors cursor-pointer"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shopping Continues */}
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="text-xs font-sans tracking-wider uppercase text-[#AE3E64] font-bold hover:underline"
                >
                  ← CONTINUE SHOPPING
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 shadow-xs space-y-5">
                <h3 className="font-serif text-2xl font-bold text-[#581527] pb-3 border-b border-[#F4CEDF]">
                  Order Summary
                </h3>

                {/* Subtotals */}
                <div className="space-y-3 text-xs font-sans text-[#8A304C]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#581527]">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Complimentary Pan-India Air Courier</span>
                    <span className="text-[#059669] font-bold">FREE</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#059669] font-semibold">
                      <span>Discount (10%)</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xl font-serif font-bold text-[#581527] pt-4 border-t border-[#F4CEDF]">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="pt-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans uppercase placeholder:normal-case focus:outline-none focus:border-[#AE3E64]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#581527] hover:bg-[#3F0E1B] text-[#FFFFFF] text-xs font-sans tracking-wider uppercase font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      APPLY
                    </button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`text-[11px] font-sans ${
                        discountAmount > 0 ? "text-[#059669] font-semibold" : "text-[#AE3E64]"
                      }`}
                    >
                      {couponMessage}
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-4 px-6 rounded-full bg-[#581527] hover:bg-[#3F0E1B] text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-[#EA90B5]" />
                    <span>PROCEED TO SECURE CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 text-[#EA90B5]" />
                  </Link>
                </div>

                {/* Trust Info */}
                <div className="pt-4 border-t border-[#F4CEDF] space-y-2 text-[11px] text-[#8A304C] font-sans">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Secure Razorpay Payments (UPI / Cards / NetBanking)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#AE3E64]" />
                    <span>Dispatched in 24 Hours via Air Express</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
