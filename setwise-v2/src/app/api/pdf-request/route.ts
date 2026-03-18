import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, email, phone, topic, pdfTitle } = body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      const embed = {
        embeds: [
          {
            title: `📄 New PDF Guide Request — ${topic}`,
            color: 0x16a34a,
            fields: [
              { name: "👤 Name", value: firstName || "Not provided", inline: true },
              { name: "📧 Email", value: email || "Not provided", inline: true },
              { name: "📞 Phone", value: phone || "Not provided", inline: true },
              { name: "📘 Guide Requested", value: pdfTitle || topic, inline: false },
              { name: "✅ Action", value: `Email the guide to **${email}**`, inline: false },
            ],
            footer: { text: "Setwise Digital • support@setwisedigital.com" },
            timestamp: new Date().toISOString(),
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PDF request error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
