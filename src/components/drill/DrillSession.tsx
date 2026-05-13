"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/drill/QuestionCard";
import { SessionProgress } from "@/components/drill/SessionProgress";
import { SessionSummary } from "@/components/drill/SessionSummary";
import { Button } from "@/components/ui/button";

type DrillQuestion = {
  id: string;
  promptAudioUrl: string;
  correctAnswer: string;
  answerOptions: string;
};

type DrillSessionProps = {
  drillType: string;
  isDailyAssigned: boolean;
  questions: DrillQuestion[];
};

export function DrillSession({ drillType, isDailyAssigned, questions }: DrillSessionProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);
  const [answers, setAnswers] = useState<
    { drillItemId: string; selectedAnswer: string; isCorrect: boolean; responseTimeMs: number }[]
  >([]);
  const [saving, setSaving] = useState(false);

  const current = questions[index];
  const score = useMemo(() => answers.filter((answer) => answer.isCorrect).length, [answers]);

  if (!questions.length) {
    return (
      <div className="glass rounded-[32px] p-8 text-center">
        <h2 className="text-2xl font-semibold">No drill items available yet</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Seed data should populate automatically, but you can revisit the dashboard in a moment.
        </p>
      </div>
    );
  }

  if (index >= questions.length) {
    return <SessionSummary score={score} drillLabel={drillType.toLowerCase().replaceAll("_", " ")} />;
  }

  async function handleNext(answer: string) {
    const isCorrect = answer === current.correctAnswer;
    setSelected(answer);
    setReveal(true);

    const nextAnswer = {
      drillItemId: current.id,
      selectedAnswer: answer,
      isCorrect,
      responseTimeMs: 900 + index * 120,
    };

    setAnswers((prev) => [...prev, nextAnswer]);

    setTimeout(async () => {
      setReveal(false);
      setSelected(null);

      if (index === questions.length - 1) {
        setSaving(true);
        await fetch("/api/practice/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            drillType,
            isDailyAssigned,
            score: score + (isCorrect ? 1 : 0),
            questionCount: questions.length,
            answers: [...answers, nextAnswer],
          }),
        });
        setSaving(false);
      }

      setIndex((prev) => prev + 1);
      router.refresh();
    }, 850);
  }

  return (
    <div className="space-y-5">
      <div className="glass rounded-[28px] p-5">
        <SessionProgress current={index + 1} total={questions.length} />
      </div>
      <QuestionCard question={current} selected={selected} reveal={reveal} onSelect={handleNext} />
      {saving ? (
        <div className="text-center text-sm text-[var(--muted)]">Saving your session...</div>
      ) : null}
      <div className="text-center">
        <Button type="button" variant="ghost" onClick={() => router.push("/app")}>
          Exit drill
        </Button>
      </div>
    </div>
  );
}
