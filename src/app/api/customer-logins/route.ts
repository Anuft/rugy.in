import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getStorageDir } from "@/lib/db";

const LOGINS_FILE = path.join(getStorageDir(), "customer-logins.json");

interface CustomerLoginRecord {
  id: string;
  mobileNumber: string;
  formattedNumber: string;
  fullName?: string;
  method: string;
  firstSignIn: string;
  firstSignInFormatted: string;
  lastSignIn: string;
  lastSignInFormatted: string;
  loginCount: number;
  status: string;
}

function getLogins(): CustomerLoginRecord[] {
  try {
    if (fs.existsSync(LOGINS_FILE)) {
      const data = fs.readFileSync(LOGINS_FILE, "utf-8");
      return JSON.parse(data);
    }
    const bundled = path.join(process.cwd(), "data", "customer-logins.json");
    if (fs.existsSync(bundled)) {
      const data = fs.readFileSync(bundled, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch (err) {
    console.error("Error reading logins file:", err);
    return [];
  }
}

function saveLogins(logins: CustomerLoginRecord[]) {
  try {
    const dir = path.dirname(LOGINS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOGINS_FILE, JSON.stringify(logins, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving logins file:", err);
  }
  try {
    const bundled = path.join(process.cwd(), "data", "customer-logins.json");
    fs.writeFileSync(bundled, JSON.stringify(logins, null, 2), "utf-8");
  } catch {}
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export async function GET() {
  const logins = getLogins();
  return NextResponse.json({
    success: true,
    totalLogins: logins.length,
    logins,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobileNumber, fullName, method } = body as {
      mobileNumber?: string;
      fullName?: string;
      method?: string;
    };

    if (!mobileNumber) {
      return NextResponse.json(
        { success: false, error: "Mobile number is required" },
        { status: 400 }
      );
    }

    const cleanNum = mobileNumber.replace(/\D/g, "").slice(-10);
    const formatted = `+91 ${cleanNum.slice(0, 5)} ${cleanNum.slice(5)}`;
    const logins = getLogins();
    const now = new Date();
    const nowISO = now.toISOString();
    const nowFormatted = formatDateTime(now);

    const existingIndex = logins.findIndex(
      (l) => l.mobileNumber === cleanNum || l.mobileNumber.endsWith(cleanNum)
    );

    if (existingIndex >= 0) {
      // Returning customer: keep first sign-in timestamp permanent, update last sign-in
      logins[existingIndex].lastSignIn = nowISO;
      logins[existingIndex].lastSignInFormatted = nowFormatted;
      logins[existingIndex].loginCount = (logins[existingIndex].loginCount || 1) + 1;
      if (fullName && !logins[existingIndex].fullName) {
        logins[existingIndex].fullName = fullName;
      }
      logins[existingIndex].method = method || logins[existingIndex].method;
    } else {
      // First sign-in: record first sign time
      const newRecord: CustomerLoginRecord = {
        id: `log_${Date.now()}`,
        mobileNumber: cleanNum,
        formattedNumber: formatted,
        fullName: fullName || `Client (${cleanNum.slice(-4)})`,
        method: method || "Mobile OTP Verified",
        firstSignIn: nowISO,
        firstSignInFormatted: nowFormatted,
        lastSignIn: nowISO,
        lastSignInFormatted: nowFormatted,
        loginCount: 1,
        status: "Active Privilege Member",
      };
      logins.unshift(newRecord);
    }

    saveLogins(logins);

    return NextResponse.json({
      success: true,
      message: "Customer login recorded successfully",
      record: existingIndex >= 0 ? logins[existingIndex] : logins[0],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to record login" },
      { status: 500 }
    );
  }
}
