import { SubscriptionStatus } from "@prisma/client";

export function isProStatus(status?: string | null) {
  return status === SubscriptionStatus.ACTIVE || status === SubscriptionStatus.TRIALING;
}

export function getPricingCards() {
  return [
    {
      id: "monthly",
      name: "Pro Monthly",
      price: "$7.99",
      cadence: "/month",
      description: "Unlimited drills and adaptive weak-spot training.",
    },
    {
      id: "yearly",
      name: "Pro Yearly",
      price: "$59",
      cadence: "/year",
      description: "Best for daily habit builders. Includes a 7-day trial when Stripe is configured.",
      featured: true,
    },
  ];
}
