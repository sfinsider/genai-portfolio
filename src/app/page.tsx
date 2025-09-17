"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Category = "Music" | "Game" | "App" | "Video";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Category;
  role: string;
  tools: string[];
  link: string;
};

const projects: Project[] = [
  {
    id: "ai-score-sculptor",
    title: "AI Score Sculptor",
    description: "Procedural film score sketches generated from text prompts.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1640&auto=format&fit=crop",
    category: "Music",
    role:
      "Composed, curated, and mastered a suite of cinematic cues by orchestrating LLM prompt chains with diffusion-driven score visualizations.",
    tools: ["GPT-4o", "Suno", "AIVA", "Adobe Audition"],
    link: "https://example.com/projects/ai-score-sculptor",
  },
  {
    id: "neon-runner-concepts",
    title: "Neon Runner Concepts",
    description: "Character sheets and key art for a synthwave game world.",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1640&auto=format&fit=crop",
    category: "Game",
    role:
      "Led visual development with iterative diffusion models and inpainting to converge on a cohesive game identity.",
    tools: ["Stable Diffusion XL", "Photoshop", "ComfyUI"],
    link: "https://example.com/projects/neon-runner-concepts",
  },
  {
    id: "wellness-copilot",
    title: "Wellness Copilot",
    description: "Micro-interactions and UI visuals for an AI wellness app.",
    image:
      "https://images.unsplash.com/photo-1553531384-411a247d08c3?q=80&w=1640&auto=format&fit=crop",
    category: "App",
    role:
      "Designed a minimalist UI kit and generated iconography with vector-aware diffusion, refined through Figma tokens.",
    tools: ["Figma", "Midjourney v6", "Illustrator"],
    link: "https://example.com/projects/wellness-copilot",
  },
  {
    id: "latent-portraits",
    title: "Latent Portraits",
    description: "Portrait series exploring texture and depth in diffusion.",
    image:
      "https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=1640&auto=format&fit=crop",
    category: "Video",
    role:
      "Directed an animated portrait sequence using frame interpolation and text-to-video models with color grading.",
    tools: ["Runway Gen-3", "DaVinci Resolve", "After Effects"],
    link: "https://example.com/projects/latent-portraits",
  },
  {
    id: "soundform-bot",
    title: "Soundform Bot",
    description: "Interactive bot that turns sketches into soundscapes.",
    image:
      "https://images.unsplash.com/photo-1513863329456-bb2f7b90b0e3?q=80&w=1640&auto=format&fit=crop",
    category: "App",
    role:
      "Built a playful creation flow where hand-drawn shapes map to audio textures via CLIP embeddings.",
    tools: ["OpenAI Embeddings", "Tone.js", "Processing"],
    link: "https://example.com/projects/soundform-bot",
  },
  {
    id: "vectorverse-cinematics",
    title: "Vectorverse Cinematics",
    description: "Teaser video: typographic motion meets AI footage.",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1640&auto=format&fit=crop",
    category: "Video",
    role:
      "Edited and directed a teaser built from text-to-video plates, with bespoke kinetic type overlays.",
    tools: ["Runway Gen-3", "After Effects", "Premiere Pro"],
    link: "https://example.com/projects/vectorverse-cinematics",
  },
  {
    id: "lofi-lab",
    title: "Lo-Fi Lab Sessions",
    description: "Ambient lofi tracks composed from mood prompts.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1640&auto=format&fit=crop",
    category: "Music",
    role:
      "Produced a 7-track EP by guiding model outputs with music theory heuristics and human mixing.",
    tools: ["Suno", "Logic Pro", "RX"],
    link: "https://example.com/projects/lofi-lab",
  },
];

const tagStyles: Record<Category, string> = {
  Music:
    "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-200 dark:border-violet-800",
  Game:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800",
  App: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800",
  Video:
    "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-800",
};

export default function PortfolioPage() {
  const [active, setActive] = useState<Project | null>(null);

  const open = useCallback((p: Project) => setActive(p), []);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (active) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  const heroSubtitle = useMemo(
    () =>
      "Designing with intelligent systems to craft music, visuals, and interactive experiences.",
    []
  );

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 pt-24 md:pt-40 pb-12 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Andras Kanai - GenAI Portfolio
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-[15px] md:text-lg text-[var(--muted-foreground)]">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-10 lg:px-16 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => open(p)}
              className="group text-left rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-4 md:p-5">
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${tagStyles[p.category]}`}
                >
                  <span>{p.category}</span>
                </div>
                <h3 className="mt-3 text-base md:text-lg font-semibold">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--muted-foreground)] line-clamp-2">
                  {p.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 lg:px-16 pb-16 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 items-start">
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-[var(--muted-foreground)] uppercase">
              About
            </h4>
            <p className="mt-3 text-[15px] text-[var(--foreground)]/80">
              I'm Andras Kanai, a designer working at the intersection of AI and
              creative tools. I prototype with models, compose with systems, and
              deliver polished experiences.
            </p>
          </div>
          <div className="sm:justify-self-end">
            <h4 className="text-sm font-semibold tracking-wide text-[var(--muted-foreground)] uppercase">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li>
                <a
                  href="mailto:contact@andras-kanai.com?subject=Inquiry%20about%20GenAI%20work"
                  className="underline-offset-4 hover:underline"
                >
                  contact@andras-kanai.com
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/andras-kanai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  Portfolio Site
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {active && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-100 animate-in fade-in duration-200"
            onClick={close}
          />
          <div className="absolute inset-0 flex items-end sm:items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-2xl rounded-2xl bg-[var(--card)] text-[var(--foreground)] shadow-lg border border-[var(--border)] animate-in zoom-in-95 fade-in duration-200">
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tagStyles[active.category]}`}>
                    {active.category}
                  </div>
                  <button
                    onClick={close}
                    aria-label="Close"
                    className="rounded-md p-2 text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="mt-3 text-xl font-semibold">{active.title}</h3>
                <p className="mt-2 text-[15px] text-[var(--muted-foreground)]">{active.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold tracking-wide text-[var(--muted-foreground)] uppercase">Role</h4>
                  <p className="mt-1 text-[15px]">{active.role}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold tracking-wide text-[var(--muted-foreground)] uppercase">AI Tools</h4>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {active.tools.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] px-3 py-1 text-xs"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    View Project
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}