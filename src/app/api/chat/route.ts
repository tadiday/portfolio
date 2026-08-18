import { NextResponse } from "next/server";
import { retrieveContext } from "@/lib/ai/retrieveContext";
import { SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";
import type { ChatMessage, ChatRequest } from "@/lib/ai/types";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 8;

function validHistory(value: unknown): value is ChatMessage[] {
  return Array.isArray(value) && value.length <= MAX_HISTORY && value.every((item) => item && typeof item === "object" && (item.role === "user" || item.role === "assistant") && typeof item.content === "string" && item.content.length <= MAX_MESSAGE_LENGTH);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ChatRequest>;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    if (message.length > MAX_MESSAGE_LENGTH) return NextResponse.json({ error: `Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer.` }, { status: 400 });
    if (body.history !== undefined && !validHistory(body.history)) return NextResponse.json({ error: "Invalid conversation history." }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "The assistant is not configured yet." }, { status: 503 });

    const history = (body.history ?? []).slice(-MAX_HISTORY);
    const context = retrieveContext(message, history);
    const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: `${SYSTEM_PROMPT}\n\nPORTFOLIO CONTEXT:\n${context}` }],
          },
          contents: [
            ...history.map((item) => ({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.content }],
            })),
            { role: "user", parts: [{ text: message }] },
          ],
          generationConfig: { maxOutputTokens: 300 },
        }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const providerError = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
        console.error("Gemini API error:", response.status, providerError?.error?.message ?? "Unknown provider error");
        throw new Error(`Gemini request failed with status ${response.status}`);
      }
      const data = (await response.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const answer = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
      if (!answer) throw new Error("Gemini returned no answer");
      return NextResponse.json({ answer });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error("Portfolio chat error:", error instanceof Error ? error.message : "Unknown error");
    const timedOut = error instanceof Error && error.name === "AbortError";
    return NextResponse.json({ error: timedOut ? "The assistant took too long to respond. Please try again." : "The assistant is unavailable right now. Please try again." }, { status: timedOut ? 504 : 500 });
  }
}
