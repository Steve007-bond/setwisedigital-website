import { NextRequest, NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, topic, device, issue, availability, contactMethod } = body;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
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
            footer: {
              text: "Setwise Digital • support@setwisedigital.com",
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
