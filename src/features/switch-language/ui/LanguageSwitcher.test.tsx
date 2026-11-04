import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { LanguageSwitcher } from '@/features/switch-language/ui/LanguageSwitcher'
import { LANGUAGE_STORAGE_KEY } from '@/shared/i18n/languageStorageKey'

describe('LanguageSwitcher', () => {
  it('lists every supported language by its own name with the current one selected', () => {
    render(<LanguageSwitcher />)

    const select = screen.getByRole('combobox', { name: 'Language' })
    expect(select).toHaveValue('en')
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Українська' })).toBeInTheDocument()
  })

  it('switches the language, translates its own label and remembers the choice', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    await user.selectOptions(screen.getByRole('combobox', { name: 'Language' }), 'Українська')

    expect(screen.getByRole('combobox', { name: 'Мова' })).toHaveValue('uk')
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('uk')
  })
})
