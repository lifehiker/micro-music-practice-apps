import { DrillItem, UserSkillStat } from "@prisma/client";

export function getSelectionWeight(item: DrillItem, stat?: UserSkillStat | null) {
  if (!stat) {
    return 1.2;
  }

  const masteryPenalty = stat.masteryScore < 0.75 ? 1.75 - stat.masteryScore : 0.85;
  const recentMissBoost =
    stat.lastSeenAt && Date.now() - new Date(stat.lastSeenAt).getTime() < 1000 * 60 * 60 * 48
      ? 1.2
      : 1;

  return Math.max(0.45, masteryPenalty * recentMissBoost * (1 + item.difficulty / 10));
}

export function weightedPick<T>(items: T[], getWeight: (item: T) => number, count: number) {
  const pool = [...items];
  const picked: T[] = [];

  while (pool.length > 0 && picked.length < count) {
    const total = pool.reduce((sum, item) => sum + getWeight(item), 0);
    let cursor = Math.random() * total;
    const index = pool.findIndex((item) => {
      cursor -= getWeight(item);
      return cursor <= 0;
    });
    const selectedIndex = index >= 0 ? index : 0;
    picked.push(pool[selectedIndex]);
    pool.splice(selectedIndex, 1);
  }

  return picked;
}
