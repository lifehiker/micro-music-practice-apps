export function StatsOverview({
  totalSessions,
  streak,
  accuracy,
}: {
  totalSessions: number;
  streak: number;
  accuracy: { label: string; value: number }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="glass rounded-[28px] p-5">
        <div className="text-sm text-[var(--muted)]">Sessions completed</div>
        <div className="mt-3 text-4xl font-semibold">{totalSessions}</div>
      </div>
      <div className="glass rounded-[28px] p-5">
        <div className="text-sm text-[var(--muted)]">Current streak</div>
        <div className="mt-3 text-4xl font-semibold">{streak} days</div>
      </div>
      <div className="glass rounded-[28px] p-5">
        <div className="text-sm text-[var(--muted)]">Accuracy by drill</div>
        <div className="mt-3 space-y-2">
          {accuracy.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span>{item.label}</span>
              <span className="font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
