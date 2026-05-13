export function WeakSpotsList({
  items,
}: {
  items: { skillKey: string; masteryScore: number; attempts: number }[];
}) {
  return (
    <div className="glass rounded-[28px] p-5">
      <h2 className="text-xl font-semibold">Top weak spots</h2>
      <div className="mt-4 space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.skillKey} className="rounded-3xl border border-[var(--line)] bg-white/50 p-4">
              <div className="font-semibold">{item.skillKey}</div>
              <div className="mt-1 text-sm text-[var(--muted)]">
                {Math.round(item.masteryScore * 100)}% mastery across {item.attempts} attempts
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-[var(--muted)]">Finish a session and weak spots will appear here.</p>
        )}
      </div>
    </div>
  );
}
