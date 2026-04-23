import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Plus, MessageSquare, Sparkles, AlertTriangle } from "lucide-react";
import {
  LegalAnalysis,
  AnalysisSkeleton,
  parseAnalysis,
  type Analysis,
} from "@/components/LegalAnalysis";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "LexiAI Console — AI Legal Assistant" },
      { name: "description", content: "Paste a legal case, upload a document, or ask any question. LexiAI returns a structured plain-language analysis." },
      { property: "og:title", content: "LexiAI Console" },
      { property: "og:description", content: "Your AI legal associate, on call." },
    ],
  }),
  component: ChatPage,
});

type Turn =
  | { role: "user"; text: string }
  | { role: "ai"; analysis: Analysis | null; raw: string };

const STARTER_THREADS = [
  "Sinclair v. Thorne — Non-compete",
  "SaaS MSA — Liability cap review",
  "Roe interpretation primer",
  "Founders' agreement audit",
  "Tenancy dispute summary",
];

const SUGGESTIONS = [
  "Summarise Brown v. Board of Education in plain English",
  "Explain the limitation-of-liability clause in my contract",
  "What are the risks of signing an NDA without a term limit?",
  "Build a timeline of events for a wrongful-termination case",
];

function ChatPage() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, thinking]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || thinking) return;
    setError(null);

    const next: Turn[] = [...turns, { role: "user", text: t }];
    setTurns(next);
    setInput("");
    setThinking(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) =>
            m.role === "user"
              ? { role: "user", content: m.text }
              : { role: "assistant", content: m.raw }
          ),
        }),
      });

      if (!resp.ok) {
        let msg = "Something went wrong. Please try again.";
        try { const j = await resp.json(); if (j?.error) msg = j.error; } catch {}
        setError(msg);
        setThinking(false);
        return;
      }

      const data = await resp.json();
      const raw: string = data?.content ?? "";
      const analysis = parseAnalysis(raw);
      setTurns((prev) => [...prev, { role: "ai", analysis, raw }]);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setThinking(false);
    }
  };

  const newConsult = () => {
    setTurns([]);
    setError(null);
  };

  return (
    <div className="min-h-dvh bg-onyx text-parchment flex flex-col">
      <SiteNav />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] max-w-[1600px] w-full mx-auto">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col border-r border-gold/10 p-5 gap-2">
          <button
            onClick={newConsult}
            className="flex items-center justify-between gap-2 px-4 py-3 border border-gold/30 text-gold text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gold/5 transition-colors mb-4"
          >
            New Consultation <Plus className="size-4" />
          </button>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-parchment/40 px-2 mb-2">
            Recent Threads
          </div>
          {STARTER_THREADS.map((t) => (
            <button
              key={t}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-parchment/70 hover:text-gold hover:bg-gold/5 transition-colors text-left border border-transparent hover:border-gold/20"
            >
              <MessageSquare className="size-3.5 shrink-0 text-gold/60" />
              <span className="truncate">{t}</span>
            </button>
          ))}
        </aside>

        {/* Chat */}
        <main className="flex flex-col h-[calc(100dvh-5rem)]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-12 py-10">
            {turns.length === 0 && !thinking ? (
              <EmptyState onPick={send} />
            ) : (
              <div className="max-w-3xl mx-auto space-y-10">
                {turns.map((m, i) =>
                  m.role === "user" ? (
                    <UserBubble key={i} text={m.text} />
                  ) : (
                    <AiTurn key={i} turn={m} />
                  )
                )}
                {thinking && (
                  <div className="animate-fade-up">
                    <div className="flex items-center gap-3 mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-gold">
                      <span className="size-1.5 rounded-full bg-gold animate-typing" />
                      <span className="size-1.5 rounded-full bg-gold animate-typing [animation-delay:150ms]" />
                      <span className="size-1.5 rounded-full bg-gold animate-typing [animation-delay:300ms]" />
                      <span>Drafting analysis…</span>
                    </div>
                    <AnalysisSkeleton />
                  </div>
                )}
                {error && (
                  <div className="flex gap-3 items-start glass border-destructive/40 bg-destructive/5 p-4 animate-fade-up">
                    <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <div className="text-sm text-parchment/80">{error}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-gold/10 px-6 md:px-12 py-6">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass signet flex items-end gap-2 p-3 focus-within:border-gold/60 transition-colors">
                <button type="button" className="size-10 shrink-0 flex items-center justify-center text-parchment/50 hover:text-gold transition-colors" aria-label="Attach file">
                  <Paperclip className="size-5" strokeWidth={1.5} />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                  }}
                  rows={1}
                  placeholder="Paste a judgment, contract clause, or ask a legal question…"
                  className="flex-1 bg-transparent resize-none outline-none text-parchment placeholder:text-parchment/40 py-2.5 max-h-40"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  className="size-10 shrink-0 flex items-center justify-center bg-gold text-onyx hover:bg-gold-soft disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send"
                >
                  <Send className="size-4" strokeWidth={2} />
                </button>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-parchment/30 text-center mt-3 font-bold">
                Informational only · Not a substitute for legal counsel
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="max-w-3xl mx-auto text-center pt-12 animate-fade-up">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/20 bg-gold/5 mb-6">
        <Sparkles className="size-3 text-gold" />
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">LexiAI Console</span>
      </div>
      <h1 className="font-serif text-5xl md:text-6xl mb-4 text-balance">
        Ask anything <span className="italic gold-text">legal</span>.
      </h1>
      <p className="text-parchment/60 mb-12">
        Paste a judgment, upload a contract, or ask a question. Receive a structured plain-language analysis with risk, timeline, and next steps.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 text-left">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="glass p-5 hover-lift text-sm text-parchment/80 hover:text-parchment text-left"
          >
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-2">Suggested</div>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end animate-fade-up">
      <div className="max-w-[80%] bg-gold/10 border border-gold/20 px-5 py-4 text-parchment whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
}

function AiTurn({ turn }: { turn: Extract<Turn, { role: "ai" }> }) {
  if (!turn.analysis) {
    return (
      <div className="flex gap-4 animate-fade-up">
        <div className="size-9 shrink-0 border border-gold/40 flex items-center justify-center mt-1">
          <div className="size-1.5 bg-gold" />
        </div>
        <div className="flex-1 glass p-6 text-parchment/80 text-sm whitespace-pre-wrap">
          {turn.raw || "No response."}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-4 animate-fade-up">
      <div className="size-9 shrink-0 border border-gold/40 flex items-center justify-center mt-1">
        <div className="size-1.5 bg-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <LegalAnalysis data={turn.analysis} />
      </div>
    </div>
  );
}
