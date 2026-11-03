import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { withNuqsTestingAdapter, type UrlUpdateEvent } from 'nuqs/adapters/testing'
import { describe, expect, it, vi } from 'vitest'
import { TaskFilterTabs } from '@/features/filter-tasks/ui/TaskFilterTabs'

describe('TaskFilterTabs', () => {
  it('selects "All" when the URL has no filter', () => {
    render(<TaskFilterTabs controls="tasks" />, { wrapper: withNuqsTestingAdapter() })

    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Active' })).toHaveAttribute('aria-selected', 'false')
  })

  it('reads the selected tab from the URL', () => {
    render(<TaskFilterTabs controls="tasks" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?filter=completed' }),
    })

    expect(screen.getByRole('tab', { name: 'Completed' })).toHaveAttribute('aria-selected', 'true')
  })

  it('falls back to "All" for an unknown filter value', () => {
    render(<TaskFilterTabs controls="tasks" />, {
      wrapper: withNuqsTestingAdapter({ searchParams: '?filter=bogus' }),
    })

    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true')
  })

  it('writes the selected filter to the URL and clears it for "All"', async () => {
    const user = userEvent.setup()
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>()
    render(<TaskFilterTabs controls="tasks" />, { wrapper: withNuqsTestingAdapter({ onUrlUpdate }) })

    await user.click(screen.getByRole('tab', { name: 'Active' }))

    expect(onUrlUpdate).toHaveBeenLastCalledWith(expect.objectContaining({ queryString: '?filter=active' }))
    expect(screen.getByRole('tab', { name: 'Active' })).toHaveAttribute('aria-selected', 'true')

    await user.click(screen.getByRole('tab', { name: 'All' }))

    expect(onUrlUpdate).toHaveBeenLastCalledWith(expect.objectContaining({ queryString: '' }))
  })
})
