import { NextResponse } from "next/server";
import { getAllInventory } from "@/lib/inventory-db";
import { flagshipProduct } from "@/data/products";

export async function GET() {
  try {
    const items = await getAllInventory();
    const flagship = items.find((i) => i.id === "rugby-white-night-cream") || items[0] || null;
    const price = flagship ? Number(flagship.price) : flagshipProduct.price;
    const inStock = flagship ? Boolean(flagship.inStock) : flagshipProduct.inStock;
    const stock = flagship ? Number(flagship.stock) : 100;

    return NextResponse.json(
      {
        success: true,
        price,
        inStock,
        stock,
        flagship,
        items,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/inventory error:", error);
    return NextResponse.json(
      {
        success: false,
        price: flagshipProduct.price,
        inStock: flagshipProduct.inStock,
        stock: 100,
        error: "Failed to fetch inventory",
      },
      { status: 500 }
    );
  }
}
