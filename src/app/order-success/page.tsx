"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  Package,
  ArrowRight,
  Clock,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#581527", "#AE3E64", "#EA90B5", "#F4CEDF"],
      });
    } catch {}

    if (!orderId) {
      setLoading(false);
      setError("No order reference provided.");
      return;
    }

    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.order) {
          setOrder(data.order);
        } else {
          setError(data.error || "Order not found");
        }
      })
      .catch((err) => {
        console.error("Failed to load order:", err);
        setError("Unable to load order details");
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEF7FB] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-10 h-10 text-[#581527] animate-spin mb-4" />
        <p className="font-serif text-lg text-[#581527]">Verifying Order Confirmation...</p>
        <p className="font-sans text-xs text-[#8A304C] mt-1">Please wait while we fetch your official order receipt.</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#FEF7FB] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-2xl border border-[#F4CEDF] shadow-sm space-y-4">
          <AlertCircle className="w-12 h-12 text-[#AE3E64] mx-auto" />
          <h2 className="font-serif text-2xl text-[#581527]">Order Not Found</h2>
          <p className="font-sans text-xs text-[#8A304C]">
            {error || "We could not locate this order reference."}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-[#581527] text-white text-xs font-sans tracking-widest uppercase font-bold"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF7FB] text-[#1C1C1C] pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-[#581527] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
          </div>
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            PAYMENT CONFIRMED · ORDER REGISTERED
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#581527] tracking-tight">
            Thank you, {order.customer?.fullName}!
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#8A304C] max-w-lg mx-auto">
            Your payment of <strong>₹{order.total?.toLocaleString("en-IN")}</strong> has been received securely via Razorpay. A confirmation email has been dispatched to <strong>{order.customer?.email}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-6 font-sans">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-[#F4CEDF] gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8A304C] font-semibold block">Order Reference ID</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#581527]">#{order.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#581527] text-white uppercase tracking-wider">
                {order.status || "Processing"}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] uppercase tracking-wider">
                PAID (RAZORPAY)
              </span>
            </div>
          </div>

          {/* Delivery & Dispatch Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#F4CEDF] text-xs">
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-[#8A304C] font-bold mb-2">Delivery Address</h4>
              <p className="font-semibold text-sm text-[#581527]">{order.customer?.fullName}</p>
              <p className="text-[#555] leading-relaxed mt-1">
                {order.customer?.address}<br />
                {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
              </p>
              <p className="text-[#8A304C] mt-2">Mobile: +91 {order.customer?.mobile}</p>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-[#8A304C] font-bold mb-2">Courier & Payment</h4>
              <p className="text-[#333]"><strong>Courier:</strong> {order.courier} (Air Express)</p>
              <p className="text-[#333] mt-1"><strong>AWB Tracking:</strong> <span className="font-mono font-bold text-[#581527]">{order.awb}</span></p>
              <p className="text-[#333] mt-1"><strong>Payment ID:</strong> <span className="font-mono text-xs">{order.payment?.razorpayPaymentId || order.payment?.transactionId || "Verified"}</span></p>
              <p className="text-[#333] mt-1"><strong>Estimated Delivery:</strong> 2–4 Business Days</p>
            </div>
          </div>

          {/* Items List */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-[#8A304C] font-bold mb-3">Items in Your Ritual</h4>
            <div className="space-y-3 divide-y divide-[#F4CEDF]">
              {order.items?.map((item: any) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg bg-[#FEF7FB] border border-[#F4CEDF] p-1 flex-shrink-0">
                      <Image
                        src={item.image || "/images/rugby-skin-revival.jpg"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm text-[#581527]">{item.name}</p>
                      <p className="text-[11px] text-[#8A304C]">Qty: {item.quantity} {item.netWeight ? `• ${item.netWeight}` : ""}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-[#581527]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#F4CEDF] space-y-2 text-xs">
              <div className="flex justify-between text-[#8A304C]">
                <span>Subtotal</span>
                <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[#8A304C]">
                <span>Pan-India Air Courier</span>
                <span className="text-[#059669] font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#581527] pt-2 border-t border-[#F4CEDF]">
                <span>Total Paid</span>
                <span>₹{order.total?.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={`/track-order?id=${order.id}`}
            className="w-full sm:w-auto px-8 py-4 bg-[#581527] hover:bg-[#3F0E1B] text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-bold rounded-full transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#EA90B5]" />
            <span>TRACK PARCEL STATUS</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 border border-[#581527] text-[#581527] hover:bg-[#581527] hover:text-white text-xs font-sans tracking-[0.2em] uppercase font-bold rounded-full transition-all"
          >
            CONTINUE SHOPPING
          </Link>
        </div>

        {/* Assurance Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs font-sans text-[#8A304C] pt-4">
          <div className="p-4 rounded-xl bg-white border border-[#F4CEDF] space-y-1">
            <ShieldCheck className="w-5 h-5 text-[#581527] mx-auto" />
            <p className="font-bold text-[#581527]">100% Authentic</p>
            <p className="text-[11px]">Tamper-evident holographic seal</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F4CEDF] space-y-1">
            <Truck className="w-5 h-5 text-[#581527] mx-auto" />
            <p className="font-bold text-[#581527]">Pan-India Air Express</p>
            <p className="text-[11px]">Complimentary air dispatch</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F4CEDF] space-y-1">
            <Sparkles className="w-5 h-5 text-[#581527] mx-auto" />
            <p className="font-bold text-[#581527]">10 Days Challenge</p>
            <p className="text-[11px]">Visible skin radiance guaranteed</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FEF7FB] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#581527] animate-spin" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
