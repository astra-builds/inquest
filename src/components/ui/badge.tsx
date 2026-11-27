import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "pass" | "fail" | "warn" | "info" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  pass: "border-verdigris/40 bg-verdigris/10 text-verdigris",
  fail: "border-vermilion/40 bg-vermilion/10 text-vermilion",
  warn: "border-ochre/45 bg-ochre/10 text-ochre-deep",
  info: "border-cobalt/40 bg-cobalt/10 text-cobalt",
  neutral: "border-rule-strong bg-paper-raise text-ink-soft",
};

const dotClasses: Record<BadgeTone, string> = {
  pass: "bg-verdigris",
  fail: "bg-vermilion",
  warn: "bg-ochre",
  info: "bg-cobalt",
  neutral: "bg-ink-mute",
};

export function Badge({
  tone = "neutral",
  dot = false,
  children,
  className,
}: {
  tone?: BadgeTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-1.5 rounded-[2px] border px-1.5 py-[3px] leading-none",
        toneClasses[tone],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            "h-[5px] w-[5px] rounded-full",
            dotClasses[tone],
            tone === "info" && "pulse-dot",
          )}
        />
      )}
      {children}
    </span>
  );
}
