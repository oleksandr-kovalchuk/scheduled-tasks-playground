import type { TaskFilter } from '@/entities/task/model/taskFilter'

export const FILTER_LABELS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
} satisfies Record<TaskFilter, string>
