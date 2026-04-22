import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { UploadSection } from "@/components/UploadSection";
import { Trust } from "@/components/Trust";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LexiAI — Law Made Simple with AI" },
      { name: "description", content: "AI legal assistant that summarizes case studies, judgments, and contracts into plain language for students, startups, and citizens." },
      { property: "og:title", content: "LexiAI — Law Made Simple with AI" },
      { property: "og:description", content: "Distill complex legal cases into plain-language insight in seconds." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-onyx text-parchment">
      <SiteNav />
      <Hero />
      <Features />
      <UploadSection />
      <Trust />
      <Stats />
      <Testimonials />
      <Footer />
    </div>
  );
}
