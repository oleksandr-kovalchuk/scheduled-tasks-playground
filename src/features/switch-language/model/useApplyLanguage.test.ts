import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useApplyLanguage } from '@/features/switch-language/model/useApplyLanguage'
import { i18n } from '@/shared/i18n/i18n'

describe('useApplyLanguage', () => {
  it('keeps the document language and title in sync with the UI language', async () => {
    renderHook(() => useApplyLanguage())

    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe('Tasks · Scheduled Tasks Playground')

    await act(() => i18n.changeLanguage('uk'))

    expect(document.documentElement.lang).toBe('uk')
    expect(document.title).toBe('Завдання · Scheduled Tasks Playground')
  })
})
