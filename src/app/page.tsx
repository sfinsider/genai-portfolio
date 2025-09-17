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
                <div
                  className={`absolute top-3 right-3 inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase ${tagStyles[p.category]}`}
                >
                  {p.category}
                </div>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-base md:text-lg font-semibold">
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
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="w-full max-w-2xl rounded-2xl bg-[var(--card)] text-[var(--foreground)] shadow-lg border border-[var(--border)] animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-hidden flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="sticky top-0 z-10 bg-[var(--card)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--card)]/80 px-5 md:px-6 py-3 border-b border-[var(--border)]">
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
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-semibold">{active.title}</h3>
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
                  <div className="mt-6 pb-2">
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
        </div>
      )}
    </main>
  );
}