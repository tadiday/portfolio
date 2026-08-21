export type ActivityLevel = 0 | 1 | 2 | 3 | 4;
export type ActivityDay = {
  date: string;
  count: number;
  level: ActivityLevel;
};

export type ActivityWeek = {
  days: ActivityDay[];
};

export type GitHubActivity = {
  username: string;
  totalContributions: number;
  totalRepositories: number;
  mergedPullRequests: number;
  topLanguages: { name: string; percentage: number }[];
  weeks: ActivityWeek[];
};
export type LeetCodeActivity = {
  username: string;
  totalSubmissions: number;
  totalActiveDays: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streak: number;
  weeks: ActivityWeek[];
};

export const levelStyles: Record<ActivityLevel, string> = {
  0: "var(--border-muted)",
  1: "color-mix(in srgb, var(--accent) 28%, transparent)",
  2: "color-mix(in srgb, var(--accent) 48%, transparent)",
  3: "color-mix(in srgb, var(--accent) 70%, transparent)",
  4: "var(--accent)",
};

export function getMonthLabels(weeks: ActivityWeek[]) {
  let previousMonth = -1;
  return weeks.flatMap((week, weekIndex) => {
    const firstDay = week.days[0];
    if (!firstDay) return [];
    const date = new Date(`${firstDay.date}T00:00:00Z`);
    const month = date.getUTCMonth();
    if (month === previousMonth) return [];
    previousMonth = month;
    return [
      {
        label: date.toLocaleDateString("en-US", {
          month: "short",
          timeZone: "UTC",
        }),
        weekIndex,
      },
    ];
  });
}
