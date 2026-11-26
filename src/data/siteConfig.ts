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
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
  freeShippingThreshold: number;
  deliveryTimeDays: string;
  announcements: string[];
}

export const siteConfig: SiteConfig = {
  brandName: "SHOELOCK",
  brandTagline: "FIND YOUR NEXT PAIR. STEP INTO A DIFFERENT LEAGUE.",
  brandMonogram: "SL",
  whatsappNumber: "919876543210",
  whatsappFormatted: "+91 98765 43210",
  instagramUrl: "https://www.instagram.com/shoelock._/",
  instagramHandle: "@shoelock._",
  contactEmail: "concierge@shoelock.com",
  supportHours: "Monday – Saturday: 10:00 AM – 8:00 PM IST",
  address: {
    line1: "The Vault, Unit 4B, Sneaker District, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    postalCode: "560038",
  },
  currency: {
    symbol: "₹",
    code: "INR",
  },
  freeShippingThreshold: 4999,
  deliveryTimeDays: "2-4 Business Days Express Insured Delivery",
  announcements: [
    "THE LATEST DROP IS LIVE — LIMITED QUANTITIES AVAILABLE",
    "COMPLIMENTARY EXPRESS NATIONWIDE SHIPPING ON ORDERS ABOVE ₹4,999",
    "EVERY PAIR 100% AUTHENTICATED & SANITIZED BEFORE DISPATCH",
    "USE CODE 'LOCKED10' FOR 10% OFF YOUR FIRST DROP ORDER",
  ],
};

export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP ALL", href: "/shop" },
  { label: "SNEAKERS", href: "/shop?category=Sneakers" },
  { label: "MEN", href: "/shop?gender=men" },
  { label: "WOMEN", href: "/shop?gender=women" },
  { label: "NEW ARRIVALS", href: "/shop?filter=new" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export const categoryLinks = [
  {
    id: "lifestyle",
    name: "Lifestyle Sneakers",
    slug: "lifestyle",
    description: "Iconic daily grails engineered for effortless streetwear style.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80",
    itemCount: "24 Pairs",
  },
  {
    id: "running",
    name: "Running Shoes",
    slug: "running",
    description: "High-cushion, responsive performance and high-mileage road silhouettes.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    itemCount: "18 Pairs",
  },
  {
    id: "streetwear",
    name: "Streetwear",
    slug: "streetwear",
    description: "High-heat collabs, skate lows, and forward-thinking fashion silhouettes.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
    itemCount: "32 Pairs",
  },
  {
    id: "basketball",
    name: "Basketball Shoes",
    slug: "basketball",
    description: "Court-dominating retros and state-of-the-art ankle lock technology.",
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=80",
    itemCount: "16 Pairs",
  },
  {
    id: "premium-collection",
    name: "Premium Collection",
    slug: "premium-collection",
    description: "Ultra-rare deadstock, numbered archival releases, and grail grails.",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80",
    itemCount: "12 Pairs",
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "This week's freshest verified intake and exclusive online drops.",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80",
    itemCount: "20 Pairs",
  },
];

export const legalLinks = [
  { label: "SHIPPING & DELIVERY", href: "/shipping-returns" },
  { label: "RETURN & EXCHANGE POLICY", href: "/shipping-returns#returns" },
  { label: "AUTHENTICITY GUARANTEE", href: "/about#authenticity" },
  { label: "PRIVACY POLICY", href: "/privacy-policy" },
  { label: "TERMS OF SERVICE", href: "/terms" },
];
