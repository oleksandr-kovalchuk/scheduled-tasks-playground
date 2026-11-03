# CLAUDE.md

Guidance for Claude (and any scheduled Claude task) working in this repository.

## What this is

A small React + Vite task tracker used as a playground for **scheduled Claude tasks**.
A scheduled task picks the next item from `TODO.md`, implements it with tests and opens a pull request.
Keep every change small, focused and easy to review.

## Commands

- `pnpm install` — install dependencies (pnpm only, never npm/yarn)
- `pnpm dev` — dev server
- `pnpm check` — **lint + tests + build; must pass before every commit**
- `pnpm test` / `pnpm test:watch` — Vitest
- `pnpm lint` — oxlint with warnings treated as errors

## Stack

React 19, Vite 8, TypeScript 7 (strict, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`),
Tailwind CSS 4, Zustand, React Hook Form + Zod, lucide-react, Vitest + Testing Library, oxlint.

## Architecture: Feature-Sliced Design

```
src/
  app/       entry point, global styles, providers
  pages/     route-level screens
  widgets/   composed blocks (e.g. task list)
  features/  user actions (add-task, toggle-task, ...)
  entities/  business entities: model (types, store, selectors), lib, ui
  shared/    reusable primitives: ui/, lib/
```

- A layer may import only from layers **below** it. Slices on the same layer never import each other.
- Entities stay free of feature logic: features plug their controls into entity UI via slots (`leading`, `actions`).
- Import with the `@/` alias. **No barrel files** (`index.ts` re-exports). **Named exports only.**
- One file = one component. Utilities and constants live in separate files, not next to UI.
- Tests are co-located: `Component.tsx` + `Component.test.tsx`.
- Before writing something new, check whether an existing component, hook or util already does it.

## Code rules

- KISS, YAGNI, DRY, single responsibility. No over-engineering.
- Never `any`. Prefer discriminated unions and `satisfies` over `as`.
- No nested ternaries, no `console.log`, no index as `key` for dynamic lists.
- Keep state minimal; compute derived state instead of storing it.
- `useEffect` only for real side effects, with a complete deps array and cleanup. Never sync state through effects (reset via `key`).
- `useMemo` / `useCallback` only when there is a measured need.
- Reuse logic through custom hooks and composition (`children`, slots), not HOCs or render props.
- Prefer `map` / `filter` / `reduce` over imperative loops; prefer guard clauses and early returns.
- Client state lives in Zustand: read through selectors, one store per entity/feature.
- URL is the source of truth for filters, tabs and similar view state.
- Forms: React Hook Form + Zod resolver; a form is its own component.
- Comments explain *why*, not *what*. No dead code.

## Styling

- Tailwind utilities only, using the design tokens defined in `src/app/styles/index.css`
  (`bg-background`, `text-muted-foreground`, `border-border`, `bg-primary`, ...).
- No hardcoded colors and no arbitrary values (`text-[13px]`, `bg-[#fff]`). Add a token if one is missing.
- Compose class names with `cn()` from `@/shared/lib/cn`; use `cva` for variants. Never concatenate class strings by hand.
- Prefer logical properties.
- Reuse primitives from `src/shared/ui` (Button, Input, Checkbox, Card) before creating new ones.

## Tests

- Every feature ships with tests (Vitest + Testing Library).
- Query by role and accessible name (`getByRole('button', { name: 'Add' })`), not by test ids or class names.
- Reset the Zustand store in `beforeEach` (`useTaskStore.setState({ tasks: [] })`).

## Pull requests

- One `TODO.md` item per PR, branch `todo/<id>-<short-slug>` (e.g. `todo/t1-delete-task`), based on `main`.
- Do not edit `TODO.md` in feature PRs: progress is tracked by the PRs themselves.
- PR title: `T1: Delete a task`. PR description in Ukrainian: what changed, how to try it, what the tests cover.
