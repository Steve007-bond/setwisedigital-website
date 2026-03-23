import { NextRequest, NextResponse } from "next/server";

/* ═══════════════════════════════════════════════════════════════
   API: /api/discord-thread
   Creates a Discord thread in your learning channel
   
   ENVIRONMENT VARIABLES (set in Vercel Dashboard → Settings → Environment Variables):
   - DISCORD_BOT_TOKEN     → Your bot token (NEVER put in code or GitHub)
   - DISCORD_CHANNEL_ID    → The channel ID where threads will be created
   
   HOW TO GET THESE:
   1. DISCORD_BOT_TOKEN: Discord Developer Portal → Your App → Bot → Token
   2. DISCORD_CHANNEL_ID: Right-click channel in Discord → Copy Channel ID
      (Enable Developer Mode in Discord Settings → Advanced first)
   ═══════════════════════════════════════════════════════════════ */

const TOPIC_CONFIG: Record<string, { emoji: string; color: number; label: string }> = {
  printers:   { emoji: "🖨️", color: 0x2563eb, label: "Printers & Scanners" },
  gps:        { emoji: "📍", color: 0x16a34a, label: "GPS & Navigation" },
  smarthome:  { emoji: "🏠", color: 0xf59e0b, label: "Smart Home" },
  alexa:      { emoji: "🔊", color: 0x06b6d4, label: "Alexa & Echo" },
  cameras:    { emoji: "📷", color: 0x9333ea, label: "Cameras" },
  security:   { emoji: "🔒", color: 0xef4444, label: "Online Security" },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, userName, userEmail, answers } = body;

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_CHANNEL_ID;

    if (!botToken || !channelId) {
      console.error("Missing DISCORD_BOT_TOKEN or DISCORD_CHANNEL_ID environment variables");
      return NextResponse.json(
        { error: "Discord integration not configured. Please try again." },
        { status: 500 }
      );
    }

    const config = TOPIC_CONFIG[topic] || { emoji: "📋", color: 0x3b82f6, label: topic };
    const threadName = `${config.emoji} ${config.label} — ${userName || "Guest"} — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

    // 1. Create a thread in the channel
    const threadRes = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/threads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: threadName.slice(0, 100),
          type: 11, // PUBLIC_THREAD
          auto_archive_duration: 10080, // 7 days
        }),
      }
    );

    if (!threadRes.ok) {
      const errText = await threadRes.text();
      console.error("Discord thread creation failed:", threadRes.status, errText);
      return NextResponse.json({ error: "Failed to create learning session" }, { status: 500 });
    }

    const thread = await threadRes.json();

    // 2. Send the welcome message with user info + answers
    const answersFormatted = answers && answers.length > 0
      ? answers.map((a: { question: string; answer: string }, i: number) =>
          `**Q${i + 1}:** ${a.question}\n> ${a.answer}`
        ).join("\n\n")
      : "_No diagnostic answers provided_";

    const welcomeEmbed = {
      embeds: [
        {
          title: `${config.emoji} New ${config.label} Learning Request`,
          color: config.color,
          fields: [
            { name: "👤 Name", value: userName || "Not provided", inline: true },
            { name: "📧 Email", value: userEmail || "Not provided", inline: true },
            { name: "📋 Topic", value: config.label, inline: true },
          ],
          description: `**Diagnostic Answers:**\n\n${answersFormatted}`,
          footer: {
            text: "Setwise Digital Learning Hub • setwisedigital.com",
          },
          timestamp: new Date().toISOString(),
        },
      ],
      content: `🎓 **Welcome!** A new learner needs help with **${config.label}**.\n\nOur team will respond shortly. In the meantime, check out our free tools at setwisedigital.com/techbridge.`,
    };

    const msgRes = await fetch(
      `https://discord.com/api/v10/channels/${thread.id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(welcomeEmbed),
      }
    );

    if (!msgRes.ok) {
      console.error("Discord message send failed:", await msgRes.text());
    }

    return NextResponse.json({
      success: true,
      threadId: thread.id,
      threadName: thread.name,
    });
  } catch (err) {
    console.error("Discord thread API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
