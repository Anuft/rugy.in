import fs from "fs/promises";
import path from "path";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  netWeight?: string;
}

export interface OrderCustomer {
  fullName: string;
  mobile: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
  whatsappOptIn: boolean;
}

export interface PaymentDetails {
  method: "cod" | "online" | "whatsapp";
  provider?: "upi" | "card" | "netbanking" | "wallet" | "whatsapp" | "cod";
  status: "pending" | "paid" | "failed" | "cod_verified";
  transactionId?: string;
  upiId?: string;
  paymentTime?: string;
  currency: string;
}

export interface OrderTimelineEvent {
  title: string;
  desc: string;
  date: string;
  done: boolean;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  shipping: number;
  total: number;
  payment: PaymentDetails;
  status:
    | "Order Placed"
    | "Payment Received"
    | "Processing"
    | "Packed"
    | "Dispatched"
    | "In Transit"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  courier: string;
  awb: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// Initial sample orders for immediate testing & demonstration
const INITIAL_ORDERS: Order[] = [
  {
    id: "RW-782419",
    items: [
      {
        id: "10-days-challenge",
        name: "Rugby White 10 Days Challenge (50g)",
        price: 999,
        quantity: 1,
        image: "/images/rugby-skin-revival.jpg",
        netWeight: "50g",
      },
    ],
    customer: {
      fullName: "Ananya Nair",
      mobile: "9847123456",
      email: "ananya.nair@example.com",
      address: "Villa 14, Palm Grove, Hill Palace Road",
      city: "Kochi",
      state: "Kerala",
      pincode: "682301",
      orderNotes: "Leave at security desk if unavailable",
      whatsappOptIn: true,
    },
    subtotal: 999,
    shipping: 0,
    total: 999,
    payment: {
      method: "online",
      provider: "upi",
      status: "paid",
      transactionId: "UPI-TXN-9847123984",
      upiId: "ananya@oksbi",
      paymentTime: "2026-11-17T14:30:00.000Z",
      currency: "INR",
    },
    status: "In Transit",
    courier: "BlueDart Air Express",
    awb: "BD982736412IN",
    timeline: [
      {
        title: "Order Confirmed & Paid",
        date: "17 Nov, 02:30 PM",
        desc: "Payment verified via Instant UPI. Order assigned to cleanroom dispatch.",
        done: true,
      },
      {
        title: "Packed & Tamper Sealed",
        date: "17 Nov, 06:15 PM",
        desc: "Sealed with holographic Rugby White authenticity seal.",
        done: true,
      },
      {
        title: "Dispatched via Air Express",
        date: "18 Nov, 08:45 AM",
        desc: "Departed from Calicut Central Hub towards destination hub.",
        done: true,
      },
      {
        title: "Out for Delivery",
        date: "Expected Tomorrow",
        desc: "Courier executive will contact before delivery.",
        done: false,
      },
    ],
    createdAt: "2026-11-17T14:30:00.000Z",
    updatedAt: "2026-11-18T08:45:00.000Z",
  },
  {
    id: "RW-651290",
    items: [
      {
        id: "buy-2-combo-pack",
        name: "Rugby White Duo Pack (2 × 50g)",
        price: 1899,
        quantity: 1,
        image: "/images/instagram/DXqFYBckZEu.jpg",
        netWeight: "2 × 50g",
      },
    ],
    customer: {
      fullName: "Mohammed Faizal",
      mobile: "9562172556",
      email: "faizal.rugby@gmail.com",
      address: "Beach Road, Near Gandhi Park, 2nd Floor",
      city: "Kozhikode",
      state: "Kerala",
      pincode: "673001",
      orderNotes: "Call on WhatsApp before arriving",
      whatsappOptIn: true,
    },
    subtotal: 1899,
    shipping: 0,
    total: 1899,
    payment: {
      method: "cod",
      provider: "cod",
      status: "cod_verified",
      currency: "INR",
    },
    status: "Packed",
    courier: "Delhivery Surface Express",
    awb: "DL102938475IN",
    timeline: [
      {
        title: "Order Confirmed (Cash on Delivery)",
        date: "18 Nov, 10:15 AM",
        desc: "Address and mobile contact verified via automated OTP/WhatsApp.",
        done: true,
      },
      {
        title: "Packed & Tamper Sealed",
        date: "18 Nov, 11:40 AM",
        desc: "Fragile luxury glassware packaging completed.",
        done: true,
      },
      {
        title: "Handed to Air Express Courier",
        date: "Scheduled for Today 04:00 PM",
        desc: "Pickup scheduled by Delhivery courier partner.",
        done: false,
      },
      {
        title: "Out for Delivery",
        date: "Expected in 2 Days",
        desc: "Pay ₹1,899 via cash or doorstep UPI scanner upon delivery.",
        done: false,
      },
    ],
    createdAt: "2026-11-18T10:15:00.000Z",
    updatedAt: "2026-11-18T11:40:00.000Z",
  },
];

async function ensureFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(ORDERS_FILE);
    } catch {
      await fs.writeFile(ORDERS_FILE, JSON.stringify(INITIAL_ORDERS, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to ensure orders file:", err);
  }
}

export async function getAllOrders(): Promise<Order[]> {
  await ensureFile();
  try {
    const data = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await getAllOrders();
  const normalizedId = id.trim().toUpperCase();
  return orders.find((o) => o.id.toUpperCase() === normalizedId) || null;
}

export async function findOrders(query: string): Promise<Order[]> {
  const orders = await getAllOrders();
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  return orders.filter((o) => {
    return (
      o.id.toLowerCase().includes(clean) ||
      o.customer.mobile.replace(/\D/g, "").includes(clean.replace(/\D/g, "")) ||
      o.customer.fullName.toLowerCase().includes(clean) ||
      (o.customer.email && o.customer.email.toLowerCase().includes(clean)) ||
      o.awb.toLowerCase().includes(clean)
    );
  });
}

export async function createOrder(data: {
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  shipping: number;
  total: number;
  payment: PaymentDetails;
}): Promise<Order> {
  await ensureFile();
  const orders = await getAllOrders();

  const orderId = "RW-" + Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toISOString();
  const awb = "BD" + Math.floor(100000000 + Math.random() * 900000000) + "IN";

  const isPaid = data.payment.status === "paid";
  const isCod = data.payment.method === "cod";

  const newOrder: Order = {
    id: orderId,
    items: data.items,
    customer: data.customer,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    payment: data.payment,
    status: isPaid ? "Payment Received" : isCod ? "Order Placed" : "Processing",
    courier: "BlueDart Air Express",
    awb,
    timeline: [
      {
        title: isPaid
          ? "Payment Verified & Order Confirmed"
          : isCod
          ? "Order Placed (Cash on Delivery)"
          : "Order Received (WhatsApp)",
        date: "Just now",
        desc: isPaid
          ? `₹${data.total.toLocaleString("en-IN")} received via ${data.payment.provider?.toUpperCase() || "Instant Online"}. TXN: ${data.payment.transactionId || "N/A"}.`
          : isCod
          ? `Payment of ₹${data.total.toLocaleString("en-IN")} to be collected on doorstep delivery.`
          : "Order details forwarded to WhatsApp concierge for priority booking.",
        done: true,
      },
      {
        title: "Cleanroom Packaging & Quality Check",
        date: "Next Step",
        desc: "Inspecting tamper-proof seal and luxury gift packaging.",
        done: false,
      },
      {
        title: "Dispatched with BlueDart Air",
        date: "Expected in 24 Hours",
        desc: "Assigned AWB tracking: " + awb,
        done: false,
      },
      {
        title: "Out for Delivery",
        date: "Expected in 2–4 Business Days",
        desc: `Delivery destination: ${data.customer.city}, ${data.customer.state}.`,
        done: false,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  orders.unshift(newOrder);
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  return newOrder;
}

export async function updateOrderPayment(
  orderId: string,
  paymentUpdate: Partial<PaymentDetails>
): Promise<Order | null> {
  await ensureFile();
  const orders = await getAllOrders();
  const idx = orders.findIndex((o) => o.id.toUpperCase() === orderId.trim().toUpperCase());

  if (idx === -1) return null;

  const order = orders[idx];
  order.payment = { ...order.payment, ...paymentUpdate };
  if (paymentUpdate.status === "paid") {
    order.status = "Payment Received";
    // Update timeline first item
    if (order.timeline[0]) {
      order.timeline[0].title = "Payment Confirmed";
      order.timeline[0].desc = `₹${order.total.toLocaleString("en-IN")} received via ${order.payment.provider?.toUpperCase() || "Instant UPI"}. TXN: ${paymentUpdate.transactionId || "SUCCESS"}.`;
      order.timeline[0].done = true;
    }
  }
  order.updatedAt = new Date().toISOString();
  orders[idx] = order;

  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  return order;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  notes?: string
): Promise<Order | null> {
  await ensureFile();
  const orders = await getAllOrders();
  const idx = orders.findIndex((o) => o.id.toUpperCase() === orderId.trim().toUpperCase());

  if (idx === -1) return null;

  const order = orders[idx];
  order.status = status;
  order.updatedAt = new Date().toISOString();

  // Add timeline entry
  order.timeline.push({
    title: `Status updated to ${status}`,
    desc: notes || `Order progressed to ${status}.`,
    date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    done: true,
  });

  orders[idx] = order;
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  return order;
}
