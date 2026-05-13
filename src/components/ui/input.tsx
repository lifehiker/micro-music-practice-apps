import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-[var(--foreground)] shadow-sm outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--accent)]",
        className,
      )}
      {...props}
    />
  );
}
