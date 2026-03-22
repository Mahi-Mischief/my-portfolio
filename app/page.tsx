"use client";

import { useCallback, useEffect, useState } from "react";
import HeroGlowingTitle from "./components/HeroGlowingTitle";
import MouseGlowLayer from "./components/MouseGlowLayer";
import Polaroid from "./components/Polaroid";
import StickyNote from "./components/StickyNote";
import StatusBadge from "./components/StatusBadge";
import Sticker from "./components/Sticker";
import GlassDock from "./components/GlassDock";
import HobbyistWorkbench from "./components/HobbyistWorkbench";

/**
 * Home — default layout matches reference screenshot (viewport %, origin = card center).
 */

const ASSETS = {
  nexora: "/assets/polaroid-nexora.png",
  tobiTodo: "/assets/polaroid-tobi-todo.png",
  unity: "/assets/polaroid-immersive-worlds.svg",
  portrait: "/assets/polaroid-headshot.png",
  nextjs: "/assets/polaroid-nextjs-ai.svg",
  // Logo stickers for personality
  canva: "/assets/canva.png",
  figma: "/assets/figma.png",
  firebase: "/assets/firebase.png",
  flutter: "/assets/flutter.png",
  java: "/assets/java.png",
  postgresql: "/assets/postgresql.png",
  python: "/assets/python.png",
  github: "/assets/github.png",
  vscode: "/assets/vscode.png",
  blender: "/assets/blender.png",
  unityLogo: "/assets/unity.png",
} as const;

const HALO_SCALE = 0.595; // 0.7 * 0.85 = 15% smaller

/**
 * Layout from reference (0–100 = viewport). `left` / `top` = anchor at card center.
 * Rotations: CSS deg (clockwise +, counter-clockwise −), per screenshot notes.
 */
function getRandomRotation() {
  return Math.random() * 10 - 5; // Random between -5 and +5
}

const LAYOUT = {
  /** Adjusted positions per user specifications */
  nexora: { left: 20, top: 22, rotate: -8 }, // Moved 4% right from 16% to 20%
  portrait: { left: 50, top: 20, rotate: 2 }, // Moved down 5% from 15% to 20%
  tobi: { left: 78, top: 20, rotate: 6 }, // Moved down from 10% to 20%
  unity: { left: 15, top: 59, rotate: -12 }, // Moved 1% up from 60% to 59%
  fbla: { left: 88, top: 75, rotate: 4 }, // Moved further right to 88% (next to navigation)
  gt: { left: 26, top: 84, rotate: 0 }, // Moved 1% left from 27% to 26%
  /** Tech Logo Scatter - Adjusted positions */
  stickers: {
    // The Top Perimeter
    java1: { left: 35, top: 8, rotate: 12 }, // Between Nexora and Headshot
    postgresql1: { left: 62, top: 10, rotate: -15 }, // Between Headshot and Tobi
    
    // The Left Gutter
    canva1: { left: 8, top: 30, rotate: -15 }, // Directly below Internship badge
    github1: { left: 45, top: 75, rotate: 10 }, // Moved 2% up from 77% to 75%
    firebase1: { left: 5, top: 65, rotate: 8 }, // Moved 2% left from 7% to 5%
    blender1: { left: 8, top: 85, rotate: 15 }, // Bottom-left corner
    
    // The Right Gutter
    figma1: { left: 92, top: 28, rotate: 12 }, // Moved 1% left from 93% to 92%
    python1: { left: 88, top: 50, rotate: -12 }, // Moved 4% left from 92% to 88%
    flutter1: { left: 94, top: 60, rotate: -10 }, // Bottom 40%, right 6%
    unity1: { left: 90, top: 85, rotate: -12 }, // Bottom-right corner
    
    // Above navigation bar
    vscode1: { left: 55, top: 77, rotate: -6 }, // Next to GitHub (45%→55%)
  },
} as const;

function slotStyle(leftPct: number, topPct: number) {
  return {
    position: "absolute" as const,
    left: `${leftPct}%`,
    top: `${topPct}%`,
    transform: `translate(-50%, -50%) scale(${HALO_SCALE})`,
    transformOrigin: "center center",
  };
}

export default function Home() {
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [pointer, setPointer] = useState({ cx: 0, cy: 0 });

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setPointer({ cx: w / 2, cy: h / 2 });
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      const rect = document.documentElement.getBoundingClientRect();
      setGlow({
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
      });
      // Use viewport coordinates directly for HeroGlowingTitle
      setPointer({ cx: clientX, cy: clientY });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <main
      className="relative isolate h-dvh w-full overflow-hidden bg-[#fafaf9]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgb(24 24 27 / 0.17) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        pointerEvents: "none", // Make main container passive to clicks
        border: "2px solid red", // DEBUG: Show main container boundaries
      }}
    >
      <MouseGlowLayer glow={glow} subtle className="z-[-1]" />

      <div className="pointer-events-none absolute left-4 top-4 z-[10] sm:left-6 sm:top-6" style={{ border: "2px solid red" }}>
        <StatusBadge />
      </div>

      {/* Default positions = reference screenshot (% of main); drag anywhere */}
      <div className="absolute inset-0 z-[50] pointer-events-auto" style={{ border: "2px solid blue" }}>
        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.nexora.left, LAYOUT.nexora.top)}
        >
          <Polaroid
            draggable={true}
            imageSrc={ASSETS.nexora}
            imageAlt="Nexora"
            rotation={LAYOUT.nexora.rotate}
            caption={
              <>
                Nexora <span className="text-zinc-600">FBLA 5th Place State Winner</span>
              </>
            }
          />
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.portrait.left, LAYOUT.portrait.top)}
        >
          <Polaroid
            draggable={true}
            imageSrc={ASSETS.portrait}
            imageAlt="Portrait"
            rotation={LAYOUT.portrait.rotate}
            caption="Artistic Headshot"
          />
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.tobi.left, LAYOUT.tobi.top)}
        >
          <Polaroid
            draggable={true}
            imageSrc={ASSETS.tobiTodo}
            imageAlt="Tobi-To-Do"
            rotation={LAYOUT.tobi.rotate}
            caption={
              <>
                Tobi-To-Do <span className="text-zinc-600">Next.js + AI Student Planner</span>
              </>
            }
          />
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.unity.left, LAYOUT.unity.top)}
        >
          <Polaroid
            draggable={true}
            imageSrc={ASSETS.unity}
            imageAlt="Unity Game"
            rotation={LAYOUT.unity.rotate}
            caption="Immersive Worlds & Game Mechanics"
          />
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.fbla.left, LAYOUT.fbla.top)}
        >
          <StickyNote variant="terminal" draggable={true} rotation={LAYOUT.fbla.rotate}>
            <div className="font-mono-jet text-[12px] leading-tight">
              <div>NEXORA: FBLA State Winner // AI Agent Framework</div>
              <div>TOBI-TO-DO: Next.js + OpenAI Student Planner</div>
              <div>UNITY_DRIVE: C# Physics & Immersive World-Building</div>
            </div>
          </StickyNote>
        </div>

        <div
          className="pointer-events-auto absolute"
          style={slotStyle(LAYOUT.gt.left, LAYOUT.gt.top)}
        >
          <StickyNote variant="lab" draggable={true} rotation={LAYOUT.gt.rotate}>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                R
              </div>
              <div className="font-mono-jet text-[12px] leading-tight">
                <div>RESEARCH: Interactive PPG Heart Rate Monitor</div>
                <div>PLATFORM: Python-based Google Colab Module</div>
                <div>TECH: OpenCV + NumPy Signal Processing</div>
                <div>FOCUS: Real-time Fingertip Video Analysis</div>
                <div>EDU: High School Engineering Curriculum</div>
              </div>
            </div>
          </StickyNote>
        </div>

        {/* App Logo Stickers - 1/4th size of Polaroids - positioned in blank spaces */}
        {/* Logo Stickers - positioned in blank spaces */}
        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.canva1.left}%`,
            top: `${LAYOUT.stickers.canva1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.canva1.rotate}>
            <img src={ASSETS.canva} alt="Canva" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.figma1.left}%`,
            top: `${LAYOUT.stickers.figma1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.figma1.rotate}>
            <img src={ASSETS.figma} alt="Figma" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.firebase1.left}%`,
            top: `${LAYOUT.stickers.firebase1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.firebase1.rotate}>
            <img src={ASSETS.firebase} alt="Firebase" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.flutter1.left}%`,
            top: `${LAYOUT.stickers.flutter1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.flutter1.rotate}>
            <img src={ASSETS.flutter} alt="Flutter" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.java1.left}%`,
            top: `${LAYOUT.stickers.java1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.java1.rotate}>
            <img src={ASSETS.java} alt="Java" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.postgresql1.left}%`,
            top: `${LAYOUT.stickers.postgresql1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.postgresql1.rotate}>
            <img src={ASSETS.postgresql} alt="PostgreSQL" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        {/* Additional Logo Stickers */}
        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.python1.left}%`,
            top: `${LAYOUT.stickers.python1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.python1.rotate}>
            <img src={ASSETS.python} alt="Python" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.github1.left}%`,
            top: `${LAYOUT.stickers.github1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.github1.rotate}>
            <img src={ASSETS.github} alt="GitHub" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.vscode1.left}%`,
            top: `${LAYOUT.stickers.vscode1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.vscode1.rotate}>
            <img src={ASSETS.vscode} alt="VSCode" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.blender1.left}%`,
            top: `${LAYOUT.stickers.blender1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.blender1.rotate}>
            <img src={ASSETS.blender} alt="Blender" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>

        {/* Unity Sticker */}
        <div
          className="pointer-events-auto absolute z-[5]"
          style={{
            position: "absolute",
            left: `${LAYOUT.stickers.unity1.left}%`,
            top: `${LAYOUT.stickers.unity1.top}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sticker size="xl" rotation={LAYOUT.stickers.unity1.rotate}>
            <img src={ASSETS.unityLogo} alt="Unity" className="w-10 h-10 object-contain" draggable={false} />
          </Sticker>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[10] flex flex-col items-center justify-center px-4 text-center" style={{ border: "2px solid green" }}>
        <HeroGlowingTitle
          clientX={pointer.cx}
          clientY={pointer.cy}
          className="text-balance text-[clamp(1.75rem,6vw,80px)]"
        />
        <p className="font-mono-jet mt-5 max-w-2xl text-[10px] leading-relaxed text-zinc-600 sm:mt-6 sm:text-xs md:text-sm">
          [SYSTEM: ACTIVE] // West Forsyth High School &apos;28 // Full Stack Developer + Creative Artist + AI Enthusiast
        </p>
      </div>

      {/* <HobbyistWorkbench /> */}

      {/* GlassDock - Master Layer - Always On Top */}
      <div className="fixed bottom-5 left-1/2 pointer-events-auto" style={{ zIndex: 9999 }}>
        <GlassDock active="home" />
      </div>
    </main>
  );
}
