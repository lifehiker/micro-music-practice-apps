import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trackEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const payload = await request.text();
  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const object = event.data.object as { metadata?: { userId?: string }; customer?: string; id?: string; status?: string; items?: { data?: Array<{ price?: { id?: string } }> }; current_period_end?: number };
    const userId = object.metadata?.userId;

    if (userId) {
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          stripeCustomerId: String(object.customer || ""),
          stripeSubscriptionId: String(object.id || ""),
          priceId: object.items?.data?.[0]?.price?.id || null,
          status: event.type === "customer.subscription.deleted" ? "CANCELED" : "ACTIVE",
          currentPeriodEnd: object.current_period_end ? new Date(object.current_period_end * 1000) : null,
          source: "stripe",
        },
        create: {
          userId,
          stripeCustomerId: String(object.customer || ""),
          stripeSubscriptionId: String(object.id || ""),
          priceId: object.items?.data?.[0]?.price?.id || null,
          status: event.type === "customer.subscription.deleted" ? "CANCELED" : "ACTIVE",
          currentPeriodEnd: object.current_period_end ? new Date(object.current_period_end * 1000) : null,
          source: "stripe",
        },
      });

      await trackEvent("subscription_activated", userId, { eventType: event.type });
    }
  }

  return NextResponse.json({ ok: true });
}
