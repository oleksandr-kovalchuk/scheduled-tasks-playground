# TODO

Backlog for the scheduled task. Each run takes the **first item without `[x]`** that has no
open or merged PR yet (branch `todo/<id>-...`), implements it with tests and opens a PR.

Add your own ideas in the same format: `- [ ] T11: Title — what exactly should work`.
You can tick `[x]` manually after merging, but the agent tracks progress by PRs anyway.

- [x] T1: Delete a task — a button with a `Trash2` icon in every row (the `actions` slot of `TaskItem`), a new `features/delete-task` slice, `aria-label` in the form `Delete "<title>"`.
- [x] T2: All / Active / Completed filter — tabs above the list; the URL (`?filter=active`) is the source of truth (nuqs with the React adapter); an unknown value falls back to All.
- [x] T3: Persist tasks in localStorage — Zustand `persist` middleware; tasks survive a page reload.
- [x] T4: Inline editing — double-clicking a title opens an input; Enter saves, Escape cancels; same validation as on create (move the shared schema to `entities/task`).
- [x] T5: "Clear completed" — a button in the footer, visible only when there are completed tasks; removes all of them.
- [x] T6: Empty state — when there are no tasks, show an icon, a heading and a hint to add the first task instead of an empty list.
- [ ] T7: Dark mode — a Sun/Moon toggle in the header, `.dark` class on `<html>`; defaults to `prefers-color-scheme`; the tokens already exist in `index.css`.
- [ ] T8: i18n — i18next + react-i18next, uk and en, a language switcher, no hardcoded text in components.
- [ ] T9: Due dates — an optional date when creating a task, formatted with date-fns using the current locale, overdue tasks highlighted with the `destructive` token.
- [ ] T10: Playwright e2e smoke test — add a task and mark it completed; `pnpm test:e2e` script.
