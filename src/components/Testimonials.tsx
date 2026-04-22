const testimonials = [
  {
    quote: "I understood my company's term sheet in five minutes. LexiAI saved us a 4-figure legal bill before our seed round even closed.",
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
    <section id="testimonials" className="relative py-32 px-6 md:px-10 border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-4">— Voices</div>
          <h2 className="font-serif text-4xl md:text-6xl text-balance">
            Trusted by those who can't afford to <span className="italic gold-text">guess</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="glass p-8 flex flex-col hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-gold font-serif text-6xl leading-none mb-4 italic">"</div>
              <blockquote className="font-serif text-xl leading-relaxed text-parchment/85 italic mb-8 flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="border-t border-gold/15 pt-5">
                <div className="text-parchment font-medium">{t.name}</div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-gold/70 mt-1">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
