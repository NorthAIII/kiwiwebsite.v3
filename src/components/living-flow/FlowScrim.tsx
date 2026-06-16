// A soft, canvas-coloured wash that sits between the Living Flow and the
// headline. Anchored to the left/centre where the type lives so it lifts the
// text off the particle field, while fading to fully transparent on the right
// so the flow stays vivid. Uses --color-canvas, so it adapts to dark theme too.
export default function FlowScrim() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        background:
          "radial-gradient(125% 95% at 13% 42%, color-mix(in srgb, var(--color-canvas) 90%, transparent) 0%, color-mix(in srgb, var(--color-canvas) 52%, transparent) 38%, transparent 70%)",
      }}
    />
  );
}
