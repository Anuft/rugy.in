import React from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { products } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    ...products.map((product) => ({
      slug: product.slug,
    })),
    { slug: "10-days-challenge" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "10-days-challenge") {
    permanentRedirect("/products/rugby-white-night-cream");
  }
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Rugby White",
    };
  }

  return {
    title: `${product.name} | Rugby White Skincare Ritual`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Rugby White`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "10-days-challenge") {
    permanentRedirect("/products/rugby-white-night-cream");
  }
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
