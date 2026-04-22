import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 legal-grid pointer-events-none opacity-60" />
      <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 size-[600px] rounded-full bg-gold-deep/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-gold/20 bg-gold/5 mb-8">
            <span className="size-1.5 rounded-full bg-gold animate-slow-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">Enterprise Legal Synthesis · v4.0</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-medium mb-8 text-balance">
            Law Made <span className="italic gold-text">Simple</span>
            <br />
            with Intelligence.
          </h1>

          <p className="max-w-[52ch] text-lg text-parchment/60 leading-relaxed mb-12">
            LexiAI is your digital associate — distilling complex litigation, dense contracts, and
            multi-jurisdictional filings into precise, plain-language intelligence in seconds.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/chat"
              className="group relative px-8 py-5 bg-gold text-onyx font-bold tracking-[0.2em] uppercase text-xs signet hover:-translate-y-0.5 transition-transform"
            >
              Try Now
              <span className="absolute inset-0 border border-parchment/30 translate-x-1.5 translate-y-1.5 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
            </Link>
            <a
              href="#upload"
              className="px-8 py-5 border border-gold/30 hover:border-gold text-gold font-bold tracking-[0.2em] uppercase text-xs transition-all hover:bg-gold/5"
            >
              Upload Case File
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-gold/10 pt-10 max-w-2xl">
            <Stat value="99.8%" label="Parsing Accuracy" />
            <Stat value="14M+" label="Hours Saved" />
            <Stat value="Tier 1" label="Encryption" />
          </div>
        </div>

        {/* Preview Card */}
        <div className="lg:col-span-5 relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute -inset-4 bg-gold/15 blur-3xl rounded-full pointer-events-none" />
          <div className="relative glass signet p-8 hover-lift">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gold/10">
              <div className="flex gap-2">
                <span className="size-2 rounded-full bg-gold/30" />
                <span className="size-2 rounded-full bg-gold/30" />
                <span className="size-2 rounded-full bg-gold/60" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-parchment/40">
                Institutional Dossier
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold/70 mb-3">
                  Case Analysis · Sinclair v. Thorne
                </div>
                <div className="h-1.5 w-full bg-gold/10 overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-gold-deep to-gold-soft animate-[fade-in_1.5s_ease-out]" />
                </div>
              </div>

              <div className="bg-onyx/60 p-5 border-l-2 border-gold">
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2 font-bold">
                  Distilled Insight
                </div>
                <p className="text-sm text-parchment/85 leading-relaxed font-serif italic">
                  "Section IV, ¶12 contains a non-compete clause conflicting with state statute.
                  Recommended action: redefine radius to 5 miles or strike."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MiniStat label="Liability Risk" value="Moderate" />
                <MiniStat label="Precedents" value="14 Cited" />
              </div>

              <div className="h-px shimmer-line" />
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 size-44 rounded-full border border-gold/15 hidden md:flex items-center justify-center pointer-events-none">
            <div className="size-28 rounded-full border border-gold/25 flex items-center justify-center">
              <div className="size-14 rounded-full bg-gold/5 border border-gold/50 flex items-center justify-center">
                <span className="font-serif text-gold text-2xl italic">L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-serif text-gold italic mb-1">{value}</div>
      <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-parchment/40">{label}</div>
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4 bg-onyx/40 border border-gold/10 hover:border-gold/40 transition-colors">
      <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-parchment/40 mb-1">{label}</div>
      <div className="text-base font-serif text-parchment">{value}</div>
    </div>
  );
}
