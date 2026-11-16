import { createFileRoute } from "@tanstack/react-router";
import { EssayFooter, EssayIntro } from "@/components/essay/EssayHeader";
import { MapIndex } from "@/components/essay/MapIndex";
import { essay } from "@/data/essay";

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
    <>
      <MapIndex />
      <main>
        <EssayIntro />
      </main>
      <EssayFooter />
    </>
  );
}
