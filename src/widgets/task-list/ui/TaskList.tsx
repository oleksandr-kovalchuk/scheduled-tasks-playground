import { selectTasks } from '@/entities/task/model/selectors'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { TaskItem } from '@/entities/task/ui/TaskItem'
import { ToggleTaskCheckbox } from '@/features/toggle-task/ui/ToggleTaskCheckbox'

export function TaskList() {
  const tasks = useTaskStore(selectTasks)

  return (
    <ul aria-label="Tasks" className="divide-y divide-border">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} leading={<ToggleTaskCheckbox task={task} />} />
      ))}
    </ul>
  )
}
