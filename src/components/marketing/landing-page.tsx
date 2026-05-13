import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingHeader } from "@/components/layout/marketing-header";

type LandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

export function LandingPage({ eyebrow, title, description, bullets }: LandingPageProps) {
  return (
    <div className="pb-16">
      <MarketingHeader />
      <main className="shell">
        <section className="glass rounded-[36px] p-8 md:p-10">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">{eyebrow}</div>
            <h1 className="mt-3 text-5xl font-semibold leading-[1.04] text-balance md:text-6xl">{title}</h1>
            <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">{description}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {bullets.map((bullet) => (
              <div key={bullet} className="rounded-[24px] border border-[var(--line)] bg-white/55 p-5 text-sm leading-7 text-[var(--ink-soft)]">
                {bullet}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup">
              <Button variant="accent" size="lg">
                Try the free daily drill
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" size="lg">
                Compare plans
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
