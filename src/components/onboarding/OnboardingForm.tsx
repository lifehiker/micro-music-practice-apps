"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type OnboardingValues = {
  instrumentFocus: string;
  skillFocus: string[];
  dailyGoalMinutes: number;
};

const skillOptions = ["intervals", "chord quality", "progressions"];
const instruments = ["guitar", "piano", "voice", "producer", "general"];
const dailyGoals = [2, 5, 10];

export function OnboardingForm({
  initialValues,
}: {
  initialValues?: Partial<OnboardingValues>;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<OnboardingValues>({
    defaultValues: {
      instrumentFocus: initialValues?.instrumentFocus || "guitar",
      skillFocus: initialValues?.skillFocus || ["intervals"],
      dailyGoalMinutes: initialValues?.dailyGoalMinutes || 5,
    },
  });

  async function onSubmit(values: OnboardingValues) {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setError("Unable to save your practice profile.");
      setLoading(false);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-[32px] p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Tune the app to your ear</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          This keeps the daily drill short, relevant, and adaptive.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <div className="mb-3 text-sm font-semibold">Instrument focus</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {instruments.map((instrument) => (
              <label key={instrument} className="cursor-pointer rounded-3xl border border-[var(--line)] bg-white/60 p-4 text-center text-sm capitalize">
                <input type="radio" value={instrument} className="sr-only" {...register("instrumentFocus")} />
                {instrument}
              </label>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 text-sm font-semibold">Skill focus</div>
          <div className="grid gap-3 md:grid-cols-3">
            {skillOptions.map((skill) => (
              <label key={skill} className="cursor-pointer rounded-3xl border border-[var(--line)] bg-white/60 p-4 text-sm capitalize">
                <div className="flex items-center gap-3">
                  <input type="checkbox" value={skill} {...register("skillFocus")} />
                  <span>{skill}</span>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 text-sm font-semibold">Daily goal</div>
          <div className="grid grid-cols-3 gap-3">
            {dailyGoals.map((goal) => (
              <label key={goal} className="cursor-pointer rounded-3xl border border-[var(--line)] bg-white/60 p-4 text-center text-sm">
                <input type="radio" value={goal} className="sr-only" {...register("dailyGoalMinutes", { valueAsNumber: true })} />
                {goal} min
              </label>
            ))}
          </div>
        </section>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <Button type="submit" variant="accent" className="mt-8 w-full" disabled={loading}>
        {loading ? "Saving..." : "Save and start practicing"}
      </Button>
    </form>
  );
}
