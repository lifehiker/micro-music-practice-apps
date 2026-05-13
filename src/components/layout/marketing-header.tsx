import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function MarketingHeader() {
  return (
    <header className="shell py-6">
      <div className="glass flex items-center justify-between rounded-[28px] px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--foreground)] text-white">
            EK
          </div>
          <div>
            <div className="text-base font-semibold">EarKit</div>
            <div className="text-xs text-[var(--muted)]">Daily drills for working ears</div>
          </div>
        </Link>
        <nav className="hidden gap-5 text-sm text-[var(--ink-soft)] md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden text-sm font-medium md:block">
            Log in
          </Link>
          <Link href="/signup">
            <Button variant="accent" size="sm">
              Try free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
