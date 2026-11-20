import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AmbarNavbar from "@/components/AmbarNavbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://rugbywhite.in"),
  title: "RUGBY WHITE | The Art of Skincare · Glow is not a trend. It's a feeling.",
  description:
    "Discover the beauty of thoughtful skincare. A refined daily ritual designed to bring care, confidence and simplicity into every moment. Care in every detail. Confidence in every moment.",
  keywords: [
    "Rugby White skincare",
    "Rugby White 10 Days Challenge",
    "The art of skincare",
    "Skincare cream",
    "Daily skincare routine",
    "Skincare products India",
    "Natural skincare ritual",
    "Radiance night cream",
  ],
  authors: [{ name: "Rugby White" }],
  creator: "Rugby White",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rugbywhite.in",
    siteName: "Rugby White Skincare",
    title: "RUGBY WHITE | The Art of Skincare · Glow is not a trend. It's a feeling.",
    description:
      "Discover the beauty of thoughtful skincare. A refined daily ritual designed to bring care, confidence and simplicity into every moment.",
    images: [
      {
        url: "/images/instagram/DYWq6HcIte1.jpg",
        width: 1200,
        height: 630,
        alt: "Rugby White Skincare Ritual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RUGBY WHITE | The Art of Skincare · Glow is not a trend. It's a feeling.",
    description:
      "Glow is not a trend. It's a feeling. Discover the Rugby White 10 Days Challenge skincare ritual.",
    images: ["/images/instagram/DYWq6HcIte1.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#581527" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://rugbywhite.in/#organization",
                  name: "Rugby White",
                  url: "https://rugbywhite.in",
                  logo: "https://rugbywhite.in/images/rugby-white-jar-hero.png",
                  sameAs: ["https://www.instagram.com/rugbywhite.in/"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+91-9562172556",
                    contactType: "customer service",
                    areaServed: "IN",
                    availableLanguage: ["en", "hi", "ml"],
                  },
                },
                {
                  "@type": "Product",
                  name: "Rugby White 10 Days Challenge",
                  image: "https://rugbywhite.in/images/rugby-white-jar-hero.png",
                  description:
                    "A daily skincare ritual cream formulated with botanical extracts and essential hydrators.",
                  brand: {
                    "@type": "Brand",
                    name: "Rugby White",
                  },
                  offers: {
                    "@type": "Offer",
                    url: "https://rugbywhite.in/products/10-days-challenge",
                    priceCurrency: "INR",
                    price: "750",
                    availability: "https://schema.org/InStock",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FEF7FB] text-[#2A1018] antialiased selection:bg-[#581527] selection:text-[#FEF7FB]">
        <CartProvider>
          <AmbarNavbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
