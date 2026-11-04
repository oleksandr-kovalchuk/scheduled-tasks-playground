import type { TaskFilter } from '@/entities/task/model/taskFilter'

export const FILTER_LABEL_KEYS = {
  all: 'filterTasks.all',
  active: 'filterTasks.active',
  completed: 'filterTasks.completed',
} satisfies Record<TaskFilter, string>
