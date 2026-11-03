import type { Task } from '@/entities/task/model/types'

// Seed data so the UI has something to show on first load.
export const INITIAL_TASKS = [
  { id: 'seed-1', title: 'Create a scheduled task', completed: true, createdAt: 1_762_150_000_000 },
  { id: 'seed-2', title: 'Review the first pull request from Claude', completed: false, createdAt: 1_762_150_060_000 },
  { id: 'seed-3', title: 'Add more ideas to TODO.md', completed: false, createdAt: 1_762_150_120_000 },
] satisfies Task[]
