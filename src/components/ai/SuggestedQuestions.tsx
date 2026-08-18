const questions = [
  "What's your background?",
  "What projects have you built?",
  "What experience do you have?",
  "Are you open to opportunities?",
  "How can I contact you?",
];

type SuggestedQuestionsProps = {
  disabled: boolean;
  onSelect: (question: string) => void;
};

export default function SuggestedQuestions({ disabled, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="grid gap-1.5">
      <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#626970]">
        Suggested queries
      </p>
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(question)}
          className="group flex items-center gap-3 border border-[var(--border)] px-3 py-2.5 text-left font-mono text-xs leading-5 text-[#aeb3b8] transition-colors hover:border-[var(--accent)] hover:text-white disabled:opacity-40"
        >
          <span className="text-[var(--accent)]">↗</span>
          <span>{question}</span>
        </button>
      ))}
    </div>
  );
}
