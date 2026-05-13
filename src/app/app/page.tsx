import Link from "next/link";
import { DrillType } from "@prisma/client";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { StreakCard } from "@/components/home/StreakCard";
import { Button } from "@/components/ui/button";
import { requireSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { buildSevenDayHistory, getCurrentStreak } from "@/lib/streaks";
import { getOrAssignDailyDrill } from "@/lib/daily-drill";
import { isProStatus } from "@/lib/billing";

export default async function AppHomePage() {
  const session = await requireSession();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { onboarding: true, subscription: true },
  });

  if (!user?.onboarding) {
    redirect("/app/onboarding");
  }

  const isPro = isProStatus(user.subscription?.status);
  const dailyDrill = await getOrAssignDailyDrill(user.id, isPro);
  const completedSessions = await prisma.practiceSession.findMany({
    where: { userId: user.id, completedAt: { not: null } },
    orderBy: { completedAt: "desc" },
  });

  const completedDates = completedSessions.map((item) => item.completedAt!).filter(Boolean);
  const streak = getCurrentStreak(completedDates);
  const history = buildSevenDayHistory(completedDates);
  const yesterday = completedSessions[0];

  return (
    <AppShell title="Today" subtitle="Your daily practice loop">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="glass rounded-[32px] p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Daily drill</div>
          <h1 className="mt-3 text-4xl font-semibold">Start today&apos;s drill</h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
            Today&apos;s assigned drill is{" "}
            <span className="font-semibold">{dailyDrill.drillType.toLowerCase().replaceAll("_", " ")}</span>.
            Ten questions, replayable audio, and instant feedback.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={`/app/drill/${dailyDrill.drillType.toLowerCase()}`}>
              <Button variant="accent" size="lg">
                Start today&apos;s drill
              </Button>
            </Link>
            {!isPro ? (
              <Link href="/pricing">
                <Button variant="ghost" size="lg">
                  Unlock Pro drills
                </Button>
              </Link>
            ) : null}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-[var(--line)] bg-white/50 p-4">
              <div className="text-sm text-[var(--muted)]">Streak</div>
              <div className="mt-2 text-3xl font-semibold">{streak} days</div>
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-white/50 p-4">
              <div className="text-sm text-[var(--muted)]">Yesterday</div>
              <div className="mt-2 text-3xl font-semibold">
                {yesterday ? `${yesterday.score}/${yesterday.questionCount}` : "No session"}
              </div>
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-white/50 p-4">
              <div className="text-sm text-[var(--muted)]">Goal</div>
              <div className="mt-2 text-3xl font-semibold">{user.onboarding.dailyGoalMinutes} min</div>
            </div>
          </div>
        </section>

        <div className="space-y-5">
          <StreakCard streak={streak} history={history} />
          <section className="glass rounded-[28px] p-5">
            <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Quick start</div>
            <div className="mt-4 grid gap-3">
              {[
                { href: "/app/drill/interval", label: "Intervals", type: DrillType.INTERVAL },
                { href: "/app/drill/chord_quality", label: "Chord quality", type: DrillType.CHORD_QUALITY },
                { href: "/app/drill/progression", label: "Progressions", type: DrillType.PROGRESSION },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-3xl border p-4 ${!isPro && item.type !== DrillType.INTERVAL ? "border-dashed border-[var(--line)] bg-white/30 text-[var(--muted)]" : "border-[var(--line)] bg-white/60"}`}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className="mt-1 text-sm">
                    {!isPro && item.type !== DrillType.INTERVAL ? "Pro required" : "10-question session"}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
