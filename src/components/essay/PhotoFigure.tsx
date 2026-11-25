import type { Photo } from "@/data/essay";
import { allPhotos } from "@/data/essay";
import { cn } from "@/lib/utils";
import { useLightbox } from "./Lightbox";

const pad = (n: number) => n.toString().padStart(2, "0");

export function PhotoFigure({
  photo,
  className,
  captionClassName,
  priority = false,
  index,
}: {
  photo: Photo;
  className?: string;
  captionClassName?: string;
  priority?: boolean;
  /** Número de la foto dentro de su galería (si no se da, se busca en el ensayo completo). */
  index?: number;
}) {
  const { open } = useLightbox();
  const n = index ?? allPhotos.findIndex((p) => p.id === photo.id) + 1;

  return (
    <figure className={cn("min-w-0", className)}>
      <button
        type="button"
        onClick={() => open(photo.id)}
        aria-label={`Ver a pantalla completa: ${photo.alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden bg-surface"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full transition duration-700 ease-out group-hover:scale-[1.012] group-hover:brightness-110"
        />
      </button>
      <figcaption
        className={cn(
          "mt-3 flex gap-3 text-left text-[13px] leading-snug text-muted-foreground",
          captionClassName,
        )}
      >
        <span className="shrink-0 tabular-nums opacity-60">{pad(n)}</span>
        <span>{photo.caption}</span>
      </figcaption>
    </figure>
  );
}
