import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Boutique | Rugby White Night Cream",
  description:
    "Shop the official Rugby White Night Cream (35g). Formulated with pure botanicals and niacinamide for glass-skin radiance. Free Pan-India air courier & instant WhatsApp order.",
  alternates: {
    canonical: "https://rugbywhite.in/shop",
  },
  openGraph: {
    title: "Official Boutique | Rugby White Night Cream",
    description:
      "Shop the official Rugby White Night Cream. Pure botanical night ritual with complimentary express delivery across India.",
    url: "https://rugbywhite.in/shop",
    images: [{ url: "/images/rugby-skin-revival.jpg" }],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
