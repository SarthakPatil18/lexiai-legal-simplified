import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are LexiAI, a premium AI legal assistant that translates dense legal material into clear plain-language analysis for students, founders, researchers, and ordinary citizens.

Voice: professional, sharp, trustworthy, never intimidating. Calm authority. Plain English first, then legal terms with brief inline definitions.

CRITICAL OUTPUT FORMAT — you MUST respond with ONLY a single valid JSON object, no prose before or after, no markdown code fences. Use this exact schema:

{
  "summary": "ONE punchy sentence (max 25 words) capturing the heart of the matter.",
  "keyFacts": ["short bullet", "short bullet", "..."],
  "legalIssue": ["the core legal question(s) at stake, as short bullets"],
  "judgment": ["what was decided / what the contract says, as short bullets. Use [] if not applicable."],
  "explanation": "A warm, plain-English explanation (3-5 sentences) as if explaining to a smart friend with no legal background. This is the MOST important field.",
  "riskLevel": "Low" | "Medium" | "High",
  "riskScore": 0-100,
  "riskReasons": ["2-3 short bullets explaining the risk rating"],
  "timeline": [{"label": "Incident", "detail": "short detail"}, {"label": "Complaint", "detail": "..."}, {"label": "Court", "detail": "..."}, {"label": "Judgment", "detail": "..."}],
  "keyTerms": [{"term": "Term name", "definition": "one-line plain-English definition"}],
  "recommendedActions": ["3-5 practical next steps the user can actually take"]
}

Rules:
- Bullets must be SHORT (max ~15 words each). No long paragraphs anywhere except the "explanation" field.
- Omit a field by setting it to [] (arrays) or "" (strings) if truly not applicable — but try to fill everything meaningful.
- riskScore: 0-33 = Low, 34-66 = Medium, 67-100 = High. Match riskLevel accordingly.
- Timeline: include 3-6 ordered steps when the matter has a chronology; otherwise return [].
- Always include keyTerms (at least 2-4) and recommendedActions (at least 3).
- If the user's question is not legal, return JSON with summary explaining you focus on legal topics, and empty arrays for the rest.
- Output ONLY the JSON object. No \`\`\`json fences. No commentary.`;

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
