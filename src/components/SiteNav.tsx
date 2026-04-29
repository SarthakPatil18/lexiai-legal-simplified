import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-18 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="size-8 rounded-full lavender-bg flex items-center justify-center shadow-[0_4px_14px_-4px_oklch(0.55_0.18_295/0.6)]">
            <span className="text-white font-semibold text-sm">L</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">LexiAI</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground font-medium">
          <a href="/#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="/#trust" className="hover:text-foreground transition-colors">Why us</a>
          <a href="/#stats" className="hover:text-foreground transition-colors">Impact</a>
          <a href="/#testimonials" className="hover:text-foreground transition-colors">Reviews</a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/chat" className="btn-primary text-sm hidden sm:inline-flex items-center">
            Try LexiAI
          </Link>
        </div>
      </div>
    </nav>
  );
}
