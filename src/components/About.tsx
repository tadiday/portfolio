"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Languages,
  MapPin,
  Music2,
  Plane,
  RadioTower,
  X,
} from "lucide-react";
import {
  SiDocker,
  SiGit,
  SiJavascript,
  SiJunit5,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  CornerMarks,
  DashboardButton,
  DashboardLabel,
  DashboardPanel,
  PopupTriggerCorners,
  popupTriggerClassName,
} from "@/components/ui/DashboardPrimitives";
import ContributionActivity from "@/components/activity/ContributionActivity";
import { experiences } from "@/data/experience";
import { useEscapeKey } from "@/hooks/useEscapeKey";

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

const learningTopics = [
  ["WebSockets", RadioTower],
  ["Next.js", SiNextdotjs],
  ["Vue.js", SiVuedotjs],
  ["AWS", FaAws],
] as const;

const hobbies = [
  {
    label: "Reading",
    description: "Books and new perspectives",
    Icon: BookOpen,
    sections: [
      {
        title: "Currently reading",
        items: [
          "Piranesi — Susanna Clarke",
          "Spy the Lie — Don Tennant, Michael Floyd, and Susan Carnicero",
          "Dracula — Bram Stoker",
        ],
      },
      {
        title: "Previously read",
        items: ["Brave New World — Aldous Huxley · Finished Jul 22, 2026"],
      },
    ],
  },
  {
    label: "Traveling",
    description: "Cities, food, and cultures",
    Icon: Plane,
    sections: [
      {
        title: "Recent trips",
        items: ["New York City", "Los Angeles", "San Francisco"],
      },
      { title: "Want to visit", items: ["Chicago", "Iceland"] },
    ],
  },
  {
    label: "Concerts",
    description: "Live music and shared moments",
    Icon: Music2,
    sections: [
      {
        title: "Recent concerts",
        items: ["Pitbull", "Bruno Mars", "Don Toliver", "Charlie Puth"],
      },
      {
        title: "Favorites",
        items: ["Bruno Mars", "The Weeknd", "Don Toliver"],
      },
    ],
  },
] as const;

function Panel({
  children,
  className = "",
}: React.ComponentProps<typeof DashboardPanel>) {
  return (
    <DashboardPanel className={`p-5 lg:p-6 ${className}`}>
      {children}
    </DashboardPanel>
  );
}

function Label({
  children,
  className = "",
}: React.ComponentProps<typeof DashboardLabel>) {
  return (
    <DashboardLabel className={`text-[11px] font-semibold ${className}`}>
      {children}
    </DashboardLabel>
  );
}

function TabButton({
  active,
  children,
  onClick,
  className = "",
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <DashboardButton
      aria-pressed={active}
      className={`inline-flex items-center px-3 py-2 text-[10px] font-semibold tracking-[0.07em] ${
        active
          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)] hover:text-[var(--background)]"
          : "text-[var(--text-secondary)]"
      } ${className}`}
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
      <h2 id="about-title" className="hero-name section-title">
        ABOUT ME
      </h2>
      <p className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
        {"// Get to know me"}
      </p>
      <p className="mt-5 max-w-[52ch] font-mono text-[13px] font-medium leading-6 text-[var(--text-soft)]">
        I&apos;m a software engineer who enjoys turning complex problems into
        clean, reliable web experiences. I recently graduated from Virginia
        Tech, where I worked on system optimization, automation tools, and
        user-interface development.
      </p>
    </div>
  );
}

function QuickStats() {
  const stats = [
    ["Projects built", "5+"],
    ["Internships", "2"],
    ["Degree earned", "B.S."],
  ];

  return (
    <Panel className="h-full">
      <Label>Quick stats</Label>
      <div className="mt-4">
        {stats.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-[var(--border-muted)] py-2.5 font-mono uppercase"
          >
            <span className="text-xs font-semibold text-[var(--text-soft)]">
              {label}
            </span>
            <span className="text-base font-bold text-[var(--text-primary)]">
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 border-l-2 border-[var(--accent)] pl-3 font-mono uppercase">
        <p className="text-[10px] font-semibold tracking-[0.08em] text-[var(--text-secondary)]">
          Currently pursuing
        </p>
        <p className="mt-1 text-[13px] font-bold text-[var(--text-primary)]">
          M.S. Computer Science
        </p>
      </div>
    </Panel>
  );
}

function LocationAndWork() {
  return (
    <Panel className="flex h-full flex-col">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border-r border-[var(--border-muted)] pr-4">
          <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--text-soft)]">
            <MapPin
              className="h-4 w-4 text-[var(--accent)]"
              aria-hidden="true"
            />{" "}
            Location
          </p>
          <p className="mt-4 text-lg font-bold leading-tight text-[var(--text-primary)]">
            Washington, DC
          </p>
          <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
            United States
          </p>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase text-[var(--text-soft)]">
            Work style
          </p>
          <div className="mt-4 space-y-3">
            {["Remote", "Hybrid", "On-site"].map((style) => (
              <div
                key={style}
                className="flex items-center justify-between text-sm font-bold text-[var(--text-primary)]"
              >
                <span>{style}</span>
                <span
                  className="h-2.5 w-2.5 bg-[var(--success)]"
                  aria-label="Available"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto border border-[#3d5368] px-3 py-3">
        <p className="font-mono text-[11px] font-bold uppercase text-[var(--accent)]">
          Availability
        </p>
        <div className="mt-2 flex flex-wrap gap-2 font-mono text-[9px] font-semibold uppercase text-[var(--text-secondary)]">
          <span className="border border-[#3d5368] px-2 py-1">
            Open to relocation
          </span>
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
        <Languages
          className="h-4 w-4 text-[var(--accent)]"
          aria-hidden="true"
        />{" "}
        Languages
      </p>
      <div className="mt-4 divide-y divide-[var(--border-muted)]">
        {[
          ["English", "Fluent"],
          ["Vietnamese", "Native"],
        ].map(([language, level]) => (
          <div
            key={language}
            className="flex items-center justify-between gap-3 py-3"
          >
            <span className="text-base font-bold text-[var(--text-primary)]">
              {language}
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase text-[var(--accent)]">
              {level}
            </span>
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
  const [activeTab, setActiveTab] = useState<"project" | "experience">(
    "project",
  );
  const isProject = activeTab === "project";
  const latestExperience = experiences[0];

  return (
    <Panel className="h-full min-h-[220px]">
      <div className="flex items-center gap-1 border-b border-[var(--border-muted)] pb-3">
        <TabButton active={isProject} onClick={() => setActiveTab("project")}>
          Latest project
        </TabButton>
        <TabButton
          active={!isProject}
          onClick={() => setActiveTab("experience")}
        >
          Latest experience
        </TabButton>
      </div>
      <div className="flex min-h-[122px] flex-col pt-4">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-[var(--text-primary)] sm:text-lg">
            {isProject ? "The Odd One" : latestExperience.title}
          </h3>
          <p className="mt-1 font-mono text-[9px] font-semibold uppercase text-[var(--accent)]">
            {isProject
              ? "Personal project · Latest release · Aug 2026"
              : `${latestExperience.company} · ${latestExperience.type} · May 2026 – Aug 2026`}
          </p>
          <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-[var(--text-soft)]">
            {isProject
              ? "I recently created The Odd One, the newest addition to my growing collection of software projects."
              : latestExperience.bullets[0]}
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
        <TabButton
          active={activeTab === "skills"}
          onClick={() => setActiveTab("skills")}
        >
          Top skills
        </TabButton>
        <TabButton
          active={activeTab === "learning"}
          onClick={() => setActiveTab("learning")}
        >
          Currently learning
        </TabButton>
      </div>
      {activeTab === "skills" ? (
        <div className="mt-3 grid grid-cols-2 content-start gap-2 md:grid-cols-3 xl:grid-cols-5">
          {skills.map(([label, Icon]) => (
            <div
              key={label}
              className="relative grid h-[60px] place-items-center border border-[var(--border-strong)] p-2"
            >
              <Icon
                className="text-xl text-[var(--text-primary)]"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] font-bold uppercase text-[var(--text-primary)]">
                {label}
              </span>
              <CornerMarks />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 content-start gap-2 md:grid-cols-4">
          {learningTopics.map(([label, Icon]) => (
            <div
              key={label}
              className="relative grid h-[60px] place-items-center border border-[var(--border-strong)] p-2"
            >
              <Icon
                className="text-xl text-[var(--text-primary)]"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] font-bold uppercase text-[var(--text-primary)]">
                {label}
              </span>
              <CornerMarks />
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

function Hobbies() {
  const [activeHobby, setActiveHobby] = useState<
    (typeof hobbies)[number] | null
  >(null);

  useEscapeKey(Boolean(activeHobby), () => setActiveHobby(null));

  return (
    <>
      <Panel className="flex h-full flex-col">
        <Label>Hobbies</Label>
        <div className="mt-3 grid flex-1 gap-2 sm:grid-cols-3 xl:grid-cols-1 xl:grid-rows-3">
          {hobbies.map((hobby) => (
            <button
              key={hobby.label}
              type="button"
              onClick={() => setActiveHobby(hobby)}
              className={`${popupTriggerClassName} flex min-h-[52px] items-center gap-4 border border-[var(--border-muted)] px-4 py-3 text-left hover:border-[var(--accent)] focus-visible:border-[var(--accent)]`}
            >
              <PopupTriggerCorners />
              <hobby.Icon
                className="h-5 w-5 shrink-0 text-[var(--accent)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="font-mono text-xs font-bold uppercase text-[var(--text-primary)]">
                  {hobby.label}
                </p>
                <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
                  {hobby.description}
                </p>
              </div>
              <span
                className="ml-auto font-mono text-sm text-[var(--text-muted)] transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          ))}
        </div>
      </Panel>

      {activeHobby && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setActiveHobby(null)
          }
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hobby-dialog-title"
            className="relative w-full max-w-lg border border-[var(--border-strong)] bg-[var(--surface)] p-6 shadow-[var(--panel-shadow)]"
          >
            <CornerMarks />
            <button
              type="button"
              onClick={() => setActiveHobby(null)}
              className="absolute right-5 top-5 text-[var(--text-secondary)] hover:text-[var(--accent)]"
              aria-label="Close hobby details"
            >
              <X className="h-5 w-5" />
            </button>
            <activeHobby.Icon
              className="h-7 w-7 text-[var(--accent)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h3
              id="hobby-dialog-title"
              className="mt-4 text-2xl font-bold text-[var(--text-primary)]"
            >
              {activeHobby.label}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {activeHobby.description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {activeHobby.sections.map((section) => (
                <section
                  key={section.title}
                  className="border border-[var(--border-muted)] p-4"
                >
                  <h4 className="font-mono text-[10px] font-bold uppercase text-[var(--accent)]">
                    {section.title}
                  </h4>
                  {section.items.length ? (
                    <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-xs text-[var(--text-muted)]">
                      Nothing listed yet.
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
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
        <section className="grid items-stretch gap-3 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:grid-rows-[230px_auto]">
          <SkillsPanel />
          <LatestNews />
          <ContributionActivity />
          <Hobbies />
        </section>
      </motion.main>
    </section>
  );
}
