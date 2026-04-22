import { Upload, FileText } from "lucide-react";
import { useState, useRef } from "react";

export function UploadSection() {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="upload" className="relative py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-4">
            — Submission
          </div>
          <h2 className="font-serif text-4xl md:text-6xl mb-4 text-balance">
            Upload. Decode. <span className="italic gold-text">Understand.</span>
          </h2>
          <p className="text-parchment/60 text-lg">PDF, DOC, TXT — up to 50MB per filing.</p>
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
          className={`relative block glass p-16 cursor-pointer hover-lift transition-all ${dragging ? "border-gold bg-gold/5" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <div className="flex flex-col items-center text-center">
            <div className="size-20 rounded-full border border-gold/30 flex items-center justify-center mb-6 animate-float">
              {fileName ? <FileText className="size-8 text-gold" strokeWidth={1.5} /> : <Upload className="size-8 text-gold" strokeWidth={1.5} />}
            </div>
            <div className="font-serif text-2xl mb-2">
              {fileName ? <span className="text-gold italic">{fileName}</span> : "Drop your case file here"}
            </div>
            <div className="text-sm text-parchment/50 mb-8">or click to browse — encrypted in transit</div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-7 py-3 bg-gold text-onyx text-[11px] font-bold tracking-[0.2em] uppercase signet hover:bg-gold-soft transition-colors"
              >
                Browse Files
              </button>
              <button
                type="button"
                className="px-7 py-3 border border-gold/30 text-gold text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gold/5 transition-colors"
              >
                Paste Text
              </button>
            </div>
          </div>
        </label>
      </div>
    </section>
  );
}
