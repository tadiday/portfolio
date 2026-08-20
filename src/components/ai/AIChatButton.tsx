export default function AIChatButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close Peter's AI assistant" : "Open Peter's AI assistant"}
      aria-expanded={open}
      className="relative grid size-13 place-items-center border border-[var(--accent)] bg-[var(--surface)] font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[var(--accent)] shadow-[var(--button-shadow)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--on-accent)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <span className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-current" />
      <span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-current" />
      {open ? "X" : "AI"}
      {!open && <span className="absolute right-1.5 top-1.5 size-1.5 bg-[var(--success)]" />}
    </button>
  );
}
