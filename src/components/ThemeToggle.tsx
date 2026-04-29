import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = (localStorage.getItem("lexi-theme") as Theme | null) ?? "light";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("lexi-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="size-10 rounded-full flex items-center justify-center border border-border bg-surface text-foreground hover:border-primary/40 transition-all hover:-translate-y-0.5"
    >
      {theme === "dark" ? (
        <Sun className="size-4" strokeWidth={1.75} />
      ) : (
        <Moon className="size-4" strokeWidth={1.75} />
      )}
    </button>
  );
}
