import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Plus, MessageSquare, Sparkles } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "LexiAI Console — AI Legal Assistant" },
      { name: "description", content: "Paste a legal case, upload a document, or ask any question. LexiAI explains it in plain language." },
      { property: "og:title", content: "LexiAI Console" },
      { property: "og:description", content: "Your AI legal associate, on call." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "ai"; text: string };

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
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            "Here is a plain-language breakdown:\n\n• Core Issue — the central legal question and parties involved.\n• Verdict — the holding and the reasoning the court relied on.\n• Key Terms — any Latin or statutory phrases, defined in context.\n• Risks — exposure points and likely outcomes if challenged.\n• Precedents — three closely related judgments worth reviewing.\n\nWould you like me to expand any section, generate a chronological timeline, or draft a one-paragraph executive summary?",
        },
      ]);
      setThinking(false);
    }, 1400);
  };

  return (
    <div className="min-h-dvh bg-onyx text-parchment flex flex-col">
      <SiteNav />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] max-w-[1600px] w-full mx-auto">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col border-r border-gold/10 p-5 gap-2">
          <button
            onClick={() => setMessages([])}
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
            {messages.length === 0 ? (
              <div className="max-w-3xl mx-auto text-center pt-12 animate-fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/20 bg-gold/5 mb-6">
                  <Sparkles className="size-3 text-gold" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">LexiAI Console</span>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl mb-4 text-balance">
                  Ask anything <span className="italic gold-text">legal</span>.
                </h1>
                <p className="text-parchment/60 mb-12">
                  Paste a judgment, upload a contract, or ask a question. Receive plain-language clarity.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-left">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="glass p-5 hover-lift text-sm text-parchment/80 hover:text-parchment text-left"
                    >
                      <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-2">Suggested</div>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-8">
                {messages.map((m, i) => <Bubble key={i} msg={m} />)}
                {thinking && <TypingBubble />}
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
                  disabled={!input.trim()}
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

function Bubble({ msg }: { msg: Msg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end animate-fade-up">
        <div className="max-w-[80%] bg-gold/10 border border-gold/20 px-5 py-4 text-parchment whitespace-pre-wrap">
          {msg.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-4 animate-fade-up">
      <div className="size-9 shrink-0 border border-gold/40 flex items-center justify-center mt-1">
        <div className="size-1.5 bg-gold" />
      </div>
      <div className="flex-1 glass p-5 whitespace-pre-wrap text-parchment/90 leading-relaxed">
        {msg.text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-4 animate-fade-up">
      <div className="size-9 shrink-0 border border-gold/40 flex items-center justify-center mt-1">
        <div className="size-1.5 bg-gold animate-slow-pulse" />
      </div>
      <div className="glass p-5 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-gold animate-typing" />
        <span className="size-1.5 rounded-full bg-gold animate-typing [animation-delay:150ms]" />
        <span className="size-1.5 rounded-full bg-gold animate-typing [animation-delay:300ms]" />
      </div>
    </div>
  );
}
