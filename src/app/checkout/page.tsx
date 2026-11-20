"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Banknote,
  Check,
  Loader2,
  QrCode,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/data/siteConfig";
import { generateCartWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";
import PaymentGatewayModal from "@/components/PaymentGatewayModal";

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "Kerala",
    pincode: "",
    orderNotes: "",
    whatsappOptIn: true,
  });

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "whatsapp" | "online">("online");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      errs.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.address.trim()) errs.address = "Complete delivery address is required";
    if (!formData.city.trim()) errs.city = "City / District is required";
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = "Please enter a valid 6-digit PIN code";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getPayloadItems = () =>
    items.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      image: i.product.images[0],
      netWeight: i.product.netWeight,
    }));

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    // If Online Payment is chosen, open the Payment Gateway Modal directly
    if (paymentMethod === "online") {
      setIsPaymentModalOpen(true);
      return;
    }

    // COD or WhatsApp direct backend persistence
    setIsSubmitting(true);

    try {
      const orderPayload = {
        items: getPayloadItems(),
        customer: formData,
        subtotal,
        shipping: 0,
        total,
        payment: {
          method: paymentMethod,
          provider: paymentMethod === "cod" ? "cod" : "whatsapp",
          status: paymentMethod === "cod" ? "cod_verified" : "pending",
          currency: "INR",
        },
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data.success && data.order) {
        setConfirmedOrder(data.order);

        // If WhatsApp checkout, open wa.me with filled order & backend ID
        if (paymentMethod === "whatsapp") {
          const waUrl = generateCartWhatsAppUrl({
            items: items.map((i) => ({
              name: i.product.name,
              quantity: i.quantity,
              price: i.product.price,
            })),
            subtotal,
            shipping: 0,
            total,
            customerName: formData.fullName,
            phone: formData.mobile,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            notes: `Order Ref: ${data.order.id}. ${formData.orderNotes || ""}`,
          });
          window.open(waUrl, "_blank");
        }

        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#581527", "#AE3E64", "#8A304C"],
          });
        } catch {}

        setIsSubmitting(false);
        setOrderConfirmed(true);
        clearCart();
      } else {
        alert(data.error || "Failed to place order. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Order submit failed:", err);
      alert("Failed to connect to checkout backend. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleOnlinePaymentSuccess = (confirmed: any) => {
    setIsPaymentModalOpen(false);
    setConfirmedOrder(confirmed);
    setOrderConfirmed(true);
    clearCart();
  };

  // If order is completed, show order confirmation screen with real backend data
  if (orderConfirmed && confirmedOrder) {
    return (
      <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-16 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-18 h-18 rounded-full bg-[#581527] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
              ORDER CONFIRMED &amp; REGISTERED
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#581527]">
              Thank you, {confirmedOrder.customer?.fullName || formData.fullName}!
            </h1>
            <p className="font-sans text-xs text-[#8A304C]">
              Order Reference ID:{" "}
              <span className="font-mono text-[#581527] font-bold text-sm bg-[#FDEAF3] px-2.5 py-1 rounded">
                {confirmedOrder.id}
              </span>
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#F4CEDF] shadow-xs text-left space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-[#F4CEDF] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#1C1C1C]">
                DISPATCH &amp; DELIVERY SUMMARY
              </h3>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#2E7D32]/10 text-[#2E7D32]">
                {confirmedOrder.status}
              </span>
            </div>

            <p className="text-[#1C1C1C]/80 leading-relaxed">
              We have received your order and registered it in our fulfillment system. Tracking updates will be sent to{" "}
              <strong className="text-[#581527]">{confirmedOrder.customer?.mobile || formData.mobile}</strong>.
            </p>

            <div className="pt-2 border-t border-[#F4CEDF] space-y-2 text-[#8A304C]">
              <p>• <strong>Courier Partner:</strong> {confirmedOrder.courier} (Air Express)</p>
              <p>• <strong>Airway Bill (AWB):</strong> <span className="font-mono text-[#581527] font-bold">{confirmedOrder.awb}</span></p>
              <p>• <strong>Destination:</strong> {confirmedOrder.customer?.address}, {confirmedOrder.customer?.city}, {confirmedOrder.customer?.state} - {confirmedOrder.customer?.pincode}</p>
              <p>• <strong>Payment Mode:</strong>{" "}
                <span className="text-[#581527] font-semibold">
                  {confirmedOrder.payment?.method === "cod"
                    ? "Cash on Delivery (Pay at Doorstep)"
                    : confirmedOrder.payment?.method === "whatsapp"
                    ? "WhatsApp Order"
                    : `Prepaid (${confirmedOrder.payment?.provider?.toUpperCase()} Verified)`}
                </span>
              </p>
              {confirmedOrder.payment?.transactionId && (
                <p>• <strong>Transaction Ref:</strong> <span className="font-mono text-xs">{confirmedOrder.payment.transactionId}</span></p>
              )}
              <p>• <strong>Total Amount:</strong> ₹{confirmedOrder.total?.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/track-order?id=${confirmedOrder.id}`}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#581527] hover:bg-[#3F0E1B] text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-bold rounded-full transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-[#AE3E64]" />
              <span>LIVE TRACK THIS PARCEL</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#581527] text-[#581527] hover:bg-[#581527] hover:text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-bold rounded-full transition-all"
            >
              RETURN TO HOMEPAGE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If bag is empty
  if (items.length === 0) {
    return (
      <div className="bg-[#FEF7FB] min-h-screen pt-20 pb-24">
        <div className="max-w-md mx-auto text-center p-8 bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#1C1C1C]">Your cart is empty</h2>
          <p className="text-xs text-[#8A304C] font-sans">
            Please add items to your shopping cart before checking out.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-[#581527] text-white text-xs font-sans tracking-widest uppercase font-bold inline-block"
          >
            DISCOVER THE COLLECTION
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF7FB] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block">
            CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
            Delivery &amp; Payment.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#1C1C1C]/70 font-light">
            Enter your shipping destination to receive your Rugby White order with free air courier.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Form */}
            <div className="lg:col-span-7 space-y-6">
              {/* Recipient Information */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C] pb-3 border-b border-[#F4CEDF]">
                  1. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ahamed Adnan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-[#E53935] font-sans">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9562172556"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                    {errors.mobile && (
                      <p className="text-[11px] text-[#E53935] font-sans">{errors.mobile}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. yourname@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-sans text-[#1C1C1C]/80">
                      <input
                        type="checkbox"
                        checked={formData.whatsappOptIn}
                        onChange={(e) => setFormData({ ...formData, whatsappOptIn: e.target.checked })}
                        className="rounded text-[#25D366] focus:ring-[#25D366]"
                      />
                      <span>Receive real-time courier tracking updates on WhatsApp</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C] pb-3 border-b border-[#F4CEDF]">
                  2. Shipping Destination
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      House / Flat / Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 302, Emerald Heights, Beach Road"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-[#E53935] font-sans">{errors.address}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      City / District *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kozhikode"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                    {errors.city && (
                      <p className="text-[11px] text-[#E53935] font-sans">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64] cursor-pointer"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      PIN Code (6 digits) *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 673001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                    {errors.pincode && (
                      <p className="text-[11px] text-[#E53935] font-sans">{errors.pincode}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deliver before 5 PM / Ring door bell"
                      value={formData.orderNotes}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C] pb-3 border-b border-[#F4CEDF]">
                  3. Payment Method
                </h3>

                <div className="space-y-3">
                  {/* Online UPI / Card Gateway */}
                  <label
                    onClick={() => setPaymentMethod("online")}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "online"
                        ? "border-[#581527] bg-[#FEF7FB] ring-1 ring-[#581527]"
                        : "border-[#F4CEDF] bg-[#FFFFFF] hover:border-[#AE3E64]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#581527]/10 flex items-center justify-center text-[#581527]">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base text-[#581527] font-bold block">
                            Instant UPI QR, GPay, PhonePe, Cards &amp; NetBanking
                          </span>
                          <span className="text-[9px] uppercase tracking-widest font-sans font-bold bg-[#581527] text-white px-2 py-0.5 rounded">
                            RECOMMENDED
                          </span>
                        </div>
                        <span className="text-xs text-[#8A304C] font-sans">
                          Instant NPCI QR code, auto-verified gateway payment with priority air shipping.
                        </span>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border border-[#581527] flex items-center justify-center">
                      {paymentMethod === "online" && (
                        <div className="w-3 h-3 rounded-full bg-[#581527]" />
                      )}
                    </div>
                  </label>

                  {/* Cash On Delivery (COD) */}
                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#581527] bg-[#FEF7FB] ring-1 ring-[#581527]"
                        : "border-[#F4CEDF] bg-[#FFFFFF] hover:border-[#AE3E64]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#AE3E64]/10 flex items-center justify-center text-[#AE3E64]">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-serif text-base text-[#581527] font-bold block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-xs text-[#8A304C] font-sans">
                          Pay cash or UPI upon courier arrival at your doorstep.
                        </span>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border border-[#581527] flex items-center justify-center">
                      {paymentMethod === "cod" && (
                        <div className="w-3 h-3 rounded-full bg-[#581527]" />
                      )}
                    </div>
                  </label>

                  {/* WhatsApp Direct Order */}
                  <label
                    onClick={() => setPaymentMethod("whatsapp")}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "whatsapp"
                        ? "border-[#25D366] bg-[#25D366]/5 ring-1 ring-[#25D366]"
                        : "border-[#F4CEDF] bg-[#FFFFFF] hover:border-[#25D366]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                        <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
                      </div>
                      <div>
                        <span className="font-serif text-base text-[#581527] font-bold block">
                          Direct WhatsApp Concierge Order
                        </span>
                        <span className="text-xs text-[#8A304C] font-sans">
                          Auto-registers backend order reference and connects with WhatsApp desk (+91 95621 72556).
                        </span>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border border-[#25D366] flex items-center justify-center">
                      {paymentMethod === "whatsapp" && (
                        <div className="w-3 h-3 rounded-full bg-[#25D366]" />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Order Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-5 sticky top-28">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C] pb-3 border-b border-[#F4CEDF]">
                  Your Order ({items.reduce((s, i) => s + i.quantity, 0)} items)
                </h3>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#F4CEDF]">
                  {items.map((item) => (
                    <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-[#FEF7FB] rounded-lg flex-shrink-0 p-1 border border-[#F4CEDF]">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm font-bold text-[#1C1C1C] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-[#8A304C] font-sans">
                          Qty: {item.quantity} • {item.product.netWeight}
                        </p>
                      </div>
                      <span className="font-sans font-bold text-xs text-[#581527]">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-[#F4CEDF] space-y-2 text-xs font-sans text-[#1C1C1C]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pan-India Air Courier</span>
                    <span className="text-[#2E7D32] font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif font-bold text-[#581527] pt-3 border-t border-[#F4CEDF]">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-[#581527] hover:bg-[#3F0E1B] text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#AE3E64]" />
                      <span>PROCESSING ORDER...</span>
                    </>
                  ) : paymentMethod === "online" ? (
                    <>
                      <span>PROCEED TO PAYMENT (₹{total.toLocaleString("en-IN")})</span>
                      <ArrowRight className="w-4 h-4 text-[#AE3E64]" />
                    </>
                  ) : paymentMethod === "whatsapp" ? (
                    <>
                      <span>ORDER VIA WHATSAPP (₹{total.toLocaleString("en-IN")})</span>
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                    </>
                  ) : (
                    <>
                      <span>CONFIRM COD ORDER (₹{total.toLocaleString("en-IN")})</span>
                      <ArrowRight className="w-4 h-4 text-[#AE3E64]" />
                    </>
                  )}
                </button>

                <div className="space-y-1.5 text-[11px] text-[#8A304C] font-sans pt-2 border-t border-[#F4CEDF]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#AE3E64]" />
                    <span>Free Express Delivery across India (2–4 Days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Holographic Tamper Seal &amp; Fresh Batch Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Interactive Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderAmount={total}
        orderData={{
          items: getPayloadItems(),
          customer: formData,
          subtotal,
          shipping: 0,
          total,
        }}
        onPaymentSuccess={handleOnlinePaymentSuccess}
      />
    </div>
  );
}
