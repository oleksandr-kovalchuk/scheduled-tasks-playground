import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { AddTaskForm } from '@/features/add-task/ui/AddTaskForm'

describe('AddTaskForm', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] })
  })

  it('adds a trimmed task and clears the input', async () => {
    const user = userEvent.setup()
    render(<AddTaskForm />)
    const input = screen.getByRole('textbox', { name: 'Task title' })

    await user.type(input, '  Buy milk  ')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(useTaskStore.getState().tasks.map((task) => task.title)).toEqual(['Buy milk'])
    expect(input).toHaveValue('')
  })

  it('shows a validation error for an empty title', async () => {
    const user = userEvent.setup()
    render(<AddTaskForm />)

    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Task title is required')
    expect(useTaskStore.getState().tasks).toHaveLength(0)
  })
})
