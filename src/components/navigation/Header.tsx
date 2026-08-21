"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shrink } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  PopupTriggerCorners,
  popupTriggerClassName,
} from "@/components/ui/DashboardPrimitives";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

type HeaderProps = {
  aiOpen: boolean;
  onAIToggle: () => void;
};

function BuildIdentifier() {
  return (
    <div className="relative hidden min-w-0 items-center border border-[var(--border-strong)] bg-[var(--header-bg)] px-4 font-mono uppercase text-[var(--header-text)] min-[1100px]:flex">
      <span className="mr-3 size-1.5 bg-[var(--accent)]" aria-hidden="true" />
      <span className="truncate text-[10px] tracking-[0.1em]">
        Portfolio / 2026
      </span>
      <span
        className="absolute left-1.5 top-1.5 size-1.5 border-l border-t border-[var(--accent)]"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-1.5 right-1.5 size-1.5 border-b border-r border-[var(--header-text)]"
        aria-hidden="true"
      />
    </div>
  );
}

function PrimaryNavigation({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (section: string) => void;
}) {
  return (
    <nav className="h-full" aria-label="Primary navigation">
      <ul className="grid h-full grid-cols-5 border-y border-r border-[var(--border-strong)]">
        {navigationLinks.map(({ label, href }, index) => {
          const sectionId = href.slice(1);
          const isActive = activeSection === sectionId;

          return (
            <li className="relative min-w-0" key={label}>
              <Link
                href={href}
                onClick={() => onNavigate(sectionId)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex h-full flex-col justify-center border-l border-[var(--border-strong)] px-2 font-mono uppercase transition-colors duration-150 min-[1100px]:px-4 ${
                  isActive
                    ? "bg-[var(--accent)] text-[var(--on-accent)]"
                    : "bg-[var(--header-bg)] text-[var(--header-text)] hover:z-10 hover:bg-[var(--surface-raised)] hover:text-[var(--accent)] hover:shadow-[inset_0_0_0_1px_var(--accent)]"
                }`}
              >
                <span className="mb-0.5 text-[7px] font-semibold leading-none tracking-[0.12em] opacity-70 min-[1100px]:mb-1 min-[1100px]:text-[10px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-[8px] font-medium leading-none min-[420px]:text-[9px] sm:text-xs min-[1100px]:text-sm">
                  {label}
                </span>
                {isActive && (
                  <>
                    <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 border-l-2 border-t-2 border-[var(--on-accent)]" />
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 border-r-2 border-t-2 border-[var(--on-accent)]" />
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function AILauncher({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="hidden items-center justify-end gap-2 border-y border-r border-[var(--border-strong)] bg-[var(--header-bg)] px-3 min-[1100px]:flex">
      <button
        type="button"
        disabled
        aria-label="Compact view coming soon"
        title="Compact view — coming soon"
        className="group relative grid size-10 place-items-center border border-[var(--border-strong)] bg-[var(--header-bg)] text-[var(--header-text)] opacity-60"
      >
        <Shrink className="size-4" strokeWidth={1.6} aria-hidden="true" />
        <span
          className="absolute left-1 top-1 size-1.5 border-l border-t border-current"
          aria-hidden="true"
        />
        <span
          className="absolute bottom-1 right-1 size-1.5 border-b border-r border-current"
          aria-hidden="true"
        />
      </button>
      <ThemeToggle />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${open ? "Close" : "Open"} Peter AI`}
        title={`${open ? "Close" : "Open"} Peter AI`}
        className={`${popupTriggerClassName} grid size-10 place-items-center border border-[var(--accent)] bg-[var(--header-bg)] font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[var(--accent)] hover:bg-[var(--surface-raised)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
      >
        <PopupTriggerCorners />
        {open ? "X" : "AI"}
      </button>
    </div>
  );
}

export default function Header({ aiOpen, onAIToggle }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let frameId = 0;

    function updateActiveSection() {
      frameId = 0;
      const activationLine = window.innerHeight * 0.32;
      let currentSection = navigationLinks[0].href.slice(1);

      for (const { href } of navigationLinks) {
        const sectionId = href.slice(1);
        const section = document.getElementById(sectionId);

        if (section && section.getBoundingClientRect().top <= activationLine) {
          currentSection = sectionId;
        }
      }

      setActiveSection(currentSection);
    }

    function scheduleUpdate() {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 h-[var(--home-header-height)] bg-transparent px-2 pt-1.5 min-[1100px]:px-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto grid h-[calc(var(--home-header-height)-6px)] w-full max-w-[1440px] grid-cols-1 min-[1100px]:grid-cols-[220px_minmax(0,1fr)_220px]">
        <BuildIdentifier />
        <PrimaryNavigation
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <AILauncher open={aiOpen} onToggle={onAIToggle} />
      </div>
    </motion.header>
  );
}
