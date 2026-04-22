import { FileText, Gavel, BookMarked, Clock, ShieldAlert, Library, FileSignature } from "lucide-react";

const features = [
  { icon: FileText, title: "Plain Language Summary", desc: "Dense judgments rewritten in clear, human prose anyone can understand." },
  { icon: Gavel, title: "Verdict Breakdown", desc: "Every ruling parsed into reasoning, holding, and implication." },
  { icon: BookMarked, title: "Key Legal Terms", desc: "Latin phrases and statutes explained inline, in context." },
  { icon: Clock, title: "Timeline of Events", desc: "Chronological reconstruction of facts, filings, and rulings." },
  { icon: ShieldAlert, title: "Risk Analysis", desc: "Identify exposure, weak clauses, and likely litigation outcomes." },
  { icon: Library, title: "Similar Cases", desc: "Surface precedents and related judgments instantly." },
  { icon: FileSignature, title: "Contract Simplifier", desc: "Strip jargon from any agreement and flag what matters." },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-4">
            — Capabilities
          </div>
          <h2 className="font-serif text-4xl md:text-6xl mb-6 text-balance">
            A complete <span className="italic gold-text">legal mind</span>, on call.
          </h2>
          <p className="text-parchment/60 text-lg">
            Seven precision instruments. One unified intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative glass p-8 hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute top-0 right-0 text-[10px] font-bold tracking-[0.2em] text-gold/30 p-4 tabular-nums">
                0{i + 1}
              </div>
              <div className="size-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <f.icon className="size-5 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-parchment">{f.title}</h3>
              <p className="text-sm text-parchment/55 leading-relaxed">{f.desc}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-gold/40 to-transparent w-12 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
