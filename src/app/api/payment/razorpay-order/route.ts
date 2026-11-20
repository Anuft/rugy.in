import { NextRequest, NextResponse } from "next/server";
import { createOrder, OrderCustomer, OrderItem } from "@/lib/orders-db";
import { createRazorpayOrder } from "@/lib/razorpay";
import { products } from "@/data/products";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items } = body as {
      customer: OrderCustomer;
      items: Array<{ id: string; quantity: number }>;
    };

    // 1. Validate customer input
    if (!customer || !customer.fullName || !customer.fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required" },
        { status: 400 }
      );
    }

    const cleanMobile = customer.mobile ? customer.mobile.replace(/\D/g, "") : "";
    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    if (!customer.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address for order confirmation" },
        { status: 400 }
      );
    }

    if (!customer.address || !customer.address.trim()) {
      return NextResponse.json(
        { success: false, error: "Complete delivery address is required" },
        { status: 400 }
      );
    }

    if (!customer.city || !customer.city.trim()) {
      return NextResponse.json(
        { success: false, error: "City / District is required" },
        { status: 400 }
      );
    }

    if (!customer.pincode || !/^\d{6}$/.test(customer.pincode.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 6-digit Indian PIN code" },
        { status: 400 }
      );
    }

    // 2. Validate items and compute server-verified subtotal
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Your shopping cart is empty" },
        { status: 400 }
      );
    }

    const resolvedItems: OrderItem[] = [];
    let serverSubtotal = 0;

    for (const item of items) {
      const productCatalog = products.find((p) => p.id === item.id);
      if (!productCatalog) {
        return NextResponse.json(
          { success: false, error: `Invalid product ID: ${item.id}` },
          { status: 400 }
        );
      }
      const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
      const linePrice = productCatalog.price * qty;
      serverSubtotal += linePrice;

      resolvedItems.push({
        id: productCatalog.id,
        name: productCatalog.name,
        price: productCatalog.price,
        quantity: qty,
        image: productCatalog.images[0] || "/images/rugby-skin-revival.jpg",
        netWeight: productCatalog.netWeight,
      });
    }

    // Pan-India Complimentary Air Courier
    const shipping = 0;
    const finalTotal = serverSubtotal + shipping;

    if (finalTotal <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid calculated order total" },
        { status: 400 }
      );
    }

    // 3. Generate internal Order ID (e.g. RW-892415)
    const orderId = "RW-" + Math.floor(100000 + Math.random() * 900000);

    // 4. Create Razorpay order on Razorpay servers
    let razorpayOrder;
    try {
      razorpayOrder = await createRazorpayOrder({
        amountInRupees: finalTotal,
        receipt: orderId,
        notes: {
          customerName: customer.fullName,
          customerMobile: cleanMobile,
          customerEmail: customer.email,
        },
      });
    } catch (razorpayErr: any) {
      console.error("Razorpay order creation failed:", razorpayErr);
      return NextResponse.json(
        {
          success: false,
          error:
            razorpayErr.message ||
            "Unable to connect to Razorpay payment gateway. Please ensure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set.",
        },
        { status: 500 }
      );
    }

    // 5. Persist order in database with status pending
    await createOrder({
      id: orderId,
      items: resolvedItems,
      customer: {
        ...customer,
        mobile: cleanMobile,
        email: customer.email.trim(),
      },
      subtotal: serverSubtotal,
      shipping,
      total: finalTotal,
      payment: {
        method: "online",
        provider: "razorpay",
        status: "pending",
        razorpayOrderId: razorpayOrder.id,
        currency: "INR",
      },
      status: "Processing",
      razorpay_order_id: razorpayOrder.id,
    });

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "";

    return NextResponse.json({
      success: true,
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount, // in paise
      currency: razorpayOrder.currency,
      keyId,
      customer: {
        name: customer.fullName,
        email: customer.email,
        contact: cleanMobile,
      },
    });
  } catch (error: any) {
    console.error("POST /api/payment/razorpay-order error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to initiate Razorpay checkout" },
      { status: 500 }
    );
  }
}
