import { requireSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { safeJsonParse } from "@/lib/utils";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

export default async function OnboardingPage() {
  const session = await requireSession();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { onboarding: true },
  });

  const initialValues = user?.onboarding
    ? {
        instrumentFocus: user.onboarding.instrumentFocus,
        skillFocus: safeJsonParse<string[]>(user.onboarding.skillFocus, ["intervals"]),
        dailyGoalMinutes: user.onboarding.dailyGoalMinutes,
      }
    : undefined;

  return (
    <main className="shell py-10">
      <OnboardingForm initialValues={initialValues} />
    </main>
  );
}
