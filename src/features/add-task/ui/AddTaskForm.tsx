import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { TASK_TITLE_MAX_LENGTH, taskTitleSchema } from '@/entities/task/model/taskTitleSchema'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

export function AddTaskForm() {
  const { t } = useTranslation()
  const addTask = useTaskStore((state) => state.addTask)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskTitleSchema),
    defaultValues: { title: '' },
  })

  const onSubmit = handleSubmit(({ title }) => {
    addTask(title)
    reset()
  })

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          placeholder={t('addTask.placeholder')}
          aria-label={t('addTask.inputLabel')}
          aria-invalid={Boolean(errors.title)}
          {...register('title')}
        />
        <Button type="submit">
          <Plus className="size-4" aria-hidden />
          {t('addTask.submit')}
        </Button>
      </div>
      {errors.title?.message && (
        <p role="alert" className="text-sm text-destructive">
          {t(errors.title.message, { max: TASK_TITLE_MAX_LENGTH })}
        </p>
      )}
    </form>
  )
}
