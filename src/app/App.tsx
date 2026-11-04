import { useApplyLanguage } from '@/features/switch-language/model/useApplyLanguage'
import { useApplyTheme } from '@/features/toggle-theme/model/useApplyTheme'
import { TasksPage } from '@/pages/tasks/ui/TasksPage'

export function App() {
  useApplyTheme()
  useApplyLanguage()

  return <TasksPage />
}
