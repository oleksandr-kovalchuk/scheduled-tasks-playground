import { render, screen } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { TaskList } from '@/widgets/task-list/ui/TaskList'

describe('TaskList', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] })
  })

  it('shows the empty state instead of a list when there are no tasks', () => {
    render(<TaskList />, { wrapper: withNuqsTestingAdapter() })

    expect(screen.getByRole('region', { name: 'No tasks yet' })).toHaveTextContent(
      'Add your first task using the field above.',
    )
    expect(screen.queryByRole('list', { name: 'Tasks' })).not.toBeInTheDocument()
  })

  it('keeps showing the list when tasks exist but none match the filter', () => {
    useTaskStore.setState({ tasks: [{ id: '1', title: 'Buy milk', completed: false, createdAt: 1 }] })
    render(<TaskList />, { wrapper: withNuqsTestingAdapter({ searchParams: '?filter=completed' }) })

    expect(screen.getByRole('list', { name: 'Tasks' })).not.toHaveTextContent('Buy milk')
    expect(screen.queryByRole('region', { name: 'No tasks yet' })).not.toBeInTheDocument()
  })
})
