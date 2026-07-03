// Readability veil for the page-level Living Flow (B1 / TK3). The flow is a single
// `position: fixed` field (see FlowBackdrop) that stays vivid behind the hero. Once
// the content sections scroll over it, the pulses can drift behind body text — so
// this veil, which scrolls WITH the content (it wraps the below-hero sections, not
// the fixed canvas), washes the field back with a canvas-coloured scrim so the copy
// always wins. It fades in from transparent at the top, so there is no hard
// brightness seam where the hero (full intensity, unveiled) meets the first section.
//
// Adaptive by construction: this uniform wash is the baseline; sections that already
// carry a translucent background (`bg-canvas-deep/40` — Sektörler, Forum, Credibility)
// dim the field further where the copy is densest, while the "breathing" transparent
// sections keep more of it. Opaque panels (`bg-ink`) cover it outright. Uses the same
// token-based `color-mix(--color-canvas)` pattern as `FlowScrim`, so it flips with the
// theme automatically — no `dark:` variant (project themes via `html.dark` + token flip).
export default function FlowVeil() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "linear-gradient(to bottom, transparent 0, color-mix(in srgb, var(--color-canvas) 56%, transparent) 160px, color-mix(in srgb, var(--color-canvas) 56%, transparent) 100%)",
      }}
    />
  );
}
