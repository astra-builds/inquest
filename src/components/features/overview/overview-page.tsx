import {
  BenchmarkLabel,
  CompassRose,
  ContourField,
} from "@/components/brand/mark";
import { Badge } from "@/components/ui/badge";
import { BrandButton } from "@/components/ui/brand-button";
import { Card, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";

const protocolSteps = [
  {
    step: "01",
    title: "Connect a provider",
    body: "Bring your own OpenAI-compatible, Gemini, or Ollama key.",
  },
  {
    step: "02",
    title: "Create a dataset",
    body: "Add test cases with inputs and optional reference outputs.",
  },
  {
    step: "03",
    title: "Configure metrics",
    body: "Choose deterministic metrics and an independent judge model.",
  },
  {
    step: "04",
    title: "Run the first experiment",
    body: "Seal a baseline and start tracking regressions against it.",
  },
] as const;

const measureSlots = [
  { label: "Suite score", note: "aggregate across metrics" },
  { label: "Groundedness", note: "LLM-as-a-Judge metric" },
  { label: "Latency p95", note: "application model" },
  { label: "Cost / case", note: "application model" },
] as const;

export function OverviewPage() {
  return (
    <div className="mx-auto max-w-[1560px] px-4 py-6 sm:px-6 sm:py-7">
      <PageHeader
        sheet="S-000"
        title="Survey desk"
        subtitle="Your evaluation survey begins here. No data source is connected yet, so this desk is intentionally empty. Create a dataset and an experiment to produce the first observations."
        meta={[
          { k: "Workspace", v: "Personal" },
          { k: "Datasets", v: "—" },
          { k: "Experiments", v: "—" },
          { k: "Datum", v: "None sealed" },
        ]}
        actions={<Badge tone="neutral">Preview build</Badge>}
      />

      {/* Datum banner */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border border-rule bg-paper px-3.5 py-2.5">
        <BenchmarkLabel id="DATUM" className="text-ink-soft" />
        <span className="text-[12px] leading-relaxed text-ink-soft">
          No baseline sealed. A datum fixes the reference run that later sheets are
          reduced against.
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        <span className="font-mono text-[10.5px] text-ink-mute">sheets compared: —</span>
        <Badge tone="neutral" dot>
          awaiting first run
        </Badge>
      </div>

      {/* Measurement slots — structure without invented values */}
      <section aria-labelledby="measurements-heading" className="mt-5">
        <h2 id="measurements-heading" className="sr-only">
          Measurements
        </h2>
        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {measureSlots.map((slot) => (
            <div key={slot.label} className="bg-paper px-3.5 py-3">
              <div className="eyebrow text-ink-mute">{slot.label}</div>
              <div aria-hidden="true" className="mt-1.5 font-display text-[26px] leading-none text-ink-faint">
                —
              </div>
              <div className="mt-1 font-mono text-[10px] text-ink-mute">{slot.note}</div>
              <div className="mt-2 text-[11px] text-ink-mute">no observations</div>
            </div>
          ))}
        </div>
      </section>

      {/* Survey protocol */}
      <section aria-labelledby="protocol-heading" className="mt-5">
        <h2 id="protocol-heading" className="sr-only">
          Survey protocol
        </h2>
        <ol className="grid gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-4">
          {protocolSteps.map((item) => (
            <li key={item.step} className="relative bg-paper px-3.5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center border border-rule-strong bg-vellum font-mono text-[9.5px] text-ink-soft">
                  {item.step.slice(1)}
                </span>
                <span className="text-[12.5px] text-ink">{item.title}</span>
              </div>
              <div className="mt-1.5 text-[10.5px] leading-relaxed text-ink-mute">
                {item.body}
              </div>
              <div className="mt-2 font-mono text-[9.5px] uppercase tracking-wider text-ink-mute">
                not started
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        {/* Left column */}
        <div className="space-y-5">
          <Card frame>
            <CardHeader
              icon="experiments"
              eyebrow="Sheets"
              title="Recent runs"
              meta="Each run is one sheet: a fixed prompt, a fixed dataset snapshot, and fixed judges."
            />
            <EmptyState
              className="mt-3 border-0 bg-transparent"
              code="S-100"
              title="No runs recorded"
              body="Runs appear here once an experiment is configured and executed. Inquest has not been connected to a database yet, so nothing has been measured."
              action={
                <BrandButton
                  variant="primary"
                  size="sm"
                  icon="play"
                  disabled
                  title="Experiments are not implemented yet"
                >
                  New experiment
                </BrandButton>
              }
              compact
            />
          </Card>

          <Card frame>
            <CardHeader
              icon="regressions"
              eyebrow="Basins"
              title="Open regressions"
              meta="A regression is filed when a metric drops past its own threshold relative to a sealed baseline."
            />
            <EmptyState
              className="mt-3 border-0 bg-transparent"
              code="S-400"
              title="No regressions to triage"
              body="Nothing is waiting for review. Once a baseline exists, comparisons will flag metric drops here rather than hiding them in an average."
              icon="regressions"
              compact
            />
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <Card frame>
            <CardHeader
              icon="judges"
              eyebrow="Calibration"
              title="Judge agreement"
              meta="Judge quality is tracked separately from the application model."
            />
            <EmptyState
              className="mt-3 border-0 bg-transparent"
              code="S-210"
              title="No judge calibrated"
              body="Configure an LLM-as-a-Judge and compare it against a labelled holdout to see agreement here."
              icon="judges"
              compact
            />
          </Card>

          <Card frame>
            <CardHeader icon="pin" eyebrow="Field notes" title="Activity" />
            <EmptyState
              className="mt-3 border-0 bg-transparent"
              code="S-010"
              title="No activity recorded"
              body="Field notes are written when datasets, experiments, or runs change. Nothing has been recorded yet."
              icon="pin"
              compact
            />
          </Card>

          <Card frame flush>
            <div className="relative overflow-hidden px-4 py-4">
              <div className="graticule pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative">
                <div className="eyebrow text-ink-mute">Dataset coverage</div>
                <h2 className="mt-1.5 font-display text-[17px] text-ink">Where the map is thin</h2>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                  Coverage will compare your datasets against the capabilities you intend
                  to evaluate. With no datasets yet, the map is entirely unmapped.
                </p>
                <div className="mt-3.5 flex items-center gap-3">
                  <div className="relative h-[6px] w-full bg-ink/8" aria-hidden="true">
                    <span className="absolute inset-y-0 left-0 w-0 bg-ink-faint" />
                  </div>
                  <span className="shrink-0 font-mono text-[10.5px] text-ink-mute">—</span>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-[11.5px] text-ink-soft">No datasets registered.</span>
                  <BrandButton
                    variant="outline"
                    size="xs"
                    iconRight="arrowRight"
                    disabled
                    title="Datasets are not implemented yet"
                  >
                    Datasets
                  </BrandButton>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="my-7 h-px w-full bg-rule" />

      {/* Closing note + contour ornament */}
      <div className="flex flex-wrap items-center justify-between gap-6 pb-4">
        <div className="flex items-center gap-4">
          <CompassRose size={30} className="shrink-0 text-pine/40" />
          <p className="max-w-lg text-[12px] leading-relaxed text-ink-mute">
            Reductions are printed only when a sheet differs from its datum by exactly
            one declared variable. Comparisons that fail that test are filed as{" "}
            <span className="font-mono text-ink-soft">invalid</span>, never averaged.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {["sheet", "datum", "gate", "basin"].map((tag) => (
            <span
              key={tag}
              className="border border-rule bg-paper px-2 py-1 font-mono text-[10.5px] text-ink-mute"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative h-14 overflow-hidden text-pine opacity-[0.12]"
      >
        <ContourField lines={6} seed={9} />
      </div>
    </div>
  );
}
