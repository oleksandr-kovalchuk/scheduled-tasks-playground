import { useTranslation } from 'react-i18next'
import { selectCompletedCount } from '@/entities/task/model/selectors'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { Button } from '@/shared/ui/Button'

export function ClearCompletedButton() {
  const { t } = useTranslation()
  const completedCount = useTaskStore(selectCompletedCount)
  const clearCompleted = useTaskStore((state) => state.clearCompleted)

  if (completedCount === 0) return null

  return (
    <Button variant="ghost" size="sm" onClick={clearCompleted}>
      {t('clearCompleted.label')}
    </Button>
  )
}
