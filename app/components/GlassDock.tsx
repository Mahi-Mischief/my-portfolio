"use client";

import Link from "next/link";
import { Github, Home, Linkedin, Mail, FolderOpen } from "lucide-react";

type DockActive = "home" | "projects";

function DockLink({
  href,
  label,
  children,
  isActive,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const className = `flex min-w-[48px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition sm:min-w-[56px] sm:px-2.5 sm:py-2 ${
    isActive
      ? "bg-white/55 text-zinc-900"
      : "text-zinc-700 hover:bg-zinc-900 hover:text-white"
  }`;

  const labelEl = (
    <span className="font-mono-jet text-[8px] font-semibold uppercase tracking-wide text-zinc-600 sm:text-[9px]">
      {label}
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {labelEl}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      {labelEl}
    </Link>
  );
}

export default function GlassDock({ active = "home" }: { active?: DockActive }) {
  return (
    <nav
      className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-stretch gap-0.5 rounded-[1.25rem] border border-white/50 bg-white/30 px-1.5 py-2 shadow-[0_12px_40px_rgb(0_0_0_/_0.14)] backdrop-blur-2xl backdrop-saturate-150 sm:bottom-6 sm:gap-1 sm:rounded-2xl sm:px-2 sm:py-2.5"
      aria-label="Primary navigation"
    >
      <DockLink href="/" label="Home" isActive={active === "home"}>
        <Home className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
      </DockLink>
      <DockLink href="/projects" label="Projects" isActive={active === "projects"}>
        <FolderOpen className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
      </DockLink>
      <DockLink href="https://github.com/Mahi-Mischief" label="GitHub">
        <Github className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
      </DockLink>
      <DockLink href="https://www.linkedin.com/in/mahi-deshpande/" label="LinkedIn">
        <Linkedin className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
      </DockLink>
      <DockLink href="https://mail.google.com/mail/?view=cm&to=deshpandemahidu@gmail.com" label="Email">
        <Mail className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.85} />
      </DockLink>
    </nav>
  );
}
