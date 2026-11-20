import { NextRequest, NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/orders-db";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import { sendOrderPaidEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing x-razorpay-signature header" },
        { status: 400 }
      );
    }

    // 1. Verify webhook signature
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error("[Razorpay Webhook] Invalid signature received");
      return NextResponse.json(
        { success: false, error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);
    console.log(`[Razorpay Webhook] Received event: ${event.event}`);

    // Handle payment.captured or order.paid
    if (event.event === "order.paid" || event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity;
      const orderEntity = event.payload?.order?.entity;

      const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
      const razorpayPaymentId = paymentEntity?.id;
      const internalReceipt = orderEntity?.receipt || paymentEntity?.notes?.orderId;

      if (razorpayOrderId && razorpayPaymentId) {
        const { order, isAlreadyPaid } = await markOrderPaid(
          internalReceipt || razorpayOrderId,
          {
            razorpayPaymentId,
            razorpayOrderId,
            provider: paymentEntity?.method || "razorpay",
          }
        );

        if (order && !isAlreadyPaid) {
          console.log(`[Razorpay Webhook] Order #${order.id} marked as paid via webhook.`);
          sendOrderPaidEmails(order).catch((err) =>
            console.error("Webhook email notification failed:", err)
          );
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("POST /api/payment/webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Webhook handling failed" },
      { status: 500 }
    );
  }
}
