import { Zap, Users, GraduationCap, Building2, Lock } from "lucide-react";

const items = [
  { icon: Zap, title: "Fast & Accurate", desc: "Sub-second analysis with 99.8% parsing precision." },
  { icon: Users, title: "Easy for Non-Lawyers", desc: "Written for citizens, not for courtrooms." },
  { icon: GraduationCap, title: "Student Friendly", desc: "Built for moot courts, research, and exam prep." },
  { icon: Building2, title: "Startup Friendly", desc: "Decode contracts before you sign them." },
  { icon: Lock, title: "Private & Secure", desc: "Tier-1 encryption. Zero-retention by default." },
];

export function Trust() {
  return (
    <section id="trust" className="relative py-32 px-6 md:px-10 border-y border-gold/10">
      <div className="absolute inset-0 legal-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-4">— Why LexiAI</div>
            <h2 className="font-serif text-5xl md:text-6xl mb-6 leading-[0.95] text-balance">
              Built on the standards of the <span className="italic gold-text">world's leading chambers</span>.
            </h2>
            <p className="text-parchment/60 text-lg leading-relaxed">
              We don't replace counsel — we accelerate everyone who needs to understand the law.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {items.map((it, i) => (
              <div
                key={it.title}
                className="group flex items-start gap-6 p-6 border border-gold/10 hover:border-gold/40 hover:bg-gold/[0.03] transition-all animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="size-12 shrink-0 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-onyx transition-colors">
                  <it.icon className="size-5 text-gold group-hover:text-onyx transition-colors" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl mb-1 text-parchment">{it.title}</h3>
                  <p className="text-sm text-parchment/55">{it.desc}</p>
                </div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-gold/40 tabular-nums">0{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
