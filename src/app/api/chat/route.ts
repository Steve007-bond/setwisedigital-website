import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL = "gemini-1.5-flash";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json({
        text: "AI not configured. Missing GEMINI_API_KEY.",
      });
    }

    const prompt = messages.map((m: any) => m.content).join("\n");

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json({
        text: "AI service error. Please try again.",
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI route error:", error);

    return NextResponse.json({
      text: "AI failed to respond. Please try again.",
    });
  }
}
