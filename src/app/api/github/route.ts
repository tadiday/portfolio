import { NextResponse } from "next/server";
import type { ActivityLevel, GitHubActivity } from "@/components/activity/contribution-utils";

type GitHubLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
type GitHubCalendar = { totalContributions: number; weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: GitHubLevel }[] }[] };
type Repository = {
  languages: { edges: { size: number; node: { name: string } }[] };
};
type GitHubResponse = {
  data?: { user?: {
    contributionsCollection?: { contributionCalendar?: GitHubCalendar };
    repositories: { totalCount: number; nodes: Repository[] };
    pullRequests: { totalCount: number };
  } };
  errors?: { message: string }[];
};
const query = `query ContributionActivity($login: String!) {
  user(login: $login) {
    contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } }
    repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
      totalCount
      nodes { languages(first: 10) { edges { size node { name } } } }
    }
    pullRequests(states: MERGED) { totalCount }
  }
}`;
const levels: Record<GitHubLevel, ActivityLevel> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return NextResponse.json({ error: "GitHub activity is not configured." }, { status: 503 });
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "tadiday-portfolio" },
      body: JSON.stringify({ query, variables: { login: "tadiday" } }), next: { revalidate: 21600 },
    });
    if (!response.ok) return NextResponse.json({ error: "GitHub activity is temporarily unavailable." }, { status: 502 });
    const result = await response.json() as GitHubResponse;
    const user = result.data?.user;
    const calendar = user?.contributionsCollection?.contributionCalendar;
    if (result.errors?.length || !calendar || !user) return NextResponse.json({ error: "GitHub returned no contribution data." }, { status: 502 });
    const repositories = user.repositories.nodes ?? [];
    const languageBytes = new Map<string, number>();
    repositories.forEach((repository) => repository.languages.edges.forEach(({ node, size }) => languageBytes.set(node.name, (languageBytes.get(node.name) ?? 0) + size)));
    const totalLanguageBytes = Array.from(languageBytes.values()).reduce((sum, size) => sum + size, 0);
    const topLanguages = Array.from(languageBytes, ([name, size]) => ({ name, percentage: totalLanguageBytes ? Math.round(size / totalLanguageBytes * 100) : 0 }))
      .sort((a, b) => b.percentage - a.percentage).slice(0, 4);
    const data: GitHubActivity = {
      username: "tadiday",
      totalContributions: calendar.totalContributions,
      totalRepositories: user.repositories.totalCount,
      mergedPullRequests: user.pullRequests.totalCount,
      topLanguages,
      weeks: calendar.weeks.map((week) => ({ days: week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount, level: levels[day.contributionLevel] ?? 0 })) })),
    };
    return NextResponse.json(data);
  } catch { return NextResponse.json({ error: "GitHub activity is temporarily unavailable." }, { status: 502 }); }
}
