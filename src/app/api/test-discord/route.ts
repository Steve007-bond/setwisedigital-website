import { NextResponse } from "next/server";

export async function GET() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      status: "FAILED",
      problem: "DISCORD_WEBHOOK_URL is NOT set in Vercel environment variables",
      fix: "Vercel → your project → Settings → Environment Variables → Add DISCORD_WEBHOOK_URL",
    }, { status: 500 });
  }

  const masked = webhookUrl.substring(0, 45) + "..." + webhookUrl.slice(-8);
  let discordStatus = 0;
  let discordBody = "";
  let fetchError = "";

  try {
    const res = await fetch(webhookUrl.trim(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "TEST — Setwise Digital webhook working",
          color: 0x16a34a,
          description: "If you see this in Discord, your webhook is connected correctly. All lead forms will now work.",
          fields: [
            { name: "Time", value: new Date().toUTCString(), inline: false },
          ],
          footer: { text: "Setwise Digital test" },
        }],
      }),
    });
    discordStatus = res.status;
    discordBody = await res.text();
  } catch (e) {
    fetchError = String(e);
  }

  if (fetchError) {
    return NextResponse.json({
      status: "NETWORK ERROR — cannot reach Discord",
      error: fetchError,
      webhookUrl: masked,
    }, { status: 500 });
  }

  if (discordStatus === 204 || discordStatus === 200) {
    return NextResponse.json({
      status: "SUCCESS — check your Discord channel now",
      webhookUrl: masked,
      discordStatus,
    });
  }

  return NextResponse.json({
    status: "DISCORD REJECTED the request",
    discordStatus,
    discordError: discordBody,
    webhookUrl: masked,
    cause:
      discordStatus === 401 ? "Webhook URL is invalid or expired — create a new webhook in Discord" :
      discordStatus === 404 ? "Webhook was deleted — create a new one in Discord channel settings" :
      discordStatus === 400 ? "Payload format rejected by Discord" :
      "Unknown error",
  }, { status: 500 });
}
