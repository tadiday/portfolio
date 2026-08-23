"use client";

import { useEffect, useState } from "react";
import {
  DashboardButton,
  DashboardPanel,
} from "@/components/ui/DashboardPrimitives";
import ContributionGraph from "./ContributionGraph";
import {
  type GitHubActivity,
  type LeetCodeActivity,
} from "./contribution-utils";

type Provider = "github" | "leetcode";
type Loadable<T> = {
  status: "loading" | "ready" | "error";
  data: T | null;
  message: string;
};

const initial = { status: "loading", data: null, message: "" } as const;

async function load<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const payload = await response.json();
  if (!response.ok)
    throw new Error(payload.error || "Activity is unavailable.");
  return payload as T;
}

export default function ContributionActivity() {
  const [tab, setTab] = useState<Provider>("github");
  const [github, setGithub] = useState<Loadable<GitHubActivity>>(initial);
  const [leetcode, setLeetcode] = useState<Loadable<LeetCodeActivity>>(initial);

  useEffect(() => {
    let active = true;
    load<GitHubActivity>("/api/github")
      .then((data) => {
        if (!active) return;
        setGithub({
          status: data.weeks.length ? "ready" : "error",
          data,
          message: data.weeks.length ? "" : "No GitHub activity was returned.",
        });
      })
      .catch((error: Error) => {
        if (active)
          setGithub({ status: "error", data: null, message: error.message });
      });
    load<LeetCodeActivity>("/api/leetcode")
      .then((data) => {
        if (!active) return;
        setLeetcode({
          status: data.weeks.length ? "ready" : "error",
          data,
          message: data.weeks.length
            ? ""
            : "No LeetCode activity was returned.",
        });
      })
      .catch((error: Error) => {
        if (active)
          setLeetcode({ status: "error", data: null, message: error.message });
      });

    return () => {
      active = false;
    };
  }, []);

  const selected = tab === "github" ? github : leetcode;
  const tabClass = (isActive: boolean) =>
    `inline-flex w-[108px] items-center justify-center gap-2 px-3 py-2 text-[10px] font-semibold tracking-[0.07em] ${
      isActive
        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)] hover:text-[var(--background)]"
        : "text-[var(--text-secondary)]"
    }`;

  return (
    <DashboardPanel className="flex min-h-[300px] flex-col overflow-hidden p-5 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-muted)] pb-3">
        <div className="flex gap-1">
          <DashboardButton
            aria-pressed={tab === "github"}
            className={tabClass(tab === "github")}
            onClick={() => setTab("github")}
          >
            GitHub
          </DashboardButton>
          <DashboardButton
            aria-pressed={tab === "leetcode"}
            className={tabClass(tab === "leetcode")}
            onClick={() => setTab("leetcode")}
          >
            LeetCode
          </DashboardButton>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {selected.status === "loading" ? (
          <div className="grid min-h-[174px] animate-pulse place-items-center font-mono text-[10px] uppercase text-[var(--text-muted)]">
            Loading {tab} activity…
          </div>
        ) : selected.status === "error" || !selected.data ? (
          <div className="grid min-h-[174px] place-items-center border border-[var(--border-muted)] p-6 text-center font-mono text-[10px] uppercase leading-5 text-[var(--text-secondary)]">
            {selected.message || `${tab} activity is unavailable.`}
          </div>
        ) : tab === "github" ? (
          <GitHubView data={selected.data as GitHubActivity} />
        ) : (
          <LeetCodeView data={selected.data as LeetCodeActivity} />
        )}
      </div>
    </DashboardPanel>
  );
}

function GitHubView({ data }: { data: GitHubActivity }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-4">
        <ContributionGraph weeks={data.weeks} unit="contribution" />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] font-semibold uppercase text-[var(--text-secondary)]">
          <span>{data.totalContributions.toLocaleString()} contributions</span>
          <span>{data.totalRepositories} repos</span>
          <span>{data.mergedPullRequests} PRs merged</span>
        </div>
        <div className="ml-auto flex flex-wrap justify-end gap-2 font-mono text-[8px] font-semibold uppercase">
          {data.topLanguages.map((language) => (
            <span
              key={language.name}
              className="border border-[var(--border-muted)] px-2 py-1"
            >
              {language.name}{" "}
              <b className="text-[var(--accent)]">{language.percentage}%</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeetCodeView({ data }: { data: LeetCodeActivity }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-4">
        <ContributionGraph weeks={data.weeks} unit="submission" />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] font-semibold uppercase text-[var(--text-secondary)]">
          <span>{data.totalSubmissions.toLocaleString()} submissions</span>
          <span>{data.totalActiveDays} active days</span>
          <span className="text-[var(--text-primary)]">
            {data.totalSolved} solved
          </span>
        </div>
        <div className="ml-auto flex flex-wrap justify-end gap-2 font-mono text-[8px] font-semibold uppercase">
          <span className="border border-[var(--border-muted)] px-2 py-1">
            Easy <b className="text-[var(--accent)]">{data.easySolved}</b>
          </span>
          <span className="border border-[var(--border-muted)] px-2 py-1">
            Medium <b className="text-[var(--accent)]">{data.mediumSolved}</b>
          </span>
          <span className="border border-[var(--border-muted)] px-2 py-1">
            Hard <b className="text-[var(--accent)]">{data.hardSolved}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
