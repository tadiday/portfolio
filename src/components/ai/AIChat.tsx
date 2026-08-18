import AIChatButton from "./AIChatButton";
import AIChatPanel from "./AIChatPanel";

export default function AIChat({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[300] grid place-items-center bg-black/75 p-3 backdrop-blur-[3px] sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onOpenChange(false);
          }}
        >
          <AIChatPanel onClose={() => onOpenChange(false)} />
        </div>
      )}
      <div className="fixed bottom-6 right-6 z-[200] min-[1100px]:hidden">
        <AIChatButton open={open} onClick={() => onOpenChange(!open)} />
      </div>
    </>
  );
}
