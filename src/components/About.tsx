"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, FolderGit2, Gamepad2, Languages, MapPin, Plane } from "lucide-react";
import {
  SiDocker,
  SiGit,
  SiJavascript,
  SiJunit5,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import {
  CornerMarks,
  DashboardButton,
  DashboardLabel,
  DashboardPanel,
} from "@/components/ui/DashboardPrimitives";

const skills = [
  ["React.js", SiReact],
  ["JavaScript", SiJavascript],
  ["TypeScript", SiTypescript],
  ["Python", SiPython],
  ["MySQL", SiMysql],
  ["Node.js", SiNodedotjs],
  ["Docker", SiDocker],
  ["Java", SiOpenjdk],
  ["Git", SiGit],
  ["JUnit", SiJunit5],
] as const;

const hobbies = [
  ["Reading books", "Stories, ideas, and new perspectives.", BookOpen],
  ["Traveling", "Exploring new cities, food, and cultures.", Plane],
  ["Video games", "Strategy, competition, and good stories.", Gamepad2],
] as const;

const learningTopics = [
  ["System design", 7],
  ["Go (Golang)", 5],
  ["Kubernetes", 6],
  ["Next.js", 7],
] as const;

function Panel({ children, className = "" }: React.ComponentProps<typeof DashboardPanel>) {
  return <DashboardPanel className={`p-5 lg:p-6 ${className}`}>{children}</DashboardPanel>;
}

function Label({ children, className = "" }: React.ComponentProps<typeof DashboardLabel>) {
  return <DashboardLabel className={`text-[11px] font-semibold ${className}`}>{children}</DashboardLabel>;
}

function TabButton({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <DashboardButton
      aria-pressed={active}
      className={`px-3 py-2 text-[10px] font-semibold tracking-[0.07em] ${
        active
          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)] hover:text-[var(--background)]"
          : "text-[var(--text-secondary)]"
      }`}
      onClick={onClick}
    >
      {children}
    </DashboardButton>
  );
}

function AboutIntro() {
  return (
    <div className="relative flex min-w-0 flex-col justify-center px-3 py-7 sm:px-6 xl:py-5">
      <CornerMarks />
      <h2 id="about-title" className="hero-name section-title">ABOUT ME</h2>
      <p className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
        {"// Get to know me"}
      </p>
      <p className="mt-5 max-w-[52ch] font-mono text-[13px] font-medium leading-6 text-[var(--text-soft)]">
        I&apos;m a software engineer who enjoys turning complex problems into clean, reliable web experiences. I
        recently graduated from Virginia Tech, where I worked on system optimization, automation tools, and
        user-interface development.
      </p>
    </div>
  );
}

function QuickStats() {
  const stats = [["Projects built", "5+"], ["Internships", "2"], ["Degree earned", "B.S."]];

  return (
    <Panel className="h-full">
      <Label>Quick stats</Label>
      <div className="mt-4">
        {stats.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between border-b border-[var(--border-muted)] py-2.5 font-mono uppercase">
            <span className="text-xs font-semibold text-[var(--text-soft)]">{label}</span>
            <span className="text-base font-bold text-[var(--text-primary)]">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 border-l-2 border-[var(--accent)] pl-3 font-mono uppercase">
        <p className="text-[10px] font-semibold tracking-[0.08em] text-[var(--text-secondary)]">Currently pursuing</p>
        <p className="mt-1 text-[13px] font-bold text-[var(--text-primary)]">M.S. Computer Science</p>
      </div>
    </Panel>
  );
}

function LocationAndWork() {
  return (
    <Panel className="flex h-full flex-col">
      <div className="grid grid-cols-2 gap-4">
        <div className="border-r border-[var(--border-muted)] pr-4">
          <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--text-soft)]">
            <MapPin className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" /> Location
          </p>
          <p className="mt-4 text-lg font-bold leading-tight text-[var(--text-primary)]">Washington, DC</p>
          <p className="mt-1 text-[15px] text-[var(--text-secondary)]">United States</p>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase text-[var(--text-soft)]">Work style</p>
          <div className="mt-4 space-y-3">
            {["Remote", "Hybrid", "On-site"].map((style) => (
              <div key={style} className="flex items-center justify-between text-sm font-bold text-[var(--text-primary)]">
                <span>{style}</span>
                <span className="h-2.5 w-2.5 bg-[var(--success)]" aria-label="Available" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto border border-[#3d5368] px-3 py-3">
        <p className="font-mono text-[11px] font-bold uppercase text-[var(--accent)]">Availability</p>
        <div className="mt-2 flex flex-wrap gap-2 font-mono text-[9px] font-semibold uppercase text-[var(--text-secondary)]">
          <span className="border border-[#3d5368] px-2 py-1">Open to relocation</span>
          <span className="border border-[#3d5368] px-2 py-1">ET (UTC−5)</span>
        </div>
      </div>
    </Panel>
  );
}

function LanguagesPanel() {
  return (
    <Panel className="flex h-full flex-col">
      <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--text-soft)]">
        <Languages className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" /> Languages
      </p>
      <div className="mt-4 divide-y divide-[var(--border-muted)]">
        {[["English", "Fluent"], ["Vietnamese", "Native"]].map(([language, level]) => (
          <div key={language} className="flex items-center justify-between gap-3 py-3">
            <span className="text-base font-bold text-[var(--text-primary)]">{language}</span>
            <span className="font-mono text-[10px] font-semibold uppercase text-[var(--accent)]">{level}</span>
          </div>
        ))}
      </div>
      <p className="mt-auto border-t border-[var(--border-muted)] pt-3 font-mono text-[10px] font-semibold uppercase text-[var(--text-soft)]">
        Bilingual communication
      </p>
    </Panel>
  );
}

function LatestNews() {
  const [activeTab, setActiveTab] = useState<"project" | "experience">("project");
  const isProject = activeTab === "project";

  return (
    <Panel className="min-h-[190px]">
      <div className="flex items-center gap-1 border-b border-[var(--border-muted)] pb-3">
        <TabButton active={isProject} onClick={() => setActiveTab("project")}>Latest project</TabButton>
        <TabButton active={!isProject} onClick={() => setActiveTab("experience")}>Latest experience</TabButton>
      </div>
      <div className="grid min-h-[104px] items-center gap-4 pt-4 sm:grid-cols-[68px_44px_minmax(0,1fr)]">
        <p className="font-mono text-xs uppercase text-[var(--text-primary)]">{isProject ? "Aug 2026" : "May 2025"}</p>
        <div className="grid h-11 w-11 place-items-center border border-[#36597a] text-[var(--accent)]">
          {isProject ? <FolderGit2 className="h-5 w-5" /> : <BriefcaseBusiness className="h-5 w-5" />}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-[var(--text-primary)] sm:text-lg">
            {isProject ? "The Odd One" : "Undergraduate Teaching Assistant"}
          </h3>
          <p className="mt-1 font-mono text-[9px] font-semibold uppercase text-[var(--accent)]">
            {isProject ? "Personal project · Latest release" : "Virginia Tech · May 2023—May 2025"}
          </p>
          <p className="mt-2 text-xs font-medium leading-5 text-[var(--text-soft)]">
            {isProject
              ? "I recently created The Odd One, the newest addition to my growing collection of software projects."
              : "Supported students through office hours, technical troubleshooting, and instruction across core computer science courses."}
          </p>
        </div>
      </div>
    </Panel>
  );
}

function SkillsPanel() {
  const [activeTab, setActiveTab] = useState<"skills" | "learning">("skills");

  return (
    <Panel>
      <div className="flex items-center gap-1 border-b border-[var(--border-muted)] pb-3">
        <TabButton active={activeTab === "skills"} onClick={() => setActiveTab("skills")}>Top skills</TabButton>
        <TabButton active={activeTab === "learning"} onClick={() => setActiveTab("learning")}>Currently learning</TabButton>
      </div>
      {activeTab === "skills" ? (
        <div className="mt-4 grid min-h-[472px] grid-cols-2 content-start gap-2 md:min-h-[376px] md:grid-cols-3 xl:min-h-[184px] xl:grid-cols-5">
          {skills.map(([label, Icon]) => (
            <div key={label} className="relative grid h-[88px] place-items-center border border-[var(--border-strong)] p-3">
              <Icon className="text-3xl text-[var(--text-primary)]" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold uppercase text-[var(--text-primary)]">{label}</span>
              <CornerMarks />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid min-h-[472px] grid-cols-2 content-start gap-2 md:min-h-[376px] md:grid-cols-4 xl:min-h-[184px]">
          {learningTopics.map(([label, progress]) => (
            <div key={label} className="relative min-h-[88px] border border-[var(--border)] px-3 py-4">
              <p className="font-mono text-[10px] font-semibold uppercase text-[var(--text-primary)]">{label}</p>
              <div className="mt-5 grid grid-cols-10 gap-1">
                {Array.from({ length: 10 }, (_, index) => (
                  <span key={index} className={`h-1 ${index < progress ? "bg-[var(--accent)]" : "bg-[#30343a]"}`} />
                ))}
              </div>
              <CornerMarks />
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

function Hobbies() {
  return (
    <Panel>
      <Label>Hobbies</Label>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {hobbies.map(([label, description, Icon]) => (
          <div key={label} className="relative flex min-h-16 items-center gap-3 border border-[var(--border)] px-3 py-2">
            <Icon className="h-5 w-5 shrink-0 text-[var(--text-secondary)]" strokeWidth={1.5} aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-[var(--text-primary)]">{label}</p>
              <p className="mt-1 text-[10px] font-medium leading-4 text-[var(--text-secondary)]">{description}</p>
            </div>
            <span className="absolute right-2 top-2 font-mono text-[11px] text-[var(--accent)]">↓</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export default function About() {
  return (
    <section
      className="relative z-30 min-h-screen overflow-hidden bg-[var(--section-bg)] px-4 pb-8 pt-[calc(var(--home-header-height)+32px)] text-[var(--text-primary)] sm:px-6 lg:px-8"
      aria-labelledby="about-title"
    >
      <motion.main
        className="relative mx-auto w-full max-w-[1440px] space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.55 }}
      >
        <section className="grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,35fr)_minmax(0,20fr)_minmax(0,27fr)_minmax(0,18fr)]">
          <AboutIntro />
          <QuickStats />
          <LocationAndWork />
          <LanguagesPanel />
        </section>
        <section className="grid gap-3">
          <SkillsPanel />
          <div className="grid items-stretch gap-3 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <Hobbies />
            <LatestNews />
          </div>
        </section>
      </motion.main>
    </section>
  );
}
