import KiwiMark from "./KiwiMark";

/**
 * Brand lockup: the kiwi mark + "Kiwi AI Lab" wordmark, as a single unit.
 * Visual only — the caller wraps it in the link/anchor, so the whole lockup
 * stays one focusable target. Optical vertical alignment (mark box ↔ wordmark
 * cap-height) is solved here once, so every surface (Nav, PageHeader, Footer)
 * stays consistent instead of drifting across three copies.
 *
 * The mark is always `text-green`; the wordmark inherits `currentColor` so a
 * dark-surface context (Footer's `text-canvas`) adapts automatically. Size,
 * weight and colour are passed through per surface.
 */
export default function Logo({
  size = 22,
  className,
  wordmarkClassName,
}: {
  size?: number;
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <KiwiMark size={size} className="text-green" />
      <span className={`leading-none tracking-tight ${wordmarkClassName ?? ""}`}>
        Kiwi AI Lab
      </span>
    </span>
  );
}
