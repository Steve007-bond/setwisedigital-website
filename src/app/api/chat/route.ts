import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, systemPrompt } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY || "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";


    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "Sorry, I couldn't process that.";
    return NextResponse.json({ text });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
