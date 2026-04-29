import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-24">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border mb-10 animate-fade-up">
          <span className="size-1.5 rounded-full bg-foreground animate-slow-pulse" />
          <span className="text-xs font-medium text-muted-foreground">AI Legal Assistant</span>
        </div>

        {/* Editorial headline — left aligned, bold, tight */}
        <h1 className="text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.045em] leading-[0.92] mb-8 max-w-5xl text-balance animate-fade-up [animation-delay:80ms]">
          Law made
          <br />
          simple.
        </h1>

        <p className="max-w-md text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-up [animation-delay:160ms]">
          Understand cases, contracts, and judgments instantly — in plain language.
        </p>

        <div className="flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:240ms]">
          <Link to="/chat" className="btn-primary inline-flex items-center gap-2 group text-sm">
            Try LexiAI
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a href="#upload" className="btn-ghost inline-flex items-center gap-2 text-sm">
            Upload a document
          </a>
        </div>

        {/* Preview card */}
        <div className="relative mt-24 max-w-3xl animate-fade-up [animation-delay:360ms]">
          <div className="glass-strong p-7 md:p-8 hover-lift">
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-border" />
                <div className="size-2 rounded-full bg-border" />
                <div className="size-2 rounded-full bg-border" />
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">Sinclair v. Thorne · 00:01.4s</span>
            </div>

            <div className="mb-7">
              <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-[0.12em]">Summary</div>
              <p className="text-2xl md:text-[1.75rem] leading-[1.15] text-foreground tracking-[-0.025em] font-semibold">
                The non-compete clause in §IV ¶12 is unenforceable in this jurisdiction. Recommend redrafting to a 5-mile radius.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <MiniStat label="Risk" value="Moderate" />
              <MiniStat label="Precedents" value="14 cited" />
              <MiniStat label="Read time" value="~30s" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      <div className="text-sm font-semibold text-foreground tracking-tight">{value}</div>
    </div>
  );
}
