import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

function ButtonCornerMarks() {
  return (
    <>
      <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 border-l-2 border-t-2 border-current" aria-hidden="true" />
      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 border-r-2 border-t-2 border-current" aria-hidden="true" />
      <span className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 border-b-2 border-l-2 border-current" aria-hidden="true" />
      <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 border-b-2 border-r-2 border-current" aria-hidden="true" />
    </>
  );
}

function HeroDecorations() {
  return (
    <>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-axis hidden sm:block" aria-hidden="true" />
      <div className="hero-texture" aria-hidden="true" />
      <div className="hero-hud hidden sm:block" aria-hidden="true">
        <span className="hero-crosshair hero-crosshair-left">+</span>
        <span className="hero-crosshair hero-crosshair-right">+</span>
        <span className="hero-crosshair hero-crosshair-top">+</span>
        <span className="hero-scroll-cue">
          <motion.span
            className="block"
            animate={{ y: [-7, 7, -7], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
          >
            <span className="hero-scroll-cue-shape" />
          </motion.span>
        </span>
        <span className="hero-ticks" />
        <span className="hero-ticks hero-ticks-right" />
      </div>
    </>
  );
}

function HeroTitle() {
  return (
    <>
      <motion.div
        className="hero-name-frame relative w-full px-2.5 py-6 sm:px-[clamp(22px,4vw,58px)] sm:py-[clamp(26px,4vw,58px)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="hero-bracket hero-bracket-top-left" aria-hidden="true" />
        <span className="hero-bracket hero-bracket-top-right" aria-hidden="true" />
        <h1 id="home-title" className="hero-name text-[clamp(3.6rem,20vw,6rem)] sm:text-[clamp(4rem,11.2vw,10.75rem)]">
          PETER CAO
        </h1>
        <span className="hero-bracket hero-bracket-bottom-left" aria-hidden="true" />
        <span className="hero-bracket hero-bracket-bottom-right" aria-hidden="true" />
      </motion.div>

      <motion.p
        className="mt-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.17em] text-[var(--home-accent)] sm:gap-[clamp(22px,3.5vw,52px)] sm:text-[clamp(12px,1.35vw,18px)] sm:tracking-[0.32em] max-[900px]:tracking-[0.22em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="text-lg tracking-normal text-[var(--home-muted)]" aria-hidden="true">+</span>
        Software Engineer
        <span className="text-lg tracking-normal text-[var(--home-muted)]" aria-hidden="true">+</span>
      </motion.p>
    </>
  );
}

function HeroDivider() {
  return (
    <motion.div
      className="mt-[clamp(18px,2.8vh,30px)] flex w-[min(360px,72vw)] items-center gap-2 text-[var(--home-muted)]"
      initial={{ opacity: 0, scaleX: 0.8 }}
      animate={{ opacity: 0.8, scaleX: 1 }}
      transition={{ delay: 0.58, duration: 0.55 }}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current" />
      <span className="h-0.5 w-0.5 bg-current" />
      <span className="h-0.5 w-0.5 bg-current" />
      <span className="h-1.5 w-6 bg-[var(--home-text)] shadow-[0_0_7px_currentColor]" />
      <span className="h-0.5 w-0.5 bg-current" />
      <span className="h-0.5 w-0.5 bg-current" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current" />
    </motion.div>
  );
}

function HeroActions() {
  const buttonBase = "group relative flex h-[46px] w-full items-center justify-between border border-[var(--border)] px-[26px] font-mono text-xs uppercase tracking-[0.06em] shadow-[var(--button-shadow)] transition duration-150 hover:-translate-y-0.5 hover:border-[var(--home-accent)] sm:h-[54px] sm:w-[clamp(200px,17vw,250px)]";

  return (
    <motion.div className="mt-[clamp(22px,3.4vh,38px)] flex w-[min(280px,90vw)] flex-col gap-3 sm:w-auto sm:flex-row sm:gap-7" {...reveal} transition={{ delay: 0.8, duration: 0.5 }}>
      <a className={`${buttonBase} bg-[var(--home-text)] text-[var(--home-bg)] hover:bg-[var(--home-accent)] hover:text-[var(--home-text)]`} href="#projects">
        <ButtonCornerMarks />View my work <ArrowRight className="w-[17px]" aria-hidden="true" />
      </a>
      <a className={`${buttonBase} bg-[var(--surface)] text-[var(--home-text)] hover:bg-[var(--home-text)] hover:text-[var(--home-bg)]`} href="/assets/documents/resume.pdf" download>
        <ButtonCornerMarks />Download resume <ArrowDown className="w-[17px]" aria-hidden="true" />
      </a>
    </motion.div>
  );
}

export default function Home() {
  return (
    <section className="home-page relative grid min-h-[100svh] overflow-hidden bg-[var(--home-bg)] text-[var(--home-text)] [isolation:isolate]" aria-labelledby="home-title">
      <HeroDecorations />
      <main className="home-content z-[2] flex w-[91vw] max-w-[1080px] place-self-center flex-col items-center pb-[calc(var(--home-status-height)+10px)] pt-[calc(var(--home-header-height)+28px)] text-center sm:w-[88vw] sm:pb-[calc(var(--home-status-height)+18px)]">
        <HeroTitle />
        <HeroDivider />
        <motion.p className="mt-[clamp(16px,2.4vh,26px)] w-[min(340px,90vw)] font-mono text-[clamp(11px,1.05vw,15px)] leading-[1.65] tracking-[0.025em] text-[var(--text-secondary)] sm:w-auto sm:leading-[1.8]" {...reveal} transition={{ delay: 0.65, duration: 0.5 }}>
          I build robust, scalable, and beautiful web applications<br className="hidden sm:block" /> with a focus on clean code and great user experiences.
        </motion.p>
        <HeroActions />
      </main>
    </section>
  );
}
