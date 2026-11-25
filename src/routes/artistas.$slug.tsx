import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BackToIndex } from "@/components/essay/BackToIndex";
import { ChapterSection } from "@/components/essay/ChapterSection";
import { LightboxProvider } from "@/components/essay/Lightbox";
import { ReadingProgress } from "@/components/essay/ReadingProgress";
import { chapters, essay } from "@/data/essay";

export const Route = createFileRoute("/artistas/$slug")({
  loader: ({ params }) => {
    const chapter = chapters.find((c) => c.slug === params.slug);
    if (!chapter) throw notFound();
    return chapter;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: `Artista no encontrado · ${essay.title}` }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.artist.name} — ${loaderData.title} · ${essay.title}`;
    const description = `${loaderData.artist.role}. ${loaderData.artist.teaser}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArtistPage,
  notFoundComponent: ArtistNotFound,
});

function ArtistPage() {
  const chapter = Route.useLoaderData();
  const i = chapters.findIndex((c) => c.slug === chapter.slug);
  const next = chapters[(i + 1) % chapters.length]!;

  return (
    <LightboxProvider key={chapter.id} photos={chapter.gallery ?? chapter.photos}>
      <ReadingProgress />
      <BackToIndex className="fixed left-4 top-4 z-40 sm:left-6 sm:top-6" />

      <main>
        <ChapterSection chapter={chapter} />
      </main>

      <nav
        aria-label="Navegación entre artistas"
        className="reading flex flex-col gap-4 border-t border-border pb-24 pt-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <BackToIndex className="self-start" />
        <Link
          to="/artistas/$slug"
          params={{ slug: next.slug }}
          viewTransition
          className="block-hover group -mx-2 inline-flex items-center gap-2 self-start px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground sm:self-auto"
        >
          Siguiente: <span className="text-foreground">{next.artist.name}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </LightboxProvider>
  );
}

function ArtistNotFound() {
  return (
    <main className="reading flex min-h-[100svh] flex-col items-start justify-center gap-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {essay.title}
      </p>
      <h1 className="font-serif text-4xl text-foreground">No encontramos a este artista.</h1>
      <BackToIndex />
    </main>
  );
}
