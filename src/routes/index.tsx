import { createFileRoute } from "@tanstack/react-router";
import { ChapterSection } from "@/components/essay/ChapterSection";
import { EssayChrome } from "@/components/essay/EssayChrome";
import { EssayFooter, EssayHeader, EssayIntro } from "@/components/essay/EssayHeader";
import { LightboxProvider } from "@/components/essay/Lightbox";
import { chapters, essay } from "@/data/essay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${essay.title} — Fotoensayo multimedia` },
      { name: "description", content: essay.subtitle },
      { property: "og:title", content: `${essay.title} — Fotoensayo multimedia` },
      { property: "og:description", content: essay.subtitle },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LightboxProvider>
      <EssayChrome />
      <EssayHeader />
      <main>
        <EssayIntro />
        {chapters.map((c) => (
          <ChapterSection key={c.id} chapter={c} />
        ))}
      </main>
      <EssayFooter />
    </LightboxProvider>
  );
}
