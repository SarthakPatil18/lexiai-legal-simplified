import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Plus, MessageSquare, Sparkles, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || thinking) return;
    setError(null);

    const nextHistory: Msg[] = [...messages, { role: "user", text: t }];
    setMessages(nextHistory);
    setInput("");
    setThinking(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      if (!resp.ok || !resp.body) {
        let msg = "Something went wrong. Please try again.";
        try {
          const j = await resp.json();
          if (j?.error) msg = j.error;
        } catch {}
        setError(msg);
        setThinking(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantSoFar = "";
      let started = false;
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              assistantSoFar += delta;
              if (!started) {
                started = true;
                setMessages((m) => [...m, { role: "ai", text: assistantSoFar }]);
              } else {
                setMessages((m) => {
                  const copy = m.slice();
                  copy[copy.length - 1] = { role: "ai", text: assistantSoFar };
                  return copy;
                });
              }
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error(err);
        setError("Network error. Please try again.");
      }
    } finally {
      setThinking(false);
      abortRef.current = null;
    }
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
                {thinking && messages[messages.length - 1]?.role !== "ai" && <TypingBubble />}
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
      <div className="flex-1 glass p-6 text-parchment/90 leading-relaxed prose prose-invert prose-sm max-w-none
        prose-headings:font-serif prose-headings:text-parchment prose-headings:mt-4 prose-headings:mb-2
        prose-strong:text-gold prose-strong:font-semibold
        prose-em:text-parchment/60
        prose-a:text-gold
        prose-code:text-gold prose-code:bg-onyx/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-ul:my-2 prose-li:my-0.5 prose-li:marker:text-gold
        prose-hr:border-gold/20
        prose-blockquote:border-l-gold prose-blockquote:text-parchment/70 prose-blockquote:not-italic">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
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
