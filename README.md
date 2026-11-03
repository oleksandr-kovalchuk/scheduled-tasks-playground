# Scheduled Tasks Playground

Тестовий проєкт, щоб пограти зі **scheduled tasks** у Claude: маленький трекер задач на React + Vite,
який сам обростає фічами — по одній за запуск.

## Як це працює

1. У `TODO.md` лежить беклог дрібних фіч з ідентифікаторами (`T1`, `T2`, ...).
2. Scheduled task за розкладом стартує нову сесію Claude, клонує цей репо і бере перший пункт,
   для якого ще немає PR.
3. Claude реалізує фічу за правилами з `CLAUDE.md`, пише тести, проганяє `pnpm check`
   і відкриває PR у гілці `todo/<id>-<slug>`.
4. Ти рев'юїш і мерджиш PR (або закриваєш і пишеш, що не так).

Щоб змінити поведінку агента — редагуй `TODO.md` (що робити) і `CLAUDE.md` (як писати код).

## Запуск локально

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm check   # lint + тести + білд
```

## Стек

React 19 · Vite 8 · TypeScript 7 · Tailwind CSS 4 · Zustand · React Hook Form + Zod ·
Vitest + Testing Library · oxlint · Feature-Sliced Design.
