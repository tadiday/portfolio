import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export default function Header() {
  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-20 grid h-[var(--home-header-height)] grid-cols-2 items-center border-b border-[var(--home-border)] bg-[rgba(8,9,10,0.94)] px-3.5 font-mono text-[9px] uppercase tracking-[0.08em] text-[#c1c3c6] sm:px-[clamp(18px,2.1vw,34px)] sm:text-[11px] min-[901px]:grid-cols-[1fr_auto_1fr]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <p>Portfolio_build: V1.1 _</p>
      <nav className="hidden h-full min-[901px]:block" aria-label="Primary navigation">
        <ul className="flex h-full items-center gap-[clamp(24px,4vw,64px)]">
          {links.map(([label, href], index) => (
            <li className="h-full" key={label}>
              <Link
                href={href}
                className={`relative grid h-full items-center transition-colors hover:text-[var(--home-text)] ${index === 0 ? "text-[var(--home-text)] after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:bg-[var(--home-text)] after:content-['']" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="justify-self-end text-[8px] sm:text-[11px]">Last updated: 08.12.26</p>
    </motion.header>
  );
}
