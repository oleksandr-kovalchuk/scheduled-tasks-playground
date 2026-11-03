import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { taskTitleSchema } from '@/entities/task/model/taskTitleSchema'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

export function AddTaskForm() {
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
          placeholder="What needs to be done?"
          aria-label="Task title"
          aria-invalid={Boolean(errors.title)}
          {...register('title')}
        />
        <Button type="submit">
          <Plus className="size-4" aria-hidden />
          Add
        </Button>
      </div>
      {errors.title && (
        <p role="alert" className="text-sm text-destructive">
          {errors.title.message}
        </p>
      )}
    </form>
  )
}
