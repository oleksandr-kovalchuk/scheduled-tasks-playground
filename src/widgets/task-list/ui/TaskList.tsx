import { filterTasks } from '@/entities/task/lib/filterTasks'
import { selectTasks } from '@/entities/task/model/selectors'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { TaskItem } from '@/entities/task/ui/TaskItem'
import { DeleteTaskButton } from '@/features/delete-task/ui/DeleteTaskButton'
import { EditableTaskTitle } from '@/features/edit-task/ui/EditableTaskTitle'
import { useTaskFilter } from '@/features/filter-tasks/model/useTaskFilter'
import { ToggleTaskCheckbox } from '@/features/toggle-task/ui/ToggleTaskCheckbox'

type TaskListProps = {
  id?: string
}

export function TaskList({ id }: TaskListProps) {
  const tasks = useTaskStore(selectTasks)
  const [filter] = useTaskFilter()
  const visibleTasks = filterTasks(tasks, filter)

  return (
    <ul id={id} aria-label="Tasks" className="divide-y divide-border">
      {visibleTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          leading={<ToggleTaskCheckbox task={task} />}
          content={<EditableTaskTitle task={task} />}
          actions={<DeleteTaskButton task={task} />}
        />
      ))}
    </ul>
  )
}
