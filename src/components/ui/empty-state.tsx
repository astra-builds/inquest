import type { ReactNode } from "react";
import { ContourField, Icon, type IconName } from "@/components/brand/mark";
import { cn } from "@/lib/utils";

/**
 * An honest empty state: states that no observations exist yet and
 * never implies data that has not been recorded.
 */
export function EmptyState({
  code,
  title,
  body,
  action,
  icon = "compass",
  compact = false,
  className,
}: {
  code: string;
  title: string;
  body: string;
  action?: ReactNode;
  icon?: IconName;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden border border-rule bg-paper", className)}>
      <div className="graticule pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-10 -bottom-8 h-48 w-64 text-pine opacity-[0.13]"
        aria-hidden="true"
      >
        <ContourField lines={7} seed={7} />
      </div>
      <div className={cn("relative flex items-start gap-4 px-5", compact ? "py-5" : "py-8")}>
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-rule-strong bg-paper-raise text-pine">
          <Icon name={icon} size={17} />
        </div>
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow text-ink-mute">{code}</span>
            <span className="h-px w-6 bg-rule-strong" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">
              no observations
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-[19px] leading-snug text-ink">{title}</h3>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{body}</p>
          {action && <div className="mt-3.5 flex flex-wrap items-center gap-2">{action}</div>}
        </div>
      </div>
    </div>
  );
}
