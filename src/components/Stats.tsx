import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { ref, val };
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, val } = useCountUp(value);
  return (
    <div ref={ref}>
      <div className="text-6xl md:text-7xl lg:text-8xl mb-4 font-bold tracking-[-0.05em] tabular-nums leading-none">
        {val.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <StatCard value={10000} suffix="+" label="Documents analyzed" />
        <StatCard value={95} suffix="%" label="Faster understanding" />
        <StatCard value={24} suffix="/7" label="AI legal help" />
      </div>
    </section>
  );
}
