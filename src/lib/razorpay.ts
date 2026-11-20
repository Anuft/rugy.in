import Razorpay from "razorpay";
import crypto from "crypto";

const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
const key_secret = process.env.RAZORPAY_KEY_SECRET || "";

/**
 * Returns a configured Razorpay instance or null if keys are not yet provided
 */
export function getRazorpayInstance(): Razorpay | null {
  if (!key_id || !key_secret) {
    return null;
  }
  return new Razorpay({
    key_id,
    key_secret,
  });
}

/**
 * Creates an order on Razorpay servers
 * @param amountInRupees Amount in INR (will be converted to paise)
 * @param receipt Internal unique Order ID (e.g. RW-123456)
 * @param notes Extra metadata
 */
export async function createRazorpayOrder({
  amountInRupees,
  receipt,
  notes,
}: {
  amountInRupees: number;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<{
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}> {
  const razorpay = getRazorpayInstance();
  if (!razorpay) {
    throw new Error(
      "Razorpay API keys (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) are not configured."
    );
  }

  const amountInPaise = Math.round(amountInRupees * 100);

  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt,
    notes: {
      brand: "RUGBY WHITE",
      ...notes,
    },
  };

  const order = await razorpay.orders.create(options);
  return {
    id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    receipt: order.receipt || receipt,
  };
}

/**
 * Verifies Razorpay payment signature server-side
 * Formula: HMAC-SHA256(order_id + "|" + payment_id, secret) == signature
 */
export function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!key_secret) {
    console.error("RAZORPAY_KEY_SECRET is not configured on the server");
    return false;
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(signature)
    );
  } catch (err) {
    console.error("Error verifying payment signature:", err);
    return false;
  }
}

/**
 * Verifies Razorpay webhook signature server-side
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("RAZORPAY_WEBHOOK_SECRET is not configured");
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );
  } catch (err) {
    console.error("Error verifying webhook signature:", err);
    return false;
  }
}
