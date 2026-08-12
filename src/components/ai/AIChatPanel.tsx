"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, RotateCcw, Send, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import type { ChatMessage as Message } from "@/lib/ai/types";

const welcome: Message = { role: "assistant", content: "Hey! I'm Peter's AI assistant. Ask me about his experience, projects, skills, or education." };

export default function AIChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text = input) {
    const content = text.trim();
    if (!content || loading) return;
    const history = messages.slice(1).slice(-8);
    setMessages((current) => [...current, { role: "user", content }]);
    setInput("");
    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: content, history }), signal: controller.signal });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !data.answer) throw new Error(data.error || "Could not get an answer.");
      setMessages((current) => [...current, { role: "assistant", content: data.answer! }]);
    } catch (error) {
      const message = error instanceof Error && error.name === "AbortError" ? "That request timed out. Please try again." : error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setMessages((current) => [...current, { role: "assistant", content: message }]);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <section role="dialog" aria-label="Peter's AI assistant" className="flex h-[min(620px,calc(100svh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#11110f]/95 text-white shadow-2xl backdrop-blur-xl">
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
        <div className="grid size-9 place-items-center rounded-full bg-[#967A54] text-black"><Bot size={18} /></div>
        <div className="min-w-0 flex-1"><h2 className="font-semibold">Ask about Peter</h2><p className="text-xs text-zinc-400"><span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-400" />Portfolio AI</p></div>
        <button type="button" onClick={() => setMessages([welcome])} aria-label="Clear conversation" className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"><RotateCcw size={17} /></button>
        <button type="button" onClick={onClose} aria-label="Close assistant" className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"><X size={18} /></button>
      </header>
      <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
        {messages.map((message, index) => <ChatMessage key={`${message.role}-${index}`} message={message} />)}
        {messages.length === 1 && <SuggestedQuestions onSelect={send} disabled={loading} />}
        {loading && <div className="flex items-center gap-2 text-xs text-zinc-400"><span className="grid size-7 place-items-center rounded-full bg-[#967A54] text-black"><Bot size={14} /></span><span className="flex gap-1"><i className="size-1.5 animate-bounce rounded-full bg-zinc-400" /><i className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:120ms]" /><i className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:240ms]" /></span></div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={(event) => { event.preventDefault(); void send(); }} className="border-t border-white/10 p-3">
        <div className="flex items-end gap-2 rounded-xl border border-white/15 bg-white/5 p-2 focus-within:border-[#967A54]">
          <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(); } }} maxLength={1000} rows={1} placeholder="Ask about Peter..." className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-zinc-500" />
          <button type="submit" disabled={loading || !input.trim()} aria-label="Send message" className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#967A54] text-black transition hover:bg-[#ad8d62] disabled:cursor-not-allowed disabled:opacity-40"><Send size={16} /></button>
        </div>
        <p className="pt-2 text-center text-[10px] text-zinc-500">Answers are grounded in Peter&apos;s portfolio data.</p>
      </form>
    </section>
  );
}
