import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { TASK_TITLE_MAX_LENGTH, taskTitleSchema } from '@/entities/task/model/taskTitleSchema'
import type { Task } from '@/entities/task/model/types'
import { Input } from '@/shared/ui/Input'

type EditTaskFormProps = {
  task: Task
  onClose: () => void
}

export function EditTaskForm({ task, onClose }: EditTaskFormProps) {
  const { t } = useTranslation()
  const renameTask = useTaskStore((state) => state.renameTask)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskTitleSchema),
    defaultValues: { title: task.title },
  })

  const onSubmit = handleSubmit(({ title }) => {
    renameTask(task.id, title)
    onClose()
  })

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-1 flex-col gap-1">
      <Input
        // The input only exists while the user is editing, so focusing it right away is what they expect.
        autoFocus
        className="h-8"
        aria-label={t('editTask.inputLabel', { title: task.title })}
        aria-invalid={Boolean(errors.title)}
        onKeyDown={(event) => {
          if (event.key !== 'Escape') return
          event.preventDefault()
          onClose()
        }}
        {...register('title', { onBlur: onClose })}
      />
      {errors.title?.message && (
        <p role="alert" className="text-sm text-destructive">
          {t(errors.title.message, { max: TASK_TITLE_MAX_LENGTH })}
        </p>
      )}
    </form>
  )
}
