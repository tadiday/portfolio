import type { ChatMessage as Message } from "@/lib/ai/types";

export default function ChatMessage({ message }: { message: Message }) {
  const assistant = message.role === "assistant";
  return (
    <div className={`flex ${assistant ? "justify-start" : "justify-end"}`}>
      <div className={assistant ? "w-full" : "max-w-[84%] border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3"}>
        {assistant && (
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
            Peter AI
          </p>
        )}
        <p className={`whitespace-pre-wrap text-sm leading-6 ${assistant ? "text-[#d7dade]" : "font-medium text-white"}`}>
          {message.content}
        </p>
      </div>
    </div>
  );
}
