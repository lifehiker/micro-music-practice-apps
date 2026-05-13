"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { siteConfig } from "@/lib/site";

type AppShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AppShell({ title, subtitle, children }: AppShellProps) {
  return (
    <div className="shell py-6">
      <header className="glass mb-6 flex flex-col gap-4 rounded-[28px] px-5 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/app" className="text-lg font-semibold">
            {siteConfig.name}
          </Link>
          <div className="mt-1 text-sm text-[var(--muted)]">
            {title} · {subtitle}
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--ink-soft)]">
          <Link href="/app">Today</Link>
          <Link href="/app/stats">Stats</Link>
          <Link href="/app/settings">Settings</Link>
          <button onClick={() => signOut({ callbackUrl: "/" })}>Log out</button>
        </nav>
      </header>
      {children}
    </div>
  );
}
