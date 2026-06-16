"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FlowCanvas = dynamic(() => import("./FlowCanvas"), { ssr: false });

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
 * The Living Flow (§4). Full-bleed WebGL field of translucent ink lines with
 * green automation pulses. Lazy-inits after first paint so it never blocks LCP,
 * degrades to a lighter particle count on low-power devices, and falls back to
 * a static gradient field under reduced-motion / no-WebGL.
 */
export default function LivingFlow({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<"idle" | "high" | "low" | "static">("idle");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !supportsWebGL()) {
      setMode("static");
      return;
    }
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      window.matchMedia("(max-width: 768px)").matches;

    // defer one frame past first paint
    const id = requestAnimationFrame(() => setMode(lowPower ? "low" : "high"));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* static base wash — always present, also the no-WebGL fallback */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 18%, rgba(111,227,111,0.14), transparent 70%)," +
            "radial-gradient(50% 60% at 22% 75%, rgba(31,122,61,0.10), transparent 72%)",
        }}
      />
      {mode === "static" && <StaticFlow />}
      {(mode === "high" || mode === "low") && (
        <FlowCanvas quality={mode === "high" ? "high" : "low"} />
      )}
    </div>
  );
}

/** SVG line/node field for reduced-motion + no-WebGL — same visual language. */
function StaticFlow() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      style={{ color: "var(--color-ink)" }}
    >
      <g fill="none" stroke="currentColor" strokeOpacity="0.12">
        <path d="M-50 120 C 250 180, 380 420, 700 360 S 1100 520, 1300 460" />
        <path d="M120 -40 C 200 220, 480 300, 520 560 S 760 760, 980 720" />
        <path d="M-30 520 C 260 480, 420 620, 760 600 S 1080 540, 1260 640" />
        <path d="M380 -30 C 420 200, 640 280, 700 520 S 900 740, 1180 700" />
      </g>
      <g fill="#1f7a3d" fillOpacity="0.5">
        <circle cx="380" cy="360" r="3" />
        <circle cx="700" cy="360" r="3" />
        <circle cx="520" cy="560" r="3" />
        <circle cx="760" cy="600" r="3" />
      </g>
    </svg>
  );
}
