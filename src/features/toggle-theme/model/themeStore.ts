import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/features/toggle-theme/model/theme'
import { THEME_STORAGE_KEY } from '@/features/toggle-theme/model/themeStorageKey'

type ThemeState = {
  // `null` means the user has not picked a theme yet, so the system preference decides.
  theme: Theme | null
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: null,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: THEME_STORAGE_KEY,
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
