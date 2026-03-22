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
  mario: "/assets/sprite-mario.svg",
  pieceI: "/assets/sprite-tetris-i.svg",
  pieceL: "/assets/sprite-tetris-l.svg",
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
          <div className="pointer-events-auto absolute right-[9%] top-[2%] sm:right-[13%]">
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
          <div className="pointer-events-auto absolute right-[2%] bottom-[8%] sm:right-[12%] sm:bottom-[12%]">
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
          <div className="pointer-events-auto absolute left-[38%] top-[28%] sm:left-[42%] sm:top-[26%]">
            <StickyNote variant="amber" rotation={-2.2} handwritten>
              Working on physics logic research for Tetris clone
            </StickyNote>
          </div>

          <div className="pointer-events-auto absolute left-[12%] bottom-[6%] sm:left-[18%]">
            <DraggableSprite rotation={-6} className="drop-shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={WB.mario}
                alt="Super Mario rebuild sprite"
                className="h-28 w-auto sm:h-32"
                draggable={false}
              />
            </DraggableSprite>
          </div>
          <div className="pointer-events-auto absolute right-[22%] top-[38%] sm:right-[26%]">
            <DraggableSprite rotation={8} className="drop-shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={WB.pieceI} alt="Tetris I-piece blocks" className="h-36 w-auto" draggable={false} />
            </DraggableSprite>
          </div>
          <div className="pointer-events-auto absolute right-[8%] top-[48%] sm:right-[12%]">
            <DraggableSprite rotation={-5} className="drop-shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={WB.pieceL}
                alt="Tetris L-piece blocks"
                className="h-16 w-auto sm:h-[4.5rem]"
                draggable={false}
              />
            </DraggableSprite>
          </div>
        </div>
      </div>
    </section>
  );
}
