import { MessageCircle, X } from "lucide-react";

export default function AIChatButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-label={open ? "Close Peter's AI assistant" : "Open Peter's AI assistant"} aria-expanded={open} className="grid size-14 place-items-center rounded-full border border-white/15 bg-[#967A54] text-black shadow-2xl transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/70">{open ? <X /> : <MessageCircle />}</button>;
}
