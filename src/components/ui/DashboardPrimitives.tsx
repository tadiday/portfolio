import type { ButtonHTMLAttributes, ReactNode } from "react";

type ClassNameProps = {
  className?: string;
};

export function CornerMarks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute left-2 top-2 h-2 w-2 border-l border-t border-[var(--border-strong)]"
      />
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 h-2 w-2 border-r border-t border-[var(--border-strong)]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-[var(--border-strong)]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-[var(--border-strong)]"
      />
    </>
  );
}

export const popupTriggerClassName =
  "group relative cursor-pointer outline-none transition-[transform,background-color,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[var(--hover-surface-subtle)] focus-visible:-translate-y-0.5 focus-visible:bg-[var(--hover-surface)]";

export function PopupTriggerCorners() {
  return (
    <>
      <span
        className="pointer-events-none absolute left-1 top-1 h-2.5 w-2.5 border-l border-t border-[var(--accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute right-1 top-1 h-2.5 w-2.5 border-r border-t border-[var(--accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-1 left-1 h-2.5 w-2.5 border-b border-l border-[var(--accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-1 right-1 h-2.5 w-2.5 border-b border-r border-[var(--accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />
    </>
  );
}

type DashboardPanelProps = ClassNameProps & {
  children: ReactNode;
};

export function DashboardPanel({
  children,
  className = "",
}: DashboardPanelProps) {
  return (
    <div
      className={`relative min-w-0 border border-[var(--border-strong)] bg-[var(--surface)] ${className}`}
    >
      <CornerMarks />
      {children}
    </div>
  );
}

type DashboardButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DashboardButton({
  className = "",
  type = "button",
  ...props
}: DashboardButtonProps) {
  return (
    <button
      type={type}
      className={`border border-[var(--border)] font-mono uppercase transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    />
  );
}

type DashboardTagProps = ClassNameProps & {
  children: ReactNode;
};

export function DashboardTag({ children, className = "" }: DashboardTagProps) {
  return (
    <span
      className={`border border-[var(--border)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-[var(--text-soft)] ${className}`}
    >
      {children}
    </span>
  );
}

type DashboardFilterButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  active: boolean;
  count: number;
  label: string;
};

export function DashboardFilterButton({
  active,
  className = "",
  count,
  label,
  type = "button",
  ...props
}: DashboardFilterButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={`flex w-full items-center justify-between px-3 py-2 font-mono text-[10px] font-bold uppercase transition-colors ${
        active
          ? "bg-[var(--accent)] text-[var(--on-accent)]"
          : "text-[var(--text-secondary)] hover:bg-[var(--hover-surface)]"
      } ${className}`}
      {...props}
    >
      <span>{label}</span>
      <span>{String(count).padStart(2, "0")}</span>
    </button>
  );
}

type DashboardLabelProps = ClassNameProps & {
  children: ReactNode;
};

export function DashboardLabel({
  children,
  className = "",
}: DashboardLabelProps) {
  return (
    <h3
      className={`font-mono uppercase tracking-[0.08em] text-[var(--home-accent)] ${className}`}
    >
      {"// "}
      {children}
    </h3>
  );
}
