import { z } from 'zod'

export const TASK_TITLE_MAX_LENGTH = 100

// Shared by every form that sets a task title (create and inline edit), so the rules never drift apart.
export const taskTitleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Task title is required')
    .max(TASK_TITLE_MAX_LENGTH, `Keep it under ${TASK_TITLE_MAX_LENGTH} characters`),
})

export type TaskTitleValues = z.infer<typeof taskTitleSchema>
