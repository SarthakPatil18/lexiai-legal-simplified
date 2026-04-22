export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 mt-10">
      <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="size-8 border border-gold/40 flex items-center justify-center">
                <div className="size-2 bg-gold" />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-widest text-gold uppercase">LexiAI</span>
            </div>
            <p className="text-sm text-parchment/55 max-w-xs leading-relaxed">
              The standard for AI-assisted legal understanding. Stockholm · London · Singapore.
            </p>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-4">Navigate</div>
            <ul className="space-y-3 text-sm text-parchment/60">
              <li><a href="#features" className="hover:text-gold transition-colors">Capabilities</a></li>
              <li><a href="#trust" className="hover:text-gold transition-colors">Why LexiAI</a></li>
              <li><a href="#stats" className="hover:text-gold transition-colors">Impact</a></li>
              <li><a href="#testimonials" className="hover:text-gold transition-colors">Voices</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-4">Legal</div>
            <ul className="space-y-3 text-sm text-parchment/60">
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
              <li><a href="#disclaimer" className="hover:text-gold transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div id="disclaimer" className="border-t border-gold/10 pt-8 flex flex-col md:flex-row gap-6 items-start justify-between">
          <p className="text-xs text-parchment/45 max-w-3xl leading-relaxed italic font-serif">
            ⚖ This AI tool provides informational summaries only and is not a substitute for professional legal advice. Consult a qualified attorney for matters requiring legal counsel.
          </p>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-parchment/30">
            © 2026 LexiAI · All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
