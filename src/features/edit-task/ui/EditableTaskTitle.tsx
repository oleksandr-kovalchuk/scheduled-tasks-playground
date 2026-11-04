import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Task } from '@/entities/task/model/types'
import { TaskTitle } from '@/entities/task/ui/TaskTitle'
import { EditTaskForm } from '@/features/edit-task/ui/EditTaskForm'

type EditableTaskTitleProps = {
  task: Task
}

export function EditableTaskTitle({ task }: EditableTaskTitleProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return <EditTaskForm task={task} onClose={() => setIsEditing(false)} />
  }

  return <TaskTitle task={task} title={t('editTask.hint')} onDoubleClick={() => setIsEditing(true)} />
}
