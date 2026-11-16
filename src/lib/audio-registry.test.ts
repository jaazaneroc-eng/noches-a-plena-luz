import { describe, expect, it } from "vitest";
import { claimPlayback, registerPlayer } from "./audio-registry";

const fake = (paused = true) => {
  const p = { paused, pause() { p.paused = true; } };
  return p;
};

describe("audio registry", () => {
  it("pauses every other playing audio when a new one starts", () => {
    const a = fake(false);
    const b = fake(false);
    const c = fake(true);
    const offs = [registerPlayer(a), registerPlayer(b), registerPlayer(c)];

    c.paused = false;
    claimPlayback(c);

    expect(a.paused).toBe(true);
    expect(b.paused).toBe(true);
    expect(c.paused).toBe(false);
    offs.forEach((off) => off());
  });

  it("stops controlling a player once it is unregistered", () => {
    const a = fake(false);
    const b = fake(false);
    const off = registerPlayer(a);
    off();
    registerPlayer(b);
    claimPlayback(b);
    expect(a.paused).toBe(false);
  });
});
