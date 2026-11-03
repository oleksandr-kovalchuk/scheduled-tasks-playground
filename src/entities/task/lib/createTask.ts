import type { Task } from '@/entities/task/model/types'

export function createTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  }
}
