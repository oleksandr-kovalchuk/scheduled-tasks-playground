import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { mockMatchMedia } from '@/test/mockMatchMedia'

beforeEach(() => {
  mockMatchMedia(false)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  // Stores persist themselves, so keep tests from leaking state through storage.
  localStorage.clear()
})
