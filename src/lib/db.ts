import { Pool } from "pg";
import fs from "fs/promises";
import path from "path";

// Initialize PostgreSQL connection pool if DATABASE_URL or POSTGRES_URL is provided
const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.SUPABASE_DATABASE_URL ||
  "";

let pool: Pool | null = null;

if (connectionString) {
  try {
    pool = new Pool({
      connectionString,
      ssl:
        process.env.NODE_ENV === "production" && !connectionString.includes("localhost")
          ? { rejectUnauthorized: false }
          : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  } catch (err) {
    console.error("Failed to initialize PostgreSQL pool:", err);
  }
}

let isSchemaInitialized = false;

/**
 * Initializes database schema automatically on PostgreSQL
 */
export async function initDbSchema(): Promise<void> {
  if (!pool || isSchemaInitialized) return;

  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(64) PRIMARY KEY,
          customer JSONB NOT NULL,
          items JSONB NOT NULL,
          subtotal NUMERIC NOT NULL,
          shipping NUMERIC NOT NULL,
          total NUMERIC NOT NULL,
          payment JSONB NOT NULL,
          status VARCHAR(64) NOT NULL,
          courier VARCHAR(128) NOT NULL,
          awb VARCHAR(128) NOT NULL,
          timeline JSONB NOT NULL,
          razorpay_order_id VARCHAR(128) UNIQUE,
          razorpay_payment_id VARCHAR(128),
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON orders(razorpay_order_id);
        CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

        CREATE TABLE IF NOT EXISTS products_inventory (
          id VARCHAR(64) PRIMARY KEY,
          name TEXT NOT NULL,
          price NUMERIC NOT NULL,
          stock INT NOT NULL DEFAULT 100,
          in_stock BOOLEAN NOT NULL DEFAULT true,
          updated_at TIMESTAMPTZ NOT NULL
        );
      `);
      isSchemaInitialized = true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error initializing PostgreSQL schema:", err);
  }
}

/**
 * Returns active pg pool or null if using local file storage
 */
export function getDbPool(): Pool | null {
  return pool;
}

/**
 * Safe directory resolver for local JSON storage.
 * In Vercel serverless functions, the root is read-only, so fallback to /tmp.
 */
export function getStorageDir(): string {
  // Check if running on Vercel / read-only serverless environment
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return "/tmp";
  }
  return path.join(process.cwd(), "data");
}
