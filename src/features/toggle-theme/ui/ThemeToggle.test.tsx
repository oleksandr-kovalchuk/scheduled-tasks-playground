import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useThemeStore } from '@/features/toggle-theme/model/themeStore'
import { THEME_STORAGE_KEY } from '@/features/toggle-theme/model/themeStorageKey'
import { ThemeToggle } from '@/features/toggle-theme/ui/ThemeToggle'
import { mockMatchMedia } from '@/test/mockMatchMedia'

describe('ThemeToggle', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: null })
  })

  it('offers the dark theme when the system prefers light', () => {
    mockMatchMedia(false)
    render(<ThemeToggle />)

    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
  })

  it('offers the light theme when the system prefers dark', () => {
    mockMatchMedia(true)
    render(<ThemeToggle />)

    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('follows a system theme change until the user picks a theme', () => {
    const media = mockMatchMedia(false)
    render(<ThemeToggle />)

    act(() => media.setMatches(true))

    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('switches the theme on click, persists the choice and then ignores the system preference', async () => {
    const user = userEvent.setup()
    const media = mockMatchMedia(false)
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))
    act(() => media.setMatches(false))

    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toContain('"theme":"dark"')

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }))

    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
  })
})
