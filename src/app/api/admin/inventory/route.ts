import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { getAllInventory, updateProductStock } from "@/lib/inventory-db";

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await getAllInventory();
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error("GET /api/admin/inventory error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch inventory" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, stock, inStock, price } = body as {
      id: string;
      stock: number;
      inStock: boolean;
      price?: number;
    };

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    const updated = await updateProductStock(id, Number(stock) || 0, Boolean(inStock), price !== undefined ? Number(price) : undefined);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("POST /api/admin/inventory error:", error);
    return NextResponse.json({ success: false, error: "Failed to update inventory" }, { status: 500 });
  }
}
