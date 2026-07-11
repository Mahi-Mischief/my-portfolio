"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gamepad2, LayoutGrid, Trophy, Code, Microscope, Calendar, CheckSquare, X } from "lucide-react";

export type CaseStudyId = "specialty-appliances" | "digital-pulse" | "tobi" | "nexora" | "unity";

interface StackedBentoCardsProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onOpenCaseStudy?: () => void;
  onOpenTobiModal?: () => void;
  onOpenBlindSpotModal?: () => void;
}

function DescriptionModal({ isOpen, onClose, title, description }: { isOpen: boolean; onClose: () => void; title: string; description: string }) {
  if (!isOpen) return null;

  const blocks = description
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const renderBlock = (block: string, index: number) => {
    const headingMatch = block.match(/^\*\*(.+)\*\*$/);

    if (headingMatch) {
      return (
        <h4 key={index} className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
          {headingMatch[1]}
        </h4>
      );
    }

    return (
      <p key={index} className="text-sm leading-relaxed text-zinc-600 whitespace-pre-wrap">
        {block}
      </p>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 flex max-h-[85vh] w-full max-w-lg flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="mb-4 shrink-0 pr-8 text-lg font-semibold text-zinc-900">{title}</h3>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto text-sm leading-relaxed text-zinc-600 pr-1">
          {blocks.map(renderBlock)}
        </div>
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
  "specialty-appliances": {
    num: "01",
    clientMono: "Data Science & Operations Intern",
    wireLabel: "OPERATIONS INTELLIGENCE",
    tech: "METABASE | DATABRICKS | PYSPARK | SQL",
    accentIcon: "grid",
    imageSrc: "/assets/sabanner.png",
    description: "**Business Intelligence Optimization**\n\nOverhauled and designed centralized Metabase dashboards deployed across the lab to give leadership and teams real-time visibility into daily performance, quality metrics, and delivery trends. The system has since scaled to two dedicated lab displays that continuously stream these live operational insights. To further support the facility's data ecosystem, I am actively building additional production tables to expand tracking indicators, drive real-time quality control, and streamline manufacturing workflows.\n\n**AI-Driven Operational Intelligence (Databricks Genie)**\n\nEngineered automated data infrastructure pipelines within Databricks using PySpark and SQL to clean, flatten, and process large-scale, unstructured JSON customer call transcripts. Using this structured foundation, I developed and integrated an NLP and sentiment analysis AI model, the Databricks Genie, to extract actionable tracking metrics from customer touchpoints. The model now automates the generation of massive, comprehensive operational reports, turning raw text data into high-impact strategies for workplace efficiency."
  },
  "digital-pulse": {
    num: "02",
    clientMono: "Digital Pulse (GT CEISMC Module)",
    wireLabel: "HEART RATE LEARNING MODULE",
    tech: "PYTHON | OPENCV | FFT | GOOGLE COLAB",
    accentIcon: "grid",
    imageSrc: "/assets/digitalpulse.png",
    description: "**Digital Pulse**\n\nDeveloped a computer vision learning module based on Georgia Tech research to extract heart rates from fingertip videos. Engineered student and instructor Jupyter notebooks to teach STEM concepts through GT's CEISMC outreach program. The module runs in Google Colab and uses Fast Fourier Transform techniques to convert fingertip video signals into a readable heart rate workflow for classroom instruction.\n\n**Teaching Focus**\n\nDesigned the experience for roughly 30 students at a time so the lesson stays approachable in a live classroom setting. The structure blends hands-on notebook exploration, computer vision concepts, and signal processing fundamentals into a guided educational demo."
  },
  tobi: {
    num: "03",
    clientMono: "App: Tobi-To-Do (STUDENT DASHBOARD)",
    wireLabel: "STUDENT PLANNER UI",
    tech: "FLUTTER | BYCRYPT | POSTGRESQL",
    accentIcon: "calendar",
    imageSrc: "/assets/tobitododisplay.png",
    description: "Imagine having a personal assistant that helps you organize your life, stay focused, and constantly move closer to the person you want to become. Tobi To-Do is an AI-powered productivity platform designed specifically for ambitious students who want more than just a basic to-do list. Instead of simply storing tasks, Tobi actively helps you plan your schedule, break down complex goals, track habits, and maintain focus through built-in deep-work tools. At the center of the app is Tobi, an intelligent assistant that analyzes your workload, detects procrastination patterns, and suggests better ways to manage your time. The app also introduces a unique feature called Dream Me, where users define the future version of themselves and track how closely their daily actions align with that vision. Tobi To-Do combines planning, execution, analytics, and motivation in one place—integrating calendars, task systems, focus tracking, AI insights, and gamification to keep users engaged and consistent. Instead of just telling you what you need to do, Tobi helps you become the person capable of achieving it."
  },
  nexora: {
    num: "04",
    clientMono: "App: Nexora (AI AGENT APP FOR FBLA)",
    wireLabel: "AI AGENT APP",
    tech: "FLUTTER | EXPRESS JS | SQL",
    accentIcon: "trophy",
    fbla: { line1: "FBLA", line2: "FBLA State Win" },
    imageSrc: "/assets/nexora banner.png",
    description: "An innovative AI agent application developed for the FBLA competition. Features intelligent task automation, natural language processing, and user-friendly interface built with Flutter and Express.js."
  },
  unity: {
    num: "05",
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

function BentoFace({ id, onOpenCaseStudy, onOpenDescription, onOpenTobiModal, onOpenBlindSpotModal }: { 
  id: CaseStudyId; 
  onOpenCaseStudy?: () => void;
  onOpenDescription: (id: CaseStudyId) => void;
  onOpenTobiModal?: () => void;
  onOpenBlindSpotModal?: () => void;
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
            if (id === "specialty-appliances" && onOpenDescription) {
              onOpenDescription(id);
              return;
            }
            if (id === "digital-pulse" && onOpenDescription) {
              onOpenDescription(id);
              return;
            }
            if (id === "nexora" && onOpenCaseStudy) {
              onOpenCaseStudy();
            } else if (id === "tobi" && onOpenTobiModal) {
              onOpenTobiModal();
            } else if (id === "unity" && onOpenBlindSpotModal) {
              onOpenBlindSpotModal();
            }
          }}
        >
          {id === "specialty-appliances"
            ? "Explore Internship"
            : id === "digital-pulse"
              ? "Explore Digital Pulse"
            : id === "nexora"
              ? "Explore Nexora"
              : id === "tobi"
                ? `Explore ${CASES[id].clientMono.split(' ')[1]}`
                : id === "unity"
                  ? "Explore Blind Spot"
                  : "READ CASE STUDY"}
        </button>
      </div>
    </div>
  );
}

export default function StackedBentoCards({ activeIndex, setActiveIndex, onOpenCaseStudy, onOpenTobiModal, onOpenBlindSpotModal }: StackedBentoCardsProps) {
  const allCases: CaseStudyId[] = ["specialty-appliances", "digital-pulse", "tobi", "nexora", "unity"];
  
  const [stack, setStack] = useState<CaseStudyId[]>(["specialty-appliances", "digital-pulse", "tobi", "nexora", "unity"]);
  const [descriptionModal, setDescriptionModal] = useState<{ isOpen: boolean; projectId: CaseStudyId | null }>({
    isOpen: false,
    projectId: null
  });

  // Sync stack with activeIndex
  useEffect(() => {
    const activeCase = allCases[activeIndex];
    if (activeCase && stack[stack.length - 1] !== activeCase) {
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setStack((prev) => {
          const rest = prev.filter((x) => x !== activeCase);
          return [...rest, activeCase];
        });
      }, 0);
    }
  }, [activeIndex, stack]);

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
                onOpenTobiModal={onOpenTobiModal}
                onOpenBlindSpotModal={onOpenBlindSpotModal}
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
