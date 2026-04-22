import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are LexiAI, a premium AI legal assistant. Your job is to translate dense legal material — case studies, judgments, contracts, statutes — into clear, plain-language explanations for students, founders, researchers, and ordinary citizens.

Voice: professional, sharp, trustworthy, never intimidating. Calm authority. Use simple words first, then introduce legal terms with brief inline definitions.

When the user shares a case, contract, or legal question, structure your reply with markdown using these sections when relevant (omit sections that don't apply):

**Summary** — 2-3 sentence plain-language overview.
**Key Points** — bullet list of the most important facts or clauses.
**Verdict / Outcome** — what was decided and why (for cases).
**Key Legal Terms** — short definitions of any jargon used.
**Timeline** — chronological events when applicable.
**Risks** — exposure, weak clauses, or likely disputes.
**Similar Cases** — 1-3 relevant precedents if known.

Always close with the disclaimer: *"Informational only — not a substitute for professional legal advice."*

If the question is not legal, politely steer back to legal topics.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = await request.json();

          if (!Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "Invalid messages payload" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              stream: true,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages,
              ],
            }),
          });

          if (!upstream.ok) {
            if (upstream.status === 429) {
              return new Response(
                JSON.stringify({ error: "Rate limit reached. Please wait a moment and try again." }),
                { status: 429, headers: { "Content-Type": "application/json" } }
              );
            }
            if (upstream.status === 402) {
              return new Response(
                JSON.stringify({ error: "AI credits exhausted. Please add credits in your Lovable workspace settings." }),
                { status: 402, headers: { "Content-Type": "application/json" } }
              );
            }
            const errText = await upstream.text();
            console.error("AI gateway error:", upstream.status, errText);
            return new Response(JSON.stringify({ error: "AI gateway error" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(upstream.body, {
            headers: { "Content-Type": "text/event-stream" },
          });
        } catch (err) {
          console.error("chat route error:", err);
          return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
