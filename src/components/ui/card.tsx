import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/brand/mark";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  frame = false,
  flush = false,
}: {
  children: ReactNode;
  className?: string;
  /** Adds the survey-sheet double hairline. */
  frame?: boolean;
  /** Removes the default inner padding. */
  flush?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative border border-rule bg-paper",
        frame && "sheet-frame",
        !flush && "p-4",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  eyebrow,
  title,
  meta,
  right,
  icon,
}: {
  eyebrow?: string;
  title: string;
  meta?: ReactNode;
  right?: ReactNode;
  icon?: IconName;
}) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-rule pb-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon && <Icon name={icon} size={14} className="text-ink-mute" />}
          {eyebrow && <span className="eyebrow text-ink-mute">{eyebrow}</span>}
        </div>
        <h2 className="mt-1 font-display text-[17px] leading-tight text-ink">{title}</h2>
        {meta && (
          <div className="mt-1.5 text-[11.5px] leading-snug text-ink-mute">{meta}</div>
        )}
      </div>
      {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </header>
  );
}
