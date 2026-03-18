import { NextRequest, NextResponse } from "next/server";

// ─── Server-side validation (mirrors client-side) ─────────────────────────────
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const BLOCKED_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","tempmail.com","10minutemail.com",
  "throwam.com","yopmail.com","sharklasers.com","trashmail.com",
  "trashmail.me","fakeinbox.com","discard.email","tempr.email",
  "tempmail.eu","tempmail2.com","spambog.com","spamgourmet.com",
]);

const BLOCKED_LOCAL = new Set([
  "test","fake","asdf","qwerty","admin","noreply","no-reply",
  "null","undefined","example","sample","temp","anonymous","nobody",
  "someone","anyone","spam","junk","trash","aaa","bbb","xxx","abc","123",
]);

function isValidEmail(email: string): boolean {
  if (!email || !EMAIL_REGEX.test(email.toLowerCase())) return false;
  const [local, domain] = email.toLowerCase().split("@");
  if (BLOCKED_DOMAINS.has(domain)) return false;
  if (BLOCKED_LOCAL.has(local)) return false;
  if (/^(.)\1{3,}@/.test(email)) return false;
  return true;
}

function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 6 || digits.length > 15) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  const fakeNumbers = new Set(["0000000000","1111111111","1234567890","1231231234"]);
  if (fakeNumbers.has(digits) || fakeNumbers.has(digits.slice(-10))) return false;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, brand, issue, source, deviceType, learningGoals, deviceCount, extra } = body;

    // Server-side validation
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      const fields = [
        { name: "👤 Name", value: name || "Not provided", inline: true },
        { name: "📧 Email", value: email, inline: true },
        { name: "📞 Phone", value: phone || "Not provided", inline: true },
        { name: "📟 Device / Brand", value: brand || deviceType || "Not specified", inline: true },
        { name: "🔍 Issue / Goal", value: issue || (Array.isArray(learningGoals) ? learningGoals.join(", ") : "Not specified"), inline: true },
        { name: "📍 Source", value: source || "website", inline: true },
      ];

      if (deviceCount) fields.push({ name: "🔢 Device Count", value: String(deviceCount), inline: true });
      if (extra) fields.push({ name: "📝 Extra Info", value: String(extra).slice(0, 1024), inline: false });

      const colors: Record<string, number> = {
        "printers-page": 0x2563eb,
        "gps-page": 0x16a34a,
        "smarthome-page": 0xf59e0b,
        "alexa-page": 0x06b6d4,
        "camera-page": 0x9333ea,
        "security-page": 0xef4444,
      };

      const discordRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: `🎯 New Lead — ${source?.replace("-page", "").toUpperCase() || "Website"}`,
            color: colors[source] ?? 0x2563eb,
            fields,
            footer: { text: "Setwise Digital Lead Capture • support@setwisedigital.com" },
            timestamp: new Date().toISOString(),
          }],
        }),
      });

      if (!discordRes.ok) {
        console.error("Discord webhook error:", discordRes.status, await discordRes.text());
      }
    }

    return NextResponse.json({ success: true, id: `lead_${Date.now()}` });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
