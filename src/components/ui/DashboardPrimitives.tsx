import type { ReactNode } from "react";

type ClassNameProps = {
  className?: string;
};

export function CornerMarks() {
  return (
    <>
      <span aria-hidden="true" className="absolute left-2 top-2 h-2 w-2 border-l border-t border-white/55" />
      <span aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 border-r border-t border-white/55" />
      <span aria-hidden="true" className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-white/55" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-white/55" />
    </>
  );
}

type DashboardPanelProps = ClassNameProps & {
  children: ReactNode;
};

export function DashboardPanel({ children, className = "" }: DashboardPanelProps) {
  return (
    <div className={`relative min-w-0 border border-[#494d51] bg-[#090a0b] ${className}`}>
      <CornerMarks />
      {children}
    </div>
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
