"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectNavigationProps {
  currentIndex: number;
  totalCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ProjectNavigation({
  currentIndex,
  totalCount,
  onPrevious,
  onNext,
}: ProjectNavigationProps) {
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalCount - 1;

  return (
    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-20">
      {/* Left Arrow */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`
          pointer-events-auto ml-4 rounded-full border border-zinc-200 bg-white/95 p-3 shadow-sm backdrop-blur-sm
          transition-all duration-200
          ${canGoPrevious 
            ? 'hover:bg-zinc-900 hover:text-white hover:border-zinc-900 cursor-pointer' 
            : 'opacity-30 cursor-not-allowed text-zinc-400'
          }
        `}
        aria-label="Previous project"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className={`
          pointer-events-auto mr-4 rounded-full border border-zinc-200 bg-white/95 p-3 shadow-sm backdrop-blur-sm
          transition-all duration-200
          ${canGoNext 
            ? 'hover:bg-zinc-900 hover:text-white hover:border-zinc-900 cursor-pointer' 
            : 'opacity-30 cursor-not-allowed text-zinc-400'
          }
        `}
        aria-label="Next project"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>
    </div>
  );
}
