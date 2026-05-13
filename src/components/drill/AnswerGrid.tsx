import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnswerGridProps = {
  answers: string[];
  selected?: string | null;
  correctAnswer: string;
  reveal: boolean;
  onSelect: (answer: string) => void;
};

export function AnswerGrid({
  answers,
  selected,
  correctAnswer,
  reveal,
  onSelect,
}: AnswerGridProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {answers.map((answer) => {
        const isCorrect = answer === correctAnswer;
        const isSelected = answer === selected;

        return (
          <Button
            key={answer}
            type="button"
            variant="ghost"
            className={cn(
              "justify-start rounded-3xl px-5 py-4 text-left text-base",
              reveal && isCorrect && "border-transparent bg-emerald-100 text-emerald-900",
              reveal && isSelected && !isCorrect && "border-transparent bg-rose-100 text-rose-900",
            )}
            onClick={() => onSelect(answer)}
            disabled={reveal}
          >
            {answer}
          </Button>
        );
      })}
    </div>
  );
}
