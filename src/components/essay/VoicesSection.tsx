import { chapters } from "@/data/essay";
import { AudioPlayer } from "./AudioPlayer";
import { Reveal } from "./Reveal";

/** "Voces de la Calle": cápsulas de audio de cada capítulo. */
export function VoicesSection() {
  return (
    <section aria-labelledby="voces-title" className="reading py-20 md:py-24">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-flame">Voces de la calle</p>
        <h2 id="voces-title" className="mt-2 font-serif text-3xl font-normal md:text-4xl">
          Cápsulas de audio
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Ambientes y testimonios grabados en la plaza. Escucha mientras lees: solo suena una
          cápsula a la vez.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-4">
        {chapters.map((c) => (
          <Reveal key={c.id}>
            <p className="mb-2 flex items-center gap-2 px-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-[var(--pin)]"
                style={{ "--pin": c.pin.color } as React.CSSProperties}
              />
              Capítulo {c.numeral} · {c.artist.name}
            </p>
            <AudioPlayer track={c.audio} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
