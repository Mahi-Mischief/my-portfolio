"use client";

import { useCallback, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Polaroid from "./Polaroid";
import StickyNote from "./StickyNote";
import FocusModal from "./FocusModal";

interface HobbyistWorkbenchProps {
  onProjectSelect?: (index: number) => void;
}

const WB = {
  mario: "/assets/mario.avif",
  roblox: "/assets/roblox_obby.jpeg",
  craftsman: "/assets/graphic design image.png",
  blender: "/assets/blender room.jpeg",
  vibha: "/assets/vibhaboston.png",
  minecraft: "/assets/minecraft.png",
} as const;

const HOBBYIST_ITEMS = [
  // Polaroids (Image-Heavy)
  {
    id: 'mario-pygame',
    type: 'polaroid' as const,
    title: 'Mario Pygame',
    description: 'Physics & Sprite Logic',
    technicalDetails: [
      'The Deep Dive: "Recreated five iconic levels of Super Mario Bros using Python and the Pygame library. The core challenge was engineering a custom physics engine that felt authentic to the original\'s momentum. I implemented \'Pixel-Perfect\' AABB collision detection, variable jump heights based on input duration, and state-machine logic for enemy AI (Goombas and Koopas)."',
      'Technical Tags: Python Pygame Game Physics State Machines'
    ],
    imageSrc: WB.mario,
    rotation: 0, // Will be set dynamically
    caption: 'Mario Pygame',
    googleDocId: undefined
  },
  {
    id: 'roblox-obby',
    type: 'polaroid' as const,
    title: 'Roblox Obby',
    description: 'Immersive Level Design',
    technicalDetails: [
      'The Deep Dive: "Developed an immersive 10-stage obstacle course (Obby) within Roblox Studio. I utilized Lua scripting to manage checkpoint data persistence and unique physics-based hazards. The focus was on player retention—carefully tuning the difficulty curve to ensure players felt challenged but rewarded after each stage."',
      'Technical Tags: Lua Roblox Studio Level Design UX Psychology'
    ],
    imageSrc: WB.roblox,
    rotation: 0, // Will be set dynamically
    caption: 'Roblox Obby',
    googleDocId: undefined
  },
  {
    id: 'craftsman',
    type: 'polaroid' as const,
    title: 'Multi-Media Art',
    description: 'The Craftsman\'s Eye',
    technicalDetails: [
      'The Deep Dive: "A collection of mixed-media work spanning glass art, traditional painting, and 2D animation. This creative foundation directly informs my UI/UX work—specifically my understanding of color theory, light transparency in glass art, and the \'Twelve Principles of Animation\' (Squash and Stretch) applied to digital micro-interactions."',
      'Technical Tags: Glass Art 2D Animation Color Theory Visual Arts'
    ],
    imageSrc: WB.craftsman,
    rotation: 0, // Will be set dynamically
    caption: 'Multi-Media Art',
    googleDocId: 'canva.com/design/DAG5AV2CBHk/t1MScnRU7LLNxH6Ask7YCQ/view?embed'
  },
  {
    id: 'blender-interior',
    type: 'polaroid' as const,
    title: '3D Interior Design',
    description: 'Spatial Visualization',
    technicalDetails: [
      'The Deep Dive: "Used Blender to create a 1:1 scale architectural visualization of my personal workspace. This allowed me to iterate through furniture layouts and lighting configurations before physical implementation. Mastering the Cycles render engine helped me understand how light interacts with different materials (wood, fabric, glass) in a digital environment."',
      'Technical Tags: Blender 3D Modeling Arch-Viz Cycles Render'
    ],
    imageSrc: WB.blender,
    rotation: 0, // Will be set dynamically
    caption: '3D Interior Design',
    googleDocId: undefined
  },
  {
    id: 'vibha-internship',
    type: 'polaroid' as const,
    title: 'UI/UX Internship',
    description: 'Vibha Boston',
    technicalDetails: [
      'The Deep Dive: "Served as a Design Intern at Vibha Boston, where I led the visual branding for the \'Impact Idol\' talent showcase. I produced high-fidelity wireframes and collaborated with developers to ensure the front-end implementation matched the brand identity across mobile and desktop platforms."',
      'Technical Tags: Figma Wireframing Visual Branding UI/UX Design'
    ],
    imageSrc: WB.vibha,
    rotation: 0, // Will be set dynamically
    caption: 'UI/UX Internship',
    googleDocId: 'canva.com/design/DAG2WmJIobw/NRBUotO_VdBWIpD6w0dyyQ/view?embed'
  },
  
  // Sticky Notes (Text-Heavy)
  {
    id: 'tobi-todo',
    type: 'polaroid' as const,
    title: 'Tobi-To-Do',
    description: 'AI Student Planner',
    technicalDetails: [
      'The Deep Dive: "Imagine having a personal assistant that helps you organize your life, stay focused, and constantly move closer to the person you want to become. Tobi To-Do is an AI-powered productivity platform designed specifically for ambitious students who want more than just a basic to-do list."',
      'Technical Tags: Next.js React TypeScript TailwindCSS AI'
    ],
    imageSrc: '/assets/polaroid-tobi-todo.png',
    rotation: 0, // Will be set dynamically
    caption: 'AI Student Planner',
    googleDocId: 'canva.com/design/DAG1gYYzkAE/CXbukbnDPgyiqQKdJ6OuFw/view?embed'
  },
  {
    id: 'tetris',
    type: 'sticky' as const,
    title: 'Tetris Clone',
    description: 'Array Manipulation',
    technicalDetails: [
      'The Deep Dive: "A logic-heavy recreation of Tetris focused on mastering multi-dimensional arrays. I engineered the rotation algorithms (matrix transposition) for various \'Tetriminos\' and built a line-clearing detection system that updates in real-time. This project was a masterclass in handling high-speed grid-based data."',
      'Technical Tags: Python Data Structures Algorithms Game Loop'
    ],
    variant: 'sky' as const,
    rotation: 0, // Will be set dynamically
    content: 'Logic-heavy recreation to master array manipulation & gravity systems.',
    googleDocId: undefined
  },
  {
    id: 'office-aid',
    type: 'sticky' as const,
    title: 'Office Aid',
    description: 'Media Center Operations',
    technicalDetails: [
      'The Deep Dive: "Managed technical and administrative workflows for the school media center. My responsibilities included troubleshooting hardware/software issues for a student body of 2,000+ and maintaining a digital database of library assets, optimizing the checkout system for 15% faster turnaround."',
      'Technical Tags: IT Support Database Management Administrative Systems'
    ],
    variant: 'lab' as const,
    rotation: 0, // Will be set dynamically
    content: 'Media Center administration & organizational systems.',
    googleDocId: undefined
  },
  {
    id: 'languages',
    type: 'sticky' as const,
    title: 'Languages',
    description: 'Polyglot Communication',
    technicalDetails: [
      'The Deep Dive: "Leveraging linguistic diversity to bridge communication gaps. I am fully bilingual (Fluent in 2) and have achieved conversational proficiency in 4 additional languages. This skill is vital for collaborative research and understanding global user demographics in software development."',
      'Technical Tags: Linguistics Global Communication Soft Skills'
    ],
    variant: 'amber' as const,
    rotation: 0, // Will be set dynamically
    content: 'Bilingual (Fluent in 2) + Multilingual (Basics in 4)',
    googleDocId: undefined
  },
  {
    id: 'mun-cert-gen',
    type: 'sticky' as const,
    title: 'MUN Cert-Gen',
    description: 'Workflow Automation',
    technicalDetails: [
      'The Deep Dive: "Developed a Python automation script for Junior MUN to solve the \'certificate bottleneck.\' The script parses massive participant spreadsheets and auto-generates custom-designed PDF certificates. Two years later, the organization still uses this system as their primary distribution tool."',
      'Technical Tags: Python PDF Automation Product Management Scripting'
    ],
    variant: 'sky' as const,
    rotation: 0, // Will be set dynamically
    content: 'Automated certificate generator from spreadsheets (Still in use!)',
    googleDocId: undefined
  }
];

export default function HobbyistWorkbench({ onProjectSelect }: HobbyistWorkbenchProps) {
  const router = useRouter();
  const [focusItem, setFocusItem] = useState<typeof HOBBYIST_ITEMS[0] | null>(null);

  // Generate stable random rotations on mount
  const itemsWithRotations = useMemo(() => {
    return HOBBYIST_ITEMS.map(item => ({
      ...item,
      rotation: Math.random() * 8 + 2 // Random between 2-10 degrees
    }));
  }, []);

  const handleItemClick = useCallback((item: typeof HOBBYIST_ITEMS[0]) => {
    console.log('Item clicked:', item.title);
    setFocusItem(item);
  }, []);

  const handleCloseFocus = useCallback(() => {
    console.log('Closing focus modal');
    setFocusItem(null);
  }, []);

  const handleImageClick = useCallback((projectIndex: number) => {
    console.log('Image clicked, navigating to project:', projectIndex);
    router.push(`/projects?project=${projectIndex}`);
  }, [router]);

  return (
    <>
      <section className="relative z-[12] mx-auto mt-4 w-full max-w-6xl px-3 pb-32 pt-6 sm:px-4 sm:pb-36">
        <h2
          className="mb-8 text-center text-2xl font-semibold tracking-tight text-zinc-900 sm:mb-10 sm:text-3xl"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          The Hobbyist Workbench
        </h2>

        <div className="relative">
          {/* Grid Layout: 2 rows of 5 items with 1% overlap */}
          <div className="grid grid-cols-5 gap-0 relative">
            {itemsWithRotations.map((item, index) => {
              const row = Math.floor(index / 5);
              const col = index % 5;
              
              return (
                <motion.div
                  key={item.id}
                  layoutId={item.type === 'polaroid' ? `focus-${item.id}` : undefined}
                  className="relative"
                  style={{
                    gridColumn: col + 1,
                    gridRow: row + 1,
                    transform: `translateX(${col > 0 ? '-1%' : '0'})`,
                  }}
                  whileHover={item.type === 'polaroid' ? { scale: 1.05, cursor: 'pointer' } : {}}
                  onClick={item.type === 'polaroid' ? () => handleItemClick(item) : undefined}
                >
                  {item.type === 'polaroid' ? (
                    <Polaroid
                      compact
                      imageSrc={item.imageSrc}
                      imageAlt={item.title}
                      rotation={item.rotation}
                      caption={item.caption}
                      draggable={false}
                      onClick={() => handleItemClick(item)}
                    />
                  ) : (
                    <StickyNote
                      variant={item.variant}
                      rotation={item.rotation}
                      draggable={false}
                      className="w-[200px] h-[200px]"
                    >
                      <div className="text-center font-mono-jet text-sm leading-snug">
                        <div className="font-bold text-zinc-900 mb-2">{item.title}</div>
                        <div className="text-zinc-700">{item.content}</div>
                      </div>
                    </StickyNote>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Focus Modal */}
      <AnimatePresence>
        {focusItem && (
          <FocusModal
            isOpen={!!focusItem}
            onClose={handleCloseFocus}
            item={{
              ...focusItem,
              images: focusItem.type === 'polaroid' ? [focusItem.imageSrc] : undefined,
              googleDocId: focusItem.googleDocId,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
