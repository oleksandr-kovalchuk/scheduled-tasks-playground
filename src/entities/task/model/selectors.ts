import type { TaskState } from '@/entities/task/model/taskStore'

export const selectTasks = (state: TaskState) => state.tasks

export const selectActiveCount = (state: TaskState) => state.tasks.filter((task) => !task.completed).length
