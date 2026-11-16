import { ArrowDown, Calendar, Layers, MapPin, User } from "lucide-react";
import { chapters, essay } from "@/data/essay";
import { Reveal } from "./Reveal";

export function EssayHeader() {
  const props = [
    { icon: Calendar, label: "Fecha", value: essay.date },
    { icon: MapPin, label: "Lugar", value: essay.location },
    { icon: User, label: "Autor", value: essay.author },
    { icon: Layers, label: "Capítulos", value: `${chapters.length} · foto, sonido y video` },
  ];

  return (
    <header id="inicio" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <img
        src={essay.cover}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[30%_center] opacity-80"
        fetchPriority="high"
      />
      <div className="bg-cover-gradient absolute inset-0" />

      <div className="reading relative pb-16 pt-32 md:pb-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {essay.kicker}
          </p>
          <h1 className="mt-5 font-serif text-[2.9rem] font-normal leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {essay.title}
          </h1>
          <p className="mt-6 max-w-[600px] font-serif text-lg leading-relaxed text-foreground/80 md:text-xl">
            {essay.subtitle}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <dl className="mt-10 space-y-0.5 text-sm">
            {props.map(({ icon: Icon, label, value }) => (
              <div key={label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-2 py-1 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </dt>
                <dd className="text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <a
            href="#recorrido"
            className="group mt-10 inline-flex items-center gap-2.5 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            Iniciar recorrido
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </header>
  );
}

export function EssayIntro() {
  return (
    <section id="recorrido" className="reading scroll-mt-12 py-24 md:py-32">
      <Reveal>
        <div className="prose-essay">
          {essay.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "font-serif text-2xl leading-snug md:text-[1.7rem]" : ""}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <p className="mb-3 px-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Índice
        </p>
        <nav aria-label="Capítulos" className="flex flex-col">
          {chapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="block-hover grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-2 px-2 py-2.5"
            >
              <span className="font-serif text-sm italic text-muted-foreground">{c.numeral}</span>
              <span className="truncate text-[15px] text-foreground">{c.title}</span>
              <span className="text-xs text-muted-foreground">
                {c.video ? "Foto · Audio · Video" : "Foto · Audio"}
              </span>
            </a>
          ))}
        </nav>
      </Reveal>
    </section>
  );
}

export function EssayFooter() {
  return (
    <footer className="border-t border-border">
      <div className="reading flex flex-col gap-8 py-20 md:py-24">
        <p className="font-serif text-2xl italic leading-snug text-foreground/90">
          Al amanecer, la plaza vuelve a ser de paso. Lo que la noche sostuvo queda aquí.
        </p>
        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">Fotografía</dt>
            <dd className="mt-1 text-foreground">{essay.author}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Lugar</dt>
            <dd className="mt-1 text-foreground">{essay.location}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Fecha</dt>
            <dd className="mt-1 text-foreground">{essay.date}</dd>
          </div>
        </dl>
        <a
          href="#inicio"
          className="block-hover -mx-2 self-start px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
        >
          ↑ Volver al inicio
        </a>
      </div>
    </footer>
  );
}
