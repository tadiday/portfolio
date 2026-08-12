const questions = ["What did Peter do at Peraton?", "What are his strongest technical skills?", "Tell me about his projects.", "What AI experience does he have?"];

export default function SuggestedQuestions({ onSelect, disabled }: { onSelect: (question: string) => void; disabled: boolean }) {
  return <div className="flex flex-wrap gap-2">{questions.map((question) => <button key={question} type="button" disabled={disabled} onClick={() => onSelect(question)} className="rounded-full border border-white/15 px-3 py-1.5 text-left text-xs text-zinc-300 transition hover:border-[#967A54] hover:text-white disabled:opacity-50">{question}</button>)}</div>;
}
