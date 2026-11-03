import { describe, expect, it } from 'vitest'
import { filterTasks } from '@/entities/task/lib/filterTasks'
import type { Task } from '@/entities/task/model/types'

const milk = { id: '1', title: 'Buy milk', completed: false, createdAt: 1 } satisfies Task
const dog = { id: '2', title: 'Walk the dog', completed: true, createdAt: 2 } satisfies Task
const tasks = [milk, dog]

describe('filterTasks', () => {
  it('returns every task for "all"', () => {
    expect(filterTasks(tasks, 'all')).toEqual([milk, dog])
  })

  it('returns only not completed tasks for "active"', () => {
    expect(filterTasks(tasks, 'active')).toEqual([milk])
  })

  it('returns only completed tasks for "completed"', () => {
    expect(filterTasks(tasks, 'completed')).toEqual([dog])
  })
})
