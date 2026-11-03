import { useTaskStore } from '@/entities/task/model/taskStore'
import type { Task } from '@/entities/task/model/types'
import { Checkbox } from '@/shared/ui/Checkbox'

type ToggleTaskCheckboxProps = {
  task: Task
}

export function ToggleTaskCheckbox({ task }: ToggleTaskCheckboxProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask)

  return (
    <Checkbox
      checked={task.completed}
      onChange={() => toggleTask(task.id)}
      aria-label={`Mark "${task.title}" as ${task.completed ? 'active' : 'completed'}`}
    />
  )
}
