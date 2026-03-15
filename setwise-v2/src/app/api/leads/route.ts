import { NextRequest, NextResponse } from "next/server";

// Basic email validation
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, brand, issue, source, deviceType, learningGoals, deviceCount, extra } = body;

    // Validate required fields
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
