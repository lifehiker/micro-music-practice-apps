import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SessionSummary({
  score,
  drillLabel,
}: {
  score: number;
  drillLabel: string;
}) {
  return (
    <div className="glass rounded-[32px] p-6 text-center md:p-8">
      <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Session complete</div>
      <h2 className="mt-3 text-3xl font-semibold">
        {score}/10 on {drillLabel}
      </h2>
      <p className="mt-3 text-sm text-[var(--muted)]">
        The app has saved your answers, updated weak spots, and counted today toward your streak.
      </p>
      <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-center">
        <Link href="/app">
          <Button variant="accent">Back to today</Button>
        </Link>
        <Link href="/app/stats">
          <Button variant="ghost">View stats</Button>
        </Link>
      </div>
    </div>
  );
}
