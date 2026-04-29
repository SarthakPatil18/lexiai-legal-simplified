import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-18 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="size-8 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm tracking-tight">L</span>
          </div>
          <span className="text-lg font-semibold tracking-[-0.02em]">LexiAI</span>
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
