# Scheduled Tasks Playground

A test project for playing with **Claude scheduled tasks**: a small React + Vite task tracker
that grows new features on its own, one per run.

## How it works

1. `TODO.md` holds a backlog of small features with IDs (`T1`, `T2`, ...).
2. On schedule, a scheduled task starts a fresh Claude session, clones this repo and picks the
   first item that doesn't have a PR yet.
3. Claude implements the feature following `CLAUDE.md`, writes tests, runs `pnpm check`
   and opens a PR from a `todo/<id>-<slug>` branch.
4. You review and merge the PR (or close it with a comment explaining what's wrong —
   the next run reads it and tries again).
5. After every merge into `main`, a second scheduled task, started by a GitHub trigger, runs
   `pnpm check` on `main` and comments ✅ or ❌ on the merged PR. The repo has no CI, so this
   is the check that `main` stays green.

To change how the agent behaves, edit `TODO.md` (what to build) and `CLAUDE.md` (how to write code).

## Running locally

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm check   # lint + tests + build
```

## Stack

React 19 · Vite 8 · TypeScript 7 · Tailwind CSS 4 · Zustand · React Hook Form + Zod ·
Vitest + Testing Library · oxlint · Feature-Sliced Design.
