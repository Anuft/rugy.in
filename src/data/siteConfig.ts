export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  brandMonogram: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  instagramUrl: string;
  instagramHandle: string;
  contactEmail: string;
  supportHours: string;
  currency: {
    symbol: string;
    code: string;
  };
  freeShippingThreshold: number;
  deliveryTimeDays: string;
}

export const siteConfig: SiteConfig = {
  brandName: "RUGBY WHITE",
  brandTagline: "THE ART OF EVERYDAY SKINCARE.",
  brandMonogram: "RB",
  whatsappNumber: "9207341674",
  whatsappFormatted: "+91 92073 41674",
  instagramUrl: "https://www.instagram.com/rugbywhite.in/",
  instagramHandle: "@rugbywhite.in",
  contactEmail: "care@rugbywhite.in",
  supportHours: "Monday – Saturday: 9:00 AM – 8:00 PM IST",
  currency: {
    symbol: "₹",
    code: "INR",
  },
  freeShippingThreshold: 0,
  deliveryTimeDays: "2-4 Business Days Express across India",
};

export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "NIGHT CREAM", href: "/products/10-days-challenge" },
  { label: "FACE REVIEWS", href: "/#face-reviews" },
  { label: "TRACK ORDER", href: "/track-order" },
  { label: "OUR STORY", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export const legalLinks = [
  { label: "PRIVACY POLICY", href: "/privacy-policy" },
  { label: "TERMS & CONDITIONS", href: "/terms" },
  { label: "SHIPPING & RETURNS", href: "/shipping-returns" },
  { label: "TRACK YOUR ORDER", href: "/track-order" },
  { label: "ADMIN FULFILLMENT", href: "/admin/orders" },
];
