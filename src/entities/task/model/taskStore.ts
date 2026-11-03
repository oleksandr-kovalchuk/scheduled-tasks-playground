import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createTask } from '@/entities/task/lib/createTask'
import { INITIAL_TASKS } from '@/entities/task/model/initialTasks'
import { TASK_STORAGE_KEY } from '@/entities/task/model/taskStorageKey'
import type { Task } from '@/entities/task/model/types'

export type TaskState = {
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: INITIAL_TASKS,
      addTask: (title) => set((state) => ({ tasks: [...state.tasks, createTask(title)] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
        })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
    }),
    {
      name: TASK_STORAGE_KEY,
      // Actions are recreated on every load; only the data belongs in storage.
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
)
