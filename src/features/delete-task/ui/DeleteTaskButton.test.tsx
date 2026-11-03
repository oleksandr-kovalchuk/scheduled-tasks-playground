import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'
import type { Task } from '@/entities/task/model/types'
import { DeleteTaskButton } from '@/features/delete-task/ui/DeleteTaskButton'

const milk = { id: '1', title: 'Buy milk', completed: false, createdAt: 1 } satisfies Task
const dog = { id: '2', title: 'Walk the dog', completed: true, createdAt: 2 } satisfies Task

describe('DeleteTaskButton', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [milk, dog] })
  })

  it('removes only its own task from the store', async () => {
    const user = userEvent.setup()
    render(<DeleteTaskButton task={milk} />)

    await user.click(screen.getByRole('button', { name: 'Delete "Buy milk"' }))

    expect(useTaskStore.getState().tasks.map((task) => task.title)).toEqual(['Walk the dog'])
  })
})
