"use client";

/**
 * Static availability pill (reference: top-left “Available for / Summer Internships”).
 */
export default function StatusBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none flex items-center gap-2.5 rounded-full border border-zinc-200/90 bg-white/95 px-3.5 py-2 pr-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-4 sm:py-2.5 ${className}`}
    >
      <span
        className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.65),inset_0_1px_0_rgba(255,255,255,0.35)]"
        aria-hidden
      >
        <span className="absolute h-1.5 w-1.5 rounded-full bg-white/90 blur-[0.5px]" />
      </span>
      <p className="text-left text-[11px] font-medium leading-tight text-zinc-800 sm:text-xs">
        <span className="block text-zinc-500">Available for</span>
        <span className="block font-semibold text-zinc-900">Summer Internships</span>
      </p>
    </div>
  );
}
