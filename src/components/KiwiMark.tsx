/**
 * Brand mark: a kiwi cross-section (ring + radial seeds + core).
 * Monochrome via currentColor so it inherits the surrounding text color
 * and adapts to light/dark themes. Used wherever the Kiwi AI Lab logo appears.
 */
export default function KiwiMark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      className={className}
    >
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="24" cy="24" r="3.6" fill="currentColor" />
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="10.6"
          rx="1.3"
          ry="3.4"
          fill="currentColor"
          transform={`rotate(${i * 30} 24 24)`}
        />
      ))}
    </svg>
  );
}
