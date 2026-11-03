import { create } from 'zustand'
import { createTask } from '@/entities/task/lib/createTask'
import { INITIAL_TASKS } from '@/entities/task/model/initialTasks'
import type { Task } from '@/entities/task/model/types'

export type TaskState = {
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
}

export const useTaskStore = create<TaskState>()((set) => ({
  tasks: INITIAL_TASKS,
  addTask: (title) => set((state) => ({ tasks: [...state.tasks, createTask(title)] })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    })),
}))
