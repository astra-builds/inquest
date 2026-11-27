# Inquest

Developer-focused LLM evaluation platform for datasets, experiments, LLM-as-a-Judge metrics, model comparisons, and regression detection. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the approved MVP architecture.

## Current state

Inquest is in early development. The foundation and presentation layer are implemented:

- **Next.js foundation:** Next.js 16 App Router with React 19, TypeScript, Tailwind CSS 4, and shadcn/ui configuration.
- **Brand identity:** Inquest mark, icon, design tokens, typography, and surveying-inspired visual language.
- **Application shell:** Responsive survey rail, compact mobile navigation, workspace header, and honest empty/disabled states for planned destinations.
- **Overview dashboard:** The survey desk at `/`, with empty states and the planned setup path. No evaluation data is shown or fabricated.

### Not implemented yet

The project currently has no backend integration, authentication, database, persistence, provider connections, or evaluation execution. Specifically, the following are not implemented:

- API routes and request validation
- Supabase authentication, database schema, and row-level security
- Dataset and experiment management
- LLM provider adapters and encrypted BYOK credentials
- Evaluation engine, deterministic metrics, and LLM-as-a-Judge metrics
- Experiment runs, result storage, model comparisons, and regression detection

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run test` — Vitest unit tests
