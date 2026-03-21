"use client";

import { useCallback, useState } from "react";
import { Siren } from "lucide-react";
import GlassDock from "../components/GlassDock";
import HobbyistWorkbench from "../components/HobbyistWorkbench";
import MouseGlowLayer from "../components/MouseGlowLayer";
import StackedBentoCards from "../components/StackedBentoCards";

export default function ProjectsPage() {
  const [glow, setGlow] = useState({ x: 50, y: 38 });

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
  }, []);

  return (
    <main
      onPointerMove={onPointerMove}
      className="relative isolate min-h-dvh w-full overflow-x-hidden bg-dot-grid-30 pb-8"
    >
      <MouseGlowLayer glow={glow} subtle={false} />

      {/* Top-left: archive logo + system row + internship sticker */}
      <div className="pointer-events-none absolute left-4 top-4 z-[25] flex flex-col gap-2.5 sm:left-6 sm:top-6">
        <p className="font-mono-jet max-w-[16rem] text-[9px] font-semibold uppercase leading-snug tracking-[0.12em] text-zinc-700 sm:text-[10px]">
          MAHI / NEXORA PROJECT ARCHIVE
        </p>

        <div className="pointer-events-auto flex w-fit items-center gap-2 rounded-md border border-zinc-200/90 bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
          <span
            className="relative flex h-3 w-3 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7),inset_0_1px_0_rgba(255,255,255,0.4)]"
            aria-hidden
          >
            <span className="absolute left-0.5 top-0.5 h-1 w-1 rounded-full bg-white/90" />
          </span>
          <span className="font-mono-jet text-[9px] font-bold uppercase tracking-wide text-zinc-800 sm:text-[10px]">
            SYSTEM: ACTIVE
          </span>
        </div>

        <div className="pointer-events-auto flex w-fit max-w-[17rem] items-center gap-2 rounded-lg border border-emerald-200/80 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
          <Siren className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} aria-hidden />
          <span className="font-mono-jet text-[9px] font-semibold uppercase leading-snug tracking-wide text-zinc-800 sm:text-[10px]">
            Available for Summer Internships
          </span>
        </div>
      </div>

      {/* Hero */}
      <header className="relative z-[18] mx-auto max-w-5xl px-4 pb-4 pt-28 text-center sm:pt-32">
        <h1 className="text-balance text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl md:text-7xl lg:text-8xl">
          MAHI DESHPANDE
        </h1>
        <p className="font-mono-jet mx-auto mt-5 max-w-2xl text-[10px] leading-relaxed text-zinc-600 sm:mt-6 sm:text-xs md:text-sm">
          PROJECT ARCHIVE // Full Stack Engineer // AI // Art &amp; Craft
        </p>
      </header>

      {/* Tier 1 — stacked bento case studies */}
      <div className="relative z-[15] mx-auto mt-2 w-full max-w-5xl px-2 sm:mt-4">
        <StackedBentoCards />
      </div>

      {/* Tier 2 — hobbyist workbench */}
      <HobbyistWorkbench />

      <GlassDock active="projects" />
    </main>
  );
}
