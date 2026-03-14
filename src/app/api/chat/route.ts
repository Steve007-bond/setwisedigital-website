import { NextRequest, NextResponse } from "next/server";

const MODEL = "gemini-1.5-flash";

export async function GET() {
  const geminiKey = process.env.GEMINI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!geminiKey && !anthropicKey) {
    return NextResponse.json({
      status: "❌ NO KEY SET",
      fix: "Add GEMINI_API_KEY in Vercel → Settings → Environment Variables (free at aistudio.google.com)",
    });
  }

  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Reply with exactly: AI working" }] }],
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        return NextResponse.json({
          status: "✅ GEMINI WORKING",
          model: MODEL,
          response: data.candidates?.[0]?.content?.parts?.[0]?.text,
          key_prefix: geminiKey.substring(0, 10) + "...",
        });
      }
      return NextResponse.json({
        status: "❌ GEMINI KEY ERROR",
        http_status: res.status,
        error: data,
        fix: "Check your GEMINI_API_KEY is correct in Vercel env vars",
      });
    } catch (err) {
      return NextResponse.json({ status: "❌ NETWORK ERROR", error: String(err) });
    }
  }

  if (anthropicKey) {
    return NextResponse.json({
      status: "⚠️ ANTHROPIC KEY SET — but needs $5 credit to work",
      fix: "Add GEMINI_API_KEY instead — free at aistudio.google.com",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, systemPrompt } = body;

    const geminiKey = process.env.GEMINI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    // Try Gemini first (free)
    if (geminiKey) {
      const contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "I couldn't generate a response. Please try again.";
        return NextResponse.json({ text });
      }

      const errText = await res.text();
      console.error("Gemini error:", res.status, errText);
    }

    // Fallback to Anthropic
    if (anthropicKey) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: systemPrompt,
          messages,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ text: data.content?.[0]?.text ?? "No response." });
      }
    }

    return NextResponse.json({
      text: "The AI assistant needs a valid API key. Please contact support@setwisedigital.com",
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({
      text: "Something went wrong. Please try again or contact support@setwisedigital.com",
    });
  }
}
