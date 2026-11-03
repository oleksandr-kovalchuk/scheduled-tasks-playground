import { create } from 'zustand'
import { createTask } from '@/entities/task/lib/createTask'
import { INITIAL_TASKS } from '@/entities/task/model/initialTasks'
import type { Task } from '@/entities/task/model/types'

export type TaskState = {
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  renameTask: (id: string, title: string) => void
}

export const useTaskStore = create<TaskState>()((set) => ({
  tasks: INITIAL_TASKS,
  addTask: (title) => set((state) => ({ tasks: [...state.tasks, createTask(title)] })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    })),
  deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  renameTask: (id, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, title } : task)),
    })),
}))
