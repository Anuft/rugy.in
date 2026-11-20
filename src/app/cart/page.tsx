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
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { generateCartWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

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

  const handleWhatsAppOrder = () => {
    const url = generateCartWhatsAppUrl({
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      shipping: 0,
      total: finalTotal,
      notes: discountPercent > 0 ? `Applied voucher: ${couponCode.toUpperCase()}` : undefined,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            YOUR SELECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
            Shopping Cart.
          </h1>
          <p className="font-sans text-sm text-[#1C1C1C]/70 font-light">
            Review your skincare items before proceeding to secure checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-8 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FEF7FB] border border-[#F4CEDF] flex items-center justify-center text-[#AE3E64] mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1C1C1C]">Your cart is empty</h2>
            <p className="font-sans text-xs text-[#8A304C] leading-relaxed">
              Explore the Rugby White 10 Days Challenge and start your glowing skincare routine.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-[#AE3E64] hover:bg-[#8A304C] text-[#FFFFFF] text-xs font-sans tracking-[0.2em] uppercase font-bold inline-block rounded-full transition-all shadow-sm"
              >
                DISCOVER THE COLLECTION
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Cart Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Strip */}
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#F4CEDF] flex items-center justify-between text-xs font-sans">
                <div className="flex items-center gap-2 text-[#2E7D32] font-semibold">
                  <Truck className="w-4 h-4" />
                  <span>Complimentary Pan-India Express Shipping Unlocked!</span>
                </div>
                <span className="text-[#8A304C]">FREE</span>
              </div>

              {/* Items List */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] divide-y divide-[#F4CEDF] shadow-xs overflow-hidden">
                {items.map((item) => (
                  <div key={item.product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center">
                    {/* Thumbnail */}
                    <div className="relative w-22 h-22 sm:w-24 sm:h-24 bg-[#FEF7FB] rounded-xl flex-shrink-0 p-2 border border-[#F4CEDF]">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <span className="text-[10px] font-sans tracking-wider uppercase text-[#8A304C] font-semibold">
                        {item.product.category}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1C1C]">
                        <Link href={`/products/${item.product.slug}`} className="hover:text-[#AE3E64] transition-colors">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#8A304C] font-sans">
                        ₹{item.product.price.toLocaleString("en-IN")} • {item.product.netWeight}
                      </p>
                    </div>

                    {/* Quantity Adjustment */}
                    <div className="flex items-center border border-[#F4CEDF] rounded-full px-2.5 py-1 bg-[#FEF7FB]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-[#AE3E64] text-[#8A304C] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-[#AE3E64] text-[#8A304C] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-center sm:text-right min-w-[100px]">
                      <span className="font-serif text-xl font-bold text-[#581527]">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-[#8A304C] hover:text-[#E53935] transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
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
                <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] pb-3 border-b border-[#F4CEDF]">
                  Order Summary
                </h3>

                {/* Subtotals */}
                <div className="space-y-3 text-xs font-sans text-[#1C1C1C]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Pan-India Delivery</span>
                    <span className="text-[#2E7D32] font-semibold">FREE</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#2E7D32] font-semibold">
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
                      className="px-5 py-2.5 bg-[#1C1C1C] hover:bg-[#AE3E64] text-[#FFFFFF] text-xs font-sans tracking-wider uppercase font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      APPLY
                    </button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`text-[11px] font-sans ${
                        discountAmount > 0 ? "text-[#2E7D32] font-semibold" : "text-[#E53935]"
                      }`}
                    >
                      {couponMessage}
                    </p>
                  )}
                </form>

                {/* Checkout CTAs */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-4 px-6 rounded-full bg-[#AE3E64] hover:bg-[#8A304C] text-[#FFFFFF] text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-[#FFFFFF] text-xs font-sans tracking-wider uppercase font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>ORDER ON WHATSAPP</span>
                  </button>
                </div>

                {/* Trust Info */}
                <div className="pt-4 border-t border-[#F4CEDF] space-y-2 text-[11px] text-[#8A304C] font-sans">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Cash On Delivery (COD) Available</span>
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
