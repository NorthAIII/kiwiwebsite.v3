"use client";

import { useRef } from "react";

/**
 * Cuberto-style magnetic wrapper: the child eases toward the pointer while
 * hovered, then springs back. Bypassed for touch / reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
    >
      {children}
    </span>
  );
}
