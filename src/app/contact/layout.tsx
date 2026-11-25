import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Concierge & Inquiries | Rugby White",
  description:
    "Connect with the Rugby White concierge team. Contact us via WhatsApp (+91 92073 41674) or email for consultations, tracking, and inquiries.",
  alternates: {
    canonical: "https://rugbywhite.in/contact",
  },
  openGraph: {
    title: "Customer Concierge & Inquiries | Rugby White",
    description:
      "Get in touch with Rugby White customer support and skincare consultation.",
    url: "https://rugbywhite.in/contact",
    images: [{ url: "/images/rugby-skin-revival.jpg" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
