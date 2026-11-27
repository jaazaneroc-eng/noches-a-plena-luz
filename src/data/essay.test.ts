import { describe, expect, it } from "vitest";
import { allPhotos, chapters } from "./essay";

describe("Mapa de artistas", () => {
  it("tiene un marcador por artista, en orden y con el color pedido", () => {
    expect(chapters.map((c) => [c.artist.name, c.pin.color])).toEqual([
      ["Fernando Portocarrero", "#3E2B22"],
      ["Jean Carlo", "#388E3C"],
      ["Carlos Antonio", "#6D4C41"],
      ["Luis Lugo", "#E65100"],
      ["Priss Azabache", "#7B1FA2"],
    ]);
  });

  it("mantiene los marcadores dentro de la zona visible del mapa recortado", () => {
    // En pantallas apaisadas el mapa cubre la vista y recorta hasta un 10 % por lado.
    for (const c of chapters) {
      expect(c.pin.left).toBeGreaterThanOrEqual(12);
      expect(c.pin.left).toBeLessThanOrEqual(88);
      expect(c.pin.top).toBeGreaterThanOrEqual(12);
      expect(c.pin.top).toBeLessThanOrEqual(88);
    }
  });

  it("da a cada uno de los 5 artistas un video de YouTube", () => {
    expect(chapters.filter((c) => c.video?.youtubeId).length).toBe(5);
  });

  it("da a cada artista una dirección propia", () => {
    expect(new Set(chapters.map((c) => c.slug)).size).toBe(chapters.length);
  });
});

describe("Galerías ampliadas de capítulo", () => {
  const titles = (slug: string) =>
    (chapters.find((c) => c.slug === slug)?.gallery ?? []).map((p) => p.caption.split(" — ")[0]);

  it("muestra las fotos de Priss en el orden pedido", () => {
    expect(titles("briss")).toEqual([
      "Fuerza y rodaje",
      "Brazos al viento",
      "Rodar en la historia",
      "Equilibrio monumental",
      "Brillo en el patín",
    ]);
  });

  it("muestra las fotos de Fernando en el orden pedido", () => {
    expect(titles("porto")).toEqual([
      "Testigos de la luna",
      "Mirar lo lejano",
      "Trazar el cielo",
      "El cielo sobre el monumento",
      "El rostro del asombro",
    ]);
  });

  it("mantiene las fotos de galería fuera del mapa y la portada", () => {
    const galleryIds = chapters.flatMap((c) => (c.gallery ?? []).map((p) => p.id));
    expect(galleryIds.length).toBe(10);
    for (const id of galleryIds) {
      expect(allPhotos.some((p) => p.id === id)).toBe(false);
    }
  });
});
