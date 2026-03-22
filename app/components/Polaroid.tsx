"use client";

import { useMemo, type ReactNode, type RefObject } from "react";
import { motion } from "framer-motion";

type MotionDragConstraints =
  | false
  | Partial<{ left: number; right: number; top: number; bottom: number }>
  | RefObject<Element | null>;

type PolaroidProps = {
  imageSrc: string;
  imageAlt?: string;
  caption: ReactNode;
  className?: string;
  /** Degrees; omit for a small random tilt */
  rotation?: number;
  compact?: boolean;
  whileDragZIndex?: number;
  dragConstraints?: MotionDragConstraints;
  /** When false, render a static card (no drag). Default true. */
  draggable?: boolean;
};

const figureClass = (compact: boolean, className: string) =>
  `select-none rounded-[2px] border-2 border-zinc-400 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] ${
    compact
      ? "w-[210px] p-2.5 pb-3 sm:w-[220px]"
      : "w-[250px] p-3 pb-4 sm:w-[270px] sm:p-3.5 sm:pb-5"
  } ${className}`;

export default function Polaroid({
  imageSrc,
  imageAlt = "",
  caption,
  className = "",
  rotation,
  compact = false,
  whileDragZIndex = 40,
  dragConstraints,
  draggable = true,
}: PolaroidProps) {
  const initialRotation = useMemo(
    () => (rotation !== undefined ? rotation : Math.random() * 8 - 4),
    [rotation],
  );

  const inner = (
    <>
      <div className="aspect-square overflow-hidden border-2 border-zinc-950 bg-zinc-100 mx-2 my-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover scale-95"
          draggable={false}
        />
      </div>

      <figcaption
        className={`px-1 text-center font-medium leading-snug tracking-wide text-zinc-800 ${
          compact
            ? "pt-2 text-[0.7rem] sm:pt-2.5 sm:text-[0.78rem]"
            : "pt-3 text-[0.8125rem] sm:pt-4 sm:text-[0.9375rem]"
        }`}
        style={{ fontFamily: "var(--font-heading), serif" }}
      >
        {caption}
      </figcaption>
    </>
  );

  if (!draggable) {
    return <figure className={figureClass(compact, className)}>{inner}</figure>;
  }

  return (
    <motion.figure
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragElastic={0.06}
      initial={{ rotate: initialRotation, scale: 0.98, opacity: 1 }}
      animate={{ rotate: initialRotation, scale: 1, opacity: 1 }}
      whileDrag={{ scale: 1.02, zIndex: 100, cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className={`cursor-grab ${figureClass(compact, className)}`}
    >
      {inner}
    </motion.figure>
  );
}
