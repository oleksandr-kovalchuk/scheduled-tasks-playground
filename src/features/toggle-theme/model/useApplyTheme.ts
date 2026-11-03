import { useEffect } from 'react'
import { useResolvedTheme } from '@/features/toggle-theme/model/useResolvedTheme'

export function useApplyTheme() {
  const theme = useResolvedTheme()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    // Keeps native UI (scrollbars, form controls) in sync with the tokens.
    root.style.colorScheme = theme
  }, [theme])
}
