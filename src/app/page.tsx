"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

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
    id: "voyager-3",
    title: "Voyager-3",
    description:
      "A musical concept album whose songs are thematically linked to my most beloved science fiction novels.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
    category: "Music",
    role:
      "I developed the album's concept, selected the novels for adaptation, and was responsible for prompting and iterating with both the LLM and the music-generating AI. Furthermore, I personally wrote every single chorus.",
    tools: ["ChatGPT-4", "Suno", "Flux"],
    link: "https://www.youtube.com/watch?v=ZOPnJi8AQjY",
  },
  {
    id: "starwazer128",
    title: "StarWazer128",
    description:
      "This is a simple HTML-based game that reimagines the Waze navigation application for use in outer space. (Only on desktop.)",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1600&auto=format&fit=crop",
    category: "Game",
    role:
      "I came up with the idea and prompted both the game and its logo.",
    tools: ["v0", "Suno", "Lovart"],
    link: "https://sfinsider.github.io/starwazer128/",
  },
  {
    id: "impossible-movies",
    title: "Impossible Movies",
    description:
      "An application designed to create synopses for movies that haven't been made.",
    image:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1600&auto=format&fit=crop",
    category: "App",
    role:
      "I came up with the idea and prompted the app.",
    tools: ["v0"],
    link: "https://v0-impossible-movies.vercel.app/",
  },
  {
    id: "spin-pong",
    title: "Spin Pong",
    description:
      "A game that puts a twist on the original, legendary Pong video game.",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    category: "Game",
    role:
      "I came up with the idea and prompted both the game and its logo.",
    tools: ["v0", "Lovart"],
    link: "https://v0-spin-pong-game-layout.vercel.app/",
  },
  {
    id: "cloud-symphony",
    title: "Cloud Symphony",
    description: "A mini, relaxation-aiding app.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    category: "App",
    role:
      "I came up with the idea and prompted both the game and its music.",
    tools: ["v0", "Suno"],
    link: "https://v0-felhojatek-v2.vercel.app/",
  },
  {
    id: "scam-ads-cannes",
    title: "Scam Ads at Cannes",
    description:
      "An educational application that showcases entries from the Cannes Lions International Festival of Creativity which were later exposed as scams.",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1600&auto=format&fit=crop",
    category: "App",
    role: "I came up with the idea and prompted the app.",
    tools: ["Claude Artifact", "Lovable"],
    link: "https://scam-ad-carousel-viewer.lovable.app/",
  },
  {
    id: "futureproof",
    title: "FutureProof",
    description:
      "Get personalized insights on your career's AI risk and a actionable 30-day plan to stay competitive in the evolving job market.",
    image:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1600&auto=format&fit=crop",
    category: "App",
    role:
      "I came up with the idea and prompted the app.",
    tools: ["Minimax Agent"],
    link: "https://o7w1ssr8i3mf.space.minimax.io/",
  },
  {
    id: "imagine-illustration",
    title: "Illustration for my science fiction short story \"Imagine\"",
    description:
      "John Lennon dies in the assassination attempt against him, then is resurrected and changes the world.",
    image:
      "https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=1600&auto=format&fit=crop",
    category: "Video",
    role:
      "I wrote the story and prompt the tools.",
    tools: ["Flux", "Hailuo"],
    link: "#",
  },
];

const tagStyles: Record<Category, string> = {
  Music:
    "bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30 dark:bg-[#8B5CF6]/20 dark:text-[#C4B5FD] dark:border-[#8B5CF6]/40",
  Game:
    "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/40",
  App:
    "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30 dark:bg-[#10B981]/20 dark:text-[#6EE7B7] dark:border-[#10B981]/40",
  Video:
    "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30 dark:bg-[#F59E0B]/20 dark:text-[#FCD34D] dark:border-[#F59E0B]/40",
};

export default function PortfolioPage() {
  const [active, setActive] = useState<Project | null>(null);

  const open = useCallback((p: Project) => setActive(p), []);
  const close = useCallback(() => setActive(null), []);

  const openExternal = useCallback((url: string) => {
    if (!url || url === "#") return;
    // Create and click a temporary anchor to reliably open in a new tab
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    // Ensure anchor is not visible and part of the DOM for some browsers
    a.style.position = "absolute";
    a.style.left = "-9999px";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

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
      <section className="px-6 md:px-10 lg:px-16 pt-24 md:pt-36 pb-12 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight md:leading-[1.05]">
            Andras Kanai - GenAI Portfolio
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-[15px] md:text-xl leading-relaxed text-[var(--muted-foreground)]">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-10 lg:px-16 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <motion.button
              key={p.id}
              onClick={() => open(p)}
              className="group text-left rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl bg-[var(--muted)]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover will-change-transform transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div
                  className={`absolute top-3 right-3 inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] font-semibold tracking-wide uppercase ${tagStyles[p.category]}`}
                >
                  {p.category}
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-base md:text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 lg:px-16 mt-12 md:mt-16 py-12 md:py-16 border-t border-[var(--border)] bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm md:text-[15px] leading-relaxed text-[var(--muted-foreground)]">
            These GenAI creations are the work of Andras Kanai. He is a Creative Director and Futurist Speaker, a recipient of multiple creative awards, with published science fiction short stories and a non-fiction book (not available in English translations). Contact: <a href="mailto:sfinsider@gmail.com" className="underline-offset-4 hover:underline text-[var(--foreground)]">sfinsider@gmail.com</a>
          </p>
        </div>
      </footer>

      {/* Modal */}
      {active && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-100 animate-in fade-in duration-200"
            onClick={close}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="w-full max-w-2xl rounded-2xl bg-[var(--card)] text-[var(--foreground)] shadow-2xl border border-[var(--border)] animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-hidden flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="sticky top-0 z-10 bg-[var(--card)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--card)]/80 px-5 md:px-6 py-3.5 border-b border-[var(--border)]">
                  <div className="flex items-center justify-between gap-3">
                    <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tagStyles[active.category]}`}>
                      {active.category}
                    </div>
                    <button
                      onClick={close}
                      aria-label="Close"
                      className="rounded-md p-2.5 text-[var(--foreground)]/80 hover:text-[var(--foreground)] bg-[var(--accent)]/60 hover:bg-[var(--accent)] border border-[var(--border)] shadow-sm transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-2xl font-bold tracking-tight">{active.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted-foreground)]">{active.description}</p>
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold tracking-wider text-[var(--muted-foreground)] uppercase">Role</h4>
                    <p className="mt-2 text-[15px] leading-relaxed">{active.role}</p>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold tracking-wider text-[var(--muted-foreground)] uppercase">AI Tools</h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
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
                  <div className="mt-8 pb-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openExternal(active.link);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-[opacity,transform] duration-200 will-change-transform"
                      aria-label="Open external project in a new tab"
                    >
                      View Project
                      <span aria-hidden>↗</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}