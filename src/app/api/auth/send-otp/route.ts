import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const OTP_STORE_FILE = path.join(process.cwd(), "data", "otp-sessions.json");

interface OtpSession {
  mobileNumber: string;
  otp: string;
  expiresAt: number;
}

async function getOtpSessions(): Promise<Record<string, OtpSession>> {
  try {
    const raw = await fs.readFile(OTP_STORE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveOtpSessions(sessions: Record<string, OtpSession>) {
  try {
    await fs.mkdir(path.dirname(OTP_STORE_FILE), { recursive: true });
    await fs.writeFile(OTP_STORE_FILE, JSON.stringify(sessions, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save OTP sessions:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobileNumber } = body;

    const clean = String(mobileNumber || "").replace(/\D/g, "").slice(-10);
    if (clean.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    // Generate 4-digit OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save session
    const sessions = await getOtpSessions();
    sessions[clean] = {
      mobileNumber: clean,
      otp: generatedOtp,
      expiresAt,
    };
    await saveOtpSessions(sessions);

    let providerUsed = "none";
    let smsDelivered = false;

    // 1. Check Fast2SMS Gateway (Standard Indian SMS Gateway)
    const fast2smsKey = process.env.FAST2SMS_API_KEY;
    if (fast2smsKey) {
      try {
        const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${encodeURIComponent(
          fast2smsKey
        )}&variables_values=${encodeURIComponent(
          generatedOtp
        )}&route=otp&numbers=${encodeURIComponent(clean)}`;

        const fastRes = await fetch(url, { method: "GET" });
        const fastData = await fastRes.json();
        if (fastData.return === true) {
          smsDelivered = true;
          providerUsed = "Fast2SMS";
        }
      } catch (e) {
        console.error("Fast2SMS dispatch error:", e);
      }
    }

    // 2. Check Twilio Gateway (if configured)
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    if (!smsDelivered && twilioSid && twilioAuth && twilioPhone) {
      try {
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
        const authHeader = Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64");
        const params = new URLSearchParams();
        params.append("To", `+91${clean}`);
        params.append("From", twilioPhone);
        params.append("Body", `Your Rugby White verification code is ${generatedOtp}. Valid for 10 minutes.`);

        const twRes = await fetch(twilioUrl, {
          method: "POST",
          headers: {
            Authorization: `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });
        if (twRes.ok) {
          smsDelivered = true;
          providerUsed = "Twilio";
        }
      } catch (e) {
        console.error("Twilio dispatch error:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: smsDelivered
        ? `OTP sent successfully to +91 ${clean} via SMS.`
        : `OTP generated for +91 ${clean}.`,
      smsDelivered,
      providerUsed,
      // If no SMS gateway API key is configured yet, send generatedOtp in response so client can auto-assist
      previewOtp: smsDelivered ? undefined : generatedOtp,
    });
  } catch (error: any) {
    console.error("send-otp error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
