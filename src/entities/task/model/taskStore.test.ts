import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/entities/task/model/taskStore'

describe('taskStore', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] })
  })

  it('adds a task as not completed', () => {
    useTaskStore.getState().addTask('Write tests')

    const [task] = useTaskStore.getState().tasks
    expect(task).toMatchObject({ title: 'Write tests', completed: false })
  })

  it('toggles only the targeted task', () => {
    const { addTask } = useTaskStore.getState()
    addTask('First')
    addTask('Second')
    const [first, second] = useTaskStore.getState().tasks

    useTaskStore.getState().toggleTask(first?.id ?? '')

    const tasks = useTaskStore.getState().tasks
    expect(tasks.find((task) => task.id === first?.id)?.completed).toBe(true)
    expect(tasks.find((task) => task.id === second?.id)?.completed).toBe(false)
  })

  it('deletes only the targeted task', () => {
    const { addTask } = useTaskStore.getState()
    addTask('First')
    addTask('Second')
    const [first] = useTaskStore.getState().tasks

    useTaskStore.getState().deleteTask(first?.id ?? '')

    expect(useTaskStore.getState().tasks.map((task) => task.title)).toEqual(['Second'])
  })

  it('renames only the targeted task', () => {
    const { addTask } = useTaskStore.getState()
    addTask('First')
    addTask('Second')
    const [first] = useTaskStore.getState().tasks

    useTaskStore.getState().renameTask(first?.id ?? '', 'Renamed')

    expect(useTaskStore.getState().tasks.map((task) => task.title)).toEqual(['Renamed', 'Second'])
  })
})
