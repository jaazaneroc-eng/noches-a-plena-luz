import type { Chapter } from "@/data/essay";
import { AudioPlayer } from "./AudioPlayer";
import { PhotoFigure } from "./PhotoFigure";
import { Reveal } from "./Reveal";
import { YouTubeEmbed } from "./YouTubeEmbed";

function Gallery({ chapter }: { chapter: Chapter }) {
  const [a, b] = chapter.photos;

  if (chapter.layout === "stacked") {
    return (
      <div className="flex flex-col gap-10 md:gap-14">
        <Reveal>
          <PhotoFigure photo={a} captionClassName="px-5 md:px-10" />
        </Reveal>
        <Reveal>
          <PhotoFigure photo={b} captionClassName="px-5 md:px-10" />
        </Reveal>
      </div>
    );
  }

  if (chapter.layout === "diptych-offset") {
    return (
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-0 sm:grid-cols-2 sm:gap-3 sm:px-3 md:gap-4 md:px-6">
        <Reveal>
          <PhotoFigure photo={a} captionClassName="px-5 sm:px-0" />
        </Reveal>
        <Reveal className="sm:mt-28" delay={120}>
          <PhotoFigure photo={b} captionClassName="px-5 sm:px-0" />
        </Reveal>
      </div>
    );
  }

  // diptych asimétrico 3/2
  return (
    <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[3fr_2fr] md:gap-3 md:px-3 lg:gap-4 lg:px-4">
      <Reveal>
        <PhotoFigure photo={a} captionClassName="px-5 md:px-0" />
      </Reveal>
      <Reveal delay={120}>
        <PhotoFigure photo={b} captionClassName="px-5 md:px-0" />
      </Reveal>
    </div>
  );
}

export function ChapterSection({ chapter }: { chapter: Chapter }) {
  return (
    <section id={chapter.id} className="pt-28 md:pt-36">
      <Reveal className="reading">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Capítulo {chapter.numeral} · {chapter.artist.name}
        </p>
        <h2 className="mt-4 font-serif text-4xl font-normal leading-[1.08] tracking-tight text-foreground md:text-[3.25rem]">
          {chapter.title}
        </h2>
        <div className="prose-essay mt-8">
          {chapter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>

      <div className="mt-14 md:mt-20">
        <Gallery chapter={chapter} />
      </div>

      <Reveal className="reading mt-8 md:mt-10">
        <AudioPlayer track={chapter.audio} />
      </Reveal>

      {chapter.quote && (
        <Reveal className="reading mt-20 md:mt-24">
          <blockquote className="border-l border-lamp/60 pl-6">
            <p className="font-serif text-2xl italic leading-snug text-foreground md:text-[1.75rem]">
              “{chapter.quote.text}”
            </p>
            {chapter.quote.attribution && (
              <footer className="mt-4 text-sm text-muted-foreground">
                — {chapter.quote.attribution}
              </footer>
            )}
          </blockquote>
        </Reveal>
      )}

      {chapter.video && (
        <Reveal className="reading mt-20 md:mt-24">
          <YouTubeEmbed video={chapter.video} fallbackPoster={chapter.photos[0].src} />
        </Reveal>
      )}

      <div className="pb-20 md:pb-24" />
    </section>
  );
}
