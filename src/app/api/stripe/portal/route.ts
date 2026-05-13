import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/utils";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  if (!process.env.STRIPE_SECRET_KEY || !subscription?.stripeCustomerId) {
    return NextResponse.json({
      message: "Stripe portal is unavailable until Stripe credentials are configured.",
    });
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const portal = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${getBaseUrl()}/app/settings`,
  });

  return NextResponse.json({ url: portal.url });
}
