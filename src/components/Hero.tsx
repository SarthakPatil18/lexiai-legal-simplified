import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, ShieldCheck, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft ambient lavender */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[800px] rounded-full bg-primary/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-40 -right-40 size-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-24 text-center">
        {/* eyebrow pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border mb-8 shadow-soft animate-fade-up">
          <Sparkles className="size-3.5 text-primary" strokeWidth={2} />
          <span className="text-xs font-medium text-muted-foreground">AI Legal Assistant · v4.0</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-semibold mb-7 text-balance tracking-[-0.035em] animate-fade-up [animation-delay:80ms]">
          Law made <span className="accent-text font-serif italic font-normal">simple.</span>
          <br className="hidden sm:block" />
          Understand it in seconds.
        </h1>

        <p className="max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-up [animation-delay:160ms]">
          LexiAI distills complex judgments, contracts, and filings into precise plain-language
          intelligence — for students, founders, and citizens.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-20 animate-fade-up [animation-delay:240ms]">
          <Link to="/chat" className="btn-primary inline-flex items-center gap-2 group">
            Try LexiAI free
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a href="#upload" className="btn-ghost inline-flex items-center gap-2">
            Upload a document
          </a>
        </div>

        {/* trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs text-muted-foreground animate-fade-up [animation-delay:320ms]">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary/70" strokeWidth={1.75} /> Tier-1 encryption</span>
          <span className="inline-flex items-center gap-2"><Clock className="size-4 text-primary/70" strokeWidth={1.75} /> Sub-second analysis</span>
          <span className="inline-flex items-center gap-2"><Sparkles className="size-4 text-primary/70" strokeWidth={1.75} /> 99.8% parsing accuracy</span>
        </div>

        {/* preview card */}
        <div className="relative mt-20 max-w-3xl mx-auto animate-fade-up [animation-delay:400ms]">
          <div className="absolute -inset-8 lavender-bg opacity-20 blur-3xl rounded-full pointer-events-none" />
          <div className="relative glass-strong p-7 md:p-8 text-left hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="size-2 rounded-full bg-primary/40" />
                <div className="size-2 rounded-full bg-primary/40" />
                <div className="size-2 rounded-full bg-primary/70" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">Sinclair v. Thorne</span>
            </div>

            <div className="mb-5">
              <div className="text-xs font-medium text-primary mb-2">Plain-language summary</div>
              <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground tracking-tight">
                The non-compete clause in §IV ¶12 is unenforceable in this jurisdiction. Recommend
                redrafting to a 5-mile radius.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border">
              <MiniStat label="Risk" value="Moderate" tone="moderate" />
              <MiniStat label="Precedents" value="14 cited" />
              <MiniStat label="Read time" value="~30s" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ value, label, tone }: { value: string; label: string; tone?: "moderate" }) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground mb-1">{label}</div>
      <div className={`text-sm font-medium ${tone === "moderate" ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}
