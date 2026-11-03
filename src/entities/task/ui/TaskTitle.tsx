import type { ComponentProps } from 'react'
import type { Task } from '@/entities/task/model/types'
import { cn } from '@/shared/lib/cn'

type TaskTitleProps = Omit<ComponentProps<'span'>, 'children'> & {
  task: Task
}

export function TaskTitle({ task, className, ...props }: TaskTitleProps) {
  return (
    <span className={cn('flex-1 text-sm', task.completed && 'text-muted-foreground line-through', className)} {...props}>
      {task.title}
    </span>
  )
}
