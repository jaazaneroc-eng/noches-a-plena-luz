import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { chapters, essay } from "@/data/essay";
import { Reveal } from "./Reveal";

export function EssayIntro() {
  return (
    <section id="recorrido" className="reading scroll-mt-12 py-24 md:py-32">
      <Reveal>
        <div className="prose-essay">
          {essay.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "font-serif text-2xl leading-snug md:text-[1.7rem]" : ""}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <p className="mb-3 px-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Índice
        </p>
        <nav aria-label="Capítulos" className="flex flex-col">
          {chapters.map((c) => (
            <Link
              key={c.id}
              to="/artistas/$slug"
              params={{ slug: c.slug }}
              viewTransition
              className="block-hover grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-2 px-2 py-2.5"
            >
              <span className="font-serif text-sm italic text-muted-foreground">{c.numeral}</span>
              <span className="flex min-w-0 items-baseline gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full bg-[var(--pin)]"
                  style={{ "--pin": c.pin.color } as CSSProperties}
                />
                <span className="shrink-0 text-[15px] text-foreground">{c.artist.name}</span>
                <span className="truncate text-[15px] text-muted-foreground">{c.title}</span>
              </span>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {c.video ? "Foto · Audio · Video" : "Foto · Audio"}
              </span>
            </Link>
          ))}
        </nav>
      </Reveal>
    </section>
  );
}

export function EssayFooter() {
  return (
    <footer className="border-t border-border">
      <div className="reading flex flex-col gap-8 py-20 md:py-24">
        <p className="font-serif text-2xl italic leading-snug text-foreground/90">
          Al amanecer, la plaza vuelve a ser de paso. Lo que la noche sostuvo queda aquí.
        </p>
        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">Fotografía</dt>
            <dd className="mt-1 text-foreground">{essay.author}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Lugar</dt>
            <dd className="mt-1 text-foreground">{essay.location}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Fecha</dt>
            <dd className="mt-1 text-foreground">{essay.date}</dd>
          </div>
        </dl>
        <a
          href="#inicio"
          className="block-hover -mx-2 self-start px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
        >
          ↑ Volver al mapa
        </a>
      </div>
    </footer>
  );
}
