"use client";

import dynamic from "next/dynamic";
import { useFlowMode } from "./useFlowMode";

const FlowCanvas = dynamic(() => import("./FlowCanvas"), { ssr: false });

/**
 * Page-level Living Flow layer (B1 / TK1+TK2). A single `position: fixed`
 * viewport-sized canvas that sits behind the whole page: the hero's flow now
 * "flows" past the fold, drifting down the page under the content sections via
 * the existing scroll-parallax in `FlowCanvas` (no document-height canvas — the
 * backing store stays viewport-sized regardless of page length).
 *
 * Desktop / high-power only: mounts strictly in `high` mode, so it is the ONLY
 * WebGL context on the page (the hero-contained `LivingFlow` renders no canvas in
 * `high`). On mobile/low-power (`low`), reduced-motion / no-WebGL (`static`), or
 * pre-defer (`idle`), it renders nothing — the flow stays hero-contained and the
 * perf/fallback baseline is untouched.
 *
 * Layering: `z-0` fixed, above the opaque body background but below content
 * (`main`/`Footer` are `relative z-10`). Translucent sections (`bg-canvas-deep/40`)
 * let it show through; opaque sections (`bg-ink`) cover it naturally.
 */
export default function FlowBackdrop() {
  const mode = useFlowMode();

  if (mode !== "high") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <FlowCanvas quality="high" />
    </div>
  );
}
