import { Zap, Users, GraduationCap, Building2, Lock } from "lucide-react";

const items = [
  { icon: Zap, title: "Fast & accurate", desc: "Sub-second analysis with 99.8% parsing precision." },
  { icon: Users, title: "Easy for non-lawyers", desc: "Written for citizens, not for courtrooms." },
  { icon: GraduationCap, title: "Student friendly", desc: "Built for moot courts, research, and exam prep." },
  { icon: Building2, title: "Startup friendly", desc: "Decode contracts before you sign them." },
  { icon: Lock, title: "Private & secure", desc: "Tier-1 encryption. Zero-retention by default." },
];

export function Trust() {
  return (
    <section id="trust" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="text-xs font-medium text-primary mb-4 uppercase tracking-[0.15em]">Why LexiAI</div>
            <h2 className="text-4xl md:text-5xl mb-5 leading-[1.05] text-balance tracking-[-0.03em] font-semibold">
              Built on the standards of the <span className="font-serif italic font-normal accent-text">world's leading chambers</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We don't replace counsel — we accelerate everyone who needs to understand the law.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {items.map((it, i) => (
              <div
                key={it.title}
                className="group glass p-6 flex items-center gap-5 hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="size-12 shrink-0 rounded-2xl bg-accent flex items-center justify-center group-hover:lavender-bg transition-all duration-500">
                  <it.icon className="size-5 text-primary group-hover:text-white transition-colors" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-0.5 tracking-tight">{it.title}</h3>
                  <p className="text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
