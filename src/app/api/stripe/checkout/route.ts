import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Create an account to upgrade." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({ plan: "yearly" }));
  await trackEvent("checkout_started", session.user.id, body);

  if (
    !process.env.STRIPE_SECRET_KEY ||
    !process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID ||
    !process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
  ) {
    await prisma.subscription.upsert({
      where: { userId: session.user.id },
      update: {
        status: "ACTIVE",
        source: "local-preview",
        currentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
      },
      create: {
        userId: session.user.id,
        status: "ACTIVE",
        source: "local-preview",
        currentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
      },
    });

    return NextResponse.json({
      message: "Stripe is not configured, so EarKit unlocked a local Pro preview for this account.",
      url: `${getBaseUrl()}/app`,
    });
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const priceId =
    body.plan === "monthly"
      ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
      : process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${getBaseUrl()}/app?upgraded=1`,
    cancel_url: `${getBaseUrl()}/pricing`,
    customer_email: session.user.email || undefined,
    metadata: { userId: session.user.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
