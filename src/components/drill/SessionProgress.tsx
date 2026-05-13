export function SessionProgress({ current, total }: { current: number; total: number }) {
  const percent = (current / total) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
        <span>Progress</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="h-3 rounded-full bg-white/50">
        <div
          className="h-3 rounded-full bg-[linear-gradient(90deg,var(--accent),var(--teal))]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
