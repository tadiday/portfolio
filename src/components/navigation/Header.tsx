import { motion } from "framer-motion";
import Link from "next/link";

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
      <div className="relative flex items-center border border-[#56595d] px-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#bfc1c4]">
        <span className="mr-4 h-1.5 w-1.5 bg-[#e6e7e7]" aria-hidden="true" />
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
      className="flex items-center overflow-hidden border-b border-white/15 px-[6%] font-mono text-[21px] italic tracking-[-0.28em] text-[#94989d]"
      aria-hidden="true"
    >
      {"////////"}
    </div>
  );
}

function PrimaryNavigation() {
  return (
    <nav className="h-full" aria-label="Primary navigation">
      <ul className="grid h-full grid-cols-5 border-y border-r border-[#56595d]">
        {navigationLinks.map(({ label, href }, index) => {
          const isHome = index === 0;

          return (
            <li className="relative min-w-0" key={label}>
              <Link
                href={href}
                aria-current={isHome ? "page" : undefined}
                className={`group relative flex h-full flex-col justify-center border-l border-[#56595d] px-2 font-mono uppercase transition-colors duration-150 min-[1100px]:px-4 ${
                  isHome
                    ? "bg-[#f1f1ef] text-[var(--background)]"
                    : "bg-[#070809] text-[#d8d9da] hover:bg-[#17191b] hover:text-white"
                }`}
              >
                <span className="mb-0.5 text-[7px] font-semibold leading-none tracking-[0.12em] opacity-70 min-[1100px]:mb-1 min-[1100px]:text-[10px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-[8px] font-medium leading-none min-[420px]:text-[9px] sm:text-xs min-[1100px]:text-sm">
                  {label}
                </span>
                {isHome && (
                  <>
                    <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 border-l-2 border-t-2 border-[#171819]" />
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 border-r-2 border-t-2 border-[#171819]" />
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
      <DividerPattern />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${open ? "Close" : "Open"} Peter AI`}
        className="group relative flex items-center justify-between border border-[#56595d] px-4 text-left font-mono uppercase text-[#c7c9cc] transition-colors hover:border-[var(--accent)]"
      >
        <span className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-[var(--accent)] text-[10px] font-black text-[var(--accent)]">AI</span>
          <span className="leading-[1.5]">
            <span className="block text-[10px] font-bold tracking-[0.1em] text-white">Peter AI</span>
            <span className="block text-[8px] tracking-[0.08em] text-[#858b91]">Ask about my work</span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[var(--success)]" />
          <span className="grid h-8 w-8 place-items-center border border-[#777b80] text-xl text-white group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            {open ? "×" : "+"}
          </span>
        </span>
        <span className="absolute bottom-0 right-0 h-0 w-0 border-b-[8px] border-l-[8px] border-b-[#dfe0e1] border-l-transparent" />
      </button>
    </div>
  );
}

export default function Header({ aiOpen, onAIToggle }: HeaderProps) {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 h-[var(--home-header-height)] bg-[#070809] px-2 pt-1.5 min-[1100px]:px-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="grid h-[calc(var(--home-header-height)-6px)] grid-cols-1 min-[1100px]:grid-cols-[28%_46%_26%]">
        <BuildIdentifier />
        <PrimaryNavigation />
        <AILauncher open={aiOpen} onToggle={onAIToggle} />
      </div>
    </motion.header>
  );
}
