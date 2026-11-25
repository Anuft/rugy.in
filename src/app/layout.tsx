import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AmbarNavbar from "@/components/AmbarNavbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://rugbywhite.in"),
  title: {
    default: "RUGBY WHITE | The Art of Skincare · Glow is not a trend. It's a feeling.",
    template: "%s | RUGBY WHITE",
  },
  description:
    "Discover the beauty of thoughtful skincare. A refined daily ritual designed to bring care, confidence and simplicity into every moment. Formulated with pure botanicals and niacinamide for glass-skin radiance.",
  keywords: [
    "Rugby White",
    "Rugby White skincare",
    "Rugby White Night Cream",
    "Radiance night ritual cream",
    "Glass skin routine India",
    "Botanical night cream",
    "Natural skincare ritual",
    "Dermatologically tested cream",
  ],
  authors: [{ name: "Rugby White", url: "https://rugbywhite.in" }],
  creator: "Rugby White",
  publisher: "Rugby White",
  alternates: {
    canonical: "https://rugbywhite.in",
  },
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
        url: "/images/rugby-skin-revival.jpg",
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
      "Glow is not a trend. It's a feeling. Discover the Rugby White Night Cream skincare ritual.",
    images: ["/images/rugby-skin-revival.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap"
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
                    telephone: "+91-9207341674",
                    contactType: "customer service",
                    areaServed: "IN",
                    availableLanguage: ["en", "hi", "ml"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://rugbywhite.in/#website",
                  url: "https://rugbywhite.in",
                  name: "Rugby White",
                  publisher: {
                    "@id": "https://rugbywhite.in/#organization",
                  },
                },
                {
                  "@type": "Product",
                  name: "Rugby White Night Cream",
                  image: "https://rugbywhite.in/images/rugby-skin-revival-jar.png",
                  description:
                    "A daily radiance nourishing night ritual cream formulated with botanical extracts and essential hydrators for luminous glass-skin.",
                  sku: "RW-NC-35G",
                  brand: {
                    "@type": "Brand",
                    name: "Rugby White",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "328",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  offers: {
                    "@type": "Offer",
                    url: "https://rugbywhite.in/products/rugby-white-night-cream",
                    priceCurrency: "INR",
                    price: "599",
                    priceValidUntil: "2027-12-31",
                    itemCondition: "https://schema.org/NewCondition",
                    availability: "https://schema.org/InStock",
                    shippingDetails: {
                      "@type": "OfferShippingDetails",
                      shippingRate: {
                        "@type": "MonetaryAmount",
                        value: "0",
                        currency: "INR",
                      },
                      shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: "IN",
                      },
                      deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        transitTime: {
                          "@type": "QuantitativeValue",
                          minValue: 2,
                          maxValue: 4,
                          unitCode: "DAY",
                        },
                      },
                    },
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
