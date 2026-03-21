"use client";

type MouseGlowLayerProps = {
  glow: { x: number; y: number };
  className?: string;
  /** Softer wash for home (default true) */
  subtle?: boolean;
};

export default function MouseGlowLayer({
  glow,
  className = "",
  subtle = true,
}: MouseGlowLayerProps) {
  const wash = subtle
    ? `radial-gradient(
          52vmin circle at ${glow.x}% ${glow.y}%,
          rgb(255 255 255 / 0.22),
          rgb(250 250 249 / 0.08) 45%,
          transparent 72%
        )`
    : `radial-gradient(
          58vmin circle at ${glow.x}% ${glow.y}%,
          rgb(255 255 255 / 0.58),
          rgb(250 250 249 / 0.22) 42%,
          transparent 70%
        )`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] ${className}`}
      style={{ background: wash }}
      aria-hidden
    />
  );
}
