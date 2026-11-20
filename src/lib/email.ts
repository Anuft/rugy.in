import nodemailer from "nodemailer";
import { Order } from "./orders-db";
import { siteConfig } from "@/data/siteConfig";

const BRAND_NAME = siteConfig.brandName || "RUGBY WHITE";
const BRAND_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rugy.in";
const OWNER_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.OWNER_EMAIL ||
  siteConfig.contactEmail ||
  "care@rugbywhite.in";

/**
 * Builds luxury branded HTML email for customer order confirmation
 */
function buildCustomerEmailHtml(order: Order): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 14px 0; border-bottom: 1px solid #F4CEDF; font-size: 14px; color: #581527;">
        <strong>${item.name}</strong>
        ${item.netWeight ? `<br/><span style="font-size: 12px; color: #8A304C;">Net Wt: ${item.netWeight}</span>` : ""}
      </td>
      <td style="padding: 14px 0; border-bottom: 1px solid #F4CEDF; text-align: center; font-size: 14px; color: #581527;">
        ${item.quantity}
      </td>
      <td style="padding: 14px 0; border-bottom: 1px solid #F4CEDF; text-align: right; font-size: 14px; font-weight: 600; color: #581527;">
        ₹${(item.price * item.quantity).toLocaleString("en-IN")}
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your ${BRAND_NAME} Order is Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FEF7FB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FEF7FB; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #F4CEDF; box-shadow: 0 4px 20px rgba(88,21,39,0.06);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #581527; padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FEF7FB; font-size: 22px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                ${BRAND_NAME}
              </h1>
              <p style="margin: 8px 0 0 0; color: #F4CEDF; font-size: 13px; letter-spacing: 1px;">
                THE ART OF SKINCARE · ORDER CONFIRMED
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="margin: 0 0 12px 0; font-size: 20px; color: #581527;">
                Thank you, ${order.customer.fullName}!
              </h2>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #4A4A4A;">
                Your payment of <strong>₹${order.total.toLocaleString("en-IN")}</strong> has been received securely via Razorpay. Your luxury ritual is being prepared under strict cleanroom conditions.
              </p>

              <!-- Order Summary Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FDEAF3; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8A304C; font-weight: 600;">
                      Order Reference
                    </div>
                    <div style="font-size: 18px; font-weight: 700; color: #581527; margin-top: 4px;">
                      #${order.id}
                    </div>
                  </td>
                  <td style="text-align: right;">
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8A304C; font-weight: 600;">
                      Payment Status
                    </div>
                    <div style="display: inline-block; background-color: #581527; color: #FFFFFF; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 999px; margin-top: 4px;">
                      PAID (RAZORPAY)
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Items Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <thead>
                  <tr style="border-bottom: 2px solid #581527;">
                    <th align="left" style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #8A304C;">Product</th>
                    <th align="center" style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #8A304C;">Qty</th>
                    <th align="right" style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #8A304C;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding-top: 14px; font-size: 14px; color: #8A304C;">Subtotal</td>
                    <td align="right" style="padding-top: 14px; font-size: 14px; color: #581527;">₹${order.subtotal.toLocaleString("en-IN")}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top: 6px; font-size: 14px; color: #8A304C;">Complimentary Air Courier</td>
                    <td align="right" style="padding-top: 6px; font-size: 14px; font-weight: 600; color: #059669;">FREE</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top: 12px; font-size: 16px; font-weight: 700; color: #581527; border-top: 2px solid #581527;">Total Paid</td>
                    <td align="right" style="padding-top: 12px; font-size: 18px; font-weight: 700; color: #581527; border-top: 2px solid #581527;">₹${order.total.toLocaleString("en-IN")}</td>
                  </tr>
                </tfoot>
              </table>

              <!-- Shipping Address Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FEF7FB; border: 1px solid #F4CEDF; border-radius: 12px; padding: 18px 20px; margin-bottom: 28px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8A304C; font-weight: 600; margin-bottom: 6px;">
                      Delivery Address
                    </div>
                    <div style="font-size: 14px; font-weight: 600; color: #581527;">
                      ${order.customer.fullName}
                    </div>
                    <div style="font-size: 13px; color: #555555; line-height: 1.5; margin-top: 4px;">
                      ${order.customer.address}<br/>
                      ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}<br/>
                      Phone: +91 ${order.customer.mobile}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Track Order CTA Button -->
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${BRAND_URL}/track-order?id=${order.id}" style="display: inline-block; background-color: #581527; color: #FEF7FB; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 1px;">
                  Track Order Status →
                </a>
              </div>

              <p style="margin: 0; font-size: 12px; color: #888888; text-align: center; line-height: 1.5;">
                Estimated Delivery: 2–4 business days via ${order.courier}.<br/>
                For assistance, reply directly to this email or reach us at ${siteConfig.contactEmail}.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FDEAF3; padding: 20px 24px; text-align: center; font-size: 11px; color: #8A304C;">
              © ${new Date().getFullYear()} ${BRAND_NAME} Skincare. All rights reserved.<br/>
              Handcrafted in Calicut Central Cleanroom, Kerala, India.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Builds HTML email alert for the website owner / admin
 */
function buildOwnerAlertHtml(order: Order): string {
  const itemsText = order.items
    .map((i) => `<li><strong>${i.name}</strong> × ${i.quantity} (₹${(i.price * i.quantity).toLocaleString("en-IN")})</li>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9f9f9; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e0e0e0;">
    <h2 style="color: #581527; margin-top: 0;">🚨 New Paid Order: #${order.id}</h2>
    <p style="font-size: 16px; color: #333;">
      A customer has completed payment of <strong>₹${order.total.toLocaleString("en-IN")}</strong> on <strong>${BRAND_NAME}</strong>.
    </p>

    <div style="background: #FEF7FB; border: 1px solid #F4CEDF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <h3 style="margin: 0 0 10px 0; color: #581527; font-size: 14px; text-transform: uppercase;">Customer & Shipping Details</h3>
      <p style="margin: 4px 0; font-size: 14px;"><strong>Name:</strong> ${order.customer.fullName}</p>
      <p style="margin: 4px 0; font-size: 14px;"><strong>Mobile:</strong> <a href="tel:+91${order.customer.mobile}">+91 ${order.customer.mobile}</a></p>
      <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${order.customer.email}">${order.customer.email}</a></p>
      <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}</p>
      ${order.customer.orderNotes ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Notes:</strong> ${order.customer.orderNotes}</p>` : ""}
    </div>

    <div style="margin: 16px 0;">
      <h3 style="margin: 0 0 10px 0; color: #581527; font-size: 14px; text-transform: uppercase;">Products Ordered</h3>
      <ul style="padding-left: 20px; font-size: 14px; line-height: 1.6;">
        ${itemsText}
      </ul>
    </div>

    <div style="background: #FDEAF3; padding: 12px 16px; border-radius: 8px; margin: 16px 0; font-size: 13px; color: #581527;">
      <strong>Payment Provider:</strong> Razorpay<br/>
      <strong>Razorpay Order ID:</strong> ${order.razorpay_order_id || "N/A"}<br/>
      <strong>Razorpay Payment ID:</strong> ${order.razorpay_payment_id || "N/A"}<br/>
      <strong>Time:</strong> ${order.payment.paymentTime || order.createdAt}
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${BRAND_URL}/admin/orders" style="background-color: #581527; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
        Open Admin Orders Dashboard →
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Universal mail sender: Supports Resend API (HTTP) or Nodemailer (SMTP).
 */
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  // Option 1: Resend HTTP API (Recommended for Vercel)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromEmail = process.env.EMAIL_FROM || "orders@rugy.in";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${BRAND_NAME} <${fromEmail}>`,
          to: [to],
          subject,
          html,
        }),
      });
      if (res.ok) {
        console.log(`[Email] Sent successfully to ${to} via Resend.`);
        return true;
      } else {
        const errText = await res.text();
        console.error(`[Email] Resend API error: ${errText}`);
      }
    } catch (err) {
      console.error("[Email] Resend fetch error:", err);
    }
  }

  // Option 2: Standard SMTP using Nodemailer
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${BRAND_NAME}" <${process.env.EMAIL_FROM || smtpUser}>`,
        to,
        subject,
        html,
      });

      console.log(`[Email] Sent successfully to ${to} via SMTP.`);
      return true;
    } catch (err) {
      console.error("[Email] SMTP error:", err);
    }
  }

  // Fallback: Log email details cleanly when credentials are not yet configured
  console.log(
    `[Email Mock Log] To: ${to} | Subject: ${subject} | (Configure RESEND_API_KEY or SMTP_* on Vercel to deliver live emails)`
  );
  return true;
}

/**
 * Triggers both customer confirmation and owner alert emails for a paid order
 */
export async function sendOrderPaidEmails(order: Order): Promise<void> {
  try {
    // 1. Customer Email
    if (order.customer.email && order.customer.email.includes("@")) {
      await sendEmail({
        to: order.customer.email,
        subject: `Your ${BRAND_NAME} Order is Confirmed (#${order.id})`,
        html: buildCustomerEmailHtml(order),
      });
    }

    // 2. Owner Alert Email
    if (OWNER_EMAIL && OWNER_EMAIL.includes("@")) {
      await sendEmail({
        to: OWNER_EMAIL,
        subject: `🚨 New Paid Order: #${order.id} (₹${order.total.toLocaleString("en-IN")}) from ${order.customer.fullName}`,
        html: buildOwnerAlertHtml(order),
      });
    }
  } catch (err) {
    console.error("Error sending order paid emails:", err);
  }
}
