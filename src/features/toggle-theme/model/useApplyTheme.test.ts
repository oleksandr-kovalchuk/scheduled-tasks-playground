import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useThemeStore } from '@/features/toggle-theme/model/themeStore'
import { useApplyTheme } from '@/features/toggle-theme/model/useApplyTheme'
import { mockMatchMedia } from '@/test/mockMatchMedia'

const root = document.documentElement

describe('useApplyTheme', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: null })
    root.className = ''
    root.style.colorScheme = ''
  })

  it('applies the system preference by default', () => {
    mockMatchMedia(true)
    renderHook(() => useApplyTheme())

    expect(root).toHaveClass('dark')
    expect(root.style.colorScheme).toBe('dark')
  })

  it('adds and removes the dark class when the chosen theme changes', () => {
    mockMatchMedia(false)
    renderHook(() => useApplyTheme())
    expect(root).not.toHaveClass('dark')

    act(() => useThemeStore.getState().setTheme('dark'))
    expect(root).toHaveClass('dark')

    act(() => useThemeStore.getState().setTheme('light'))
    expect(root).not.toHaveClass('dark')
    expect(root.style.colorScheme).toBe('light')
  })
})
