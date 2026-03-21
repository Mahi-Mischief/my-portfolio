"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FileText, FolderOpen, Github, Linkedin, Mail } from "lucide-react";
import HeroGlowingTitle from "./components/HeroGlowingTitle";
import MouseGlowLayer from "./components/MouseGlowLayer";
import Polaroid from "./components/Polaroid";
import StickyNote from "./components/StickyNote";
import StatusBadge from "./components/StatusBadge";

/**
 * Home — default layout matches reference screenshot (viewport %, origin = card center).
 */

const ASSETS = {
  nexora: "/assets/polaroid-nexora.png",
  tobiTodo: "/assets/polaroid-tobi-todo.png",
  unity: "/assets/polaroid-immersive-worlds.svg",
  portrait: "/assets/polaroid-headshot.png",
} as const;

const HALO_SCALE = 0.7;

/**
 * Layout from reference (0–100 = viewport). `left` / `top` = anchor at card center.
 * Rotations: CSS deg (clockwise +, counter-clockwise −), per screenshot notes.
 */
const LAYOUT = {
  /** Nudged down so full polaroid stays in frame */
  nexora: { left: 25, top: 22, rotate: 5 },
  portrait: { left: 50, top: 17, rotate: 0 },
  tobi: { left: 78, top: 20, rotate: -8 },
  unity: { left: 15, top: 60, rotate: -5 },
  fbla: { left: 80, top: 65, rotate: 0 },
  gt: { left: 45, top: 80, rotate: -3 },
} as const;

function slotStyle(leftPct: number, topPct: number) {
  return {
    position: "absolute" as const,
    left: `${leftPct}%`,
    top: `${topPct}%`,
    transform: `translate(-50%, -50%) scale(${HALO_SCALE})`,
    transformOrigin: "center center",
  };
}

function DockItem({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const className =
    "flex min-w-[52px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-zinc-700 transition hover:bg-white/50 hover:text-zinc-900 sm:min-w-[60px] sm:px-3 sm:py-2";

  const labelEl = (
    <span className="font-mono-jet text-[8px] font-bold uppercase tracking-wide text-zinc-600 sm:text-[9px]">
      {label}
    </span>
  );

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {labelEl}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      {labelEl}
    </Link>
  );
}

export default function Home() {
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [pointer, setPointer] = useState({ cx: 0, cy: 0 });

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setPointer({ cx: w / 2, cy: h / 2 });
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    setGlow({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    });
    setPointer({ cx: clientX, cy: clientY });
  }, []);

  return (
    <main
      onPointerMove={onPointerMove}
      className="relative isolate h-dvh w-full overflow-hidden bg-[#fafaf9]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgb(24 24 27 / 0.17) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      <MouseGlowLayer glow={glow} subtle className="z-[1]" />

      <div className="pointer-events-none absolute left-4 top-4 z-[30] sm:left-6 sm:top-6">
        <StatusBadge />
      </div>

      {/* Default positions = reference screenshot (% of main); drag anywhere */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.nexora.left, LAYOUT.nexora.top)}
        >
          <Polaroid
            dragConstraints={false}
            imageSrc={ASSETS.nexora}
            imageAlt="Nexora"
            rotation={LAYOUT.nexora.rotate}
            caption={
              <>
                Nexora <span className="text-zinc-600">5th Place FBLA State 🏆</span>
              </>
            }
          />
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.portrait.left, LAYOUT.portrait.top)}
        >
          <Polaroid
            dragConstraints={false}
            imageSrc={ASSETS.portrait}
            imageAlt="Portrait"
            rotation={LAYOUT.portrait.rotate}
            caption="Portrait"
          />
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.tobi.left, LAYOUT.tobi.top)}
        >
          <Polaroid
            dragConstraints={false}
            imageSrc={ASSETS.tobiTodo}
            imageAlt="Tobi-To-Do"
            rotation={LAYOUT.tobi.rotate}
            caption={
              <>
                Tobi-To-Do <span className="text-zinc-600">App+ AI Student Planner</span>
              </>
            }
          />
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.unity.left, LAYOUT.unity.top)}
        >
          <Polaroid
            dragConstraints={false}
            imageSrc={ASSETS.unity}
            imageAlt="Unity Game"
            rotation={LAYOUT.unity.rotate}
            caption="Unity Game"
          />
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.fbla.left, LAYOUT.fbla.top)}
        >
          <StickyNote variant="sky" dragConstraints={false} rotation={LAYOUT.fbla.rotate}>
            <p>
              <strong>FBLA Win</strong>
              <span className="text-sky-900/85"> — State placement &amp; recognition 🏆</span>
            </p>
          </StickyNote>
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.gt.left, LAYOUT.gt.top)}
        >
          <StickyNote variant="amber" dragConstraints={false} rotation={LAYOUT.gt.rotate}>
            <p>
              <strong>GT Module</strong>
              <span className="text-amber-950/85"> — advanced coursework &amp; build 🏗️</span>
            </p>
          </StickyNote>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <HeroGlowingTitle
          clientX={pointer.cx}
          clientY={pointer.cy}
          className="max-w-[min(100%,18ch)] text-balance text-[clamp(1.75rem,6vw,80px)]"
        />
        <p className="font-mono-jet mt-5 max-w-2xl text-[10px] leading-relaxed text-zinc-600 sm:mt-6 sm:text-xs md:text-sm">
          [SYSTEM: ACTIVE] // Georgia Tech &apos;28 // AI + 3D Artist
        </p>
      </div>

      <nav
        className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-stretch gap-0.5 rounded-[1.25rem] border border-white/50 bg-white/30 px-1.5 py-2 shadow-[0_12px_40px_rgb(0_0_0_/_0.14)] backdrop-blur-2xl backdrop-saturate-150 sm:bottom-6 sm:gap-1 sm:rounded-2xl sm:px-2 sm:py-2.5"
        aria-label="Primary navigation"
      >
        <DockItem href="/projects" label="Projects">
          <FolderOpen className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
        </DockItem>
        <DockItem href="#resume" label="Resume">
          <FileText className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
        </DockItem>
        <DockItem href="https://github.com" label="GitHub">
          <Github className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
        </DockItem>
        <DockItem href="https://linkedin.com" label="LinkedIn">
          <Linkedin className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
        </DockItem>
        <DockItem href="mailto:hello@example.com" label="Hire Me">
          <Mail className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
        </DockItem>
      </nav>
    </main>
  );
}
