import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { chapters } from "@/data/essay";
import { Reveal } from "./Reveal";

/** "Muro de Crónicas y Perfiles": tarjeta por artista con su retrato y microhistoria. */
export function ChronicleWall() {
  return (
    <section aria-labelledby="muro-title" className="reading py-20 md:py-24">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-flame">
          Muro de crónicas
        </p>
        <h2 id="muro-title" className="mt-2 font-serif text-3xl font-normal md:text-4xl">
          Perfiles de la noche
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Cinco historias personales detrás de cada oficio callejero.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {chapters.map((c, i) => {
          const portrait = c.photos[c.artist.portrait];
          return (
            <Reveal key={c.id} className={i === 0 ? "sm:col-span-2" : ""}>
              <Link
                to="/artistas/$slug"
                params={{ slug: c.slug }}
                viewTransition
                className="callout group block overflow-hidden transition-colors hover:border-flame/50"
                style={{ "--pin": c.pin.color } as CSSProperties}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={portrait.src}
                    alt={portrait.alt}
                    loading="lazy"
                    className={`w-full object-cover transition duration-500 group-hover:scale-[1.02] ${
                      i === 0 ? "aspect-[21/9]" : "aspect-[16/9]"
                    }`}
                    style={{ objectPosition: c.artist.portraitFocus ?? "center" }}
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-border bg-lightbox/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
                    Capítulo {c.numeral}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-serif text-2xl font-normal text-foreground">
                    {c.artist.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-flame">{c.artist.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.artist.teaser} {c.paragraphs[0]}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    Leer crónica
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
