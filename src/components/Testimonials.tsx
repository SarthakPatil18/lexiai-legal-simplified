const testimonials = [
  {
    quote: "I understood my company's term sheet in five minutes. LexiAI saved us a four-figure legal bill before our seed round even closed.",
    name: "Amara Okafor",
    role: "Founder · Northwind AI",
  },
  {
    quote: "It's like having a senior associate sitting next to me at 2 AM during exam week. The verdict breakdowns are unreal.",
    name: "Daniel Whitmore",
    role: "Law Student · Cambridge",
  },
  {
    quote: "We use LexiAI to triage incoming filings. What used to take a paralegal two hours now takes ninety seconds.",
    name: "Priya Rajan",
    role: "Research Counsel · Independent",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <div className="text-xs font-medium text-muted-foreground mb-5 uppercase tracking-[0.15em]">Reviews</div>
          <h2 className="text-4xl md:text-6xl text-balance tracking-[-0.04em] font-bold leading-[0.95]">
            Trusted by those who can't afford to guess.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="glass p-7 flex flex-col hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <blockquote className="text-base leading-relaxed text-foreground mb-7 flex-1 tracking-[-0.01em]">
                "{t.quote}"
              </blockquote>
              <figcaption className="border-t border-border pt-5 flex items-center gap-3">
                <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-foreground text-sm font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
