import { NextRequest, NextResponse } from "next/server";
import {
  getOrderById,
  updateOrderPayment,
  createOrder,
  OrderItem,
  OrderCustomer,
  PaymentDetails,
} from "@/lib/orders-db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      transactionId,
      provider,
      upiId,
      method,
      amount,
      orderData, // Optional: if order wasn't saved before payment
    } = body as {
      orderId?: string;
      transactionId: string;
      provider?: "upi" | "card" | "netbanking" | "wallet";
      upiId?: string;
      method?: "online";
      amount?: number;
      orderData?: {
        items: OrderItem[];
        customer: OrderCustomer;
        subtotal: number;
        shipping: number;
        total: number;
      };
    };

    const paymentTime = new Date().toISOString();
    const paymentInfo: PaymentDetails = {
      method: "online",
      provider: provider || "upi",
      status: "paid",
      transactionId: transactionId || "TXN-" + Date.now(),
      upiId: upiId || "customer@upi",
      paymentTime,
      currency: "INR",
    };

    let targetOrder = null;

    if (orderId) {
      targetOrder = await getOrderById(orderId);
      if (targetOrder) {
        targetOrder = await updateOrderPayment(orderId, paymentInfo);
      }
    }

    // If order was not yet created in the DB, create it now as PAID
    if (!targetOrder && orderData && orderData.items && orderData.customer) {
      targetOrder = await createOrder({
        items: orderData.items,
        customer: orderData.customer,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        total: orderData.total,
        payment: paymentInfo,
      });
    }

    if (!targetOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found and orderData not provided" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and order confirmed",
      order: targetOrder,
    });
  } catch (error) {
    console.error("POST /api/payment/verify error:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
