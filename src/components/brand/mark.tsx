import Image from "next/image";
import type { ReactNode, SVGProps } from "react";

/* ────────────────────────────────────────────────────────────────
   THE MARK
   The supplied Inquest logo: a magnifier enclosing a lowercase i
   with a vermilion datum dot. The transparent PNG keeps the mark
   sitting directly on vellum or paper without a plate. Geodetic
   ornaments below remain as supporting survey language.
   ──────────────────────────────────────────────────────────────── */

export function LogoMark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/inquest-logo.png"
      alt=""
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

export function Wordmark({
  className,
  tone = "ink",
  size = "md",
}: {
  className?: string;
  tone?: "ink" | "paper";
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-[14px] tracking-[0.2em]",
    md: "text-[17px] tracking-[0.26em]",
    lg: "text-[22px] tracking-[0.3em]",
  } as const;
  return (
    <span
      className={`${sizes[size]} font-semibold uppercase ${
        tone === "paper" ? "text-paper" : "text-ink"
      } ${className ?? ""}`}
    >
      Inquest
    </span>
  );
}

export function LogoLockup({
  size = 22,
  text = "md",
  className,
}: {
  size?: number;
  text?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} />
      <Wordmark size={text} />
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
   ICONOGRAPHY
   24px optical grid, 1.4 stroke, mitered joins. Every icon keeps a
   small "survey tick" — a short perpendicular stroke — so the set
   reads as one family.
   ──────────────────────────────────────────────────────────────── */

const P = {
  survey: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16" />
      <path d="M4 4l2 2M20 4l-2 2" />
    </>
  ),
  experiments: (
    <>
      <path d="M9.5 3.5h5" />
      <path d="M10.5 3.5v5.2L5.6 17a2.4 2.4 0 0 0 2.1 3.5h8.6a2.4 2.4 0 0 0 2.1-3.5l-4.9-8.3V3.5" />
      <path d="M7.6 14.2h8.8" />
    </>
  ),
  compare: (
    <>
      <path d="M12 3v18" />
      <path d="M7 7L3.5 12 7 17" />
      <path d="M17 7l3.5 5L17 17" />
    </>
  ),
  regressions: (
    <>
      <path d="M3.5 6.5L9 12l3.5-3.5 7.5 8.5" />
      <path d="M20 12.5v5h-5" />
      <path d="M3.5 17.5h4" />
    </>
  ),
  datasets: (
    <>
      <rect x="3.5" y="4" width="17" height="16" />
      <path d="M3.5 9.3h17M3.5 14.7h17M9.7 4v16M15.2 4v16" />
    </>
  ),
  judges: (
    <>
      <path d="M12 3.5v17" />
      <path d="M7 6.2L3 13h8L7 6.2Z" />
      <path d="M17 6.2L13 13h8l-4-6.8Z" />
      <path d="M8.5 20.5h7" />
    </>
  ),
  metrics: (
    <>
      <path d="M3.5 18.5h17" />
      <path d="M5 18.5l4.2-7.4 3.6 3.9L20 6" />
      <circle cx="20" cy="6" r="1.7" />
    </>
  ),
  traces: (
    <>
      <path d="M4 5.5h6M4 5.5v5" />
      <path d="M4 10.5h9M4 15.5h5" />
      <path d="M13 5.5h7M15 10.5h5M9 15.5h11" />
    </>
  ),
  settings: (
    <>
      <path d="M4 7.5h16M4 16.5h16" />
      <circle cx="9" cy="7.5" r="2.1" />
      <circle cx="15" cy="16.5" r="2.1" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  overview: (
    <>
      <rect x="3.5" y="4.5" width="7" height="6.5" />
      <rect x="13.5" y="4.5" width="7" height="10" />
      <rect x="3.5" y="14" width="7" height="5.5" />
      <rect x="13.5" y="17" width="7" height="2.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 5.5l2.6 6.5L12 18.5l-2.6-6.5z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.4l3.4 2" />
    </>
  ),
  check: <path d="M5 12.5l4.4 4.4L19 7.5" />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  arrowUp: (
    <>
      <path d="M12 19V5" />
      <path d="M6.5 10.5L12 5l5.5 5.5" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14" />
      <path d="M6.5 13.5L12 19l5.5-5.5" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4.5 12h15" />
      <path d="M13.5 6l6 6-6 6" />
    </>
  ),
  chevronRight: <path d="M9.5 5.5l6.5 6.5-6.5 6.5" />,
  chevronDown: <path d="M5.5 9.5L12 16l6.5-6.5" />,
  play: <path d="M7.5 4.8l11 7.2-11 7.2z" />,
  book: (
    <>
      <path d="M4 5.2c2.6-1.2 5.3-1.2 8 .4 2.7-1.6 5.4-1.6 8-.4v13.2c-2.6-1.2-5.3-1.2-8 .4-2.7-1.6-5.4-1.6-8-.4z" />
      <path d="M12 5.6v13.4" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5l1.9 5.2 5.6.4-4.3 3.5 1.5 5.4-4.7-3.2-4.7 3.2 1.5-5.4L4.5 9.1l5.6-.4z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5l8.5 4.3L12 12 3.5 7.8z" />
      <path d="M3.5 12.2L12 16.5l8.5-4.3M3.5 16.4L12 20.7l8.5-4.3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M5 20.5c1.2-3.6 3.7-5.2 7-5.2s5.8 1.6 7 5.2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.6 6-10.2A6 6 0 0 0 6 10.8C6 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.6" r="2.2" />
    </>
  ),
} as const;

export type IconName = keyof typeof P;

export function Icon({
  name,
  size = 16,
  className,
  strokeWidth = 1.4,
  ...rest
}: { name: IconName; size?: number; className?: string; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {P[name]}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   ORNAMENTS
   ──────────────────────────────────────────────────────────────── */

export function CompassRose({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <circle cx="24" cy="24" r="17" opacity="0.5" />
        <circle cx="24" cy="24" r="11" opacity="0.3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1="24"
            y1="24"
            x2={24 + 20 * Math.cos((a * Math.PI) / 180)}
            y2={24 + 20 * Math.sin((a * Math.PI) / 180)}
            opacity={a % 90 === 0 ? 0.55 : 0.25}
          />
        ))}
        <path d="M24 4 L28 24 L24 44 L20 24 Z" fill="currentColor" opacity="0.5" />
        <path d="M4 24 L24 20 L44 24 L24 28 Z" fill="currentColor" opacity="0.22" />
      </g>
    </svg>
  );
}

/** Contour lines of an unnamed ridge — the Inquest landscape. */
export function ContourField({
  className,
  lines = 9,
  seed = 3,
}: {
  className?: string;
  lines?: number;
  seed?: number;
}) {
  const paths: string[] = [];
  for (let i = 0; i < lines; i++) {
    const t = i / lines;
    const pts: string[] = [];
    const steps = 26;
    for (let s = 0; s <= steps; s++) {
      const u = s / steps;
      const x = u * 100;
      const y =
        50 +
        Math.sin(u * 6.1 + seed + t * 2.4) * (14 - t * 9) +
        Math.sin(u * 2.3 - seed * 0.7) * (20 - t * 16) +
        Math.sin(u * 11 + t) * 1.6;
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    paths.push(`M${pts.join(" L")} `);
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={i % 5 === 0 ? 1.15 : 0.6}
          opacity={0.2 + (i % 5 === 0 ? 0.32 : 0)}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/** Corner registration ticks used on sheets and cards. */
export function RegistrationTicks({ className, size = 8 }: { className?: string; size?: number }) {
  return (
    <svg
      width="100%"
      height={size}
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {[0, 25, 50, 75, 99.6].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2={x === 99.6 ? 8 : 4.5}
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/** A benchmark marker: the symbol used on maps to label a fixed point. */
export function BenchmarkLabel({
  id,
  children,
  className,
}: {
  id: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 font-mono text-[10px] ${className ?? ""}`}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        aria-hidden="true"
        focusable="false"
        className="translate-y-px"
      >
        <path d="M6 1.2 10.6 10.8H1.4Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      </svg>
      <span className="tracking-wide text-ink-mute">{id}</span>
      {children}
    </span>
  );
}

/** Ruler with alternating tick heights, used as a section divider. */
export function Ruler({ className, ticks = 60 }: { className?: string; ticks?: number }) {
  return (
    <svg
      height="7"
      viewBox={`0 0 ${ticks * 4} 7`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ width: "100%" }}
    >
      {Array.from({ length: ticks + 1 }).map((_, i) => (
        <line
          key={i}
          x1={i * 4}
          y1="0"
          x2={i * 4}
          y2={i % 5 === 0 ? 7 : 3.5}
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
