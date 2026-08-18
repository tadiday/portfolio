import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 h-[var(--home-header-height)] bg-[#070809] px-2 pt-1.5 min-[1100px]:px-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="grid h-[calc(var(--home-header-height)-6px)] grid-cols-1 min-[1100px]:grid-cols-[28%_46%_26%]">
        <div className="hidden min-w-0 grid-cols-[65%_35%] min-[1100px]:grid">
          <div className="relative flex items-center border border-[#56595d] px-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#bfc1c4]">
            <span className="mr-4 h-1.5 w-1.5 bg-[#e6e7e7]" aria-hidden="true" />
            Portfolio_build: V1.1_
            <span className="absolute left-1.5 top-1.5 text-[8px] leading-none text-[#ff3947]" aria-hidden="true">✦</span>
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 border-r border-t border-[#d8d9da]" aria-hidden="true" />
            <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 border-b border-r border-[#d8d9da]" aria-hidden="true" />
          </div>
          <div className="flex items-center overflow-hidden border-b border-white/15 px-[6%] font-mono text-[21px] italic tracking-[-0.28em] text-[#94989d]" aria-hidden="true">
            {"////////"}
          </div>
        </div>

        <nav className="h-full" aria-label="Primary navigation">
        <ul className="grid h-full grid-cols-5 border-y border-r border-[#56595d]">
          {links.map(({ label, href }, index) => {
            const active = index === 0;

            return (
              <li className="relative min-w-0" key={label}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex h-full flex-col justify-center border-l border-[#56595d] px-2 font-mono uppercase transition-colors duration-200 min-[1100px]:px-4 ${
                    active
                      ? "bg-[#f1f1ef] text-[#090a0b]"
                      : "bg-[#070809] text-[#d8d9da] hover:bg-[#17191b] hover:text-white"
                  }`}
                >
                  <span className="mb-0.5 text-[7px] font-semibold leading-none tracking-[0.12em] opacity-70 min-[1100px]:mb-1 min-[1100px]:text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-[8px] font-medium leading-none tracking-[0.02em] min-[420px]:text-[9px] sm:text-[12px] min-[1100px]:text-[14px]">
                    {label}
                  </span>

                  {active && (
                    <>
                      <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 border-l-2 border-t-2 border-[#171819] min-[1100px]:left-2 min-[1100px]:top-2" aria-hidden="true" />
                      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 border-r-2 border-t-2 border-[#171819] min-[1100px]:right-2 min-[1100px]:top-2" aria-hidden="true" />
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        </nav>

        <div className="hidden min-w-0 grid-cols-[42%_58%] min-[1100px]:grid">
          <div className="flex items-center overflow-hidden border-b border-white/15 px-[12%] font-mono text-[21px] italic tracking-[-0.28em] text-[#94989d]" aria-hidden="true">
            {"////////"}
          </div>
          <div className="relative flex items-center justify-between border border-[#56595d] px-4 font-mono uppercase text-[#c7c9cc]">
            <p className="leading-[1.65]">
              <span className="block text-[9px] tracking-[0.08em]">Last updated:</span>
              <span className="block text-[11px] tracking-[0.12em]">08.12.26</span>
            </p>
            <span className="grid h-8 w-8 place-items-center border border-[#777b80] text-[22px] font-light leading-none text-[#e4e5e6]" aria-hidden="true">+</span>
            <span className="absolute bottom-0 right-0 h-0 w-0 border-b-[8px] border-l-[8px] border-b-[#dfe0e1] border-l-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
