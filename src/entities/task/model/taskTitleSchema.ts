import { z } from 'zod'

export const TASK_TITLE_MAX_LENGTH = 100

// Shared by every form that sets a task title (create and inline edit), so the rules never drift apart.
// Messages are translation keys: the forms translate them on render, so they follow a language switch.
export const taskTitleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'taskTitle.required')
    .max(TASK_TITLE_MAX_LENGTH, 'taskTitle.tooLong'),
})

export type TaskTitleValues = z.infer<typeof taskTitleSchema>
