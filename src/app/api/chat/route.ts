import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, systemPrompt } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not set in environment variables");
      return NextResponse.json(
        { text: "AI assistant is not configured yet. Please contact us at support@setwisedigital.com for help." },
        { status: 200 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      return NextResponse.json(
        { text: "I'm having a moment — please try again or email support@setwisedigital.com" },
        { status: 200 }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "I couldn't generate a response. Please try again.";
    return NextResponse.json({ text });

  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { text: "Something went wrong. Please try again or contact support@setwisedigital.com" },
      { status: 200 }
    );
  }
}
