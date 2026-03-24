"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GlassDock from "../components/GlassDock";
import HobbyistWorkbench from "../components/HobbyistWorkbench";
import MouseGlowLayer from "../components/MouseGlowLayer";
import StackedBentoCards from "../components/StackedBentoCards";
import ProjectNavigation from "../components/ProjectNavigation";
import NexoraCaseStudy from "../components/NexoraCaseStudy";
import FocusModal from "../components/FocusModal";
import { Siren } from "lucide-react";

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const [glow, setGlow] = useState({ x: 50, y: 38 });
  const [activeIndex, setActiveIndex] = useState(0); // Default to tobi (index 0)
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [isTobiModalOpen, setIsTobiModalOpen] = useState(false);
  const [isBlindSpotModalOpen, setIsBlindSpotModalOpen] = useState(false);

  // Handle URL parameter for project selection
  useEffect(() => {
    const projectParam = searchParams.get('project');
    console.log('Project parameter from URL:', projectParam);
    if (projectParam !== null) {
      const projectIndex = parseInt(projectParam, 10);
      console.log('Parsed project index:', projectIndex);
      if (!isNaN(projectIndex) && projectIndex >= 0 && projectIndex <= 2) {
        console.log('Setting active index to:', projectIndex);
        // Use setTimeout to avoid synchronous setState in effect
        setTimeout(() => setActiveIndex(projectIndex), 0);
      }
    }
  }, [searchParams]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
  }, []);

  const handlePreviousProject = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextProject = useCallback(() => {
    setActiveIndex((prev) => Math.min(2, prev + 1)); // 3 projects total (0, 1, 2)
  }, []);

  const handleProjectSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleOpenCaseStudy = useCallback(() => {
    setIsCaseStudyOpen(true);
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setIsCaseStudyOpen(false);
  }, []);

  const handleOpenTobiModal = useCallback(() => {
    setIsTobiModalOpen(true);
  }, []);

  const handleCloseTobiModal = useCallback(() => {
    setIsTobiModalOpen(false);
  }, []);

  const handleOpenBlindSpotModal = useCallback(() => {
    setIsBlindSpotModalOpen(true);
  }, []);

  const handleCloseBlindSpotModal = useCallback(() => {
    setIsBlindSpotModalOpen(false);
  }, []);

  // Keyboard navigation for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCaseStudyOpen) return; // Don't navigate when modal is open
      
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePreviousProject();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextProject();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlePreviousProject, handleNextProject, isCaseStudyOpen]);

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
        <div className="text-center mb-4">
          <p className="font-mono-jet text-[10px] text-zinc-500">
            Use ← → arrow keys to navigate
          </p>
        </div>
        <div className="relative">
          <StackedBentoCards 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex}
            onOpenCaseStudy={handleOpenCaseStudy}
            onOpenTobiModal={handleOpenTobiModal}
            onOpenBlindSpotModal={handleOpenBlindSpotModal}
          />
          <ProjectNavigation
            currentIndex={activeIndex}
            totalCount={3}
            onPrevious={handlePreviousProject}
            onNext={handleNextProject}
          />
        </div>
      </div>

      {/* Tier 2 — hobbyist workbench */}
      <HobbyistWorkbench onProjectSelect={handleProjectSelect} />

      <NexoraCaseStudy isOpen={isCaseStudyOpen} onClose={handleCloseCaseStudy} />

      {/* Tobi Focus Modal */}
      {isTobiModalOpen && (
        <FocusModal
          isOpen={isTobiModalOpen}
          onClose={handleCloseTobiModal}
          item={{
            id: 'tobi-todo',
            title: 'Tobi-To-Do',
            type: 'polaroid',
            description: 'AI-powered student productivity platform with intelligent planning and focus tracking.',
            technicalDetails: [
              'TECH: Next.js, React, TypeScript, TailwindCSS',
              'AI: Natural Language Processing, Task Analysis',
              'FEATURES: Smart Scheduling, Habit Tracking, Focus Tools',
              'IMPACT: Student Productivity Enhancement Platform'
            ],
            images: ['/assets/polaroid-tobi-todo.png'],
            googleDocId: 'canva.com/design/DAHE21oQC8g/qBMKefYlOOSBB-y5fw7LAQ/view?embed'
          }}
        />
      )}

      {/* Blind Spot Focus Modal */}
      {isBlindSpotModalOpen && (
        <FocusModal
          isOpen={isBlindSpotModalOpen}
          onClose={handleCloseBlindSpotModal}
          item={{
            id: 'blind-spot',
            title: 'Blind Spot',
            type: 'polaroid',
            description: 'A 3D immersive Unity game experience.',
            technicalDetails: [
              'TECH: Unity 3D, C# Programming',
              'ENGINE: Unity Physics, Lighting Systems',
              'GAMEPLAY: 3D Environment Design, Player Mechanics',
              'EXPERIENCE: Immersive Audio-Visual Design'
            ],
            images: ['/assets/unity-game.png'],
            googleDocId: 'canva.com/design/DAHE2xrOmi8/ugP5hVTTgiyi7zkv6BIjHg/view?embed'
          }}
        />
      )}

      <GlassDock active="projects" />
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-zinc-500">Loading projects...</div>
      </div>
    }>
      <ProjectsPageContent />
    </Suspense>
  );
}
