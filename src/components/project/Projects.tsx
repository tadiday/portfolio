"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, FolderGit2, Gauge, GitBranch, Github, Globe2, Mail, ReceiptText, UtensilsCrossed, X } from "lucide-react";
import { CornerMarks, DashboardLabel, DashboardPanel } from "@/components/ui/DashboardPrimitives";

type Category = "Web application" | "Mobile application" | "Experiment";

const projects = [
  { title: "The Odd One", date: "Aug 2026", category: "Web application" as Category, kind: "Personal project", role: "Full-stack developer", description: "A real-time multiplayer party game where players answer prompts and try to find the imposter.", tech: ["Vue 3", "TypeScript", "Node.js", "WebSockets", "Tailwind"], features: ["Real-time multiplayer rooms", "Multiple game phases and voting", "Randomized roles and room settings"], challenge: "Keeping every player synchronized through reconnects and rapid game-state changes.", learning: "Designing event-driven systems and predictable multiplayer state.", github: "", website: "", preview: "", Icon: FolderGit2 },
  { title: "Web Portfolio", date: "2025", category: "Web application" as Category, kind: "Personal project", role: "Designer & developer", description: "A responsive portfolio built to showcase projects, experience, and research through a focused interactive interface.", tech: ["React.js", "TypeScript", "Next.js", "Tailwind", "Motion"], features: ["Responsive section layouts", "Interactive project presentation", "Motion and technical UI details"], challenge: "Balancing expressive visuals with performance, accessibility, and responsive behavior.", learning: "Building a consistent design system and reusable component architecture.", github: "https://github.com/tadiday/Website-Portfolio", website: "https://peter-cao.com", preview: "/assets/gif/webport.mp4", Icon: Globe2 },
  { title: "Traffic Dashboard", date: "2025", category: "Web application" as Category, kind: "Academic project", role: "Full-stack developer", description: "An interactive traffic visualization dashboard with authentication, data uploads, and dynamic environment displays.", tech: ["React.js", "Node.js", "Express", "MySQL", "Chart.js"], features: ["Secure user authentication", "Traffic-data upload workflow", "Interactive charts and environments"], challenge: "Transforming complex simulation output into clear, responsive visualizations.", learning: "Data visualization, API design, and performance-focused rendering.", github: "https://github.com/tadiday/Traffic_Dashboard", website: "", preview: "/assets/gif/traffic.mp4", Icon: Gauge },
  { title: "Simplisplit", date: "2024", category: "Mobile application" as Category, kind: "Product project", role: "Mobile developer", description: "A mobile app that scans bills and helps groups split costs with friends quickly and accurately.", tech: ["React Native", "Python", "Flask", "Tailwind"], features: ["Receipt scanning workflow", "Itemized group splitting", "Mobile-first interaction design"], challenge: "Turning imperfect receipt data into a simple and understandable splitting flow.", learning: "Mobile UX, API integration, and resilient input handling.", github: "", website: "", preview: "/assets/gif/simplisplit.mp4", Icon: ReceiptText },
  { title: "Food Swipe", date: "2022", category: "Experiment" as Category, kind: "Personal project", role: "Full-stack developer", description: "A swipe-based restaurant discovery experience for finding nearby dining options tailored to the user.", tech: ["React.js", "TypeScript", "Next.js", "Node.js", "Maps API"], features: ["Swipe-based discovery", "Location-aware restaurant results", "Detailed restaurant cards"], challenge: "Combining location data and discovery controls without overwhelming the interface.", learning: "Geolocation APIs, gesture-driven UI, and recommendation flows.", github: "https://github.com/tadiday/Food-Swipe", website: "", preview: "/assets/gif/foodswipe.mp4", Icon: UtensilsCrossed },
];

const filters = ["All projects", "Web application", "Mobile application", "Experiment"] as const;
type Filter = typeof filters[number];

const Panel = DashboardPanel;
const Corners = CornerMarks;

function Label({ children }: React.ComponentProps<typeof DashboardLabel>) {
  return <DashboardLabel className="text-xs font-bold">{children}</DashboardLabel>;
}

type ProjectItem = typeof projects[number];

function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/85 px-3 pb-3 pt-[calc(var(--home-header-height)+12px)] sm:px-6 sm:pb-6" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="relative max-h-[calc(100svh-var(--home-header-height)-24px)] w-full max-w-[1280px] overflow-y-auto border border-[#666b70] bg-[#08090a] px-5 pb-5 pt-16 text-white sm:px-7 sm:pb-7 sm:pt-16"><Corners /><button type="button" onClick={onClose} aria-label="Close project details" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center border border-[#666b70] bg-[#08090a] hover:border-[var(--home-accent)] hover:text-[var(--home-accent)]"><X className="h-5 w-5" /></button>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)]"><div className="min-w-0 pr-2"><p className="font-mono text-[10px] font-bold text-[var(--home-accent)]">01</p><h2 id="project-modal-title" className="mt-3 text-3xl font-bold sm:text-4xl">{project.title}</h2><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--home-accent)]">{project.category} · {project.kind}</p><p className="mt-5 text-sm font-medium leading-6 text-[#d0d3d6]">{project.description}</p>
        <div className="mt-6 border-t border-white/10 pt-5"><Label>Technologies</Label><div className="mt-3 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="border border-[#44494e] px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase text-[#d8dade]">{tech}</span>)}</div></div><div className="mt-6"><Label>Key features</Label><ul className="mt-3 space-y-2">{project.features.map((feature) => <li key={feature} className="flex gap-3 text-xs leading-5 text-[#d0d3d6]"><span className="text-[var(--home-accent)]">+</span>{feature}</li>)}</ul></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div><Label>Challenge</Label><p className="mt-2 text-xs leading-5 text-[#b8bdc2]">{project.challenge}</p></div><div><Label>Learning</Label><p className="mt-2 text-xs leading-5 text-[#b8bdc2]">{project.learning}</p></div></div></div>
        <div className="flex min-w-0 flex-col"><div className="relative grid min-h-[300px] flex-1 place-items-center overflow-hidden border border-[#4b5055] bg-[#0b0d0f] sm:min-h-[430px]">{project.preview ? <video autoPlay muted loop playsInline className="h-full max-h-[560px] w-full object-contain"><source src={project.preview} type="video/mp4" /></video> : <div className="grid place-items-center gap-5 text-center"><project.Icon className="h-20 w-20 text-[var(--home-accent)]" strokeWidth={1.2} /><p className="font-mono text-xs uppercase tracking-[0.15em] text-[#aeb3b8]">Preview coming soon</p></div>}<Corners /></div><div className="grid gap-4 border-x border-b border-[#4b5055] p-4 font-mono uppercase sm:grid-cols-3"><div><p className="text-[8px] text-[#8f959b]">Date</p><p className="mt-1 text-[11px] font-bold">{project.date}</p></div><div><p className="text-[8px] text-[#8f959b]">Role</p><p className="mt-1 text-[11px] font-bold">{project.role}</p></div><div className="flex items-end gap-4 sm:justify-end">{project.website && <a href={project.website} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[var(--home-accent)]">View live →</a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-white">GitHub ↗</a>}</div></div></div></div>
    </div>
  </div>;
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All projects");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const filtered = useMemo(() => filter === "All projects" ? projects : projects.filter((project) => project.category === filter), [filter]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 3));
  const visible = filtered.slice(page * 3, page * 3 + 3);

  const chooseFilter = (next: Filter) => { setFilter(next); setPage(0); };

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return <section id="projects" className="relative z-30 min-h-screen overflow-hidden border-t border-[#34383d] bg-[#08090a] px-4 pb-8 pt-[calc(var(--home-header-height)+32px)] text-[#e8e9e9] sm:px-6 lg:px-8">
    <motion.main className="mx-auto w-full max-w-[1440px] space-y-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55 }}>
      <section className="grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.95fr)] xl:grid-cols-[minmax(0,1.5fr)_minmax(0,.7fr)_minmax(0,.7fr)]">
        <div className="relative flex min-h-[205px] flex-col justify-center px-4 py-7 sm:px-8 xl:flex-row xl:items-center xl:gap-10">
          <Corners /><h2 className="hero-name text-[clamp(4rem,7vw,6.5rem)]">PROJECTS</h2>
          <div className="mt-5 max-w-[34ch] xl:mt-0"><p className="flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--home-accent)]">Things I&apos;ve built <span className="text-lg text-[#a4a9af]">+</span></p><p className="mt-4 font-mono text-[13px] font-medium leading-6 text-[#d0d3d6]">A collection of personal projects and experiments. Each one taught me something new and pushed me to grow as a developer.</p></div>
        </div>

        <Panel className="p-5 lg:p-6"><Label>Filter projects</Label><div className="mt-4 space-y-1">{filters.map((item) => { const count = item === "All projects" ? projects.length : projects.filter((project) => project.category === item).length; return <button key={item} type="button" onClick={() => chooseFilter(item)} className={`flex w-full items-center justify-between px-3 py-2 font-mono text-[11px] font-bold uppercase transition-colors ${filter === item ? "bg-[var(--home-accent)] text-[#08090a]" : "text-[#d8dade] hover:bg-white/5"}`}><span>{item === "All projects" ? item : `${item}s`}</span><span>{String(count).padStart(2, "0")}</span></button>; })}</div></Panel>

        <Panel className="p-5 lg:col-span-2 lg:p-6 xl:col-span-1"><Label>Explore more</Label><div className="mt-4 divide-y divide-white/10 border-y border-white/10">
          <a href="https://github.com/tadiday" target="_blank" rel="noreferrer" className="group flex items-center gap-3 py-3 text-white hover:text-[var(--home-accent)]"><Github className="h-4 w-4" aria-hidden="true" /><span className="font-mono text-[11px] font-bold uppercase">GitHub profile</span><ExternalLink className="ml-auto h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          <a href="/assets/documents/resume.pdf" target="_blank" rel="noreferrer" className="group flex items-center gap-3 py-3 text-white hover:text-[var(--home-accent)]"><FileText className="h-4 w-4" aria-hidden="true" /><span className="font-mono text-[11px] font-bold uppercase">View résumé</span><ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></a>
          <a href="#contact" className="group flex items-center gap-3 py-3 text-white hover:text-[var(--home-accent)]"><Mail className="h-4 w-4" aria-hidden="true" /><span className="font-mono text-[11px] font-bold uppercase">Start a conversation</span><ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></a>
        </div></Panel>
      </section>

      <Panel className="p-4 sm:p-5"><Label>{filter}</Label><div className="mt-4 divide-y divide-white/10 lg:h-[440px]">
        {visible.map((project, index) => <article key={project.title} role="button" tabIndex={0} onClick={() => setSelected(project)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(project); }} className="group relative grid cursor-pointer gap-4 py-2 outline-none transition-colors first:pt-0 hover:bg-white/[0.02] focus-visible:bg-white/[0.04] lg:grid-cols-[36px_190px_minmax(0,1fr)_190px] lg:items-center">
          <span className="pointer-events-none absolute left-1 top-1 h-2.5 w-2.5 border-l border-t border-[var(--home-accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" /><span className="pointer-events-none absolute right-1 top-1 h-2.5 w-2.5 border-r border-t border-[var(--home-accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" /><span className="pointer-events-none absolute bottom-1 left-1 h-2.5 w-2.5 border-b border-l border-[var(--home-accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" /><span className="pointer-events-none absolute bottom-1 right-1 h-2.5 w-2.5 border-b border-r border-[var(--home-accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
          <span className="font-mono text-xs font-bold text-white">{String(page * 3 + index + 1).padStart(2, "0")}</span>
          <div className="relative grid min-h-[100px] place-items-center border border-[#4b5055] text-[var(--home-accent)]"><project.Icon className="h-9 w-9" strokeWidth={1.5} aria-hidden="true" /><span className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-white/55" /><span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-white/55" /></div>
          <div className="min-w-0 lg:px-2"><h3 className="text-xl font-bold text-white">{project.title}</h3><p className="mt-1 font-mono text-[10px] font-bold uppercase text-[var(--home-accent)]">{project.category}</p><p className="mt-3 max-w-[64ch] text-[13px] font-medium leading-5 text-[#d5d7da]">{project.description}</p><div className="mt-3 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="border border-[#3d4146] px-2 py-1 font-mono text-[9px] font-bold uppercase text-[#dde0e2]">{tech}</span>)}</div></div>
          <div className="border-white/10 font-mono uppercase lg:border-l lg:pl-6"><p className="text-[11px] font-bold text-white">{project.date}</p><p className="mt-2 text-[10px] font-bold text-[var(--home-accent)]">{project.kind}</p><div className="mt-6 space-y-3"><span className="flex items-center gap-2 text-[11px] font-bold text-[var(--home-accent)]">View details <ArrowRight className="h-4 w-4" /></span>{project.github ? <a onClick={(event) => event.stopPropagation()} href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-bold text-white hover:text-[var(--home-accent)]">GitHub <ExternalLink className="h-4 w-4" /></a> : <span className="flex items-center gap-2 text-[10px] font-semibold text-[#aeb3b8]"><GitBranch className="h-4 w-4" />Private / pending</span>}</div></div>
        </article>)}
      </div></Panel>

      <Panel className="flex items-center justify-between px-5 py-3 font-mono text-[11px] font-bold uppercase"><button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} className="flex items-center gap-2 text-[var(--home-accent)] disabled:opacity-25"><ArrowLeft className="h-4 w-4" />Prev</button><span className="text-white">{String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span><button type="button" onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))} disabled={page >= pageCount - 1} className="flex items-center gap-2 text-[var(--home-accent)] disabled:opacity-25">Next<ArrowRight className="h-4 w-4" /></button></Panel>
    </motion.main>
    {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
  </section>;
}
