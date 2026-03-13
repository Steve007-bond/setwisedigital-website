import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, unknown> = {};

  // 1. Check Anthropic API Key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  results.anthropic_key = apiKey
    ? `✅ Set (starts with: ${apiKey.substring(0, 15)}...)`
    : "❌ MISSING — Add ANTHROPIC_API_KEY in Vercel environment variables";

  // 2. Check Discord Webhook
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  results.discord_webhook = webhookUrl
    ? `✅ Set (${webhookUrl.substring(0, 50)}...)`
    : "❌ MISSING — Add DISCORD_WEBHOOK_URL in Vercel environment variables";

  // 3. Test Discord webhook with a ping
  if (webhookUrl) {
    try {
      const discordRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "🧪 Setwise Digital — System Test",
            description: "This is an automated test ping from your website. If you see this, Discord notifications are working!",
            color: 0x16a34a,
            timestamp: new Date().toISOString(),
          }],
        }),
      });
      results.discord_test = discordRes.ok
        ? "✅ Discord ping sent successfully — check your Discord channel!"
        : `❌ Discord ping failed: HTTP ${discordRes.status}`;
    } catch (err) {
      results.discord_test = `❌ Discord error: ${String(err)}`;
    }
  }

  // 4. Test Anthropic API
  if (apiKey) {
    try {
      const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 20,
          messages: [{ role: "user", content: "Reply with just: AI working" }],
        }),
      });
      const aiData = await aiRes.json();
      results.ai_test = aiRes.ok
        ? `✅ AI working — Response: "${aiData.content?.[0]?.text}"`
        : `❌ AI failed: HTTP ${aiRes.status} — ${JSON.stringify(aiData)}`;
    } catch (err) {
      results.ai_test = `❌ AI error: ${String(err)}`;
    }
  }

  results.instructions = "Visit this URL after deploying to Vercel to check everything is configured correctly.";
  results.url = "https://your-site.vercel.app/api/test";

  return NextResponse.json(results, { status: 200 });
}
