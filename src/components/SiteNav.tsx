import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gold/10 bg-onyx/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-8 border border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
            <div className="size-2 bg-gold group-hover:animate-slow-pulse" />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-widest text-gold uppercase">LexiAI</span>
        </Link>
        <div className="hidden md:flex gap-10 text-[11px] tracking-[0.25em] uppercase text-parchment/60 font-medium">
          <a href="/#features" className="hover:text-gold transition-colors">Intelligence</a>
          <a href="/#trust" className="hover:text-gold transition-colors">Institutional</a>
          <a href="/#stats" className="hover:text-gold transition-colors">Impact</a>
          <a href="/#testimonials" className="hover:text-gold transition-colors">Voices</a>
        </div>
        <Link
          to="/chat"
          className="px-5 md:px-7 py-3 bg-gold text-onyx text-[11px] font-bold tracking-[0.2em] uppercase signet hover:bg-gold-soft transition-all hover:-translate-y-0.5"
        >
          Open Console
        </Link>
      </div>
    </nav>
  );
}
