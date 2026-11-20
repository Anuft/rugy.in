import { NextRequest } from "next/server";
import crypto from "crypto";

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "rugby2026admin";

/**
 * Creates a signed admin token based on ADMIN_PASSWORD
 */
export function generateAdminToken(password: string): string | null {
  if (password !== DEFAULT_ADMIN_PASSWORD) {
    return null;
  }
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", DEFAULT_ADMIN_PASSWORD)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Verifies if the request possesses valid admin authentication
 */
export function verifyAdminRequest(request: NextRequest): boolean {
  // Check Authorization header or x-admin-key header
  const authHeader = request.headers.get("authorization");
  const adminKey = request.headers.get("x-admin-key");
  const cookieToken = request.cookies.get("admin_token")?.value;

  const candidate =
    adminKey ||
    cookieToken ||
    (authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null);

  if (!candidate) return false;

  // Direct password match (for simple API testing)
  if (candidate === DEFAULT_ADMIN_PASSWORD) return true;

  // Signed token verification: timestamp.signature
  const parts = candidate.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const tokenAge = Date.now() - parseInt(timestamp, 10);

  // Expire after 7 days
  if (isNaN(tokenAge) || tokenAge < 0 || tokenAge > 7 * 24 * 60 * 60 * 1000) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", DEFAULT_ADMIN_PASSWORD)
    .update(timestamp)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}
