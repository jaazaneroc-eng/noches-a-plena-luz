/**
 * Garantiza que solo un audio suene a la vez en la página:
 * al reproducir uno, todos los demás registrados se pausan.
 */
type Playable = Pick<HTMLMediaElement, "pause" | "paused">;

const players = new Set<Playable>();

export function registerPlayer(player: Playable) {
  players.add(player);
  return () => {
    players.delete(player);
  };
}

export function claimPlayback(active: Playable) {
  for (const p of players) {
    if (p !== active && !p.paused) p.pause();
  }
}

/** Pausa cualquier audio activo (p. ej. al iniciar un video). */
export function pauseAll() {
  for (const p of players) {
    if (!p.paused) p.pause();
  }
}
