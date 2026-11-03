import { useState } from 'react'
import type { Task } from '@/entities/task/model/types'
import { TaskTitle } from '@/entities/task/ui/TaskTitle'
import { EditTaskForm } from '@/features/edit-task/ui/EditTaskForm'

type EditableTaskTitleProps = {
  task: Task
}

export function EditableTaskTitle({ task }: EditableTaskTitleProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return <EditTaskForm task={task} onClose={() => setIsEditing(false)} />
  }

  return <TaskTitle task={task} title="Double-click to edit" onDoubleClick={() => setIsEditing(true)} />
}
