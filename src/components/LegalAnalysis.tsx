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
  txt = txt.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
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
    <div className="space-y-4">
      {/* View toggle */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="inline-flex p-1 rounded-full bg-secondary border border-border">
          {(["simple", "detailed"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                view === v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "simple" ? "Simple" : "Detailed"}
            </button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">Structured analysis</div>
      </div>

      {show(0) && (
        <Card icon={<FileText className="size-4" />} title="Summary" delay={0} highlight>
          <p className="text-xl leading-snug text-foreground tracking-[-0.015em] font-medium">
            {data.summary || "No summary available."}
          </p>
        </Card>
      )}

      {show(1) && data.explanation && (
        <Card icon={<Lightbulb className="size-4" />} title="Simple explanation" delay={1} hero>
          <p className="text-foreground/85 leading-relaxed text-[15px]">{data.explanation}</p>
        </Card>
      )}

      {show(2) && data.riskLevel && (
        <Card icon={<ShieldAlert className="size-4" />} title="Risk analysis" delay={2}>
          <RiskMeter level={data.riskLevel} score={data.riskScore} />
          {data.riskReasons.length > 0 && (
            <ul className="mt-4 space-y-2">
              {data.riskReasons.map((r, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-foreground/80">
                  <span className="text-primary mt-1.5 size-1 rounded-full bg-primary shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {show(3) && data.recommendedActions.length > 0 && (
        <Card icon={<Compass className="size-4" />} title="Recommended actions" delay={3}>
          <ol className="space-y-2.5">
            {data.recommendedActions.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/85">
                <span className="size-6 shrink-0 rounded-full lavender-bg text-white text-[11px] font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-0.5">{a}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {view === "detailed" && (
        <>
          {show(4) && data.keyFacts.length > 0 && (
            <Card icon={<ListChecks className="size-4" />} title="Key facts" delay={4} collapsible>
              <Bullets items={data.keyFacts} />
            </Card>
          )}
          {show(5) && data.legalIssue.length > 0 && (
            <Card icon={<Scale className="size-4" />} title="Legal issue" delay={5} collapsible>
              <Bullets items={data.legalIssue} />
            </Card>
          )}
          {show(6) && data.judgment.length > 0 && (
            <Card icon={<Gavel className="size-4" />} title="Judgment / outcome" delay={6} collapsible>
              <Bullets items={data.judgment} />
            </Card>
          )}
          {show(7) && data.timeline.length > 0 && (
            <Card icon={<Clock className="size-4" />} title="Case timeline" delay={7} collapsible>
              <Timeline items={data.timeline} />
            </Card>
          )}
          {show(8) && data.keyTerms.length > 0 && (
            <Card icon={<BookMarked className="size-4" />} title="Key legal terms" delay={8} collapsible>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.keyTerms.map((t) => (
                  <span key={t.term} className="text-xs font-medium px-3 py-1 rounded-full bg-accent text-accent-foreground">
                    {t.term}
                  </span>
                ))}
              </div>
              <dl className="space-y-3">
                {data.keyTerms.map((t) => (
                  <div key={t.term} className="border-l-2 border-primary/30 pl-3">
                    <dt className="font-semibold text-foreground text-sm">{t.term}</dt>
                    <dd className="text-sm text-muted-foreground mt-0.5">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          )}
        </>
      )}

      {show(view === "simple" ? 3 : 8) && <LawyerHelp />}

      <p className="text-xs text-muted-foreground text-center pt-2">
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
        hero ? "shadow-card" : ""
      } ${highlight ? "bg-gradient-to-br from-primary/[0.04] to-transparent" : ""}`}
      style={{ animationDelay: `${delay * 60}ms` }}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="size-7 rounded-full bg-accent flex items-center justify-center text-primary">
            {icon}
          </span>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={copy}
            className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            aria-label="Copy section"
            title="Copy"
          >
            {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
          </button>
          {collapsible && (
            <button
              onClick={() => setOpen((o) => !o)}
              className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
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
        <li key={i} className="flex gap-2.5 text-sm text-foreground/85 leading-relaxed">
          <span className="text-primary shrink-0 mt-1.5 size-1 rounded-full bg-primary" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function RiskMeter({ level, score }: { level: "Low" | "Medium" | "High" | ""; score: number }) {
  const safeScore = Math.max(0, Math.min(100, score || (level === "Low" ? 20 : level === "Medium" ? 55 : level === "High" ? 85 : 0)));
  const color = level === "High" ? "oklch(0.62 0.22 25)" : level === "Medium" ? "oklch(0.78 0.16 75)" : "oklch(0.65 0.16 150)";
  const ring = level === "High" ? "border-red-500/30 text-red-600 bg-red-500/10"
    : level === "Medium" ? "border-amber-500/30 text-amber-700 bg-amber-500/10"
    : "border-emerald-500/30 text-emerald-700 bg-emerald-500/10";
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${ring}`}>
            {level} risk
          </span>
          <span className="text-xs text-muted-foreground">Score · {safeScore}/100</span>
        </div>
      </div>
      <div className="relative h-2 w-full bg-accent rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 ease-out"
          style={{ width: `${safeScore}%`, background: color }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
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
            <span className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
          )}
          <span className="size-6 shrink-0 rounded-full lavender-bg flex items-center justify-center text-[10px] font-semibold text-white">
            {i + 1}
          </span>
          <div className="flex-1 -mt-0.5">
            <div className="text-xs font-semibold text-foreground">{it.label}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{it.detail}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function LawyerHelp() {
  const links = [
    { name: "Justia", href: "https://www.justia.com/lawyers/" },
    { name: "FindLaw", href: "https://lawyers.findlaw.com/" },
    { name: "Avvo", href: "https://www.avvo.com/find-a-lawyer" },
  ];
  return (
    <div className="glass p-5 md:p-6 animate-fade-up bg-gradient-to-br from-primary/[0.04] to-transparent">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="size-7 rounded-full bg-accent flex items-center justify-center text-primary">
          <Scroll className="size-4" />
        </span>
        <h3 className="text-base font-semibold tracking-tight">Need professional help?</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        For binding advice on your specific situation, consult a licensed attorney in your jurisdiction.
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
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
    <div className="space-y-4 animate-fade-in">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="glass p-6 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="size-7 rounded-full bg-accent" />
            <div className="h-4 w-40 bg-accent rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-accent rounded" />
            <div className="h-3 w-5/6 bg-accent rounded" />
            <div className="h-3 w-4/6 bg-accent rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
