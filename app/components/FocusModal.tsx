"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface FocusModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    type: 'polaroid' | 'sticky';
    description: string;
    technicalDetails: string[];
    images?: string[];
    googleDocId?: string;
  };
}

export default function FocusModal({ isOpen, onClose, item }: FocusModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('ESC key pressed in FocusModal');
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      console.log('FocusModal opened, added listeners');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      console.log('FocusModal closed, removed listeners');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={() => {
          console.log('Backdrop clicked');
          onClose();
        }}
      >
        {/* Close Button - Rendered outside modal content */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('FocusModal close button clicked - Home page version');
            onClose();
          }}
          className="fixed right-8 top-8 z-[1000] rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors cursor-pointer"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <X className="h-5 w-5" />
        </button>
        
        <motion.div
          layoutId={`focus-${item.id}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative mx-4 max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl border border-zinc-200 shadow-[0_32px_80px_rgba(0,0,0,0.2)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="flex h-full max-h-[90vh]">
            {/* Left Side - Gallery */}
            <div className="w-1/2 border-r border-zinc-200 bg-zinc-50 p-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-4 font-mono-jet">
                {item.title} - Gallery
              </h3>
              
              {item.googleDocId ? (
                <div className="w-full h-[500px] rounded-lg border border-zinc-200 overflow-hidden">
                  {item.googleDocId.includes('canva.com') ? (
                    <iframe
                      src={`https://www.${item.googleDocId}`}
                      className="w-full h-full"
                      title={`${item.title} Canva Design`}
                      frameBorder="0"
                      allowFullScreen
                    />
                  ) : (
                    <iframe
                      src={`https://docs.google.com/document/d/${item.googleDocId}/pub?embedded=true`}
                      className="w-full h-full"
                      title={`${item.title} Google Doc`}
                      frameBorder="0"
                    />
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {item.images?.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg border border-zinc-200 overflow-hidden bg-white">
                      <img
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )) || (
                    <div className="col-span-2 aspect-video rounded-lg border border-zinc-200 bg-zinc-100 flex items-center justify-center">
                      <p className="text-zinc-500 font-mono-jet text-sm">No images available</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Side - Technical Details */}
            <div className="w-1/2 p-6 overflow-y-auto">
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 font-mono-jet">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                {item.description}
              </p>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider font-mono-jet">
                  Technical Details
                </h4>
                {item.technicalDetails.map((detail, index) => (
                  <div key={index} className="border-l-2 border-zinc-200 pl-4">
                    <p className="text-sm text-zinc-700 font-mono-jet leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
