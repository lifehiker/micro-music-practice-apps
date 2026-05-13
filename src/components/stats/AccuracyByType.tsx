export function AccuracyByType({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  return (
    <div className="glass rounded-[28px] p-5">
      <h2 className="text-xl font-semibold">Accuracy by drill type</h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{item.label}</span>
              <span className="font-semibold">{item.value}%</span>
            </div>
            <div className="h-3 rounded-full bg-white/50">
              <div
                className="h-3 rounded-full bg-[linear-gradient(90deg,var(--teal),var(--accent))]"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
