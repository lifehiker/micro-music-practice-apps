import { DrillType } from "@prisma/client";
import { AccuracyByType } from "@/components/stats/AccuracyByType";
import { AppShell } from "@/components/layout/app-shell";
import { StatsOverview } from "@/components/stats/StatsOverview";
import { WeakSpotsList } from "@/components/stats/WeakSpotsList";
import { requireSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { buildSevenDayHistory, getCurrentStreak } from "@/lib/streaks";

export default async function StatsPage() {
  const session = await requireSession();
  const [practiceSessions, skillStats] = await Promise.all([
    prisma.practiceSession.findMany({
      where: { userId: session.user.id, completedAt: { not: null } },
      include: { answers: true },
      orderBy: { completedAt: "desc" },
    }),
    prisma.userSkillStat.findMany({
      where: { userId: session.user.id },
      orderBy: { masteryScore: "asc" },
      take: 3,
    }),
  ]);

  const completedDates = practiceSessions.map((item) => item.completedAt!).filter(Boolean);
  const streak = getCurrentStreak(completedDates);

  const accuracy = Object.values(DrillType).map((type) => {
    const sessions = practiceSessions.filter((session) => session.drillType === type);
    const totalAnswers = sessions.reduce((sum, current) => sum + current.answers.length, 0);
    const correctAnswers = sessions.reduce(
      (sum, current) => sum + current.answers.filter((answer) => answer.isCorrect).length,
      0,
    );
    return {
      label: type.toLowerCase().replaceAll("_", " "),
      value: totalAnswers ? Math.round((correctAnswers / totalAnswers) * 100) : 0,
    };
  });

  return (
    <AppShell title="Stats" subtitle="Accuracy, streaks, and weak spots">
      <div className="space-y-5">
        <StatsOverview totalSessions={practiceSessions.length} streak={streak} accuracy={accuracy} />
        <div className="grid gap-5 md:grid-cols-2">
          <WeakSpotsList items={skillStats} />
          <AccuracyByType items={accuracy} />
        </div>
        <div className="glass rounded-[28px] p-5">
          <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">7-day activity</div>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {buildSevenDayHistory(completedDates).map((day) => (
              <div
                key={day.dateKey}
                className={`rounded-2xl p-3 text-center text-xs ${day.complete ? "bg-[var(--foreground)] text-white" : "bg-white/50 text-[var(--muted)]"}`}
              >
                {day.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
