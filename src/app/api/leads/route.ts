import { NextRequest, NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const SOURCE_COLORS: Record<string, number> = {
  "printers-page": 0x2563eb, "printers-page-cta": 0x1d4ed8,
  "gps-page": 0x16a34a, "gps-page-cta": 0x15803d,
  "smarthome-page": 0xf59e0b, "smarthome-page-cta": 0xd97706,
  "alexa-page": 0x06b6d4, "alexa-page-cta": 0x0891b2,
  "camera-page": 0x9333ea, "camera-page-cta": 0x7e22ce,
  "security-page": 0xef4444, "security-page-cta": 0xdc2626,
  "my-printer-stopped-working": 0xf97316,
  "set-up-my-new-printer": 0x06b6d4,
  "hp-vs-canon-vs-epson-vs-brother": 0x8b5cf6,
  "is-hp-instant-ink-worth-it": 0x10b981,
  "best-printer-for-seniors": 0xf43f5e,
  "how-to-print-from-phone-or-laptop": 0x0ea5e9,
  "how-to-send-a-fax-from-home": 0x6366f1,
  "how-to-print-email-or-webpage": 0x14b8a6,
  "should-i-buy-a-new-printer": 0xf59e0b,
  "printer-specs-explained": 0x7c3aed,
  "road-trip-checker": 0x16a34a,
  "best-gps-finder": 0x2563eb,
  "garmin-express-setup": 0x06b6d4,
  "gps-update-scheduler": 0x06b6d4,
  "gps-troubleshooter": 0xf97316,
  "contact-page": 0x2563eb,
  "website": 0x2563eb,
};

function label(source: string): string {
  return source.replace(/-page(-cta)?$/, "").replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase()) || "Website";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, brand, issue, source, deviceType, learningGoals, deviceCount, extra, contactMethod } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
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

      if (contactMethod) fields.push({ name: "📬 Contact Method", value: String(contactMethod), inline: true });
      if (deviceCount) fields.push({ name: "🔢 Device Count", value: String(deviceCount), inline: true });
      if (extra) fields.push({ name: "📝 Notes", value: String(extra).slice(0, 1024), inline: false });

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: `🎯 New Lead — ${label(source || "website")}`,
            color: SOURCE_COLORS[source] ?? 0x2563eb,
            fields,
            footer: { text: "Setwise Digital Leads • support@setwisedigital.com" },
            timestamp: new Date().toISOString(),
          }],
        }),
      }).catch(e => console.error("Discord webhook error:", e));
    }

    return NextResponse.json({ success: true, id: `lead_${Date.now()}` });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
