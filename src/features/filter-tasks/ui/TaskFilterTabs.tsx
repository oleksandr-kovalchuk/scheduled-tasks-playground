import { useTranslation } from 'react-i18next'
import { TASK_FILTERS } from '@/entities/task/model/taskFilter'
import { FILTER_LABEL_KEYS } from '@/features/filter-tasks/model/filterLabels'
import { useTaskFilter } from '@/features/filter-tasks/model/useTaskFilter'
import { Button } from '@/shared/ui/Button'

type TaskFilterTabsProps = {
  // id of the element whose content the tabs control, for aria-controls.
  controls: string
}

export function TaskFilterTabs({ controls }: TaskFilterTabsProps) {
  const { t } = useTranslation()
  const [filter, setFilter] = useTaskFilter()

  return (
    <div role="tablist" aria-label={t('filterTasks.label')} className="flex gap-1">
      {TASK_FILTERS.map((value) => {
        const selected = value === filter

        return (
          <Button
            key={value}
            role="tab"
            size="sm"
            variant={selected ? 'default' : 'ghost'}
            aria-selected={selected}
            aria-controls={controls}
            onClick={() => setFilter(value)}
          >
            {t(FILTER_LABEL_KEYS[value])}
          </Button>
        )
      })}
    </div>
  )
}
