export const TASK_FILTERS = ['all', 'active', 'completed'] as const

export type TaskFilter = (typeof TASK_FILTERS)[number]
