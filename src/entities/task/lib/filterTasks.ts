import type { TaskFilter } from '@/entities/task/model/taskFilter'
import type { Task } from '@/entities/task/model/types'

const matchesFilter = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
} satisfies Record<TaskFilter, (task: Task) => boolean>

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  return tasks.filter(matchesFilter[filter])
}
