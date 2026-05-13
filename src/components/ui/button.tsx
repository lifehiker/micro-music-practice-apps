import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[var(--foreground)] text-white hover:bg-[var(--ink-soft)]",
        accent: "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]",
        ghost: "border border-[var(--line)] bg-white/40 text-[var(--foreground)] hover:bg-white/70",
        outline: "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-white/70",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-3",
        lg: "px-6 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
