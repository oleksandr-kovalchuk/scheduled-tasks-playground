import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'
import type { Task } from '@/entities/task/model/types'
import { ClearCompletedButton } from '@/features/clear-completed/ui/ClearCompletedButton'

const milk = { id: '1', title: 'Buy milk', completed: false, createdAt: 1 } satisfies Task
const dog = { id: '2', title: 'Walk the dog', completed: true, createdAt: 2 } satisfies Task

describe('ClearCompletedButton', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] })
  })

  it('is hidden when there are no completed tasks', () => {
    useTaskStore.setState({ tasks: [milk] })
    render(<ClearCompletedButton />)

    expect(screen.queryByRole('button', { name: 'Clear completed' })).not.toBeInTheDocument()
  })

  it('removes all completed tasks and then hides itself', async () => {
    const user = userEvent.setup()
    useTaskStore.setState({ tasks: [milk, dog] })
    render(<ClearCompletedButton />)

    await user.click(screen.getByRole('button', { name: 'Clear completed' }))

    expect(useTaskStore.getState().tasks.map((task) => task.title)).toEqual(['Buy milk'])
    expect(screen.queryByRole('button', { name: 'Clear completed' })).not.toBeInTheDocument()
  })
})
