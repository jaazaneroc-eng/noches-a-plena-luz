import { useState } from "react";
import { Play } from "lucide-react";
import type { VideoBlock } from "@/data/essay";
import { pauseAll } from "@/lib/audio-registry";

/** Video de YouTube con carga diferida: miniatura propia hasta que el lector pulsa play. */
export function YouTubeEmbed({ video, fallbackPoster }: { video: VideoBlock; fallbackPoster: string }) {
  const [active, setActive] = useState(false);
  const poster = video.poster ?? fallbackPoster;
  const src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <figure>
      <div className="callout relative aspect-video w-full overflow-hidden">
        {active ? (
          <iframe
            src={src}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              pauseAll();
              setActive(true);
            }}
            aria-label={`Reproducir video: ${video.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={poster}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale-[35%] transition duration-500 group-hover:scale-[1.02] group-hover:opacity-75"
            />
            <span className="bg-video-gradient absolute inset-0" />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-foreground/25 bg-background/60 text-foreground backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-background/80">
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
            </span>
            <span className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-left text-xs text-muted-foreground">
              <span className="truncate text-foreground/90">{video.title}</span>
              <span className="shrink-0 pl-3">YouTube</span>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
