"use client";

import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";

type DraggableSpriteProps = {
  children: ReactNode;
  className?: string;
  rotation?: number;
};

export default function DraggableSprite({
  children,
  className = "",
  rotation,
}: DraggableSpriteProps) {
  const initialRotation = useMemo(
    () => rotation !== undefined ? rotation : 0, // Remove Math.random() from render
    [rotation],
  );

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ rotate: initialRotation, scale: 0.96, opacity: 0 }}
      animate={{ rotate: initialRotation, scale: 1, opacity: 1 }}
      whileDrag={{ scale: 1.06, zIndex: 50, cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`cursor-grab select-none ${className}`}
    >
      {children}
    </motion.div>
  );
}
