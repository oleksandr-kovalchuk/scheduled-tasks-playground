import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'
import { AddTaskForm } from '@/features/add-task/ui/AddTaskForm'
import { i18n } from '@/shared/i18n/i18n'

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

  it('translates a visible validation error when the language changes', async () => {
    const user = userEvent.setup()
    render(<AddTaskForm />)
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Task title is required')

    await act(() => i18n.changeLanguage('uk'))

    expect(screen.getByRole('alert')).toHaveTextContent('Вкажіть назву завдання')
    expect(screen.getByRole('button', { name: 'Додати' })).toBeInTheDocument()
  })
})
