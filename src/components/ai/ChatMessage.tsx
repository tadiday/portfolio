import { Bot } from "lucide-react";
import type { ChatMessage as Message } from "@/lib/ai/types";

export default function ChatMessage({ message }: { message: Message }) {
  const assistant = message.role === "assistant";
  return (
    <div className={`flex items-end gap-2 ${assistant ? "justify-start" : "justify-end"}`}>
      {assistant && <div className="grid size-7 shrink-0 place-items-center rounded-full bg-[#967A54] text-black"><Bot size={14} /></div>}
      <p className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${assistant ? "rounded-bl-sm bg-white/8 text-zinc-200" : "rounded-br-sm bg-[#967A54] text-black"}`}>
        {message.content}
      </p>
    </div>
  );
}
