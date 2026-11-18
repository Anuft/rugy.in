import { siteConfig } from "@/data/siteConfig";

export interface WhatsAppOrderDetails {
  productName: string;
  quantity: number;
  price: number | string;
  customerName?: string;
  customerAddress?: string;
  notes?: string;
}

export function generateSingleProductWhatsAppUrl(details: WhatsAppOrderDetails): string {
  const number = siteConfig.whatsappNumber;
  const message = `Hello Rugby White!

I would like to place an order.

Product: ${details.productName}
Quantity: ${details.quantity}
Price: ₹${details.price}

Please share the ordering details.`;

  return `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
}

export interface CartCheckoutItem {
  name: string;
  quantity: number;
  price: number;
}

export interface FullCartWhatsAppOrder {
  items: CartCheckoutItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  notes?: string;
}

export function generateCartWhatsAppUrl(order: FullCartWhatsAppOrder): string {
  const number = siteConfig.whatsappNumber;

  const itemsList = order.items
    .map((item, idx) => `${idx + 1}. ${item.name} (Qty: ${item.quantity}) — ₹${item.price * item.quantity}`)
    .join("\n");

  let message = `Hello Rugby White!

I would like to place an order from your website.

ORDER DETAILS:
${itemsList}

Subtotal: ₹${order.subtotal}
Shipping: ${order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
TOTAL: ₹${order.total}`;

  if (order.customerName) {
    message += `\n\nDELIVERY INFORMATION:
Name: ${order.customerName}
Phone: ${order.phone || "Not provided"}
Address: ${order.address || ""}, ${order.city || ""}, ${order.state || ""} - ${order.pincode || ""}`;
  }

  if (order.notes) {
    message += `\nNotes: ${order.notes}`;
  }

  message += `\n\nPlease confirm availability and payment details. Thank you!`;

  return `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
}

export function generateConciergeWhatsAppUrl(): string {
  const number = siteConfig.whatsappNumber;
  const message = `Hello Rugby White! I'm visiting your website and have a question about the 10 Days Challenge skincare ritual.`;
  return `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
}
