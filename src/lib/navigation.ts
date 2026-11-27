import type { IconName } from "@/components/brand/mark";

export type NavKey =
  | "overview"
  | "experiments"
  | "comparisons"
  | "regressions"
  | "datasets"
  | "judges"
  | "metrics"
  | "traces"
  | "settings";

export interface NavItem {
  key: NavKey;
  label: string;
  icon: IconName;
  /**
   * `null` means the destination is planned but not implemented yet.
   * Rendering code must treat these items as unavailable, not as links.
   */
  href: string | null;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/**
 * The full information architecture from the approved design reference.
 * Only routes that actually exist in the app have a non-null `href`.
 */
export const navGroups: NavGroup[] = [
  {
    label: "Survey",
    items: [
      { key: "overview", label: "Overview", icon: "overview", href: "/" },
      { key: "experiments", label: "Experiments", icon: "experiments", href: null },
      { key: "comparisons", label: "Model comparison", icon: "compare", href: null },
      { key: "regressions", label: "Regressions", icon: "regressions", href: null },
    ],
  },
  {
    label: "Instruments",
    items: [
      { key: "datasets", label: "Datasets", icon: "datasets", href: null },
      { key: "judges", label: "Judges", icon: "judges", href: null },
      { key: "metrics", label: "Metrics", icon: "metrics", href: null },
    ],
  },
  {
    label: "Records",
    items: [{ key: "traces", label: "Traces", icon: "traces", href: null }],
  },
  {
    label: "System",
    items: [{ key: "settings", label: "Settings", icon: "settings", href: null }],
  },
];

export const routeMeta: Record<NavKey, { crumb: string; sheet: string }> = {
  overview: { crumb: "Survey desk", sheet: "S-000" },
  experiments: { crumb: "Experiments", sheet: "S-100" },
  comparisons: { crumb: "Model comparison", sheet: "S-300" },
  regressions: { crumb: "Regression inbox", sheet: "S-400" },
  datasets: { crumb: "Datasets", sheet: "S-200" },
  judges: { crumb: "Judges", sheet: "S-210" },
  metrics: { crumb: "Metric register", sheet: "S-220" },
  traces: { crumb: "Trace record", sheet: "S-500" },
  settings: { crumb: "Settings", sheet: "S-900" },
};

export const availableRouteItems = navGroups
  .flatMap((group) => group.items)
  .filter((item): item is NavItem & { href: string } => item.href !== null);
