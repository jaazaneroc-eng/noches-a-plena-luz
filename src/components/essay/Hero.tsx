import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { essay } from "@/data/essay";
import { claimPlayback, registerPlayer } from "@/lib/audio-registry";

/** Escudo decorativo de la barra superior. */
function Shield() {
  return (
    <svg viewBox="0 0 24 30" aria-hidden className="h-7 w-6 drop-shadow">
      <path
        d="M12 1 22 5v9c0 7-4.5 12-10 15C6.5 26 2 21 2 14V5l10-4Z"
        fill="oklch(0.94 0 0)"
        stroke="oklch(0.2 0 0 / 0.35)"
        strokeWidth="1.2"
      />
      <path d="M12 4.5 19 7v7c0 5-3 9-7 11-4-2-7-6-7-11V7l7-2.5Z" fill="var(--flame)" />
      <path
        d="M9 15.5c1.5-1 4.5-1 6 0M12 9v9"
        stroke="oklch(0.94 0 0)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Cámara fotográfica colgante, dibujada con CSS. El lente destella al pasar el mouse. */
function HangingCamera() {
  return (
    <div className="animate-swing">
      {/* Correas */}
      <div className="relative mx-auto h-36 w-24 md:h-44">
        <span className="absolute left-2 top-0 h-full w-[3px] rotate-[4deg] bg-gradient-to-b from-foreground/45 to-foreground/15" />
        <span className="absolute right-2 top-0 h-full w-[3px] -rotate-[4deg] bg-gradient-to-b from-foreground/45 to-foreground/15" />
      </div>
      {/* Cuerpo */}
      <div className="group relative -mt-2 cursor-pointer">
        <div className="relative h-36 rounded-[22px] border border-black/60 bg-gradient-to-b from-surface-active via-surface to-lightbox shadow-card md:h-44">
          {/* Zapata y botón */}
          <span className="absolute -top-2 left-8 h-2 w-10 rounded-t-md bg-surface-active" />
          <span className="absolute -top-1.5 right-8 h-1.5 w-6 rounded-t-sm bg-flame" />
          {/* Visor */}
          <span className="absolute left-1/2 top-3 h-4 w-12 -translate-x-1/2 rounded-md border border-border bg-lightbox" />
          {/* Lente */}
          <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-border bg-lightbox shadow-pin md:h-28 md:w-28">
            <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-foreground/15 bg-[radial-gradient(circle_at_35%_30%,oklch(0.45_0.05_260),oklch(0.12_0.02_260)_70%)] md:h-20 md:w-20">
              <span className="h-6 w-6 rounded-full bg-lightbox ring-2 ring-foreground/10" />
            </span>
            {/* Destello al enfocar */}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.95_0.05_90/0.9),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** Portada: vista aérea oscura, franja naranja, título gigante y cámara colgante con parallax. */
export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.loop = true;
    el.volume = 0.45;
    return registerPlayer(el);
  }, []);

  const toggleSound = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => setSoundOn(false));
    else el.pause();
  };

  const parallax = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (bgRef.current)
      bgRef.current.style.transform = `translate(${x * -16}px, ${y * -10}px) scale(1.1)`;
    if (titleRef.current) titleRef.current.style.transform = `translate(${x * 20}px, ${y * 12}px)`;
    if (camRef.current) camRef.current.style.transform = `translate(${x * 34}px, ${y * 18}px)`;
  };

  return (
    <section
      aria-label="Portada — ACAPAR ARTE"
      onMouseMove={parallax}
      className="relative h-[100svh] overflow-hidden bg-lightbox"
    >
      {/* Fondo aéreo oscuro */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src={essay.map.src}
          alt=""
          aria-hidden
          className="h-full w-full scale-110 object-cover brightness-[0.42] saturate-[0.8]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lightbox/60 via-transparent to-lightbox" />
      </div>

      {/* Franja superior naranja */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 bg-flame px-4 py-3 sm:px-6">
        <p className="font-display text-sm italic tracking-wide text-foreground sm:text-lg">
          FOTORREPORTAJE INTERACTIVO
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Apagar sonido ambiente" : "Encender sonido ambiente"}
            title="Sonido ambiente del centro de Trujillo"
            className="grid h-9 w-9 place-items-center rounded-full border border-foreground/40 text-foreground transition hover:bg-foreground/15"
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <Shield />
        </div>
      </header>
      <audio
        ref={audioRef}
        preload="none"
        onPlay={(e) => {
          claimPlayback(e.currentTarget);
          setSoundOn(true);
        }}
        onPause={() => setSoundOn(false)}
      >
        <source src="/assets/audio/plaza-nocturna.mp3" type="audio/mpeg" />
      </audio>

      {/* Cámara colgante */}
      <div
        ref={camRef}
        className="absolute right-[3%] top-10 z-10 hidden w-40 will-change-transform lg:block xl:right-[6%] xl:w-56"
      >
        <HangingCamera />
      </div>

      {/* Título */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div ref={titleRef} className="will-change-transform">
          <h1 className="font-display leading-[0.95]">
            <span className="text-outline-flame block text-[17vw] tracking-tight sm:text-[13vw] lg:text-[10rem]">
              ACAPAR
            </span>
            <span className="mt-1 block -rotate-1 text-[17vw] tracking-tight text-foreground [text-shadow:0_3px_0_oklch(0.2_0_0),0_10px_40px_oklch(0_0_0/0.7)] sm:text-[13vw] lg:text-[10rem]">
              ARTE
            </span>
          </h1>
          <p className="map-title-shadow mx-auto mt-6 max-w-md text-sm text-foreground/85 sm:text-base">
            La vida, historia y expresión de los artistas callejeros del Centro Histórico de
            Trujillo
          </p>
        </div>

        <a
          href="#inicio"
          className="animate-cta-pulse group mt-10 inline-flex items-center gap-2.5 rounded-full bg-flame px-7 py-3.5 text-sm font-semibold text-foreground transition-transform duration-200 hover:scale-105 hover:bg-flame-bright"
        >
          <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          Iniciar recorrido
        </a>
      </div>
    </section>
  );
}
