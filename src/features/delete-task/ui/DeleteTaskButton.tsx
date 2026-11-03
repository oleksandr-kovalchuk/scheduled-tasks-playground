import { Trash2 } from 'lucide-react'
import { useTaskStore } from '@/entities/task/model/taskStore'
import type { Task } from '@/entities/task/model/types'
import { Button } from '@/shared/ui/Button'

type DeleteTaskButtonProps = {
  task: Task
}

export function DeleteTaskButton({ task }: DeleteTaskButtonProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:text-destructive"
      onClick={() => deleteTask(task.id)}
      aria-label={`Delete "${task.title}"`}
    >
      <Trash2 aria-hidden="true" className="size-4" />
    </Button>
  )
}
