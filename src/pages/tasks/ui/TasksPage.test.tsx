import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { useThemeStore } from '@/features/toggle-theme/model/themeStore'
import { TasksPage } from '@/pages/tasks/ui/TasksPage'

describe('TasksPage', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] })
    useThemeStore.setState({ theme: null })
  })

  it('adds a task, shows it in the list and updates the summary when toggled', async () => {
    const user = userEvent.setup()
    render(<TasksPage />, { wrapper: withNuqsTestingAdapter() })

    await user.type(screen.getByRole('textbox', { name: 'Task title' }), 'Ship the playground')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByRole('list', { name: 'Tasks' })).toHaveTextContent('Ship the playground')
    expect(screen.getByText('1 active of 1')).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Mark "Ship the playground" as completed' }))

    expect(screen.getByText('0 active of 1')).toBeInTheDocument()
  })

  it('deletes a task from the list and updates the summary', async () => {
    const user = userEvent.setup()
    render(<TasksPage />, { wrapper: withNuqsTestingAdapter() })

    await user.type(screen.getByRole('textbox', { name: 'Task title' }), 'Keep me')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.type(screen.getByRole('textbox', { name: 'Task title' }), 'Remove me')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    await user.click(screen.getByRole('button', { name: 'Delete "Remove me"' }))

    const list = screen.getByRole('list', { name: 'Tasks' })
    expect(list).not.toHaveTextContent('Remove me')
    expect(list).toHaveTextContent('Keep me')
    expect(screen.getByText('1 active of 1')).toBeInTheDocument()
  })

  it('shows "Clear completed" once a task is completed and removes completed tasks', async () => {
    const user = userEvent.setup()
    useTaskStore.setState({
      tasks: [
        { id: '1', title: 'Buy milk', completed: false, createdAt: 1 },
        { id: '2', title: 'Walk the dog', completed: false, createdAt: 2 },
      ],
    })
    render(<TasksPage />, { wrapper: withNuqsTestingAdapter() })
    expect(screen.queryByRole('button', { name: 'Clear completed' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Mark "Walk the dog" as completed' }))
    await user.click(screen.getByRole('button', { name: 'Clear completed' }))

    const list = screen.getByRole('list', { name: 'Tasks' })
    expect(list).toHaveTextContent('Buy milk')
    expect(list).not.toHaveTextContent('Walk the dog')
    expect(screen.getByText('1 active of 1')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Clear completed' })).not.toBeInTheDocument()
  })

  it('filters the list by the selected tab', async () => {
    const user = userEvent.setup()
    useTaskStore.setState({
      tasks: [
        { id: '1', title: 'Buy milk', completed: false, createdAt: 1 },
        { id: '2', title: 'Walk the dog', completed: true, createdAt: 2 },
      ],
    })
    render(<TasksPage />, { wrapper: withNuqsTestingAdapter() })
    const list = screen.getByRole('list', { name: 'Tasks' })

    await user.click(screen.getByRole('tab', { name: 'Active' }))
    expect(list).toHaveTextContent('Buy milk')
    expect(list).not.toHaveTextContent('Walk the dog')

    await user.click(screen.getByRole('tab', { name: 'Completed' }))
    expect(list).not.toHaveTextContent('Buy milk')
    expect(list).toHaveTextContent('Walk the dog')

    await user.click(screen.getByRole('tab', { name: 'All' }))
    expect(list).toHaveTextContent('Buy milk')
    expect(list).toHaveTextContent('Walk the dog')
  })

  it('applies the filter from the URL and hides a task once it no longer matches', async () => {
    const user = userEvent.setup()
    useTaskStore.setState({ tasks: [{ id: '1', title: 'Buy milk', completed: false, createdAt: 1 }] })
    render(<TasksPage />, { wrapper: withNuqsTestingAdapter({ searchParams: '?filter=active' }) })

    await user.click(screen.getByRole('checkbox', { name: 'Mark "Buy milk" as completed' }))

    expect(screen.getByRole('list', { name: 'Tasks' })).not.toHaveTextContent('Buy milk')
    expect(screen.getByText('0 active of 1')).toBeInTheDocument()
  })

  it('renames a task inline by double-clicking its title', async () => {
    const user = userEvent.setup()
    useTaskStore.setState({ tasks: [{ id: '1', title: 'Buy milk', completed: false, createdAt: 1 }] })
    render(<TasksPage />, { wrapper: withNuqsTestingAdapter() })

    await user.dblClick(screen.getByText('Buy milk'))
    const input = screen.getByRole('textbox', { name: 'Edit "Buy milk"' })
    await user.clear(input)
    await user.type(input, 'Buy oat milk{Enter}')

    expect(screen.getByRole('list', { name: 'Tasks' })).toHaveTextContent('Buy oat milk')
    expect(screen.getByRole('checkbox', { name: 'Mark "Buy oat milk" as completed' })).toBeInTheDocument()
  })

  it('shows the empty state until the first task is added and again after the last one is deleted', async () => {
    const user = userEvent.setup()
    render(<TasksPage />, { wrapper: withNuqsTestingAdapter() })
    expect(screen.getByRole('heading', { name: 'No tasks yet' })).toBeInTheDocument()

    await user.type(screen.getByRole('textbox', { name: 'Task title' }), 'First task')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.queryByRole('heading', { name: 'No tasks yet' })).not.toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Tasks' })).toHaveTextContent('First task')

    await user.click(screen.getByRole('button', { name: 'Delete "First task"' }))

    expect(screen.getByRole('heading', { name: 'No tasks yet' })).toBeInTheDocument()
  })

  it('switches between light and dark themes from the header', async () => {
    const user = userEvent.setup()
    render(<TasksPage />, { wrapper: withNuqsTestingAdapter() })

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))

    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })
})
