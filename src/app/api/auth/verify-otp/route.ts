import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const OTP_STORE_FILE = path.join(process.cwd(), "data", "otp-sessions.json");
const LOGINS_STORE_FILE = path.join(process.cwd(), "data", "customer-logins.json");

interface CustomerLoginRecord {
  mobileNumber: string;
  fullName?: string;
  firstSignIn: string;
  lastActive: string;
  totalLogins: number;
  lastMethod: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobileNumber, otp, fullName } = body;

    const clean = String(mobileNumber || "").replace(/\D/g, "").slice(-10);
    const enteredOtp = String(otp || "").trim();

    if (clean.length !== 10) {
      return NextResponse.json({ success: false, error: "Invalid mobile number" }, { status: 400 });
    }

    if (enteredOtp.length !== 4) {
      return NextResponse.json({ success: false, error: "Please enter a 4-digit code" }, { status: 400 });
    }

    // Check stored OTP session
    let valid = false;
    try {
      const raw = await fs.readFile(OTP_STORE_FILE, "utf-8");
      const sessions = JSON.parse(raw);
      const session = sessions[clean];
      if (session && session.otp === enteredOtp && Date.now() <= session.expiresAt) {
        valid = true;
      }
    } catch {}

    // Allow master backup code 2026 as well
    if (enteredOtp === "2026") {
      valid = true;
    }

    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Incorrect verification code. Please check your SMS or use code 2026." },
        { status: 400 }
      );
    }

    // Record login in database
    const nowIso = new Date().toISOString();
    let records: CustomerLoginRecord[] = [];
    try {
      const rawLogins = await fs.readFile(LOGINS_STORE_FILE, "utf-8");
      records = JSON.parse(rawLogins);
    } catch {}

    const existingIdx = records.findIndex((r) => r.mobileNumber.replace(/\D/g, "").slice(-10) === clean);
    let record: CustomerLoginRecord;

    if (existingIdx !== -1) {
      record = records[existingIdx];
      record.lastActive = nowIso;
      record.totalLogins = (record.totalLogins || 1) + 1;
      record.lastMethod = "SMS OTP Verified";
      if (fullName && !record.fullName) record.fullName = fullName;
      records[existingIdx] = record;
    } else {
      record = {
        mobileNumber: `+91 ${clean}`,
        fullName: fullName || undefined,
        firstSignIn: nowIso,
        lastActive: nowIso,
        totalLogins: 1,
        lastMethod: "SMS OTP Verified",
      };
      records.unshift(record);
    }

    try {
      await fs.mkdir(path.dirname(LOGINS_STORE_FILE), { recursive: true });
      await fs.writeFile(LOGINS_STORE_FILE, JSON.stringify(records, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to save login record:", e);
    }

    const user = {
      name: record.fullName || `Member (+91 ${clean.slice(-4)})`,
      contact: `+91 ${clean}`,
      firstSignIn: record.firstSignIn,
    };

    return NextResponse.json({
      success: true,
      message: "Phone verified successfully",
      user,
    });
  } catch (error: any) {
    console.error("verify-otp error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
