"use client";
import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Header from "@/components/navigation/Header";
import Home from "@/components/Home";
import About from "@/components/About";
import Project from "@/components/project/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import AIChat from "@/components/ai/AIChat";

const risingBlocks = [
  { height: "50vh", start: 0.08, end: 0.58 },
  { height: "62vh", start: 0.05, end: 0.54 },
  { height: "72vh", start: 0.02, end: 0.5 },
  { height: "62vh", start: 0.05, end: 0.54 },
  { height: "50vh", start: 0.08, end: 0.58 },
] as const;

function RisingBlock({
  progress,
  block,
  index,
  marker,
}: {
  progress: MotionValue<number>;
  block: (typeof risingBlocks)[number];
  index: number;
  marker?: { number: string; label: string };
}) {
  const y = useTransform(
    progress,
    [0, block.start, block.end],
    ["100%", "100%", "0%"],
  );

  return (
    <motion.span
      className="relative block w-full border-t border-[#34383d]"
      style={{ height: block.height, y, backgroundColor: "var(--section-bg)" }}
    >
      <span className="absolute left-2 top-2 h-2 w-2 border-l border-t border-[var(--home-accent)]" />
      <span className="absolute right-2 top-2 font-mono text-[8px] font-bold text-[var(--home-accent)]">
        0{index + 1}
      </span>
      {index === 2 && marker && (
        <div className="absolute left-1/2 top-4 flex h-8 w-[230px] -translate-x-1/2 items-center justify-center font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--home-accent)]">
          <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#565b61]" />
          <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-[#565b61]" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#565b61]" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#565b61]" />
          <span>
            {"// "}
            {marker.number} — {marker.label}
          </span>
        </div>
      )}
    </motion.span>
  );
}

function BrutalistSectionTransition({
  progress,
  number,
  label,
}: {
  progress: MotionValue<number>;
  number: string;
  label: string;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -top-[72vh] z-20 grid h-[72vh] grid-cols-5 items-end overflow-hidden"
      aria-hidden="true"
    >
      {risingBlocks.map((block, index) => (
        <RisingBlock
          key={index}
          progress={progress}
          block={block}
          index={index}
          marker={index === 2 ? { number, label } : undefined}
        />
      ))}
    </div>
  );
}

function TransitionSection({
  children,
  id,
  number,
  label,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  number: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} id={id} className={`relative z-30 grid ${className}`}>
      <BrutalistSectionTransition
        progress={scrollYProgress}
        number={number}
        label={label}
      />
      {children}
    </div>
  );
}

export default function Main() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="relative w-full max-w-screen bg-[var(--section-bg)] text-[var(--text)]">
      <Header aiOpen={aiOpen} onAIToggle={() => setAiOpen((open) => !open)} />

      <div id="home" className="grid bg-[var(--section-bg)]">
        <Home />
        <TransitionSection id="about" number="02" label="About">
          <About />
        </TransitionSection>
        <TransitionSection number="03" label="Projects" className="mt-[30vh]">
          <Project />
        </TransitionSection>
        <TransitionSection number="04" label="Experience" className="mt-[30vh]">
          <Experience />
        </TransitionSection>
        <TransitionSection number="05" label="Contact" className="mt-[30vh]">
          <Contact />
        </TransitionSection>
      </div>
      <AIChat open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  );
}
