import { NextRequest, NextResponse } from "next/server";
import {
  getAllOrders,
  findOrders,
  createOrder,
  OrderItem,
  OrderCustomer,
  PaymentDetails,
} from "@/lib/orders-db";
import { verifyAdminRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  // Only authenticated admin can view the entire orders list
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access to orders. Admin login required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || searchParams.get("q");

    if (query && query.trim()) {
      const results = await findOrders(query.trim());
      return NextResponse.json({
        success: true,
        count: results.length,
        orders: results,
      });
    }

    const all = await getAllOrders();
    return NextResponse.json({
      success: true,
      count: all.length,
      orders: all,
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, subtotal, shipping, total, payment } = body as {
      items: OrderItem[];
      customer: OrderCustomer;
      subtotal: number;
      shipping: number;
      total: number;
      payment: PaymentDetails;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Order must contain at least one product" },
        { status: 400 }
      );
    }

    if (!customer || !customer.fullName || !customer.mobile || !customer.address || !customer.city) {
      return NextResponse.json(
        { success: false, error: "Missing required customer shipping information" },
        { status: 400 }
      );
    }

    const order = await createOrder({
      items,
      customer,
      subtotal: Number(subtotal) || 0,
      shipping: Number(shipping) || 0,
      total: Number(total) || 0,
      payment: payment || {
        method: "online",
        provider: "razorpay",
        status: "pending",
        currency: "INR",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
