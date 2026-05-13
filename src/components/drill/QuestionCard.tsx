import { AudioPlayerButton } from "@/components/drill/AudioPlayerButton";
import { AnswerGrid } from "@/components/drill/AnswerGrid";
import { safeJsonParse } from "@/lib/utils";

type QuestionCardProps = {
  question: {
    id: string;
    promptAudioUrl: string;
    correctAnswer: string;
    answerOptions: string;
  };
  selected: string | null;
  reveal: boolean;
  onSelect: (answer: string) => void;
};

export function QuestionCard({ question, selected, reveal, onSelect }: QuestionCardProps) {
  const options = safeJsonParse<string[]>(question.answerOptions, []);

  return (
    <div className="glass rounded-[32px] p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Listen first</div>
          <h2 className="mt-2 text-2xl font-semibold">What did you hear?</h2>
        </div>
        <AudioPlayerButton url={question.promptAudioUrl} />
      </div>
      <AnswerGrid
        answers={options}
        selected={selected}
        correctAnswer={question.correctAnswer}
        reveal={reveal}
        onSelect={onSelect}
      />
      {reveal ? (
        <p className="mt-4 text-sm text-[var(--muted)]">
          Correct answer: <span className="font-semibold text-[var(--foreground)]">{question.correctAnswer}</span>
        </p>
      ) : null}
    </div>
  );
}
