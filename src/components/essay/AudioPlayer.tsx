import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";
import type { AudioTrack } from "@/data/essay";
import { claimPlayback, registerPlayer } from "@/lib/audio-registry";

const MIME: Record<string, string> = { mp3: "audio/mpeg", wav: "audio/wav", ogg: "audio/ogg" };

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Reproductor tipo "callout" de Notion. Solo un audio suena a la vez en la página. */
export function AudioPlayer({ track }: { track: AudioTrack }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  const ext = track.src.split(".").pop()?.toLowerCase() ?? "mp3";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const off = registerPlayer(el);
    if (el.readyState >= 1) setDuration(el.duration);
    return () => {
      el.pause();
      off();
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
      ref.current.muted = muted;
    }
  }, [volume, muted]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  const seek = (v: number) => {
    if (ref.current) ref.current.currentTime = v;
    setCurrent(v);
  };

  const pct = duration ? (current / duration) * 100 : 0;
  const volPct = (muted ? 0 : volume) * 100;
  const VolIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="callout flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
      <audio
        ref={ref}
        preload="metadata"
        onPlay={(e) => {
          claimPlayback(e.currentTarget);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setCurrent(0);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
      >
        <source src={track.src} type={MIME[ext] ?? undefined} />
      </audio>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pausar ${track.title}` : `Reproducir ${track.title}`}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-baseline justify-between gap-3">
          <p className="truncate text-[13.5px] font-medium text-foreground">{track.title}</p>
          <p className="hidden shrink-0 text-xs text-muted-foreground sm:block">
            {track.description}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-2.5">
          <span className="w-9 shrink-0 text-[11px] tabular-nums text-muted-foreground">
            {fmt(current)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Progreso de la pista"
            className="range-thin min-w-0 flex-1"
            style={{ ["--fill" as string]: `${pct}%` }}
          />
          <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">
            -{fmt(duration - current)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="block-hover grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
        >
          <VolIcon className="h-4 w-4" />
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            setMuted(false);
          }}
          aria-label="Volumen"
          className="range-thin hidden w-16 md:block"
          style={{ ["--fill" as string]: `${volPct}%` }}
        />
      </div>
    </div>
  );
}
