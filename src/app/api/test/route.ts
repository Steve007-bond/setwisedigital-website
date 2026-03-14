import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, unknown> = {};

  const geminiKey = process.env.GEMINI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  // 1. Check keys
  results.gemini_key = geminiKey
    ? `✅ Set (starts with: ${geminiKey.substring(0, 8)}...)`
    : "❌ MISSING — Get free key at aistudio.google.com → add as GEMINI_API_KEY in Vercel";

  results.anthropic_key = anthropicKey
    ? `✅ Set (evaluation plan — needs $5 credit to work)`
    : "⚠️ Not set (optional if Gemini is set)";

  results.discord_webhook = webhookUrl
    ? `✅ Set`
    : "❌ MISSING — Add DISCORD_WEBHOOK_URL in Vercel env vars";

  // 2. Test Gemini
  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: "Say: AI working" }] }] }),
        }
      );
      const data = await res.json();
      results.gemini_test = res.ok
        ? `✅ Gemini working — "${data.candidates?.[0]?.content?.parts?.[0]?.text}"`
        : `❌ Gemini failed: ${JSON.stringify(data)}`;
    } catch (err) {
      results.gemini_test = `❌ ${String(err)}`;
    }
  }

  // 3. Test Discord
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{ title: "🧪 Setwise Digital — System Test", description: "Discord notifications working!", color: 0x16a34a, timestamp: new Date().toISOString() }],
        }),
      });
      results.discord_test = res.ok ? "✅ Discord ping sent — check your channel!" : `❌ HTTP ${res.status}`;
    } catch (err) {
      results.discord_test = `❌ ${String(err)}`;
    }
  }

  results.summary = geminiKey ? "🟢 Ready to go — AI powered by Gemini (free)" : "🔴 Add GEMINI_API_KEY to activate AI chat";

  return NextResponse.json(results);
}
