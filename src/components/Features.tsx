import { FileText, Gavel, BookMarked, Clock, ShieldAlert, Library, FileSignature } from "lucide-react";

const features = [
  { icon: FileText, title: "Plain-language summaries", desc: "Dense judgments rewritten in clear, human prose anyone can understand." },
  { icon: Gavel, title: "Verdict breakdown", desc: "Every ruling parsed into reasoning, holding, and implication." },
  { icon: BookMarked, title: "Key legal terms", desc: "Latin phrases and statutes explained inline, in context." },
  { icon: Clock, title: "Timeline of events", desc: "Chronological reconstruction of facts, filings, and rulings." },
  { icon: ShieldAlert, title: "Risk analysis", desc: "Identify exposure, weak clauses, and likely litigation outcomes." },
  { icon: Library, title: "Similar cases", desc: "Surface precedents and related judgments instantly." },
  { icon: FileSignature, title: "Contract simplifier", desc: "Strip jargon from any agreement and flag what matters." },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <div className="text-xs font-medium text-muted-foreground mb-5 uppercase tracking-[0.15em]">Capabilities</div>
          <h2 className="text-4xl md:text-6xl mb-5 text-balance tracking-[-0.04em] font-bold leading-[0.95]">
            A complete legal mind, on call.
          </h2>
          <p className="text-muted-foreground text-lg">
            Seven precision instruments. One unified intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group glass p-7 hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="size-11 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground transition-all duration-500">
                <f.icon className="size-5 text-foreground group-hover:text-background transition-colors" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold mb-2 tracking-[-0.02em]">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
