import Link from "next/link";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { MarketingHeader } from "@/components/layout/marketing-header";

export default function PricingPage() {
  return (
    <div className="pb-16">
      <MarketingHeader />
      <main className="shell">
        <section className="glass rounded-[36px] p-8 md:p-10">
          <div className="max-w-2xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Pricing</div>
            <h1 className="mt-3 text-5xl font-semibold text-balance">Free daily drill or full Pro practice loop.</h1>
            <p className="mt-4 text-base leading-8 text-[var(--ink-soft)]">
              Free covers the daily interval drill and 7-day history. Pro unlocks unlimited drills,
              chords, progressions, adaptive mode, and complete practice history.
            </p>
          </div>
          <PricingCards />
          <p className="mt-6 text-sm text-[var(--muted)]">
            No Stripe keys configured? The upgrade flow falls back to a local preview unlock so the app remains fully explorable.
            <Link href="/signup" className="ml-2 font-semibold text-[var(--accent)]">
              Create an account
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
