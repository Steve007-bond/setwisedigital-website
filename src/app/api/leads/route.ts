import { NextRequest, NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, brand, issue, source, deviceType, learningGoals, extra } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      // Build safe field values — Discord rejects empty strings
      const safe = (v: unknown): string => String(v || "").trim() || "Not provided";

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: `New Lead — ${(source || "website").replace(/-/g, " ")}`,
            color: 0x2563eb,
            fields: [
              { name: "Name",    value: safe(name),                                                   inline: true },
              { name: "Email",   value: safe(email),                                                  inline: true },
              { name: "Phone",   value: safe(phone),                                                  inline: true },
              { name: "Device",  value: safe(brand || deviceType),                                    inline: true },
              { name: "Issue",   value: safe(issue || (Array.isArray(learningGoals) ? learningGoals.join(", ") : "")), inline: true },
              { name: "Source",  value: safe(source),                                                 inline: true },
              ...(extra ? [{ name: "Notes", value: String(extra).slice(0, 1024), inline: false }] : []),
            ],
            footer: { text: "Setwise Digital" },
            timestamp: new Date().toISOString(),
          }],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
