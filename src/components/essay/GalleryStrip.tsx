import { allPhotos, chapters } from "@/data/essay";
import { useLightbox } from "./Lightbox";
import { Reveal } from "./Reveal";

const chapterOf = (photoId: string) => chapters.find((c) => c.photos.some((p) => p.id === photoId));

/** "Detrás del Lente": carrete horizontal con todas las fotos; clic abre el visor. */
export function GalleryStrip() {
  const { open } = useLightbox();

  return (
    <section aria-labelledby="galeria-title" className="py-20 md:py-28">
      <Reveal className="reading">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-flame">Detrás del lente</p>
        <h2 id="galeria-title" className="mt-2 font-serif text-3xl font-normal md:text-4xl">
          Galería fotográfica
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Diez frames del centro de Trujillo después del atardecer. Desliza el carrete y toca
          cualquier foto para verla a pantalla completa con sus datos de cámara.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <div className="bg-lightbox py-2">
          <div aria-hidden className="film-edge h-3.5 w-full" />
          <div className="overflow-x-auto [scrollbar-width:thin]">
            <div className="flex w-max gap-2.5 px-5 py-3">
              {allPhotos.map((p) => {
                const ch = chapterOf(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => open(p.id)}
                    aria-label={`Ampliar foto: ${p.caption}`}
                    className="group relative shrink-0 overflow-hidden rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-flame"
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      className="h-44 w-auto object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-110 md:h-60"
                      draggable={false}
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-lightbox/90 to-transparent px-2.5 pb-1.5 pt-6 text-left text-[11px] text-foreground/85 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {ch ? `Cap. ${ch.numeral} · ${ch.artist.name}` : p.caption}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div aria-hidden className="film-edge h-3.5 w-full" />
        </div>
      </Reveal>
    </section>
  );
}
