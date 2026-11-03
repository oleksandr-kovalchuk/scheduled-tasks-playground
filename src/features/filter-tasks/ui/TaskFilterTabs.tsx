import { TASK_FILTERS } from '@/entities/task/model/taskFilter'
import { FILTER_LABELS } from '@/features/filter-tasks/model/filterLabels'
import { useTaskFilter } from '@/features/filter-tasks/model/useTaskFilter'
import { Button } from '@/shared/ui/Button'

type TaskFilterTabsProps = {
  // id of the element whose content the tabs control, for aria-controls.
  controls: string
}

export function TaskFilterTabs({ controls }: TaskFilterTabsProps) {
  const [filter, setFilter] = useTaskFilter()

  return (
    <div role="tablist" aria-label="Filter tasks" className="flex gap-1">
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
            {FILTER_LABELS[value]}
          </Button>
        )
      })}
    </div>
  )
}
