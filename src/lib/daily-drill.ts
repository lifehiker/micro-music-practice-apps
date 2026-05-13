import { DrillType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { buildSeedItems } from "@/lib/seed-data";
import { getSelectionWeight, weightedPick } from "@/lib/adaptive";
import { getTodayKey, safeJsonParse } from "@/lib/utils";

export async function ensureSeedData() {
  const count = await prisma.drillItem.count();
  if (count > 0) return;

  const seedItems = buildSeedItems();
  await prisma.drillItem.createMany({
    data: seedItems.map((item) => ({
      ...item,
      answerOptions: JSON.stringify(item.answerOptions),
      tags: JSON.stringify(item.tags),
    })),
  });
}

function parseSkillFocus(skillFocus: string) {
  return safeJsonParse<string[]>(skillFocus, ["intervals"]);
}

function pickDrillType(skillFocus: string[], isPro: boolean) {
  const normalized = skillFocus.map((item) => item.toLowerCase());

  if (!isPro) {
    return DrillType.INTERVAL;
  }

  if (normalized.includes("progressions")) return DrillType.PROGRESSION;
  if (normalized.includes("chord quality")) return DrillType.CHORD_QUALITY;
  return DrillType.INTERVAL;
}

export async function getOrAssignDailyDrill(userId: string, isPro: boolean) {
  await ensureSeedData();

  const dateKey = getTodayKey();
  const existing = await prisma.dailyDrill.findUnique({
    where: { userId_dateKey: { userId, dateKey } },
  });

  if (existing) {
    return existing;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { onboarding: true, skillStats: true },
  });

  const skillFocus = parseSkillFocus(user?.onboarding?.skillFocus || "[\"intervals\"]");
  const type = pickDrillType(skillFocus, isPro);
  const items = await prisma.drillItem.findMany({ where: { type, active: true } });

  const weighted = weightedPick(
    items,
    (item) =>
      getSelectionWeight(
        item,
        user?.skillStats.find((stat) => stat.skillKey === item.correctAnswer) || null,
      ),
    10,
  );

  return prisma.dailyDrill.create({
    data: {
      userId,
      dateKey,
      drillType: type,
      drillItemIds: JSON.stringify(weighted.map((item) => item.id)),
    },
  });
}

export async function getDrillItemsByType(type: DrillType, isPro: boolean, userId: string) {
  await ensureSeedData();

  if (!isPro && type !== DrillType.INTERVAL) {
    return { gated: true as const, items: [] };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { skillStats: true },
  });
  const items = await prisma.drillItem.findMany({ where: { type, active: true } });
  const selected = weightedPick(
    items,
    (item) =>
      getSelectionWeight(
        item,
        user?.skillStats.find((stat) => stat.skillKey === item.correctAnswer) || null,
      ),
    10,
  );

  return { gated: false as const, items: selected };
}
