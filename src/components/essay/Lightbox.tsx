import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import { allPhotos, chapters, type Photo } from "@/data/essay";
import { cn } from "@/lib/utils";

type Ctx = { open: (photoId: string) => void };
const LightboxContext = createContext<Ctx | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return ctx;
}

const pad = (n: number) => n.toString().padStart(2, "0");

const chapterOf = (photo: Photo) => chapters.find((c) => c.photos.some((p) => p.id === photo.id));

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const total = allPhotos.length;

  const open = useCallback((photoId: string) => {
    const i = allPhotos.findIndex((p) => p.id === photoId);
    if (i < 0) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    setIndex(i);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus?.();
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  );

  useEffect(() => {
    if (index === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key.toLowerCase() === "i") setShowInfo((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index === null, close, go]);

  // Precarga de imágenes vecinas
  useEffect(() => {
    if (index === null) return;
    [index + 1, index - 1].forEach((i) => {
      const p = allPhotos[(i + total) % total];
      if (!p) return;
      const im = new Image();
      im.src = p.src;
    });
  }, [index, total]);

  const photo = index !== null ? allPhotos[index] : null;
  const chapter = photo ? chapterOf(photo) : undefined;

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {photo && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotografías"
          className="animate-lightbox fixed inset-0 z-[60] flex h-[100dvh] w-screen flex-col bg-lightbox text-foreground"
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const endX = e.changedTouches[0]?.clientX;
            if (endX === undefined) return;
            const dx = endX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {/* Barra superior */}
          <div className="flex h-14 shrink-0 items-center justify-between px-4 sm:px-6">
            <span className="text-xs tabular-nums tracking-[0.18em] text-muted-foreground">
              {pad(index + 1)} / {pad(total)}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowInfo((s) => !s)}
                aria-pressed={showInfo}
                className={cn(
                  "block-hover flex h-9 items-center gap-2 px-3 text-xs text-muted-foreground hover:text-foreground",
                  showInfo && "bg-surface-hover text-foreground",
                )}
              >
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Datos técnicos</span>
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Cerrar visor (Esc)"
                className="block-hover grid h-9 w-9 place-items-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Imagen */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <img
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              className="animate-image max-h-full max-w-full select-none object-contain"
              draggable={false}
            />
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior (←)"
              className="absolute left-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-surface-hover hover:text-foreground sm:left-4"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente (→)"
              className="absolute right-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-surface-hover hover:text-foreground sm:right-4"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Pie */}
          <div className="shrink-0 px-4 pb-5 pt-4 sm:px-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-3">
              <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                {chapter && (
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Cap. {chapter.numeral} · {chapter.title}
                  </span>
                )}
                <p className="min-w-0 font-serif text-[15px] italic text-foreground/90">
                  {photo.caption}
                </p>
              </div>
              {showInfo && (
                <dl className="animate-lightbox grid grid-cols-2 gap-x-6 gap-y-2 border-t border-border pt-3 text-xs sm:grid-cols-3 lg:grid-cols-6">
                  {(
                    [
                      ["Cámara", photo.exif.camera],
                      ["Lente", photo.exif.lens],
                      ["Apertura", photo.exif.aperture],
                      ["Obturación", photo.exif.shutter],
                      ["ISO", photo.exif.iso],
                      ["Fecha", photo.exif.date],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="min-w-0">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="truncate text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
