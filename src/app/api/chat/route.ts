import { NextRequest, NextResponse } from "next/server";

const MODEL = "claude-haiku-4-5-20251001";

export async function GET() {
  // Test endpoint — visit /api/chat in browser to check configuration
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      status: "❌ MISSING",
      problem: "ANTHROPIC_API_KEY environment variable is not set in Vercel",
      fix: "Go to Vercel → Project → Settings → Environment Variables → Add ANTHROPIC_API_KEY",
    });
  }

  // Test the API key with a minimal request
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 10,
        messages: [{ role: "user", content: "Say: OK" }],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({
        status: "❌ API ERROR",
        httpStatus: res.status,
        error: data,
        model: MODEL,
        keyPrefix: apiKey.substring(0, 20) + "...",
      });
    }

    return NextResponse.json({
      status: "✅ WORKING",
      model: MODEL,
      response: data.content?.[0]?.text,
      keyPrefix: apiKey.substring(0, 20) + "...",
    });
  } catch (err) {
    return NextResponse.json({
      status: "❌ NETWORK ERROR",
      error: String(err),
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, systemPrompt } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        text: "The AI assistant is not configured yet. Please contact us at support@setwisedigital.com for help.",
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      return NextResponse.json({
        text: "I'm having trouble right now — please try again in a moment or email support@setwisedigital.com",
      });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "I couldn't generate a response. Please try again.";
    return NextResponse.json({ text });

  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({
      text: "Something went wrong on our end. Please try again or contact support@setwisedigital.com",
    });
  }
}
