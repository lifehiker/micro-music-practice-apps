import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { trackEvent } from "@/lib/analytics";

const onboardingSchema = z.object({
  instrumentFocus: z.string().min(2),
  skillFocus: z.array(z.string()).min(1),
  dailyGoalMinutes: z.number().min(2).max(10),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid onboarding data." }, { status: 400 });
  }

  await prisma.onboardingProfile.upsert({
    where: { userId: session.user.id },
    update: {
      instrumentFocus: parsed.data.instrumentFocus,
      skillFocus: JSON.stringify(parsed.data.skillFocus),
      dailyGoalMinutes: parsed.data.dailyGoalMinutes,
    },
    create: {
      userId: session.user.id,
      instrumentFocus: parsed.data.instrumentFocus,
      skillFocus: JSON.stringify(parsed.data.skillFocus),
      dailyGoalMinutes: parsed.data.dailyGoalMinutes,
    },
  });

  await trackEvent("onboarding_completed", session.user.id, parsed.data);

  return NextResponse.json({ ok: true });
}
