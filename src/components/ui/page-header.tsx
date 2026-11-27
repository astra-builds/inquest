import type { ReactNode } from "react";
import { Ruler } from "@/components/brand/mark";

export interface PageMeta {
  k: string;
  v: ReactNode;
}

/**
 * The map-sheet title block: sheet number, tracked caps, a serif title,
 * optional field metadata, and a ruler rule.
 */
export function PageHeader({
  sheet,
  title,
  subtitle,
  meta,
  actions,
  kicker = "Survey sheet",
}: {
  sheet: string;
  title: string;
  subtitle?: string;
  meta?: PageMeta[];
  actions?: ReactNode;
  kicker?: string;
}) {
  return (
    <div className="border-b border-rule-strong pb-4">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="eyebrow rounded-[2px] border border-rule-strong px-1.5 py-0.5 text-ink-soft">
              {sheet}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
              {kicker}
            </span>
          </div>
          <h1 className="mt-2.5 font-display text-[30px] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {meta && meta.length > 0 && (
        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {meta.map((m) => (
            <div key={m.k} className="min-w-0">
              <dt className="eyebrow text-ink-mute">{m.k}</dt>
              <dd className="mt-0.5 font-mono text-[12px] text-ink-soft">{m.v}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-4 text-rule-strong">
        <Ruler ticks={72} />
      </div>
    </div>
  );
}
