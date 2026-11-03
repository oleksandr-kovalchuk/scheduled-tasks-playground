import { beforeEach, describe, expect, it } from 'vitest'
import { TASK_STORAGE_KEY } from '@/entities/task/model/taskStorageKey'
import { useTaskStore } from '@/entities/task/model/taskStore'

describe('taskStore', () => {
  beforeEach(() => {
    localStorage.clear()
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

  it('clears only completed tasks', () => {
    useTaskStore.setState({
      tasks: [
        { id: '1', title: 'Buy milk', completed: false, createdAt: 1 },
        { id: '2', title: 'Walk the dog', completed: true, createdAt: 2 },
        { id: '3', title: 'Water plants', completed: true, createdAt: 3 },
      ],
    })

    useTaskStore.getState().clearCompleted()

    expect(useTaskStore.getState().tasks.map((task) => task.title)).toEqual(['Buy milk'])
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

  it('saves tasks to localStorage without the actions', () => {
    useTaskStore.getState().addTask('Survive a reload')

    const stored: unknown = JSON.parse(localStorage.getItem(TASK_STORAGE_KEY) ?? 'null')
    expect(stored).toMatchObject({ state: { tasks: [{ title: 'Survive a reload', completed: false }] } })
    expect(stored).not.toHaveProperty('state.addTask')
  })

  it('restores tasks from localStorage on rehydration', async () => {
    const savedTask = { id: 'saved', title: 'From last session', completed: true, createdAt: 1 }
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify({ state: { tasks: [savedTask] }, version: 0 }))

    await useTaskStore.persist.rehydrate()

    expect(useTaskStore.getState().tasks).toEqual([savedTask])
  })
})
