import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { requireSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { safeJsonParse } from "@/lib/utils";

export default async function SettingsPage() {
  const session = await requireSession();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { onboarding: true, subscription: true },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <AppShell title="Settings" subtitle="Practice profile and billing">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <OnboardingForm
          initialValues={
            user.onboarding
              ? {
                  instrumentFocus: user.onboarding.instrumentFocus,
                  skillFocus: safeJsonParse<string[]>(user.onboarding.skillFocus, ["intervals"]),
                  dailyGoalMinutes: user.onboarding.dailyGoalMinutes,
                }
              : undefined
          }
        />
        <section className="glass rounded-[32px] p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Billing</div>
          <h2 className="mt-3 text-3xl font-semibold">
            {user.subscription?.status === "ACTIVE" ? "EarKit Pro active" : "Free plan"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
            Stripe checkout and portal are guarded. When Stripe is not configured, the app can still unlock a local preview subscription for QA and demos.
          </p>
          <div className="mt-5 rounded-[28px] border border-[var(--line)] bg-white/50 p-4 text-sm">
            <div>Status: {user.subscription?.status || "FREE"}</div>
            <div className="mt-1">Source: {user.subscription?.source || "local"}</div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
