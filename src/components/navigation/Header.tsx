"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

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
    <div className="hidden min-w-0 grid-cols-[65%_35%] min-[1100px]:grid">
      <div className="relative flex items-center border border-[var(--border-strong)] px-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--header-text)]">
        <span className="mr-4 h-1.5 w-1.5 bg-[var(--text)]" aria-hidden="true" />
        Portfolio_build: V1.1_
        <span className="absolute left-1.5 top-1.5 text-[8px] leading-none text-[#ff3947]" aria-hidden="true">✦</span>
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 border-r border-t border-[#d8d9da]" aria-hidden="true" />
        <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 border-b border-r border-[#d8d9da]" aria-hidden="true" />
      </div>
      <DividerPattern />
    </div>
  );
}

function DividerPattern() {
  return (
    <div
      className="flex h-full items-center overflow-hidden border-b border-[var(--border-muted)] px-[6%] font-mono text-[21px] italic tracking-[-0.28em] text-[var(--text-muted)]"
      aria-hidden="true"
    >
      {"////////"}
    </div>
  );
}

function PrimaryNavigation({ activeSection, onNavigate }: { activeSection: string; onNavigate: (section: string) => void }) {
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
                    : "bg-[var(--header-bg)] text-[var(--header-text)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)]"
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

function AILauncher({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="hidden min-w-0 grid-cols-[42%_58%] min-[1100px]:grid">
      <div className="relative min-w-0">
        <DividerPattern />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${open ? "Close" : "Open"} Peter AI`}
        className="group relative flex items-center justify-between border border-[var(--border-strong)] px-4 text-left font-mono uppercase text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)]"
      >
        <span className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-[var(--accent)] text-[10px] font-black text-[var(--accent)]">AI</span>
          <span className="leading-[1.5]">
            <span className="block text-[10px] font-bold tracking-[0.1em] text-[var(--text-primary)]">Peter AI</span>
            <span className="block text-[8px] tracking-[0.08em] text-[var(--text-muted)]">Ask about my work</span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[var(--success)]" />
          <span className="grid h-8 w-8 place-items-center border border-[#777b80] text-xl text-[var(--text-primary)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            {open ? "×" : "+"}
          </span>
        </span>
        <span className="absolute bottom-0 right-0 h-0 w-0 border-b-[8px] border-l-[8px] border-b-[#dfe0e1] border-l-transparent" />
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
      className="fixed inset-x-0 top-0 z-50 h-[var(--home-header-height)] bg-[var(--header-bg)] px-2 pt-1.5 min-[1100px]:px-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="grid h-[calc(var(--home-header-height)-6px)] grid-cols-1 min-[1100px]:grid-cols-[28%_46%_26%]">
        <BuildIdentifier />
        <PrimaryNavigation activeSection={activeSection} onNavigate={setActiveSection} />
        <AILauncher open={aiOpen} onToggle={onAIToggle} />
      </div>
    </motion.header>
  );
}
