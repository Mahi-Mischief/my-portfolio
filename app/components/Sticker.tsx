"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type MotionDragConstraints =
  | false
  | Partial<{ left: number; right: number; top: number; bottom: number }>
  | React.RefObject<Element | null>;

type StickerProps = {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  whileDragZIndex?: number;
  dragConstraints?: MotionDragConstraints;
  draggable?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16", 
  lg: "w-20 h-20",
  xl: "w-14 h-14" // 15% bigger than sm (48px * 1.15 ≈ 55px, closest Tailwind class)
};

export default function Sticker({
  children,
  className = "",
  rotation,
  whileDragZIndex = 50,
  dragConstraints,
  draggable = true,
  size = "md"
}: StickerProps) {
  const initialRotation = useMemo(
    () => rotation !== undefined ? rotation : 0, // Remove Math.random() from render
    [rotation],
  );

  const stickerContent = (
    <div className={`
      relative flex items-center justify-center
      ${sizeClasses[size]}
      rounded
      bg-white/90
      shadow-sm
      border border-white/50
      ${className}
    `}>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );

  if (!draggable) {
    return (
      <div 
        style={{ transform: `rotate(${initialRotation}deg)` }}
        className="inline-block"
      >
        {stickerContent}
      </div>
    );
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragElastic={0.08}
      initial={{ rotate: initialRotation, scale: 0.9, opacity: 1 }}
      animate={{ rotate: initialRotation, scale: 1, opacity: 1 }}
      whileDrag={{ 
        scale: 1.1, 
        zIndex: whileDragZIndex, 
        cursor: "grabbing",
        rotate: initialRotation + 2
      }}
      whileHover={{
        scale: 1.05,
        rotate: initialRotation + 1,
        transition: { duration: 0.2 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="cursor-grab inline-block"
    >
      {stickerContent}
    </motion.div>
  );
}
