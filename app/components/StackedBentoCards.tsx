"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gamepad2, LayoutGrid, Trophy, Code, Microscope } from "lucide-react";

export type CaseStudyId = "tobi" | "nexora" | "unity";

interface StackedBentoCardsProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onOpenCaseStudy?: () => void;
}

const CASES: Record<
  CaseStudyId,
  {
    num: string;
    clientMono: string;
    wireLabel: string;
    tech: string;
    accentIcon: "trophy" | "grid" | "gamepad";
    fbla?: { line1: string; line2: string };
    imageSrc: string;
  }
> = {
  tobi: {
    num: "01",
    clientMono: "Client Tobi-To-Do (STUDENT PLANNER)",
    wireLabel: "STUDENT PLANNER UI",
    tech: "NEXT.JS | OPEN AI | PRISMA",
    accentIcon: "grid",
    imageSrc: "/assets/tobi-todo.png",
  },
  nexora: {
    num: "02",
    clientMono: "Client Nexora (AI AGENT APP)",
    wireLabel: "AI AGENT APP",
    tech: "FLUTTER | EXPRESS JS | SQL",
    accentIcon: "trophy",
    fbla: { line1: "FBLA", line2: "FBLA State Win" },
    imageSrc: "/assets/nexora.png",
  },
  unity: {
    num: "03",
    clientMono: "Unity Game Mechanics (IMMERSIVE WORLDS)",
    wireLabel: "GAME MECHANICS",
    tech: "C# | UNITY | BLENDER",
    accentIcon: "gamepad",
    imageSrc: "/assets/unity.png",
  },
};

function AccentIcon({ type }: { type: "trophy" | "grid" | "gamepad" }) {
  if (type === "trophy") {
    return <Trophy className="h-14 w-14 text-amber-500 drop-shadow-sm" strokeWidth={1.35} />;
  }
  if (type === "grid") {
    return <LayoutGrid className="h-14 w-14 text-indigo-500/90" strokeWidth={1.35} />;
  }
  return <Gamepad2 className="h-14 w-14 text-emerald-600/90" strokeWidth={1.35} />;
}

function BentoFace({ id, onOpenCaseStudy }: { id: CaseStudyId; onOpenCaseStudy?: () => void }) {
  const c = CASES[id];

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.14)] sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <span
          className="text-6xl font-semibold leading-none tracking-tight text-zinc-900 sm:text-7xl"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          {c.num}
        </span>
        <p className="max-w-[min(100%,28rem)] text-right font-mono-jet text-[10px] font-medium uppercase leading-snug tracking-wide text-zinc-600 sm:text-xs">
          {c.clientMono}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_min(28vw,9.5rem)] sm:items-stretch">
        <div className="relative flex min-h-[11rem] items-center justify-center overflow-hidden rounded-xl border border-zinc-300 bg-gradient-to-br from-zinc-200 to-zinc-300/90 sm:min-h-[13rem]">
          <img 
            src={c.imageSrc} 
            alt={`${c.wireLabel} preview`}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            style={{ opacity: 0.7 }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(63 63 70 / 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(63 63 70 / 0.12) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute inset-5 rounded-lg border border-dashed border-zinc-500/35" />
          <p className="relative z-[1] font-mono-jet text-xs font-medium uppercase tracking-[0.2em] text-zinc-600 sm:text-sm">
            {c.wireLabel}
          </p>
        </div>

        <div className="flex aspect-square w-full max-w-[9.5rem] shrink-0 items-center justify-center justify-self-center rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-100 shadow-inner sm:max-w-none sm:justify-self-end">
          <AccentIcon type={c.accentIcon} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 items-center gap-4 lg:grid-cols-3">
        <div className="font-mono-jet w-fit justify-self-start rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-zinc-700 sm:text-[10px]">
          {c.tech}
        </div>

        <button
          type="button"
          className="justify-self-center rounded-md border-2 border-zinc-900 bg-white px-5 py-2.5 font-mono-jet text-[10px] font-bold uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            if (id === "nexora" && onOpenCaseStudy) {
              onOpenCaseStudy();
            }
          }}
        >
          READ CASE STUDY
        </button>

        {c.fbla ? (
          <div className="justify-self-end rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-center shadow-sm lg:min-w-[8.5rem]">
            <p className="font-mono-jet text-[10px] font-bold uppercase tracking-widest text-zinc-800">
              {c.fbla.line1}
            </p>
            <p className="mt-1 font-mono-jet text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
              {c.fbla.line2}
            </p>
          </div>
        ) : (
          <div className="hidden justify-self-end rounded-xl border border-dashed border-zinc-200 bg-zinc-50/60 px-4 py-3 text-center lg:block lg:min-w-[7.5rem]">
            <p className="font-mono-jet text-[9px] font-semibold uppercase tracking-wide text-zinc-400">
              Case file
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StackedBentoCards({ activeIndex, setActiveIndex, onOpenCaseStudy }: StackedBentoCardsProps) {
  const allCases: CaseStudyId[] = ["tobi", "nexora", "unity"];
  
  const [stack, setStack] = useState<CaseStudyId[]>(["tobi", "nexora", "unity"]);

  // Sync stack with activeIndex
  useEffect(() => {
    const activeCase = allCases[activeIndex];
    if (activeCase && stack[stack.length - 1] !== activeCase) {
      setStack((prev) => {
        const rest = prev.filter((x) => x !== activeCase);
        return [...rest, activeCase];
      });
    }
  }, [activeIndex]);

  const bringToFront = (id: CaseStudyId) => {
    const index = allCases.indexOf(id);
    setActiveIndex(index);
    setStack((prev) => {
      const rest = prev.filter((x) => x !== id);
      return [...rest, id];
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-3 sm:px-4">
      <div className="relative h-[min(520px,118vw)] sm:h-[480px] flex items-center justify-center">
        {allCases.map((id, i) => {
          const isActive = i === activeIndex;
          const position = i - activeIndex;
          
          // Calculate positions for carousel effect
          let x = 0;
          let scale = 1;
          let rotate = 0;
          let zIndex = 10;
          
          if (position === 0) {
            // Center card (active)
            scale = 1;
            zIndex = 30;
          } else if (position === -1) {
            // Left card
            x = -320;
            scale = 0.85;
            rotate = -5;
            zIndex = 20;
          } else if (position === 1) {
            // Right card
            x = 320;
            scale = 0.85;
            rotate = 5;
            zIndex = 20;
          } else {
            // Cards further away
            x = position > 1 ? 400 : -400;
            scale = 0.7;
            rotate = position > 1 ? 8 : -8;
            zIndex = 10;
          }

          return (
            <motion.div
              key={id}
              className="absolute w-full max-w-3xl cursor-pointer"
              style={{ zIndex, transformOrigin: "center" }}
              animate={{
                x,
                scale,
                rotate,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => setActiveIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(i);
                }
              }}
            >
              <BentoFace id={id} onOpenCaseStudy={onOpenCaseStudy} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
