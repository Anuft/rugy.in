import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderId, customerName, customerMobile } = body as {
      amount: number;
      orderId?: string;
      customerName?: string;
      customerMobile?: string;
    };

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const resolvedOrderId = orderId || "RW-" + Math.floor(100000 + Math.random() * 900000);
    const transactionId = "TXN-" + Date.now() + "-" + Math.floor(1000 + Math.random() * 9000);

    // Official brand UPI VPA for Rugby White
    const upiVpa = process.env.NEXT_PUBLIC_UPI_VPA || "rugbywhite@icici";
    const payeeName = "RUGBY WHITE SKINCARE";
    const note = `Order ${resolvedOrderId}`;

    // Standard NPCI UPI URI Scheme
    // upi://pay?pa=...&pn=...&am=...&cu=INR&tn=...
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}&tr=${transactionId}`;

    // Generate high quality QR code data URL with brand colors
    const qrCodeDataUrl = await QRCode.toDataURL(upiUrl, {
      errorCorrectionLevel: "H",
      margin: 2,
      scale: 8,
      color: {
        dark: "#581527", // Primary Forest Green
        light: "#FFFFFF",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: resolvedOrderId,
        transactionId,
        amount,
        currency: "INR",
        upiVpa,
        payeeName,
        note,
        upiUrl,
        qrCodeDataUrl,
        deepLinks: {
          gpay: `gpay://upi/pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`,
          phonepe: `phonepe://upi/pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`,
          paytm: `paytmmp://upi/pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`,
          bhim: `upi://pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`,
        },
      },
    });
  } catch (error) {
    console.error("POST /api/payment/create-intent error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate payment intent" },
      { status: 500 }
    );
  }
}
