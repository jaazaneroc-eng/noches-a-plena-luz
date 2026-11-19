import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Copy, Move, RotateCcw, User, X } from "lucide-react";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { chapters, essay, type Chapter, type MapPin as PinData } from "@/data/essay";

const pinVars = (c: Chapter) => ({ "--pin": c.pin.color }) as CSSProperties;

/** Límites de la zona visible del mapa (el recorte en pantallas anchas llega ~10 % por lado). */
const MIN = 12;
const MAX = 88;
const clamp = (v: number) => Math.min(MAX, Math.max(MIN, Math.round(v)));

function MapPin({
  chapter,
  pin,
  editMode,
  onSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  chapter: Chapter;
  pin: PinData;
  editMode: boolean;
  onSelect: (slug: string) => void;
  onDragStart: (e: PointerEvent<HTMLButtonElement>, slug: string) => void;
  onDragMove: (e: PointerEvent<HTMLButtonElement>) => void;
  onDragEnd: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => !editMode && onSelect(chapter.slug)}
      onPointerDown={(e) => onDragStart(e, chapter.slug)}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
      aria-label={`${chapter.artist.name} — ${chapter.artist.role}`}
      style={{ top: `${pin.top}%`, left: `${pin.left}%`, ...pinVars(chapter) }}
      className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none ${
        editMode ? "cursor-grab touch-none active:cursor-grabbing" : ""
      }`}
    >
      <span aria-hidden className="pin-pulse absolute inset-0 rounded-full bg-[var(--pin)]" />
      <span
        aria-hidden
        className="absolute -inset-1.5 rounded-full bg-[color-mix(in_oklab,var(--pin)_40%,transparent)] ring-1 ring-foreground/35 md:-inset-2"
      />
      <span className="relative grid h-8 w-8 place-items-center rounded-full border-2 border-foreground bg-[var(--pin)] text-foreground shadow-pin transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-foreground group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-lightbox md:h-10 md:w-10">
        {editMode ? (
          <Move className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.25} />
        ) : (
          <User className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.25} />
        )}
      </span>
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-foreground opacity-0 shadow-float transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:block">
        {chapter.artist.name}
        <span className="text-muted-foreground"> · {chapter.artist.role}</span>
      </span>
    </button>
  );
}

function ArtistCard({ chapter }: { chapter: Chapter }) {
  const portrait = chapter.photos[chapter.artist.portrait];
  return (
    <>
      <img
        src={portrait.src}
        alt={portrait.alt}
        className="aspect-[4/3] w-full rounded-lg object-cover"
        style={{ objectPosition: chapter.artist.portraitFocus ?? "center" }}
      />
      <Dialog.Close
        aria-label="Cerrar"
        className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-border bg-surface/80 text-foreground backdrop-blur-sm transition hover:bg-surface-active"
      >
        <X className="h-4 w-4" />
      </Dialog.Close>

      <div className="px-2 pb-2 pt-5">
        <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--pin)]" style={pinVars(chapter)} />
          Capítulo {chapter.numeral}
        </p>
        <Dialog.Title className="mt-2 font-serif text-3xl font-normal leading-tight text-foreground">
          {chapter.artist.name}
        </Dialog.Title>
        <p className="mt-0.5 text-sm text-foreground/80">{chapter.artist.role}</p>
        <Dialog.Description className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {chapter.artist.teaser}
        </Dialog.Description>

        <Link
          to="/artistas/$slug"
          params={{ slug: chapter.slug }}
          viewTransition
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
        >
          Ver sesión de fotos y entrevista
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </>
  );
}

/** Índice interactivo: foto aérea de la plaza con un marcador por artista. */
export function MapIndex() {
  const [selected, setSelected] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pins, setPins] = useState<Record<string, PinData>>(() =>
    Object.fromEntries(chapters.map((c) => [c.slug, c.pin])),
  );
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragSlug = useRef<string | null>(null);
  const current = chapters.find((c) => c.slug === selected) ?? null;
  const { map } = essay;

  const handleDragStart = (e: PointerEvent<HTMLButtonElement>, slug: string) => {
    if (!editMode) return;
    e.preventDefault();
    dragSlug.current = slug;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: PointerEvent<HTMLButtonElement>) => {
    const slug = dragSlug.current;
    const canvas = canvasRef.current;
    if (!slug || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const left = clamp(((e.clientX - rect.left) / rect.width) * 100);
    const top = clamp(((e.clientY - rect.top) / rect.height) * 100);
    setPins((prev) => ({ ...prev, [slug]: { ...prev[slug], top, left } }));
  };

  const handleDragEnd = () => {
    dragSlug.current = null;
  };

  const resetPins = () => {
    setPins(Object.fromEntries(chapters.map((c) => [c.slug, c.pin])));
    setCopied(false);
  };

  const copyPins = async () => {
    const snippet = chapters
      .map((c) => {
        const p = pins[c.slug];
        return `${c.artist.name} → pin: { top: ${p.top}, left: ${p.left}, color: "${p.color}" },`;
      })
      .join("\n");
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copia estas posiciones:", snippet);
    }
  };

  return (
    <section
      id="inicio"
      aria-labelledby="map-title"
      className="relative h-[100svh] overflow-hidden bg-lightbox"
    >
      {/* Relleno desenfocado para pantallas verticales */}
      <img
        src={map.src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-35 blur-2xl wide:hidden"
      />

      <div
        ref={canvasRef}
        className="map-canvas"
        style={{ "--map-ratio": map.width / map.height } as CSSProperties}
      >
        <img
          src={map.src}
          alt={map.alt}
          width={map.width}
          height={map.height}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full select-none object-cover"
          draggable={false}
        />
        {chapters.map((c) => (
          <MapPin
            key={c.id}
            chapter={c}
            pin={pins[c.slug]}
            editMode={editMode}
            onSelect={setSelected}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>

      {/* Encabezado */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-lightbox/85 via-lightbox/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 px-5 pt-10 text-center md:pt-12">
        <p className="map-title-shadow text-[11px] font-medium uppercase tracking-[0.26em] text-foreground/75">
          {essay.title} · {essay.kicker}
        </p>
        <h1
          id="map-title"
          className="map-title-shadow mt-3 font-serif text-4xl font-normal uppercase tracking-[0.08em] text-foreground sm:text-5xl md:text-6xl"
        >
          {map.title}
        </h1>
      </div>

      {/* Pie: leyenda (vertical) o indicación (apaisado) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-lightbox/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-4 pb-6 md:px-6">
        {!editMode && (
          <ul className="mx-auto flex max-w-md flex-wrap justify-center gap-2 wide:hidden">
            {chapters.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c.slug)}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition hover:bg-surface-active"
                >
                  <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--pin)]" style={pinVars(c)} />
                  {c.artist.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        {editMode ? (
          <div className="mx-auto w-full max-w-lg rounded-[12px] border border-border bg-surface/95 p-4 shadow-card backdrop-blur-sm">
            <p className="text-center text-sm font-medium text-foreground">
              Arrastra los marcadores a su lugar
            </p>
            <ul className="mt-3 space-y-1.5">
              {chapters.map((c) => {
                const p = pins[c.slug];
                return (
                  <li key={c.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 text-foreground">
                      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--pin)]" style={pinVars(c)} />
                      {c.artist.name}
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {p.top}% · {p.left}%
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={copyPins}
                className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "¡Copiado!" : "Copiar posiciones"}
              </button>
              <button
                type="button"
                onClick={resetPins}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 text-sm text-foreground transition hover:bg-surface-active"
              >
                <RotateCcw className="h-4 w-4" />
                Restablecer
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 text-sm text-foreground transition hover:bg-surface-active"
              >
                <Check className="h-4 w-4" />
                Listo
              </button>
            </div>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Cuando termines, pulsa «Copiar posiciones» y pégalas en el chat para dejarlas fijas.
            </p>
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center gap-1 text-center wide:mt-0">
            <p className="map-title-shadow hidden text-sm text-foreground/85 wide:block">
              Pulsa un marcador para conocer a cada artista
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#recorrido"
                className="map-title-shadow inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-foreground/70 transition hover:text-foreground"
              >
                Sobre el ensayo <ArrowDown className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/85 px-2.5 py-1 text-xs text-foreground backdrop-blur-sm transition hover:bg-surface-active"
              >
                <Move className="h-3.5 w-3.5" />
                Mover marcadores
              </button>
            </div>
          </div>
        )}
      </div>

      <Dialog.Root open={current !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-lightbox fixed inset-0 z-50 bg-scrim backdrop-blur-[6px]" />
          <Dialog.Content className="animate-image fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[12px] border border-border bg-surface p-3 shadow-card outline-none">
            {current && <ArtistCard chapter={current} />}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
