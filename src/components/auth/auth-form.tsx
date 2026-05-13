"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const authSchema = z.object({
  name: z.string().optional(),
  email: z.email(),
  password: z.string().min(8),
});

type AuthFormProps = {
  mode: "login" | "signup";
};

type AuthValues = z.infer<typeof authSchema>;

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  async function onSubmit(values: AuthValues) {
    setLoading(true);
    setError(null);

    if (mode === "signup") {
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!registerResponse.ok) {
        const payload = await registerResponse.json();
        setError(payload.error || "Unable to create account.");
        setLoading(false);
        return;
      }
    }

    const signInResponse = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInResponse?.error) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="glass w-full rounded-[32px] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-2xl font-semibold">
          {mode === "login" ? "Pick up today’s drill" : "Start your 5-minute habit"}
        </div>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Credentials auth is the zero-config baseline. Google sign-in and magic links are shown
          as guarded fallbacks until external credentials are provided.
        </p>
      </div>

      <div className="space-y-4">
        {mode === "signup" && (
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <Input placeholder="Jordan Keys" {...form.register("name")} />
          </div>
        )}
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <Input type="email" placeholder="you@example.com" {...form.register("email")} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>
          <Input type="password" placeholder="At least 8 characters" {...form.register("password")} />
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <Button type="submit" variant="accent" className="mt-6 w-full" disabled={loading}>
        {loading ? "Working..." : mode === "login" ? "Log in" : "Create account"}
      </Button>

      <div className="mt-5 rounded-3xl border border-dashed border-[var(--line)] bg-white/40 p-4 text-sm text-[var(--muted)]">
        <div className="font-semibold text-[var(--foreground)]">Guarded auth fallbacks</div>
        <div className="mt-2 flex flex-col gap-2 md:flex-row">
          <Button type="button" variant="ghost" className="justify-start" disabled>
            Google sign-in needs OAuth credentials
          </Button>
          <Button type="button" variant="ghost" className="justify-start" disabled>
            Magic link needs Resend configured
          </Button>
        </div>
      </div>

      <p className="mt-5 text-sm text-[var(--muted)]">
        {mode === "login" ? "Need an account?" : "Already have an account?"}{" "}
        <Link href={mode === "login" ? "/signup" : "/login"} className="font-semibold text-[var(--accent)]">
          {mode === "login" ? "Sign up" : "Log in"}
        </Link>
      </p>
    </form>
  );
}
