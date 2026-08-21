"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw, X } from "lucide-react";
import { CornerMarks, DashboardButton } from "@/components/ui/DashboardPrimitives";
import type { ChatMessage as Message } from "@/lib/ai/types";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";

const welcomeMessage: Message = {
  role: "assistant",
  content: "Hey! I'm Peter's AI assistant. Ask me about his experience, projects, skills, or education.",
};

type AIChatPanelProps = {
  onClose: () => void;
};

function LoadingIndicator() {
  return (
    <div className="grid gap-2">
      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        Peter AI / Processing
      </span>
      <span className="flex gap-1">
        {[0, 120, 240].map((delay) => (
          <i
            key={delay}
            className="size-1.5 animate-bounce bg-[var(--accent)]"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </span>
    </div>
  );
}

export default function AIChatPanel({ onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  async function sendMessage(text = input) {
    const content = text.trim();
    if (!content || loading) return;

    const history = messages.slice(1).slice(-8);
    setMessages((current) => [...current, { role: "user", content }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history }),
        signal: controller.signal,
      });
      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "Could not get an answer.");
      }

      setMessages((current) => [...current, { role: "assistant", content: data.answer! }]);
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.name === "AbortError"
          ? "That request timed out. Please try again."
          : error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.";

      setMessages((current) => [...current, { role: "assistant", content: errorMessage }]);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-label="Peter's AI assistant"
      className="relative flex h-[min(720px,calc(100svh-2rem))] w-[min(1000px,calc(100vw-1.5rem))] flex-col overflow-hidden border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text)] shadow-[var(--panel-shadow)]"
    >
      <CornerMarks />
      <header className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4 sm:px-8">
        <h2 className="min-w-0 flex-1 font-mono text-sm font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
          {"// Peter AI"}
        </h2>
        <span className="hidden items-center gap-2 font-mono text-[10px] font-bold uppercase text-[var(--accent)] sm:flex">
          Online
          <i className="size-2 bg-[var(--success)] shadow-[0_0_8px_var(--success-glow)]" />
        </span>
        <DashboardButton
          onClick={() => setMessages([welcomeMessage])}
          aria-label="Clear conversation"
          className="grid size-9 place-items-center text-[var(--text-muted)]"
        >
          <RotateCcw size={16} />
        </DashboardButton>
        <DashboardButton onClick={onClose} aria-label="Close assistant" className="grid size-9 place-items-center text-[var(--text-muted)]">
          <X size={17} />
        </DashboardButton>
      </header>

      <div className="grid min-h-0 flex-1 md:grid-cols-[310px_1fr]">
        <aside className="border-b border-[var(--border)] p-5 md:border-b-0 md:border-r md:p-8">
          <h3 className="font-mono text-2xl font-bold uppercase tracking-[0.03em] text-[var(--text-primary)]">
            Ask me anything<span className="text-[var(--accent)]">._</span>
          </h3>
          <p className="mt-3 max-w-[25ch] font-mono text-xs leading-5 text-[var(--text-muted)]">
            I can answer questions about my projects, experience, skills, and more.
          </p>
          <div className="mt-6">
            <SuggestedQuestions onSelect={sendMessage} disabled={loading} />
          </div>
        </aside>

        <div className="flex min-h-0 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-8" aria-live="polite">
            {messages.map((message, index) => (
              <ChatMessage key={`${message.role}-${index}`} message={message} />
            ))}
            {loading && <LoadingIndicator />}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 pt-0 sm:p-8 sm:pt-0">
            <div className="flex min-h-14 border border-[var(--border)] bg-[var(--background)] focus-within:border-[var(--border-strong)]">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                maxLength={1000}
                rows={1}
                placeholder="Ask me anything..."
                className="max-h-28 min-h-14 min-w-0 flex-1 resize-none bg-transparent px-4 py-[18px] font-mono text-sm leading-5 outline-none placeholder:text-[var(--input-placeholder)]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="relative grid w-14 shrink-0 place-items-center border-l border-[var(--border)] bg-[var(--text)] text-[var(--background)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--on-accent)] disabled:cursor-not-allowed disabled:opacity-40 before:absolute before:left-1 before:top-1 before:size-2 before:border-l before:border-t before:border-current after:absolute after:bottom-1 after:right-1 after:size-2 after:border-b after:border-r after:border-current"
              >
                <ArrowRight size={21} strokeWidth={1.6} />
              </button>
            </div>
            <p className="pt-2 font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Powered by Peter AI</p>
          </form>
        </div>
      </div>
    </section>
  );
}
