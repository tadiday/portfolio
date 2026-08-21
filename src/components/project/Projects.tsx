"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  FolderGit2,
  Gauge,
  GitBranch,
  Github,
  Globe2,
  Mail,
  ReceiptText,
  X,
} from "lucide-react";
import {
  CornerMarks,
  DashboardButton,
  DashboardFilterButton,
  DashboardLabel,
  DashboardPanel,
  DashboardTag,
  PopupTriggerCorners,
  popupTriggerClassName,
} from "@/components/ui/DashboardPrimitives";
import { useEscapeKey } from "@/hooks/useEscapeKey";

type Category = "Web application" | "Mobile application" | "Experiment";

const projects = [
  {
    title: "The Odd One",
    date: "2026",
    category: "Web application" as Category,
    kind: "Personal project",
    role: "Full-stack developer",
    description:
      "A real-time multiplayer party game where players answer prompts and try to find the imposter.",
    tech: ["Vue 3", "TypeScript", "Node.js", "WebSockets", "Tailwind"],
    features: [
      "Real-time multiplayer rooms",
      "Multiple game phases and voting",
      "Randomized roles and room settings",
    ],
    challenge:
      "Keeping every player synchronized through reconnects and rapid game-state changes.",
    learning:
      "Designing event-driven systems and predictable multiplayer state.",
    github: "",
    website: "",
    preview: "",
    Icon: FolderGit2,
  },
  {
    title: "Web Portfolio",
    date: "2025",
    category: "Web application" as Category,
    kind: "Personal project",
    role: "Designer & developer",
    description:
      "A responsive portfolio built to showcase projects, experience, and research through a focused interactive interface.",
    tech: ["React.js", "TypeScript", "Next.js", "Tailwind", "Motion"],
    features: [
      "Responsive section layouts",
      "Interactive project presentation",
      "Motion and technical UI details",
    ],
    challenge:
      "Balancing expressive visuals with performance, accessibility, and responsive behavior.",
    learning:
      "Building a consistent design system and reusable component architecture.",
    github: "https://github.com/tadiday/Website-Portfolio",
    website: "https://peter-cao.com",
    preview: "/assets/gif/webport.mp4",
    Icon: Globe2,
  },
  {
    title: "Traffic Dashboard",
    date: "2025",
    category: "Web application" as Category,
    kind: "Academic project",
    role: "Full-stack developer",
    description:
      "An interactive traffic visualization dashboard with authentication, data uploads, and dynamic environment displays.",
    tech: ["React.js", "Node.js", "Express", "MySQL", "Chart.js"],
    features: [
      "Secure user authentication",
      "Traffic-data upload workflow",
      "Interactive charts and environments",
    ],
    challenge:
      "Transforming complex simulation output into clear, responsive visualizations.",
    learning:
      "Data visualization, API design, and performance-focused rendering.",
    github: "https://github.com/tadiday/Traffic_Dashboard",
    website: "",
    preview: "/assets/gif/traffic.mp4",
    Icon: Gauge,
  },
  {
    title: "Simplisplit",
    date: "2024",
    category: "Mobile application" as Category,
    kind: "Product project",
    role: "Mobile developer",
    description:
      "A mobile app that scans bills and helps groups split costs with friends quickly and accurately.",
    tech: ["React Native", "Python", "Flask", "Tailwind"],
    features: [
      "Receipt scanning workflow",
      "Itemized group splitting",
      "Mobile-first interaction design",
    ],
    challenge:
      "Turning imperfect receipt data into a simple and understandable splitting flow.",
    learning: "Mobile UX, API integration, and resilient input handling.",
    github: "",
    website: "",
    preview: "/assets/gif/simplisplit.mp4",
    Icon: ReceiptText,
  },
];

const archivedProjects = [
  {
    title: "eCommerce Website",
    year: "2024",
    category: "Web application",
    href: "https://github.com/tadiday/eCommerce-Website",
  },
  {
    title: "Todo List",
    year: "2023",
    category: "Web application",
    href: "https://github.com/tadiday/Todo-List",
  },
  {
    title: "Predict Bullying Model",
    year: "2023",
    category: "Machine learning",
    href: "https://github.com/tadiday/Predict-Bullying-Model",
  },
  {
    title: "Food Swipe",
    year: "2022",
    category: "Experiment",
    href: "https://github.com/tadiday/Food-Swipe",
  },
] as const;

const filters = [
  "All projects",
  "Web application",
  "Mobile application",
] as const;
type Filter = (typeof filters)[number];

function Label({ children }: React.ComponentProps<typeof DashboardLabel>) {
  return (
    <DashboardLabel className="text-xs font-bold">{children}</DashboardLabel>
  );
}

type ProjectItem = (typeof projects)[number];

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/85 px-3 pb-3 pt-[calc(var(--home-header-height)+12px)] sm:px-6 sm:pb-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[calc(100svh-var(--home-header-height)-24px)] w-full max-w-[1280px] overflow-y-auto border border-[var(--border-strong)] bg-[var(--background)] px-5 pb-5 pt-16 text-[var(--text)] sm:px-7 sm:pb-7 sm:pt-16">
        <CornerMarks />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center border border-[var(--border-strong)] bg-[var(--background)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)]">
          <div className="min-w-0 pr-2">
            <p className="font-mono text-[10px] font-bold text-[var(--home-accent)]">
              01
            </p>
            <h2
              id="project-modal-title"
              className="mt-3 text-3xl font-bold sm:text-4xl"
            >
              {project.title}
            </h2>
            <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--home-accent)]">
              {project.category} · {project.kind}
            </p>
            <p className="mt-5 text-sm font-medium leading-6 text-[var(--text-secondary)]">
              {project.description}
            </p>
            <div className="mt-6 border-t border-[var(--border-muted)] pt-5">
              <Label>Technologies</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <DashboardTag
                    key={tech}
                    className="border-[#44494e] py-1.5 text-[9px] font-semibold text-[var(--text-secondary)]"
                  >
                    {tech}
                  </DashboardTag>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Label>Key features</Label>
              <ul className="mt-3 space-y-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-xs leading-5 text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--home-accent)]">+</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Challenge</Label>
                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                  {project.challenge}
                </p>
              </div>
              <div>
                <Label>Learning</Label>
                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                  {project.learning}
                </p>
              </div>
            </div>
          </div>
          <div className="flex min-w-0 flex-col">
            <div className="relative grid min-h-[300px] flex-1 place-items-center overflow-hidden border border-[#4b5055] bg-[#0b0d0f] sm:min-h-[430px]">
              {project.preview ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full max-h-[560px] w-full object-contain"
                >
                  <source src={project.preview} type="video/mp4" />
                </video>
              ) : (
                <div className="grid place-items-center gap-5 text-center">
                  <project.Icon
                    className="h-20 w-20 text-[var(--home-accent)]"
                    strokeWidth={1.2}
                  />
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    Preview coming soon
                  </p>
                </div>
              )}
              <CornerMarks />
            </div>
            <div className="grid gap-4 border-x border-b border-[#4b5055] p-4 font-mono uppercase sm:grid-cols-3">
              <div>
                <p className="text-[8px] text-[var(--text-muted)]">Date</p>
                <p className="mt-1 text-[11px] font-bold">{project.date}</p>
              </div>
              <div>
                <p className="text-[8px] text-[var(--text-muted)]">Role</p>
                <p className="mt-1 text-[11px] font-bold">{project.role}</p>
              </div>
              <div className="flex items-end gap-4 sm:justify-end">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-[var(--home-accent)]"
                  >
                    View live →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-[var(--text-primary)]"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectArchive() {
  return (
    <DashboardPanel className="mt-8 p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-muted)] pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Archive
            className="h-4 w-4 text-[var(--home-accent)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <Label>Project archive</Label>
          <span className="font-mono text-[10px] font-bold text-[var(--text-muted)]">
            ({String(archivedProjects.length).padStart(2, "0")})
          </span>
        </div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Earlier work / kept for the record
        </p>
      </div>

      <div className="divide-y divide-[var(--border-muted)]">
        {archivedProjects.map((project, index) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-3 py-5 transition-colors hover:bg-[var(--hover-surface-subtle)] sm:grid-cols-[50px_minmax(0,1fr)_150px_65px] sm:items-center sm:px-2"
          >
            <span className="font-mono text-[11px] font-bold text-[var(--text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--text-primary)]">
                {project.title}
              </h3>
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {project.category}
            </span>
            <span className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-[var(--text-muted)] sm:justify-end">
              {project.year}
              <ExternalLink className="h-3.5 w-3.5 text-[var(--home-accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>
    </DashboardPanel>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All projects");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const filtered = useMemo(
    () =>
      filter === "All projects"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / 3));
  const visible = filtered.slice(page * 3, page * 3 + 3);

  const chooseFilter = (next: Filter) => {
    setFilter(next);
    setPage(0);
  };

  useEscapeKey(Boolean(selected), () => setSelected(null));

  return (
    <section
      id="projects"
      className="relative z-30 min-h-screen overflow-hidden bg-[var(--background)] px-4 pb-8 pt-[calc(var(--home-header-height)+32px)] text-[var(--text)] sm:px-6 lg:px-8"
    >
      <motion.main
        className="mx-auto w-full max-w-[1440px] space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.55 }}
      >
        <section className="grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.95fr)] xl:grid-cols-[minmax(0,1.5fr)_minmax(0,.7fr)_minmax(0,.7fr)]">
          <div className="relative flex min-h-[205px] flex-col justify-center px-4 py-7 sm:px-8 xl:flex-row xl:items-center xl:gap-10">
            <CornerMarks />
            <h2 className="hero-name section-title">PROJECTS</h2>
            <div className="mt-5 max-w-[34ch] xl:mt-0">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--home-accent)]">
                {"// Things I've built"}
              </p>
              <p className="mt-5 font-mono text-[13px] font-medium leading-6 text-[var(--text-secondary)]">
                A collection of personal projects and experiments. Each one
                taught me something new and pushed me to grow as a developer.
              </p>
            </div>
          </div>

          <DashboardPanel className="p-5 lg:p-6">
            <Label>Filter projects</Label>
            <div className="mt-4 space-y-1">
              {filters.map((item) => {
                const count =
                  item === "All projects"
                    ? projects.length
                    : projects.filter((project) => project.category === item)
                        .length;
                return (
                  <DashboardFilterButton
                    key={item}
                    active={filter === item}
                    count={count}
                    label={item === "All projects" ? item : `${item}s`}
                    onClick={() => chooseFilter(item)}
                    className="text-[11px]"
                  />
                );
              })}
            </div>
          </DashboardPanel>

          <DashboardPanel className="p-5 lg:col-span-2 lg:p-6 xl:col-span-1">
            <Label>Explore more</Label>
            <div className="mt-4 divide-y divide-[var(--border-muted)] border-y border-[var(--border-muted)]">
              <a
                href="https://github.com/tadiday"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 py-3 text-[var(--text-primary)] hover:text-[var(--home-accent)]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase">
                  GitHub profile
                </span>
                <ExternalLink className="ml-auto h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="/assets/documents/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 py-3 text-[var(--text-primary)] hover:text-[var(--home-accent)]"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase">
                  View résumé
                </span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="group flex items-center gap-3 py-3 text-[var(--text-primary)] hover:text-[var(--home-accent)]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase">
                  Start a conversation
                </span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </DashboardPanel>
        </section>

        <DashboardPanel className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <Label>{filter}</Label>
            <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase">
              <DashboardButton
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                disabled={page === 0}
                aria-label="Previous project page"
                className="grid h-8 w-8 place-items-center text-[var(--home-accent)] disabled:pointer-events-none disabled:opacity-25"
              >
                <ArrowLeft className="h-4 w-4" />
              </DashboardButton>
              <span className="text-[var(--text-primary)]">
                {String(page + 1).padStart(2, "0")} /{" "}
                {String(pageCount).padStart(2, "0")}
              </span>
              <DashboardButton
                onClick={() =>
                  setPage((current) => Math.min(pageCount - 1, current + 1))
                }
                disabled={page >= pageCount - 1}
                aria-label="Next project page"
                className="grid h-8 w-8 place-items-center text-[var(--home-accent)] disabled:pointer-events-none disabled:opacity-25"
              >
                <ArrowRight className="h-4 w-4" />
              </DashboardButton>
            </div>
          </div>
          <div className="mt-4 divide-y divide-[var(--border-muted)] lg:h-[500px]">
            {visible.map((project, index) => (
              <article
                key={project.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ")
                    setSelected(project);
                }}
                className={`${popupTriggerClassName} grid min-h-[140px] gap-5 py-4 lg:grid-cols-[44px_minmax(0,1fr)_210px] lg:items-center`}
              >
                <PopupTriggerCorners />
                <span className="flex items-center gap-2 font-mono text-base font-bold text-[var(--home-accent)]">
                  <span
                    className="h-2 w-2 bg-[var(--home-accent)] shadow-[0_0_8px_rgba(93,167,255,.4)]"
                    aria-hidden="true"
                  />
                  {String(page * 3 + index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 lg:px-3">
                  <h3 className="text-[26px] font-bold text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-[82ch] text-[15px] font-medium leading-6 text-[var(--text-secondary)]">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <DashboardTag
                        key={tech}
                        className="text-[var(--text-secondary)]"
                      >
                        {tech}
                      </DashboardTag>
                    ))}
                  </div>
                </div>
                <div className="border-[var(--border-muted)] font-mono uppercase lg:border-l lg:py-2 lg:pl-7">
                  <p className="text-[13px] font-bold text-[var(--text-primary)]">
                    {project.date}
                  </p>
                  <p className="mt-2 text-[11px] font-bold text-[var(--home-accent)]">
                    {project.category}
                  </p>
                  <div className="mt-5">
                    {project.github ? (
                      <a
                        onClick={(event) => event.stopPropagation()}
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-[12px] font-bold text-[var(--text-primary)] hover:text-[var(--home-accent)]"
                      >
                        GitHub <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-[11px] font-semibold text-[var(--text-muted)]">
                        <GitBranch className="h-4 w-4" />
                        Private / pending
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </DashboardPanel>

        <ProjectArchive />
      </motion.main>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
