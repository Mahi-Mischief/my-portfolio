"use client";

import { useCallback } from "react";
import Polaroid from "./Polaroid";
import StickyNote from "./StickyNote";
import DraggableSprite from "./DraggableSprite";

interface HobbyistWorkbenchProps {
  onProjectSelect?: (index: number) => void;
}

const WB = {
  tetris: "/assets/workbench-tetris.svg",
  canva: "/assets/workbench-canva.svg",
  gt: "/assets/workbench-gt-chart.svg",
  blender: "/assets/workbench-blender.svg",
} as const;

export default function HobbyistWorkbench({ onProjectSelect }: HobbyistWorkbenchProps) {
  const handlePolaroidClick = useCallback((projectIndex: number) => {
    if (onProjectSelect) {
      onProjectSelect(projectIndex);
    }
  }, [onProjectSelect]);

  return (
    <section className="relative z-[12] mx-auto mt-4 w-full max-w-6xl px-3 pb-32 pt-6 sm:px-4 sm:pb-36">
      <h2
        className="mb-8 text-center text-2xl font-semibold tracking-tight text-zinc-900 sm:mb-10 sm:text-3xl"
        style={{ fontFamily: "var(--font-heading), serif" }}
      >
        The Hobbyist workbench
      </h2>

      <div className="relative min-h-[min(520px,70vh)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto absolute left-[0%] top-[4%] sm:left-[2%]">
            <div 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => handlePolaroidClick(0)} // Unity project
            >
              <Polaroid
                compact
                imageSrc={WB.tetris}
                imageAlt="Tetris clone"
                rotation={-4.2}
                caption="Tetris Clone"
              />
            </div>
          </div>
          <div className="pointer-events-auto absolute right-[10%] top-[2%] sm:right-[16%]">
            <div 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => handlePolaroidClick(2)} // Nexora project
            >
              <Polaroid
                compact
                imageSrc={WB.canva}
                imageAlt="Canva graphic design"
                rotation={3.6}
                caption="Canva Graphic Design"
              />
            </div>
          </div>
          <div className="pointer-events-auto absolute bottom-[6%] left-[21%] sm:bottom-[10%]">
            <div 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => handlePolaroidClick(1)} // Tobi project
            >
              <Polaroid
                compact
                imageSrc={WB.gt}
                imageAlt="GT CEISMC chart"
                rotation={5.1}
                caption="GT Module Chart"
              />
            </div>
          </div>
          <div className="pointer-events-auto absolute right-[10%] bottom-[8%] sm:right-[10%] sm:bottom-[12%]">
            <div 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => handlePolaroidClick(0)} // Unity project
            >
              <Polaroid
                compact
                imageSrc={WB.blender}
                imageAlt="Blender asset creation"
                rotation={-3.4}
                caption="Blender asset creation"
              />
            </div>
          </div>
          <div className="pointer-events-auto absolute left-[37%] top-[26%] sm:left-[42%] sm:top-[26%]">
            <StickyNote variant="amber" rotation={-2.2} handwritten>
              Working on physics logic research for Tetris clone
            </StickyNote>
          </div>

                  </div>
      </div>
    </section>
  );
}
