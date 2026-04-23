import { useEffect, useRef, useState } from "react";
import {
  FileText, ListChecks, Scale, Gavel, Lightbulb, ShieldAlert,
  Clock, BookMarked, Compass, Copy, Check, ChevronDown, Scroll, ExternalLink,
} from "lucide-react";

export type Analysis = {
  summary: string;
  keyFacts: string[];
  legalIssue: string[];
  judgment: string[];
  explanation: string;
  riskLevel: "Low" | "Medium" | "High" | "";
  riskScore: number;
  riskReasons: string[];
  timeline: { label: string; detail: string }[];
  keyTerms: { term: string; definition: string }[];
  recommendedActions: string[];
};

export function parseAnalysis(raw: string): Analysis | null {
  if (!raw) return null;
  let txt = raw.trim();
  // strip ```json fences if model adds them
  txt = txt.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  // attempt to extract first {...} block
  const start = txt.indexOf("{");
  const end = txt.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    const obj = JSON.parse(txt.slice(start, end + 1));
    return {
      summary: obj.summary ?? "",
      keyFacts: Array.isArray(obj.keyFacts) ? obj.keyFacts : [],
      legalIssue: Array.isArray(obj.legalIssue) ? obj.legalIssue : [],
      judgment: Array.isArray(obj.judgment) ? obj.judgment : [],
      explanation: obj.explanation ?? "",
      riskLevel: (obj.riskLevel as Analysis["riskLevel"]) ?? "",
      riskScore: typeof obj.riskScore === "number" ? obj.riskScore : 0,
      riskReasons: Array.isArray(obj.riskReasons) ? obj.riskReasons : [],
      timeline: Array.isArray(obj.timeline) ? obj.timeline : [],
      keyTerms: Array.isArray(obj.keyTerms) ? obj.keyTerms : [],
      recommendedActions: Array.isArray(obj.recommendedActions) ? obj.recommendedActions : [],
    };
  } catch {
    return null;
  }
}

type View = "simple" | "detailed";

export function LegalAnalysis({ data }: { data: Analysis }) {
  const [view, setView] = useState<View>("simple");
  const [revealed, setRevealed] = useState(0);

  // progressive reveal of cards
  useEffect(() => {
    setRevealed(0);
    const total = view === "simple" ? 4 : 9;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= total) clearInterval(id);
    }, 180);
    return () => clearInterval(id);
  }, [view, data]);

  const show = (idx: number) => idx < revealed;

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="inline-flex p-1 border border-gold/20 bg-onyx/40 backdrop-blur-sm">
          {(["simple", "detailed"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors ${
                view === v ? "bg-gold text-onyx" : "text-parchment/60 hover:text-gold"
              }`}
            >
              {v === "simple" ? "Simple View" : "Detailed View"}
            </button>
          ))}
        </div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-parchment/40 font-bold">
          Structured Analysis
        </div>
      </div>

      {/* SUMMARY — always shown */}
      {show(0) && (
        <Card icon={<FileText className="size-4" />} title="One-line Summary" delay={0} highlight>
          <p className="font-serif text-2xl leading-snug text-parchment text-balance">
            {data.summary || "No summary available."}
          </p>
        </Card>
      )}

      {/* EXPLANATION — hero card */}
      {show(1) && data.explanation && (
        <Card icon={<Lightbulb className="size-4" />} title="Simple Explanation" delay={1} hero>
          <p className="text-parchment/85 leading-relaxed text-[15px]">{data.explanation}</p>
        </Card>
      )}

      {/* RISK */}
      {show(2) && data.riskLevel && (
        <Card icon={<ShieldAlert className="size-4" />} title="Risk Analysis" delay={2}>
          <RiskMeter level={data.riskLevel} score={data.riskScore} />
          {data.riskReasons.length > 0 && (
            <ul className="mt-4 space-y-2">
              {data.riskReasons.map((r, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-parchment/80">
                  <span className="text-gold mt-1.5 size-1 rounded-full bg-gold shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {/* RECOMMENDED ACTIONS — also shown in simple */}
      {show(3) && data.recommendedActions.length > 0 && (
        <Card icon={<Compass className="size-4" />} title="Recommended Actions" delay={3}>
          <ol className="space-y-2.5">
            {data.recommendedActions.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm text-parchment/85">
                <span className="size-6 shrink-0 border border-gold/40 text-gold text-[11px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-0.5">{a}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {/* DETAILED-ONLY sections */}
      {view === "detailed" && (
        <>
          {show(4) && data.keyFacts.length > 0 && (
            <Card icon={<ListChecks className="size-4" />} title="Key Facts" delay={4} collapsible>
              <Bullets items={data.keyFacts} />
            </Card>
          )}
          {show(5) && data.legalIssue.length > 0 && (
            <Card icon={<Scale className="size-4" />} title="Legal Issue" delay={5} collapsible>
              <Bullets items={data.legalIssue} />
            </Card>
          )}
          {show(6) && data.judgment.length > 0 && (
            <Card icon={<Gavel className="size-4" />} title="Judgment / Outcome" delay={6} collapsible>
              <Bullets items={data.judgment} />
            </Card>
          )}
          {show(7) && data.timeline.length > 0 && (
            <Card icon={<Clock className="size-4" />} title="Case Timeline" delay={7} collapsible>
              <Timeline items={data.timeline} />
            </Card>
          )}
          {show(8) && data.keyTerms.length > 0 && (
            <Card icon={<BookMarked className="size-4" />} title="Key Legal Terms" delay={8} collapsible>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.keyTerms.map((t) => (
                  <span key={t.term} className="text-[11px] tracking-[0.15em] uppercase font-bold px-2.5 py-1 border border-gold/30 text-gold bg-gold/5">
                    {t.term}
                  </span>
                ))}
              </div>
              <dl className="space-y-3">
                {data.keyTerms.map((t) => (
                  <div key={t.term} className="border-l-2 border-gold/30 pl-3">
                    <dt className="font-semibold text-parchment text-sm">{t.term}</dt>
                    <dd className="text-sm text-parchment/70 mt-0.5">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          )}
        </>
      )}

      {/* Lawyer help */}
      {show(view === "simple" ? 3 : 8) && <LawyerHelp />}

      <p className="text-[10px] tracking-[0.25em] uppercase text-parchment/30 text-center font-bold pt-2">
        Informational only · Not a substitute for professional legal advice
      </p>
    </div>
  );
}

function Card({
  icon, title, children, delay = 0, highlight, hero, collapsible,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
  highlight?: boolean;
  hero?: boolean;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const copy = () => {
    const text = contentRef.current?.innerText ?? "";
    navigator.clipboard.writeText(`${title}\n\n${text}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div
      className={`glass p-5 md:p-6 hover-lift animate-fade-up ${
        hero ? "border-gold/40 shadow-[0_20px_60px_-30px_oklch(0.72_0.11_80/0.4)]" : ""
      } ${highlight ? "bg-gradient-to-br from-gold/[0.07] to-transparent border-gold/30" : ""}`}
      style={{ animationDelay: `${delay * 60}ms` }}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="size-7 border border-gold/30 flex items-center justify-center text-gold">
            {icon}
          </span>
          <h3 className={`font-serif ${hero ? "text-xl" : "text-lg"} text-parchment`}>{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={copy}
            className="size-8 flex items-center justify-center text-parchment/40 hover:text-gold transition-colors"
            aria-label="Copy section"
            title="Copy"
          >
            {copied ? <Check className="size-3.5 text-gold" /> : <Copy className="size-3.5" />}
          </button>
          {collapsible && (
            <button
              onClick={() => setOpen((o) => !o)}
              className="size-8 flex items-center justify-center text-parchment/40 hover:text-gold transition-colors"
              aria-label="Toggle"
            >
              <ChevronDown className={`size-4 transition-transform ${open ? "" : "-rotate-90"}`} />
            </button>
          )}
        </div>
      </div>
      {open && (
        <div ref={contentRef} className="animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-parchment/85 leading-relaxed">
          <span className="text-gold shrink-0 mt-1.5 size-1 rounded-full bg-gold" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function RiskMeter({ level, score }: { level: "Low" | "Medium" | "High" | ""; score: number }) {
  const safeScore = Math.max(0, Math.min(100, score || (level === "Low" ? 20 : level === "Medium" ? 55 : level === "High" ? 85 : 0)));
  const color = level === "High" ? "oklch(0.6 0.22 25)" : level === "Medium" ? "oklch(0.78 0.16 85)" : "oklch(0.7 0.16 150)";
  const ring = level === "High" ? "border-red-500/40 text-red-400 bg-red-500/10"
    : level === "Medium" ? "border-yellow-500/40 text-yellow-300 bg-yellow-500/10"
    : "border-emerald-500/40 text-emerald-300 bg-emerald-500/10";
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 border ${ring}`}>
            {level} Risk
          </span>
          <span className="text-xs text-parchment/50">Score · {safeScore}/100</span>
        </div>
      </div>
      <div className="relative h-2.5 w-full bg-onyx/60 border border-gold/10 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 transition-[width] duration-1000 ease-out"
          style={{ width: `${safeScore}%`, background: `linear-gradient(90deg, ${color}, ${color})` }}
        />
        <div className="absolute inset-0 flex justify-between px-[33%] pointer-events-none">
          <span className="w-px h-full bg-gold/20" />
          <span className="w-px h-full bg-gold/20" />
        </div>
      </div>
      <div className="flex justify-between text-[9px] tracking-[0.25em] uppercase text-parchment/40 font-bold mt-2">
        <span>Low</span><span>Medium</span><span>High</span>
      </div>
    </div>
  );
}

function Timeline({ items }: { items: { label: string; detail: string }[] }) {
  return (
    <ol className="relative">
      {items.map((it, i) => (
        <li key={i} className="flex gap-4 pb-4 last:pb-0 relative">
          {i < items.length - 1 && (
            <span className="absolute left-[11px] top-6 bottom-0 w-px bg-gold/20" />
          )}
          <span className="size-6 shrink-0 rounded-full border-2 border-gold bg-onyx flex items-center justify-center text-[10px] font-bold text-gold">
            {i + 1}
          </span>
          <div className="flex-1 -mt-0.5">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold">{it.label}</div>
            <div className="text-sm text-parchment/80 mt-0.5">{it.detail}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function LawyerHelp() {
  const links = [
    { name: "Justia · Find a Lawyer", href: "https://www.justia.com/lawyers/" },
    { name: "FindLaw Directory", href: "https://lawyers.findlaw.com/" },
    { name: "Avvo", href: "https://www.avvo.com/find-a-lawyer" },
  ];
  return (
    <div className="glass p-5 md:p-6 animate-fade-up border-gold/30 bg-gradient-to-br from-gold/[0.04] to-transparent">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="size-7 border border-gold/30 flex items-center justify-center text-gold">
          <Scroll className="size-4" />
        </span>
        <h3 className="font-serif text-lg text-parchment">Need Professional Help?</h3>
      </div>
      <p className="text-sm text-parchment/70 mb-4">
        For binding advice on your specific situation, consult a licensed attorney in your jurisdiction.
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 border border-gold/30 text-gold text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-gold/10 transition-colors"
          >
            {l.name} <ExternalLink className="size-3" />
          </a>
        ))}
      </div>
    </div>
  );
}

export function AnalysisSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="glass p-6 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="size-7 bg-gold/10 border border-gold/20" />
            <div className="h-4 w-40 bg-gold/10 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-parchment/10 rounded" />
            <div className="h-3 w-5/6 bg-parchment/10 rounded" />
            <div className="h-3 w-4/6 bg-parchment/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
