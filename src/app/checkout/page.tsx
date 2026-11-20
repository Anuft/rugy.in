"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  AlertCircle,
  Lock,
  Loader2,
  Check,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

// Function to dynamically load Razorpay checkout script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

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
    
    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length !== 10) {
      errs.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Valid email is required to receive order receipts & tracking";
    }

    if (!formData.address.trim()) errs.address = "Complete delivery address is required";
    if (!formData.city.trim()) errs.city = "City / District is required";
    
    const cleanPincode = formData.pincode.replace(/\D/g, "");
    if (!cleanPincode || cleanPincode.length !== 6) {
      errs.pincode = "Please enter a valid 6-digit Indian PIN code";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    if (!validate()) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    if (items.length === 0) {
      setPaymentError("Your cart is empty. Please add products to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Ensure Razorpay checkout.js script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error(
          "Failed to load Razorpay payment gateway SDK. Please check your internet connection."
        );
      }

      // 2. Create Razorpay Order on server
      const orderPayload = {
        customer: {
          ...formData,
          mobile: formData.mobile.replace(/\D/g, ""),
          email: formData.email.trim(),
        },
        items: items.map((i) => ({
          id: i.product.id,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/payment/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create payment order on server.");
      }

      const { orderId, razorpayOrderId, amount, currency, keyId } = data;

      if (!keyId) {
        throw new Error(
          "Razorpay Public Key (NEXT_PUBLIC_RAZORPAY_KEY_ID) is not configured in environment variables."
        );
      }

      // 3. Configure Razorpay modal options
      const options = {
        key: keyId,
        amount,
        currency,
        name: "RUGBY WHITE",
        description: `Order #${orderId} · Skin Revival Ritual`,
        image: "/images/rugby-skin-revival-jar.png",
        order_id: razorpayOrderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile.replace(/\D/g, ""),
        },
        notes: {
          orderId,
          deliveryCity: formData.city,
        },
        theme: {
          color: "#581527", // Official Rugby Burgundy
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            setPaymentError("Payment window was closed. You can click 'Pay Now' to retry anytime.");
          },
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 4. Server-Side Signature Verification
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success && verifyData.order) {
              clearCart();
              router.push(`/order-success?id=${verifyData.order.id}`);
            } else {
              setPaymentError(
                verifyData.error ||
                  "Payment signature could not be verified by the server. Please contact support."
              );
              setIsSubmitting(false);
            }
          } catch (err: any) {
            console.error("Signature verification error:", err);
            setPaymentError(
              "An error occurred while verifying your payment. Please contact support with Payment ID: " +
                response.razorpay_payment_id
            );
            setIsSubmitting(false);
          }
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);

      razorpayInstance.on("payment.failed", function (response: any) {
        console.error("Razorpay payment failed:", response.error);
        setPaymentError(
          response.error?.description ||
            "Payment attempt failed or was declined. You can try another payment method."
        );
        setIsSubmitting(false);
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error("Checkout submission failed:", err);
      setPaymentError(err.message || "Failed to initiate payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  // If bag is empty
  if (items.length === 0) {
    return (
      <div className="bg-[#FEF7FB] min-h-screen pt-28 pb-24">
        <div className="max-w-md mx-auto text-center p-8 bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] space-y-4 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#581527]">Your cart is empty</h2>
          <p className="text-xs text-[#8A304C] font-sans">
            Please add products to your bag before checking out.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-[#581527] text-white text-xs font-sans tracking-widest uppercase font-bold inline-block hover:bg-[#3F0E1B] transition-colors"
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
            SECURE CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#581527] tracking-tight">
            Delivery &amp; Payment.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#8A304C] font-light">
            Enter your destination to complete your order via Razorpay secure checkout with complimentary air dispatch.
          </p>
        </div>

        {paymentError && (
          <div className="max-w-3xl mx-auto mb-8 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs font-sans">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block font-semibold">Payment Notice</strong>
              <p>{paymentError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleRazorpayPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 7 Columns: Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Recipient Information */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pb-3 border-b border-[#F4CEDF]">
                  1. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#581527] uppercase tracking-wider block">
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
                      <p className="text-[11px] text-[#AE3E64] font-sans">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#581527] uppercase tracking-wider block">
                      Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9207341674"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                    {errors.mobile && (
                      <p className="text-[11px] text-[#AE3E64] font-sans">{errors.mobile}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#581527] uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. adnan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[#AE3E64] font-sans">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pb-3 border-b border-[#F4CEDF]">
                  2. Shipping Destination
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#581527] uppercase tracking-wider block">
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
                      <p className="text-[11px] text-[#AE3E64] font-sans">{errors.address}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#581527] uppercase tracking-wider block">
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
                      <p className="text-[11px] text-[#AE3E64] font-sans">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#581527] uppercase tracking-wider block">
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
                    <label className="text-xs font-sans font-semibold text-[#581527] uppercase tracking-wider block">
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
                      <p className="text-[11px] text-[#AE3E64] font-sans">{errors.pincode}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#581527] uppercase tracking-wider block">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Leave with building security / Ring doorbell"
                      value={formData.orderNotes}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-sans focus:outline-none focus:border-[#AE3E64]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method - Pure Razorpay Online Gateway */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pb-3 border-b border-[#F4CEDF]">
                  3. Payment Method
                </h3>

                <div className="p-5 rounded-xl border-2 border-[#581527] bg-[#FEF7FB] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#581527] text-white flex items-center justify-center">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base text-[#581527] font-bold block">
                            Razorpay Secure Online Checkout
                          </span>
                          <span className="text-[9px] uppercase tracking-widest font-sans font-bold bg-[#581527] text-white px-2 py-0.5 rounded">
                            SECURE 256-BIT SSL
                          </span>
                        </div>
                        <span className="text-xs text-[#8A304C] font-sans">
                          Instant UPI (GPay, PhonePe, Paytm, QR), Cards (Visa, MasterCard, RuPay) &amp; NetBanking.
                        </span>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-[#581527] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#581527]" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F4CEDF] flex flex-wrap items-center gap-2 text-[11px] font-sans text-[#8A304C]">
                    <span className="bg-white border border-[#F4CEDF] px-2.5 py-1 rounded font-medium">Google Pay</span>
                    <span className="bg-white border border-[#F4CEDF] px-2.5 py-1 rounded font-medium">PhonePe</span>
                    <span className="bg-white border border-[#F4CEDF] px-2.5 py-1 rounded font-medium">Paytm</span>
                    <span className="bg-white border border-[#F4CEDF] px-2.5 py-1 rounded font-medium">Any UPI App</span>
                    <span className="bg-white border border-[#F4CEDF] px-2.5 py-1 rounded font-medium">Credit/Debit Card</span>
                    <span className="bg-white border border-[#F4CEDF] px-2.5 py-1 rounded font-medium">50+ NetBanking</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#8A304C] font-sans flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  <span>Orders are confirmed immediately upon verified server-side payment.</span>
                </p>
              </div>
            </div>

            {/* Right 5 Columns: Order Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#F4CEDF] p-6 sm:p-8 shadow-xs space-y-5 sticky top-28">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#581527] pb-3 border-b border-[#F4CEDF]">
                  Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
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
                        <p className="font-serif text-sm font-bold text-[#581527] truncate">
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
                <div className="pt-4 border-t border-[#F4CEDF] space-y-2 text-xs font-sans text-[#8A304C]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#581527]">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complimentary Pan-India Air Courier</span>
                    <span className="text-[#059669] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif font-bold text-[#581527] pt-3 border-t border-[#F4CEDF]">
                    <span>Total Payable</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Submit Razorpay Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-[#581527] hover:bg-[#3F0E1B] text-[#FEF7FB] text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#EA90B5]" />
                      <span>OPENING RAZORPAY GATEWAY...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#EA90B5]" />
                      <span>PAY NOW · ₹{total.toLocaleString("en-IN")}</span>
                      <ArrowRight className="w-4 h-4 text-[#EA90B5]" />
                    </>
                  )}
                </button>

                <div className="space-y-1.5 text-[11px] text-[#8A304C] font-sans pt-2 border-t border-[#F4CEDF]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#AE3E64]" />
                    <span>Free Air Express Delivery across India (2–4 Days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                    <span>100% Secure 256-Bit SSL Encrypted Transaction</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
