import { ListTodo } from 'lucide-react'
import { useId } from 'react'
import { useTranslation } from 'react-i18next'

type TaskListEmptyStateProps = {
  id?: string
}

export function TaskListEmptyState({ id }: TaskListEmptyStateProps) {
  const { t } = useTranslation()
  const headingId = useId()

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="flex flex-col items-center gap-2 px-4 py-12 text-center"
    >
      <ListTodo aria-hidden="true" className="size-10 text-muted-foreground" />
      <h2 id={headingId} className="text-base font-semibold">
        {t('taskList.emptyTitle')}
      </h2>
      <p className="text-sm text-muted-foreground">{t('taskList.emptyHint')}</p>
    </section>
  )
}
