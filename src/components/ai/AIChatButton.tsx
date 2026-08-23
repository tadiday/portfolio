import {
  PopupTriggerCorners,
  popupTriggerClassName,
} from "@/components/ui/DashboardPrimitives";

export default function AIChatButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        open ? "Close Peter's AI assistant" : "Open Peter's AI assistant"
      }
      aria-expanded={open}
      className={`${popupTriggerClassName} grid size-13 place-items-center border border-[var(--accent)] bg-[var(--surface)] font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[var(--accent)] shadow-[var(--button-shadow)] hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
    >
      <PopupTriggerCorners />
      {open ? "X" : "AI"}
      {!open && (
        <span className="absolute right-1.5 top-1.5 size-1.5 bg-[var(--success)]" />
      )}
    </button>
  );
}
