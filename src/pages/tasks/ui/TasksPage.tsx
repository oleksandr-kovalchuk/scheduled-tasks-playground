import { AddTaskForm } from '@/features/add-task/ui/AddTaskForm'
import { Card } from '@/shared/ui/Card'
import { TaskList } from '@/widgets/task-list/ui/TaskList'
import { TaskSummary } from '@/widgets/task-list/ui/TaskSummary'

export function TasksPage() {
  return (
    <main className="min-h-dvh px-4 py-16">
      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <header className="flex flex-col gap-1">
          <p className="text-sm font-medium text-primary">Scheduled Tasks Playground</p>
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            A tiny app that grows one feature at a time. Each new feature arrives as a pull request from a
            scheduled Claude task.
          </p>
        </header>
        <Card>
          <div className="border-b border-border p-4">
            <AddTaskForm />
          </div>
          <TaskList />
          <TaskSummary />
        </Card>
      </div>
    </main>
  )
}
