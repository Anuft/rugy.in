import fs from "fs/promises";
import path from "path";
import { getDbPool, initDbSchema, getStorageDir } from "./db";

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
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
  whatsappOptIn?: boolean;
}

export interface PaymentDetails {
  method: "online";
  provider: "razorpay" | "upi" | "card" | "netbanking" | "wallet";
  status: "pending" | "paid" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  transactionId?: string;
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
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  courier: string;
  awb: string;
  timeline: OrderTimelineEvent[];
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  createdAt: string;
  updatedAt: string;
}

const ORDERS_FILE_NAME = "orders.json";

function getOrdersFilePath(): string {
  return path.join(getStorageDir(), ORDERS_FILE_NAME);
}

// Initial sample orders for immediate demonstration
const INITIAL_ORDERS: Order[] = [
  {
    id: "RW-782419",
    items: [
      {
        id: "rugby-white-night-cream",
        name: "Rugby White Night Cream (35g)",
        price: 599,
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
    subtotal: 599,
    shipping: 0,
    total: 599,
    payment: {
      method: "online",
      provider: "razorpay",
      status: "paid",
      razorpayOrderId: "order_QWERTY123456",
      razorpayPaymentId: "pay_QWERTY987654",
      transactionId: "pay_QWERTY987654",
      paymentTime: "2026-11-19T14:30:00.000Z",
      currency: "INR",
    },
    status: "Processing",
    courier: "BlueDart Air Express",
    awb: "BD982736412IN",
    timeline: [
      {
        title: "Order Confirmed & Paid",
        date: "19 Nov, 02:30 PM",
        desc: "Payment of ₹599 verified securely via Razorpay. Order queued for dispatch.",
        done: true,
      },
      {
        title: "Cleanroom Packaging & Tamper Seal",
        date: "In Progress",
        desc: "Hand-packing botanical jar with authenticity seal.",
        done: false,
      },
      {
        title: "Dispatched with BlueDart Air",
        date: "Expected in 24 Hours",
        desc: "AWB tracking: BD982736412IN",
        done: false,
      },
    ],
    createdAt: "2026-11-19T14:30:00.000Z",
    updatedAt: "2026-11-19T14:30:00.000Z",
  },
];

async function ensureFileStorage(): Promise<void> {
  const dir = getStorageDir();
  const filePath = getOrdersFilePath();
  try {
    await fs.mkdir(dir, { recursive: true });
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify(INITIAL_ORDERS, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to ensure orders file storage:", err);
  }
}

/**
 * Get all orders, sorted by createdAt DESC
 */
export async function getAllOrders(): Promise<Order[]> {
  const pool = getDbPool();
  if (pool) {
    await initDbSchema();
    try {
      const { rows } = await pool.query(
        "SELECT * FROM orders ORDER BY created_at DESC"
      );
      return rows.map((r: any) => ({
        id: r.id,
        items: r.items,
        customer: r.customer,
        subtotal: parseFloat(r.subtotal),
        shipping: parseFloat(r.shipping),
        total: parseFloat(r.total),
        payment: r.payment,
        status: r.status,
        courier: r.courier,
        awb: r.awb,
        timeline: r.timeline,
        razorpay_order_id: r.razorpay_order_id,
        razorpay_payment_id: r.razorpay_payment_id,
        createdAt: r.created_at ? new Date(r.created_at).toISOString() : "",
        updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : "",
      }));
    } catch (err) {
      console.error("Postgres error in getAllOrders, falling back to file:", err);
    }
  }

  // Fallback to local JSON storage
  await ensureFileStorage();
  try {
    const data = await fs.readFile(getOrdersFilePath(), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Get order by unique order ID (e.g. RW-123456)
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const normalizedId = id.trim().toUpperCase();
  const pool = getDbPool();

  if (pool) {
    await initDbSchema();
    try {
      const { rows } = await pool.query(
        "SELECT * FROM orders WHERE UPPER(id) = $1 LIMIT 1",
        [normalizedId]
      );
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          items: r.items,
          customer: r.customer,
          subtotal: parseFloat(r.subtotal),
          shipping: parseFloat(r.shipping),
          total: parseFloat(r.total),
          payment: r.payment,
          status: r.status,
          courier: r.courier,
          awb: r.awb,
          timeline: r.timeline,
          razorpay_order_id: r.razorpay_order_id,
          razorpay_payment_id: r.razorpay_payment_id,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : "",
          updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : "",
        };
      }
      return null;
    } catch (err) {
      console.error("Postgres error in getOrderById:", err);
    }
  }

  const orders = await getAllOrders();
  return orders.find((o) => o.id.toUpperCase() === normalizedId) || null;
}

/**
 * Get order by Razorpay order ID (e.g. order_xxxxxxxx)
 */
export async function getOrderByRazorpayOrderId(razorpayOrderId: string): Promise<Order | null> {
  const pool = getDbPool();
  if (pool) {
    await initDbSchema();
    try {
      const { rows } = await pool.query(
        "SELECT * FROM orders WHERE razorpay_order_id = $1 LIMIT 1",
        [razorpayOrderId]
      );
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          items: r.items,
          customer: r.customer,
          subtotal: parseFloat(r.subtotal),
          shipping: parseFloat(r.shipping),
          total: parseFloat(r.total),
          payment: r.payment,
          status: r.status,
          courier: r.courier,
          awb: r.awb,
          timeline: r.timeline,
          razorpay_order_id: r.razorpay_order_id,
          razorpay_payment_id: r.razorpay_payment_id,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : "",
          updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : "",
        };
      }
      return null;
    } catch (err) {
      console.error("Postgres error in getOrderByRazorpayOrderId:", err);
    }
  }

  const orders = await getAllOrders();
  return (
    orders.find(
      (o) =>
        o.razorpay_order_id === razorpayOrderId ||
        o.payment?.razorpayOrderId === razorpayOrderId
    ) || null
  );
}

/**
 * Find orders by query (ID, phone, name, email, AWB)
 */
export async function findOrders(query: string): Promise<Order[]> {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const pool = getDbPool();
  if (pool) {
    await initDbSchema();
    try {
      const { rows } = await pool.query(
        `SELECT * FROM orders WHERE 
          LOWER(id) LIKE $1 OR
          LOWER(customer->>'fullName') LIKE $1 OR
          customer->>'mobile' LIKE $1 OR
          LOWER(customer->>'email') LIKE $1 OR
          LOWER(awb) LIKE $1
        ORDER BY created_at DESC`,
        [`%${clean}%`]
      );
      return rows.map((r: any) => ({
        id: r.id,
        items: r.items,
        customer: r.customer,
        subtotal: parseFloat(r.subtotal),
        shipping: parseFloat(r.shipping),
        total: parseFloat(r.total),
        payment: r.payment,
        status: r.status,
        courier: r.courier,
        awb: r.awb,
        timeline: r.timeline,
        razorpay_order_id: r.razorpay_order_id,
        razorpay_payment_id: r.razorpay_payment_id,
        createdAt: r.created_at ? new Date(r.created_at).toISOString() : "",
        updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : "",
      }));
    } catch (err) {
      console.error("Postgres error in findOrders:", err);
    }
  }

  const orders = await getAllOrders();
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

/**
 * Create a new order (stored with status "Processing" if paid, or pending)
 */
export async function createOrder(data: {
  id?: string;
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  shipping: number;
  total: number;
  payment: PaymentDetails;
  status?: Order["status"];
  razorpay_order_id?: string;
}): Promise<Order> {
  const orderId = data.id || "RW-" + Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toISOString();
  const awb = "BD" + Math.floor(100000000 + Math.random() * 900000000) + "IN";
  const isPaid = data.payment.status === "paid";

  const newOrder: Order = {
    id: orderId,
    items: data.items,
    customer: data.customer,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    payment: data.payment,
    status: data.status || (isPaid ? "Processing" : "Processing"),
    courier: "BlueDart Air Express",
    awb,
    timeline: [
      {
        title: isPaid ? "Payment Verified & Order Confirmed" : "Order Created",
        date: "Just now",
        desc: isPaid
          ? `₹${data.total.toLocaleString("en-IN")} verified securely via Razorpay. Payment ID: ${data.payment.razorpayPaymentId || data.payment.transactionId || "N/A"}`
          : `Order placed, awaiting Razorpay confirmation.`,
        done: true,
      },
      {
        title: "Cleanroom Packaging & Tamper Seal",
        date: "Next Step",
        desc: "Inspecting tamper-proof seal and luxury packaging.",
        done: false,
      },
      {
        title: "Dispatched with BlueDart Air Express",
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
    razorpay_order_id: data.razorpay_order_id || data.payment.razorpayOrderId,
    razorpay_payment_id: data.payment.razorpayPaymentId,
    createdAt: now,
    updatedAt: now,
  };

  const pool = getDbPool();
  if (pool) {
    await initDbSchema();
    try {
      await pool.query(
        `INSERT INTO orders (
          id, customer, items, subtotal, shipping, total, payment, status, courier, awb, timeline, razorpay_order_id, razorpay_payment_id, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          newOrder.id,
          JSON.stringify(newOrder.customer),
          JSON.stringify(newOrder.items),
          newOrder.subtotal,
          newOrder.shipping,
          newOrder.total,
          JSON.stringify(newOrder.payment),
          newOrder.status,
          newOrder.courier,
          newOrder.awb,
          JSON.stringify(newOrder.timeline),
          newOrder.razorpay_order_id || null,
          newOrder.razorpay_payment_id || null,
          newOrder.createdAt,
          newOrder.updatedAt,
        ]
      );
      return newOrder;
    } catch (err) {
      console.error("Postgres error creating order, falling back to file:", err);
    }
  }

  // Local storage fallback
  await ensureFileStorage();
  const filePath = getOrdersFilePath();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const orders: Order[] = JSON.parse(raw);
    orders.unshift(newOrder);
    await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8");
  } catch (err) {
    console.error("File write error creating order:", err);
  }

  return newOrder;
}

/**
 * Mark order as PAID after successful server-side Razorpay verification.
 * Idempotent: If order is already marked paid, returns existing order with alreadyPaid: true.
 */
export async function markOrderPaid(
  orderIdOrRazorpayId: string,
  details: {
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature?: string;
    provider?: string;
  }
): Promise<{ order: Order | null; isAlreadyPaid: boolean }> {
  // Find order first
  let order =
    (await getOrderById(orderIdOrRazorpayId)) ||
    (await getOrderByRazorpayOrderId(orderIdOrRazorpayId)) ||
    (await getOrderByRazorpayOrderId(details.razorpayOrderId));

  if (!order) {
    return { order: null, isAlreadyPaid: false };
  }

  // Idempotency check: if already paid, do not re-process or duplicate email
  if (order.payment && order.payment.status === "paid") {
    return { order, isAlreadyPaid: true };
  }

  const now = new Date().toISOString();
  order.payment = {
    ...order.payment,
    method: "online",
    status: "paid",
    provider: (details.provider as any) || "razorpay",
    razorpayPaymentId: details.razorpayPaymentId,
    razorpayOrderId: details.razorpayOrderId,
    razorpaySignature: details.razorpaySignature,
    transactionId: details.razorpayPaymentId,
    paymentTime: now,
  };
  order.razorpay_payment_id = details.razorpayPaymentId;
  order.razorpay_order_id = details.razorpayOrderId;
  order.status = "Processing";
  order.updatedAt = now;

  // Update timeline
  if (order.timeline && order.timeline.length > 0) {
    order.timeline[0].title = "Payment Verified & Order Confirmed";
    order.timeline[0].desc = `₹${order.total.toLocaleString("en-IN")} received via Razorpay. Payment ID: ${details.razorpayPaymentId}`;
    order.timeline[0].done = true;
  }

  const pool = getDbPool();
  if (pool) {
    await initDbSchema();
    try {
      await pool.query(
        `UPDATE orders SET 
          payment = $1, 
          status = $2, 
          razorpay_payment_id = $3, 
          razorpay_order_id = $4,
          timeline = $5,
          updated_at = $6
        WHERE id = $7`,
        [
          JSON.stringify(order.payment),
          order.status,
          order.razorpay_payment_id,
          order.razorpay_order_id,
          JSON.stringify(order.timeline),
          order.updatedAt,
          order.id,
        ]
      );
      return { order, isAlreadyPaid: false };
    } catch (err) {
      console.error("Postgres error in markOrderPaid:", err);
    }
  }

  // Local file fallback
  await ensureFileStorage();
  const filePath = getOrdersFilePath();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const orders: Order[] = JSON.parse(raw);
    const idx = orders.findIndex((o) => o.id === order.id);
    if (idx !== -1) {
      orders[idx] = order;
      await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("File write error in markOrderPaid:", err);
  }

  return { order, isAlreadyPaid: false };
}

/**
 * Update order status (Processing, Shipped, Delivered, Cancelled) with optional AWB and notes
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  awb?: string,
  notes?: string
): Promise<Order | null> {
  const order = await getOrderById(orderId);
  if (!order) return null;

  order.status = status;
  if (awb && awb.trim()) {
    order.awb = awb.trim();
  }
  order.updatedAt = new Date().toISOString();

  // Add timeline entry
  order.timeline.push({
    title: `Order Status: ${status}`,
    desc: notes || `Order progressed to ${status}. ${awb ? `AWB: ${awb}` : ""}`,
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
    done: true,
  });

  const pool = getDbPool();
  if (pool) {
    await initDbSchema();
    try {
      await pool.query(
        `UPDATE orders SET 
          status = $1, 
          awb = $2, 
          timeline = $3, 
          updated_at = $4 
        WHERE id = $5`,
        [order.status, order.awb, JSON.stringify(order.timeline), order.updatedAt, order.id]
      );
      return order;
    } catch (err) {
      console.error("Postgres error updating order status:", err);
    }
  }

  // Local file fallback
  await ensureFileStorage();
  const filePath = getOrdersFilePath();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const orders: Order[] = JSON.parse(raw);
    const idx = orders.findIndex((o) => o.id === order.id);
    if (idx !== -1) {
      orders[idx] = order;
      await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("File error updating order status:", err);
  }

  return order;
}

/**
 * Update payment details
 */
export async function updateOrderPayment(
  orderId: string,
  paymentUpdate: Partial<PaymentDetails>
): Promise<Order | null> {
  const order = await getOrderById(orderId);
  if (!order) return null;

  order.payment = { ...order.payment, ...paymentUpdate };
  order.updatedAt = new Date().toISOString();

  const pool = getDbPool();
  if (pool) {
    await initDbSchema();
    try {
      await pool.query(
        `UPDATE orders SET payment = $1, updated_at = $2 WHERE id = $3`,
        [JSON.stringify(order.payment), order.updatedAt, order.id]
      );
      return order;
    } catch (err) {
      console.error("Postgres error updating order payment:", err);
    }
  }

  const filePath = getOrdersFilePath();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const orders: Order[] = JSON.parse(raw);
    const idx = orders.findIndex((o) => o.id === order.id);
    if (idx !== -1) {
      orders[idx] = order;
      await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("File error updating order payment:", err);
  }

  return order;
}
