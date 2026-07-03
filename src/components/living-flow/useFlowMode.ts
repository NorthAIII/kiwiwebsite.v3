"use client";

import { useEffect, useState } from "react";

export type FlowMode = "idle" | "high" | "low" | "static";

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Shared Living Flow degradation gate. Picks the render mode from device/CPU and
 * `prefers-reduced-motion` / WebGL support, and defers WebGL init past first
 * paint so it never blocks LCP — one frame on desktop (`high`), idle/post-load on
 * low-power/mobile (`low`). Consumed by both the hero-contained `LivingFlow` and
 * the page-level `FlowBackdrop`, so the two never diverge on which mode is live
 * (single source of truth → one WebGL context is mounted, never two).
 */
export function useFlowMode(): FlowMode {
  const [mode, setMode] = useState<FlowMode>("idle");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !supportsWebGL()) {
      setMode("static");
      return;
    }
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      window.matchMedia("(max-width: 768px)").matches;

    // Desktop / high-power: defer one frame past first paint (already in budget,
    // no regression — keep the existing rAF behaviour).
    if (!lowPower) {
      const id = requestAnimationFrame(() => setMode("high"));
      return () => cancelAnimationFrame(id);
    }

    // Mobile / low-power: the WebGL init blocks the main thread during the LCP
    // window under CPU throttle, so push it out to idle (with a 2s timeout cap
    // so it still runs on a busy thread). Flow appears ~0.5-1s late but the
    // static base wash covers the hero meanwhile.
    const start = () => setMode("low");

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    // Safari has no requestIdleCallback → fall back to post-load (or a short
    // timeout if `load` already fired). Without this, the flow would never init.
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (document.readyState === "complete") {
      timeoutId = setTimeout(start, 200);
      return () => clearTimeout(timeoutId);
    }
    const onLoad = () => {
      timeoutId = setTimeout(start, 200);
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timeoutId);
    };
  }, []);

  return mode;
}
