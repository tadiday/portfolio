"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, FolderGit2, Gamepad2, Languages, MapPin, Plane } from "lucide-react";
import { SiDocker, SiGit, SiJavascript, SiJunit5, SiMysql, SiNodedotjs, SiOpenjdk, SiPython, SiReact, SiTypescript } from "react-icons/si";
import { CornerMarks, DashboardLabel, DashboardPanel } from "@/components/ui/DashboardPrimitives";

const skills = [
  ["React.js", SiReact], ["JavaScript", SiJavascript], ["TypeScript", SiTypescript],
  ["Python", SiPython], ["MySQL", SiMysql], ["Node.js", SiNodedotjs],
  ["Docker", SiDocker], ["Java", SiOpenjdk], ["Git", SiGit], ["JUnit", SiJunit5],
] as const;

const hobbies = [
  ["Reading books", "Stories, ideas, and new perspectives.", BookOpen],
  ["Traveling", "Exploring new cities, food, and cultures.", Plane],
  ["Video games", "Strategy, competition, and good stories.", Gamepad2],
] as const;
const learning = [["System design", 7], ["Go (Golang)", 5], ["Kubernetes", 6], ["Next.js", 7]] as const;
const activity = Array.from({ length: 364 }, (_, index) => (index * 17 + Math.floor(index / 7) * 11) % 4);

function Panel({ children, className = "" }: React.ComponentProps<typeof DashboardPanel>) {
  return <DashboardPanel className={`p-5 lg:p-6 ${className}`}>{children}</DashboardPanel>;
}

function Label({ children, className = "" }: React.ComponentProps<typeof DashboardLabel>) {
  return <DashboardLabel className={`text-[11px] font-semibold ${className}`}>{children}</DashboardLabel>;
}

function AboutIntro() {
  return <div className="relative flex min-w-0 flex-col justify-center px-3 py-7 sm:px-6 xl:py-5">
    <CornerMarks />
    <h2 id="about-title" className="hero-name section-title">ABOUT ME</h2>
    <p className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--home-accent)]">{"// Get to know me"}</p>
    <p className="mt-5 max-w-[52ch] font-mono text-[13px] font-medium leading-6 text-[#d0d3d6]">I&apos;m a software engineer who enjoys turning complex problems into clean, reliable web experiences. I recently graduated from Virginia Tech, where I worked on system optimization, automation tools, and user-interface development.</p>
  </div>;
}

function QuickStats() {
  const stats = [["Projects built", "5+"], ["Internships", "2"], ["Degree earned", "B.S."]];
  return <Panel className="h-full"><Label>Quick stats</Label><div className="mt-4">{stats.map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-white/10 py-2.5 font-mono uppercase"><span className="text-xs font-semibold text-[#d0d3d6]">{label}</span><span className="text-base font-bold text-white">{value}</span></div>)}</div><div className="mt-5 border-l-2 border-[var(--home-accent)] pl-3 font-mono uppercase"><p className="text-[10px] font-semibold tracking-[0.08em] text-[#b7bbc0]">Currently pursuing</p><p className="mt-1 text-[13px] font-bold text-white">M.S. Computer Science</p></div></Panel>;
}

function LocationAndWork() {
  return <Panel className="flex h-full flex-col">
    <div className="grid grid-cols-2 gap-4">
      <div className="border-r border-white/10 pr-4">
        <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#d0d3d6]"><MapPin className="h-4 w-4 text-[var(--home-accent)]" aria-hidden="true" />Location</p>
        <p className="mt-4 text-l font-bold leading-tight text-white">Washington, DC</p><p className="mt-1 text-[15px] text-[#b7bbc0]">United States</p>
      </div>
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#d0d3d6]">Work style</p>
        <div className="mt-4 space-y-3">{["Remote", "Hybrid", "On-site"].map((style) => <div key={style} className="flex items-center justify-between text-sm font-bold text-[#f2f2f2]"><span>{style}</span><span className="h-2.5 w-2.5 bg-[#2bd576]" aria-label="Available" /></div>)}</div>
      </div>
    </div>
    <div className="mt-auto border border-[#3d5368] px-3 py-3">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--home-accent)]">Availability</p>
      <div className="mt-2 flex flex-wrap gap-2 font-mono text-[9px] font-semibold uppercase text-[#d5d7da]"><span className="border border-[#3d5368] px-2 py-1">Open to relocation</span><span className="border border-[#3d5368] px-2 py-1">ET (UTC−5)</span></div>
    </div>
  </Panel>;
}

function LanguagesPanel() {
  return <Panel className="flex h-full flex-col">
    <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#d0d3d6]"><Languages className="h-4 w-4 text-[var(--home-accent)]" aria-hidden="true" />Languages</p>
    <div className="mt-4 divide-y divide-white/10">
      <div className="flex items-center justify-between gap-3 py-3"><span className="text-base font-bold text-white">English</span><span className="font-mono text-[10px] font-semibold uppercase text-[var(--home-accent)]">Fluent</span></div>
      <div className="flex items-center justify-between gap-3 py-3"><span className="text-base font-bold text-white">Vietnamese</span><span className="font-mono text-[10px] font-semibold uppercase text-[var(--home-accent)]">Native</span></div>
    </div>
    <p className="mt-auto border-t border-white/10 pt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#d0d3d6]">Bilingual communication</p>
  </Panel>;
}

function LatestNews() {
  const [tab, setTab] = useState<"project" | "experience">("project");
  const project = tab === "project";

  return <Panel className="min-h-[190px]">
    <div className="flex items-center gap-1 border-b border-white/10 pb-3">
      <button type="button" onClick={() => setTab("project")} aria-pressed={project} className={`border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] transition-colors ${project ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[#08090a]" : "border-[#3d4146] text-[#b7bbc0] hover:text-white"}`}>Latest project</button>
      <button type="button" onClick={() => setTab("experience")} aria-pressed={!project} className={`border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] transition-colors ${!project ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[#08090a]" : "border-[#3d4146] text-[#b7bbc0] hover:text-white"}`}>Latest experience</button>
    </div>
    <div className="grid min-h-[104px] items-center gap-4 pt-4 sm:grid-cols-[68px_44px_minmax(0,1fr)]">
      <p className="font-mono text-xs uppercase text-white">{project ? "Aug 2026" : "May 2025"}</p>
      <div className="grid h-11 w-11 place-items-center border border-[#36597a] text-[var(--home-accent)]">{project ? <FolderGit2 className="h-5 w-5" aria-hidden="true" /> : <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />}</div>
      <div className="min-w-0">{project ? <><h3 className="text-base font-bold text-white sm:text-lg">The Odd One</h3><p className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-[var(--home-accent)]">Personal project · Latest release</p><p className="mt-2 text-xs font-medium leading-5 text-[#d0d3d6]">I recently created The Odd One, the newest addition to my growing collection of software projects.</p></> : <><h3 className="text-base font-bold text-white sm:text-lg">Undergraduate Teaching Assistant</h3><p className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-[var(--home-accent)]">Virginia Tech · May 2023—May 2025</p><p className="mt-2 text-xs font-medium leading-5 text-[#d0d3d6]">Supported students through office hours, technical troubleshooting, and instruction across core computer science courses.</p></>}</div>
    </div>
  </Panel>;
}

function SkillsPanel() {
  const [tab, setTab] = useState<"skills" | "learning">("skills");

  return <Panel>
    <div className="flex items-center gap-1 border-b border-white/10 pb-3">
      <button type="button" onClick={() => setTab("skills")} aria-pressed={tab === "skills"} className={`border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] transition-colors ${tab === "skills" ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[#08090a]" : "border-[#3d4146] text-[#b7bbc0] hover:text-white"}`}>Top skills</button>
      <button type="button" onClick={() => setTab("learning")} aria-pressed={tab === "learning"} className={`border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] transition-colors ${tab === "learning" ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[#08090a]" : "border-[#3d4146] text-[#b7bbc0] hover:text-white"}`}>Currently learning</button>
    </div>
    {tab === "skills" ? <div className="mt-4 grid min-h-[472px] grid-cols-2 content-start gap-2 md:min-h-[376px] md:grid-cols-3 xl:min-h-[184px] xl:grid-cols-5">{skills.map(([label, Icon]) => <div key={label} className="relative grid h-[88px] min-w-0 place-items-center border border-[#4c5054] p-3"><Icon className="text-3xl text-[#f2f2f2]" aria-hidden="true" /><span className="font-mono text-[10px] font-bold uppercase text-[#e8eaec]">{label}</span><span className="absolute left-1 top-1 h-1.5 w-1.5 border-l border-t border-white/55" /><span className="absolute bottom-1 right-1 h-1.5 w-1.5 border-b border-r border-white/55" /></div>)}</div>
      : <div className="mt-4 grid min-h-[472px] grid-cols-2 content-start gap-2 md:min-h-[376px] md:grid-cols-4 xl:min-h-[184px]">{learning.map(([label, progress]) => <div key={label} className="relative min-h-[88px] border border-[#3d4146] px-3 py-4"><p className="font-mono text-[10px] font-semibold uppercase text-[#e0e2e4]">{label}</p><div className="mt-5 grid grid-cols-10 gap-1">{Array.from({ length: 10 }, (_, index) => <span key={index} className={`h-1 ${index < progress ? "bg-[var(--home-accent)]" : "bg-[#30343a]"}`} />)}</div><span className="absolute left-1 top-1 h-1.5 w-1.5 border-l border-t border-white/55" /><span className="absolute bottom-1 right-1 h-1.5 w-1.5 border-b border-r border-white/55" /></div>)}</div>}
  </Panel>;
}

function Hobbies() {
  return <Panel><Label>Hobbies</Label>
    <div className="mt-4 grid gap-2 md:grid-cols-3">{hobbies.map(([label, description, Icon]) => <div key={label} className="relative flex min-h-16 items-center gap-3 border border-[#3d4146] px-3 py-2"><Icon className="h-5 w-5 shrink-0 text-[#c5c8cc]" strokeWidth={1.5} aria-hidden="true" /><div className="min-w-0"><p className="text-xs font-bold text-white">{label}</p><p className="mt-1 text-[10px] font-medium leading-4 text-[#b7bbc0]">{description}</p></div><span className="absolute right-2 top-2 font-mono text-[11px] text-[var(--home-accent)]">↓</span></div>)}</div>
  </Panel>;
}

function ProjectActivity() {
  const [tab, setTab] = useState<"github" | "leetcode">("github");
  const github = tab === "github";
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  return <Panel className="flex h-full flex-col">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
      <div className="flex items-center gap-1"><button type="button" onClick={() => setTab("github")} aria-pressed={github} className={`border px-3 py-2 font-mono text-[10px] font-semibold uppercase ${github ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[#08090a]" : "border-[#3d4146] text-[#b7bbc0]"}`}>GitHub</button><button type="button" onClick={() => setTab("leetcode")} aria-pressed={!github} className={`border px-3 py-2 font-mono text-[10px] font-semibold uppercase ${!github ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[#08090a]" : "border-[#3d4146] text-[#b7bbc0]"}`}>LeetCode</button></div>
      <a href={github ? "https://github.com/tadiday" : "https://leetcode.com/"} target="_blank" rel="noreferrer" className="font-mono text-[11px] font-semibold uppercase text-[var(--home-accent)] hover:text-white">View {github ? "GitHub" : "LeetCode"} →</a>
    </div>
    <div className="my-auto py-6"><div className="mb-3 flex justify-between font-mono text-[9px] font-semibold uppercase text-[#c0c3c7]">{months.map((month, index) => <span key={`${month}-${index}`}>{month}</span>)}</div><div className="grid grid-flow-col grid-rows-7 grid-cols-[repeat(52,minmax(3px,1fr))] gap-px sm:gap-[2px]">{activity.map((level, index) => { const displayLevel = github ? level : (level + index * 3) % 4; return <span key={index} className={`h-2.5 min-w-0 ${displayLevel === 3 ? "bg-[#5da7ff]" : displayLevel === 2 ? "bg-[#3974ad]" : displayLevel === 1 ? "bg-[#263f57]" : "bg-[#252a30]"}`} />; })}</div></div>
    <div className="flex justify-between border-t border-white/10 pt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.04em] text-[#d0d3d6]"><span>{github ? "Building in public" : "Problem solving"}</span><span className="text-[var(--home-accent)]">{github ? "Always learning" : "Consistent practice"}</span></div>
  </Panel>;
}

void ProjectActivity;

export default function About() {
  return <section className="relative z-30 min-h-screen overflow-hidden bg-[var(--section-bg)] px-4 pb-8 pt-[calc(var(--home-header-height)+32px)] text-[#e8e9e9] sm:px-6 lg:px-8" aria-labelledby="about-title">
    <motion.main className="relative mx-auto w-full max-w-[1440px] space-y-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55 }}>
      <section className="grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,35fr)_minmax(0,20fr)_minmax(0,27fr)_minmax(0,18fr)]"><AboutIntro /><QuickStats /><LocationAndWork /><LanguagesPanel /></section>
      <section className="grid gap-3">
        <SkillsPanel />
        <div className="grid items-stretch gap-3 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"><Hobbies /><LatestNews /></div>
      </section>
    </motion.main>
  </section>;
}
