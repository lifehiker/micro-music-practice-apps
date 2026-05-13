import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayKey } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { sendUpgradePromptEmail } from "@/lib/email";

const completionSchema = z.object({
  drillType: z.enum(["INTERVAL", "CHORD_QUALITY", "PROGRESSION"]),
  isDailyAssigned: z.boolean(),
  score: z.number().min(0).max(10),
  questionCount: z.number().min(1).max(10),
  answers: z.array(
    z.object({
      drillItemId: z.string(),
      selectedAnswer: z.string(),
      isCorrect: z.boolean(),
      responseTimeMs: z.number(),
    }),
  ),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = completionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid practice payload." }, { status: 400 });
  }

  const practiceSession = await prisma.practiceSession.create({
    data: {
      userId: session.user.id,
      drillType: parsed.data.drillType,
      score: parsed.data.score,
      questionCount: parsed.data.questionCount,
      completedAt: new Date(),
      isDailyAssigned: parsed.data.isDailyAssigned,
      answers: {
        create: parsed.data.answers,
      },
    },
  });

  const drillItems = await prisma.drillItem.findMany({
    where: {
      id: { in: parsed.data.answers.map((answer) => answer.drillItemId) },
    },
  });

  for (const answer of parsed.data.answers) {
    const item = drillItems.find((entry) => entry.id === answer.drillItemId);
    if (!item) continue;

    const skillKey = item.correctAnswer;
    const stat = await prisma.userSkillStat.findUnique({
      where: { userId_skillKey: { userId: session.user.id, skillKey } },
    });
    const attempts = (stat?.attempts || 0) + 1;
    const correct = (stat?.correct || 0) + (answer.isCorrect ? 1 : 0);

    await prisma.userSkillStat.upsert({
      where: { userId_skillKey: { userId: session.user.id, skillKey } },
      update: {
        attempts,
        correct,
        masteryScore: correct / attempts,
        lastSeenAt: new Date(),
      },
      create: {
        userId: session.user.id,
        skillKey,
        attempts,
        correct,
        masteryScore: correct / attempts,
        lastSeenAt: new Date(),
      },
    });
  }

  if (parsed.data.isDailyAssigned) {
    await prisma.dailyDrill.updateMany({
      where: { userId: session.user.id, dateKey: getTodayKey() },
      data: { completed: true },
    });
  }

  const completedCount = await prisma.practiceSession.count({
    where: { userId: session.user.id, completedAt: { not: null } },
  });
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  if (completedCount === 3 && user?.email) {
    await sendUpgradePromptEmail(user.email, user.name);
  }

  await trackEvent("drill_completed", session.user.id, {
    sessionId: practiceSession.id,
    drillType: practiceSession.drillType,
    score: parsed.data.score,
  });

  return NextResponse.json({ ok: true });
}
