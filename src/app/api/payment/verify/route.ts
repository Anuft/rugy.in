import { NextRequest, NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/orders-db";
import { verifyRazorpayPaymentSignature } from "@/lib/razorpay";
import { sendOrderPaidEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body as {
      orderId: string;
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required Razorpay payment verification parameters",
        },
        { status: 400 }
      );
    }

    // 1. Cryptographically verify signature server-side
    const isValid = verifyRazorpayPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      console.error(
        `[Payment Verification Failed] Signature mismatch for order: ${razorpay_order_id}, payment: ${razorpay_payment_id}`
      );
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed. Invalid digital signature.",
        },
        { status: 400 }
      );
    }

    // 2. Mark order as paid in persistent database (with idempotency guard)
    const { order, isAlreadyPaid } = await markOrderPaid(orderId || razorpay_order_id, {
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      provider: "razorpay",
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: `Order with reference ${orderId || razorpay_order_id} not found in database.`,
        },
        { status: 404 }
      );
    }

    // 3. Send emails only if not previously paid (prevents duplicate emails)
    if (!isAlreadyPaid) {
      // Fire in background / async
      sendOrderPaidEmails(order).catch((err) =>
        console.error("Failed to send order paid emails:", err)
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and order confirmed.",
      order,
    });
  } catch (error: any) {
    console.error("POST /api/payment/verify error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error verifying payment",
      },
      { status: 500 }
    );
  }
}
