import AIChatButton from "./AIChatButton";
import AIChatPanel from "./AIChatPanel";
import ThemeToggle from "@/components/navigation/ThemeToggle";

export default function AIChat({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[300] grid place-items-center bg-[var(--overlay)] p-3 backdrop-blur-[3px] sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onOpenChange(false);
          }}
        >
          <AIChatPanel onClose={() => onOpenChange(false)} />
        </div>
      )}
      <div className="fixed bottom-[5.75rem] right-6 z-[200] min-[1100px]:hidden">
        <ThemeToggle mobile />
      </div>
      <div className="fixed bottom-6 right-6 z-[200] min-[1100px]:hidden">
        <AIChatButton open={open} onClick={() => onOpenChange(!open)} />
      </div>
    </>
  );
}
