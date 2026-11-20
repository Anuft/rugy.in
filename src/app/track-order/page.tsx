"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  PhoneCall,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CreditCard,
  Banknote,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { WhatsAppIcon } from "@/components/Icons";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [query, setQuery] = useState(initialId);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setSearched(true);
    setErrorMessage("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?query=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();

      if (data.success && data.orders && data.orders.length > 0) {
        setOrder(data.orders[0]);
      } else {
        setErrorMessage(
          `No active order found matching "${searchQuery}". Please check your 6-digit Order ID (e.g. RW-782419) or 10-digit mobile number.`
        );
      }
    } catch (err) {
      console.error("Track error:", err);
      setErrorMessage("Unable to connect to live logistics database. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      setQuery(initialId);
      performSearch(initialId);
    }
  }, [initialId]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            REAL-TIME LOGISTICS &amp; FULFILLMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#581527] tracking-tight">
            Track Your Order.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#1C1C1C]/70 font-light">
            Enter your Order ID (e.g. RW-782419) or registered 10-digit mobile number to view real-time delivery status.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs max-w-2xl mx-auto mb-8">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8A304C] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Order ID (RW-...) or 10-digit Mobile Number"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-xl text-xs font-sans focus:outline-none focus:border-[#581527]"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-[#581527] hover:bg-[#3F0E1B] text-[#FEF7FB] text-xs font-sans tracking-wider uppercase font-bold rounded-xl transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#AE3E64]" />
                    <span>LOCATING...</span>
                  </>
                ) : (
                  <span>TRACK</span>
                )}
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-between text-[11px] text-[#8A304C] font-sans gap-2">
              <span>Try demo order IDs: <button type="button" onClick={() => { setQuery("RW-782419"); performSearch("RW-782419"); }} className="font-mono text-[#581527] underline cursor-pointer">RW-782419</button> or <button type="button" onClick={() => { setQuery("RW-651290"); performSearch("RW-651290"); }} className="font-mono text-[#581527] underline cursor-pointer">RW-651290</button></span>
              <span>Airway Bill updates dispatched via WhatsApp</span>
            </div>
          </form>
        </div>

        {/* Error State */}
        {searched && !isLoading && errorMessage && (
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E53935]/30 p-6 sm:p-8 max-w-2xl mx-auto space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E53935]/10 text-[#E53935] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C1C1C]">Order Not Found</h3>
            <p className="text-xs text-[#8A304C] font-sans max-w-md mx-auto leading-relaxed">
              {errorMessage}
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/91${siteConfig.whatsappNumber}?text=Hi%20Rugby%20White%2C%20I%20need%20help%20locating%20my%20order%20status.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>CHAT WITH CONCIERGE DESK</span>
              </a>
            </div>
          </div>
        )}

        {/* Tracking Result Stage */}
        {searched && !isLoading && order && (
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6 animate-fade-in">
            {/* Top Status Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F4CEDF] gap-3">
              <div>
                <span className="text-[10px] font-sans tracking-wider text-[#8A304C] uppercase block">
                  ORDER REFERENCE
                </span>
                <span className="font-mono text-xl font-bold text-[#581527]">
                  {order.id}
                </span>
                <p className="text-[11px] text-[#8A304C] font-sans">
                  Booked on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#FEF7FB] px-3.5 py-1.5 rounded-full border border-[#F4CEDF]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse" />
                <span className="text-xs font-sans font-bold text-[#2E7D32] uppercase tracking-wider">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Courier & AWB Details */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans p-4 rounded-xl bg-[#FEF7FB] border border-[#F4CEDF]">
              <div>
                <span className="text-[#8A304C] block text-[10px] uppercase font-semibold">Courier Partner</span>
                <span className="font-bold text-[#581527] text-sm">{order.courier}</span>
              </div>
              <div>
                <span className="text-[#8A304C] block text-[10px] uppercase font-semibold">Airway Bill (AWB)</span>
                <span className="font-mono font-bold text-[#581527] text-sm">{order.awb}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 pt-1">
              <span className="text-[10px] font-sans tracking-wider text-[#8A304C] uppercase block font-semibold">
                PARCEL CONTENTS ({order.items?.length || 0} ITEMS)
              </span>
              <div className="space-y-2 divide-y divide-[#F4CEDF]">
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center gap-3 text-xs font-sans">
                    <div className="relative w-10 h-10 bg-[#FEF7FB] rounded-lg overflow-hidden border border-[#F4CEDF] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-[#1C1C1C] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#8A304C]">
                        Qty: {item.quantity} • {item.netWeight || "50g"}
                      </p>
                    </div>
                    <span className="font-bold text-[#581527]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Summary */}
            <div className="p-4 rounded-xl bg-[#FEF7FB] border border-[#F4CEDF] space-y-2 text-xs font-sans">
              <div className="flex justify-between text-[#8A304C]">
                <span>Customer</span>
                <span className="font-medium text-[#1C1C1C]">{order.customer?.fullName} ({order.customer?.mobile})</span>
              </div>
              <div className="flex justify-between text-[#8A304C]">
                <span>Destination</span>
                <span className="font-medium text-[#1C1C1C] text-right max-w-[260px] truncate">
                  {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
                </span>
              </div>
              <div className="flex justify-between text-[#8A304C] pt-2 border-t border-[#F4CEDF]">
                <span>Payment Mode</span>
                <span className="font-bold text-[#581527] uppercase">
                  {order.payment?.method === "online"
                    ? `Prepaid (${order.payment?.provider || "Online"}) — PAID`
                    : order.payment?.method === "cod"
                    ? "Cash On Delivery (Pay on Arrival)"
                    : "WhatsApp Order"}
                </span>
              </div>
              {order.payment?.transactionId && (
                <div className="flex justify-between text-[11px] text-[#8A304C]">
                  <span>Transaction Ref</span>
                  <span className="font-mono">{order.payment.transactionId}</span>
                </div>
              )}
            </div>

            {/* Timeline Milestones */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif text-base font-bold text-[#581527]">
                Delivery Milestones
              </h4>
              <div className="space-y-4 relative pl-6 border-l-2 border-[#581527]/30">
                {order.timeline?.map((step: any, idx: number) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                        step.done ? "bg-[#581527] text-white" : "bg-[#F4CEDF] text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${step.done ? "text-[#581527]" : "text-[#8A304C]"}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] text-[#8A304C] font-sans">{step.date}</span>
                      </div>
                      <p className="text-[11px] text-[#8A304C] font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help WhatsApp CTA */}
            <div className="pt-4 border-t border-[#F4CEDF] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#8A304C] font-sans">
                Need delivery instructions or priority routing?
              </span>
              <a
                href={`https://wa.me/91${siteConfig.whatsappNumber}?text=Hi%20Rugby%20White%2C%20I%20need%20assistance%20tracking%20my%20order%20${order.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-sans font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs hover:bg-[#1fb355] transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                <span>CHAT WITH CONCIERGE</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FEF7FB] min-h-screen pt-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#581527] animate-spin" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
