export function StreakCard({
  streak,
  history,
}: {
  streak: number;
  history: { label: string; complete: boolean }[];
}) {
  return (
    <div className="glass rounded-[28px] p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-[var(--muted)]">Current streak</div>
          <div className="mt-2 text-4xl font-semibold">{streak}</div>
        </div>
        <div className="text-right text-sm text-[var(--muted)]">One finished drill counts for the day.</div>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-2">
        {history.map((day) => (
          <div
            key={day.label}
            className={`rounded-2xl p-3 text-center text-xs ${day.complete ? "bg-[var(--foreground)] text-white" : "bg-white/50 text-[var(--muted)]"}`}
          >
            {day.label}
          </div>
        ))}
      </div>
    </div>
  );
}
