import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { AddTaskForm } from '@/features/add-task/ui/AddTaskForm'
import { LanguageSwitcher } from '@/features/switch-language/ui/LanguageSwitcher'
import { TaskFilterTabs } from '@/features/filter-tasks/ui/TaskFilterTabs'
import { ThemeToggle } from '@/features/toggle-theme/ui/ThemeToggle'
import { Card } from '@/shared/ui/Card'
import { TaskList } from '@/widgets/task-list/ui/TaskList'
import { TaskSummary } from '@/widgets/task-list/ui/TaskSummary'

export function TasksPage() {
  const { t } = useTranslation()
  const taskListId = useId()

  return (
    <main className="min-h-dvh px-4 py-16">
      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <header className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-primary">{t('app.name')}</p>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{t('tasksPage.heading')}</h1>
          <p className="text-sm text-muted-foreground">{t('tasksPage.description')}</p>
        </header>
        <Card>
          <div className="border-b border-border p-4">
            <AddTaskForm />
          </div>
          <div className="border-b border-border px-4 py-2">
            <TaskFilterTabs controls={taskListId} />
          </div>
          <TaskList id={taskListId} />
          <TaskSummary />
        </Card>
      </div>
    </main>
  )
}
