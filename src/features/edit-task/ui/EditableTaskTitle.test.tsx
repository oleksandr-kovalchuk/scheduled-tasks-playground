import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'
import type { Task } from '@/entities/task/model/types'
import { EditableTaskTitle } from '@/features/edit-task/ui/EditableTaskTitle'

const milk = { id: '1', title: 'Buy milk', completed: false, createdAt: 1 } satisfies Task
const dog = { id: '2', title: 'Walk the dog', completed: true, createdAt: 2 } satisfies Task

const titles = () => useTaskStore.getState().tasks.map((task) => task.title)

async function startEditing() {
  const user = userEvent.setup()
  render(<EditableTaskTitle task={milk} />)
  await user.dblClick(screen.getByText('Buy milk'))
  return { user, input: screen.getByRole('textbox', { name: 'Edit "Buy milk"' }) }
}

describe('EditableTaskTitle', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [milk, dog] })
  })

  it('shows the title as plain text until it is double-clicked', () => {
    render(<EditableTaskTitle task={milk} />)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('opens a focused input prefilled with the current title', async () => {
    const { input } = await startEditing()

    expect(input).toHaveValue('Buy milk')
    expect(input).toHaveFocus()
  })

  it('saves the trimmed title on Enter and closes the input', async () => {
    const { user, input } = await startEditing()

    await user.clear(input)
    await user.type(input, '  Buy oat milk  {Enter}')

    expect(titles()).toEqual(['Buy oat milk', 'Walk the dog'])
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('discards changes on Escape', async () => {
    const { user, input } = await startEditing()

    await user.clear(input)
    await user.type(input, 'Something else{Escape}')

    expect(titles()).toEqual(['Buy milk', 'Walk the dog'])
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('discards changes when the input loses focus', async () => {
    const { user, input } = await startEditing()

    await user.type(input, ' and bread')
    await user.tab()

    expect(titles()).toEqual(['Buy milk', 'Walk the dog'])
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('keeps the input open with an error for an empty title', async () => {
    const { user, input } = await startEditing()

    await user.clear(input)
    await user.type(input, '   {Enter}')

    expect(await screen.findByRole('alert')).toHaveTextContent('Task title is required')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(titles()).toEqual(['Buy milk', 'Walk the dog'])
  })

  it('rejects a title over the length limit', async () => {
    const { user, input } = await startEditing()

    await user.clear(input)
    await user.paste('x'.repeat(101))
    await user.keyboard('{Enter}')

    expect(await screen.findByRole('alert')).toHaveTextContent('Keep it under 100 characters')
    expect(titles()).toEqual(['Buy milk', 'Walk the dog'])
  })
})
