import { prisma } from "@/lib/prisma";

export async function trackEvent(eventName: string, userId?: string, payload?: unknown) {
  await prisma.analyticsEvent.create({
    data: {
      eventName,
      userId,
      payload: payload ? JSON.stringify(payload) : null,
    },
  });
}
