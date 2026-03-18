import { NextRequest, NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getColor(source: string): number {
  const colors: Record<string, number> = {
    "printers-page": 0x2563eb, "printers-page-cta": 0x2563eb,
    "gps-page": 0x16a34a, "gps-page-cta": 0x16a34a,
    "smarthome-page": 0xf59e0b, "smarthome-page-cta": 0xf59e0b,
    "alexa-page": 0x06b6d4, "alexa-page-cta": 0x06b6d4,
    "camera-page": 0x9333ea, "camera-page-cta": 0x9333ea,
    "security-page": 0xef4444, "security-page-cta": 0xef4444,
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
    "gps-troubleshooter": 0xf97316,
    "home-security-audit": 0xef4444,
    "smart-home-matcher": 0xf59e0b,
    "subscription-audit": 0x14b8a6,
    "voice-assistant-matcher": 0x8b5cf6,
    "wifi-checker": 0x0ea5e9,
  };
  return colors[source] ?? 0x2563eb;
}

function getSourceTitle(source: string): string {
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
    const {
      name, email, phone, brand, issue, source,
      deviceType, learningGoals, deviceCount, extra, contactMethod,
    } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      // Guard against empty string values - Discord rejects them
      const val = (v: unknown) =>
        String(v ?? "").trim() || "Not provided";

      const embed = {
        embeds: [
          {
            title: `🎯 New Lead — ${getSourceTitle(source)}`,
            color: getColor(source),
            fields: [
              { name: "👤 Name",         value: val(name),  inline: true },
              { name: "📧 Email",        value: val(email), inline: true },
              { name: "📞 Phone",        value: val(phone), inline: true },
              {
                name: "📟 Device / Brand",
                value: val(brand || deviceType),
                inline: true,
              },
              {
                name: "🔍 Issue / Goal",
                value: val(
                  issue ||
                  (Array.isArray(learningGoals)
                    ? learningGoals.join(", ")
                    : undefined)
                ),
                inline: true,
              },
              { name: "📍 Source",       value: val(source || "website"), inline: true },
              ...(contactMethod
                ? [{ name: "📬 Contact Method", value: val(contactMethod), inline: true }]
                : []),
              ...(deviceCount
                ? [{ name: "🔢 Device Count", value: val(deviceCount), inline: true }]
                : []),
              ...(extra
                ? [{ name: "📝 Notes", value: String(extra).slice(0, 1024), inline: false }]
                : []),
            ],
            footer: {
              text: "Setwise Digital Lead Capture • support@setwisedigital.com",
            },
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
        console.error(
          "Discord webhook error:",
          discordRes.status,
          await discordRes.text()
        );
      }
    } else {
      console.warn("DISCORD_WEBHOOK_URL not set — lead not forwarded to Discord");
    }

    return NextResponse.json({ success: true, id: `lead_${Date.now()}` });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
