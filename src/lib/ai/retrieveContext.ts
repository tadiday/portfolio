import profile from "@/data/profile.json";
import education from "@/data/education.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import type { ChatMessage } from "./types";

type Document = { id: string; text: string };

const documents: Document[] = [
  { id: "profile", text: JSON.stringify(profile) },
  ...education.map((item, index) => ({
    id: `education-${index}`,
    text: JSON.stringify(item),
  })),
  ...experience.map((item, index) => ({
    id: `experience-${index}`,
    text: JSON.stringify(item),
  })),
  ...projects.map((item, index) => ({
    id: `project-${index}`,
    text: JSON.stringify(item),
  })),
  { id: "skills", text: JSON.stringify(skills) },
];

const STOP_WORDS = new Set([
  "a",
  "about",
  "and",
  "are",
  "did",
  "do",
  "does",
  "for",
  "he",
  "his",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "of",
  "peter",
  "tell",
  "that",
  "the",
  "to",
  "what",
  "with",
]);

function tokens(value: string) {
  return [
    ...new Set(value.toLowerCase().match(/[a-z0-9+#.-]{2,}/g) ?? []),
  ].filter((token) => !STOP_WORDS.has(token));
}

export function retrieveContext(
  message: string,
  history: ChatMessage[] = [],
  limit = 5,
) {
  const recentUserContext = history
    .filter((item) => item.role === "user")
    .slice(-2)
    .map((item) => item.content)
    .join(" ");
  const queryTokens = tokens(`${recentUserContext} ${message}`);
  const ranked = documents
    .map((document) => {
      const haystack = document.text.toLowerCase();
      const score = queryTokens.reduce(
        (total, token) =>
          total + (haystack.includes(token) ? (token.length > 5 ? 3 : 1) : 0),
        0,
      );
      return { ...document, score };
    })
    .sort((a, b) => b.score - a.score);

  const matches = ranked.filter((item) => item.score > 0).slice(0, limit);
  if (matches.length === 0)
    return "No relevant portfolio information was found.";
  return matches.map((item) => `[${item.id}] ${item.text}`).join("\n");
}
