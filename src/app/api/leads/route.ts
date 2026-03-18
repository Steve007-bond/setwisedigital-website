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
  "printer-features-guide": 0x7c3aed,
  "printer-cost-calculator": 0x4f46e5,
  "printer-cost-per-page": 0x2563eb,
  "printer-ink-vs-tank": 0x6366f1,
  "best-printer-finder": 0x8b5cf6,
  "road-trip-checker": 0x16a34a,
  "best-gps-finder": 0x2563eb,
  "garmin-express-setup": 0x06b6d4,
  "gps-update-scheduler": 0x06b6d4,
  "gps-troubleshooter": 0xf97316,
  "gps-update-fix": 0xef4444,
  "gps-features-guide": 0x10b981,
  "gps-for-seniors": 0x2563eb,
  "gps-vs-phone-decider": 0x8b5cf6,
  "gps-upgrade-decider": 0xf59e0b,
  "gps-brand-comparator": 0x4f46e5,
  "gps-budget-finder": 0x16a34a,
  "gps-true-cost-calculator": 0x14b8a6,
  "gps-battery-checker": 0xeab308,
  "gps-coverage-checker": 0x2563eb,
  "gps-feature-filter": 0x8b5cf6,
  "gps-maps-explained": 0x10b981,
  "gps-screen-size-selector": 0x0ea5e9,
  "builtin-vs-aftermarket-gps": 0x4f46e5,
  "hunting-gps-canada": 0xdc2626,
  "rv-gps-finder": 0xf59e0b,
  "satellite-communicator-guide": 0x2563eb,
  "golf-gps-decider": 0x16a34a,
  "pet-gps-cost-breakdown": 0xec4899,
  "pet-gps-selector": 0xec4899,
  "adventure-gps-selector": 0x16a34a,
  "car-gps-update": 0x2563eb,
  "home-security-audit": 0xef4444,
  "smart-home-matcher": 0xf59e0b,
  "subscription-audit": 0x14b8a6,
  "voice-assistant-matcher": 0x8b5cf6,
  "wifi-checker": 0x0ea5e9,
  "contact-page": 0x2563eb,
  "website": 0x2563eb,
};

function getLabel(source: string): string {
  return (source || "website")
    .replace(/-page(-cta)?$/, "")
    .replace(/-cta$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim() || "Website";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, brand, issue, source, deviceType, learningGoals, deviceCount, extra, contactMethod } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const src = (source || "website").trim();
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("DISCORD_WEBHOOK_URL not configured — lead NOT sent to Discord");
      console.log("Lead:", { name, email, phone, source: src, issue });
    } else {
      const fields = [
        { name: "👤 Name",          value: (name  || "Not provided").trim(), inline: true },
        { name: "📧 Email",         value: email.trim(),                     inline: true },
        { name: "📞 Phone",         value: (phone || "Not provided").trim(), inline: true },
        { name: "📟 Device/Brand",  value: (brand || deviceType || "Not specified"), inline: true },
        { name: "🔍 Issue/Goal",    value: (issue || (Array.isArray(learningGoals) ? learningGoals.join(", ") : "Not specified")), inline: true },
        { name: "📍 Source",        value: src,                              inline: true },
      ];

      if (contactMethod) fields.push({ name: "📬 Contact",      value: String(contactMethod),        inline: true });
      if (deviceCount)   fields.push({ name: "🔢 Device Count", value: String(deviceCount),          inline: true });
      if (extra)         fields.push({ name: "📝 Notes",         value: String(extra).slice(0, 1024), inline: false });

      const discordPayload = {
        username: "Setwise Digital Leads",
        embeds: [{
          title: `🎯 New Lead — ${getLabel(src)}`,
          color: SOURCE_COLORS[src] ?? 0x2563eb,
          fields,
          footer: { text: `Setwise Digital • ${new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}` },
          timestamp: new Date().toISOString(),
        }],
      };

      let discordRes: Response | null = null;
      try {
        discordRes = await fetch(webhookUrl.trim(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(discordPayload),
        });
      } catch (fetchErr) {
        console.error("Discord fetch error:", fetchErr);
      }

      if (discordRes) {
        if (discordRes.ok) {
          console.log(`Discord lead delivered — ${src} — ${email}`);
        } else {
          const text = await discordRes.text().catch(() => "(unreadable)");
          console.error(`Discord error ${discordRes.status}: ${text}`);
        }
      }
    }

    return NextResponse.json({ success: true, id: `lead_${Date.now()}` });

  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
