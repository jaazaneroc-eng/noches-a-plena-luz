import { useEffect, useState } from "react";
import { chapters, essay } from "@/data/essay";
import { cn } from "@/lib/utils";

/** Barra de progreso ultradelgada + migas de pan discretas estilo Notion. */
export function EssayChrome() {
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setShowBar(window.scrollY > window.innerHeight * 0.75);

      let current: string | null = null;
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = c.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const activeChapter = chapters.find((c) => c.id === active);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-lamp transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md transition-all duration-300",
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0",
        )}
      >
        <div className="grid h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 text-[13px] sm:px-6">
          <a
            href="#inicio"
            className="block-hover flex min-w-0 items-center gap-1.5 px-2 py-1 text-muted-foreground"
          >
            <span className="shrink-0">Fotoensayo</span>
            <span className="shrink-0 opacity-50">/</span>
            <span className="truncate text-foreground">{essay.title}</span>
          </a>
          {activeChapter && (
            <a
              href={`#${activeChapter.id}`}
              className="block-hover hidden px-2 py-1 text-muted-foreground sm:block"
            >
              Cap. {activeChapter.numeral} · {activeChapter.title}
            </a>
          )}
        </div>
      </header>
    </>
  );
}
