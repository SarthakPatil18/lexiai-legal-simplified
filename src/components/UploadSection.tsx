import { Upload, FileText } from "lucide-react";
import { useState, useRef } from "react";

export function UploadSection() {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="upload" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-medium text-primary mb-4 uppercase tracking-[0.15em]">Submission</div>
          <h2 className="text-4xl md:text-5xl mb-4 text-balance tracking-[-0.03em] font-semibold">
            Upload. Decode. <span className="font-serif italic font-normal accent-text">Understand.</span>
          </h2>
          <p className="text-muted-foreground text-lg">PDF, DOC, TXT — up to 50MB per filing.</p>
        </div>

        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) setFileName(file.name);
          }}
          className={`relative block glass-strong p-12 md:p-16 cursor-pointer hover-lift transition-all ${dragging ? "border-primary/60 bg-primary/5" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <div className="flex flex-col items-center text-center">
            <div className="size-16 rounded-2xl bg-accent flex items-center justify-center mb-5 animate-float">
              {fileName ? <FileText className="size-7 text-primary" strokeWidth={1.5} /> : <Upload className="size-7 text-primary" strokeWidth={1.5} />}
            </div>
            <div className="text-2xl font-semibold mb-1.5 tracking-tight">
              {fileName ? <span className="accent-text">{fileName}</span> : "Drop your case file here"}
            </div>
            <div className="text-sm text-muted-foreground mb-7">or click to browse — encrypted in transit</div>
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="btn-primary text-sm"
              >
                Browse files
              </button>
              <button
                type="button"
                className="btn-ghost text-sm"
              >
                Paste text
              </button>
            </div>
          </div>
        </label>
      </div>
    </section>
  );
}
