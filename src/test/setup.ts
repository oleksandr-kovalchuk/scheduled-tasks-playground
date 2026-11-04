import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { i18n } from '@/shared/i18n/i18n'
import { DEFAULT_LANGUAGE } from '@/shared/i18n/languages'
import { mockMatchMedia } from '@/test/mockMatchMedia'

beforeEach(async () => {
  mockMatchMedia(false)
  // Tests query by the English accessible names, whatever language a previous test switched to.
  await i18n.changeLanguage(DEFAULT_LANGUAGE)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  // Stores persist themselves, so keep tests from leaking state through storage.
  localStorage.clear()
})
