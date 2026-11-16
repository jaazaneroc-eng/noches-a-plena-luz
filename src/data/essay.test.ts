import { describe, expect, it } from "vitest";
import { chapters } from "./essay";

describe("Mapa de artistas", () => {
  it("tiene un marcador por artista, en orden y con el color pedido", () => {
    expect(chapters.map((c) => [c.artist.name, c.pin.color])).toEqual([
      ["Porto", "#3E2B22"],
      ["Jean", "#7B1FA2"],
      ["Carlos", "#388E3C"],
      ["Lugo", "#E65100"],
      ["Briss", "#6D4C41"],
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

  it("da a cada artista una dirección propia", () => {
    expect(new Set(chapters.map((c) => c.slug)).size).toBe(chapters.length);
  });
});
