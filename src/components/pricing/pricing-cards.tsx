"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getPricingCards } from "@/lib/billing";

export function PricingCards() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  async function startCheckout(plan: string) {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const payload = await response.json();

    if (payload.url) {
      router.push(payload.url);
      return;
    }

    setMessage(payload.message || "Unable to start checkout.");
  }

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {getPricingCards().map((plan) => (
        <article key={plan.id} className="rounded-[28px] border border-[var(--line)] bg-white/55 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{plan.name}</div>
          <div className="mt-4 text-4xl font-semibold">
            {plan.price}
            <span className="text-base text-[var(--muted)]">{plan.cadence}</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{plan.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-[var(--ink-soft)]">
            <li>Unlimited drill sessions</li>
            <li>Chord quality and progression packs</li>
            <li>Adaptive repetition and full history</li>
          </ul>
          <Button variant={plan.featured ? "accent" : "primary"} className="mt-6 w-full" onClick={() => startCheckout(plan.id)}>
            {plan.featured ? "Start yearly plan" : "Start monthly plan"}
          </Button>
        </article>
      ))}
      {message ? <p className="md:col-span-2 text-sm text-[var(--muted)]">{message}</p> : null}
    </div>
  );
}
