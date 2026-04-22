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
    <div ref={ref} className="text-center group">
      <div className="font-serif text-6xl md:text-7xl mb-3 italic gold-text tabular-nums">
        {val.toLocaleString()}{suffix}
      </div>
      <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-parchment/50">
        {label}
      </div>
      <div className="mt-6 h-px w-16 mx-auto bg-gold/30 group-hover:w-32 transition-all duration-700" />
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative py-32 px-6 md:px-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-gold/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <StatCard value={10000} suffix="+" label="Documents Analyzed" />
        <StatCard value={95} suffix="%" label="Faster Understanding" />
        <StatCard value={24} suffix="/7" label="AI Legal Help" />
      </div>
    </section>
  );
}
