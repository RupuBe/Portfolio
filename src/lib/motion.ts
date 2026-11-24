// Shared animation presets so every section moves the same way.

export const ease = [0.16, 1, 0.3, 1] as const;

/** Fade + rise when scrolled into view (once). */
export const reveal = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease, delay },
});

/** Fade + rise on first paint (hero). */
export const pop = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});
