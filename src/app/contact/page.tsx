"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Clock, MapPin, Send, CheckCircle2, ChevronDown, PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { WhatsAppIcon, InstagramIcon } from "@/components/Icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "10 Days Challenge Consultation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FCF8F3] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#B28A58] font-bold block">
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] tracking-tight">
            Customer Concierge &amp; Inquiries.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#1C1C1C]/70 font-light leading-relaxed">
            Have questions about the Rugby White 10 Days Challenge, ordering, or wholesale packs? Connect directly with our skincare team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Columns: Concierge Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Priority Card */}
            <div className="p-8 rounded-2xl bg-[#103B27] text-[#FCF8F3] shadow-md border border-[#164E34] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#B28A58] font-bold">
                    FASTEST RESPONSE
                  </span>
                  <h3 className="font-serif text-xl font-bold">Official WhatsApp Support</h3>
                </div>
              </div>
              <p className="text-xs text-[#E8DFC9]/80 font-sans leading-relaxed">
                Connect directly with a dedicated skincare concierge for instant order placement, shipping tracking, or wholesale enquiries.
              </p>
              <a
                href={`https://wa.me/91${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans tracking-wider uppercase font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>CHAT ON WHATSAPP: {siteConfig.whatsappFormatted}</span>
              </a>
            </div>

            {/* Support Info Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E8DFC9] shadow-xs space-y-5 text-xs font-sans">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#B28A58] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1C1C] uppercase tracking-wider block">
                    Email Support
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-[#1C1C1C]/80 hover:text-[#B28A58] underline mt-0.5 block"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#B28A58] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1C1C] uppercase tracking-wider block">
                    Working Hours
                  </span>
                  <span className="text-[#1C1C1C]/80 mt-0.5 block">{siteConfig.supportHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <InstagramIcon className="w-5 h-5 text-[#B28A58] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C1C1C] uppercase tracking-wider block">
                    Official Instagram
                  </span>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1C1C1C]/80 hover:text-[#B28A58] underline mt-0.5 block"
                  >
                    {siteConfig.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E8DFC9] p-6 sm:p-10 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] mb-1">Send a Message</h3>
            <p className="text-xs text-[#87967E] font-sans mb-6">
              Our team responds to all customer questions within a few hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-[#FCF8F3] border border-[#B28A58] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#2E7D32] mx-auto" />
                <h4 className="font-serif text-xl font-bold text-[#1C1C1C]">Thank you for your note!</h4>
                <p className="text-xs text-[#1C1C1C]/80 font-sans max-w-sm mx-auto leading-relaxed">
                  Our team has received your inquiry and will connect with you shortly via WhatsApp or email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-6 py-2 rounded-full border border-[#B28A58] text-xs font-sans tracking-wider uppercase font-bold text-[#B28A58]"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCF8F3] border border-[#E8DFC9] rounded-lg text-xs font-sans focus:outline-none focus:border-[#B28A58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCF8F3] border border-[#E8DFC9] rounded-lg text-xs font-sans focus:outline-none focus:border-[#B28A58]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCF8F3] border border-[#E8DFC9] rounded-lg text-xs font-sans focus:outline-none focus:border-[#B28A58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCF8F3] border border-[#E8DFC9] rounded-lg text-xs font-sans focus:outline-none focus:border-[#B28A58] cursor-pointer"
                    >
                      <option value="10 Days Challenge Consultation">10 Days Challenge Consultation</option>
                      <option value="Order Tracking">Order &amp; Delivery Tracking</option>
                      <option value="Wholesale">Wholesale &amp; Reseller Packs</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How may our skincare team help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FCF8F3] border border-[#E8DFC9] rounded-lg text-xs font-sans focus:outline-none focus:border-[#B28A58]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#B28A58] hover:bg-[#9E7444] text-white text-xs font-sans tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
