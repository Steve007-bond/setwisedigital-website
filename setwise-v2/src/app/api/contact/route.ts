import { NextRequest, NextResponse } from "next/server";

// ─── Server-side validation ───────────────────────────────────────────────────
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
  "spam","junk","trash","aaa","bbb","xxx","abc","123",
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
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, topic, device, issue, availability, contactMethod } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }
    if (!issue?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      const embed = {
        embeds: [
          {
            title: `🔧 New ${topic || "General"} Contact Request`,
            color: 0x2563eb,
            fields: [
              { name: "👤 Name", value: name, inline: true },
              { name: "📧 Email", value: email, inline: true },
              { name: "📞 Phone", value: phone || "Not provided", inline: true },
              { name: "🖥️ Device / Model", value: device || "Not specified", inline: true },
              { name: "📅 Availability", value: availability || "Not specified", inline: true },
              { name: "📬 Preferred Contact", value: contactMethod || "Email", inline: true },
              { name: "❓ Message", value: String(issue).slice(0, 1024), inline: false },
            ],
            footer: { text: "Setwise Digital • support@setwisedigital.com" },
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const discordRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed),
      });

      if (!discordRes.ok) {
        console.error("Discord webhook error:", discordRes.status, await discordRes.text());
      }
    } else {
      console.warn("DISCORD_WEBHOOK_URL not set — contact form submission not forwarded");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
