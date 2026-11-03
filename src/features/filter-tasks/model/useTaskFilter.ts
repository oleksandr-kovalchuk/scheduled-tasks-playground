import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { TASK_FILTERS } from '@/entities/task/model/taskFilter'

// The URL is the source of truth: an unknown `?filter=` value fails to parse and falls back to "all",
// and "all" itself is cleared from the URL (nuqs `clearOnDefault`).
const filterParser = parseAsStringLiteral(TASK_FILTERS).withDefault('all')

export function useTaskFilter() {
  return useQueryState('filter', filterParser)
}
