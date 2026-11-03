import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { TasksPage } from '@/pages/tasks/ui/TasksPage'

describe('TasksPage', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] })
  })

  it('adds a task, shows it in the list and updates the summary when toggled', async () => {
    const user = userEvent.setup()
    render(<TasksPage />)

    await user.type(screen.getByRole('textbox', { name: 'Task title' }), 'Ship the playground')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByRole('list', { name: 'Tasks' })).toHaveTextContent('Ship the playground')
    expect(screen.getByText('1 active of 1')).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Mark "Ship the playground" as completed' }))

    expect(screen.getByText('0 active of 1')).toBeInTheDocument()
  })

  it('deletes a task from the list and updates the summary', async () => {
    const user = userEvent.setup()
    render(<TasksPage />)

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
})
