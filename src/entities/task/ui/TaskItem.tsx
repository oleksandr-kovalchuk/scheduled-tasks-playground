import type { ReactNode } from 'react'
import type { Task } from '@/entities/task/model/types'
import { TaskTitle } from '@/entities/task/ui/TaskTitle'

type TaskItemProps = {
  task: Task
  // Slots keep the entity free of feature logic: features plug their controls in from outside.
  leading?: ReactNode
  content?: ReactNode
  actions?: ReactNode
}

export function TaskItem({ task, leading, content, actions }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      {leading}
      {content ?? <TaskTitle task={task} />}
      {actions}
    </li>
  )
}
