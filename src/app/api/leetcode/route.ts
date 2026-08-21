import { NextResponse } from "next/server";
import type { ActivityDay, ActivityLevel, ActivityWeek, LeetCodeActivity } from "@/components/activity/contribution-utils";

type Calendar = { streak: number; totalActiveDays: number; submissionCalendar: string };
type LeetCodeResponse = {
  data?: { matchedUser?: {
    username: string;
    submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number; submissions: number }[] };
    current: Calendar;
    previous: Pick<Calendar, "submissionCalendar">;
  } };
  errors?: { message: string }[];
};

const query = `query Activity($username: String!, $currentYear: Int, $previousYear: Int) {
  matchedUser(username: $username) {
    username
    submitStatsGlobal { acSubmissionNum { difficulty count submissions } }
    current: userCalendar(year: $currentYear) { streak totalActiveDays submissionCalendar }
    previous: userCalendar(year: $previousYear) { submissionCalendar }
  }
}`;

function parseCalendar(value: string): Record<string, number> {
  const parsed: unknown = JSON.parse(value || "{}");
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Malformed calendar");
  return Object.fromEntries(Object.entries(parsed).filter((entry): entry is [string, number] => typeof entry[1] === "number"));
}

function intensity(count: number): ActivityLevel {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function normalizeCalendar(calendar: Record<string, number>): ActivityWeek[] {
  const now = new Date();
  const cursor = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  cursor.setUTCDate(cursor.getUTCDate() - 364);
  const weeks = new Map<string, ActivityDay[]>();
  for (let index = 0; index < 365; index += 1) {
    const date = cursor.toISOString().slice(0, 10);
    const count = calendar[String(Math.floor(cursor.getTime() / 1000))] ?? 0;
    const sunday = new Date(cursor);
    sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());
    const key = sunday.toISOString().slice(0, 10);
    const days = weeks.get(key) ?? [];
    days.push({ date, count, level: intensity(count) });
    weeks.set(key, days);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return Array.from(weeks.values(), (days) => ({ days }));
}

export async function GET() {
  const username = process.env.LEETCODE_USERNAME;
  if (!username) return NextResponse.json({ error: "LeetCode activity is not configured." }, { status: 503 });
  const now = new Date();
  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: `https://leetcode.com/u/${encodeURIComponent(username)}/`, "User-Agent": "portfolio-activity/1.0" },
      body: JSON.stringify({ query, variables: { username, currentYear: now.getUTCFullYear(), previousYear: now.getUTCFullYear() - 1 } }),
      next: { revalidate: 21600 },
    });
    if (response.status === 429) return NextResponse.json({ error: "LeetCode activity is rate limited. Please try again later." }, { status: 503 });
    if (!response.ok) return NextResponse.json({ error: "LeetCode activity is temporarily unavailable." }, { status: 502 });
    const result = await response.json() as LeetCodeResponse;
    const user = result.data?.matchedUser;
    if (result.errors?.length || !user) return NextResponse.json({ error: "LeetCode user was not found." }, { status: 404 });
    if (!user.current?.submissionCalendar || !user.previous?.submissionCalendar) return NextResponse.json({ error: "LeetCode returned no activity calendar." }, { status: 502 });
    const calendar = { ...parseCalendar(user.previous.submissionCalendar), ...parseCalendar(user.current.submissionCalendar) };
    const stats = new Map(user.submitStatsGlobal.acSubmissionNum.map((item) => [item.difficulty, item]));
    const all = stats.get("All");
    const data: LeetCodeActivity = {
      username: user.username,
      totalSubmissions: all?.submissions ?? 0,
      totalActiveDays: user.current.totalActiveDays ?? 0,
      totalSolved: all?.count ?? 0,
      easySolved: stats.get("Easy")?.count ?? 0,
      mediumSolved: stats.get("Medium")?.count ?? 0,
      hardSolved: stats.get("Hard")?.count ?? 0,
      streak: user.current.streak ?? 0,
      weeks: normalizeCalendar(calendar),
    };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "LeetCode returned malformed or unavailable activity data." }, { status: 502 });
  }
}
