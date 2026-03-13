import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, topic, device, issue, availability, contactMethod } = body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      const embed = {
        embeds: [
          {
            title: `🔧 New ${topic || "Tech"} Expert Request`,
            color: 0x2563eb,
            fields: [
              { name: "👤 Name", value: name || "Not provided", inline: true },
              { name: "📧 Email", value: email || "Not provided", inline: true },
              { name: "📞 Phone", value: phone || "Not provided", inline: true },
              { name: "🖥️ Device / Model", value: device || "Not specified", inline: true },
              { name: "📅 Availability", value: availability || "Not specified", inline: true },
              { name: "📬 Preferred Contact", value: contactMethod || "Email", inline: true },
              { name: "❓ Issue Description", value: issue || "No details provided", inline: false },
            ],
            footer: {
              text: "Setwise Digital • support@setwisedigital.com • www.setwisedigital.com",
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
        console.error("Discord webhook error:", await discordRes.text());
      }
    } else {
      console.warn("DISCORD_WEBHOOK_URL not set — contact form submission not forwarded to Discord");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
