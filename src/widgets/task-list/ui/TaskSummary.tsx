import { selectActiveCount, selectTasks } from '@/entities/task/model/selectors'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { ClearCompletedButton } from '@/features/clear-completed/ui/ClearCompletedButton'

export function TaskSummary() {
  const total = useTaskStore((state) => selectTasks(state).length)
  const activeCount = useTaskStore(selectActiveCount)

  return (
    <footer className="flex items-center justify-between gap-3 border-t border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
      <span aria-live="polite">
        {activeCount} active of {total}
      </span>
      <ClearCompletedButton />
    </footer>
  )
}
