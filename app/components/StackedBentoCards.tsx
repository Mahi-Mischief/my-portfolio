"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gamepad2, LayoutGrid, Trophy, Code, Microscope, Calendar, CheckSquare, X } from "lucide-react";

export type CaseStudyId = "tobi" | "nexora" | "unity";

interface StackedBentoCardsProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onOpenCaseStudy?: () => void;
}

function DescriptionModal({ isOpen, onClose, title, description }: { isOpen: boolean; onClose: () => void; title: string; description: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="mb-4 text-lg font-semibold text-zinc-900">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-600">{description}</p>
      </div>
    </div>
  );
}

const CASES: Record<
  CaseStudyId,
  {
    num: string;
    clientMono: string;
    wireLabel: string;
    tech: string;
    accentIcon: "calendar" | "checksquare" | "trophy" | "grid" | "gamepad";
    fbla?: { line1: string; line2: string };
    imageSrc: string;
    description: string;
  }
> = {
  tobi: {
    num: "01",
    clientMono: "App: Tobi-To-Do (STUDENT DASHBOARD)",
    wireLabel: "STUDENT PLANNER UI",
    tech: "FLUTTER | BYCRYPT | POSTGRESQL",
    accentIcon: "calendar",
    imageSrc: "/assets/tobitododisplay.png",
    description: "A comprehensive student dashboard application built with Flutter, featuring task management, scheduling, and productivity tools. Includes secure authentication with bcrypt and PostgreSQL database integration."
  },
  nexora: {
    num: "02",
    clientMono: "App: Nexora (AI AGENT APP FOR FBLA)",
    wireLabel: "AI AGENT APP",
    tech: "FLUTTER | EXPRESS JS | SQL",
    accentIcon: "trophy",
    fbla: { line1: "FBLA", line2: "FBLA State Win" },
    imageSrc: "/assets/nexora banner.png",
    description: "An innovative AI agent application developed for the FBLA competition. Features intelligent task automation, natural language processing, and user-friendly interface built with Flutter and Express.js."
  },
  unity: {
    num: "03",
    clientMono: "Unity Game: Blind Spot (IMMERSIVE WORLD)",
    wireLabel: "GAME MECHANICS",
    tech: "C# | UNITY | BLENDER",
    accentIcon: "gamepad",
    imageSrc: "/assets/BLINDSPOTBANNER.png",
    description: "Immersive game mechanics and interactive worlds built with Unity and C#. Features complex physics systems, environmental storytelling, and 3D modeling with Blender integration."
  },
};

function AccentIcon({ type }: { type: "calendar" | "checksquare" | "trophy" | "grid" | "gamepad" }) {
  if (type === "calendar") {
    return <Calendar className="h-14 w-14 text-blue-500 drop-shadow-sm" strokeWidth={1.35} />;
  }
  if (type === "checksquare") {
    return <CheckSquare className="h-14 w-14 text-green-500 drop-shadow-sm" strokeWidth={1.35} />;
  }
  if (type === "trophy") {
    return <Trophy className="h-14 w-14 text-amber-500 drop-shadow-sm" strokeWidth={1.35} />;
  }
  if (type === "grid") {
    return <LayoutGrid className="h-14 w-14 text-indigo-500/90" strokeWidth={1.35} />;
  }
  return <Gamepad2 className="h-14 w-14 text-emerald-600/90" strokeWidth={1.35} />;
}

function BentoFace({ id, onOpenCaseStudy, onOpenDescription }: { 
  id: CaseStudyId; 
  onOpenCaseStudy?: () => void;
  onOpenDescription: (id: CaseStudyId) => void;
}) {
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
          />
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
            } else if (id === "tobi" || id === "unity") {
              // Tobi and Unity explore functionality can be added later
            }
          }}
        >
          {id === "nexora" ? "Explore Nexora" : id === "tobi" ? `Explore ${CASES[id].clientMono.split(' ')[1]}` : id === "unity" ? "Explore Blind Spot" : "READ CASE STUDY"}
        </button>

        <button
          type="button"
          className="justify-self-end rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-center shadow-sm lg:min-w-[8.5rem] hover:bg-zinc-100 transition"
          onClick={() => onOpenDescription(id)}
        >
          <p className="font-mono-jet text-[10px] font-bold uppercase tracking-widest text-zinc-800">
            View Description
          </p>
        </button>
      </div>
    </div>
  );
}

export default function StackedBentoCards({ activeIndex, setActiveIndex, onOpenCaseStudy }: StackedBentoCardsProps) {
  const allCases: CaseStudyId[] = ["tobi", "nexora", "unity"];
  
  const [stack, setStack] = useState<CaseStudyId[]>(["tobi", "nexora", "unity"]);
  const [descriptionModal, setDescriptionModal] = useState<{ isOpen: boolean; projectId: CaseStudyId | null }>({
    isOpen: false,
    projectId: null
  });

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

  const handleOpenDescription = (id: CaseStudyId) => {
    setDescriptionModal({ isOpen: true, projectId: id });
  };

  const handleCloseDescription = () => {
    setDescriptionModal({ isOpen: false, projectId: null });
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
              <BentoFace 
                id={id} 
                onOpenCaseStudy={onOpenCaseStudy}
                onOpenDescription={handleOpenDescription}
              />
            </motion.div>
          );
        })}
      </div>
      
      <DescriptionModal
        isOpen={descriptionModal.isOpen && descriptionModal.projectId !== null}
        onClose={handleCloseDescription}
        title={descriptionModal.projectId ? `${CASES[descriptionModal.projectId].clientMono}` : ""}
        description={descriptionModal.projectId ? CASES[descriptionModal.projectId].description : ""}
      />
    </div>
  );
}
