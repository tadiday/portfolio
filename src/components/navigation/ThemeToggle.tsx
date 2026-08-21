"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("portfolio-theme", theme);
  window.dispatchEvent(
    new CustomEvent("portfolio-theme-change", { detail: theme }),
  );
}

export default function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("portfolio-theme") as Theme | null;
    const initialTheme =
      storedTheme ??
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");

    setTheme(initialTheme);
    applyTheme(initialTheme);

    function syncTheme(event: Event) {
      setTheme((event as CustomEvent<Theme>).detail);
    }

    window.addEventListener("portfolio-theme-change", syncTheme);
    return () =>
      window.removeEventListener("portfolio-theme-change", syncTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  const nextThemeLabel = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextThemeLabel} mode`}
      title={`Switch to ${nextThemeLabel} mode`}
      className={`group relative grid place-items-center border border-[var(--border-strong)] bg-[var(--header-bg)] text-[var(--header-text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
        mobile ? "size-13" : "size-8"
      }`}
    >
      <Icon
        className={mobile ? "size-5" : "size-4"}
        strokeWidth={1.6}
        aria-hidden="true"
      />
      <span
        className="absolute left-1 top-1 size-1.5 border-l border-t border-current"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-1 right-1 size-1.5 border-b border-r border-current"
        aria-hidden="true"
      />
    </button>
  );
}
