import { useTranslation } from 'react-i18next'
import { useTaskStore } from '@/entities/task/model/taskStore'
import type { Task } from '@/entities/task/model/types'
import { Checkbox } from '@/shared/ui/Checkbox'

type ToggleTaskCheckboxProps = {
  task: Task
}

export function ToggleTaskCheckbox({ task }: ToggleTaskCheckboxProps) {
  const { t } = useTranslation()
  const toggleTask = useTaskStore((state) => state.toggleTask)

  return (
    <Checkbox
      checked={task.completed}
      onChange={() => toggleTask(task.id)}
      aria-label={t(task.completed ? 'toggleTask.markActive' : 'toggleTask.markCompleted', { title: task.title })}
    />
  )
}
