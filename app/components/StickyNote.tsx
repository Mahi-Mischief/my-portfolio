"use client";

import { useMemo, type ReactNode, type RefObject } from "react";
import { motion } from "framer-motion";
import { GripHorizontal } from "lucide-react";

type MotionDragConstraints =
  | false
  | Partial<{ left: number; right: number; top: number; bottom: number }>
  | RefObject<Element | null>;

const variants = {
  amber:
    "border-amber-300/80 bg-amber-100 text-amber-950 shadow-[0_14px_36px_rgba(0,0,0,0.12)]",
  sky: "border-sky-300/70 bg-sky-100 text-sky-950 shadow-[0_14px_36px_rgba(0,0,0,0.1)]",
} as const;

type StickyVariant = keyof typeof variants;

type StickyNoteProps = {
  children?: ReactNode;
  className?: string;
  variant?: StickyVariant;
  rotation?: number;
  handwritten?: boolean;
  whileDragZIndex?: number;
  dragConstraints?: MotionDragConstraints;
  draggable?: boolean;
};

const shellClass = (variant: StickyVariant, className: string) =>
  `relative aspect-square w-[220px] select-none rounded-[3px] border p-4 text-sm leading-snug sm:w-[240px] sm:p-5 ${variants[variant]} ${className}`;

export default function StickyNote({
  children,
  className = "",
  variant = "amber",
  rotation,
  handwritten = false,
  whileDragZIndex = 40,
  dragConstraints,
  draggable = true,
}: StickyNoteProps) {
  const initialRotation = useMemo(
    () => (rotation !== undefined ? rotation : Math.random() * 10 - 5),
    [rotation],
  );

  const inner = (
    <>
      <div className="pointer-events-none absolute left-1/2 top-2 h-6 w-20 -translate-x-1/2 rounded-[2px] bg-white/60 shadow-sm sm:h-7 sm:w-24" />
      <GripHorizontal
        className="absolute right-2.5 top-2.5 text-black/35 sm:right-3 sm:top-3"
        size={14}
        strokeWidth={2.25}
        aria-hidden
      />

      <div
        className={`relative h-full w-full pt-5 ${handwritten ? "font-hand text-lg leading-snug sm:text-xl" : "font-sans"}`}
      >
        {children ?? "Jot down ideas..."}
      </div>
    </>
  );

  if (!draggable) {
    return <article className={shellClass(variant, className)}>{inner}</article>;
  }

  return (
    <motion.article
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragElastic={0.06}
      initial={{ rotate: initialRotation, scale: 0.98, opacity: 0 }}
      animate={{ rotate: initialRotation, scale: 1, opacity: 1 }}
      whileDrag={{ scale: 1.02, zIndex: whileDragZIndex, cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className={`cursor-grab ${shellClass(variant, className)}`}
    >
      {inner}
    </motion.article>
  );
}
