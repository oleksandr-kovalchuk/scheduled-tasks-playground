import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
  // The task store persists itself, so keep tests from leaking state through storage.
  localStorage.clear()
})
