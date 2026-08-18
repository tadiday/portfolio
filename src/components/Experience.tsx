"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, ChevronDown, Code2, ExternalLink, GraduationCap } from "lucide-react";
import { CornerMarks, DashboardLabel, DashboardPanel } from "@/components/ui/DashboardPrimitives";
import { experiences, type ExperienceItem, type ExperienceKind } from "@/data/experience";

const experienceFilters = ["All experience", "Professional", "Academic"] as const;
type ExperienceFilter = (typeof experienceFilters)[number];

function getExperienceGroup(type: ExperienceKind): Exclude<ExperienceFilter, "All experience"> {
  return type === "Research" || type === "Education" ? "Academic" : "Professional";
}

function getEndTimestamp(value: string) {
  return value === "Present" ? Number.POSITIVE_INFINITY : Date.parse(`1 ${value}`);
}

function ExperienceHeader() {
  return (
    <div className="relative flex min-h-[210px] flex-col justify-center px-4 py-7 sm:px-8 xl:flex-row xl:items-center xl:gap-10">
      <CornerMarks />
      <h2 className="hero-name text-[clamp(3.8rem,7vw,6.7rem)]">EXPERIENCE</h2>
      <div className="mt-5 max-w-[46ch] xl:mt-0">
        <p className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--home-accent)]">
          {"// Work + academics"}
        </p>
        <p className="mt-5 font-mono text-[13px] font-medium leading-6 text-[#d0d3d6]">
          Professional roles, research, teaching, and academic milestones.
        </p>
      </div>
    </div>
  );
}

type ExperienceFiltersProps = {
  selectedFilter: ExperienceFilter;
  onSelect: (filter: ExperienceFilter) => void;
};

function ExperienceFilters({ selectedFilter, onSelect }: ExperienceFiltersProps) {
  return (
    <DashboardPanel className="p-5">
      <DashboardLabel className="text-xs font-bold">Filter experience</DashboardLabel>
      <div className="mt-4 space-y-1">
        {experienceFilters.map((filter) => {
          const count = filter === "All experience"
            ? experiences.length
            : experiences.filter((experience) => getExperienceGroup(experience.type) === filter).length;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => onSelect(filter)}
              className={`flex w-full items-center justify-between px-3 py-2 font-mono text-[10px] font-bold uppercase transition-colors ${
                selectedFilter === filter
                  ? "bg-[var(--home-accent)] text-[#08090a]"
                  : "text-[#d8dade] hover:bg-white/5"
              }`}
            >
              <span>{filter}</span>
              <span>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
    </DashboardPanel>
  );
}

function ExperienceDetails({ experience, open, id }: { experience: ExperienceItem; open: boolean; id: string }) {
  return (
    <div
      id={id}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ${
        open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="border-t border-white/10 pt-5">
          <DashboardLabel className="mb-3 text-[10px] font-bold">Contributions</DashboardLabel>
          <ul className="space-y-2">
            {experience.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[13px] font-medium leading-5 text-[#d0d3d6]">
                <span className="text-[var(--home-accent)]">+</span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span key={skill} className="border border-[#3d4146] px-2 py-1 font-mono text-[10px] font-bold uppercase text-[#dde0e2]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ experience, index }: { experience: ExperienceItem; index: number }) {
  const [open, setOpen] = useState(false);
  const detailsId = `experience-details-${index}`;
  const CategoryIcon = experience.type === "Research"
    ? Code2
    : experience.type === "Education" || experience.type === "Leadership"
      ? GraduationCap
      : BriefcaseBusiness;
  const categoryLabel = experience.type === "Co-op" || experience.type === "Internship"
    ? "Professional"
    : experience.type;

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
    >
      <span
        className={`absolute -left-[53px] top-[62px] z-10 hidden h-3 w-3 -translate-y-1/2 lg:block ${
          experience.end === "Present"
            ? "bg-[#35d07f] shadow-[0_0_10px_rgba(53,208,127,.45)]"
            : "bg-[var(--home-accent)] shadow-[0_0_10px_rgba(93,167,255,.35)]"
        }`}
        aria-hidden="true"
      />
      <span className="absolute -left-[41px] top-[62px] hidden h-px w-[41px] -translate-y-1/2 bg-[#4b5055] lg:block" aria-hidden="true" />

      <DashboardPanel className="p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[100px_88px_minmax(0,1fr)_180px] lg:items-center">
          <div className="font-mono text-[11px] font-bold uppercase leading-6 text-white lg:flex lg:h-full lg:flex-col lg:justify-center lg:border-r lg:border-white/15 lg:pr-5">
            <p>{experience.end}</p>
            <p className="text-[#858b91]">—</p>
            <p>{experience.start}</p>
          </div>

          <div className="relative grid h-[76px] w-full place-items-center border border-[#4b5055] text-[#e9ebed]">
            <CategoryIcon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
            <span className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-white/55" />
            <span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-white/55" />
          </div>

          <div className="min-w-0">
            <h3 className="text-xl font-bold text-white">{experience.title}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.05em]">
              <a href={experience.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[var(--home-accent)] hover:text-white">
                {experience.company}
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-[#858b91]">/</span>
              <span className="text-[#c0c4c8]">{experience.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-white/10 font-mono uppercase lg:border-l lg:pl-5">
            <span className="inline-block border border-[#4b5055] px-3 py-2 text-[10px] font-bold text-white">{categoryLabel}</span>
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-controls={detailsId}
              aria-label={`${open ? "Hide" : "Show"} details for ${experience.title}`}
              className="grid h-9 w-9 shrink-0 place-items-center border border-[#4b5055] text-[var(--home-accent)] hover:border-[var(--home-accent)]"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        <ExperienceDetails experience={experience} open={open} id={detailsId} />
      </DashboardPanel>
    </motion.article>
  );
}

export default function Experience() {
  const [filter, setFilter] = useState<ExperienceFilter>("All experience");
  const filteredExperiences = useMemo(
    () => [...experiences]
      .filter((experience) => filter === "All experience" || getExperienceGroup(experience.type) === filter)
      .sort((a, b) => getEndTimestamp(b.end) - getEndTimestamp(a.end)),
    [filter],
  );

  return (
    <section id="experience" className="relative z-30 min-h-screen overflow-hidden border-t border-[#34383d] bg-[#08090a] px-4 pb-10 pt-[calc(var(--home-header-height)+32px)] text-[#e8e9e9] sm:px-6 lg:px-8">
      <motion.main
        className="mx-auto w-full max-w-[1440px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.55 }}
      >
        <header className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(230px,.4fr)]">
          <ExperienceHeader />
          <ExperienceFilters selectedFilter={filter} onSelect={setFilter} />
        </header>

        <div className="relative mt-3 lg:pl-20">
          <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-[#4b5055] lg:block" aria-hidden="true" />
          <div className="space-y-2">
            {filteredExperiences.map((experience, index) => (
              <ExperienceCard key={`${experience.company}-${experience.title}`} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </motion.main>
    </section>
  );
}
