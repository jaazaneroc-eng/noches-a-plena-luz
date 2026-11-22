import { createFileRoute } from "@tanstack/react-router";
import { ChronicleWall } from "@/components/essay/ChronicleWall";
import { EssayFooter, EssayIntro } from "@/components/essay/EssayHeader";
import { GalleryStrip } from "@/components/essay/GalleryStrip";
import { Hero } from "@/components/essay/Hero";
import { LightboxProvider } from "@/components/essay/Lightbox";
import { MapIndex } from "@/components/essay/MapIndex";
import { VoicesSection } from "@/components/essay/VoicesSection";
import { essay } from "@/data/essay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${essay.title} — ${essay.kicker}` },
      { name: "description", content: essay.subtitle },
      { property: "og:title", content: `${essay.title} — ${essay.kicker}` },
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
      <Hero />
      <MapIndex />
      <LightboxProvider>
        <GalleryStrip />
      </LightboxProvider>
      <main>
        <VoicesSection />
        <ChronicleWall />
        <EssayIntro />
      </main>
      <EssayFooter />
    </>
  );
}
