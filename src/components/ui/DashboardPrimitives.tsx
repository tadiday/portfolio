import type { ButtonHTMLAttributes, ReactNode } from "react";

type ClassNameProps = {
  className?: string;
};

export function CornerMarks() {
  return (
    <>
      <span aria-hidden="true" className="absolute left-2 top-2 h-2 w-2 border-l border-t border-[var(--border-strong)]" />
      <span aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 border-r border-t border-[var(--border-strong)]" />
      <span aria-hidden="true" className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-[var(--border-strong)]" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-[var(--border-strong)]" />
    </>
  );
}

type DashboardPanelProps = ClassNameProps & {
  children: ReactNode;
};

export function DashboardPanel({ children, className = "" }: DashboardPanelProps) {
  return (
    <div className={`relative min-w-0 border border-[var(--border-strong)] bg-[var(--surface)] ${className}`}>
      <CornerMarks />
      {children}
    </div>
  );
}

type DashboardButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DashboardButton({ className = "", type = "button", ...props }: DashboardButtonProps) {
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

type DashboardLabelProps = ClassNameProps & {
  children: ReactNode;
};

export function DashboardLabel({ children, className = "" }: DashboardLabelProps) {
  return (
    <h3 className={`font-mono uppercase tracking-[0.08em] text-[var(--home-accent)] ${className}`}>
      {"// "}
      {children}
    </h3>
  );
}
