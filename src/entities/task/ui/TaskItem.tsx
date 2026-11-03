import type { ReactNode } from 'react'
import type { Task } from '@/entities/task/model/types'
import { cn } from '@/shared/lib/cn'

type TaskItemProps = {
  task: Task
  // Slots keep the entity free of feature logic: features plug their controls in from outside.
  leading?: ReactNode
  actions?: ReactNode
}

export function TaskItem({ task, leading, actions }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      {leading}
      <span className={cn('flex-1 text-sm', task.completed && 'text-muted-foreground line-through')}>
        {task.title}
      </span>
      {actions}
    </li>
  )
}
