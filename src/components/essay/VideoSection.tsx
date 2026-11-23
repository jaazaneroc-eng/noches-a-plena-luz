import type { CSSProperties } from "react";
import { chapters } from "@/data/essay";
import { Reveal } from "./Reveal";
import { YouTubeEmbed } from "./YouTubeEmbed";

/** "En movimiento": un video de YouTube por artista. Cambia los IDs en src/data/essay.ts. */
export function VideoSection() {
  return (
    <section aria-labelledby="videos-title" className="mx-auto w-full max-w-6xl px-5 py-20 md:py-24">
      <Reveal className="mx-auto max-w-[740px]">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-flame">En movimiento</p>
        <h2 id="videos-title" className="mt-2 font-serif text-3xl font-normal md:text-4xl">
          Videos de los artistas
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Un video por cada artista: míralos trabajar en la plaza.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {chapters.map((c, i) =>
          c.video ? (
            <Reveal key={c.id} className={i === 0 ? "md:col-span-2" : ""}>
              <p className="mb-2 flex items-center gap-2 px-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-[var(--pin)]"
                  style={{ "--pin": c.pin.color } as CSSProperties}
                />
                Capítulo {c.numeral} · {c.artist.name}
              </p>
              <YouTubeEmbed video={c.video} fallbackPoster={c.photos[0].src} />
            </Reveal>
          ) : null,
        )}
      </div>
    </section>
  );
}
