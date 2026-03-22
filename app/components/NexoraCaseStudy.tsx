"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface NexoraCaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NexoraCaseStudy({ isOpen, onClose }: NexoraCaseStudyProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNearSticker, setIsNearSticker] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      document.addEventListener("mousemove", handleMouseMove);
      // Disable body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Check if mouse is near GT Buzz sticker
  useEffect(() => {
    const stickerElement = document.getElementById("gt-buzz-sticker");
    if (stickerElement && isOpen) {
      const rect = stickerElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(mousePosition.x - centerX, mousePosition.y - centerY);
      setIsNearSticker(distance < 100);
    }
  }, [mousePosition, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative mx-auto w-full max-w-5xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Tape Style */}
            <motion.button
              initial={{ rotate: 0 }}
              animate={{ rotate: isNearSticker ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={onClose}
              className="absolute -top-2 -right-2 z-[210] flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200 shadow-lg hover:bg-yellow-300"
              style={{
                clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
              }}
            >
              <X className="h-4 w-4 text-yellow-900" strokeWidth={3} />
            </motion.button>

            {/* GT Buzz Sticker */}
            <motion.div
              id="gt-buzz-sticker"
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: isNearSticker ? [0, -5, 5, -3, 3, 0] : 0,
                scale: isNearSticker ? 1.1 : 1
              }}
              transition={{ 
                rotate: { type: "spring", stiffness: 300, damping: 10 },
                scale: { type: "spring", stiffness: 400, damping: 20 }
              }}
              className="absolute -bottom-4 -left-4 z-[205]"
            >
              <div className="relative">
                <div className="h-12 w-12 rounded-lg bg-white/90 border border-yellow-400 shadow-lg flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-yellow-600" strokeWidth={2} />
                </div>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-[8px] font-bold text-yellow-800 whitespace-nowrap">
                  GT BUZZ
                </span>
              </div>
            </motion.div>

            {/* Main Content Container */}
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
              {/* Title */}
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                  Nexora Case Study
                </h2>
                <p className="mt-2 text-sm text-zinc-600">
                  FBLA 5th Place State Winner - Mobile Application Presentation
                </p>
              </div>

              {/* Canva Embed Container */}
              <div className="relative w-full overflow-hidden rounded-xl">
                <div 
                  style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: 0, 
                    paddingTop: '56.25%',
                    paddingBottom: 0, 
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)', 
                    margin: 0, 
                    overflow: 'hidden',
                    borderRadius: '12px'
                  }}
                >
                  <iframe 
                    loading="lazy"
                    style={{ 
                      position: 'absolute', 
                      width: '100%', 
                      height: '100%', 
                      top: 0, 
                      left: 0, 
                      border: 'none', 
                      padding: 0,
                      margin: 0,
                      borderRadius: '12px',
                      pointerEvents: 'auto'
                    }}
                    src="https://www.canva.com/design/DAHEnQSDHsg/BDg7h0m-AglvQkXv29vZ6A/view?embed" 
                    allowFullScreen={true}
                    allow="fullscreen"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="font-mono-jet text-[10px] text-zinc-500 sm:text-xs">
                  [SOURCE: CANVA_LIVE_FEED] // [PROJECT: NEXORA_FBLA_WINNER]
                </p>
              </div>

              {/* Attribution */}
              <div className="mt-4 text-center">
                <a 
                  href="https://www.canva.com/design/DAHEnQSDHsg/BDg7h0m-AglvQkXv29vZ6A/view?utm_content=DAHEnQSDHsg&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
                  target="_blank" 
                  rel="noopener"
                  className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  Copy of FBLA Mobile Application Presentation by Mahi Deshpande
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
