export function Footer() {
  return (
    <footer className="relative border-t border-border mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-7 rounded-full bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-xs">L</span>
              </div>
              <span className="text-base font-semibold tracking-[-0.02em]">LexiAI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The standard for AI-assisted legal understanding. Stockholm · London · Singapore.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium text-foreground mb-3 uppercase tracking-[0.12em]">Navigate</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Capabilities</a></li>
              <li><a href="#trust" className="hover:text-foreground transition-colors">Why LexiAI</a></li>
              <li><a href="#stats" className="hover:text-foreground transition-colors">Impact</a></li>
              <li><a href="#testimonials" className="hover:text-foreground transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium text-foreground mb-3 uppercase tracking-[0.12em]">Legal</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#disclaimer" className="hover:text-foreground transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div id="disclaimer" className="border-t border-border pt-6 flex flex-col md:flex-row gap-4 items-start justify-between">
          <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
            ⚖ This AI tool provides informational summaries only and is not a substitute for professional legal advice. Consult a qualified attorney for matters requiring legal counsel.
          </p>
          <div className="text-xs text-muted-foreground">
            © 2026 LexiAI · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
