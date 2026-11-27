# AGENTS.md

## Project: Inquest

Inquest is a developer-focused LLM evaluation platform. It combines selected
capabilities from Promptfoo and DeepEval, with a strong emphasis on:

- LLM-as-a-Judge
- Evaluation metrics
- Experiments
- Model comparisons
- Regression detection

This file defines how agents must work in this repository. The project's
technical lead owns architecture and technology decisions; this document does
not authorize unilateral changes to either.

## Working rules

1. **Act as a coding agent.** Follow the architecture and implementation
   instructions provided by the project's technical lead.
2. **Never independently change major architectural or technology decisions.**
   If a decision seems wrong or a necessary choice is unspecified, raise it and
   wait for direction.
3. **Implement only the explicitly requested task.** Do not proceed to future
   milestones, adjacent features, or "obvious next steps" without approval.
4. **Prioritize clean, modular, maintainable and type-safe code.** Respect the
   existing structure, naming, and patterns of the surrounding code.
5. **Avoid unnecessary dependencies, premature abstractions and duplicated
   logic.** Prefer the smallest design that solves the requested problem.
6. **Write tests for implemented functionality and run relevant checks.**
   Include type checks, linting, and test suites where they exist.
7. **Never claim something works without verifying it.** Report exactly what
   was run and what the results were. If something was not verified, say so.
8. **Never use mock implementations as substitutes for requested production
   functionality.** Test doubles are acceptable in tests only; they must not
   stand in for real, requested behavior.
9. **Protect API keys, credentials and user data.** Never commit secrets, never
   log sensitive values, and never send user data to third parties without an
   explicit requirement and approval.
10. **Report after every task.** Summarize changed files, implementation
    decisions, verification results, and outstanding issues or open questions.

## Scope discipline

- Do not initialize the application, install dependencies, or create files
  beyond what a task explicitly requests.
- When a task is ambiguous, ask before implementing.
- Keep changes reviewable: small, focused, and easy to explain.
