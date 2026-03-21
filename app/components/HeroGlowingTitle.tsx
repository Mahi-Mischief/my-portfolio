"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const FULL_TITLE = "MAHI DESHPANDE";
/** Pixels: letters within this radius ramp toward max weight */
const PROXIMITY_RADIUS = 92;
const TITLE_LETTERS = FULL_TITLE.split("");

/** Base / peak weights (Playfair loads 700–900 in layout for smooth ramp) */
const WEIGHT_BASE = 700;
const WEIGHT_PEAK = 900;

type HeroGlowingTitleProps = {
  /** Pointer position in viewport (client) coordinates */
  clientX: number;
  clientY: number;
  className?: string;
};

export default function HeroGlowingTitle({ clientX, clientY, className = "" }: HeroGlowingTitleProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const centers = useRef<{ cx: number; cy: number }[]>([]);
  const [, setMeasured] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const next: { cx: number; cy: number }[] = [];
      let li = 0;
      for (let i = 0; i < TITLE_LETTERS.length; i++) {
        if (TITLE_LETTERS[i] === " ") continue;
        const el = letterRefs.current[li];
        li += 1;
        if (!el) {
          next.push({ cx: 0, cy: 0 });
          continue;
        }
        const r = el.getBoundingClientRect();
        next.push({ cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
      }
      centers.current = next;
      setMeasured((n) => n + 1);
    };

    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 120);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  let letterRefIndex = 0;

  return (
    <h1
      className={`flex flex-nowrap justify-center leading-[0.92] tracking-tight text-zinc-950 ${className}`}
      style={{ fontFamily: "var(--font-heading), serif" }}
      aria-label={FULL_TITLE}
    >
      {TITLE_LETTERS.map((char, i) => {
        if (char === " ") {
          return <span key={`sp-${i}`} className="inline-block w-[0.3em] shrink-0" aria-hidden />;
        }

        const idx = letterRefIndex;
        letterRefIndex += 1;
        const c = centers.current[idx];
        let t = 0;
        if (c && (c.cx !== 0 || c.cy !== 0)) {
          const d = Math.hypot(clientX - c.cx, clientY - c.cy);
          t = Math.max(0, 1 - d / PROXIMITY_RADIUS);
          // smoothstep for less jitter
          t = t * t * (3 - 2 * t);
        }

        // Ease-out: reach heavy weight sooner near the cursor (more obvious “bold”)
        const emphasis = t <= 0 ? 0 : 1 - Math.pow(1 - t, 2.35);
        const weight = WEIGHT_BASE + emphasis * (WEIGHT_PEAK - WEIGHT_BASE);
        const style: CSSProperties = {
          fontWeight: Math.round(weight),
          color: `rgb(${Math.round(2 + (1 - emphasis) * 22)}, ${Math.round(2 + (1 - emphasis) * 22)}, ${Math.round(4 + (1 - emphasis) * 23)})`,
        };

        return (
          <span
            key={`ch-${i}`}
            ref={(el) => {
              letterRefs.current[idx] = el;
            }}
            className="inline-block shrink-0 will-change-[font-weight,color]"
            style={style}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}
