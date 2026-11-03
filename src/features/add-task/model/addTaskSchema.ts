import { z } from 'zod'

export const TASK_TITLE_MAX_LENGTH = 100

export const addTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Task title is required')
    .max(TASK_TITLE_MAX_LENGTH, `Keep it under ${TASK_TITLE_MAX_LENGTH} characters`),
})

export type AddTaskValues = z.infer<typeof addTaskSchema>
