"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Bot, BriefcaseBusiness, ChevronDown, Code2, Cpu, ExternalLink, GraduationCap, Users } from "lucide-react";

const experiences = [
  { start: "Jan 2026", end: "Present", title: "M.S. in Computer Science", company: "George Mason University", location: "Fairfax, VA", type: "Education", Icon: GraduationCap, link: "https://cs.gmu.edu/", bullets: ["Currently pursuing a Master of Science in Computer Science."], skills: ["Computer Science"] },
  { start: "May 2023", end: "May 2025", title: "Undergraduate Teaching Assistant", company: "Virginia Tech · CS Department", location: "Blacksburg, VA", type: "Leadership", Icon: Users, link: "https://cs.vt.edu/", bullets: ["Hosted office hours, troubleshot technical issues, and provided personalized guidance to students.", "Supported Computer Organization, Computer Systems, and Comparative Languages courses.", "Facilitated online discussions to strengthen student engagement and understanding."], skills: ["C", "x86", "RISC-V", "Rust", "Haskell"] },
  { start: "Aug 2024", end: "Dec 2024", title: "Software Engineer Co-op", company: "Peraton", location: "Blacksburg, VA", type: "Co-op", Icon: BriefcaseBusiness, link: "https://www.peraton.com/", bullets: ["Contributed to the development and maintenance of a cyber-threat intelligence platform.", "Improved build processes, resolved issues, and updated dependencies to strengthen reliability.", "Collaborated across teams to document and deliver secure functionality improvements."], skills: ["Java", "JavaScript", "Maven", "JUnit", "Docker"] },
  { start: "Jan 2024", end: "Dec 2024", title: "Rural Trash Collection", company: "Virginia Tech · IDPro", location: "Blacksburg, VA", type: "Research", Icon: Bot, link: "https://idpro.enge.vt.edu/", bullets: ["Developed an automated trash collection robot with remote monitoring and operation.", "Integrated sensors for autonomous navigation, obstacle avoidance, and safe collection.", "Researched path-planning algorithms to improve functionality and reliability."], skills: ["Python", "ROS", "OpenCV", "Raspberry Pi"] },
  { start: "Sep 2023", end: "Dec 2023", title: "SMART Research", company: "Virginia Tech · IDPro", location: "Blacksburg, VA", type: "Research", Icon: Cpu, link: "https://idpro.enge.vt.edu/", bullets: ["Designed a Raspberry Pi and Arduino residential toolkit for home automation.", "Built a Swift mobile application for remote control and real-time device monitoring."], skills: ["Swift", "Arduino", "Raspberry Pi", "Xcode"] },
  { start: "Sep 2023", end: "Nov 2023", title: "Frontend Developer Intern", company: "Card Isle", location: "Blacksburg, VA", type: "Internship", Icon: Code2, link: "https://cardisle.com/", bullets: ["Added website features and improved interface layouts for a more engaging experience.", "Redesigned search, button, and page interactions using Alpine.js.", "Built Playwright tests to verify functionality and reliability."], skills: ["Alpine.js", "Playwright", "Node.js", "CSS"] },
  { start: "Aug 2021", end: "May 2025", title: "B.S. in Computer Science", company: "Virginia Tech", location: "Blacksburg, VA", type: "Education", Icon: GraduationCap, link: "https://cs.vt.edu/", bullets: ["Studied algorithms, artificial intelligence, databases, web development, graphics, networks, and computer systems.", "Earned Dean’s List recognition and Virginia Tech merit-based scholarships."], skills: ["Algorithms", "AI", "Databases", "Systems"] },
];

const experienceFilters = ["All experience", "Professional", "Academic"] as const;
type ExperienceFilter = typeof experienceFilters[number];
const experienceGroup = (type: string) => type === "Research" || type === "Education" ? "Academic" : "Professional";

function Corners() {
  return <><span className="absolute left-2 top-2 h-2 w-2 border-l border-t border-white/55" /><span className="absolute right-2 top-2 h-2 w-2 border-r border-t border-white/55" /><span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-white/55" /><span className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-white/55" /></>;
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative border border-[#494d51] bg-[#090a0b] ${className}`}><Corners />{children}</div>;
}

type ExperienceItem = typeof experiences[number];

function ExperienceCard({ experience, index }: { experience: ExperienceItem; index: number }) {
  const [open, setOpen] = useState(false);
  const detailsId = `experience-details-${index}`;
  const CategoryIcon = experience.type === "Research"
    ? Code2
    : experience.type === "Education" || experience.type === "Leadership"
      ? GraduationCap
      : BriefcaseBusiness;
  const categoryLabel = experience.type === "Co-op" || experience.type === "Internship" ? "Professional" : experience.type;

  return <motion.article className="group relative" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}>
    <span className={`absolute -left-[53px] top-[62px] z-10 hidden h-3 w-3 -translate-y-1/2 lg:block ${experience.end === "Present" ? "bg-[#35d07f] shadow-[0_0_10px_rgba(53,208,127,.45)]" : "bg-[var(--home-accent)] shadow-[0_0_10px_rgba(93,167,255,.35)]"}`} aria-hidden="true" /><span className="absolute -left-[41px] top-[62px] hidden h-px w-[41px] -translate-y-1/2 bg-[#4b5055] lg:block" aria-hidden="true" />
    <Panel className="p-5 sm:p-6"><div className="grid gap-5 lg:grid-cols-[100px_88px_minmax(0,1fr)_180px] lg:items-center">
      <div className="font-mono text-[11px] font-bold uppercase leading-6 text-white lg:flex lg:h-full lg:flex-col lg:justify-center lg:border-r lg:border-white/15 lg:pr-5"><p>{experience.end}</p><p className="text-[#858b91]">—</p><p>{experience.start}</p></div>
      <div className="relative grid h-[76px] w-full place-items-center border border-[#4b5055] text-[#e9ebed]"><CategoryIcon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" /><span className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-white/55" /><span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-white/55" /></div>
      <div className="min-w-0"><h3 className="text-xl font-bold text-white">{experience.title}</h3><div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.05em]"><a href={experience.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[var(--home-accent)] hover:text-white">{experience.company}<ExternalLink className="h-3 w-3" /></a><span className="text-[#858b91]">/</span><span className="text-[#c0c4c8]">{experience.location}</span></div></div>
      <div className="flex items-center justify-between gap-4 border-white/10 font-mono uppercase lg:border-l lg:pl-5"><span className="inline-block border border-[#4b5055] px-3 py-2 text-[10px] font-bold text-white">{categoryLabel}</span><button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls={detailsId} className="grid h-9 w-9 shrink-0 place-items-center border border-[#4b5055] text-[var(--home-accent)] hover:border-[var(--home-accent)]" aria-label={`${open ? "Hide" : "Show"} details for ${experience.title}`}><ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} /></button></div>
    </div>
    <div id={detailsId} className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><div className="border-t border-white/10 pt-5"><p className="mb-3 font-mono text-[10px] font-bold uppercase text-[var(--home-accent)]">{"// Contributions"}</p><ul className="space-y-2">{experience.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-[13px] font-medium leading-5 text-[#d0d3d6]"><span className="text-[var(--home-accent)]">+</span>{bullet}</li>)}</ul><div className="mt-4 flex flex-wrap gap-2">{experience.skills.map((skill) => <span key={skill} className="border border-[#3d4146] px-2 py-1 font-mono text-[10px] font-bold uppercase text-[#dde0e2]">{skill}</span>)}</div></div></div></div>
  </Panel></motion.article>;
}

export default function Experience() {
  const [filter, setFilter] = useState<ExperienceFilter>("All experience");
  const filteredExperiences = useMemo(() => [...experiences]
    .filter((experience) => filter === "All experience" || experienceGroup(experience.type) === filter)
    .sort((a, b) => {
      const endDate = (value: string) => value === "Present" ? Number.POSITIVE_INFINITY : Date.parse(`1 ${value}`);
      return endDate(b.end) - endDate(a.end);
    }), [filter]);

  return <section id="experience" className="relative z-30 min-h-screen overflow-hidden border-t border-[#34383d] bg-[#08090a] px-4 pb-10 pt-[calc(var(--home-header-height)+32px)] text-[#e8e9e9] sm:px-6 lg:px-8">
    <motion.main className="mx-auto w-full max-w-[1440px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.06 }} transition={{ duration: 0.55 }}>
      <header className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(230px,.4fr)]">
        <div className="relative flex min-h-[210px] flex-col justify-center px-4 py-7 sm:px-8 xl:flex-row xl:items-center xl:gap-10">
          <Corners />
          <h2 className="hero-name text-[clamp(3.8rem,7vw,6.7rem)]">EXPERIENCE</h2>
          <div className="mt-5 max-w-[46ch] xl:mt-0"><p className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--home-accent)]">{"// Work + academics"}</p><p className="mt-5 font-mono text-[13px] font-medium leading-6 text-[#d0d3d6]">Professional roles, research, teaching, and academic milestones.</p></div>
        </div>
        <Panel className="p-5"><p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-[var(--home-accent)]">{"// Filter experience"}</p><div className="mt-4 space-y-1">{experienceFilters.map((item) => { const count = item === "All experience" ? experiences.length : experiences.filter((experience) => experienceGroup(experience.type) === item).length; return <button key={item} type="button" onClick={() => setFilter(item)} className={`flex w-full items-center justify-between px-3 py-2 font-mono text-[10px] font-bold uppercase transition-colors ${filter === item ? "bg-[var(--home-accent)] text-[#08090a]" : "text-[#d8dade] hover:bg-white/5"}`}><span>{item}</span><span>{String(count).padStart(2, "0")}</span></button>; })}</div></Panel>
      </header>

      <div className="relative mt-3 lg:pl-20">
        <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-[#4b5055] lg:block" aria-hidden="true" />
        <div className="space-y-2">
          {filteredExperiences.map((experience, index) => <ExperienceCard key={`${experience.company}-${experience.title}`} experience={experience} index={index} />)}
        </div>
      </div>
    </motion.main>
  </section>;
}
