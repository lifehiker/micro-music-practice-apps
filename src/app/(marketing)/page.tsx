import Link from "next/link";
import { Music2, Flame, Headphones, Sparkles } from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { Button } from "@/components/ui/button";
import { getPricingCards } from "@/lib/billing";

export default function HomePage() {
  const pricing = getPricingCards();

  return (
    <div className="pb-16">
      <MarketingHeader />
      <main className="shell space-y-8">
        <section className="section-grid grid gap-8 rounded-[40px] px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-14">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-[var(--line)] bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              5-minute daily ear training for self-taught musicians
            </div>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] text-balance md:text-7xl">
              Practice intervals, chords, and progressions without the classroom feel.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
              EarKit gives hobbyist guitarists, singers, pianists, and producers one focused drill
              a day with replayable audio, weak-spot repetition, and streak-friendly sessions.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/signup">
                <Button variant="accent" size="lg">
                  Start today&apos;s free drill
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" size="lg">
                  See plans
                </Button>
              </Link>
            </div>
            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              {[
                ["10 questions", "Tight sessions built for phones"],
                ["Adaptive repeats", "Missed sounds come back more often"],
                ["Piano-first audio", "Stable local samples with replay"],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[28px] border border-[var(--line)] bg-white/55 p-4">
                  <div className="font-semibold">{title}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{copy}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[32px] p-5 md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[var(--muted)]">Today&apos;s drill</div>
                <div className="mt-1 text-2xl font-semibold">Chord progression sprint</div>
              </div>
              <div className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm text-white">
                4 min
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: "Replay audio", icon: Headphones },
                { label: "Choose one of four progressions", icon: Music2 },
                { label: "Instant feedback + streak update", icon: Flame },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-3xl bg-white/60 p-4">
                  <div className="rounded-2xl bg-[var(--foreground)] p-3 text-white">
                    <item.icon size={18} />
                  </div>
                  <div className="text-sm font-medium">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[28px] bg-[var(--foreground)] p-5 text-white">
              <div className="flex items-center gap-3">
                <Sparkles size={18} />
                <div className="font-semibold">Adaptive mode</div>
              </div>
              <p className="mt-2 text-sm text-white/80">
                Paid users get more progressions, unlimited drills, and weighted weak-spot training.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Intervals",
              copy: "Train seconds through sixths with large, tap-friendly choices and immediate correction.",
            },
            {
              title: "Chord quality",
              copy: "Differentiate major, minor, sus, seventh, and diminished colors without menu clutter.",
            },
            {
              title: "Progressions",
              copy: "Drill common pop and songwriting progressions until movement starts sounding obvious.",
            },
          ].map((feature) => (
            <article key={feature.title} className="glass rounded-[28px] p-5">
              <h2 className="text-2xl font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{feature.copy}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="glass rounded-[28px] p-6">
            <h2 className="text-2xl font-semibold">Made for self-taught musicians</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
              Existing apps often feel like theory homework. EarKit keeps the entry point simple:
              open the app, hit one button, finish a short drill, and keep moving.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Guitar", "Piano", "Voice", "Producer", "General"].map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--line)] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {tag}
                </span>
              ))}
            </div>
          </article>
          <article className="glass rounded-[28px] p-6">
            <h2 className="text-2xl font-semibold">Pricing built for habit formation</h2>
            <div className="mt-5 grid gap-4">
              {pricing.map((plan) => (
                <div key={plan.id} className="rounded-[24px] border border-[var(--line)] bg-white/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{plan.name}</div>
                    <div className="text-xl font-semibold">
                      {plan.price}
                      <span className="text-sm text-[var(--muted)]">{plan.cadence}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{plan.description}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
