import { DrillType } from "@prisma/client";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { DrillSession } from "@/components/drill/DrillSession";
import { requireSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { getDrillItemsByType, getOrAssignDailyDrill } from "@/lib/daily-drill";
import { isProStatus } from "@/lib/billing";

const typeMap: Record<string, DrillType> = {
  interval: DrillType.INTERVAL,
  chord_quality: DrillType.CHORD_QUALITY,
  progression: DrillType.PROGRESSION,
};

export default async function DrillPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const drillType = typeMap[type];
  if (!drillType) notFound();

  const session = await requireSession();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });
  const isPro = isProStatus(user?.subscription?.status);
  const dailyDrill = await getOrAssignDailyDrill(session.user.id, isPro);

  const data =
    dailyDrill.drillType === drillType
      ? {
          gated: false,
          items: await prisma.drillItem.findMany({
            where: {
              id: {
                in: JSON.parse(dailyDrill.drillItemIds) as string[],
              },
            },
          }),
        }
      : await getDrillItemsByType(drillType, isPro, session.user.id);

  return (
    <AppShell title="Drill" subtitle={drillType.toLowerCase().replaceAll("_", " ")}>
      {data.gated ? (
        <div className="glass rounded-[32px] p-8">
          <h1 className="text-3xl font-semibold">This drill is part of Pro</h1>
          <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
            Free users get one daily interval drill. Upgrade to practice chords, progressions, and adaptive weak-spot mode.
          </p>
        </div>
      ) : (
        <DrillSession
          drillType={drillType}
          isDailyAssigned={dailyDrill.drillType === drillType}
          questions={data.items}
        />
      )}
    </AppShell>
  );
}
