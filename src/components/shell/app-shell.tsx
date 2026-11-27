import Link from "next/link";
import type { ReactNode } from "react";
import {
  CompassRose,
  Icon,
  LogoLockup,
  LogoMark,
} from "@/components/brand/mark";
import { Badge } from "@/components/ui/badge";
import { BrandButton } from "@/components/ui/brand-button";
import { navGroups, routeMeta, type NavKey } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const workspace = {
  name: "Personal workspace",
  detail: "Single workspace",
};

/**
 * Application shell: survey rail, workspace selector, topbar, and content.
 * Navigation items without an `href` are planned routes and are rendered
 * as inert so the shell never links to a page that does not exist.
 */
export function AppShell({
  children,
  activeKey = "overview",
}: {
  children: ReactNode;
  activeKey?: NavKey;
}) {
  const meta = routeMeta[activeKey];

  return (
    <div className="flex min-h-screen bg-vellum">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[70] focus:rounded-[2px] focus:border focus:border-pine focus:bg-paper focus:px-3 focus:py-2 focus:text-[12px] focus:text-ink"
      >
        Skip to content
      </a>

      {/* Survey rail */}
      <aside className="sticky top-0 hidden h-screen w-[236px] shrink-0 flex-col border-r border-rule-strong bg-vellum/70 lg:flex">
        <div className="graticule border-b border-rule px-4 py-3.5">
          <Link href="/" className="block w-fit" aria-label="Inquest overview">
            <LogoLockup size={22} text="sm" />
          </Link>

          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Workspace switching is not available yet"
            className="mt-3 flex w-full items-center gap-2.5 border border-rule bg-paper-raise px-2.5 py-2 text-left"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-pine font-mono text-[10px] font-semibold text-paper">
              PW
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-medium text-ink">
                {workspace.name}
              </span>
              <span className="block truncate font-mono text-[10px] text-ink-mute">
                {workspace.detail}
              </span>
            </span>
            <Icon name="chevronDown" size={12} className="shrink-0 text-ink-mute" />
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <div className="flex items-center gap-2 px-2 pb-1.5">
                <span className="eyebrow text-ink-mute">{group.label}</span>
                <span className="h-px flex-1 bg-rule" aria-hidden="true" />
              </div>
              <ul className="space-y-px">
                {group.items.map((item) => {
                  const on = item.key === activeKey;
                  if (item.href) {
                    return (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          aria-current={on ? "page" : undefined}
                          className={cn(
                            "group relative flex w-full items-center gap-2.5 rounded-[2px] px-2.5 py-[7px] text-left text-[12.5px] transition-colors",
                            on
                              ? "bg-paper text-ink shadow-[inset_0_0_0_1px_var(--color-rule)]"
                              : "text-ink-soft hover:bg-paper/70 hover:text-ink",
                          )}
                        >
                          {on && (
                            <span
                              aria-hidden="true"
                              className="absolute -left-[9px] top-1.5 bottom-1.5 w-[2px] bg-pine"
                            />
                          )}
                          <Icon
                            name={item.icon}
                            size={15}
                            className={on ? "text-pine" : "text-ink-mute group-hover:text-ink-soft"}
                          />
                          <span className={cn("flex-1 truncate", on && "font-medium")}>
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={item.key}>
                      <span
                        aria-disabled="true"
                        title={`${item.label} is not implemented yet`}
                        className="flex w-full cursor-default items-center gap-2.5 rounded-[2px] px-2.5 py-[7px] text-left text-[12.5px] text-ink-mute"
                      >
                        <Icon name={item.icon} size={15} className="text-ink-faint" />
                        <span className="flex-1 truncate">{item.label}</span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                          soon
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-rule px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <span className="eyebrow text-ink-mute">Gate status</span>
            <Badge tone="neutral">No gates</Badge>
          </div>
          <div className="mt-2.5 flex items-end justify-between gap-3">
            <CompassRose size={34} className="shrink-0 text-pine/40" />
            <div className="text-right font-mono text-[10px] leading-relaxed text-ink-mute">
              <div>datum · none sealed</div>
              <div>source · not connected</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-rule pt-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rule-strong font-mono text-[9px] text-ink">
              <Icon name="user" size={12} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11.5px] text-ink-soft">Not signed in</span>
              <span className="block font-mono text-[9.5px] text-ink-mute">local session</span>
            </span>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-rule-strong bg-vellum/92 backdrop-blur-sm">
          {/* Compact rail for narrow viewports */}
          <nav
            aria-label="Primary compact"
            className="flex items-center gap-1 overflow-x-auto border-b border-rule px-3 py-2 lg:hidden"
          >
            {navGroups.flatMap((group) => group.items).map((item) => {
              const on = item.key === activeKey;
              if (item.href) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 rounded-[2px] px-2 py-1 text-[12px] transition-colors",
                      on ? "bg-pine text-paper" : "text-ink-soft hover:bg-ink/6",
                    )}
                  >
                    <Icon name={item.icon} size={13} />
                    {item.label}
                  </Link>
                );
              }
              return (
                <span
                  key={item.key}
                  aria-disabled="true"
                  title={`${item.label} is not implemented yet`}
                  className="flex shrink-0 cursor-default items-center gap-1.5 rounded-[2px] px-2 py-1 text-[12px] text-ink-mute"
                >
                  <Icon name={item.icon} size={13} className="text-ink-faint" />
                  {item.label}
                </span>
              );
            })}
          </nav>

          <div className="flex h-[52px] items-center gap-3 px-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="lg:hidden">
                <LogoMark size={18} />
              </span>
              <span className="hidden font-mono text-[11px] text-ink-mute sm:inline">
                {workspace.name}
              </span>
              <Icon
                name="chevronRight"
                size={11}
                className="hidden text-ink-faint sm:inline"
              />
              <span className="truncate text-[12.5px] font-medium text-ink">{meta.crumb}</span>
              <span className="font-mono text-[11px] text-ink-mute">/ {meta.sheet}</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Badge tone="neutral" dot className="hidden sm:inline-flex">
                Not connected
              </Badge>
              <BrandButton
                variant="primary"
                size="sm"
                icon="play"
                disabled
                title="Runs become available once experiments are implemented"
              >
                New run
              </BrandButton>
            </div>
          </div>
        </header>

        <main id="main-content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
