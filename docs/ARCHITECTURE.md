# Inquest — MVP Architecture

Status: approved MVP architecture. The ten previously open decisions have been
resolved by the technical lead and are recorded in
[Resolved decisions](#resolved-decisions).

## 1. Product scope and core user workflows

Inquest is a developer-focused LLM evaluation platform. It combines selected
capabilities from Promptfoo and DeepEval, with emphasis on LLM-as-a-Judge,
evaluation metrics, experiments, model comparisons, and regression detection.

### In scope for the MVP

- Define a dataset of test cases (input plus optional expected output/reference).
- Define an experiment: which dataset, which application model/config, which
  metrics, and which judge model/config.
- Execute the experiment against the application model, score each output with
  the configured metrics, and persist results.
- View per-case results and aggregate metric summaries.
- Compare results across experiments to detect regressions.
- Configure multiple LLM providers through adapters.

### Out of scope for the MVP

- Distributed teams, role hierarchies, billing, and org management.
- Branching/version-control-style dataset workflows, fine-tuning, or online
  production monitoring.
- A general-purpose workflow engine or arbitrary user-defined pipelines.
- Self-hosting and non-Vercel deployment targets.

### Core workflows

1. **Author a dataset.** User creates a dataset and adds test cases with inputs
   and optional expected outputs.
2. **Configure an experiment.** User selects a dataset, an application model
   configuration, one or more metrics, and (where needed) a judge model
   configuration. The experiment is saved as an immutable configuration.
3. **Run an experiment.** User starts a run. The system executes each test case
   through the application adapter, scores outputs through metrics, and stores
   per-case and aggregate results.
4. **Inspect results.** User views a run's per-case outputs, scores, and failures.
5. **Compare runs.** User selects two or more runs (typically of the same
   experiment or dataset) and views metric deltas and regressions.

## 2. Frontend architecture

- **Framework:** Next.js (App Router) with TypeScript.
- **Styling:** Tailwind CSS with shadcn/ui components for consistent, accessible
  primitives.
- **Validation:** Zod schemas shared between frontend forms and API route
  validation where practical. Keep schemas in a location importable by both
  sides without pulling server-only code into client bundles.
- **Rendering:** Server Components for data fetching and page shells where
  possible; Client Components only for interactive pieces (forms, tables with
  sorting/filtering, run triggers, comparison views).
- **App structure (logical grouping):**
  - `app/` — routes, layouts, and route-level data loading.
  - `components/ui/` — shadcn/ui primitives.
  - `components/features/` — feature-scoped UI (datasets, experiments, runs,
    comparisons).
  - `lib/` — client-safe helpers, API client, shared Zod schemas.
- **State:** Prefer server state fetched per route with minimal client state.
  No global state library in the MVP; add only if measured need arises.
- **Auth UI:** Supabase Auth with an email/password flow (see
  [Resolved decisions](#resolved-decisions)).

The frontend must not import from the evaluation engine's internals. It talks
to the application through typed API routes.

## 3. Backend/API architecture

The MVP is a single Next.js application with API route handlers under
`app/api/`. No separate backend service and no microservices.

- **API style:** HTTP route handlers returning JSON, with Zod validation at the
  boundary for request bodies/query parameters. Response types derived from
  Zod schemas or shared TypeScript types.
- **Persistence:** Supabase PostgreSQL via the official client/server SDK.
  Use Supabase Auth for identity and row-level security (RLS) for per-user data
  isolation.
- **Server-only boundary:** Keep database credentials, provider API keys, and
  engine execution code in server-only modules. Never import them into Client
  Components.
- **Representative routes:**
  - `POST /api/datasets`, `GET /api/datasets`, `GET /api/datasets/[id]`
  - `POST /api/experiments`, `GET /api/experiments`, `GET /api/experiments/[id]`
  - `POST /api/experiments/[id]/runs` — create and start a run
  - `GET /api/runs/[id]`, `GET /api/runs/[id]/results`
  - `GET /api/experiments/[id]/compare` — compare runs for an experiment
  - Provider credential management endpoints (design depends on the secret
    storage decision below).
- **Background work:** See [Evaluation execution and Vercel](#10-vercel-deployment-considerations).
  The API accepts a run request, validates and persists the experiment snapshot
  and run record, then hands execution to the engine through a controlled
  server-side entry point.

## 4. Standalone evaluation engine

The engine is a standalone, UI-independent library. It must be usable from API
routes, scripts, and tests without any Next.js or React dependency.

- **Location:** `src/lib/evaluation/` inside the single Next.js app. It is a
  self-contained, UI-independent module within that directory (see
  [Resolved decisions](#resolved-decisions)). It must not import Next.js, React,
  Tailwind, or any component code.
- **Public API (conceptual):**
  - `runExperiment(input: ExperimentExecutionInput): Promise<RunResult>`
  - supporting pure functions for scoring and aggregation.
- **Dependencies:** Node/server-side only. It may use Zod for validating its
  inputs, but must not import Next.js, React, Tailwind, or any component code.
- **Purity:** Core scoring logic is deterministic and side-effect-free where
  possible. Provider calls and persistence are kept at the edges via injected
  adapters/interfaces, so the core can be unit-tested with controlled inputs.
- **Config-driven:** The engine receives an experiment configuration (dataset
  cases, application model config, metric configs, judge model config) and does
  not read from the database or HTTP itself. The API layer is responsible for
  loading configuration and saving results.

This separation is what allows the same engine to power the web app and
future CLI/script usage without duplication.

## 5. LLM provider adapter architecture

Support multiple providers behind a small, uniform adapter interface.

- **Interface (conceptual):**
  ```ts
  interface LLMAdapter {
    generate(input: GenerateInput): Promise<GenerateResult>;
  }
  ```
  where `GenerateInput` carries provider-agnostic messages, model name, and
  generation parameters, and `GenerateResult` carries output text and basic
  usage metadata. Types are defined with Zod/TypeScript in
  `src/lib/evaluation/types/`.
- **Registry:** A provider registry maps a provider identifier to an adapter
  factory. Adding a provider = add one adapter module + registry entry.
- **MVP providers:** OpenAI-compatible endpoints, Gemini, and Ollama-compatible
  endpoints (see [Resolved decisions](#resolved-decisions)).
- **Configuration:** Provider selection, model name, and generation parameters
  are stored per experiment (application model config) or per judge config.
  Credentials are never stored in experiment configuration.
- **Secret handling (BYOK):** Users bring their own provider keys. Keys are
  stored encrypted server-side and are never returned to the browser after
  entry, embedded in saved configs, or logged. The engine receives resolved
  credentials through injected adapter factories at execution time.
- **Errors:** Adapters normalize provider errors into a common error shape so
  the engine and UI can handle failures consistently. Raw provider responses
  containing sensitive data are not persisted verbatim beyond what a result
  needs.

## 6. Deterministic and LLM-as-a-Judge metric systems

Metrics are modular and extensible. Each metric implements a common interface
and declares which inputs it needs.

- **Metric interface (conceptual):**
  ```ts
  interface Metric {
    name: string;
    evaluate(input: MetricInput): Promise<MetricResult>;
  }
  ```
  `MetricInput` includes the case input, application output, optional expected
  output/reference, and any metric-specific config. `MetricResult` includes a
  normalized score, optional details, and an explanation where applicable.
- **Metric registry:** A map from metric identifier to implementation/metric
  factory. Experiments reference metric identifiers plus config rather than
  hard-coded code paths. Adding a metric must not require changing the engine
  core or UI beyond a generic list entry.
- **Deterministic metrics:** Implement without an LLM where possible (e.g.
  exact match, contains, regex, JSON validity, length constraints). These are
  fast, reproducible, and do not require a judge model.
- **LLM-as-a-Judge metrics:** Implement using a judge model through the same
  provider adapter interface used by application calls (e.g. correctness,
  helpfulness, rubric-based scoring). The judge model config is independent of
  the application model config: they may use different providers, models, and
  parameters.
- **Config independence requirement:** Application model config and judge model
  config are separate fields in the experiment configuration and are validated
  independently. The engine must never assume they are the same.
- ** explainability:** Judged results should retain the judge's rationale in
  result details so users can inspect why a score was given.
- **Guardrails:** Judge prompts must return a Zod-validated structured result
  with exactly these fields: `score` (number between 0 and 1), `reason`
  (string), and `verdict` (`pass` or `fail`) (see
  [Resolved decisions](#resolved-decisions)). Malformed judge responses produce
  an explicit error/low-confidence result rather than being silently treated as
  a pass.

## 7. Dataset and experiment execution workflows

### Dataset workflow

- A dataset has a name, description, and a set of test cases.
- A test case has an input (the prompt/content sent to the application model),
  optional expected output/reference, and optional metadata.
- Dataset and case payloads are validated with Zod at the API boundary.
- Datasets are mutable before use; once a run starts, the engine uses a snapshot
  of the cases captured in the run so results remain reproducible even if the
  dataset changes later.

### Experiment workflow

- An experiment stores its configuration: dataset reference (plus snapshot of
  cases at run time), application model config, metric configs, judge model
  config, and creation metadata.
- Starting a run creates a `Run` record and an immutable configuration snapshot
  (see [Evaluation result storage and regression tracking](#9-evaluation-result-storage-and-regression-tracking)).
- Execution flow (conceptual):
  1. Load and validate experiment config.
  2. Snapshot dataset cases into the run.
  3. For each case: call the application adapter, then evaluate with each
     configured metric (judge metrics use the judge adapter).
  4. Persist per-case results and aggregate scores.
  5. Mark the run complete or failed with an error summary.
- **Failure handling:** A single case failure should not discard all results.
  Persist per-case status (`passed`, `failed`, `error`) and continue where safe,
  subject to a bounded error count and provider rate limits.
- **Cost control:** Bound dataset size and concurrency in the MVP. Execution is
  bounded to small evaluations that fit within a Vercel function invocation;
  limits are configurable via environment variables (see
  [Resolved decisions](#resolved-decisions)).

## 8. Database entities and relationships

Supabase PostgreSQL with RLS scoped to the owning user. All tables include
`id` (UUID), `created_at`, and `updated_at` unless noted. Ownership is via
`user_id` referencing the auth user.

- **`profiles`** — one row per auth user; display info and preferences.
- **`datasets`** — `user_id`, `name`, `description`.
- **`dataset_cases`** — `dataset_id` FK, `input` (text/JSON), `expected_output`
  (nullable text/JSON), `metadata` (JSONB). Many cases per dataset.
- **`experiments`** — `user_id`, `dataset_id` FK, `name`, `description`, and a
  config JSONB column containing application model config, metric configs, and
  judge model config (validated with Zod).
- **`runs`** — `experiment_id` FK, `user_id`, `status` (`pending`, `running`,
  `completed`, `failed`), `started_at`, `finished_at`, `config_snapshot` JSONB,
  and aggregate summary JSONB. Many runs per experiment.
- **`run_results`** — `run_id` FK, a full immutable snapshot of the dataset case
  (`input_snapshot`, `expected_output_snapshot`, `case_metadata_snapshot`),
  `application_output`, `status`, and `error` (nullable). Many results per run.
- **`metric_results`** — `run_result_id` FK, `metric_name`, `score`, `details`
  JSONB (rationale, judge output metadata), `error` (nullable). One row per
  metric per case result.

Relationships:

```text
auth.users 1──* profiles
auth.users 1──* datasets
datasets   1──* dataset_cases
auth.users 1──* experiments
datasets   1──* experiments
experiments 1──* runs
runs       1──* run_results
run_results 1──* metric_results
```

Notes:

- `runs.config_snapshot` preserves the exact configuration used even if the
  experiment is later edited.
- `run_results` stores a full immutable snapshot of each dataset case rather
  than referencing a mutable `dataset_cases` row (see
  [Resolved decisions](#resolved-decisions)).
- RLS policies restrict all reads/writes to rows where `user_id` matches the
  authenticated user. The engine itself connects server-side with a trusted
  role and receives only the data it needs.

## 9. Evaluation result storage and regression tracking

- Each run stores both per-case results (`run_results` + `metric_results`) and
  an aggregate summary on the `runs` row (e.g. average score per metric,
  pass/fail counts).
- Aggregate summaries are computed by the engine and stored at completion; the
  UI reads them directly rather than re-aggregating large result sets on every
  page load.
- **Comparisons:** A comparison endpoint accepts two run IDs and returns, per
  metric, the delta between runs and a list of cases whose score decreased.
  Comparisons are computed on demand from stored results; no separate
  comparison table in the MVP.
- **Regression detection:** Each metric carries its own regression threshold;
  a regression is flagged when a metric's score drops by more than that
  metric's configured threshold in a comparison (see
  [Resolved decisions](#resolved-decisions)). Alerting/notifications are out of
  scope for the MVP.
- **Historical preservation:** Because runs preserve configuration and full
  case snapshots, comparisons remain valid even when datasets or experiments
  change later.
- **Retention:** No automatic retention or deletion in the MVP. Historical runs
  and results are kept indefinitely unless a user manually deletes them.

## 10. Vercel deployment considerations

Vercel functions have execution-duration and response-size limits, so long,
sequential, multi-provider evaluation runs cannot reliably execute inside a
single HTTP request handler.

- **MVP execution strategy (bounded, approved):** Small MVP evaluations execute
  within a single Vercel function request using bounded concurrency and a hard
  cap on cases per run, with a timeout guard that marks the run failed/incomplete
  if exceeded. There is no queue or separate worker in the MVP.
- **Async path (deferred):** If runs outgrow the function limits, a queue/worker
  can be introduced later without changing the engine — only the trigger
  mechanism changes. This is explicitly out of scope for the MVP.
- **Stateless functions:** No in-memory job state across invocations. All run
  state is written to Postgres so any invocation can resume or report status.
- **Concurrency and rate limits:** Cap parallel provider calls per run to avoid
  rate-limit errors and cost spikes; make this configurable.
- **Secrets:** Supabase service credentials are set as Vercel environment
  variables; never committed. BYOK provider keys are stored encrypted in the
  database and decrypted only in server-only modules at execution time.
- **Database access:** Supabase connection/pooling settings must be compatible
  with serverless connection churn (use the HTTP/REST API or pooled connection
  string as appropriate).
- **Region:** Deployment region is selected at deployment time based on
  supported proximity to users/data; no fixed region is prescribed by this
  architecture.
- **Observability:** Log structured run/case events to stdout for Vercel logs,
  but never log API keys, full credentials, or sensitive user data. Persist run
  status and errors in the database for UI display.

## Testing strategy

- **Engine:** Vitest unit tests for deterministic scoring, metric registry
  behavior, judge result parsing, and config validation. Provider adapters
  tested against a common contract using controlled inputs.
- **API:** Vitest tests for route validation and error handling, with database
  and engine dependencies injected rather than mocked as a substitute for
  production behavior.
- **UI:** Playwright end-to-end tests for core workflows: create dataset,
  configure and run experiment, view results, compare two runs.
- **Verification rule:** Run relevant checks (type check, lint, unit tests, and
  applicable e2e tests) after implementation and report actual results.

## Resolved decisions

The technical lead has approved the following directions for the MVP. These are
now requirements, not open questions:

1. **Workspace layout:** Single Next.js app; the evaluation engine is isolated
   in `src/lib/evaluation/` (with `engine/`, `metrics/`, `judges/`, `providers/`,
   and `types/` subdirectories). No separate workspace package.
2. **MVP provider set:** OpenAI-compatible endpoints, Gemini, and
   Ollama-compatible endpoints.
3. **Provider keys:** BYOK — users supply their own keys, stored encrypted
   server-side; the platform does not use shared provider keys.
4. **Judge output format:** A Zod-validated object with `score` (number in
   `[0, 1]`), `reason` (string), and `verdict` (`pass` | `fail`).
5. **Run execution trigger:** Bounded in-request execution within a Vercel
   function for small MVP evaluations. No queue or worker in the MVP.
6. **Dataset case snapshotting:** Each `run_result` stores a full immutable
   snapshot of its dataset case; results never reference mutable case rows.
7. **Auth flow:** Supabase email/password authentication.
8. **Regression thresholds:** Configured per metric (not globally), with
   regression flagged when a metric's score drop exceeds its own threshold.
9. **Retention policy:** No automatic retention or deletion; runs and results
   are retained indefinitely unless manually deleted.
10. **Deployment region:** Selected at deployment time based on supported
    proximity to users/data; not fixed in this document.
